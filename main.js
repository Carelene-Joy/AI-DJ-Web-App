song1 = ""
song2 = ""
scorerightwrist = 0
scoreleftwrist = 0
rx  = 0
lx = 0
ry = 0 
ly = 0
function preload () {
 song1 =   loadSound("popmusic.mp3")
 song2 =    loadSound("aquabarbiegirl.mp3")
}
function setup () {
    canvas = createCanvas(300,300)
canvas.position(540,200)
video = createCapture(VIDEO)
video.size(300,300)
video.hide()
posenet = ml5.poseNet(video,modelloaded)
posenet.on('pose', gotPoses)
}

function draw ()  {
    image(video,0,0,300,300)
    fill("red")
    if (scorerightwrist>0.2) {
        circle(rx,ry,20)
        song1.stop()
        song2.play()
        document.getElementById("songname").innerHTML=" Playing Aqua Barbie Girl"
    }
    if (scoreleftwrist>0.2) {
        circle(lx,ly,20)
        song2.stop()
        song1.play()
        document.getElementById("songname").innerHTML=" Playing Pop Music"
    }
    song1.setVolume(0.2)
    song2.setVolume(0.2)
}

function modelloaded () {
    console.log("The Model has been loaded")
}

function gotPoses (results) {
if (results.length>0) {
    console.log(results)
    scorerightwrist = results[0].pose.keypoints[10].score
    scoreleftwrist = results[0].pose.keypoints[9].score
    rx = results[0].pose.rightWrist.x
    lx = results[0].pose.leftWrist.x
    ry = results[0].pose.rightWrist.y
    ly = results[0].pose.leftWrist.y
}
}