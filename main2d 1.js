import * as Abstract from './three.module.js';
import { OrbitControls } from './OrbitControls.js';
import { DragControls } from './DragControls.js';


// área de renderização
const canvas = document.getElementById('jogo')

// tamanhos que serão usados na area de renderização
const sizes = {
  width: 350,
  height: 160
}

// definir uma cena
const scene = new Abstract.Scene();

// camera para visualizar os objetos
const camera = new Abstract.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.2, 9000);

// renderizador
const renderer = new Abstract.WebGLRenderer();

// definir o tamanho da area de renderização
renderer.setSize( sizes.width, sizes.height );

// adicionar o renderizador na area de renderização
canvas.appendChild( renderer.domElement );

// tamanho dos cubos
const geometry = new Abstract.BoxGeometry(2, 3, 2);

// material dos cubos
const material = new Abstract.MeshBasicMaterial({
  color: '',
});

// Função para criar o skybox
function criarSkybox() {
  const skyboxGeometry = new Abstract.BoxGeometry(1000, 1000, 1000);
  const skyboxMaterial = new Abstract.MeshBasicMaterial({ color: 0x87ceeb, side: Abstract.BackSide });
  return new Abstract.Mesh(skyboxGeometry, skyboxMaterial);
}

// adicionar o SkyBox na área de renderização
scene.add(criarSkybox())

// tamanho inicial de renderização
camera.position.z = 15;

// objetos
const objects = []

// controles para mover os objetos
const dcontrols = new DragControls(objects, camera, renderer.domElement);

// desativar os controles para mais suavidade
dcontrols.addEventListener('dragstart', ()=> {
  controls.enabled = false;
});
dcontrols.addEventListener('dragend', ()=>{
  controls.enabled = true;
});

// mostrar os objetos
function animacao() {
  
  requestAnimationFrame( animacao );
  
  
  renderer.render( scene, camera );
}

animacao();

// botão para criar as esfera
const esferaButton = document.getElementById('esfera');

// função para criar esferas
esferaButton.addEventListener('click', ()=> {
    const circulo = new Abstract.Mesh(new Abstract.CircleGeometry(3, 32), new Abstract.MeshBasicMaterial({ color: ''}));
    circulo.position.x = 5;
    scene.add(circulo);
    objects.push(circulo);
});

// botão para criar os cubos
const cuboButton = document.getElementById('cubo');

// função para criar os botões
cuboButton.addEventListener('click', ()=>{
  const quadrado = new Abstract.Mesh( geometry, material );

  scene.add(quadrado);
  objects.push(quadrado)
})

// função para rotacionar os objetos quando escrita no script
function abstractAnimation() {
  requestAnimationFrame(abstractAnimation);
  for (var i = 0; i < 5; i++) {
    objects.forEach(obj => obj.rotation.z += 0.02);// Animação de rotação para todos os objetos
  }
  renderer.render(scene, camera);
}

// script
const btnExecutar = document.getElementById('executarCod');

btnExecutar.addEventListener("click", ()=> {
  // input de
  const cod = document.getElementById('cod').value;
  
  var Result = document.getElementById("interfaceGame").innerHTML=cod;
});