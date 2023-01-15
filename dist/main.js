import './style.css'

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75 , window.innerWidth / window.innerHeight , 0.1 ,1000 );


const renderer  = new THREE.WebGLRenderer({
  canvas : document.querySelector('#bg')
});

var carousel = $(".carousel"),
    currdeg  = 0;


$(".push--skeuo1").on("click", { d: "n" }, rotate);
$(".push--skeuo2").on("click", { d: "p" }, rotate);

document.getElementById("a").style.visibility = "visible";
document.getElementById("b").style.visibility = "visible";
document.getElementById("c").style.visibility = "hidden";
document.getElementById("d").style.visibility = "hidden";
document.getElementById("e").style.visibility = "visible";
let increment = 2;
let number = 0

function rotate(e){

  increment++;
  if(e.data.d=="n"){
    currdeg = currdeg - 72;
    
  }
  if(e.data.d=="p"){
    currdeg = currdeg + 72;
    
  }
  
  if(currdeg >= 0){
    number = Math.abs(currdeg-360)/72;
  }
  if(currdeg < 0){
    number = Math.abs(currdeg)/72;
  }
  
  switch (true) {
   
    case Array.from({length:increment}, (_, i) => (i ) * 5).includes(number) :
      document.getElementById("a").style.visibility = "visible";
      document.getElementById("b").style.visibility = "visible";
      document.getElementById("c").style.visibility = "hidden";
      document.getElementById("d").style.visibility = "hidden";
      document.getElementById("e").style.visibility = "visible";
      break;
    case  Array.from({length:increment}, (_, i) => (i ) * 5+1).includes(number) :
      document.getElementById("a").style.visibility = "visible";
      document.getElementById("b").style.visibility = "visible";
      document.getElementById("c").style.visibility = "visible";
      document.getElementById("d").style.visibility = "hidden";
      document.getElementById("e").style.visibility = "hidden";

      break;
      case  Array.from({length:increment}, (_, i) => (i ) * 5+2).includes(number) :
      document.getElementById("a").style.visibility = "hidden";
      document.getElementById("b").style.visibility = "visible";
      document.getElementById("c").style.visibility = "visible";
      document.getElementById("d").style.visibility = "visible";
      document.getElementById("e").style.visibility = "hidden";
      break;

    case [3, 8, 13].includes(number) :
      case  Array.from({length:increment}, (_, i) => (i ) * 5+3).includes(number) :
      document.getElementById("a").style.visibility = "hidden";
      document.getElementById("b").style.visibility = "hidden";
      document.getElementById("c").style.visibility = "visible";
      document.getElementById("d").style.visibility = "visible";
      document.getElementById("e").style.visibility = "visible";
      break;

      case  Array.from({length:increment}, (_, i) => (i ) * 5+4).includes(number) :
      document.getElementById("a").style.visibility = "visible";
      document.getElementById("b").style.visibility = "hidden";
      document.getElementById("c").style.visibility = "hidden";
      document.getElementById("d").style.visibility = "visible";
      document.getElementById("e").style.visibility = "visible";
      break;
    
    default:
      console.log(`Sorry, we are out of ${currdeg}.`);
  }

 
  console.log(`CurrDeg :${Math.abs(currdeg)/72}.`);



  carousel.css({
    "-webkit-transform": "rotateY("+currdeg+"deg)",
    "-moz-transform": "rotateY("+currdeg+"deg)",
    "-o-transform": "rotateY("+currdeg+"deg)",
    "transform": "rotateY("+currdeg+"deg)"
  });
}







// const geometry =  new THREE.TorusGeometry(10,3,16,100);
// const material =  new THREE.MeshStandardMaterial( {color : 0xFF6347});
// const torus =  new THREE.Mesh(geometry,material);

// scene.add(torus)

const pointLight = new THREE.PointLight(0xFFFFFF)
pointLight.position.set(20,20,20)
scene.add(pointLight)

// // const gridHelper = new THREE.GridHelper(200,50);
// // scene.add(gridHelper)

const controls = new OrbitControls(camera, renderer.domElement);


// // const ambientLight = new THREE.AmbientLight(0xFFFFFF)
// // scene.add(ambientLight)


function addStar(){
  const geometry = new THREE.SphereGeometry(0.25,24,24);
  const material = new THREE.MeshStandardMaterial( { color : 0xffffff})
  const star = new THREE.Mesh(geometry,material);

  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100) );
  star.position.set(x,y,z);
  scene.add(star)
}

Array(200).fill().forEach(addStar);


// //moi 
// const moiTexture =  new THREE.TextureLoader().load('moi.png');
// const moi = new THREE.Mesh(
//   new THREE.BoxGeometry(3,3,3),
//   new THREE.MeshBasicMaterial({ map: moiTexture})
// )
// scene.add(moi)

const gamingTexture = new THREE.TextureLoader().load('arcade3.jpg');
scene.background = gamingTexture;

function moveCamera(){
  const t = document.body.getBoundingClientRect().top;

  // moi.rotation.y += 0.01;
  // moi.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002;

}
document.body.onscroll = moveCamera

function animate() {
  requestAnimationFrame( animate);
  // torus.rotation.x += 0.01;
  // torus.rotation.y += 0.005;
  // torus.rotation.z += 0.01;

  controls.update();

  renderer.render(scene,camera);
}

animate() 
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth,window.innerHeight);
camera.position.setZ(30);
renderer.render(scene , camera);
