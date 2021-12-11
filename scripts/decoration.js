var loader = new THREE.GLTFLoader();
var building1_mesh, bank_mesh;

function main(){
    loader.load('./assets/map/building1/scene.gltf', building1);
}

function building1(gltf) {
    handle_load(gltf, -50, 315.0, 0, 1.5, 90, 0, 0, building1_mesh);
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