const prayers=['Fajr','Dhuhr','Asr','Maghrib','Isha'];

if(localStorage.user && localStorage.lat){
  signup.classList.remove('active');
  app.classList.add('active');
  loadTimes();
}

function useGPS(){
  navigator.geolocation.getCurrentPosition(p=>{
    localStorage.lat=p.coords.latitude;
    localStorage.lon=p.coords.longitude;
    alert('Location saved');
  });
}

function finishSignup(){
  if(!username.value || !localStorage.lat) return alert('Complete setup');
  localStorage.user=username.value;
  localStorage.method=method.value;
  signup.classList.remove('active');
  app.classList.add('active');
  loadTimes();
}

async function loadTimes(){
  const res=await fetch(
    `https://api.aladhan.com/v1/timings?latitude=${localStorage.lat}&longitude=${localStorage.lon}&method=${localStorage.method}`
  );
  const data=await res.json();
  const t=data.data.timings;
  prayersDiv.innerHTML='';

  prayers.forEach(p=>{
    const d=document.createElement('div');
    d.className='prayer';
    d.innerHTML=`
      <span>${p} (${t[p]})</span>
      <div class="check">✓</div>`;
    d.onclick=()=>toggle(d,p);
    prayersDiv.appendChild(d);
  });
}

function toggle(el,p){
  el.classList.toggle('checked');
  localStorage[p]=el.classList.contains('checked');
}

const prayersDiv=document.getElementById('prayers');
