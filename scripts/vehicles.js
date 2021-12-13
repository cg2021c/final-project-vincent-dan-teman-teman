// Vehicles: car, bus, and truck

function getCarFrontTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 60;
  canvas.height = 32;
  const context = canvas.getContext("2d");

  // context.fillStyle = "#ffd800";
  //For Car
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, 64, 32);


  context.fillStyle = "#666666";
  // context.fillRect(4 ,8, 53, 24);
  //Car Window
  context.fillRect(8, 8, 48, 24);

  return new THREE.CanvasTexture(canvas);
}


function getCarSideTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 32;
  const context = canvas.getContext("2d");

  // context.fillStyle = "#ffd800";
  //For Car
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, 128, 32);

  context.fillStyle = "#666666";
  // context.fillRect(96, 8, 22, 22);
  // context.fillRect(73, 8, 22, 22);
  // context.fillRect(50, 8, 22, 22);
  // context.fillRect(27, 8, 22, 22);
  // context.fillRect(4, 8, 22, 22);

  //For Car
  context.fillRect(10, 8, 38, 24);
  context.fillRect(58, 8, 60, 24);

  return new THREE.CanvasTexture(canvas);
}


function Car() {
  const car = new THREE.Group();

  const color = pickRandom(vehicleColors);

  const main = new THREE.Mesh(
    new THREE.BoxBufferGeometry(60, 30, 15),
    new THREE.MeshLambertMaterial({
      color
    })
  );
  main.position.z = 12;
  main.castShadow = true;
  main.receiveShadow = true;
  car.add(main);

  const carFrontTexture = getCarFrontTexture();
  carFrontTexture.center = new THREE.Vector2(0.5, 0.5);
  carFrontTexture.rotation = Math.PI / 2;

  const carBackTexture = getCarFrontTexture();
  carBackTexture.center = new THREE.Vector2(0.5, 0.5);
  carBackTexture.rotation = -Math.PI / 2;

  const carLeftSideTexture = getCarSideTexture();
  carLeftSideTexture.flipY = false;

  const carRightSideTexture = getCarSideTexture();

  const cabin = new THREE.Mesh(new THREE.BoxBufferGeometry(33, 24, 12), [
    new THREE.MeshLambertMaterial({
      map: carFrontTexture
    }),
    new THREE.MeshLambertMaterial({
      map: carBackTexture
    }),
    new THREE.MeshLambertMaterial({
      map: carLeftSideTexture
    }),
    new THREE.MeshLambertMaterial({
      map: carRightSideTexture
    }),
    new THREE.MeshLambertMaterial({
      color: 0xffffff
    }), // top
    new THREE.MeshLambertMaterial({
      color: 0xffffff
    }) // bottom
  ]);
  cabin.position.x = -6;
  cabin.position.z = 25.5;
  cabin.castShadow = true;
  cabin.receiveShadow = true;
  car.add(cabin);

  const backWheel = new Wheel();
  backWheel.position.x = -18;
  car.add(backWheel);

  const frontWheel = new Wheel();
  frontWheel.position.x = 18;
  car.add(frontWheel);

  if (config.showHitZones) {
    car.userData.hitZone1 = HitZone();
    car.userData.hitZone2 = HitZone();
  }

  return car;
}

function getBusFrontTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 60;
  canvas.height = 32;
  const context = canvas.getContext("2d");

  context.fillStyle = "#ffd800";
  context.fillRect(0, 0, 64, 32);


  context.fillStyle = "#666666";
  context.fillRect(4, 8, 53, 24);

  return new THREE.CanvasTexture(canvas);
}


