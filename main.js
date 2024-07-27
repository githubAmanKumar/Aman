import * as THREE from 'three';
import { OrbitControls } from './orbit';



// scene
const scene = new THREE.Scene();

// camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// renderer
const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById("bg")
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

// Torus

const geometry = new THREE.TorusGeometry(10, 1.3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 'orangered', wireframe: true });

const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

// pointLight
const pointLight = new THREE.PointLight(0xffffff)

pointLight.position.set(5, 5, 5);

// ambientLight
const ambientLight = new THREE.AmbientLight(0xffffff)

scene.add(pointLight, ambientLight);

// Helper
const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);


scene.add(lightHelper, gridHelper);

const controls = new OrbitControls(camera, renderer.domElement)

renderer.render(scene, camera);

// star
function addStar() {

    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const star = new THREE.Mesh(geometry, material);
    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

    star.position.set(x, y, z);
    scene.add(star);
}

Array(200).fill().forEach(addStar)

// space
const spaceTexture = new THREE.TextureLoader().load('universe.png');
scene.background = spaceTexture;

// myphoto
const amanTexture = new THREE.TextureLoader().load('mypic.jpg');

const aman = new THREE.Mesh(
    new THREE.BoxGeometry(3, 3, 3),
    new THREE.MeshStandardMaterial({ map: amanTexture })
);
scene.add(aman);

// moon
const moonTexture = new THREE.TextureLoader().load('moon.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');

const moon = new THREE.Mesh(
    new THREE.SphereGeometry(3, 32, 32),
    new THREE.MeshStandardMaterial({ map: moonTexture, normalMap: normalTexture })
);
moon.position.z = 30;
moon.position.setX(-10)

aman.position.z = -5;
aman.position.x = 2;

scene.add(moon);

function moveCamera() {
    const t = document.body.getBoundingClientRect().top;

    moon.rotation.x += 0.05;
    moon.rotation.y += 0.075;
    moon.rotation.z += 0.05;

    aman.rotation.y += 0.01;

    camera.position.z = t * -0.01;
    camera.position.x = t * -0.0002;
    camera.position.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

// animation
function animate() {
    requestAnimationFrame(animate)

    torus.rotation.x += 0.01;
    torus.rotation.y += 0.005;
    torus.rotation.z += 0.01;

    aman.rotation.y += 0.005;

    controls.update();

    renderer.render(scene, camera)
}

animate();
// ==========================GSAP=========================
(function () {
    var tl = gsap.timeline();
    tl.from("#homeHeadings h1", {
        y: -30,
        opacity: 0,
        duration: 0.8,
        stagger: 1,
        delay: 0.5,
    }),
        tl.from("#homeHeadings h2", {
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 1,
            delay: -0.8
        })

    tl.to("#homeHeadings h2 p", {
        y: -10,
        duration: 1,
        stagger: 3,
        opacity: 1

    })

    gsap.from("#about h1", {
        y: 30,
        scale: 0.8,
        duration: 0.2,
        scrollTrigger: {
            trigger: "#about h1",
            scrroller: "body",
            start: "top 78%",
            end: "top 82%",
            // markers:true,
            scrub: 5
        }
    })
    gsap.from("#about p", {
        y: 30,
        scale: 0.8,
        duration: 0.2,
        scrollTrigger: {
            trigger: "#about p",
            scrroller: "body",
            start: "top 75%",
            end: "top 78%",
            // markers:true,
            scrub: 5
        }
    })
    gsap.from("#skills",{
        scale:0.8,
        y:30,
        duration:0.2,
        scrollTrigger:{
            trigger:"#skills",
            scrroller:"body",
            start: "top 75%",
            end: "top 78%",
            // markers:true,
            scrub: 5,
        }
    }) 
    gsap.from("#projects",{
        scale:0.9,
        y:30,
        duration:0.2,
        scrollTrigger:{
            trigger:"#projects",
            scrroller:"body",
            start: "top 75%",
            end: "top 78%",
            // markers:true,
            scrub: 5,
        }
    })
    gsap.from("#contact",{
        scale:0.8,
        y:30,
        duration:0.2,
        scrollTrigger:{
            trigger:"#contact",
            scrroller:"body",
            start: "top 75%",
            end: "top 78%",
            // markers:true,
            scrub: 5,
        }
    })

})()



