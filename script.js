/* ==========================================================================
   MATELIOVERSE — Exact MOB Interactivity & Dynamics
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initHeroCarousel();
  initSearchPlaceholder();
  initAddButtons();
  initLoginModal();
  initMobileDrawer();
});

/* ── Hero Carousel (Auto-rotation & Dot Navigation) ── */
function initHeroCarousel() {
  const track = document.getElementById('hero-track');
  const dotsContainer = document.getElementById('hero-dots-capsule');
  if (!track || !dotsContainer) return;

  const dots = dotsContainer.querySelectorAll('.hero-dot-btn');
  let currentSlide = 0;
  const totalSlides = dots.length;
  let timer = null;

  function setSlide(index) {
    currentSlide = index;
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentSlide);
    });
  }

  function nextSlide() {
    setSlide((currentSlide + 1) % totalSlides);
  }

  function startTimer() {
    stopTimer();
    timer = setInterval(nextSlide, 4500);
  }

  function stopTimer() {
    if (timer) clearInterval(timer);
  }

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      stopTimer();
      setSlide(parseInt(dot.dataset.index, 10));
      startTimer();
    });
  });

  const slider = document.getElementById('hero-slider');
  if (slider) {
    slider.addEventListener('mouseenter', stopTimer);
    slider.addEventListener('mouseleave', startTimer);
  }

  startTimer();
}

/* ── Rotating Search Placeholder ── */
function initSearchPlaceholder() {
  const input = document.getElementById('nav-search-input') || document.getElementById('top-search-input');
  if (!input) return;

  const searchPhrases = [
    'Search "TileTrendz"',
    'Search "EzyWall AAC Panels"',
    'Search "Tuffar TMT Bars"',
    'Search "CemXtra Cement"',
    'Search "Sanivo Sanitaryware"',
    'Search "HydroLine Pipes"',
    'Search "Strongfab Steel"',
    'Search "ReflectoGlass"',
    'Search "Bondex Adhesives"'
  ];

  let phraseIndex = 0;

  setInterval(() => {
    if (document.activeElement === input || input.value.length > 0) return;
    phraseIndex = (phraseIndex + 1) % searchPhrases.length;
    input.setAttribute('placeholder', searchPhrases[phraseIndex]);
  }, 2800);
}

/* ── Login / Sign Up Modal Trigger & Auth Controller ── */
let currentAuthTab = 'login';
let pendingAuthUser = null;

function renderAuthHeader() {
  try {
    const savedUser = localStorage.getItem('matelio_auth_user');
    const loginBtns = document.querySelectorAll('#nav-login-btn, .nav-login-pill');
    const mobLoginBtns = document.querySelectorAll('.mob-drawer-login-btn');

    if (savedUser) {
      const user = JSON.parse(savedUser);
      loginBtns.forEach((btn) => {
        btn.innerHTML = `👤 ${user.name.split(' ')[0]} ▾`;
        btn.style.background = '#0E3128';
        btn.style.border = '1px solid #1C5A4A';
        btn.title = `${user.name} (${user.role}) - Click to Log Out`;
        btn.onclick = (e) => {
          e.preventDefault();
          if (confirm(`Logged in as ${user.name} (${user.phone}). Do you want to sign out?`)) {
            localStorage.removeItem('matelio_auth_user');
            location.reload();
          }
        };
      });

      mobLoginBtns.forEach((btn) => {
        btn.innerHTML = `<span>👤</span> <span>${user.name} (Log out)</span>`;
        btn.onclick = (e) => {
          e.preventDefault();
          if (confirm(`Sign out from ${user.name}?`)) {
            localStorage.removeItem('matelio_auth_user');
            location.reload();
          }
        };
      });
    }
  } catch (err) {
    console.error('Auth state error', err);
  }
}

