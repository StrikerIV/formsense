//https://github.com/tensorflow/tfjs-examples/blob/master/react-native/pose-detection/App.tsx
//https://docs.expo.dev/versions/latest/sdk/camera/
//https://github.com/tensorflow/tfjs-models/tree/master/pose-detection

//imports
import { Camera, CameraType } from "expo-camera";
import { useEffect, useState } from "react";
import { Button, Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import Svg, { Circle } from "react-native-svg";

import * as tf from "@tensorflow/tfjs";
import * as posedetection from "@tensorflow-models/pose-detection";
import { cameraWithTensors } from "@tensorflow/tfjs-react-native";


//globals
const TensorCamera = cameraWithTensors(Camera);
const RATIO = 3 / 4;
const CAMERA_WIDTH = Dimensions.get("window").width;
const CAMERA_HEIGHT = CAMERA_WIDTH / RATIO;
const IMAGE_WIDTH = 180;
const IMAGE_HEIGHT = IMAGE_WIDTH / RATIO;
const CONFIDENCE = 0.1;

const DOUBLE_TAP_DELAY = 200;


//app
export default function App() {
	//state and other variables
	const [facing, setFacing] = useState(CameraType.front);
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
				let x = (1 - (p.x / IMAGE_WIDTH)) * CAMERA_WIDTH,
					y = p.y / IMAGE_HEIGHT * CAMERA_HEIGHT;
				return (<Circle key={p.name} cx={x} cy={y} r="4" strokeWidth="2" fill="#fff" stroke="#f00"></Circle>);
			});
		return (<Svg style={styles.svg}>{keypoints}</Svg>);
	}//}}}

	function toggleFacing() {//{{{
		setFacing(facing == CameraType.front ? CameraType.back : CameraType.front);
		console.log("flip");
	}//}}}
	function tap() {//{{{
		let now = Date.now();
		if(now - lastTap <= DOUBLE_TAP_DELAY) {
			//doubletap
			toggleFacing();
		}
		setLastTap(now);
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
			<TensorCamera style={styles.camera}
				type={facing}
				onReady={detectPose}
				resizeWidth={IMAGE_WIDTH}
				resizeHeight={IMAGE_HEIGHT}
				resizeDepth={3}>
				<Pressable style={styles.flipper} onPress={tap}></Pressable>
			</TensorCamera>
			{draw()}
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
		flex: 1
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

