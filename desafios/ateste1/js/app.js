document.addEventListener('DOMContentLoaded', ()=>{
  const loginForm = document.getElementById('loginForm')
  const loginScreen = document.getElementById('loginScreen')
  const dashboard = document.getElementById('dashboard')
  const userLabel = document.getElementById('userLabel')
  const logoutBtn = document.getElementById('logoutBtn')

  function showDashboard(username){
    userLabel.textContent = username || 'Usuário'
    loginScreen.classList.add('hidden')
    dashboard.classList.remove('hidden')
    // animate stat cards
    document.querySelectorAll('.stat').forEach((el,i)=>{
      setTimeout(()=>{
        el.style.opacity = 1
        const value = Number(el.dataset.value)||0
        const span = document.createElement('div')
        span.className = 'count'
        el.textContent = ''
        el.appendChild(span)
        countUp(span, value, 800 + i*200)
      }, 150 + i*160)
    })
  }

  function hideDashboard(){
    dashboard.classList.add('hidden')
    loginScreen.classList.remove('hidden')
  }

  function countUp(el, to, ms){
    const start = 0; const duration = ms; const startTime = performance.now()
    function tick(now){
      const t = Math.min((now - startTime)/duration,1)
      el.textContent = Math.floor(t * (to - start) + start)
      if(t < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }

  loginForm.addEventListener('submit', e=>{
    e.preventDefault()
    const u = document.getElementById('username').value.trim()
    const p = document.getElementById('password').value.trim()
    if(!u || !p){
      alert('Informe usuário e senha (qualquer valor não vazio para demo).')
      return
    }
    localStorage.setItem('loggedInUser', u)
    showDashboard(u)
  })

  logoutBtn.addEventListener('click', ()=>{
    localStorage.removeItem('loggedInUser')
    hideDashboard()
  })

  // persistência simples
  const stored = localStorage.getItem('loggedInUser')
  if(stored){ showDashboard(stored) }
})
