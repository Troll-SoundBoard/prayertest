const prayers=['Fajr','Dhuhr','Asr','Maghrib','Isha'];
const athan=document.getElementById('athan');

if(localStorage.user && localStorage.lat){
  signup.classList.remove('active');
  app.classList.add('active');
  initApp();
}

function useGPS(){
  navigator.geolocation.getCurrentPosition(async p=>{
    localStorage.lat=p.coords.latitude;
    localStorage.lon=p.coords.longitude;
    const res=await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${p.coords.latitude}&longitude=${p.coords.longitude}&localityLanguage=en`);
    const data=await res.json();
    localStorage.place=`${data.city}, ${data.countryName}`;
    alert('Location saved');
  });
}

function finishSignup(){
  if(!usernameInput.value||!localStorage.lat)return alert('Complete setup');
  localStorage.user=usernameInput.value;
  localStorage.method=method.value;
  signup.classList.remove('active');
  app.classList.add('active');
  initApp();
}

function initApp(){
  greeting.innerText=`Hi, ${localStorage.user}`;
  locationText.innerText=localStorage.place||'';
  methodSettings.value=localStorage.method;
  loadTimes();
}

function showTab(id,btn){
  document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  document.querySelectorAll('.bottom-nav button').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
}

function saveMethod(){
  localStorage.method=methodSettings.value;
  loadTimes();
}

async function loadTimes(){
  const res=await fetch(`https://api.aladhan.com/v1/timings?latitude=${localStorage.lat}&longitude=${localStorage.lon}&method=${localStorage.method}`);
  const data=await res.json();
  const t=data.data.timings;
  prayersDiv.innerHTML='';

  prayers.forEach(p=>{
    const time=format12h(t[p]);
    const d=document.createElement('div');
    d.className='prayer';
    if(localStorage[p]==='true')d.classList.add('checked');
    d.innerHTML=`<span>${p} (${time})</span><div class="check">✓</div>`;
    d.onclick=()=>toggle(d,p,t[p]);
    prayersDiv.appendChild(d);
  });
  scheduleNext(t);
}

function format12h(time){
  let [h,m]=time.split(':');h=parseInt(h);
  const ampm=h>=12?'PM':'AM';
  h=h%12||12;
  return `${h}:${m} ${ampm}`;
}

function toggle(el,p,time){
  el.classList.toggle('checked');
  localStorage[p]=el.classList.contains('checked');
}

function scheduleNext(times){
  const now=new Date();
  for(const p of prayers){
    const [h,m]=times[p].split(':');
    const d=new Date();d.setHours(h,m,0);
    if(d>now){
      nextPrayer.innerText=`Next: ${p} at ${format12h(times[p])}`;
      setTimeout(()=>athan.play(),d-now);
      break;
    }
  }
}

function testAthan(){athan.play();}

const prayersDiv=document.getElementById('prayers');
