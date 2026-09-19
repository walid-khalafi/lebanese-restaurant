// Nil Lebanese - Interactive Bootstrap Helpers
// Depends on js/dishes.js (TAHDIG_CATEGORIES, FEATURED_SLUGS, DISHES).
// Include dishes.js BEFORE this file on every page.
// Features: mega menu, category filter + deep links, Quick View modal,
// dynamic dish-detail page, scroll reveal, Tahdig Flip Simulator with
// confetti (ported from the React design), reservation confetti.

document.addEventListener('DOMContentLoaded', function () {
  buildMegaMenu();
  initMenuFilter();
  initReservationForm();
  initDishDetail();
  initReveal();
  initTahdigFlip();
});

/* ============================================================
   Mega Menu — upgrades any [data-nav-menu] link on any page
   ============================================================ */
function buildMegaMenu() {
  const trigger = document.querySelector('[data-nav-menu]');
  if (!trigger || typeof DISHES === 'undefined' || typeof TAHDIG_CATEGORIES === 'undefined') return;
  const isActive = /\bactive\b/.test(trigger.className || '');

  const catLinks = TAHDIG_CATEGORIES.map((c) => {
    const count = Object.keys(DISHES).filter((s) => DISHES[s].category === c.id).length;
    return `
      <li>
        <a class="mega-cat-item py-2 px-3 rounded-2 text-decoration-none" href="menu.html#${c.id}">
          <span class="fw-bold text-white small"><i class="bi ${c.icon} text-danger me-2"></i>${c.label}</span>
          <small class="text-gold fw-semibold">${count} dish${count === 1 ? '' : 'es'} · from ${c.from}</small>
        </a>
      </li>`;
  }).join('');

  const featured = FEATURED_SLUGS.map((slug) => {
    const d = DISHES[slug];
    if (!d) return '';
    return `
      <a class="mega-dish-item d-flex align-items-center gap-3 p-2 rounded-3 text-decoration-none" href="dish-detail.html?dish=${slug}">
        <img src="${d.image}" alt="${d.name}" class="rounded-2 flex-shrink-0" style="width: 64px; height: 54px; object-fit: cover;">
        <span class="flex-grow-1 min-w-0">
          <span class="d-block fw-bold text-white small text-truncate">${d.name}</span>
          <span class="d-block text-secondary font-fa" style="font-size: 0.72rem;">${d.nameFa}</span>
        </span>
        <span class="text-gold fw-bold small">${d.price}</span>
      </a>`;
  }).join('');

  const li = trigger.closest('li') || trigger;
  li.outerHTML = `
    <li class="nav-item dropdown mega-full">
      <a class="nav-link dropdown-toggle d-flex align-items-center gap-1${isActive ? ' active' : ''}" href="menu.html" id="megaMenuTrigger" role="button" data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false">
        <i class="bi bi-card-list text-warning"></i> Menu
      </a>
      <div class="dropdown-menu mega-menu p-4" aria-labelledby="megaMenuTrigger">
        <div class="row g-4">
          <div class="col-12 col-lg-4">
            <h6 class="mega-heading"><i class="bi bi-grid-3x3-gap-fill me-2"></i>Menu Categories</h6>
            <ul class="list-unstyled d-flex flex-column gap-1 mb-3">${catLinks}</ul>
            <a href="menu.html" class="btn btn-outline-gold btn-sm w-100"><i class="bi bi-book-half me-2"></i>View Full Menu</a>
          </div>
          <div class="col-12 col-lg-5">
            <h6 class="mega-heading"><i class="bi bi-star-fill me-2"></i>Chef's Signatures</h6>
            <div class="d-flex flex-column gap-2">${featured}</div>
          </div>
          <div class="col-12 col-lg-3">
            <div class="mega-cta p-3 h-100 d-flex flex-column">
              <h6 class="mega-heading"><i class="bi bi-calendar2-heart me-2"></i>Book Tonight</h6>
              <p class="text-secondary small mb-3">Authentic Lebanese food in Chiswick, open 7 days a week.</p>
              <a href="reservation.html" class="btn btn-tahdig btn-sm w-100 mb-3">Reserve a Table</a>
              <a href="tel:02045414261" class="text-decoration-none text-light small mb-2"><i class="bi bi-telephone-fill text-gold me-2"></i>020 4541 4261</a>
              <span class="text-secondary small"><i class="bi bi-clock text-gold me-2"></i>Daily 8:00 AM – 9:00 PM</span>
            </div>
          </div>
        </div>
      </div>
    </li>`;
}

/* ============================================================
   Menu Category Filter (menu.html) + deep links menu.html#cat
   ============================================================ */
