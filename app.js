const prayers=['Fajr','Dhuhr','Asr','Maghrib','Isha'];
const today=new Date().toISOString().slice(0,10);
let data=JSON.parse(localStorage.getItem('data'))||{history:{},profile:{}};

navigator.geolocation.getCurrentPosition(async pos=>{
 const r=await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${pos.coords.latitude}&lon=${pos.coords.longitude}`);
 const d=await r.json();
 const loc=`${d.address.country}, ${d.address.city||d.address.town||d.address.village}`;
 locationText.innerText='📍 '+loc;
 where.innerText='📍 '+loc;
 data.profile.location=loc;
 localStorage.setItem('data',JSON.stringify(data));
});

enter.onclick=()=>{
 if(!username.value.trim()){error.innerText='Username is required';return;}
 data.profile.name=username.value.trim();
 localStorage.setItem('data',JSON.stringify(data));
 signup.classList.remove('active');app.classList.add('active');
 init();
};

function init(){
 greet.innerText=data.profile.name;
 editName.value=data.profile.name||'';
 bio.value=data.profile.bio||'';
 renderPrayers();renderCalendar();calcStreak();
}

function renderPrayers(){
 prayers.forEach(p=>{
  if(!data.history[today])data.history[today]={};
  const li=document.createElement('li');
  li.className=data.history[today][p]?'checked':'';
  li.innerHTML=`<span>${p}</span><span>${data.history[today][p]?'✓':''}</span>`;
  li.onclick=()=>{
    data.history[today][p]=!data.history[today][p];
    localStorage.setItem('data',JSON.stringify(data));
    li.classList.toggle('checked');
  };
  prayersEl.appendChild(li);
 });
}

function renderCalendar(){
 const c=document.getElementById('calendarGrid');
 c.innerHTML='';
 const now=new Date();
 const days=new Date(now.getFullYear(),now.getMonth()+1,0).getDate();
 for(let i=1;i<=days;i++){
  const d=document.createElement('div');
  d.className='day';
  d.innerText=i;
  c.appendChild(d);
 }
}

function calcStreak(){
 let streak=0;
 for(let i=0;i<30;i++){
  const d=new Date();d.setDate(d.getDate()-i);
  const k=d.toISOString().slice(0,10);
  if(data.history[k] && prayers.every(p=>data.history[k][p])) streak++;
  else break;
 }
 if(streak>=2){
  streakBox.classList.remove('hidden');
  streak.innerText=`${streak} days in a row 🔥`;
 }
}

signout.onclick=()=>modal.classList.remove('hidden');
cancel.onclick=()=>modal.classList.add('hidden');
confirm.onclick=()=>{localStorage.clear();location.reload();};

document.querySelectorAll('.nav button').forEach(b=>{
 b.onclick=()=>{
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.getElementById(b.dataset.target).classList.add('active');
  document.querySelectorAll('.nav button').forEach(x=>x.classList.remove('active'));
  b.classList.add('active');
 };
});

if(data.profile.name){
 signup.classList.remove('active');app.classList.add('active');init();
}
