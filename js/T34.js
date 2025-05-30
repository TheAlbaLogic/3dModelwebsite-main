//import the THREE.js libary
import * as THREE from"https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
// to allow for the camera to move around the screen
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
//to allow for importing the .gltf file 
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

//create a three,js scene
const scene = new THREE.Scene();
//create a new camera with positions and angles
const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight, 0.1, 1000);

//Keep track of the mouse position so we can make the eye move

let mouseX =  window.innerWidth / 2;
let mouseY = window.innerHeight / 2; 

// Keep the 3D object on a global variable so we can access it later
let object;

//OrbitControls allow the camera to move around the scene
let controls;

//set which object to render
let objToRender = 'T34';

//Instantiate a loader for the .GLTF file 
const loader = new GLTFLoader();

//load the file

loader.load(
    `models/T34.glb`,
    function(glb) {
        //if the file is loaded, add it to the scene
        object = glb.scene;
        scene.add(object);
    }, 
    function(xhr) {
        //while it is loading, log the process
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');

    },
    function (error){
        //if there is an error, log it
        console.error(error);
    }
);

//instantiate a new renderer and set its size

const renderer = new THREE.WebGLRenderer({ alpha: true}); //Alpha : true allows for the transparent background
renderer.setSize(window.innerWidth, window.innerHeight);

//add the renderer to the DOM 
document.getElementById("container3D").appendChild(renderer.domElement);

//Set how far the camera will be from the 3D model
camera.position.z = objToRender === "T34" ? 3 : 20;

// Add lights to the scene, so we can actually see the 3d model
const topLight = new THREE.DirectionalLight(0xffffff, 1); // (colour, intensity)
topLight.position.set(500,500,500) //top-left-ish
topLight.castShadow = true; 
scene.add(topLight);

const ambientLight = new THREE.AmbientLight(0x333333, objToRender === "T34" ? 0 : 0);
scene.add(ambientLight);

//This adds controls to the camera so we can rotate/ zoom it with the mouse

if ( objToRender === "T34") { 
    controls = new OrbitControls(camera, renderer.domElement);
}

//render the scene 
function animate(){
    requestAnimationFrame(animate);
    //Here we could add some code to update the scene, adding some automatic movement

    //make the eye move
    // if (object && objToRender === "eye"){
        //play with constraints to look good
        // object.rotation.y = -3 + mouseX / window.innerWidth * 3;
        // object.rotation.x = -1.2 + mouseY * 2.5 / window.innerHeight;
    // }
    renderer.render(scene, camera);
}

// Add a listener to the window so we can resize the window and the camera
window.addEventListener("resize",function(){
    camera.aspect = window.innerWidth / this.window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

//add mouse position listener, so we can make the eye move 
// document.onmousemove = (e) => {
//     mouseX = e.clientX;
//     mouseY = e.clientY;
// }

//start the 3d rendering
animate();

