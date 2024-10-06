import * as Abstract from './three.module.js';
import { OrbitControls } from './OrbitControls.js';
import { DragControls } from './DragControls.js';

// Área de renderização
const canvas = document.getElementById('jogo');

// Tamanhos que serão usados na área de renderização
const sizes = {
  width: 350,
  height: 160
};

// Definir uma cena
const scene = new Abstract.Scene();

// Câmera para visualizar os objetos
const camera = new Abstract.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.2, 9000);

// Renderizador
const renderer = new Abstract.WebGLRenderer();

// Definir o tamanho da área de renderização
renderer.setSize(sizes.width, sizes.height);

// Adicionar o renderizador na área de renderização
canvas.appendChild(renderer.domElement);

// Tamanho dos cubos
const geometry = new Abstract.BoxGeometry(2, 3, 2);

// Material dos cubos
const material = new Abstract.MeshBasicMaterial({
  color: "",  // Cor verde para os cubos
});

// Função para criar o skybox
function criarSkybox() {
  const skyboxGeometry = new Abstract.BoxGeometry(1000, 1000, 1000);
  const skyboxMaterial = new Abstract.MeshBasicMaterial({ color: 0x87ceeb, side: Abstract.BackSide });
  return new Abstract.Mesh(skyboxGeometry, skyboxMaterial);
}

// Adicionar o SkyBox na área de renderização
scene.add(criarSkybox());

// Tamanho inicial de renderização
camera.position.z = 15;

// Objetos
const objects = [];

// Controles para mover os objetos
const dcontrols = new DragControls(objects, camera, renderer.domElement);

// Mostrar os objetos
function animacao() {
  requestAnimationFrame(animacao);
  renderer.render(scene, camera);
}

animacao();

// Botão para criar as esferas
const esferaButton = document.getElementById('esfera');

// Função para criar esferas
esferaButton.addEventListener('click', () => {
  const circulo = new Abstract.Mesh(new Abstract.CircleGeometry(3, 32), new Abstract.MeshBasicMaterial({ color: ""}));
  circulo.position.x = 5;
  scene.add(circulo);
  objects.push(circulo);
});

// Botão para criar os cubos
const cuboButton = document.getElementById('cubo');

// Função para criar os cubos
cuboButton.addEventListener('click', () => {
  const quadrado = new Abstract.Mesh(geometry, material);
  scene.add(quadrado);
  objects.push(quadrado);
});

// Função para rotacionar os objetos
function abstractAnimation() {
  requestAnimationFrame(abstractAnimation);
  objects.forEach(obj => obj.rotation.z += 0.02);  // Animação de rotação para todos os objetos
  renderer.render(scene, camera);
}

// Script customizado
const btnExecutar = document.getElementById('executarCod');

btnExecutar.addEventListener("click", () => {
  var cod = document.getElementById("cod").value;
  if (cod.includes("alert") || cod.includes("window") || cod.includes("document") || cod.includes("eval")) {
    alert("Ops... Você colocou uma palavra que não podia");
    return;
  }
  const consoleLogOfc = console.log;
  
  console.log = function(mensagem) {
    alert("Console:\n\n" + mensagem);
  };
  console.warn = function(mensagem) {
    alert("Console:\n\n" + mensagem);
  };
  
  try {
    const codigo = eval(cod);
  } catch (error) {
    alert("Console:\n\n" + error);
  }
});

$(function() {
    var availableTags = [
    "console.log();",
    "console.warn();",
    "prompt();",
    "const",
    "let",
    "var",
    `function name(parameters) {
  // code
}`,
      "addEventListener();",
      "Abstract",
      "abstractAnimation();",
      "eval();",
      "Function()",
      "function",
      `if () {
        // code
      }`,
      `for () {
        // code
      }`,
      `while true {
        // code
      }`,
      "while",
      "if",
      "for",
      "forEach()",
      "class",
      "this"
    ];
    $("#cod").autocomplete({
      source: availableTags
    });
  })

const abrirEditor = document.getElementById('abrirEditor');

const editor = document.getElementById('codigo')

abrirEditor.onclick = function() {
  editor.show();
  renderer.setSize(0, 0);
}

const salvarCod = document.getElementById('salvarEditor')

salvarCod.onclick = function() {
  editor.close();
  renderer.setSize(sizes.width, sizes.height);
}