window.switchAuthTab = function (tab) {
  currentAuthTab = tab;
  const loginBtn = document.getElementById('tab-login-btn');
  const signupBtn = document.getElementById('tab-signup-btn');
  const loginSec = document.getElementById('auth-login-section');
  const signupSec = document.getElementById('auth-signup-section');
  const otpSec = document.getElementById('auth-otp-section');

  if (otpSec) otpSec.style.display = 'none';

  if (tab === 'login') {
    if (loginBtn) {
      loginBtn.style.background = '#0E3128';
      loginBtn.style.color = '#FFFFFF';
    }
    if (signupBtn) {
      signupBtn.style.background = 'transparent';
      signupBtn.style.color = '#64748B';
    }
    if (loginSec) loginSec.style.display = 'block';
    if (signupSec) signupSec.style.display = 'none';
  } else {
    if (signupBtn) {
      signupBtn.style.background = '#0E3128';
      signupBtn.style.color = '#FFFFFF';
    }
    if (loginBtn) {
      loginBtn.style.background = 'transparent';
      loginBtn.style.color = '#64748B';
    }
    if (signupSec) signupSec.style.display = 'block';
    if (loginSec) loginSec.style.display = 'none';
  }
};

window.handleAuthLogin = function (e) {
  e.preventDefault();
  const phone = document.getElementById('login-phone-input')?.value.trim();
  if (phone && phone.length === 10) {
    pendingAuthUser = {
      name: `User +91 ${phone.slice(-4)}`,
      phone: phone,
      businessName: 'Matelioverse Pro Member',
      role: 'contractor',
      city: 'Ahmedabad',
    };
    showOtpScreen(phone);
  }
};

window.handleAuthSignup = function (e) {
  e.preventDefault();
  const name = document.getElementById('signup-name-input')?.value.trim();
  const firm = document.getElementById('signup-firm-input')?.value.trim();
  const phone = document.getElementById('signup-phone-input')?.value.trim();
  const role = document.getElementById('signup-role-input')?.value || 'contractor';
  const city = document.getElementById('signup-city-input')?.value || 'Ahmedabad';
  const gstin = document.getElementById('signup-gstin-input')?.value.trim();

  if (name && phone && phone.length === 10) {
    pendingAuthUser = {
      name: name,
      phone: phone,
      businessName: firm || undefined,
      role: role,
      city: city,
      gstin: gstin || undefined,
    };
    showOtpScreen(phone);
  }
};

function showOtpScreen(phone) {
  const loginSec = document.getElementById('auth-login-section');
  const signupSec = document.getElementById('auth-signup-section');
  const otpSec = document.getElementById('auth-otp-section');
  const phoneDisp = document.getElementById('otp-phone-display');

  if (loginSec) loginSec.style.display = 'none';
  if (signupSec) signupSec.style.display = 'none';
  if (otpSec) otpSec.style.display = 'block';
  if (phoneDisp) phoneDisp.textContent = `+91 ${phone}`;

  const otpInput = document.getElementById('otp-input');
  if (otpInput) {
    otpInput.value = '';
    otpInput.focus();
  }
}

window.handleVerifyAuthOtp = function () {
  if (pendingAuthUser) {
    localStorage.setItem('matelio_auth_user', JSON.stringify(pendingAuthUser));
    const modal = document.getElementById('login-modal');
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
    renderAuthHeader();
    window.handleBackToAuthForm();
  }
};

window.handleBackToAuthForm = function () {
  window.switchAuthTab(currentAuthTab);
};

