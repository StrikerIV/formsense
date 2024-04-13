//https://www.tensorflow.org/lite/tutorials/pose_classification#define_functions_to_convert_the_pose_landmarks_to_a_pose_embedding_aka_feature_vector_for_pose_classification

function add(a, b) {
	return [a[0] + b[0], a[1] + b[1]];
}
function sub(a, b) {
	return [a[0] - b[0], a[1] - b[1]];
}

function getCenter(kp, li) {
	let lx = kp[li].x,
		ly = kp[li].y,
		rx = kp[li + 1].x,
		ry = kp[li + 1].y;
	return [0.5 * (lx + rx), 0.5 * (ly + ry)];
}

function norm(a) {
	return Math.hypot(...a);
}

export function embed(kp) {
	if(!kp || kp.length < 17) return;

	//compute pose center
	let hipCenter = getCenter(kp, 11);

	//compute pose size
	let shoulderCenter = getCenter(kp, 5);
	let torsoSize = norm(sub(hipCenter, shoulderCenter));
	let d = kp.map((x) => (norm(sub([x.x, x.y], hipCenter))));
	let maxDist = Math.max(...d);
	let poseSize = Math.max(torsoSize * 2.5, maxDist);

	//normalize pose keypoints
	let r = kp.map((x) => ({
		"score": x.score,
		"name": x.name,
		"x": (x.x - hipCenter[0]) / poseSize,
		"y": (x.y - hipCenter[1]) / poseSize
	}));
	return r;
};

