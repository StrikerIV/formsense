//https://www.tensorflow.org/lite/tutorials/pose_classification#define_functions_to_convert_the_pose_landmarks_to_a_pose_embedding_aka_feature_vector_for_pose_classification

function add(a, b) {
	return [a[0] + b[0], a[1] + b[1]];
}
function sub(a, b) {
	return [a[0] - b[0], a[1] - b[1]];
}

function getCenter(kp, li) {
	let lx = kp[li].position.x,
		ly = kp[li].position.y,
		rx = kp[li + 1].position.x,
		ry = kp[li + 1].position.y;
	return [0.5 * (lx + rx), 0.5 * (ly + ry)];
}

function norm(a) {
	return Math.hypot(...a);
}

function keypointsToEmbedding(kp) {
	//compute pose center
	let hipCenter = getCenter(kp, 11);

	//compute pose size
	let shoulderCenter = getCenter(kp, 5);
	let torsoSize = norm(sub(hipCenter, shoulderCenter));
	let d = kp.map((x) => (norm(sub([x.position.x, x.position.y], hipCenter))));
	let maxDist = Math.max(...d);
	let poseSize = Math.max(torsoSize * 2.5, maxDist);

	//normalize pose keypoints
	return kp.map((x) => (sub([x.position.x, x.position.y], hipCenter).map((x) => (x / poseSize))));
};

let pose = [{"score":0.9997283816337585,"part":"nose","position":{"x":234.8660517295511,"y":226.943356406364}},{"score":0.999510645866394,"part":"leftEye","position":{"x":254.7606011772898,"y":208.47483074618685}},{"score":0.999715268611908,"part":"rightEye","position":{"x":213.93288994577608,"y":209.99020394648096}},{"score":0.8029155135154724,"part":"leftEar","position":{"x":279.6704000628876,"y":235.70783904554315}},{"score":0.8656876683235168,"part":"rightEar","position":{"x":185.0174407365257,"y":237.82010857697128}},{"score":0.9262546896934509,"part":"leftShoulder","position":{"x":342.12066472272465,"y":338.0602020976145}},{"score":0.9911097288131714,"part":"rightShoulder","position":{"x":140.92420466679079,"y":352.72763812588346}},{"score":0.652058482170105,"part":"leftElbow","position":{"x":418.3625844109383,"y":380.586881823113}},{"score":0.8144340515136719,"part":"rightElbow","position":{"x":98.23492087278849,"y":390.44422646904735}},{"score":0.15592890977859497,"part":"leftWrist","position":{"x":388.36239166760726,"y":375.52927276967563}},{"score":0.3261924088001251,"part":"rightWrist","position":{"x":76.472705885594,"y":382.3682544574663}},{"score":0.031097307801246643,"part":"leftHip","position":{"x":340.31421884024655,"y":425.81893149053076}},{"score":0.024221766740083694,"part":"rightHip","position":{"x":169.19451435252387,"y":424.8804367006057}},{"score":0.019799936562776566,"part":"leftKnee","position":{"x":361.30944255724955,"y":407.9718649897594}},{"score":0.010792138986289501,"part":"rightKnee","position":{"x":145.54665858643529,"y":421.79705616101216}},{"score":0.016348417848348618,"part":"leftAnkle","position":{"x":351.37177151928614,"y":408.8113528003025}},{"score":0.00601573521271348,"part":"rightAnkle","position":{"x":135.48449920773044,"y":409.8966623744148}}];

console.log(keypointsToEmbedding(pose));

