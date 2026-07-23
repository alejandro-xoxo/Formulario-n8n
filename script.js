// ═══════════════════════════════════════════════════════
//  Fundación CodeFuturo – Workshop Registration System
//  Student‑facing only. Data sent to n8n webhook.
//  Includes: Particles, scroll‑reveal, counter animation,
//  tilt effect, typing hero text.
// ═══════════════════════════════════════════════════════

'use strict';

// ─── Workshop catalogue ────────────────────────────────
const WORKSHOPS = [
  {
    id: 'python-basico',
    name: 'Python Básico',
    icon: '🐍',
    date: '2 de agosto, 2026',
  },
  {
    id: 'html-css',
    name: 'HTML & CSS',
    icon: '🌐',
    date: '9 de agosto, 2026',
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    icon: '⚡',
    date: '16 de agosto, 2026',
  },
];

// ─── DOM references ────────────────────────────────────
const $  = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

const form        = $('#registrationForm');
const btnSubmit   = $('#btnSubmit');
const workshopSel = $('#taller');
const cardsWrap   = $('#workshopCards');

// Modal
const overlay       = $('#responseOverlay');
const responseIcon  = $('#responseIcon');
const responseTitle = $('#responseTitle');
const responseMsg   = $('#responseMessage');
const responseDet   = $('#responseDetails');
const btnClose      = $('#btnCloseModal');

// ─── Render workshop cards & select options ────────────
function renderWorkshops() {
  cardsWrap.innerHTML = '';
  workshopSel.innerHTML = '<option value="" disabled selected>Selecciona un taller</option>';

  WORKSHOPS.forEach((ws) => {
    // Card
    const card = document.createElement('div');
    card.className = 'workshop-card';
    card.innerHTML = `
      <div class="card-icon">${ws.icon}</div>
      <div class="card-title">${ws.name}</div>
      <div class="card-date">${ws.date}</div>
      <div class="card-spots available">
        ✓ Inscripciones abiertas
      </div>
    `;
    cardsWrap.appendChild(card);

    // Select option
    const opt = document.createElement('option');
    opt.value = ws.id;
    opt.textContent = `${ws.icon} ${ws.name} — ${ws.date}`;
    workshopSel.appendChild(opt);
  });

  // Re‑apply tilt listeners on new cards
  initTiltCards();
}

// ─── Validation ────────────────────────────────────────
const validators = {
  nombre:    (v) => v.trim().length >= 3,
  documento: (v) => /^\d{5,15}$/.test(v.trim()),
  correo:    (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
  telefono:  (v) => /^\d{7,15}$/.test(v.trim()),
  taller:    (v) => v !== '',
};

function validateField(id) {
  const el = $(`#${id}`);
  const errorEl = $(`#error-${id}`);
  const valid = validators[id](el.value);
  errorEl.classList.toggle('visible', !valid);
  el.style.borderColor = valid ? '' : 'var(--color-error)';
  return valid;
}

function validateAll() {
  let allValid = true;
  for (const id of Object.keys(validators)) {
    if (!validateField(id)) allValid = false;
  }
  return allValid;
}

// Clear error on input
Object.keys(validators).forEach((id) => {
  const el = $(`#${id}`);
  el.addEventListener('input', () => validateField(id));
  el.addEventListener('change', () => validateField(id));
});

// ─── Form submission ───────────────────────────────────
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  if (!validateAll()) {
    // Shake the button
    btnSubmit.style.animation = 'shake 0.4s ease';
    btnSubmit.addEventListener('animationend', () => {
      btnSubmit.style.animation = '';
    }, { once: true });
    return;
  }

  btnSubmit.disabled = true;
  btnSubmit.classList.add('loading');

  const data = {
    name:       $('#nombre').value.trim(),
    document:   $('#documento').value.trim(),
    email:      $('#correo').value.trim(),
    phone:      $('#telefono').value.trim(),
    workshopId: $('#taller').value,
  };

  try {
    const response = await fetch('https://miguel0328.app.n8n.cloud/webhook-test/1112091381092h12u13ui2bjk3b1km23k1ñ3k1pom3ñl1m23ñm1ñ3m', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const ws = WORKSHOPS.find((w) => w.id === data.workshopId);
    
    showResponse(
      'success', '🎉', '¡Datos enviados!',
      `Tus datos para el taller <strong>${ws.name}</strong> han sido recibidos correctamente y están siendo procesados en nuestro sistema. Te contactaremos pronto.`,
      [
        { label: 'Taller', value: ws.name },
        { label: 'Fecha', value: ws.date },
        { label: 'Participante', value: data.name },
      ]
    );
    form.reset();
  } catch (error) {
    showResponse(
      'error', '😔', 'Error de conexión',
      `Ocurrió un error al enviar el formulario. Por favor, revisa tu conexión e inténtalo de nuevo.`
    );
  } finally {
    btnSubmit.disabled = false;
    btnSubmit.classList.remove('loading');
  }
});

