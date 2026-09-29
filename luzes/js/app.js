import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";

// CENA, CÂMARA E RENDERER (Tema: Museu)
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0f172a);

const camera = new THREE.PerspectiveCamera(
  55, innerWidth / innerHeight, 0.1, 100
);
camera.position.set(6, 4, 8);
camera.lookAt(0, 1, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

// MATERIAIS
const azul = new THREE.MeshStandardMaterial({
  color: 0x64748b, // Cinza Cerâmico
  roughness: 0.80,  // Mate / Aveludado
  metalness: 0.05
});

const rosa = new THREE.MeshStandardMaterial({
  color: 0xe11d48, // Vermelho Escarlate
  roughness: 0.40,
  metalness: 0.20
});

const verde = new THREE.MeshStandardMaterial({
  color: 0xf59e0b, // Dourado Escultura
  roughness: 0.15,  // Polido
  metalness: 0.85   // Muito metálico
});

// OBJETOS
const cubo = new THREE.Mesh(new THREE.BoxGeometry(1.6, 1.6, 1.6), azul);
cubo.position.set(-2.2, 1, 0);

const esfera = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 16), rosa);
esfera.position.set(0, 1, 0);

const toro = new THREE.Mesh(new THREE.TorusGeometry(0.85, 0.3, 20, 64), verde);
toro.position.set(2.3, 1.1, 0);
toro.rotation.x = Math.PI / 2;

scene.add(cubo, esfera, toro);

// CHÃO (Mármore Polido Escuro)
const chao = new THREE.Mesh(
  new THREE.PlaneGeometry(12, 8),
  new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.20, metalness: 0.30 })
);
chao.rotation.x = -Math.PI / 2;
chao.receiveShadow = true;
scene.add(chao);

// SOMBRAS NOS OBJETOS
[cubo, esfera, toro].forEach(obj => {
  obj.castShadow = true;
  obj.receiveShadow = true;
});

// LUZ AMBIENTE (Suave para galeria)
const luzAmbiente = new THREE.AmbientLight(0xffffff, 0.20);
scene.add(luzAmbiente);

// LUZ DIRECIONAL (Foco de Holofote Amarelado)
const luz = new THREE.DirectionalLight(0xffeaad, 3.0);
luz.position.set(3, 8, 4);
luz.castShadow = true;
luz.shadow.mapSize.set(1024, 1024);
scene.add(luz);

let rodar = true;
let sombras = true;
let intensidadeAmbiente = 0.20;
let focoDireita = true;

function animar() {
  requestAnimationFrame(animar);

  if (rodar) {
    cubo.rotation.y += 0.008;
    esfera.rotation.y += 0.006;
    toro.rotation.z += 0.008;
  }

  renderer.render(scene, camera);
}
animar();

// BOTÕES DE CONTROLE
document.querySelector("#ambiente").onclick = () => {
  intensidadeAmbiente = intensidadeAmbiente === 0.20 ? 1.0 : 0.20;
  luzAmbiente.intensity = intensidadeAmbiente;
};

document.querySelector("#foco").onclick = () => {
  focoDireita = !focoDireita;
  luz.position.x = focoDireita ? 3 : -3;
  luz.position.z = focoDireita ? 4 : 2;
};

document.querySelector("#sombras").onclick = () => {
  sombras = !sombras;
  renderer.shadowMap.enabled = sombras;
  luz.castShadow = sombras;
  [cubo, esfera, toro].forEach(obj => obj.castShadow = sombras);
};

document.querySelector("#rodar").onclick = () => {
  rodar = !rodar;
};

document.querySelector("#reset").onclick = () => {
  azul.color.set(0x64748b);
  rosa.color.set(0xe11d48);
  verde.color.set(0xf59e0b);
  azul.roughness = 0.80; azul.metalness = 0.05;
  rosa.roughness = 0.40; rosa.metalness = 0.20;
  verde.roughness = 0.15; verde.metalness = 0.85;
  luzAmbiente.intensity = 0.20;
  intensidadeAmbiente = 0.20;
  luz.intensity = 3.0;
  luz.position.set(3, 8, 4);
  focoDireita = true;
  sombras = true;
  renderer.shadowMap.enabled = true;
  luz.castShadow = true;
  [cubo, esfera, toro].forEach(obj => obj.castShadow = true);
  rodar = true;
};

addEventListener("resize", () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});