// Main functions
window.focus();

const wheelGeometry = new THREE.BoxBufferGeometry(12, 33, 12);
const wheelMaterial = new THREE.MeshLambertMaterial({
  color: 0x333333
});
const treeTrunkGeometry = new THREE.BoxBufferGeometry(15, 15, 30);
const treeTrunkMaterial = new THREE.MeshLambertMaterial({
  color: treeTrunkColor
});
const treeCrownMaterial = new THREE.MeshLambertMaterial({
  color: treeCrownColor
});

const config = {
  showHitZones: false, //Change this to "true" to show hitbox hitbox
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
let mpc;
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
const scoreHead = document.getElementById("scorehead");
const instructionsElement = document.getElementById("instructions");
const resultsElement = document.getElementById("results");

setTimeout(() => {
  if (ready) instructionsElement.style.opacity = 1;
}, 1000);

// Initialize ThreeJs
// Set up camera
const aspectRatio = window.innerWidth / window.innerHeight;
const cameraWidth = 4000;
const cameraHeight = cameraWidth / aspectRatio;

camera = new THREE.PerspectiveCamera(95, cameraWidth / cameraHeight, 0.1, 20000 );

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  powerPreference: "high-performance"
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

// renderer.outputEncoding = THREE.sRGBEncoding;
const pmremGenerator = new THREE.PMREMGenerator(renderer);

const scene = new THREE.Scene();

scene.background = new THREE.Color(0xbfe3dd);

const playerCar = Bus();
scene.add(playerCar);
scene.add(camera);

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


if (config.grid) {
  const gridHelper = new THREE.GridHelper(80, 8);
  gridHelper.rotation.x = Math.PI / 2;
  scene.add(gridHelper);
}

renderer.render(scene, camera);

if (config.shadows) renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

reset();

function reset() {
  mpc = true;
  camera.position.set(0, -300, 50);
  camera.lookAt(new THREE.Vector3(0, 0, 0));
  playerAngleMoved = 0;
  score = 0;

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

  scoreElement.innerText = 0;
  renderer.render(scene, camera);

  ready = true;
  
}

function startGame() {
  if (ready) {
    mpc = true;
    ready = false;
    scoreElement.innerText = 0;
    instructionsElement.style.opacity = 0;
    renderer.setAnimationLoop(animation);
  }
}

function positionScoreElement() {
  scoreHead.style.cssText = `
    left: ${window.innerWidth / 20}px;
    top: ${window.innerHeight / 20}px
  `;
  scoreElement.style.cssText = `
    left: ${window.innerWidth / 20}px;
    top: ${window.innerHeight / 10}px
  `;
}