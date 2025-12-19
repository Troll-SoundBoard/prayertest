let page='home';
let user=JSON.parse(localStorage.user||'null');
let prayers=['Fajr','Dhuhr','Asr','Maghrib','Isha'];
let today=new Date().toDateString();
let checks=JSON.parse(localStorage.checks||'{}');

if(!user){
  user={name:'User',streak:2};
  localStorage.user=JSON.stringify(user);
}

function go(p){
  page=p;
  document.querySelectorAll('.navbar button').forEach(b=>b.classList.remove('active'));
  document.getElementById('nav-'+p).classList.add('active');
  render();
}

function render(){
  let app=document.getElementById('app');
  if(page==='home'){
    app.innerHTML=`
      <h1 style="border-bottom:1px solid rgba(255,255,255,.2);padding-bottom:10px">
        Hi ${user.name}
      </h1>
      ${user.streak>=2?`<h3>${user.streak} days in a row 🔥</h3><div class="moon"></div>`:''}
      <div class="card">
        <h2>Today's Prayers</h2>
        ${prayers.map(p=>`
          <div class="prayer">
            <span>${p}</span>
            <input type="checkbox" ${checks[today]?.includes(p)?'checked':''}
            onchange="toggle('${p}',this.checked)"/>
          </div>`).join('')}
      </div>`;
  }
  if(page==='calendar'){
    app.innerHTML='<h2>Calendar</h2><p>(basic grid coming next)</p>';
  }
  if(page==='settings'){
    app.innerHTML=`
      <h2>Profile</h2>
      <div class="card">
        <input value="${user.name}" 
        oninput="user.name=this.value;localStorage.user=JSON.stringify(user);render()"/>
      </div>
      <div class="card">
        <button onclick="openModal()">Sign out</button>
      </div>`;
  }
}

function toggle(p,val){
  checks[today]=checks[today]||[];
  if(val){checks[today].push(p);}
  else{checks[today]=checks[today].filter(x=>x!==p);}
  localStorage.checks=JSON.stringify(checks);
}

function openModal(){document.getElementById('modal').classList.remove('hidden');}
function closeModal(){document.getElementById('modal').classList.add('hidden');}
function confirmSignOut(){localStorage.clear();location.reload();}

go('home');
