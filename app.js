
const prayers=["Fajr","Dhuhr","Asr","Maghrib","Isha"];

function show(id){
document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
document.getElementById(id).classList.add('active');
}

function completeSignup(){
const u=username.value.trim();
if(!u){username.placeholder="Required";return;}
localStorage.setItem("user",u);
show("home");
init();
}

function init(){
const u=localStorage.getItem("user");
if(!u){show("signup");return;}
hi.innerText="Hi "+u;
nameEdit.value=u;
renderPrayers();
}

function renderPrayers(){
prayersDiv=prayersEl=document.getElementById("prayers");
prayersDiv.innerHTML="";
prayers.forEach(p=>{
const done=localStorage.getItem(p)==="1";
const d=document.createElement("div");
d.className="prayer"+(done?" checked":"");
d.innerHTML=`<span>${p}</span><input type='checkbox' ${done?"checked":""}>`;
d.querySelector("input").onchange=e=>{
localStorage.setItem(p,e.target.checked?"1":"0");
renderPrayers();
};
prayersDiv.appendChild(d);
});
updateStreak();
}

function updateStreak(){
let count=0;
prayers.forEach(p=>{if(localStorage.getItem(p)==="1")count++;});
if(count===5){
let days=parseInt(localStorage.streak||0)+1;
localStorage.streak=days;
}
if(localStorage.streak>=2){
streak.innerText=localStorage.streak+" days in a row 🔥";
}
}

function openModal(){modal.classList.remove("hidden");}
function closeModal(){modal.classList.add("hidden");}

function signOut(){
localStorage.clear();
closeModal();
show("signup");
}

window.onload=init;
