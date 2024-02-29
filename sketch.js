let facemesh;
let video;
let predictions = [];
let img;
let img2;


function preload() {
  img = loadImage("googly.jpg");
  img2 = loadImage("crown.jpg");
}


function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);

  facemesh = ml5.facemesh(video, modelReady);

  facemesh.on("predict", results => {
    predictions = results;
  });
  video.hide();
}

function modelReady() {
  console.log("Model ready!");
}

function draw() {
  image(video, 0, 0, width, height);

  drawKeypoints();
  printAnnotations();
}

function printAnnotations(){
  if (predictions.length > 0) {
    console.log(Object.keys(predictions[0].annotations))
    
//     const midEyes = predictions[0].annotations.midwayBetweenEyes[0];
//     let x =  predictions[0].annotations.midwayBetweenEyes[0][0];
//     let y =  predictions[0].annotations.midwayBetweenEyes[0][1];
//     console.log(midEyes)
  
    
     const noseTip = predictions[0].annotations.noseTip[0];
    let x =  noseTip[0];
    let y =  noseTip[1];
    console.log(noseTip)
    fill(255, 0, 0);
    ellipse(x,y,20,20)
    
    
    const leftEyeUpper0= predictions[0].annotations.leftEyeUpper0[0];
    let j =  leftEyeUpper0[0];
    let a =  leftEyeUpper0[1];
    console.log(leftEyeUpper0)
    fill(255, 0, 0);
  image(img, j-30, a-20, 50, 50);
    
     const rightEyeUpper0= predictions[0].annotations.rightEyeUpper0[0];
    let i =  rightEyeUpper0[0];
    let d =  rightEyeUpper0[1];
    console.log(rightEyeUpper0)
    fill(255, 0, 0);
  image(img, i-20, d-20, 50, 50);
    
    const midwayBetweenEyes= predictions[0].annotations.midwayBetweenEyes[0];
    let e =  midwayBetweenEyes[0];
    let n =  midwayBetweenEyes[1];
    console.log(midwayBetweenEyes)
    fill(255, 0, 0);
  image(img2, e-70, n-200, 150, 150);
    
    
  }
}





function drawKeypoints() {
  for (let i = 0; i < predictions.length; i += 1) {
    const keypoints = predictions[i].scaledMesh;
    // Draw facial keypoints.
    for (let j = 0; j < keypoints.length; j += 1) {
      const [x, y] = keypoints[j];
      fill(0, 255, 0);
      ellipse(x, y, 5, 5);

    }
  }
}