// ─── Response modal ────────────────────────────────────
function showResponse(type, icon, title, message, details) {
  responseIcon.className = `response-icon ${type}`;
  responseIcon.textContent = icon;
  responseTitle.innerHTML = title;
  responseMsg.innerHTML = message;

  if (details && details.length) {
    responseDet.style.display = '';
    responseDet.innerHTML = details
      .map(
        (d) => `<div class="detail-row">
          <span class="detail-label">${d.label}</span>
          <span class="detail-value">${d.value}</span>
        </div>`
      )
      .join('');
  } else {
    responseDet.style.display = 'none';
  }

  overlay.classList.add('visible');

  // Confetti burst on success
  if (type === 'success') {
    launchConfetti();
  }
}

function hideResponse() {
  overlay.classList.remove('visible');
}

btnClose.addEventListener('click', hideResponse);
overlay.addEventListener('click', (e) => {
  if (e.target === overlay) hideResponse();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && overlay.classList.contains('visible')) hideResponse();
});

// ─── Utility ───────────────────────────────────────────
function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}


// ═══════════════════════════════════════════════════════
//  ✨ JS ANIMATIONS
// ═══════════════════════════════════════════════════════

// ─── 1. FLOATING PARTICLES ────────────────────────────
(function initParticles() {
  const canvas = document.getElementById('particlesCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let particles = [];
  let animationId;
  let width, height;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  function createParticle() {
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.5 + 0.5,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.4 + 0.1,
      hue: 260 + Math.random() * 30,         // purples only
      pulse: Math.random() * Math.PI * 2,     // phase offset for pulsing
    };
  }

  function init() {
    resize();
    const count = Math.min(Math.floor((width * height) / 12000), 120);
    particles = Array.from({ length: count }, createParticle);
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);

    for (const p of particles) {
      p.x += p.speedX;
      p.y += p.speedY;
      p.pulse += 0.015;

      // Wrap around edges
      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      const glow = p.opacity * (0.6 + 0.4 * Math.sin(p.pulse));
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${p.hue}, 100%, 72%, ${glow})`;
      ctx.fill();

      // Subtle glow halo
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${p.hue}, 100%, 72%, ${glow * 0.15})`;
      ctx.fill();
    }

    // Draw connections between nearby particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `hsla(265, 100%, 72%, ${0.06 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    animationId = requestAnimationFrame(draw);
  }

  window.addEventListener('resize', () => {
    resize();
    // Re-generate particles for new size
    const count = Math.min(Math.floor((width * height) / 12000), 120);
    while (particles.length < count) particles.push(createParticle());
    while (particles.length > count) particles.pop();
  });

  init();
  draw();
})();


// ─── 2. SCROLL REVEAL ─────────────────────────────────
(function initScrollReveal() {
  // Mark sections for reveal
  const sections = document.querySelectorAll(
    '.workshops-section, .form-section, .stats-section'
  );
  sections.forEach((s) => s.classList.add('reveal'));

  // Mark card grids for stagger
  const grids = document.querySelectorAll('.workshop-cards, .stats-grid');
  grids.forEach((g) => g.classList.add('reveal-stagger'));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.reveal, .reveal-stagger').forEach((el) => {
    observer.observe(el);
  });
})();


// ─── 3. ANIMATED COUNTERS ─────────────────────────────
(function initCounters() {
  const counters = document.querySelectorAll('.stat-number[data-target]');
  let animated = false;

  function animateCounters() {
    if (animated) return;
    animated = true;

    counters.forEach((counter) => {
      const target = parseInt(counter.dataset.target, 10);
      const suffix = counter.dataset.suffix || '';
      const duration = 1800;
      const start = performance.now();

      function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        // ease‑out cubic
        const ease = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(target * ease);
        counter.textContent = current.toLocaleString('es-CO') + suffix;

        if (progress < 1) {
          requestAnimationFrame(update);
        }
      }

      requestAnimationFrame(update);
    });
  }

  const statsSection = document.querySelector('.stats-section');
  if (statsSection) {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          animateCounters();
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(statsSection);
  }
})();


// ─── 4. TILT EFFECT ON CARDS ──────────────────────────
function initTiltCards() {
  const cards = document.querySelectorAll('.workshop-card');

  cards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;

      card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.4s ease';
      setTimeout(() => { card.style.transition = ''; }, 400);
    });
  });
}


