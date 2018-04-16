//https://github.com/CodingTrain/website/blob/master/CodingChallenges/CC_57_Earthquake_Viz/sketch.js

let mapimage;
let api_key = 'pk.eyJ1IjoidmllcnRoIiwiYSI6ImNqYW56ODZ5YTRzem8ycWxvN280M2NiZXcifQ.23YgACzRSHsPEXufzi3poQ';

let centerlongitude = 0;
let centerlatitude = 0;
let mapwidth = 1024;
let mapheight = 512;
let zoomlevel = 1;

function preload() {
  mapimage = loadImage('https://api.mapbox.com/styles/v1/mapbox/light-v9/static/'+
            centerlongitude + "," +
            centerlatitude + "," +
            zoomlevel + "/" +
            mapwidth + "x" +
            mapheight + '?access_token='+
            api_key);
}

function setup() {
  createCanvas(mapwidth, mapheight);
  translate(width / 2, height / 2);
  imageMode(CENTER);
  image(mapimage,0,0);
}

function draw() {
    noLoop();
}