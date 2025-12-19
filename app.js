const prayers=['Fajr','Dhuhr','Asr','Maghrib','Isha'];
const list=document.getElementById('prayers');
prayers.forEach(p=>{
  const li=document.createElement('li');
  li.innerHTML=`<span>${p}</span><span>--:--</span>`;
  li.onclick=()=>li.style.background='#1fa97a';
  list.appendChild(li);
});
