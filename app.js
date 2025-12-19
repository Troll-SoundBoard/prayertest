const prayers=[
  ['Fajr','4:56 AM'],
  ['Dhuhr','11:36 AM'],
  ['Asr','2:31 PM'],
  ['Maghrib','4:50 PM'],
  ['Isha','6:20 PM']
];

const list=document.getElementById('prayerList');
prayers.forEach((p,i)=>{
  const d=document.createElement('div');
  d.className='row'+(i===4?' active':'');
  d.innerHTML=`<span>${p[0]}</span><strong>${p[1]}</strong>`;
  list.appendChild(d);
});
