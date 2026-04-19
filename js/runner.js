function initRunner(config, onComplete) {
  const canvas = document.getElementById('runner-canvas');
  const container = canvas.parentElement;
  const W = container.offsetWidth || 375;
  const H = container.offsetHeight || 300;
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');

  const { speed, totalOrbs, spawnInterval, duration, bgColor, flashTime } = config;
  const ZONES = [H * 0.22, H * 0.5, H * 0.78];
  let runnerZone = 1;
  let runnerY = ZONES[1];
  let targetY = ZONES[1];
  let autoReturnTimer = null;
  let collected = 0;
  let collectedIds = new Set();
  let orbsSpawned = 0;
  let orbs = [];
  let popups = [];
  let lastSpawn = null;
  let flashShown = false;
  let flashDone = false;
  let gameEnded = false;
  let startTime = null;
  let rafId = null;

  const RUNNER_EMOJI = GS.val('avatar', 'male') === 'female' ? '🚶‍♀️' : '🚶';
  const RUNNER_X = W * 0.13;
  const COLLECT_DIST = 22;

  function handleTap(clientY) {
    if (gameEnded) return;
    const rect = canvas.getBoundingClientRect();
    const y = clientY - rect.top;
    if (y < H / 2) runnerZone = Math.max(0, runnerZone - 1);
    else runnerZone = Math.min(2, runnerZone + 1);
    targetY = ZONES[runnerZone];
    if (autoReturnTimer) clearTimeout(autoReturnTimer);
    autoReturnTimer = setTimeout(() => { runnerZone = 1; targetY = ZONES[1]; }, 1100);
  }

  canvas.addEventListener('click', e => handleTap(e.clientY));
  canvas.addEventListener('touchstart', e => { e.preventDefault(); handleTap(e.touches[0].clientY); }, { passive: false });

  function spawnOrb() {
    if (orbsSpawned >= totalOrbs) return;
    const zone = Math.floor(Math.random() * 3);
    const id = 'o_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5);
    orbs.push({ id, x: W + 18, y: ZONES[zone], done: false });
    orbsSpawned++;
  }

  function addPopup(x, y, text, color) {
    popups.push({ x, y, text, color, age: 0, life: 45 });
  }

  function frame(now) {
    if (!startTime) { startTime = now; lastSpawn = now; }
    if (gameEnded) return;
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);

    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, W, H);

    for (let i = 0; i < 3; i++) {
      const a = 0.05 + 0.03 * Math.sin(elapsed * 0.0008 + i * 2);
      ctx.strokeStyle = `rgba(76,175,80,${a})`;
      ctx.lineWidth = 1; ctx.setLineDash([6, 14]);
      ctx.beginPath(); ctx.moveTo(0, ZONES[i]); ctx.lineTo(W, ZONES[i]); ctx.stroke();
    }
    ctx.setLineDash([]);

    if (now - lastSpawn > spawnInterval && orbsSpawned < totalOrbs) { spawnOrb(); lastSpawn = now; }

    runnerY += (targetY - runnerY) * 0.1;

    orbs = orbs.filter(orb => {
      if (orb.done) return false;
      orb.x -= speed / 60;
      const dx = (RUNNER_X + 14) - orb.x;
      const dy = runnerY - orb.y;
      if (Math.sqrt(dx*dx + dy*dy) < COLLECT_DIST && !collectedIds.has(orb.id)) {
        collectedIds.add(orb.id);
        collected++;
        const el = document.getElementById('orb-count-display');
        if (el) el.textContent = '⚡ ' + collected + ' / ' + totalOrbs;
        addPopup(orb.x, orb.y - 18, '+1 Prebiotic 🌿', '#81C784');
        orb.done = true;
        return false;
      }
      if (orb.x < -32) {
        if (!collectedIds.has(orb.id)) addPopup(16, orb.y, 'missed', 'rgba(255,255,255,0.25)');
        return false;
      }
      const pulse = 1 + 0.07 * Math.sin(elapsed * 0.007 + orb.x * 0.08);
      ctx.fillStyle = '#4CAF50'; ctx.globalAlpha = 0.88;
      ctx.beginPath(); ctx.arc(orb.x, orb.y, 15 * pulse, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = 'rgba(129,199,132,0.3)'; ctx.lineWidth = 4;
      ctx.beginPath(); ctx.arc(orb.x, orb.y, 15 * pulse + 5, 0, Math.PI * 2); ctx.stroke();
      ctx.fillStyle = 'white'; ctx.globalAlpha = 1;
      ctx.font = 'bold 10px DM Sans,sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText('P', orb.x, orb.y + 0.5);
      return true;
    });

    ctx.globalAlpha = 1; ctx.textAlign = 'left';
    ctx.font = '26px serif'; ctx.textBaseline = 'middle';
    ctx.fillText(RUNNER_EMOJI, RUNNER_X - 2, runnerY);

    popups = popups.filter(p => {
      p.age++;
      ctx.globalAlpha = Math.max(0, 1 - p.age / p.life);
      ctx.font = '500 11px DM Sans,sans-serif'; ctx.fillStyle = p.color;
      ctx.textAlign = 'center';
      ctx.fillText(p.text, p.x, p.y - p.age * 0.45);
      ctx.globalAlpha = 1;
      return p.age < p.life;
    });
    ctx.textAlign = 'left';

    ctx.font = '10px DM Sans,sans-serif'; ctx.fillStyle = 'rgba(255,255,255,0.18)';
    ctx.textAlign = 'right';
    ctx.fillText('tap upper / lower half to move', W - 10, H - 10);
    ctx.textAlign = 'left';

    const timerEl = document.getElementById('timer-bar');
    if (timerEl) timerEl.style.width = Math.round((1 - progress) * 100) + '%';

    if (elapsed >= flashTime && !flashShown && !flashDone) {
      flashShown = true;
      const fo = document.getElementById('flash-overlay');
      if (fo) fo.classList.add('visible');
      setTimeout(() => {
        if (fo) fo.classList.remove('visible');
        flashDone = true; flashShown = false;
      }, 2800);
    }

    if (progress >= 1) {
      gameEnded = true;
      cancelAnimationFrame(rafId);
      if (onComplete) onComplete(collected);
      return;
    }
    rafId = requestAnimationFrame(frame);
  }

  rafId = requestAnimationFrame(frame);

  return { stop: () => { gameEnded = true; if (rafId) cancelAnimationFrame(rafId); } };
}

