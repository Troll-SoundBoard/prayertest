const prayers=['Fajr','Dhuhr','Asr','Maghrib','Isha']
const list=document.getElementById('prayers')

function startApp(){
  const u=username.value.trim()
  const l=location.value.trim()
  if(!u||!l) return
  localStorage.setItem('user',JSON.stringify({u,l}))
  signup.classList.add('hidden')
  app.classList.remove('hidden')
  document.getElementById('userInfo').innerText=`Hi ${u} • ${l}`
}

function signOut(){
  localStorage.clear()
  location.reload()
}

let state=JSON.parse(localStorage.getItem('state'))||{}

function render(){
  list.innerHTML=''
  prayers.forEach(p=>{
    const li=document.createElement('li')
    if(state[p]) li.classList.add('checked')
    li.innerHTML=`${p}<span>${state[p]?'✓':''}</span>`
    li.onclick=()=>{state[p]=!state[p];save()}
    list.appendChild(li)
  })
}
function save(){
  localStorage.setItem('state',JSON.stringify(state))
  render()
}
function show(id,btn){
  document.querySelectorAll('#app .page').forEach(p=>p.classList.remove('active'))
  document.getElementById(id).classList.add('active')
  document.querySelectorAll('.nav button').forEach(b=>b.classList.remove('active'))
  btn.classList.add('active')
}

const user=JSON.parse(localStorage.getItem('user'))
if(user){
  signup.classList.add('hidden')
  app.classList.remove('hidden')
  document.getElementById('userInfo').innerText=`Hi ${user.u} • ${user.l}`
}
render()
