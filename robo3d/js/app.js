import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";

// 1. Criar Cena e Câmera
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xfffff8f);

const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 0.5, 8);

// 2. Criar Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

// 3. Criar Grupo Principal
const robo = new THREE.Group();
scene.add(robo);

// Função utilitária para criar malhas rapidamente
function mesh(geometria, cor) {
  return new THREE.Mesh(geometria, new THREE.MeshBasicMaterial({ color: cor }));
}

// ==========================================
// ESTRUTURA DO ROBÔ (TEMA: COZINHEIRO)
// ==========================================

// CORPO (Jaleco de Cozinheiro - Branco)
const corpo = mesh(new THREE.BoxGeometry(1.6, 2, 0.9), 0x000000);
robo.add(corpo);

// CABEÇA (Amarelo)
const cabeca = mesh(new THREE.BoxGeometry(1.3, 1.05, 1), 0xfacc15);
cabeca.position.y = 1.65;
robo.add(cabeca);

// BRAÇOS
const bracoE = mesh(new THREE.BoxGeometry(0.35, 1.8, 0.4), 0x000000);
bracoE.position.set(-1.1, 0.05, 0);
const bracoD = bracoE.clone();
bracoD.position.x = 1.1;
robo.add(bracoE, bracoD);

// PERNAS (Calça Vermelha)
const pernaE = mesh(new THREE.BoxGeometry(0.5, 1.6, 0.55), 0xdc2626);
pernaE.position.set(-0.48, -1.75, 0);
const pernaD = pernaE.clone();
pernaD.position.x = 0.48;
robo.add(pernaE, pernaD);

// OLHOS
const olhoE = mesh(new THREE.SphereGeometry(0.13, 16, 8), 0x111111);
olhoE.position.set(-0.3, 1.75, 0.51);
const olhoD = olhoE.clone();
olhoD.position.x = 0.3;
robo.add(olhoE, olhoD);

// ANTENA (Com acessório Vermelho na ponta)
const haste = mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.7, 12), 0xe2e8f0);
haste.position.y = 2.55;
const ponta = mesh(new THREE.SphereGeometry(0.14, 16, 8), 0xef4444);
ponta.position.y = 2.95;
robo.add(haste, ponta);

// ------------------------------------------
// ITEM 6 DA FICHA: A BOCA
// ------------------------------------------
const boca = mesh(new THREE.BoxGeometry(0.5, 0.1, 0.05), 0x1e293b);
boca.position.set(0, 1.4, 0.51);
robo.add(boca);

// ------------------------------------------
// ACESSÓRIOS DO TEMA (Chapéu de Chef e Espátula)
// ------------------------------------------
// Chapéu de Chef
const chapeuBase = mesh(new THREE.CylinderGeometry(0.55, 0.55, 0.3, 16), 0xffffff);
chapeuBase.position.y = 2.25;
const chapeuTopo = mesh(new THREE.CylinderGeometry(0.8, 0.6, 0.6, 16), 0xffffff);
chapeuTopo.position.y = 2.65;
robo.add(chapeuBase, chapeuTopo);

// Espátula na mão direita
const caboEspatula = mesh(new THREE.CylinderGeometry(0.03, 0.03, 1.2, 8), 0x78350f);
caboEspatula.position.set(1.1, -0.4, 0.4);
caboEspatula.rotation.x = Math.PI / 4;

const laminaEspatula = mesh(new THREE.BoxGeometry(0.25, 0.4, 0.02), 0x000000);
laminaEspatula.position.set(1.1, -0.1, 0.7);
laminaEspatula.rotation.x = Math.PI / 4;

robo.add(caboEspatula, laminaEspatula);

// ==========================================
// INTERFACE E CONTROLES (DOM)
// ==========================================
const painel = document.createElement("div");
painel.style.cssText = "position:absolute;top:20px;left:20px;display:flex;gap:8px;z-index:10;";
document.body.appendChild(painel);

const btnPausa = document.createElement("button"); btnPausa.id = "pausa"; btnPausa.textContent = "Pausar";
const btnLento = document.createElement("button"); btnLento.id = "lento"; btnLento.textContent = "Lento";
const btnNormal = document.createElement("button"); btnNormal.id = "normal"; btnNormal.textContent = "Normal";
const btnRapido = document.createElement("button"); btnRapido.id = "rapido"; btnRapido.textContent = "Rápido";
const btnAcenar = document.createElement("button"); btnAcenar.id = "acenar"; btnAcenar.textContent = "Acenar";
const btnReset = document.createElement("button"); btnReset.id = "reset"; btnReset.textContent = "Reset";

painel.append(btnPausa, btnLento, btnNormal, btnRapido, btnAcenar, btnReset);

// ==========================================
// LÓGICA DE ANIMAÇÃO E EVENTOS
// ==========================================
let velocidade = 1;
let pausado = false;
let acenar = false;
let tempo = 0;

function animar() {
  requestAnimationFrame(animar);

  if (!pausado) {
    robo.rotation.y += 0.008 * velocidade;
    tempo += 0.05 * velocidade;

    if (acenar) {
      bracoD.rotation.z = Math.sin(tempo) * 0.8;
    }
  }

  renderer.render(scene, camera);
}
animar();

// Eventos da Interface
btnPausa.onclick = function() {
  pausado = !pausado;
  this.textContent = pausado ? "Continuar" : "Pausar";
};

btnLento.onclick = () => velocidade = 0.4;
btnNormal.onclick = () => velocidade = 1;
btnRapido.onclick = () => velocidade = 2.5;

btnAcenar.onclick = function() {
  acenar = !acenar;
  this.textContent = acenar ? "Parar braço" : "Acenar";
  if (!acenar) bracoD.rotation.z = 0;
};

btnReset.onclick = () => {
  velocidade = 1; 
  pausado = false; 
  acenar = false; 
  tempo = 0;
  robo.rotation.set(0, 0, 0); 
  bracoD.rotation.set(0, 0, 0);
  btnPausa.textContent = "Pausar";
  btnAcenar.textContent = "Acenar";
};

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});