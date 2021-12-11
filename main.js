// import { RoomEnvironment } from "./lib/RoomEnvironment";

// Main functions
window.focus();

const wheelGeometry = new THREE.BoxBufferGeometry(12, 33, 12);
const wheelMaterial = new THREE.MeshLambertMaterial({ color: 0x333333 });
const treeTrunkGeometry = new THREE.BoxBufferGeometry(15, 15, 30);
const treeTrunkMaterial = new THREE.MeshLambertMaterial({
  color: treeTrunkColor
});
const treeCrownMaterial = new THREE.MeshLambertMaterial({
  color: treeCrownColor
});

const config = {
  showHitZones: false,
  shadows: true, 
  trees: true, 
  curbs: true, 
  grid: false 
};

let score;
const speed = 0.0017;

const playerAngleInitial = Math.PI;
let playerAngleMoved;
let accelerate = false; 
let decelerate = false; 

let otherVehicles = [];
let ready;
let lastTimestamp;

const trackRadius = 225;
const trackWidth = 45;
const innerTrackRadius = trackRadius - trackWidth;
const outerTrackRadius = trackRadius + trackWidth;

const arcAngle1 = (1 / 3) * Math.PI; // 60 degrees

const deltaY = Math.sin(arcAngle1) * innerTrackRadius;
const arcAngle2 = Math.asin(deltaY / outerTrackRadius);

const arcCenterX =
  (Math.cos(arcAngle1) * innerTrackRadius +
    Math.cos(arcAngle2) * outerTrackRadius) /
  2;

const arcAngle3 = Math.acos(arcCenterX / innerTrackRadius);

const arcAngle4 = Math.acos(arcCenterX / outerTrackRadius);

const scoreElement = document.getElementById("score");
const buttonsElement = document.getElementById("buttons");
const instructionsElement = document.getElementById("instructions");
const resultsElement = document.getElementById("results");
const accelerateButton = document.getElementById("accelerate");
const decelerateButton = document.getElementById("decelerate");

setTimeout(() => {
  if (ready) instructionsElement.style.opacity = 1;
  buttonsElement.style.opacity = 1;
}, 4000);

// Initialize ThreeJs
// Set up camera
const aspectRatio = window.innerWidth / window.innerHeight;
const cameraWidth = 2000;
const cameraHeight = cameraWidth / aspectRatio;

// const camera = new THREE.PerspectiveCamera(
//   270,
//   cameraWidth/cameraHeight,
//   1, // near plane
//   700 // far plane
// );

// camera.position.set(0, 0, 50);
// camera.rotation.order = 'XYZ';

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  powerPreference: "high-performance"
});
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize(window.innerWidth, window.innerHeight);
// renderer.outputEncoding = THREE.sRGBEncoding;
const pmremGenerator = new THREE.PMREMGenerator( renderer );

const camera = new THREE.OrthographicCamera(
  cameraWidth / -2, // left
  cameraWidth / 2, // right
  cameraHeight / 2, // top
  cameraHeight / -2, // bottom
  50, // near plane
  700 // far plane
);



camera.position.set(0, -210, 300);
camera.lookAt(0, 0, 0);

// controls.update();

const scene = new THREE.Scene();

scene.background = new THREE.Color( 0xbfe3dd );


const playerCar = Bus();
scene.add(playerCar);

renderMap(cameraWidth, cameraHeight * 2);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
dirLight.position.set(100, -300, 300);
dirLight.castShadow = true;
dirLight.shadow.mapSize.width = 1024;
dirLight.shadow.mapSize.height = 1024;
dirLight.shadow.camera.left = -400;
dirLight.shadow.camera.right = 350;
dirLight.shadow.camera.top = 400;
dirLight.shadow.camera.bottom = -300;
dirLight.shadow.camera.near = 100;
dirLight.shadow.camera.far = 800;
scene.add(dirLight);

// const cameraHelper = new THREE.CameraHelper(dirLight.shadow.camera);
// scene.add(cameraHelper);

if (config.grid) {
  const gridHelper = new THREE.GridHelper(80, 8);
  gridHelper.rotation.x = Math.PI / 2;
  scene.add(gridHelper);
}

if (config.shadows) renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

reset();

function reset() {

  playerAngleMoved = 0;
  score = 0;
  scoreElement.innerText = "Press UP";

  otherVehicles.forEach((vehicle) => {

    scene.remove(vehicle.mesh);
    if (vehicle.mesh.userData.hitZone1)
      scene.remove(vehicle.mesh.userData.hitZone1);
    if (vehicle.mesh.userData.hitZone2)
      scene.remove(vehicle.mesh.userData.hitZone2);
    if (vehicle.mesh.userData.hitZone3)
      scene.remove(vehicle.mesh.userData.hitZone3);
  });
  otherVehicles = [];

  resultsElement.style.display = "none";

  lastTimestamp = undefined;


  movePlayerCar(0);


  renderer.render(scene, camera);

  ready = true;
}

function startGame() {
  if (ready) {
    ready = false;
    scoreElement.innerText = 0;
    buttonsElement.style.opacity = 1;
    instructionsElement.style.opacity = 0;
    renderer.setAnimationLoop(animation);
  }
}

function positionScoreElement() {
  const arcCenterXinPixels = (arcCenterX / cameraWidth) * window.innerWidth;
  scoreElement.style.cssText = `
    left: ${window.innerWidth / 2 - arcCenterXinPixels * 1.3}px;
    top: ${window.innerHeight / 2}px
  `;
}

accelerateButton.addEventListener("mousedown", function () {
  startGame();
  accelerate = true;
});
decelerateButton.addEventListener("mousedown", function () {
  startGame();
  decelerate = true;
});
accelerateButton.addEventListener("mouseup", function () {
  accelerate = false;
});
decelerateButton.addEventListener("mouseup", function () {
  decelerate = false;
});
window.addEventListener("keydown", function (event) {
  if (event.key == "s") {
    startGame();
    accelerate = true;
    return;
  }
  if (event.key == "d") {
    decelerate = true;
    return;
  }
  if (event.key == "R" || event.key == "r") {
    reset();
    return;
  }
});
window.addEventListener("keyup", function (event) {
  if (event.key == "s") {
    accelerate = false;
    return;
  }
  if (event.key == "d") {
    decelerate = false;
    return;
  }
});

window.addEventListener("resize", () => {
  console.log("resize", window.innerWidth, window.innerHeight);

  // Adjust camera
  const newAspectRatio = window.innerWidth / window.innerHeight;
  const adjustedCameraHeight = cameraWidth / newAspectRatio;

  camera.top = adjustedCameraHeight / 2;
  camera.bottom = adjustedCameraHeight / -2;
  camera.updateProjectionMatrix(); // Must be called after change

  positionScoreElement();

  // Reset renderer
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.render(scene, camera);
});
