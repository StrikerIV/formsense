import { CameraView, useCameraPermissions } from "expo-camera/next";
import { useState } from "react";
import { Button, Pressable, StyleSheet, Text, View } from "react-native";

const DOUBLE_TAP_DELAY = 200;

export default function App() {
	//state and other variables
	const [facing, setFacing] = useState("front");
	const [perm, reqPerm] = useCameraPermissions();
	let [lastTap, setLastTap] = useState(Date.now());


	//functions
	function toggleFacing() {
		setFacing(facing == "front" ? "back" : "front");
	}
	function tap() {
		let now = Date.now();
		if(now - lastTap <= DOUBLE_TAP_DELAY) {
			//doubletap
			toggleFacing();
		}
		setLastTap(now);
	}


	//camera permission handling...
	//FIXME: this still doesn't work lol, been going around it by just going out of app then back in (with recent apps button)
	if(!perm) console.log("rip");
	if(!perm.GRANTED) console.log("no perm");


	//view
	return (<View style={styles.container}>
		<CameraView style={styles.camera} facing={facing}>
			<Pressable style={styles.flipper} onPress={tap}>
			</Pressable>
		</CameraView>
	</View>);
};

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	camera: {
		flex: 1
	},
	flipper: {
		flex: 1
	}
});

