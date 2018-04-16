// https://github.com/CodingTrain/website/blob/master/CodingChallenges/CC_57_Earthquake_Viz/sketch.js

let mapimage;
let api_key = 'pk.eyJ1IjoidmllcnRoIiwiYSI6ImNqYW56ODZ5YTRzem8ycWxvN280M2NiZXcifQ.23YgACzRSHsPEXufzi3poQ';

let centerlongitude = 0;
let centerlatitude = 30;
let mapwidth = 1024;
let mapheight = 512;
let zoom = 1;

let earthquakedata;

let currenttime;
let endtime;

function preload() {
  mapimage = loadImage('https://api.mapbox.com/styles/v1/mapbox/pirates/static/'+
            centerlongitude + "," +
            centerlatitude + "," +
            zoom + "/" +
            mapwidth + "x" +
            mapheight + '?access_token='+
            api_key);

  earthquakedata = loadJSON('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson');
}

// implements longitude to x
function mercX(longitude) {
  longitude = radians(longitude);
  var a = (256 / PI) * pow(2, zoom);
  var b = longitude + PI;
  return a * b;
}

// latitude to y
function mercY(latitude) {
  latitude = radians(latitude);
  var a = (256 / PI) * pow(2, zoom);
  var b = tan(PI / 4 + latitude / 2);
  var c = PI - log(b);
  return a * c;
}


function setup() {
  createCanvas(mapwidth, mapheight);
  translate(width / 2, height / 2);
  imageMode(CENTER);
  image(mapimage,0,0);
  currenttime =  earthquakedata.features[earthquakedata.features.length - 1].properties.time
  endtime = earthquakedata.features[0].properties.time
  for (i = 0; i<earthquakedata.features.length; i++){
    data = earthquakedata.features[i];
    let long = data.geometry.coordinates[0];
    let lat = data.geometry.coordinates[1];
    let x = mercX(long) - mercX(centerlongitude);
    let y = mercY(lat) - mercY(centerlatitude);
    
    if(x < - width/2) {
      x += width;
    } else if(x > width / 2) {
      x -= width;
    }
    earthquakedata.features[i].geometry.x = x
    earthquakedata.features[i].geometry.y = y
  }
}

function draw() {
  
  translate(width / 2, height / 2);
  imageMode(CENTER);
  image(mapimage,0,0);

  

  for (i = 0; i<earthquakedata.features.length; i++){
    data = earthquakedata.features[i]
    if (data.properties.time <= currenttime) {
      fill(255,0,255)
      ellipse(data.geometry.x, data.geometry.y, 4)
    }
  }
  fill(255)
  text(currenttime, -width/2 + 20, -height/2 + 20)
  currenttime += 100000

  // stop looping when the time is in the present
  if (currenttime > endtime){
    noLoop();
  }
}
