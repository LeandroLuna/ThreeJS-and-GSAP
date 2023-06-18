import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { gsap } from 'gsap';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: false });

const loader = new GLTFLoader();
let objectModel;

const controls = new OrbitControls(camera, renderer.domElement);

function init() {
    scene.background = new THREE.Color(0x6A2AB8);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
}

function setCameraPosition(model) {
    const boundingBox = new THREE.Box3().setFromObject(model);
    const modelCenter = new THREE.Vector3();
    boundingBox.getCenter(modelCenter);

    camera.lookAt(modelCenter);
    controls.target.copy(modelCenter);

    camera.position.set(0, 4, 3);
    gsap.to(camera.position, {z: 5});
}

function animateModel(model) {
    gsap.to(model.rotation, {
        duration: 2,
        y: Math.PI * 2,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
    });
}

function loadModel() {
    return new Promise((resolve, reject) => {
        loader.load('/matilda/scene.gltf', (gltf) => {
            objectModel = gltf.scene;
            objectModel.scale.set(0.02, 0.02, 0.02);
            scene.add(objectModel);
            resolve(objectModel);
        }, (xhr) => {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        }, (error) => {
            reject(error);
        });
    });
}

function addLight() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
})

init();
loadModel().then((model) => {
    setCameraPosition(model);
    animateModel(model);
}).catch((error) => {
    console.error(error);
});
addLight();
animate();