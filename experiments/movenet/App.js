import { CameraView, useCameraPermissions } from "expo-camera/next";
import { useState } from "react";
import { Button, Pressable, StyleSheet, Text, View } from "react-native";

export default function App() {
	const [facing, setFacing] = useState("front");
	const [perm, reqPerm] = useCameraPermissions();

	if(!perm) { console.log("rip"); return; }
	if(!perm.GRANTED) console.log("no perm");

	function toggleFacing() {
		setFacing(facing == CameraType.front ? CameraType.back : CameraType.front);
	}

	return (<View styles={styles.container}>
		<CameraView styles={styles.camera}
			facing={facing}>
		</CameraView>
	</View>);
};

const styles = StyleSheet.create({
	container: {
	},
	camera: {
		flex: 1
	}
});

