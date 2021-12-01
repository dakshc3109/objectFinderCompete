//main.js
objects = [];
var status = "";
var value = "";
var video = "";

function preload(){

}
function setup(){
    canvas = createCanvas(350, 250);
    canvas.position(470, 280);
    video = createCapture(VIDEO);
    video.hide();
}

function draw(){
    image(video, 0, 0, 350, 250);
    if(status != ""){
        objectDetector.detect(video, gotResults);
        for(i = 0; i < objects.length ; i++){
            fill("#ff0000");
            percentage = floor(objects[i].confidence*100);
            text(objects[i].label + " " + percentage + "%", objects[i].x+15, objects[i].y+15);
            noFill();
            stroke("#ff0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            document.getElementById("status").innerHTML = "Objects Detected";
            if(objects[i].label == value){
                document.getElementById("status-detction").innerHTML = value+" found";
                video.stop();
                objectDetector.detect(gotResults);
                var synth = window.speechSynthesis;
                var speech_data = value+" Found";
                var utter_this = new SpeechSynthesisUtterance(speech_data);
                synth.speak(utter_this);
            }
        }
        
    }
}

function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Detecting Objects";
    value = document.getElementById("input").value;
    console.log(value)
}

function modelLoaded(){
    console.log("model Loaded");
    status = true;
}

function gotResults(error, results){
    if(error){
        console.error();
    }
    else{   
         //console.log(results);
        objects = results;
        console.log(objects);
    }
}