const prayers=['Fajr','Dhuhr','Asr','Maghrib','Isha'];
const today=new Date().toISOString().slice(0,10);
let data=JSON.parse(localStorage.getItem('data'))||{history:{},profile:{}};

enter.onclick=()=>{
 if(!username.value.trim()){
  error.innerText='Username required';
  return;
 }
 data.profile.name=username.value.trim();
 localStorage.setItem('data',JSON.stringify(data));
 signup.classList.remove('active');
 app.classList.add('active');
 init();
};

function init(){
 greet.innerText='Hi '+data.profile.name;
 editName.value=data.profile.name;
 renderPrayers();
 renderCalendar();
 calcStreak();
}

function renderPrayers(){
 prayersEl.innerHTML='';
 if(!data.history[today]) data.history[today]={};
 prayers.forEach(p=>{
  const li=document.createElement('li');
  li.className=data.history[today][p]?'checked':'';
  li.innerHTML=`<span>${p}</span><span>${data.history[today][p]?'✓':''}</span>`;
  li.onclick=()=>{
   data.history[today][p]=!data.history[today][p];
   localStorage.setItem('data',JSON.stringify(data));
   renderPrayers();
   renderCalendar();
   calcStreak();
  };
  prayersEl.appendChild(li);
 });
}

function renderCalendar(){
 calendarGrid.innerHTML='';
 const now=new Date();
 const days=new Date(now.getFullYear(),now.getMonth()+1,0).getDate();
 for(let i=1;i<=days;i++){
  const d=new Date(now.getFullYear(),now.getMonth(),i).toISOString().slice(0,10);
  const el=document.createElement('div');
  el.className='day';
  if(data.history[d] && prayers.every(p=>data.history[d][p])) el.classList.add('full');
  el.innerText=i;
  calendarGrid.appendChild(el);
 }
}

function calcStreak(){
 let s=0;
 for(let i=0;i<30;i++){
  const d=new Date();d.setDate(d.getDate()-i);
  const k=d.toISOString().slice(0,10);
  if(data.history[k] && prayers.every(p=>data.history[k][p])) s++;
  else break;
 }
 if(s>=2){
  streakBox.classList.remove('hidden');
  streak.innerText=s+' days in a row 🔥';
 } else {
  streakBox.classList.add('hidden');
 }
}

document.querySelectorAll('.nav button').forEach(btn=>{
 btn.onclick=()=>{
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.getElementById(btn.dataset.target).classList.add('active');
  document.querySelectorAll('.nav button').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
 };
});

signout.onclick=()=>modal.classList.remove('hidden');
cancel.onclick=()=>modal.classList.add('hidden');
confirm.onclick=()=>{
 localStorage.clear();
 location.reload();
};

if(data.profile.name){
 signup.classList.remove('active');
 app.classList.add('active');
 init();
}
