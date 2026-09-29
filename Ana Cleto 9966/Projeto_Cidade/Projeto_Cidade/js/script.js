const cidade=document.querySelector("#cidade");
let rotacaoX=-25, rotacaoY=25, zoom=1, automatico=false, timer=null;

function atualizarCidade(){
  cidade.style.transform=`rotateX(${rotacaoX}deg) rotateY(${rotacaoY}deg) scale(${zoom})`;
}
document.querySelector("#esq").onclick=()=>{rotacaoY-=10;atualizarCidade()};
document.querySelector("#dir").onclick=()=>{rotacaoY+=10;atualizarCidade()};
document.querySelector("#cima").onclick=()=>{rotacaoX-=5;atualizarCidade()};
document.querySelector("#baixo").onclick=()=>{rotacaoX+=5;atualizarCidade()};
document.querySelector("#mais").onclick=()=>{zoom=Math.min(1.8,zoom+.1);atualizarCidade()};
document.querySelector("#menos").onclick=()=>{zoom=Math.max(.5,zoom-.1);atualizarCidade()};
document.querySelector("#auto").onclick=function(){
  automatico=!automatico;
  this.textContent=automatico?"Parar Auto":"Auto";
  if(automatico){timer=setInterval(()=>{rotacaoY+=2;atualizarCidade()},50)}
  else{clearInterval(timer)}
};
document.querySelector("#reset").onclick=()=>{
  clearInterval(timer);automatico=false;rotacaoX=-25;rotacaoY=25;zoom=1;
  document.querySelector("#auto").textContent="Auto";atualizarCidade();
};