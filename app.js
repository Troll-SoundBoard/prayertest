const prayers=['Fajr','Dhuhr','Asr','Maghrib','Isha'];
const list=document.getElementById('prayers');
const error=document.getElementById('error');

let locationName='';

navigator.geolocation.getCurrentPosition(async pos=>{
  const {latitude,longitude}=pos.coords;
  try{
    const res=await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
    const data=await res.json();
    locationName=`${data.address.country}, ${data.address.city || data.address.town || data.address.village}`;
    locationText.innerText='📍 '+locationName;
    where.innerText='📍 '+locationName;
  }catch{
    locationText.innerText='Location detected';
  }
});

enter.onclick=()=>{
  const u=username.value.trim();
  if(!u){
    error.innerText='Username is required';
    return;
  }
  localStorage.setItem('user',JSON.stringify({u,locationName}));
  signup.classList.remove('active');
  app.classList.add('active');
  userInfo.innerText='Hi '+u;
};

// PRAYERS
let state=JSON.parse(localStorage.getItem('state'))||{};
function renderPrayers(){
  list.innerHTML='';
  prayers.forEach(p=>{
    const li=document.createElement('li');
    if(state[p]) li.classList.add('checked');
    li.innerHTML=`<span>${p}</span><span>${state[p]?'✓':''}</span>`;
    li.onclick=()=>{
      state[p]=!state[p];
      localStorage.setItem('state',JSON.stringify(state));
      renderPrayers();
    };
    list.appendChild(li);
  });
}

// NAV
document.querySelectorAll('.nav button').forEach(btn=>{
  btn.onclick=()=>{
    document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
    document.getElementById(btn.dataset.target).classList.add('active');
    document.querySelectorAll('.nav button').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
  };
});

// MODAL
signout.onclick=()=>modal.classList.remove('hidden');
cancel.onclick=()=>modal.classList.add('hidden');
confirm.onclick=()=>{
  localStorage.clear();
  location.reload();
};

// AUTO LOGIN
const user=JSON.parse(localStorage.getItem('user'));
if(user){
  signup.classList.remove('active');
  app.classList.add('active');
  userInfo.innerText='Hi '+user.u;
  if(user.locationName) where.innerText='📍 '+user.locationName;
}

renderPrayers();
