import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

//Loading 
const textlo= new THREE.TextureLoader();
const golf = textlo.load('/texture/normie.png')

// Debug
// const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const geometry = new THREE.SphereGeometry(0.5,69,69);

// Materials

const material = new THREE.MeshStandardMaterial({color:0xffffff,roughness:0.01,metalness:1})
material.normalMap=golf

// Mesh
const sphere = new THREE.Mesh(geometry,material)
scene.add(sphere)

// Lights

const pointLight = new THREE.PointLight(0xff0000, 10)
pointLight.position.x = -4
pointLight.position.y =3.1
pointLight.position.z = -3
scene.add(pointLight)

// const redl=gui.addFolder('Red Light')
// redl.add(pointLight.position,'x').min(-6).max(6).step(0.01)
// redl.add(pointLight.position,'y').min(-5).max(5).step(0.01)
// redl.add(pointLight.position,'z').min(-3).max(3).step(0.01)
// redl.add(pointLight,'intensity').min(0).max(10).step(0.01)

// const h1= new THREE.PointLightHelper(pointLight,1)
// scene.add(h1)
const lite = new THREE.PointLight(0x0088ff, 10)
lite.position.set(6,-3.19,-3)
scene.add(lite)

// const bluel=gui.addFolder('Blue Light')
// bluel.add(lite.position,'x').min(-6).max(6).step(0.01)
// bluel.add(lite.position,'y').min(-5).max(5).step(0.01)
// bluel.add(lite.position,'z').min(-3).max(3).step(0.01)
// bluel.add(lite,'intensity').min(0).max(10).step(0.01)


// const h2= new THREE.PointLightHelper(lite,1)
// scene.add(h2)


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha:true,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
document.addEventListener('mousemove',susrat)
document.addEventListener('scroll',batwer)

let mouseX=0;

let mouseY=0;

let targetX=0

let targetY=0;


const hx=window.innerHeight/2;

const wy=window.innerWidth/2;

function susrat (e){
    mouseX= (e.clientX -hx)
    mouseY=(e.clientY - wy)
}
function batwer(e){
    sphere.position.y=window.scrollY*.001;
    sphere.position.z=window.scrollY*.01;
 

}

const clock = new THREE.Clock()

const tick = () =>
{
    targetX=mouseX*0.01;
    targetY=mouseY*0.001;
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = .5 * elapsedTime
    sphere.rotation.y+=.05 * (targetX -sphere.rotation.y)
    sphere.rotation.x+=.05 * (targetY -sphere.rotation.x)
    sphere.rotation.z+=-.05 * (targetY -sphere.rotation.x)
    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()