// ─── 5. BUTTON SHAKE KEYFRAME (injected) ──────────────
(function injectShakeKeyframe() {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      20%  { transform: translateX(-6px); }
      40%  { transform: translateX(6px); }
      60%  { transform: translateX(-4px); }
      80%  { transform: translateX(4px); }
    }
  `;
  document.head.appendChild(style);
})();


// ─── 6. CONFETTI BURST ON SUCCESS ─────────────────────
function launchConfetti() {
  const count = 60;
  const container = document.body;

  for (let i = 0; i < count; i++) {
    const confetti = document.createElement('div');
    const size = Math.random() * 8 + 4;
    const hue = 250 + Math.random() * 60; // purple range
    const left = 40 + Math.random() * 20; // centered‑ish
    const duration = 1 + Math.random() * 1.5;
    const delay = Math.random() * 0.3;

    Object.assign(confetti.style, {
      position: 'fixed',
      width: size + 'px',
      height: size + 'px',
      borderRadius: Math.random() > 0.5 ? '50%' : '2px',
      background: `hsl(${hue}, 100%, ${60 + Math.random() * 25}%)`,
      left: left + '%',
      top: '50%',
      zIndex: '2000',
      pointerEvents: 'none',
      opacity: '1',
      animation: `confettiFall ${duration}s ${delay}s ease-out forwards`,
    });

    container.appendChild(confetti);
    setTimeout(() => confetti.remove(), (duration + delay) * 1000 + 100);
  }
}

// Inject confetti keyframe
(function injectConfettiKeyframe() {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes confettiFall {
      0% {
        transform: translate(0, 0) rotate(0deg) scale(1);
        opacity: 1;
      }
      100% {
        transform: translate(${() => ''}var(--cx, 0px), var(--cy, 300px)) rotate(var(--cr, 720deg)) scale(0.2);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);

  // We need per‑particle custom properties, so let's use a simpler approach:
  // override with inline animation
})();

// Override confetti with JS-driven animation for per‑particle randomness
function launchConfettiV2() {
  // already handled above with inline styles
}

// Patch launchConfetti to use random motion via Web Animations API
const _origLaunchConfetti = launchConfetti;
// eslint-disable-next-line no-func-assign
window.launchConfetti = function() {
  const count = 60;
  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    const size = Math.random() * 8 + 4;
    const hue = 250 + Math.random() * 60;

    Object.assign(el.style, {
      position: 'fixed',
      width: size + 'px',
      height: size + 'px',
      borderRadius: Math.random() > 0.5 ? '50%' : '2px',
      background: `hsl(${hue}, 100%, ${60 + Math.random() * 25}%)`,
      left: (40 + Math.random() * 20) + '%',
      top: '45%',
      zIndex: '2000',
      pointerEvents: 'none',
    });

    document.body.appendChild(el);

    const xDrift = (Math.random() - 0.5) * 300;
    const yDrift = 200 + Math.random() * 300;
    const rotation = (Math.random() - 0.5) * 1080;
    const dur = 1200 + Math.random() * 1000;

    el.animate([
      { transform: 'translate(0, 0) rotate(0deg) scale(1)', opacity: 1 },
      { transform: `translate(${xDrift}px, ${yDrift}px) rotate(${rotation}deg) scale(0.1)`, opacity: 0 },
    ], { duration: dur, easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)', fill: 'forwards' });

    setTimeout(() => el.remove(), dur + 50);
  }
};


// ─── 7. SMOOTH PARALLAX ON HERO ──────────────────────
(function initParallax() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const offset = scrollY * 0.3;
    hero.style.transform = `translateY(${offset}px)`;
    hero.style.opacity = Math.max(1 - scrollY / 600, 0);
  }, { passive: true });
})();


// ─── 8. INPUT FOCUS RIPPLE ────────────────────────────
(function initInputRipple() {
  document.querySelectorAll('.form-input, .form-select').forEach((input) => {
    input.addEventListener('focus', function() {
      const group = this.closest('.form-group');
      if (!group) return;
      group.style.transition = 'transform 0.3s ease';
      group.style.transform = 'scale(1.01)';
    });

    input.addEventListener('blur', function() {
      const group = this.closest('.form-group');
      if (!group) return;
      group.style.transform = 'scale(1)';
    });
  });
})();


// ─── 9. MAGNETIC BUTTON ──────────────────────────────
(function initMagneticButton() {
  const btn = document.getElementById('btnSubmit');
  if (!btn) return;

  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
  });

  btn.addEventListener('mouseleave', () => {
    btn.style.transition = 'transform 0.4s ease';
    btn.style.transform = 'translate(0, 0)';
    setTimeout(() => { btn.style.transition = ''; }, 400);
  });
})();


// ─── INIT ──────────────────────────────────────────────
renderWorkshops();
