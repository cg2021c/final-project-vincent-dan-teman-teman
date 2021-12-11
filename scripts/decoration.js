var loader = new THREE.GLTFLoader();
var building1_mesh, building2_mesh, beach_mesh, beach_mesh1;

function main(){
    loader.load('./assets/map/building1/scene.gltf', building1);
    loader.load('./assets/map/building2/scene.gltf', building2);
    loader.load('./assets/map/beach/scene.gltf', beach);
    loader.load('./assets/map/beach2/scene.gltf', beach2);
}

function building1(gltf) {
    handle_load(gltf, -50, 315.0, 0, 1.5, 90, 0, 0, building1_mesh);
}

function building2(gltf) {
    handle_load(gltf, -225, 340.0, 0, 25, 80, 0, 0, building2_mesh);
}

function beach(gltf) {
    handle_load(gltf, -600, 400.0, 5, 50.5, 90, 0, 0, beach_mesh);
    // handle_load(gltf, -350, 315.0, 0, 50.5, 90, 0, 0, beach_mesh);
    // handle_load(gltf, -350, 315.0, 0, 50.5, 90, 0, 0, beach_mesh);
    // handle_load(gltf, -350, 315.0, 0, 50.5, 90, 0, 0, beach_mesh);
}

function beach2(gltf) {
    handle_load(gltf, -800, 315.0, 0, 20, 90, 0, 0, beach_mesh);
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