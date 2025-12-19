const prayers=['Fajr','Dhuhr','Asr','Maghrib','Isha'];

function show(id){
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  document.querySelectorAll('.bottom-nav button').forEach(b=>b.classList.remove('active'));
  event.target.classList.add('active');
}

function useGPS(){
  navigator.geolocation.getCurrentPosition(p=>{
    localStorage.lat=p.coords.latitude;
    localStorage.lon=p.coords.longitude;
    loadTimes();
  });
}

async function loadTimes(){
  if(!localStorage.lat)return;
  const res=await fetch(
    `https://api.aladhan.com/v1/timings?latitude=${localStorage.lat}&longitude=${localStorage.lon}&method=${localStorage.method||2}`
  );
  const data=await res.json();
  const t=data.data.timings;
  prayersDiv.innerHTML='';
  prayers.forEach(p=>{
    const d=document.createElement('div');
    d.className='prayer';
    d.innerHTML=`<label><input type="checkbox"> ${p}</label><span>${t[p]}</span>`;
    prayersDiv.appendChild(d);
  });
  calcNext(t);
}

function calcNext(times){
  const now=new Date();
  for(const p of prayers){
    const [h,m]=times[p].split(':');
    const d=new Date();d.setHours(h,m,0);
    if(d>now){
      nextPrayer.innerText=p+' in '+Math.round((d-now)/60000)+' min';
      break;
    }
  }
}

function saveProfile(){
  localStorage.user=username.value;
  localStorage.method=method.value;
}

avatarInput.onchange=e=>{
  const r=new FileReader();
  r.onload=()=>{avatar.src=r.result;localStorage.avatar=r.result};
  r.readAsDataURL(e.target.files[0]);
};
if(localStorage.avatar)avatar.src=localStorage.avatar;

const prayersDiv=document.getElementById('prayers');
loadTimes();
