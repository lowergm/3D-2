import * as Abstract from './three.module.js';
import { OrbitControls } from './OrbitControls.js';
import { DragControls } from './DragControls.js';


// área de renderização
const canvas = document.getElementById('jogo')

// tamanhos que serão usados na area de renderização
// definir uma cena
const scene = new Abstract.Scene();

// camera para visualizar os objetos
const camera = new Abstract.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.2, 9000);

// renderizador
const renderer = new Abstract.WebGLRenderer();

// definir o tamanho da area de renderização
renderer.setSize( canvas.clientWidth, canvas.clientHeight );

renderer.setPixelRatio(window.devicePixelRatio);

// Luz
const light = new Abstract.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 5).normalize();
scene.add(light)


// adicionar o renderizador na area de renderização
canvas.appendChild( renderer.domElement );

// tamanho dos cubos
const geometry = new Abstract.BoxGeometry(2, 2, 2);

// Chamar o input para redefinir cor do SkyBox
const corSkyBox = document.getElementById("")

// Função para criar o skybox
function criarSkybox() {
  const skyboxGeometry = new Abstract.BoxGeometry(1000, 1000, 1000);
  const skyboxMaterial = new Abstract.MeshBasicMaterial({ color: 0x87ceeb, side: Abstract.BackSide });
  return new Abstract.Mesh(skyboxGeometry, skyboxMaterial);
}

scene.add(criarSkybox())

// material dos cubos
let material = new Abstract.MeshStandardMaterial({
  color: 0xffffff,
  wireframe: false,
  roughness: 1.0,
  metalness: 0.5
});

// Função para criar o grid helper
function criarGridHelper() {
  return new Abstract.GridHelper(10, 10);
}

// adicionar o GridHelper na cena
scene.add(criarGridHelper())

// tamanho inicial de renderização
camera.position.z = 15;

// controles para navegar pela cena
const controls = new OrbitControls(camera, renderer.domElement);

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
    const esfera = new Abstract.Mesh(new Abstract.SphereGeometry(3, 32), material);
    esfera.position.x = 5;
    scene.add(esfera);
    objects.push(esfera);
})


// botão para criar os cubos
const cuboButton = document.getElementById('cubo');

// função para criar os botões
cuboButton.addEventListener('click', ()=>{
  const cubo = new Abstract.Mesh( geometry, material );

  scene.add(cubo);
  objects.push(cubo);
})

// função para rotacionar os objetos quando escrita no script
function abstractAnimation() {
  requestAnimationFrame(abstractAnimation);
  for (var i = 0; i < 5; i++) {
    objects.forEach(obj => obj.rotation.y += 0.02);// Animação de rotação para todos os objetos
  }
  renderer.render(scene, camera);
}

// script
const btnExecutar = document.getElementById('executarCod');

const interfac = document.getElementById('interface');

btnExecutar.addEventListener("click", () => {
  var cod = document.getElementById("cod").value;
  if (cod.includes("alert") || cod.includes("window") || cod.includes("document") || cod.includes("eval") || cod.includes("import")) {
    alert("Ops... Você colocou uma palavra que não podia");
    return;
  }
  const consoleLogOfc = console.log;
  
  console.log = function (mensagem) {
    alert(`Console:\n\n${mensagem}`)
  }
  
  function botao(texto, id){
    botao = document.createElement('button');
    botao.textContent = texto;
    
    botao.id = id;
  }
  
  try {
    const codigo = eval(cod);
  } catch (error) {
    alert("Console:\n\n" + error);
  }
});

