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


//globals
const TensorCamera = cameraWithTensors(Camera);

const IS_ANDROID = Platform.OS == "android";

const RATIO = IS_ANDROID ? 3 / 4 : 9 / 16;
const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = SCREEN_WIDTH / RATIO;
const TENSOR_WIDTH = 120;
const TENSOR_HEIGHT = TENSOR_WIDTH / RATIO;
const CONFIDENCE = 0.3;

const DOUBLE_TAP_DELAY = 200;


//app
export default function App() {
	//state and other variables
	const [facing, setFacing] = useState(CameraType.back);
	const [lastTap, setLastTap] = useState(Date.now());

	const [ready, setReady] = useState(false);
	const [model, setModel] = useState(null);
	const [pose, setPose] = useState([]);


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
			setPose(keypoints);
			//console.log(keypoints);
		}

		loop();
	}//}}}

	function draw() {//{{{
		if(!pose) return false;
		const keypoints = pose
			.filter((p) => (p.score >= CONFIDENCE))
			.map((p) => {
				let x = (1 - (p.x / TENSOR_WIDTH)) * SCREEN_WIDTH / (RATIO * 1.5),
					y = p.y / TENSOR_HEIGHT * SCREEN_HEIGHT / (RATIO * 1.5);
				return (<Circle key={p.name} cx={x} cy={y} r="4" strokeWidth="2" fill="#fff" stroke="#f00"></Circle>);
			});
		return (<Svg style={styles.svg}>{keypoints}</Svg>);
	}//}}}

	function toggleFacing() {//{{{
		setFacing(facing == CameraType.front ? CameraType.back : CameraType.front);
		console.log("flip");
	}//}}}
	function tap() {//{{{
		toggleFacing();
		/*
		let now = Date.now();
		if(now - lastTap <= DOUBLE_TAP_DELAY) {
			//doubletap
			toggleFacing();
		}
		setLastTap(now);
		*/
	}//}}}


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
			<Pressable style={styles.flipper} onPress={tap}>
				<TensorCamera style={styles.camera}
					type={facing}
					onReady={detectPose}
					resizeWidth={TENSOR_WIDTH}
					resizeHeight={TENSOR_HEIGHT}
					resizeDepth={3}>
				</TensorCamera>
				{draw()}
			</Pressable>
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
		flex: 1
	},
	loading: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	}
});//}}}