function initMenuFilter() {
  const filterBtns = document.querySelectorAll('[data-filter]');
  const menuItems = document.querySelectorAll('.menu-grid-item');
  if (!filterBtns.length) return;

  function applyFilter(target) {
    filterBtns.forEach((b) => {
      b.classList.remove('active', 'btn-tahdig');
      b.classList.add('btn-outline-gold');
    });
    const activeBtn = Array.from(filterBtns).find((b) => b.getAttribute('data-filter') === target);
    if (activeBtn) {
      activeBtn.classList.remove('btn-outline-gold');
      activeBtn.classList.add('active', 'btn-tahdig');
    }
    menuItems.forEach((item) => {
      item.style.display = (target === 'all' || item.getAttribute('data-category') === target) ? 'block' : 'none';
    });
  }

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      applyFilter(btn.getAttribute('data-filter'));
    });
  });

  // Deep links: menu.html#kebabs, menu.html#salads, ...
  const hash = window.location.hash.replace('#', '');
  const knownCategory = typeof TAHDIG_CATEGORIES !== 'undefined' && TAHDIG_CATEGORIES.some((c) => c.id === hash);
  if (hash && knownCategory) {
    applyFilter(hash);
    const grid = document.getElementById('menuGridContainer');
    if (grid) setTimeout(() => grid.scrollIntoView({ behavior: 'smooth', block: 'start' }), 150);
  }
}

/* ============================================================
   Quick View Modal (two-mode dish display: quick view / detail)
   ============================================================ */
function ensureQuickViewModal() {
  if (document.getElementById('tahdigQuickViewModal')) return;
  document.body.insertAdjacentHTML('beforeend', `
    <div class="modal fade" id="tahdigQuickViewModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content modal-tahdig overflow-hidden">
          <div class="modal-header border-0 position-absolute top-0 start-0 end-0">
            <button type="button" class="btn-close btn-close-white ms-auto me-2" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body p-0">
            <div class="position-relative">
              <img id="qvImage" src="" alt="" class="w-100" style="height: 260px; object-fit: cover;">
              <span id="qvPrice" class="badge bg-brand fs-5 position-absolute bottom-0 start-0 m-3 px-3 py-2"></span>
            </div>
            <div class="p-4">
              <div id="qvBadges" class="d-flex flex-wrap gap-2 mb-2"></div>
              <h4 id="qvName" class="text-white font-serif-luxury mb-0"></h4>
              <p id="qvNameFa" class="text-gold font-fa mb-3"></p>
              <p id="qvDesc" class="text-secondary small"></p>
              <div id="qvIngredients" class="d-flex flex-wrap gap-2 mb-3"></div>
              <p id="qvPairing" class="small text-secondary mb-0"></p>
            </div>
          </div>
          <div class="modal-footer border-0 pt-0 px-4 pb-4">
            <a id="qvDetailLink" href="#" class="btn btn-tahdig flex-grow-1"><i class="bi bi-box-arrow-up-right me-2"></i>View Full Dish Page</a>
            <a href="reservation.html" class="btn btn-outline-gold"><i class="bi bi-calendar-check me-2"></i>Reserve a Table</a>
          </div>
        </div>
      </div>
    </div>`);
}

function openQuickView(slug) {
  if (typeof DISHES === 'undefined') return;
  const dish = DISHES[slug];
  if (!dish) return;
  ensureQuickViewModal();

  const img = document.getElementById('qvImage');
  img.src = dish.image;
  img.alt = dish.name;
  document.getElementById('qvPrice').textContent = dish.price;
  document.getElementById('qvName').textContent = dish.name;
  document.getElementById('qvNameFa').textContent = dish.nameFa;
  document.getElementById('qvDesc').textContent = dish.description;
  document.getElementById('qvBadges').innerHTML = dish.badges.map((b) => `<span class="badge badge-gold">${b}</span>`).join('');
  document.getElementById('qvIngredients').innerHTML = dish.ingredients
    .map((i) => `<span class="badge bg-dark border border-secondary px-3 py-2 text-light">${i}</span>`).join('');
  document.getElementById('qvPairing').innerHTML = `<strong class="text-white">Recommended Pairing:</strong> ${dish.pairing}`;
  document.getElementById('qvDetailLink').href = 'dish-detail.html?dish=' + slug;

  bootstrap.Modal.getOrCreateInstance(document.getElementById('tahdigQuickViewModal')).show();
}

