const prayers=['Fajr','Dhuhr','Asr','Maghrib','Isha']
const list=document.getElementById('prayers')
const error=document.getElementById('error')
let locationName=''

// --- LOCATION ---
navigator.geolocation.getCurrentPosition(
  pos=>{
    // no external API allowed, so show friendly text
    locationName='Your current location'
    locationText.innerText='📍 Location detected'
    where.innerText='📍 '+locationName
  },
  ()=>{
    locationText.innerText='Location permission denied'
  }
)

// --- SIGNUP ---
enterBtn.onclick=()=>{
  const u=username.value.trim()
  if(!u){ error.innerText='Username is required'; return }
  error.innerText=''
  localStorage.setItem('user',JSON.stringify({u,locationName}))
  signup.classList.add('hidden')
  app.classList.remove('hidden')
  userInfo.innerText='Hi '+u
}

// --- SIGN OUT ---
signoutBtn.onclick=()=>{
  localStorage.clear()
  location.reload()
}

// --- PRAYERS ---
let state=JSON.parse(localStorage.getItem('state'))||{}

function renderPrayers(){
  list.innerHTML=''
  prayers.forEach(p=>{
    const li=document.createElement('li')
    if(state[p]) li.classList.add('checked')
    li.innerHTML=`<span>${p}</span><span>${state[p]?'✓':''}</span>`
    li.addEventListener('click',()=>{
      state[p]=!state[p]
      localStorage.setItem('state',JSON.stringify(state))
      renderPrayers()
    })
    list.appendChild(li)
  })
}

// --- NAVBAR ---
document.querySelectorAll('.nav button').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('#app .page').forEach(p=>p.classList.remove('active'))
    document.getElementById(btn.dataset.page).classList.add('active')
    document.querySelectorAll('.nav button').forEach(b=>b.classList.remove('active'))
    btn.classList.add('active')
  })
})

// --- AUTO LOGIN ---
const user=JSON.parse(localStorage.getItem('user'))
if(user){
  signup.classList.add('hidden')
  app.classList.remove('hidden')
  userInfo.innerText='Hi '+user.u
  where.innerText='📍 '+(user.locationName||'Your location')
}

renderPrayers()
