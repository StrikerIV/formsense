//https://github.com/tensorflow/tfjs-examples/blob/master/react-native/pose-detection/App.tsx
//https://docs.expo.dev/versions/latest/sdk/camera/
//https://github.com/tensorflow/tfjs-models/tree/master/pose-detection
//https://js.tensorflow.org/api_react_native/0.2.1/#cameraWithTensors
//https://github.com/tensorflow/tfjs-models/blob/master/pose-detection/src/create_detector.ts
//https://github.com/tensorflow/tfjs-models/blob/master/pose-detection/src/movenet/detector.ts

//imports
import { Camera, CameraType } from "expo-camera";
import { useEffect, useState } from "react";
import { Button, Dimensions, Platform, Pressable, StyleSheet, Text, View } from "react-native";
import Svg, { Circle } from "react-native-svg";

import * as tf from "@tensorflow/tfjs";
import * as posedetection from "@tensorflow-models/pose-detection";
import { cameraWithTensors } from "@tensorflow/tfjs-react-native";

import { embed } from "./utils.js";


//globals
const TensorCamera = cameraWithTensors(Camera);

const IS_ANDROID = Platform.OS == "android";

const RATIO = IS_ANDROID ? 3 / 4 : 9 / 16;
const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = SCREEN_WIDTH / RATIO;
const TENSOR_WIDTH = 120;
const TENSOR_HEIGHT = TENSOR_WIDTH / RATIO;
const CONFIDENCE = 0.3;

var motionData = [];


//app
export default function App() {
	//state and other variables
	const [facing, setFacing] = useState(CameraType.back);

	const [ready, setReady] = useState(false);
	const [model, setModel] = useState(null);
	const [lastPose, setLastPose] = useState([]);

	const [recording, setRecording] = useState(false);


	//functions
	async function cameraPerms() {//{{{
		//FIXME: this still doesn't work lol, been going around it by just going out of app then back in (with recent apps button)
		const perm = await Camera.requestCameraPermissionsAsync();
		if(!perm) console.log("rip");
		if(!perm.granted) console.log("no perm");
	}//}}}

	async function prepareTF() {//{{{
		await tf.ready();
		const mcfg = {
			modelType: posedetection.movenet.modelType.SINGLEPOSE_LIGHTNING,
			enableSmoothing: true };
		//~	maybe more...
		const m = await posedetection.createDetector(
			posedetection.SupportedModels.MoveNet,
			mcfg);
		
		console.log(m.constructor.name);

		setModel(m);
		setReady(true);
	}//}}}

	function detectPose(images, updatePreview, gl) {//{{{
		console.log("onReady", images);

		async function loop() {
			requestAnimationFrame(loop);
	
			const image = images.next().value;
			if(!image) return;
			const poses = await model.estimatePoses(image, null, Date.now());
			tf.dispose([image]);

			let keypoints = poses[0].keypoints;
			setLastPose(keypoints);
			//console.log(keypoints);
		}

		loop();
	}//}}}

	function drawSingle(x, y, color, key) {//{{{
		return (<Circle key={key} cx={x} cy={y} r="7" strokeWidth="3" fill="#fff" stroke={color}></Circle>);
	}//}}}
	function draw(pose) {//{{{
		if(!pose) return false;

		//un-norm'ed
		const keypoints = pose
			.filter((p) => (p.score >= CONFIDENCE))
			.map((p) => {
				let x = (1 - (p.x / TENSOR_WIDTH)) * SCREEN_WIDTH / (RATIO * 1.5),
					y = p.y / TENSOR_HEIGHT * SCREEN_HEIGHT / (RATIO * 1.5);
				return drawSingle(x, y, "#f00", p.name);
			});

		//norm'ed
		const normed = embed(pose);
		const ided = normed
			? normed
				.filter((p) => (p.score >= CONFIDENCE))
				.map((p) => {
					let x = -p.x * 200 + 0.5 * SCREEN_WIDTH,
						y = p.y * 200 + 0.5 * SCREEN_HEIGHT;
					return drawSingle(x, y, "#00f", p.name);
				})
			: false;

		//recording part (FIXME move somewhere else)
		if(recording) {
			motionData.push(normed);
		}

		//playback part
		//

		//return draw element
		return (<Svg style={styles.svg}>{keypoints}{ided}</Svg>);
	}//}}}

	function toggleFacing() {//{{{
		setFacing(facing == CameraType.front ? CameraType.back : CameraType.front);
		console.log("flip");
	}//}}}

	function record() {
		let newValue = !recording;
		console.log("NOW", newValue ? "RECORDING" : "IDLING");
		setRecording(newValue);
		if(newValue) {
			motionData = [];
		}
		else {
			console.log(motionData);
			(async () => {
				try {
					const response = await fetch("http://localhost:8080/api/motion", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify(motionData)
					});
					const result = await response.json();
					console.log(result);
				} catch(ex) {
					console.error(ex);
				}
			})();
		}
	}


	//init
	//{{{
	useEffect(() => {
		cameraPerms();
		prepareTF();
	}, []);
	//}}}


	//view
	//{{{
	if(ready) {
		return (<View style={styles.container}>
			<View style={styles.top}>
				<TensorCamera style={styles.camera}
					type={facing}
					onReady={detectPose}
					resizeWidth={TENSOR_WIDTH}
					resizeHeight={TENSOR_HEIGHT}
					resizeDepth={3}>
				</TensorCamera>
				{draw(lastPose)}
			</View>
			<View style={styles.bottom}>
				<Pressable style={styles.flipper} onPress={toggleFacing}>
					<Text> Flip to { facing == "front" ? "Back" : "Front" } </Text>
				</Pressable>
				<Pressable style={styles.record} onPress={record}>
					<Text> { recording ? "Stop Recording" : "Start Recording" } </Text>
				</Pressable>
			</View>
		</View>);
	}
	else {
		return (<View style={styles.loading}>
			<Text> Now Loading... </Text>
		</View>);
	}
	//}}}
};

const styles = StyleSheet.create({//{{{
	container: {
		flex: 1
	},
	top: {
		flex: 8
	},
	bottom: {
		flex: 2,
		flexDirection: "row"
	},
	camera: {
		flex: 1,
		aspectRatio: RATIO
	},
	svg: {
		width: "100%",
		height: "100%",
		position: "absolute",
		zIndex: 100
	},
	flipper: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	},
	record: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	},
	loading: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	}
});//}}}

