var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.z = 80;

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = true;

var keyLight = new THREE.DirectionalLight(new THREE.Color('hsl(30, 100%, 75%)'), 1.0);
keyLight.position.set(-100, 0, 100);

var fillLight = new THREE.DirectionalLight(new THREE.Color('hsl(240, 100%, 75%)'), 0.75);
fillLight.position.set(100, 0, 100);

var backLight = new THREE.DirectionalLight(0xffffff, 1.0);
backLight.position.set(100, 0, -100).normalize();

var backLight2 = new THREE.DirectionalLight(0xffffff, 1.0);
backLight2.position.set(0, 100, 0).normalize();

var backLight4 = new THREE.DirectionalLight(0xffffff, 1.0);
backLight4.position.set(0, 80, -20).normalize();

var backLight3 = new THREE.DirectionalLight(0xffffff, 1.0);
backLight3.position.set(0, 0, 70).normalize();

scene.add(keyLight);
scene.add(fillLight);
scene.add(backLight);
scene.add(backLight2);
scene.add(backLight3);
scene.add(backLight4);

var loader = new THREE.GLTFLoader();

THREE.DRACOLoader.setDecoderPath( '/assets/' );
loader.setDRACOLoader( new THREE.DRACOLoader() );

loader.load(
    '/assets/Monster.gltf',
    function ( gltf ) {

        scene.add( gltf.scene );

        gltf.animations; 
        gltf.scene; 
        gltf.scenes; 
        gltf.cameras; 
        gltf.asset; 

    },
    function ( xhr ) {

        console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

    },
    function ( error ) {

        console.log( 'An error happened' );

    }
);

var animate = function () {
	requestAnimationFrame( animate );
	controls.update();
	renderer.render(scene, camera);
};

animate();