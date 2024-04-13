//https://github.com/tensorflow/tfjs-examples/blob/master/react-native/pose-detection/App.tsx
//https://docs.expo.dev/versions/latest/sdk/camera/
//https://github.com/tensorflow/tfjs-models/tree/master/pose-detection

//imports
import { Camera, CameraType } from "expo-camera";
import { useEffect, useState } from "react";
import { Button, Pressable, StyleSheet, Text, View } from "react-native";

import * as tf from "@tensorflow/tfjs";
import * as posedetection from "@tensorflow-models/pose-detection";
import { cameraWithTensors } from "@tensorflow/tfjs-react-native";


//globals
const DOUBLE_TAP_DELAY = 200;

const TensorCamera = cameraWithTensors(Camera);


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
			console.log(keypoints);
			setPose(keypoints);
		}

		loop();
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
				resizeWidth={180}
				resizeHeight={240}
				resizeDepth={3}>
				<Pressable style={styles.flipper} onPress={tap}></Pressable>
			</TensorCamera>
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
	flipper: {
		flex: 1
	},
	loading: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	}
});//}}}

