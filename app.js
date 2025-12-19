const prayers=['Fajr','Dhuhr','Asr','Maghrib','Isha']
const list=document.getElementById('prayers')
let state=JSON.parse(localStorage.getItem('state'))||{}
function render(){list.innerHTML='';prayers.forEach(p=>{const li=document.createElement('li');if(state[p])li.classList.add('checked');li.innerHTML=`${p}<span>${state[p]?'✓':''}</span>`;li.onclick=()=>{state[p]=!state[p];save()};list.appendChild(li)})}
function save(){localStorage.setItem('state',JSON.stringify(state));render();updateStreak()}
function show(id,btn){document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));document.getElementById(id).classList.add('active');document.querySelectorAll('.nav button').forEach(b=>b.classList.remove('active'));btn.classList.add('active')}
function updateStreak(){let s=Number(localStorage.getItem('streak')||0);document.getElementById('streak').innerText=s+' day streak 🔥'}
function buildCalendar(){const g=document.getElementById('calendarGrid');const d=new Date();const days=new Date(d.getFullYear(),d.getMonth()+1,0).getDate();for(let i=1;i<=days;i++){const div=document.createElement('div');div.className='day';div.innerText=i;g.appendChild(div)}}
document.getElementById('save').onclick=()=>{localStorage.setItem('user',JSON.stringify({name:username.value,loc:location.value}))}
document.getElementById('signout').onclick=()=>modal.classList.remove('hidden')
function confirmSignOut(){localStorage.clear();location.reload()}
function closeModal(){modal.classList.add('hidden')}
render();buildCalendar();updateStreak();
