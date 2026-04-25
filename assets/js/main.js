// Latest release version (GitHub API)
  fetch('https://api.github.com/repos/Eremmmm/Lawki-Release/releases/latest')
    .then(r => r.ok ? r.json() : null)
    .then(d => {
      if (!d || !d.tag_name) return;
      document.querySelectorAll('.js-version').forEach(el => el.textContent = d.tag_name);
    })
    .catch(() => {});

  // Reveal
  const io = new IntersectionObserver(es => {
    es.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // Nav scrolled
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 30);
  });

  // Background glow follows scroll a bit
  const glow = document.querySelector('.bg-glow');
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (glow) {
      glow.style.transform = `translate(${Math.sin(y/600)*40}px, ${y * 0.15}px)`;
    }
  }, { passive: true });

  // Vault interactive (B)
  const VAULT = [
    { name: 'GitHub', user: 'you@example.com', cat: 'dev', avatar: 'GH', strength: 0.95 },
    { name: 'Proton Mail', user: 'you@example.com', cat: 'personal', avatar: 'PM', strength: 0.9 },
    { name: 'Acme Corp HR', user: 'm.dupont@acme.io', cat: 'work', avatar: 'AC', strength: 0.7 },
    { name: 'Revolut', user: '+33•••456', cat: 'finance', avatar: 'RV', strength: 0.85 },
    { name: 'Vercel', user: 'erm.dev', cat: 'dev', avatar: 'VC', strength: 0.8 },
    { name: 'Notion', user: 'erm@team', cat: 'work', avatar: 'NT', strength: 0.65 },
    { name: 'Spotify', user: 'erm', cat: 'personal', avatar: 'SP', strength: 0.4 },
    { name: 'Bouygues Bank', user: '••••3812', cat: 'finance', avatar: 'BB', strength: 0.75 },
  ];
  const list = document.getElementById('vaultB-list');
  function renderList(filter='all') {
    if (!list) return;
    const items = filter === 'all' ? VAULT : VAULT.filter(e => e.cat === filter);
    list.innerHTML = items.map(e => `
      <div class="vault__entry">
        <div class="vault__avatar">${e.avatar}</div>
        <div>
          <div class="vault__entry-title">${e.name}</div>
          <div class="vault__entry-user">${e.user}</div>
        </div>
        <div class="vault__entry-strength" style="--s:${e.strength};"></div>
      </div>
    `).join('');
    list.querySelectorAll('.vault__entry').forEach((el, i) => {
      setTimeout(() => el.classList.add('in'), 60 * i);
    });
  }
  renderList();
  document.querySelectorAll('.vault__side-item').forEach(el => {
    el.addEventListener('click', () => {
      document.querySelectorAll('.vault__side-item').forEach(x => x.classList.remove('active'));
      el.classList.add('active');
      renderList(el.dataset.cat);
    });
  });

  // Password generator (B)
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
  function randpw(n=16){ let s=''; for(let i=0;i<n;i++) s+=chars[Math.floor(Math.random()*chars.length)]; return s; }
  const pw = document.getElementById('genpwB-text');
  if (pw) {
    setInterval(() => {
      let frame = 0;
      const target = randpw(16);
      const tick = setInterval(() => {
        let s = '';
        for (let i = 0; i < 16; i++) s += i < frame ? target[i] : chars[Math.floor(Math.random()*chars.length)];
        pw.textContent = s;
        frame++;
        if (frame > 16) { clearInterval(tick); pw.textContent = target; }
      }, 35);
    }, 5000);
  }

  // Crypto viz animation
  const cryptoOut = document.getElementById('cryptoOut');
  const cryptoIn = document.getElementById('cryptoIn');
  const phrases = ['hunter2', 'p@ssw0rd!', 'mySecret#1', 'g!thub-2026'];
  let phraseI = 0;
  setInterval(() => {
    if (!cryptoIn || !cryptoOut) return;
    phraseI = (phraseI + 1) % phrases.length;
    cryptoIn.textContent = phrases[phraseI];
    let cipher = '';
    for (let i = 0; i < 24; i++) cipher += '0123456789abcdef'[Math.floor(Math.random()*16)];
    cryptoOut.textContent = cipher.match(/.{4}/g).join(' ') + '…';
  }, 2200);

  // Browser autofill
  const userF = document.getElementById('loginUserB');
  const passF = document.getElementById('loginPassB');
  function autofillCycleB() {
    if (!userF || !passF) return;
    setTimeout(() => {
      userF.classList.add('login-field--filled');
      userF.innerHTML = 'you@example.com<span class="login-fill-indicator">LAWKI</span>';
    }, 800);
    setTimeout(() => {
      passF.classList.add('login-field--filled');
      passF.innerHTML = '••••••••••••••••<span class="login-fill-indicator">LAWKI</span>';
    }, 1600);
    setTimeout(() => {
      userF.classList.remove('login-field--filled');
      userF.textContent = 'username or email';
      passF.classList.remove('login-field--filled');
      passF.textContent = 'password';
    }, 4500);
  }
  const browserVisualB = document.getElementById('browserVisualB');
  if (browserVisualB) {
    const bo = new IntersectionObserver(es => {
      es.forEach(e => {
        if (e.isIntersecting) {
          autofillCycleB();
          setInterval(autofillCycleB, 6000);
          bo.disconnect();
        }
      });
    }, { threshold: 0.5 });
    bo.observe(browserVisualB);
  }