let poses = [],
	skeletons = [];
let size = 8;


//https://stackoverflow.com/a/4429862
const video = document.getElementById("video");
const c = document.getElementById("canvas");
const ctx = c.getContext("2d");

video.addEventListener("loadedmetadata", () => {
	c.width = video.videoWidth;
	c.height = video.videoHeight;
});

function draw() {
	requestAnimationFrame(draw);

	//video
	ctx.drawImage(video, 0, 0, c.width, c.height);

	//skeleton and pose
	//ctx.fillStyle = "#00f";
	//for(let [x, y] of skeleton) {
	//	ctx.fillRect(x - 0.5 * size, y - 0.5 * size, size, size);
	//}

	ctx.fillStyle = "#ff8000";
	for(let pose of poses) {
		for(let [x, y] of pose) {
			ctx.fillRect(x - 0.5 * size, y - 0.5 * size, size, size);
		}
	}
}
video.addEventListener("play", draw);



//https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia#examples
navigator.mediaDevices
	.getUserMedia({ video: { facingMode: "environment" } })
	.then((stream) => {
		video.srcObject = stream;
		video.onloadedmetadata = () => { video.play(); };
	})
	.catch((ex) => {
		console.error(ex);
	});



//https://learn.ml5js.org/#/reference/posenet
const posenet = ml5.poseNet(
	video,
	{
		detectionType: "multiple"
	},
	() => {
		console.log("posenet loaded");
	});

//~	JANK 1.3!!!
let getXY = (x) => ([x["position"]["x"] * 1.3, x["position"]["y"]]);
let getPose = (x) => (x["pose"]["keypoints"].map(getXY));
posenet.on("pose", (results) => {
	if(results.length == 0 || results[0]["skeleton"].length == 0) return;

	console.log(results);
	poses = results.map(getPose);
	//skeleton = results[0]["skeleton"][0].map(getXY);
});


