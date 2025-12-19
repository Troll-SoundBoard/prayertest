const prayers = ['Fajr','Dhuhr','Asr','Maghrib','Isha'];
const list = document.getElementById('prayers');

let state = JSON.parse(localStorage.getItem('prayers')) || {};

function renderPrayers(){
  list.innerHTML='';
  prayers.forEach(p=>{
    const li=document.createElement('li');
    if(state[p]) li.classList.add('checked');
    li.innerHTML=`<span>${p}</span><span>${state[p]?'✓':''}</span>`;
    li.onclick=()=>{
      state[p]=!state[p];
      localStorage.setItem('prayers',JSON.stringify(state));
      renderPrayers();
    };
    list.appendChild(li);
  });
}

function showPage(id,btn){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  document.querySelectorAll('.bottom-nav button').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
}

renderPrayers();
