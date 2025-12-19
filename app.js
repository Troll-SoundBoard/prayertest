const prayers=['Fajr','Dhuhr','Asr','Maghrib','Isha'];
const today=new Date().toISOString().split('T')[0];

if(localStorage.user){
  signup.classList.remove('active');
  app.classList.add('active');
  load();
}

function useGPS(){
  navigator.geolocation.getCurrentPosition(p=>{
    localStorage.lat=p.coords.latitude;
    localStorage.lon=p.coords.longitude;
    alert('Location saved');
  });
}

function finishSignup(){
  if(!usernameInput.value||!localStorage.lat)return alert('Complete setup');
  localStorage.user=usernameInput.value;
  signup.classList.remove('active');
  app.classList.add('active');
  load();
}

async function load(){
  todayTitle.innerText=new Date().toDateString();
  const res=await fetch(`https://api.aladhan.com/v1/timings?latitude=${localStorage.lat}&longitude=${localStorage.lon}&method=2`);
  const data=await res.json();
  renderPrayers(data.data.timings);
  renderCalendar();
  updateStreak();
}

function renderPrayers(times){
  prayerList.innerHTML='';
  const history=JSON.parse(localStorage.history||'{}');
  history[today]=history[today]||{};

  prayers.forEach(p=>{
    const d=document.createElement('div');
    d.className='prayer'+(history[today][p]?' checked':'');
    d.innerHTML=`<span>${p}</span><strong>${format(times[p])}</strong>`;
    d.onclick=()=>{
      history[today][p]=!history[today][p];
      localStorage.history=JSON.stringify(history);
      d.classList.toggle('checked');
      updateStreak();renderCalendar();
    };
    prayerList.appendChild(d);
  });
}

function renderCalendar(){
  const history=JSON.parse(localStorage.history||'{}');
  calendarList.innerHTML='';
  Object.keys(history).sort().reverse().forEach(day=>{
    const done=Object.values(history[day]).filter(Boolean).length;
    const div=document.createElement('div');
    div.className='prayer';
    div.innerText=`${day}: ${done}/5 prayers`;
    calendarList.appendChild(div);
  });
}

function updateStreak(){
  const history=JSON.parse(localStorage.history||'{}');
  let streak=0;let d=new Date();
  while(true){
    const key=d.toISOString().split('T')[0];
    if(history[key]&&Object.values(history[key]).filter(Boolean).length===5){
      streak++;d.setDate(d.getDate()-1);
    } else break;
  }
  streakEl.innerText=`${streak} days in a row 🔥`;
}

function showTab(id,btn){
  document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  document.querySelectorAll('.bottom-nav button').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
}

function confirmSignOut(){
  if(confirm("Signing out will delete ALL prayer history, streaks, and profile data. Continue?")){
    localStorage.clear();location.reload();
  }
}

function format(t){
  let [h,m]=t.split(':');h=parseInt(h);
  const ampm=h>=12?'PM':'AM';h=h%12||12;
  return `${h}:${m} ${ampm}`;
}

const streakEl=document.getElementById('streak');
