// # Three.js Bibliotheken
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { BloomEffect, EffectComposer, EffectPass, RenderPass} from 'postprocessing';

// # Eigene Bibliotheken/Klassen
import { Audio_Processing } from './Audio';
import { Event_Handler } from './Event_Handling';
import { Scenaries, Cube_Scenary, Freq_Bar_Scenary, Camera_Control} from './Scenaries'
import { Enum_Visual_Method } from './Global_Collection';

//---------------------------------
//Three.js Szenen Initialisierungen
//---------------------------------
    //Scene
const scene = new THREE.Scene()
scene.background=new THREE.Color(0x000000)
    //Kamera
const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight,0.1,1000)
camera.position.z = 200
    //Renderer
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)
    //postprocessiung Bloom effekt:::
const composer = new EffectComposer(renderer)
composer.addPass(new RenderPass(scene,camera))
const effectpass = new EffectPass(camera,new BloomEffect({
    resolutionX:window.innerWidth,
    resolutionY:window.innerHeight,
    intensity:0.4,
    radius:0.1,
    luminanceThreshold:0.1}))
effectpass.renderToScreen=true
composer.addPass(effectpass)
    //AudioListener
const listener = new THREE.AudioListener()
camera.add(listener)

//-----------------
// # Eigene Klassen
//-----------------
const fft_size=2048
    //Liste aller Initialisierten Visualisierungs-Szenarien
var scenaries:Scenaries<THREE.Object3D>[]=[]

    //Visualisierungs-Szenario: mit pulsierenden Würfeln
const cube_scene_1 = new Cube_Scenary(scene,camera, fft_size/8,50,Enum_Visual_Method.Vis_Mitten)
scenaries.push(cube_scene_1)

const cube_scene_2 = new Cube_Scenary(scene,camera,22,0,Enum_Visual_Method.Vis_Bass)
scenaries.push(cube_scene_2)

const cube_scene_3 = new Cube_Scenary(scene,camera,100,2500,Enum_Visual_Method.Vis_Höhen)
scenaries.push(cube_scene_3)

// const bass_lines = new Bass_Line(scene,camera,50)
// scenaries.push(bass_lines)

const camera_control = new Camera_Control(scene,camera,0,0,Enum_Visual_Method.Vis_Mitten)
scenaries.push(camera_control)

    //Visualisierungs-Szenario: Frequenzgang mit Balken
const req_bar_scene = new Freq_Bar_Scenary(scene,camera,fft_size*(1/3),0,Enum_Visual_Method.Vis_Mitten)
scenaries.push(req_bar_scene)

    //Initialisierung der Three.js Audio-API funktionen
const visualizer = new Audio_Processing(listener,scenaries,fft_size)

    //Initialisierung des Eventhandlers
new Event_Handler(visualizer)  

//---------------------
// # Animationsschleife
//---------------------
function Animate() {

    //Visualisierung
    visualizer.Visualize()

    composer.render()
    requestAnimationFrame( Animate );
}

//disclaimer
alert("Das ist die Belegarbeit in INT von Josia Rudolph und Martin Görner (SS04-2023-TI1) \n Viel Spaß mit unserem Musikvisualisierer XD \n Die Bedienelemente erscheinen am Oberen Fensterrand")

alert("Disclaimer: Die von Uns verwendete Musik ist offiziell als NCS(no copyright sound) freigegeben")

//Animationsschleife starten (Einstiegspunkt)
Animate()