// Delegated clicks: Quick View buttons + detail-page gallery thumbs (works on dynamic content too)
document.addEventListener('click', function (e) {
  const qvTrigger = e.target.closest('[data-quick-view]');
  if (qvTrigger) {
    e.preventDefault();
    openQuickView(qvTrigger.getAttribute('data-quick-view'));
    return;
  }

  const thumb = e.target.closest('[data-gallery-thumb]');
  if (thumb) {
    const main = document.getElementById('ddImage');
    if (main) main.src = thumb.getAttribute('data-src') || thumb.src;
    document.querySelectorAll('[data-gallery-thumb]').forEach((t) => {
      t.classList.remove('border-danger');
      t.classList.add('border-secondary');
    });
    thumb.classList.remove('border-secondary');
    thumb.classList.add('border-danger');
  }
});

/* ============================================================
   Dish Detail Page (dish-detail.html?dish=<slug>)
   ============================================================ */
function initDishDetail() {
  const root = document.querySelector('[data-dish-detail]');
  if (!root || typeof DISHES === 'undefined') return;

  const params = new URLSearchParams(window.location.search);
  const slugParam = params.get('dish');
  const slug = (slugParam && DISHES[slugParam]) ? slugParam : 'royal-lamb-tahdig-burger';
  const dish = DISHES[slug];

  document.title = dish.name + ' - Nil Lebanese';

  const setText = (id, text) => {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  };

  setText('ddCrumb', dish.name);
  setText('ddName', dish.name);
  setText('ddNameFa', dish.nameFa);
  setText('ddPrice', dish.price);
  setText('ddDesc', dish.description);

  const nameFa = document.getElementById('ddNameFa');
  if (nameFa) nameFa.classList.add('font-fa');

  const catInfo = TAHDIG_CATEGORIES.find((c) => c.id === dish.category);
  if (catInfo) {
    const catLink = document.getElementById('ddCatLink');
    if (catLink) {
      catLink.textContent = catInfo.label;
      catLink.href = 'menu.html#' + catInfo.id;
    }
  }

  const img = document.getElementById('ddImage');
  if (img) { img.src = dish.image; img.alt = dish.name; }

  const badges = document.getElementById('ddBadges');
  if (badges) badges.innerHTML = dish.badges.map((b) => `<span class="badge badge-gold">${b}</span>`).join(' ');

  const ingredients = document.getElementById('ddIngredients');
  if (ingredients) ingredients.innerHTML = dish.ingredients
    .map((i) => `<span class="badge bg-dark border border-secondary px-3 py-2 text-light">${i}</span>`).join('');

  const pairing = document.getElementById('ddPairing');
  if (pairing) pairing.innerHTML = `<strong class="text-white">Recommended Pairing:</strong> ${dish.pairing}`;

  const reserve = document.getElementById('ddReserveLink');
  if (reserve) reserve.href = 'reservation.html?dish=' + encodeURIComponent(dish.name);

  // Gallery thumbs
  const thumbs = document.getElementById('ddThumbs');
  if (thumbs) {
    const gallery = (dish.gallery && dish.gallery.length) ? dish.gallery : [dish.image];
    thumbs.innerHTML = gallery.map((src, i) => `
      <img src="${src}" data-gallery-thumb data-src="${src}"
           class="rounded-2 p-1 ${i === 0 ? 'border border-danger' : 'border border-secondary'}"
           style="width: 80px; height: 60px; object-fit: cover; cursor: pointer;"
           alt="${dish.name} view ${i + 1}">`).join('');
  }

  // Related dishes: same category first, then house signatures, then anything left
  const related = [];
  Object.keys(DISHES).forEach((s) => {
    if (s !== slug && DISHES[s].category === dish.category && related.length < 3) related.push(s);
  });
  FEATURED_SLUGS.forEach((s) => {
    if (s !== slug && related.length < 3 && related.indexOf(s) === -1) related.push(s);
  });
  Object.keys(DISHES).forEach((s) => {
    if (s !== slug && related.length < 3 && related.indexOf(s) === -1) related.push(s);
  });

  const row = document.getElementById('ddRelatedRow');
  if (row) row.innerHTML = related.map(relatedCardHtml).join('');
}

function relatedCardHtml(slug) {
  const d = DISHES[slug];
  if (!d) return '';
  return `
    <div class="col-md-4">
      <div class="card card-tahdig h-100">
        <img src="${d.image}" class="card-img-top" style="height: 180px; object-fit: cover;" alt="${d.name}">
        <div class="card-body p-4 d-flex flex-column">
          <div class="d-flex justify-content-between align-items-baseline mb-1">
            <h6 class="text-white font-serif-luxury mb-0">${d.name}</h6>
            <span class="text-gold fw-bold">${d.price}</span>
          </div>
          <p class="text-secondary small mb-3 flex-grow-1">${d.short}</p>
          <div class="d-flex gap-2">
            <button type="button" class="btn btn-outline-gold btn-sm flex-grow-1" data-quick-view="${slug}"><i class="bi bi-eye me-1"></i>Quick</button>
            <a href="dish-detail.html?dish=${slug}" class="btn btn-tahdig btn-sm flex-grow-1"><i class="bi bi-box-arrow-up-right me-1"></i>View</a>
          </div>
        </div>
      </div>
    </div>`;
}

