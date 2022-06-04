let montserrat;
var leftWristX = 0;
var rightWristX = 0;
var wristDifference = 0;

function preload() {
    montserrat = loadFont("Montserrat-Medium.ttf");
}

Webcam.set({
    width: 350,
    height: 350,
    ima_format: 'png',
    png_quality: 90
});

var displayCamera = document.getElementById("cameraCanvas ");
Webcam.attach( '#cameraCanvas' );

function setup() {
    canvas = createCanvas(349, 349);
    canvas.position(700, 150);
    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log("Model Loaded!");
}

function gotPoses(results) {
    if(results.length > 0) {
        leftWristX = results[0].pose.leftWrist.x;
        rightWristX = results[0].pose.rightWrist.x;
        wristDifference = floor(leftWristX - rightWristX - 40) / 2 ;
    }
}

function draw() {
    background("white");
    fill("black");
    if(wristDifference < 0) {
        textSize(0);
    } else {
        textSize(wristDifference);
    }
    textFont(montserrat);
    text('Hello World', 10, 300)
}