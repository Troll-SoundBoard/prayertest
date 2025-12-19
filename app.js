const prayers=['Fajr','Dhuhr','Asr','Maghrib','Isha'];
let state={page:'home'};

const today=()=>new Date().toDateString();

let user=JSON.parse(localStorage.user||'null');
let history=JSON.parse(localStorage.history||'{}');

if(user){start()} 

function signup(){
  const name=username.value.trim();
  if(!name){username.style.border='2px solid red';return}
  user={name,bio:bio.value||'',since:new Date().toISOString()};
  localStorage.user=JSON.stringify(user);
  start();
}

function start(){
  auth.classList.add('hidden');
  app.classList.remove('hidden');
  nav('home');
}

function nav(p){
  state.page=p;
  document.querySelectorAll('.navbar button').forEach(b=>b.classList.remove('active'));
  document.getElementById('nav-'+p).classList.add('active');
  render();
}

function streak(){
  let days=0;
  let d=new Date();
  while(true){
    const key=d.toDateString();
    if(history[key] && history[key].length===5){
      days++; d.setDate(d.getDate()-1);
    } else break;
  }
  return days>=2?days:0;
}

function render(){
  const c=document.getElementById('content');
  if(state.page==='home'){
    const s=streak();
    c.innerHTML=`
    <h1>Hi ${user.name}</h1>
    ${s?`<h3>${s} days in a row 🔥</h3><div class="moon"></div>`:''}
    <div class="card">
      <h2>Today's Prayers</h2>
      ${prayers.map(p=>{
        const checked=history[today()]?.includes(p);
        return `<div class="prayer ${checked?'checked':''}">
          <span>${p}</span>
          <input type="checkbox" ${checked?'checked':''}
            onchange="toggle('${p}',this.checked)">
        </div>`;
      }).join('')}
    </div>`;
  }
  if(state.page==='calendar'){
    c.innerHTML='<h2>Calendar</h2><p>Daily history stored.</p>';
  }
  if(state.page==='badges'){
    c.innerHTML='<h2>Badges</h2><p>Earn streaks to unlock badges.</p>';
  }
  if(state.page==='settings'){
    c.innerHTML=`
    <div class="card">
      <p><b>Name:</b> ${user.name}</p>
      <p><b>Bio:</b> ${user.bio||'—'}</p>
    </div>
    <div class="card">
      <button onclick="openModal()">Sign out</button>
    </div>`;
  }
}

function toggle(p,val){
  history[today()]=history[today()]||[];
  if(val && !history[today()].includes(p)) history[today()].push(p);
  if(!val) history[today()]=history[today()].filter(x=>x!==p);
  localStorage.history=JSON.stringify(history);
  render();
}

function openModal(){modal.classList.remove('hidden')}
function closeModal(){modal.classList.add('hidden')}
function confirmSignOut(){
  localStorage.clear();
  location.reload();
}
