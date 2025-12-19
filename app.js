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
  const res=await fetch(`https://api.aladhan.com/v1/timings?latitude=${localStorage.lat}&longitude=${localStorage.lon}&method=2`);
  const data=await res.json();
  const t=data.data.timings;
  renderList(t);
  updateStreak();
}

function renderList(times){
  prayerList.innerHTML='';
  const history=JSON.parse(localStorage.history||'{}');
  history[today]=history[today]||{};

  prayers.forEach(p=>{
    const row=document.createElement('div');
    row.className='row'+(history[today][p]?' checked':'');
    row.innerHTML=`<span>${p}</span><strong>${format(times[p])}</strong>`;
    row.onclick=()=>{
      history[today][p]=!history[today][p];
      localStorage.history=JSON.stringify(history);
      row.classList.toggle('checked');
      updateStreak();
    };
    prayerList.appendChild(row);
  });
}

function updateStreak(){
  const history=JSON.parse(localStorage.history||'{}');
  let streak=0;
  let d=new Date();
  while(true){
    const key=d.toISOString().split('T')[0];
    if(history[key]&&Object.values(history[key]).filter(Boolean).length===5){
      streak++;d.setDate(d.getDate()-1);
    } else break;
  }
  streakEl.innerText=`${streak} days in a row 🔥`;
}

function confirmSignOut(){
  if(confirm("Signing out will delete ALL prayer history, streaks, and profile data. This cannot be undone. Continue?")){
    localStorage.clear();
    location.reload();
  }
}

function format(t){
  let [h,m]=t.split(':');h=parseInt(h);
  const ampm=h>=12?'PM':'AM';h=h%12||12;
  return `${h}:${m} ${ampm}`;
}

const streakEl=document.getElementById('streak');