function getBusSideTexture() {
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

function Bus() {
  const bus = new THREE.Group();

  const main = new THREE.Mesh(
    new THREE.BoxBufferGeometry(120, 40, 30),
    new THREE.MeshLambertMaterial({
      color: 0xffd800
    })
  );
  main.position.z = 30;
  main.castShadow = true;
  main.receiveShadow = true;
  bus.add(main);

  const uptop = new THREE.Mesh(
    new THREE.BoxBufferGeometry(120, 40, 30),
    new THREE.MeshLambertMaterial({
      color: 0xffd800
    })
  );
  uptop.position.z = 30;
  bus.add(uptop);

  const busFrontTexture = getBusFrontTexture();
  busFrontTexture.center = new THREE.Vector2(0.5, 0.5);
  busFrontTexture.rotation = Math.PI / 2;

  const busBackTexture = getBusFrontTexture();
  busBackTexture.center = new THREE.Vector2(0.5, 0.5);
  busBackTexture.rotation = -Math.PI / 2;

  const busLeftSideTexture = getBusSideTexture();
  busLeftSideTexture.flipY = false;

  const busRightSideTexture = getBusSideTexture();

  const cabin = new THREE.Mesh(new THREE.BoxBufferGeometry(120, 40, 30), [
    new THREE.MeshLambertMaterial({
      map: busFrontTexture
    }),
    new THREE.MeshLambertMaterial({
      map: busBackTexture
    }),
    new THREE.MeshLambertMaterial({
      map: busLeftSideTexture
    }),
    new THREE.MeshLambertMaterial({
      map: busRightSideTexture
    }),
    new THREE.MeshLambertMaterial({
      color: 0xffd800
    }), // top
    new THREE.MeshLambertMaterial({
      color: 0xffffff
    }) // bottom
  ]);
  cabin.position.x = 0;
  cabin.position.z = 60.5;
  cabin.castShadow = true;
  cabin.receiveShadow = true;
  bus.add(cabin);

  const backWheel = new Wheel();
  backWheel.position.x = -40;
  backWheel.position.z = 10;
  // backWheel.rotation.x = Math.PI/2;
  bus.add(backWheel);

  const frontWheel = new Wheel();
  frontWheel.position.x = 40;
  frontWheel.position.z = 10;
  // frontWheel.rotation.x = Math.PI/2;
  bus.add(frontWheel);

  if (config.showHitZones) {
    bus.userData.hitZone1 = HitZone();
    bus.userData.hitZone2 = HitZone();
    bus.userData.hitZone3 = HitZone();
  }

  return bus;
}

function getTruckFrontTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 32;
  canvas.height = 32;
  const context = canvas.getContext("2d");

  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, 32, 32);

  context.fillStyle = "#666666";
  context.fillRect(0, 5, 32, 10);

  return new THREE.CanvasTexture(canvas);
}

function getTruckSideTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 32;
  canvas.height = 32;
  const context = canvas.getContext("2d");

  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, 32, 32);

  context.fillStyle = "#666666";
  context.fillRect(17, 5, 15, 10);

  return new THREE.CanvasTexture(canvas);
}

function Truck() {
  const truck = new THREE.Group();
  const color = pickRandom(vehicleColors);

  const base = new THREE.Mesh(
    new THREE.BoxBufferGeometry(100, 25, 5),
    new THREE.MeshLambertMaterial({
      color: 0xb4c6fc
    })
  );
  base.position.z = 10;
  truck.add(base);

  const cargo = new THREE.Mesh(
    new THREE.BoxBufferGeometry(75, 35, 40),
    new THREE.MeshLambertMaterial({
      color: 0xffffff
    }) // 0xb4c6fc
  );
  cargo.position.x = -15;
  cargo.position.z = 30;
  cargo.castShadow = true;
  cargo.receiveShadow = true;
  truck.add(cargo);

  const truckFrontTexture = getTruckFrontTexture();
  truckFrontTexture.center = new THREE.Vector2(0.5, 0.5);
  truckFrontTexture.rotation = Math.PI / 2;

  const truckLeftTexture = getTruckSideTexture();
  truckLeftTexture.flipY = false;

  const truckRightTexture = getTruckSideTexture();

  const cabin = new THREE.Mesh(new THREE.BoxBufferGeometry(25, 30, 30), [
    new THREE.MeshLambertMaterial({
      color,
      map: truckFrontTexture
    }),
    new THREE.MeshLambertMaterial({
      color
    }), // back
    new THREE.MeshLambertMaterial({
      color,
      map: truckLeftTexture
    }),
    new THREE.MeshLambertMaterial({
      color,
      map: truckRightTexture
    }),
    new THREE.MeshLambertMaterial({
      color
    }), // top
    new THREE.MeshLambertMaterial({
      color
    }) // bottom
  ]);
  cabin.position.x = 40;
  cabin.position.z = 20;
  cabin.castShadow = true;
  cabin.receiveShadow = true;
  truck.add(cabin);

  const backWheel = Wheel();
  backWheel.position.x = -30;
  truck.add(backWheel);

  const middleWheel = Wheel();
  middleWheel.position.x = 10;
  truck.add(middleWheel);

  const frontWheel = Wheel();
  frontWheel.position.x = 38;
  truck.add(frontWheel);

  if (config.showHitZones) {
    truck.userData.hitZone1 = HitZone();
    truck.userData.hitZone2 = HitZone();
    truck.userData.hitZone3 = HitZone();
  }

  return truck;
}

function HitZone() {
  const hitZone = new THREE.Mesh(
    new THREE.CylinderGeometry(20, 20, 60, 30),
    new THREE.MeshLambertMaterial({
      color: 0xff0000
    })
  );
  hitZone.position.z = 25;
  hitZone.rotation.x = Math.PI / 2;

  scene.add(hitZone);
  return hitZone;
}

function Wheel() {
  const geometry = new THREE.CylinderGeometry(8, 8, 32, 32);
  const material = new THREE.MeshLambertMaterial({
    color: 0x333333
  });
  const wheel = new THREE.Mesh(geometry, material);
  return wheel;
}