function showSummary(collected, total, nextFn) {
  const overlay = document.getElementById('summary-overlay');
  const scoreEl = document.getElementById('summary-score');
  const barEl = document.getElementById('summary-bar');
  const msgEl = document.getElementById('summary-msg');
  if (!overlay) return;

  overlay.classList.add('visible');
  let n = 0;
  const interval = setInterval(() => {
    n = Math.min(n + 1, collected);
    if (scoreEl) scoreEl.textContent = n;
    if (n >= collected) clearInterval(interval);
  }, 40);

  setTimeout(() => {
    if (barEl) barEl.style.width = Math.round((collected / total) * 100) + '%';
  }, 400);

  const pct = Math.round((collected / total) * 100);
  if (msgEl) {
    if (pct < 35) msgEl.textContent = 'On your current diet, your gut is missing most of what it needs.';
    else if (pct < 60) msgEl.textContent = 'Your gut is picking up some prebiotics — but still leaving a lot on the table.';
    else msgEl.textContent = 'Not bad! Your gut is capturing more than most. A GMT could unlock the rest.';
  }

  const btn = document.getElementById('summary-next-btn');
  if (btn && nextFn) btn.onclick = nextFn;
}

function startPreRunner(runnerFn) {
  let count = 3;
  const countEl = document.getElementById('prerunner-count');
  const overlay = document.getElementById('prerunner-overlay');
  if (!overlay) { runnerFn(); return; }
  overlay.classList.add('visible');
  setTimeout(() => {
    const interval = setInterval(() => {
      count--;
      if (count > 0) { if (countEl) countEl.textContent = 'Starting in ' + count + '...'; }
      else {
        clearInterval(interval);
        overlay.classList.remove('visible');
        setTimeout(runnerFn, 350);
      }
    }, 1000);
  }, 300);
}
