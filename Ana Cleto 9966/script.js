// alert("Bem vindo ao laboratório de multimédia!");
// cria uma variável que seleciona o elemneto com o id "titulo"

const titulo=document.querySelector("#titulo");
//altera a cor do titulo
titulo.style.color="red";
//altera o tamanho do titulo
titulo.style.fontSize="50px";
//altera o texto do titulo
titulo.innerHTML="Laboratório de multimédia - Exercício 3";

//cria uma avriavel que seleciona o elemento com o id "imagem"
const imagem=document.querySelectorAll("#imagem");

function rodar(){
    //altera a rotação da imagem
    imagem.style.transform="rotate(90deg)";
}

function crescer(){
    //altera o tamanho da imagem
    imagem.style.transform="scale(1.5)";
}

function encolher(){
    //altera a posição da imagem
    imagem.style.transform="scale(0.5)";
}

function mudarCor(){
    //altera a cor da imagem
    imagem.style.filter="invert(200%)";
}

function reiniciar(){
    //altera a rotação da imagem
    imagem.style.transform="rotate(0deg)";
    //altera o tamanho da imagem
    imagem.style.transform="scale(1)";
    //altera a posição da imagem
    imagem.style.transform="translateY(0px)";
    //altera a cor da imagem
    imagem.style.backgroundColor="rgb(154, 114, 114)";
}
