
function enterApp() {
  const name = document.getElementById('username').value.trim();
  if (!name) {
    alert('Username required');
    return;
  }
  localStorage.setItem('username', name);
  document.getElementById('hiUser').innerText = 'Hi ' + name;
  document.getElementById('signup').classList.add('hidden');
  document.getElementById('app').classList.remove('hidden');
}

function togglePrayer(cb) {
  const row = cb.parentElement;
  row.classList.toggle('checked', cb.checked);
}

function openModal() {
  document.getElementById('modal').classList.remove('hidden');
}

function closeModal() {
  document.getElementById('modal').classList.add('hidden');
}

function confirmSignOut() {
  localStorage.clear();
  closeModal();
  document.getElementById('app').classList.add('hidden');
  document.getElementById('signup').classList.remove('hidden');
}
