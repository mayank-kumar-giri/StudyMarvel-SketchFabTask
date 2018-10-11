var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.z = 200;

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

scene.add(keyLight);
scene.add(fillLight);
scene.add(backLight);

var loader = new THREE.TextureLoader();
var bmesh = loader.load('/assets/BrickMes.jpg');
var br24 = loader.load('/assets/brick_24.jpg');
var b71 = loader.load('/assets/7_1_gree.jpg');
var bv = loader.load('/assets/Brick_v.jpg');
var koren = loader.load('/assets/koren_du.jpg');
var mar = loader.load('/assets/marble18.jpg');
var marw = loader.load('/assets/MarbleWh.jpg');
var plasw = loader.load('/assets/PlasterW.jpg');
var t600 = loader.load('/assets/Tile600.jpg');

var arr = [];
arr.push(bmesh);
arr.push(br24);
arr.push(b71);
arr.push(bv);
arr.push(koren);
arr.push(mar);
arr.push(marw);
arr.push(plasw);
arr.push(t600);



var tdsLoader = new THREE.TDSLoader();
// tdsLoader.setResourcePath('/assets/');
// tdsLoader.setResourcePath('/assets/');
tdsLoader.load('/assets/House_victorian.3ds', function (object) {
    var i = 0;
    object.traverse( function ( child ) {

        if ( child instanceof THREE.Mesh ) {

            child.material.normalMap = arr[i];
        }
        if(i>=arr.length) i=0;
        else i++;
    } );

    scene.add( object );

    });

var animate = function () {
    requestAnimationFrame( animate );
    controls.update();


    renderer.render(scene, camera);
};

animate();