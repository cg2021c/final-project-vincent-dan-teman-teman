var loader = new THREE.GLTFLoader();
var decorationMesh;

function main(){
    loader.load('./assets/map/amusement_park/scene.gltf', amusementPark); // comment aj kalo masih sayang laptop
    loader.load('./assets/map/city/scene.gltf', city); // comment aj kalo masih sayang laptop
}

function amusementPark(gltf) {
    handle_load(gltf, -1000, 250.0, 0, 25, 90, 180, 0, decorationMesh);
}

function city(gltf) {
    handle_load(gltf, 500, -1750.0, 4.5, 5, 90, 180, 0, decorationMesh);
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