$(function() {
    var availableTags = [
      // Variáveis e Tipos
      "var",
      "let",
      "const",
      "typeof",
      "instanceof",
      "new",
      "this",
      
      // Funções e Escopos
      "function",
      "return",
      "function name(parameters) { /* code */ }",
      "arrowFunction",
      "() => { /* code */ }",
      "arguments",
      "call()",
      "apply()",
      "bind()",
      "eval()",
      
      // Condicionais
      "if",
      "else",
      "switch",
      "case",
      "default",
      
      // Laços e Iterações
      "for",
      "for (let i = 0; i < array.length; i++) { /* code */ }",
      "for...in",
      "for...of",
      "while",
      "do...while",
      "break",
      "continue",
      "forEach()",
      "map()",
      "filter()",
      "reduce()",
      "some()",
      "every()",
      
      // Objetos
      "Object",
      "Object.create()",
      "Object.assign()",
      "Object.keys()",
      "Object.values()",
      "Object.entries()",
      "Object.freeze()",
      "Object.seal()",
      "Object.getPrototypeOf()",
      "Object.setPrototypeOf()",
      "Object.defineProperty()",
      "Object.defineProperties()",
      "Object.prototype",
      
      // Arrays
      "Array",
      "Array.isArray()",
      "Array.from()",
      "Array.of()",
      "Array.prototype.push()",
      "Array.prototype.pop()",
      "Array.prototype.shift()",
      "Array.prototype.unshift()",
      "Array.prototype.slice()",
      "Array.prototype.splice()",
      "Array.prototype.concat()",
      "Array.prototype.indexOf()",
      "Array.prototype.lastIndexOf()",
      "Array.prototype.includes()",
      "Array.prototype.find()",
      "Array.prototype.findIndex()",
      "Array.prototype.sort()",
      "Array.prototype.reverse()",
      "Array.prototype.join()",
      
      // Strings
      "String",
      "String.prototype.charAt()",
      "String.prototype.charCodeAt()",
      "String.prototype.concat()",
      "String.prototype.includes()",
      "String.prototype.endsWith()",
      "String.prototype.startsWith()",
      "String.prototype.indexOf()",
      "String.prototype.lastIndexOf()",
      "String.prototype.match()",
      "String.prototype.replace()",
      "String.prototype.slice()",
      "String.prototype.split()",
      "String.prototype.substring()",
      "String.prototype.toLowerCase()",
      "String.prototype.toUpperCase()",
      "String.prototype.trim()",
      
      // Números
      "Number",
      "Number.isFinite()",
      "Number.isInteger()",
      "Number.isNaN()",
      "Number.parseFloat()",
      "Number.parseInt()",
      "Math",
      "Math.abs()",
      "Math.ceil()",
      "Math.floor()",
      "Math.round()",
      "Math.max()",
      "Math.min()",
      "Math.random()",
      "Math.sqrt()",
      "Math.pow()",
      "Math.PI",
      
      // Funções Globais
      "console.log()",
      "console.warn()",
      "console.error()",
      "console.info()",
      "alert()",
      "prompt()",
      "confirm()",
      "setTimeout()",
      "setInterval()",
      "clearTimeout()",
      "clearInterval()",
      
      // JSON
      "JSON.parse()",
      "JSON.stringify()",
      
      // Data e Hora
      "Date",
      "Date.now()",
      "Date.parse()",
      "Date.UTC()",
      "Date.prototype.getDate()",
      "Date.prototype.getDay()",
      "Date.prototype.getFullYear()",
      "Date.prototype.getHours()",
      "Date.prototype.getMilliseconds()",
      "Date.prototype.getMinutes()",
      "Date.prototype.getMonth()",
      "Date.prototype.getSeconds()",
      "Date.prototype.getTime()",
      "Date.prototype.getTimezoneOffset()",
      "Date.prototype.getUTCDate()",
      "Date.prototype.getUTCDay()",
      "Date.prototype.getUTCFullYear()",
      "Date.prototype.getUTCHours()",
      "Date.prototype.getUTCMilliseconds()",
      "Date.prototype.getUTCMinutes()",
      "Date.prototype.getUTCMonth()",
      "Date.prototype.getUTCSeconds()",
      "Date.prototype.setDate()",
      "Date.prototype.setFullYear()",
      "Date.prototype.setHours()",
      "Date.prototype.setMilliseconds()",
      "Date.prototype.setMinutes()",
      "Date.prototype.setMonth()",
      "Date.prototype.setSeconds()",
      "Date.prototype.setTime()",
      "Date.prototype.setUTCDate()",
      "Date.prototype.setUTCFullYear()",
      "Date.prototype.setUTCHours()",
      "Date.prototype.setUTCMilliseconds()",
      "Date.prototype.setUTCMinutes()",
      "Date.prototype.setUTCMonth()",
      "Date.prototype.setUTCSeconds()",
      
      // Tratamento de Erros
      "try",
      "catch",
      "finally",
      "throw",
      "Error",
      
      // Estruturas de Dados
      "Map",
      "Set",
      "WeakMap",
      "WeakSet",
      
      // Manipulação de DOM
      "document.getElementById()",
      "document.getElementsByClassName()",
      "document.getElementsByTagName()",
      "document.querySelector()",
      "document.querySelectorAll()",
      "document.createElement()",
      "document.createTextNode()",
      "document.appendChild()",
      "document.removeChild()",
      "document.replaceChild()",
      "document.insertBefore()",
      "document.cloneNode()",
      "Element.innerHTML",
      "Element.textContent",
      "Element.style",
      "Element.addEventListener()",
      "Element.removeEventListener()",
      
      // Eventos
      "Event",
      "MouseEvent",
      "KeyboardEvent",
      "FocusEvent",
      "CustomEvent",
      
      // Outros
      "arguments",
      "window",
      "navigator",
      "screen",
      "history",
      "localStorage",
      "sessionStorage",
      "location",
      "fetch",
      "Promise",
      "async",
      "await",
      "class",
      "constructor",
      "super",
      "extends",
      "static",
      "export",
      "default",
      "module",
      "module.exports",
      "process",
      "Buffer",
      "Symbol",
      "Proxy",
      "Reflect",
      "RegExp",
      "typeof",
      "instanceof",
      "Infinity",
      "NaN",
      "undefined",
      "null",
      "true",
      "false",
      "void",
      "debugger",
      "with",
      "delete"
    ];
    $("#cod").autocomplete({
      source: availableTags
    });
});

const skyBoxOptions = document.querySelector("#skyBoxOptions");

const abrirEditor = document.getElementById('abrirEditor');

const editor = document.getElementById('codigo')

abrirEditor.onclick = function() {
  editor.show();
  renderer.setSize(0, 0);
  skyBoxOptions.close()
}

const salvarCod = document.getElementById('salvarEditor')

salvarCod.onclick = function() {
  editor.close();
  renderer.setSize(sizes.width, sizes.height);
}

// Selecionar os arquivos
const selecionarObjeto = document.getElementById("selecionarObjeto");

selecionarObjeto.addEventListener("change", ()=> {
  const objetoSelecionado = selecionarObjeto.value;
  
  if (objetoSelecionado === 'skyBox') {
    skyBoxOptions.show();
    skyBoxOptions.style.borderRadius = '5px';
    skyBoxOptions.style.border = 'none';
    skyBoxOptions.style.color = 'white';
    skyBoxOptions.style.background = '#3c4a5b';
    skyBoxOptions.style.height = '100vh';
    skyBoxOptions.style.overflow = 'auto';
    skyBoxOptions.style.left = '610px';
  }
  if (objetoSelecionado === 'escolherObjeto') {
    skyBoxOptions.close();
  }
})

window.addEventListener('resize', ()=>{
  renderer.setSize( canvas.clientWidth, canvas.clientHeight );
  camera.aspect = canvas.clientWidth / canvas.clientHeight;
  camera.updateProjectionMatrix();
})