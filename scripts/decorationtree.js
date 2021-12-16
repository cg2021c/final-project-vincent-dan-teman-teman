var loader = new THREE.GLTFLoader();
var spruce_tree1, spruce_tree2, spruce_tree3;
var elm_tree1, elm_tree2, elm_tree3;
var lp_tree1, lp_tree2, lp_tree3;
var single_tree1,
  single_tree2,
  single_tree3,
  single_tree4,
  single_tree5,
  single_tree6;

function main() {
  loader.load("./assets/map/spruce_tree/scene.gltf", SpruceTree1);
  loader.load("./assets/map/elm_tree/scene.gltf", ElmTree1);
  loader.load("./assets/map/low_poly_tree/scene.gltf", LPTree1);

  loader.load("./assets/map/spruce_tree/scene.gltf", SpruceTree2);
  loader.load("./assets/map/elm_tree/scene.gltf", ElmTree2);
  loader.load("./assets/map/low_poly_tree/scene.gltf", LPTree2);

  loader.load("./assets/map/spruce_tree/scene.gltf", SpruceTree3);
  loader.load("./assets/map/elm_tree/scene.gltf", ElmTree3);
  loader.load("./assets/map/low_poly_tree/scene.gltf", LPTree3);

  loader.load("./assets/map/low_poly_tree_single/scene.gltf", SingleTree1);
  loader.load("./assets/map/low_poly_tree_single/scene.gltf", SingleTree2);
  loader.load("./assets/map/low_poly_tree_single/scene.gltf", SingleTree3);
  loader.load("./assets/map/low_poly_tree_single/scene.gltf", SingleTree4);
  loader.load("./assets/map/low_poly_tree_single/scene.gltf", SingleTree5);
  loader.load("./assets/map/low_poly_tree_single/scene.gltf", SingleTree6);
}

function SpruceTree1(gltf) {
  handle_load(gltf, 500, 0, 5, 0.4, 90, 0, 0, spruce_tree1);
}

function ElmTree1(gltf) {
  handle_load(gltf, 450, 150, 5, 0.2, 90, 0, 0, elm_tree1);
}

function LPTree1(gltf) {
  handle_load(gltf, 500, -150, 5, 0.3, 90, 0, 0, lp_tree1);
}

function SpruceTree2(gltf) {
  handle_load(gltf, -350, -250, 5, 0.2, 90, 0, 0, spruce_tree2);
}

function ElmTree2(gltf) {
  handle_load(gltf, 100, 350, 5, 0.3, 90, 0, 0, elm_tree2);
}

function LPTree2(gltf) {
  handle_load(gltf, -400, 300, 5, 0.3, 90, 0, 0, lp_tree2);
}

function SpruceTree3(gltf) {
  handle_load(gltf, 500, -150, 5, 0.2, 90, 0, 0, spruce_tree3);
}

function ElmTree3(gltf) {
  handle_load(gltf, 400, 200, 5, 0.2, 90, 0, 0, elm_tree3);
}

function LPTree3(gltf) {
  handle_load(gltf, 290, -430, 5, 0.1, 90, 0, 0, lp_tree3);
}

function SingleTree1(gltf) {
  handle_load(gltf, 0, 300, 0, 40, 90, 0, 0, single_tree1);
}

function SingleTree2(gltf) {
  handle_load(gltf, 60, 350, 0, 40, 90, 0, 0, single_tree2);
}

function SingleTree3(gltf) {
  handle_load(gltf, -70, 320, 0, 40, 90, 0, 0, single_tree3);
}

function SingleTree4(gltf) {
  handle_load(gltf, -200, 350, 0, 50, 90, 0, 0, single_tree4);
}

function SingleTree5(gltf) {
  handle_load(gltf, 325, 350, 0, 60, 90, 0, 0, single_tree5);
}

function SingleTree6(gltf) {
  handle_load(gltf, 200, 320, 0, 40, 90, 0, 0, single_tree6);
}

function handle_load(gltf, x, y, z, sc, xr, yr, zr, mesh) {
  console.log(gltf);
  mesh = gltf.scene;
  console.log(mesh.children[0]);
  mesh.children[0].material = new THREE.MeshLambertMaterial();
  mesh.scale.set(sc, sc, sc);
  mesh.position.x = x;
  mesh.position.y = y;
  mesh.position.z = z;
  mesh.rotation.x = THREE.Math.degToRad(xr);
  mesh.rotation.y = THREE.Math.degToRad(yr);
  mesh.rotation.z = THREE.Math.degToRad(zr);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  console.log("ini mesh");
  console.log(mesh);
  scene.add(mesh);
}

main();