window.handleDemoAuth = function (role) {
  const demoUser = role === 'contractor'
    ? {
        name: 'Utkarsh Makwana',
        phone: '9824939888',
        businessName: 'Makwana Infra Projects LLP',
        role: 'contractor',
        city: 'Ahmedabad',
        gstin: '24AAAAA0000A1Z5',
      }
    : {
        name: 'Sandeep Kakkar',
        phone: '9825001234',
        businessName: 'Buildit Smart Franchise Store',
        role: 'dealer',
        city: 'Ahmedabad',
        gstin: '24BBBBB1111B2Z6',
      };

  localStorage.setItem('matelio_auth_user', JSON.stringify(demoUser));
  const modal = document.getElementById('login-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
  renderAuthHeader();
};

function initLoginModal() {
  const modal = document.getElementById('login-modal');
  const closeBtn = document.getElementById('login-modal-close');
  renderAuthHeader();
  if (!modal) return;

  const triggers = document.querySelectorAll('#login-trigger-btn, #nav-login-btn, .btn-solid-green-login, .nav-login-pill');

  function openModal() {
    // If already logged in, do not re-open login modal
    if (localStorage.getItem('matelio_auth_user')) return;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    window.handleBackToAuthForm();
  }

  triggers.forEach(btn => btn.addEventListener('click', openModal));
  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
  });
}

/* ── Mobile Slide-Out Drawer ── */
function initMobileDrawer() {
  const drawer = document.getElementById('mobile-drawer');
  const trigger = document.getElementById('mob-hamburger-btn');
  if (!drawer) return;

  function openDrawer() {
    drawer.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (trigger) trigger.addEventListener('click', openDrawer);

  drawer.addEventListener('click', (e) => {
    if (e.target === drawer) closeDrawer();
  });

  const closeBtns = drawer.querySelectorAll('.mob-drawer-close-btn, .mob-drawer-link');
  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      closeDrawer();
    });
  });
}

/* ── Horizontal Product Carousel Scroll ── */
window.scrollCarousel = function(carouselId, offset) {
  const el = document.getElementById(carouselId);
  if (el) {
    el.scrollBy({ left: offset, behavior: 'smooth' });
  }
};

/* ── Interactive ADD Button to Quantity Selector ── */
function initAddButtons() {
  let cartCount = 0;

  document.querySelectorAll('.mob-add-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();

      if (btn.classList.contains('in-cart')) return;

      btn.classList.add('in-cart');
      btn.innerHTML = `
        <div style="display:flex; align-items:center; gap:8px; width:100%; justify-content:space-between;">
          <span class="qty-btn-minus" style="font-size:16px; cursor:pointer; padding:0 4px;">-</span>
          <span class="qty-val" style="font-weight:700;">1</span>
          <span class="qty-btn-plus" style="font-size:16px; cursor:pointer; padding:0 4px;">+</span>
        </div>
      `;
      btn.style.background = '#1890FF';
      btn.style.color = '#FFFFFF';

      cartCount++;
      updateCartBadge(cartCount);

      const minus = btn.querySelector('.qty-btn-minus');
      const plus = btn.querySelector('.qty-btn-plus');
      const val = btn.querySelector('.qty-val');
      let qty = 1;

      minus.addEventListener('click', (ev) => {
        ev.stopPropagation();
        qty--;
        if (qty <= 0) {
          btn.classList.remove('in-cart');
          btn.innerHTML = 'ADD';
          btn.style.background = '#FFFFFF';
          btn.style.color = '#1890FF';
          cartCount = Math.max(0, cartCount - 1);
          updateCartBadge(cartCount);
        } else {
          val.textContent = qty;
        }
      });

      plus.addEventListener('click', (ev) => {
        ev.stopPropagation();
        qty++;
        val.textContent = qty;
      });
    });
  });
}

function updateCartBadge(count) {
  const cartBtn = document.querySelector('.nav-cart-btn');
  if (!cartBtn) return;

  let badge = cartBtn.querySelector('.cart-count-badge');
  if (!badge) {
    badge = document.createElement('span');
    badge.className = 'cart-count-badge';
    badge.style.cssText = `
      position: absolute;
      top: 2px;
      right: 2px;
      background: #EF4444;
      color: #FFF;
      font-size: 10px;
      font-weight: 800;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    `;
    cartBtn.appendChild(badge);
  }

  badge.textContent = count;
  badge.style.display = count > 0 ? 'flex' : 'none';
}
