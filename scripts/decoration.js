var loader = new THREE.GLTFLoader();
var decorationMesh;

function main(){
  loader.load('./assets/map/amusement_park/scene.gltf', amusementPark);
  loader.load('./assets/map/blackstone_apartments/scene.gltf', city);
  loader.load('./assets/map/low_poly_mountain_scene/scene.gltf', mountain);
  loader.load('./assets/map/forest_river/scene.gltf', river);
}

function amusementPark(gltf) {
  handle_load(gltf, -1150, 250.0, 0, 25, 90, 180, 0, decorationMesh);
}

function city(gltf) {
  handle_load(gltf, 0, -525.0, 0, 0.15, 90, 180, 0, decorationMesh);
}

function mountain(gltf) {
  handle_load(gltf, 0, 1550, 0, 150, 90, 90, 0, decorationMesh);
}

function river(gltf) {
  handle_load(gltf, 950, 0, 13, 3, 90, 90, 0, decorationMesh);
}

function handle_load(gltf, x, y, z, sc, xr, yr,zr, mesh) {
  console.log(gltf);
  mesh = gltf.scene;
  console.log(mesh.children[0]);
  mesh.children[0].material = new THREE.MeshLambertMaterial();
  mesh.scale.set(sc, sc, sc);    
  mesh.position.x = x;
  mesh.position.y = y;
  mesh.position.z = z;
  mesh.rotation.x = THREE.Math.degToRad( xr );
  mesh.rotation.y = THREE.Math.degToRad( yr );
  mesh.rotation.z = THREE.Math.degToRad( zr );
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  console.log("ini mesh")
  console.log(mesh)
  scene.add( mesh );
}

main()