/* ============================================================
   Reservation Form Simulation (index.html + reservation.html)
   + confetti celebration (ported from the React design)
   ============================================================ */
function initReservationForm() {
  const reservationForm = document.getElementById('bootstrapReservationForm');
  if (!reservationForm) return;

  reservationForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const guestName = document.getElementById('guestName')?.value || 'Guest';
    const guestDate = document.getElementById('guestDate')?.value || 'the requested date';
    const guestTime = document.getElementById('guestTime')?.value || 'chosen time';

    const alertBox = document.getElementById('bookingConfirmationAlert');
    if (alertBox) {
      alertBox.innerHTML = `
        <div class="alert alert-success border-0 bg-success bg-opacity-25 text-white p-3 rounded-3 mt-3">
          <h5 class="alert-heading text-gold mb-1"><i class="bi bi-check-circle-fill me-2"></i>Reservation Requested!</h5>
          <p class="mb-0 small">Thank you <strong>${guestName}</strong>! Your table for ${guestDate} at ${guestTime} has been reserved at Nil Lebanese. We will contact you via phone/email shortly.</p>
        </div>`;
      reservationForm.reset();
      alertBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      burstConfetti({ count: 60 });
    }
  });
}

/* ============================================================
   Confetti Burst — lightweight vanilla port of the canvas-confetti
   effect used in the React design (same brand color palette).
   Disabled automatically for prefers-reduced-motion users.
   ============================================================ */
function burstConfetti(opts = {}) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (typeof document.createElement('canvas').getContext !== 'function') return;

  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;pointer-events:none;z-index:1080;';
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  ctx.scale(dpr, dpr);

  // Same palette as the React app confetti
  const colors = ['#a83629', '#c94b3c', '#d4af37', '#ffffff'];
  const count = opts.count || 50;
  const originX = (opts.originX ?? 0.5) * window.innerWidth;
  const originY = (opts.originY ?? 0.65) * window.innerHeight;

  const parts = [];
  for (let i = 0; i < count; i++) {
    const velocity = 8 + Math.random() * 7;
    const angle = (-Math.PI / 2) + (Math.random() - 0.5) * (70 * Math.PI / 180); // 70° spread upward
    parts.push({
      x: originX,
      y: originY,
      vx: Math.cos(angle) * velocity,
      vy: Math.sin(angle) * velocity,
      size: 5 + Math.random() * 5,
      color: colors[(Math.random() * colors.length) | 0],
      rot: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.3,
      life: 90 + Math.random() * 40
    });
  }

  (function tick() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    let alive = false;
    parts.forEach((p) => {
      if (p.life <= 0) return;
      alive = true;
      p.vy += 0.28;             // gravity
      p.vx *= 0.99;             // drag
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.vr;
      p.life--;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.globalAlpha = Math.max(0, Math.min(1, p.life / 30));
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
      ctx.restore();
    });
    if (alive) {
      requestAnimationFrame(tick);
    } else {
      canvas.remove();
    }
  })();
}

/* ============================================================
   Tahdig Flip Simulator (index.html #tahdigSecrets)
   Ported from the React "Interactive Tahdig Sizzler":
   click/Enter flips the copper pot to reveal the golden crust
   and fires a confetti burst in brand colors.
   ============================================================ */
function initTahdigFlip() {
  const scene = document.getElementById('tahdigFlipScene');
  const card = document.getElementById('tahdigFlipCard');
  if (!scene || !card) return;

  const flip = () => {
    const flipped = card.classList.toggle('flipped');
    scene.setAttribute('aria-pressed', flipped ? 'true' : 'false');
    if (flipped) burstConfetti({ count: 50, originY: 0.65 });
  };

  scene.addEventListener('click', flip);
  scene.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      flip();
    }
  });
}

/* ============================================================
   Scroll Reveal — IntersectionObserver progressive enhancement
   (elements stay fully visible when JS/reduced-motion is off)
   ============================================================ */
function initReveal() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!('IntersectionObserver' in window)) return;

  const els = document.querySelectorAll('.menu-grid-item, .card-tahdig, [data-reveal]');
  if (!els.length) return;

  els.forEach((el) => el.classList.add('reveal-pending'));

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  els.forEach((el) => io.observe(el));
}
