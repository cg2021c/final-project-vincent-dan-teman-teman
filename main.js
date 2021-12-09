const scene = new THREE.Scene();

const car = createCar();
scene.add(car);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
dirLight.position.set(200, 500, 300);
scene.add(dirLight);

const aspectRatio = window.innerWidth / window.innerHeight;
const cameraWidth = 200;
const cameraHeight = cameraWidth / aspectRatio;

const camera = new THREE.OrthographicCamera(
  cameraWidth / -2,
  cameraWidth / 2,
  cameraHeight / 2,
  cameraHeight / -2, 
  0, 
  1000 
);
camera.position.set(200, 200, 200);
camera.lookAt(0, 10, 0);

// const camera = new THREE.PerspectiveCamera(
//     270,
//     cameraWidth/cameraHeight,
//     1, // near plane
//     700 // far plane
//   );
//   camera.position.set(0, 0, 50);
//   camera.rotation.order = 'XYZ';

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);
renderer.setAnimationLoop(() => {
  // car.rotation.y -= 0.007;
  // car.rotation.x -= 0.007;
  renderer.render(scene, camera);
});
document.body.appendChild(renderer.domElement);

function createCar() {
  const car = new THREE.Group();

  const bw = createWheels();
  bw.position.y = 6;
  bw.position.x = -30 ;
  bw.rotation.x = Math.PI/2;
  car.add(bw);

  // //For Car
  // const bw = createWheels();
  // bw.position.y = 6;
  // bw.position.x = -18 ;
  // bw.rotation.x = Math.PI/2;
  // car.add(bw);

  const fw = createWheels();
  fw.position.y = 6;
  fw.position.x = 30;
  fw.rotation.x = Math.PI/2;
  car.add(fw);
  
  //For Car
  // const fw = createWheels();
  // fw.position.y = 6;
  // fw.position.x = 30;
  // fw.rotation.x = Math.PI/2;
  // car.add(fw);

  const mainbody = new THREE.Mesh(
    new THREE.BoxBufferGeometry(80, 15, 30),
    new THREE.MeshLambertMaterial({ color: 0xffd800 })
  );
  mainbody.position.y = 12;
  car.add(mainbody);

  const uptop = new THREE.Mesh(
    new THREE.BoxBufferGeometry(80, 15, 30),
    new THREE.MeshLambertMaterial({ color: 0xffd800 })
  );
  uptop.position.y = 19;
  car.add(uptop);

  // //For Car
  // const mainbody = new THREE.Mesh(
  //   new THREE.BoxBufferGeometry(60, 15, 30),
  //   new THREE.MeshLambertMaterial({ color: 0xa52523 })
  // );
  // mainbody.position.y = 12;
  // car.add(mainbody);

  const carFrontTexture = getCarFrontTexture();

  const carBackTexture = getCarFrontTexture();

  const carRightSideTexture = getCarSideTexture();

  const carLeftSideTexture = getCarSideTexture();
  //For Flipping the side window so it can be on the same style as the right
  carLeftSideTexture.center = new THREE.Vector2(0.5, 0.5); //Make sure in the center
  carLeftSideTexture.rotation = Math.PI; //Turn 180 degrees but in radians
  carLeftSideTexture.flipY = false; //Then flip

  const roof = new THREE.Mesh(new THREE.BoxBufferGeometry(80, 12, 30), [
    new THREE.MeshLambertMaterial({ map: carFrontTexture }),
    new THREE.MeshLambertMaterial({ map: carBackTexture }),
    new THREE.MeshLambertMaterial({ color: 0xffd800 }),
    new THREE.MeshLambertMaterial({ color: 0xffffff }),
    new THREE.MeshLambertMaterial({ map: carRightSideTexture }),
    new THREE.MeshLambertMaterial({ map: carLeftSideTexture })
  ]);
  roof.position.x = 0;
  roof.position.y = 32.5;
  car.add(roof);

  // //For Car
  // const roof = new THREE.Mesh(new THREE.BoxBufferGeometry(33, 12, 24), [
  //   new THREE.MeshLambertMaterial({ map: carFrontTexture }),
  //   new THREE.MeshLambertMaterial({ map: carBackTexture }),
  //   new THREE.MeshLambertMaterial({ color: 0xffffff }), 
  //   new THREE.MeshLambertMaterial({ color: 0xffffff }),
  //   new THREE.MeshLambertMaterial({ map: carRightSideTexture }),
  //   new THREE.MeshLambertMaterial({ map: carLeftSideTexture })
  // ]);
  // roof.position.x = -6;
  // roof.position.y = 25.5;
  // car.add(roof);

  return car;
}

function createWheels() {
  const geometry = new THREE.CylinderGeometry( 8, 8, 32, 32 );
  const material = new THREE.MeshLambertMaterial({ color: 0x333333 });
  const wheel = new THREE.Mesh(geometry, material);
  return wheel;
}

function getCarFrontTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 60;
  canvas.height = 32;
  const context = canvas.getContext("2d");

  context.fillStyle = "#ffd800";
  //For Car
  // context.fillStyle="#ffffff";
  context.fillRect(0, 0, 64, 32);


  context.fillStyle = "#666666";
  context.fillRect(4 ,8, 53, 24);
  //Car Window
  //context.fillRect(8, 8, 48, 24);

  return new THREE.CanvasTexture(canvas);
}


function getCarSideTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 32;
  const context = canvas.getContext("2d");

  context.fillStyle = "#ffd800";
  //For Car
  // context.fillStyle="#ffffff";
  context.fillRect(0, 0, 128, 32);

  context.fillStyle = "#666666";
  context.fillRect(96, 8, 22, 22);
  context.fillRect(73, 8, 22, 22);
  context.fillRect(50, 8, 22, 22);
  context.fillRect(27, 8, 22, 22);
  context.fillRect(4, 8, 22, 22);
  
  //For Car
  // context.fillRect(10, 8, 38, 24);
  // context.fillRect(58, 8, 60, 24);

  return new THREE.CanvasTexture(canvas);
}
