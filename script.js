const PACKAGES = window.RENT_PACKAGES || [];
const STORAGE_KEYS = {
  theme: 'rent-theme',
  users: 'rent-users',
  currentUser: 'rent-current-user',
  bookings: 'rent-bookings',
  lastBooking: 'rent-last-booking',
  pendingBooking: 'rent-pending-booking',
  afterLogin: 'rent-after-login-url',
  resetOtp: 'rent-reset-otp'
};

const formatCurrency = (value) => 'Rp ' + Number(value || 0).toLocaleString('id-ID');
const getPage = () => document.body.dataset.page || '';
const getTheme = () => localStorage.getItem(STORAGE_KEYS.theme) || 'light';

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem(STORAGE_KEYS.theme, theme);
  document.querySelectorAll('.theme-toggle').forEach(btn => {
    btn.innerHTML = theme === 'dark' ? '☀️' : '🌙';
    btn.setAttribute('title', theme === 'dark' ? 'Aktifkan mode light' : 'Aktifkan mode dark');
  });
}

function bindThemeToggle() {
  document.querySelectorAll('.theme-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      applyTheme(getTheme() === 'dark' ? 'light' : 'dark');
    });
  });
}

function getUsers() {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.users) || '[]');
}

function saveUsers(users) {
  localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(users));
}

function getCurrentUser() {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.currentUser) || 'null');
}

function setCurrentUser(user) {
  localStorage.setItem(STORAGE_KEYS.currentUser, JSON.stringify(user));
}

function getBookings() {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.bookings) || '[]');
}

function saveBookings(bookings) {
  localStorage.setItem(STORAGE_KEYS.bookings, JSON.stringify(bookings));
}

function getPackageById(id) {
  return PACKAGES.find(item => item.id === id);
}

function createNavbar() {
  const navbarTarget = document.getElementById('navbar');
  if (!navbarTarget) return;
  const page = getPage();
  const currentUser = getCurrentUser();
  navbarTarget.innerHTML = `
    <header class="navbar" id="siteNavbar">
      <div class="navbar-inner">
        <a href="./beranda.html" class="brand"><span class="brand-logo"><img src="assets/logo-nexora.svg" alt="Logo Nexora Mobility"></span><span class="brand-text">Nexora <span>Mobility</span></span></a>
        <button class="theme-toggle mobile-toggle" id="mobileMenuBtn" aria-label="Toggle menu">☰</button>
        <nav class="nav-links" id="navLinks">
          <a href="./beranda.html" class="${page === 'beranda' ? 'active' : ''}">Beranda</a>
          <a href="./layanan.html" class="${page === 'layanan' ? 'active' : ''}">Layanan</a>
          <a href="./booking.html" class="${page === 'booking' ? 'active' : ''}">Booking</a>
          <a href="./tracking.html" class="${page === 'tracking' ? 'active' : ''}">Tracking</a>
          <a href="./customer.html" class="${page === 'customer' ? 'active' : ''}">Customer</a>
          <a href="./faq.html" class="${page === 'faq' ? 'active' : ''}">FAQ</a>
          <a href="./contact.html" class="${page === 'contact' ? 'active' : ''}">Kontak</a>
        </nav>
        <div class="nav-actions">
          <button type="button" class="theme-toggle" id="themeToggle" aria-label="Ganti tema"></button>
          ${currentUser ? `<span class="muted">Hi, ${currentUser.name.split(' ')[0]}</span><button class="btn btn-outline" id="logoutBtn">Logout</button>` : `<a class="btn btn-outline" href="./login.html">Login</a><a class="btn btn-accent" href="./register.html">Daftar</a>`}
        </div>
      </div>
    </header>
  `;

  const mobileBtn = document.getElementById('mobileMenuBtn');
  const siteNavbar = document.getElementById('siteNavbar');
  if (mobileBtn && siteNavbar) {
    mobileBtn.addEventListener('click', () => {
      if (window.innerWidth <= 780) siteNavbar.classList.toggle('open');
    });
  }

  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem(STORAGE_KEYS.currentUser);
      window.location.href = './login.html';
    });
  }
}

function createFooter() {
  const footerTarget = document.getElementById('footer');
  if (!footerTarget) return;
  footerTarget.innerHTML = `
    <footer class="footer">
      <div class="footer-grid">
        <div>
          <div class="brand"><span class="brand-logo"><img src="assets/logo-nexora.svg" alt="Logo Nexora Mobility"></span><span class="brand-text">Nexora <span>Mobility</span></span></div>
          <p>Solusi mobilitas modern untuk rental mobil dan motor di Palembang dengan layanan cepat, fleksibel, dan mudah dipantau secara real time.</p>
        </div>
        <div>
          <h4>Perusahaan</h4>
          <ul>
            <li><a href="./beranda.html">Beranda</a></li>
            <li><a href="./layanan.html">Layanan</a></li>
            <li><a href="./booking.html">Booking</a></li>
          </ul>
        </div>
        <div>
          <h4>Dukungan</h4>
          <ul>
            <li><a href="./faq.html">FAQ</a></li>
            <li><a href="./customer.html">Customer Rating</a></li>
            <li><a href="./contact.html">Kontak</a></li>
            <li><a href="./tracking.html">Tracking</a></li>
          </ul>
        </div>
        <div>
          <h4>Lokasi Kami</h4>
          <ul>
            <li>Palembang</li>
            <li>Pool Bukit Besar</li>
            <li>Bandara SMB II</li>
          </ul>
        </div>
      </div>
      <div class="footer-note">Copyright © 2026 Nexora Mobility. All rights reserved.</div>
    </footer>
  `;
}

function packageCardTemplate(item) {
  return `
    <article class="card-surface package-card">
      <div class="package-thumb">
        <img src="${item.image}" alt="${item.name}">
        <span class="package-badge">${item.badge}</span>
      </div>
      <div class="package-body">
        <div class="package-top">
          <div>
            <h3>${item.name}</h3>
            <div class="package-meta">${item.type.toUpperCase()} • ⭐ ${item.rating}</div>
          </div>
          <div class="package-price">${formatCurrency(item.price)}</div>
        </div>
        <p class="package-meta">${item.description}</p>
        <ul class="meta-list">
          <li>⏱ ${item.duration}</li>
          <li>⚙️ ${item.transmission}</li>
          <li>👥 ${item.passenger}</li>
        </ul>
        <div class="package-actions">
          <a class="btn btn-outline" href="./detail-layanan.html?id=${item.id}">Lihat Detail</a>
          <a class="btn btn-primary" href="./booking.html?id=${item.id}">Pesan Sekarang</a>
        </div>
      </div>
    </article>
  `;
}

function getPriceRangeKey(price) {
  const value = Number(price || 0);
  if (value <= 200000) return 'low';
  if (value <= 500000) return 'mid';
  return 'high';
}

function filterPackages(options = {}) {
  const category = options.category || options.filter || 'all';
  const price = options.price || 'all';
  const types = options.types;

  return PACKAGES.filter(item => {
    const categoryMatch = category === 'all' || item.type === category || item.category === category;
    const priceMatch = price === 'all' || getPriceRangeKey(item.price) === price;
    const typeMatch = Array.isArray(types) ? types.includes(item.type) : true;
    return categoryMatch && priceMatch && typeMatch;
  });
}

function renderPackages(targetId, options = {}, limit = null) {
  const container = document.getElementById(targetId);
  if (!container) return [];

  let data = filterPackages(options);
  if (limit) data = data.slice(0, limit);

  container.innerHTML = data.map(packageCardTemplate).join('');
  return data;
}

function updateResultCount(id, count, label = 'paket') {
  const el = document.getElementById(id);
  if (el) el.textContent = `${count} ${label} tersedia`;
}

function initHome() {
  if (getPage() !== 'beranda') return;

  const budgetRadios = document.querySelectorAll('input[name="budget"]');
  const typeChecks = document.querySelectorAll('input[name="vehicleType"]');
  const resetBtn = document.getElementById('resetHomeFilter');

  function renderHomeFilteredPackages() {
    const selectedBudget = document.querySelector('input[name="budget"]:checked')?.value || 'all';
    const selectedTypes = Array.from(typeChecks).filter(input => input.checked).map(input => input.value);
    const data = renderPackages('homePackages', { category: 'all', price: selectedBudget, types: selectedTypes }, 8);
    updateResultCount('homeResultCount', data.length, 'kendaraan');
  }

  budgetRadios.forEach(input => input.addEventListener('change', renderHomeFilteredPackages));
  typeChecks.forEach(input => input.addEventListener('change', renderHomeFilteredPackages));

  resetBtn?.addEventListener('click', () => {
    const allBudget = document.querySelector('input[name="budget"][value="all"]');
    if (allBudget) allBudget.checked = true;
    typeChecks.forEach(input => input.checked = true);
    renderHomeFilteredPackages();
  });

  renderHomeFilteredPackages();

  const searchBtn = document.getElementById('searchNowBtn');
  if (searchBtn) {
    searchBtn.addEventListener('click', () => {
      const type = document.getElementById('searchType')?.value || 'all';
      window.location.href = `./layanan.html?filter=${type}`;
    });
  }
}

function initServices() {
  if (getPage() !== 'layanan') return;

  const params = new URLSearchParams(window.location.search);
  const validFilters = ['all', 'mobil', 'motor', 'premium', 'keluarga', 'city-tour', 'hemat', 'paket'];
  let currentFilter = validFilters.includes(params.get('filter')) ? params.get('filter') : 'all';
  let currentPrice = 'all';

  const categoryButtons = document.querySelectorAll('[data-filter]');
  const priceButtons = document.querySelectorAll('[data-price-filter]');
  const emptyState = document.getElementById('serviceEmpty');

  function setActiveButton(buttons, attr, value) {
    buttons.forEach(btn => btn.classList.toggle('active', btn.dataset[attr] === value));
  }

  function renderServiceFilteredPackages() {
    const data = renderPackages('servicePackages', { category: currentFilter, price: currentPrice });
    updateResultCount('serviceResultCount', data.length, 'paket');

    if (emptyState) {
      emptyState.classList.toggle('hidden', data.length > 0);
    }
  }

  setActiveButton(categoryButtons, 'filter', currentFilter);
  setActiveButton(priceButtons, 'priceFilter', currentPrice);
  renderServiceFilteredPackages();

  categoryButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      currentFilter = btn.dataset.filter || 'all';
      setActiveButton(categoryButtons, 'filter', currentFilter);
      renderServiceFilteredPackages();
    });
  });

  priceButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      currentPrice = btn.dataset.priceFilter || 'all';
      setActiveButton(priceButtons, 'priceFilter', currentPrice);
      renderServiceFilteredPackages();
    });
  });

  const reset = () => {
    currentFilter = 'all';
    currentPrice = 'all';
    setActiveButton(categoryButtons, 'filter', currentFilter);
    setActiveButton(priceButtons, 'priceFilter', currentPrice);
    renderServiceFilteredPackages();
  };

  document.getElementById('resetServiceFilter')?.addEventListener('click', reset);
  document.getElementById('emptyResetBtn')?.addEventListener('click', reset);
}

function initDetail() {
  if (!window.location.pathname.endsWith('detail-layanan.html')) return;
  const id = new URLSearchParams(window.location.search).get('id') || PACKAGES[0]?.id;
  const item = getPackageById(id) || PACKAGES[0];
  const container = document.getElementById('detailContainer');
  if (!container || !item) return;
  container.innerHTML = `
    <section class="detail-hero">
      <img src="${item.image}" alt="${item.name}">
      <div class="detail-caption">
        <span class="eyebrow">Paket Pilihan</span>
        <h1>${item.name}</h1>
        <p>${item.description}</p>
      </div>
    </section>
    <section class="detail-layout">
      <div>
        <div class="info-cards">
          <article class="card-surface info-card"><h4>Tipe Kendaraan</h4><p>${item.type}</p></article>
          <article class="card-surface info-card"><h4>Harga Mulai</h4><p>${formatCurrency(item.price)} / hari</p></article>
          <article class="card-surface info-card"><h4>Durasi Sewa</h4><p>${item.duration}</p></article>
          <article class="card-surface info-card"><h4>Lokasi</h4><p>${item.pickup.join(' / ')}</p></article>
        </div>
        <article class="card-surface detail-panel">
          <h3>Keunggulan Layanan</h3>
          <p class="muted">Paket ini dirancang agar pelanggan mendapatkan pengalaman sewa yang nyaman, jelas, dan mudah dipahami.</p>
          <div class="feature-list">${item.features.map(feature => `<div>✅ ${feature}</div>`).join('')}</div>
        </article>
        <article class="card-surface pickup-panel" style="margin-top:18px;">
          <h3>Titik Pengambilan</h3>
          <div class="pickup-list">${item.pickup.map(point => `<div>📍 ${point}</div>`).join('')}</div>
        </article>
      </div>
      <aside class="card-surface price-panel">
        <h3>Harga Paket</h3>
        <div class="price-value">${formatCurrency(item.price)}<span class="muted" style="font-size:.95rem; font-weight:600;"> / hari</span></div>
        <div class="price-list">
          <div><span>Transmisi</span><strong>${item.transmission}</strong></div>
          <div><span>Kapasitas</span><strong>${item.passenger}</strong></div>
          <div><span>Bahan bakar</span><strong>${item.fuel}</strong></div>
          <div><span>Rating</span><strong>⭐ ${item.rating}</strong></div>
        </div>
        <a href="./booking.html?id=${item.id}" class="btn btn-accent btn-block">Lanjutkan Pemesanan</a>
      </aside>
    </section>
  `;
}

function showAlert(id, message, type='success') {
  const el = document.getElementById(id);
  if (!el) return;
  el.className = `alert show ${type}`;
  el.textContent = message;
}

function initRegister() {
  if (getPage() !== 'register') return;
  const form = document.getElementById('registerForm');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('registerName').value.trim();
    const phone = document.getElementById('registerPhone').value.trim();
    const email = document.getElementById('registerEmail').value.trim().toLowerCase();
    const password = document.getElementById('registerPassword').value;
    const confirm = document.getElementById('registerConfirm').value;

    if (!name || !phone || !email || !password || !confirm) {
      showAlert('registerAlert', 'Semua data wajib diisi.', 'error');
      return;
    }
    if (password.length < 6) {
      showAlert('registerAlert', 'Kata sandi minimal 6 karakter.', 'error');
      return;
    }
    if (password !== confirm) {
      showAlert('registerAlert', 'Konfirmasi kata sandi tidak sama.', 'error');
      return;
    }
    const users = getUsers();
    if (users.some(u => u.email === email)) {
      showAlert('registerAlert', 'Email sudah terdaftar.', 'error');
      return;
    }
    const user = { name, phone, email, password };
    users.push(user);
    saveUsers(users);
    setCurrentUser(user);
    const nextUrl = sessionStorage.getItem(STORAGE_KEYS.afterLogin);
    sessionStorage.removeItem(STORAGE_KEYS.afterLogin);
    showAlert('registerAlert', nextUrl ? 'Registrasi berhasil. Mengarahkan ke halaman booking...' : 'Registrasi berhasil. Mengarahkan ke beranda...', 'success');
    setTimeout(() => window.location.href = nextUrl || './beranda.html', 1200);
  });
}

function initLogin() {
  if (getPage() !== 'login') return;
  const form = document.getElementById('loginForm');
  const redirectAfterLogin = () => {
    const nextUrl = sessionStorage.getItem(STORAGE_KEYS.afterLogin);
    sessionStorage.removeItem(STORAGE_KEYS.afterLogin);
    window.location.href = nextUrl || './beranda.html';
  };

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value.trim().toLowerCase();
    const password = document.getElementById('loginPassword').value;
    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
      showAlert('loginAlert', 'Email atau kata sandi tidak sesuai.', 'error');
      return;
    }
    setCurrentUser(user);
    showAlert('loginAlert', 'Login berhasil. Mengarahkan...', 'success');
    setTimeout(redirectAfterLogin, 900);
  });

  document.querySelectorAll('[data-social-login]').forEach(button => {
    const provider = button.dataset.socialLogin;
    button.classList.add(provider);
    button.addEventListener('click', () => {
      const providerName = provider === 'google' ? 'Google' : 'Facebook';
      const socialUser = {
        name: `Pengguna ${providerName}`,
        email: `${provider}@nexora-mobility.local`,
        phone: '-',
        provider: providerName,
        socialLogin: true
      };
      setCurrentUser(socialUser);
      showAlert('loginAlert', `Login ${providerName} berhasil. Mengarahkan...`, 'success');
      setTimeout(redirectAfterLogin, 850);
    });
  });
}

function generateOtpCode() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

function setResetStep(step) {
  document.querySelectorAll('[data-reset-indicator]').forEach(indicator => {
    const value = Number(indicator.dataset.resetIndicator);
    indicator.classList.toggle('active', value === step);
    indicator.classList.toggle('done', value < step);
  });
  document.querySelectorAll('.reset-form').forEach(form => form.classList.remove('active'));
  if (step === 1) document.getElementById('forgotEmailForm')?.classList.add('active');
  if (step === 2) document.getElementById('otpForm')?.classList.add('active');
  if (step === 3) document.getElementById('newPasswordForm')?.classList.add('active');
}

function saveOtpSession(email, code) {
  const payload = {
    email,
    code,
    expiresAt: Date.now() + (5 * 60 * 1000),
    verified: false
  };
  sessionStorage.setItem(STORAGE_KEYS.resetOtp, JSON.stringify(payload));
  return payload;
}

function readOtpSession() {
  return JSON.parse(sessionStorage.getItem(STORAGE_KEYS.resetOtp) || 'null');
}

function updateOtpPreview(code) {
  const preview = document.getElementById('otpPreview');
  if (preview) preview.textContent = code || '------';
}

function initForgotPassword() {
  if (getPage() !== 'forgot-password') return;

  setResetStep(1);

  const emailForm = document.getElementById('forgotEmailForm');
  const otpForm = document.getElementById('otpForm');
  const newPasswordForm = document.getElementById('newPasswordForm');
  const resendBtn = document.getElementById('resendOtpBtn');

  function createAndShowOtp(email, message = 'Kode OTP berhasil dikirim. Masukkan kode OTP untuk konfirmasi.') {
    const code = generateOtpCode();
    saveOtpSession(email, code);
    updateOtpPreview(code);
    setResetStep(2);
    showAlert('forgotAlert', `${message} Kode berlaku selama 5 menit.`, 'success');
  }

  emailForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = document.getElementById('resetEmail').value.trim().toLowerCase();
    if (!email) {
      showAlert('forgotAlert', 'Alamat email wajib diisi.', 'error');
      return;
    }

    const users = getUsers();
    const userExists = users.some(user => user.email === email);
    if (!userExists) {
      showAlert('forgotAlert', 'Email belum terdaftar. Silakan daftar akun terlebih dahulu.', 'error');
      return;
    }

    createAndShowOtp(email);
  });

  otpForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    const otpValue = document.getElementById('otpCode').value.trim();
    const session = readOtpSession();

    if (!session) {
      showAlert('forgotAlert', 'Kode OTP belum dibuat. Masukkan email terlebih dahulu.', 'error');
      setResetStep(1);
      return;
    }

    if (Date.now() > session.expiresAt) {
      showAlert('forgotAlert', 'Kode OTP sudah kedaluwarsa. Silakan kirim ulang kode OTP.', 'error');
      return;
    }

    if (otpValue !== session.code) {
      showAlert('forgotAlert', 'Kode OTP tidak sesuai. Periksa kembali kode yang Anda masukkan.', 'error');
      return;
    }

    session.verified = true;
    sessionStorage.setItem(STORAGE_KEYS.resetOtp, JSON.stringify(session));
    setResetStep(3);
    showAlert('forgotAlert', 'OTP berhasil dikonfirmasi. Silakan buat password baru.', 'success');
  });

  resendBtn?.addEventListener('click', () => {
    const session = readOtpSession();
    const emailInput = document.getElementById('resetEmail')?.value.trim().toLowerCase();
    const email = session?.email || emailInput;

    if (!email) {
      showAlert('forgotAlert', 'Masukkan email terlebih dahulu sebelum kirim ulang OTP.', 'error');
      setResetStep(1);
      return;
    }

    createAndShowOtp(email, 'Kode OTP baru berhasil dikirim ulang.');
  });

  newPasswordForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    const session = readOtpSession();
    const newPassword = document.getElementById('newPassword').value;
    const confirmNewPassword = document.getElementById('confirmNewPassword').value;

    if (!session || !session.verified) {
      showAlert('forgotAlert', 'Konfirmasi OTP terlebih dahulu sebelum membuat password baru.', 'error');
      setResetStep(2);
      return;
    }

    if (!newPassword || !confirmNewPassword) {
      showAlert('forgotAlert', 'Password baru dan konfirmasi password wajib diisi.', 'error');
      return;
    }

    if (newPassword.length < 6) {
      showAlert('forgotAlert', 'Password baru minimal 6 karakter.', 'error');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      showAlert('forgotAlert', 'Konfirmasi password baru tidak sama.', 'error');
      return;
    }

    const users = getUsers();
    const updatedUsers = users.map(user => user.email === session.email ? { ...user, password: newPassword } : user);
    saveUsers(updatedUsers);
    sessionStorage.removeItem(STORAGE_KEYS.resetOtp);
    showAlert('forgotAlert', 'Password berhasil diperbarui. Mengarahkan ke halaman login...', 'success');
    setTimeout(() => window.location.href = './login.html', 1200);
  });
}

function initBooking() {
  if (getPage() !== 'booking') return;

  const currentUser = getCurrentUser();
  if (!currentUser) {
    sessionStorage.setItem(STORAGE_KEYS.afterLogin, window.location.href);
    alert('Silakan login terlebih dahulu sebelum melakukan booking.');
    window.location.href = './login.html?redirect=booking';
    return;
  }

  const select = document.getElementById('packageSelect');
  const durationSelect = document.getElementById('rentalDuration');
  const summary = document.getElementById('bookingSummary');
  const params = new URLSearchParams(window.location.search);
  const preselected = params.get('id');

  if (select) {
    select.setAttribute('required', 'required');
    select.innerHTML = `<option value="" selected disabled>Pilih paket</option>` +
      PACKAGES.map(item => `<option value="${item.id}">${item.name} - ${formatCurrency(item.price)}</option>`).join('');
    if (preselected && getPackageById(preselected)) {
      select.value = preselected;
    }
  }

  if (durationSelect && !durationSelect.value) {
    durationSelect.value = '';
  }

  if (currentUser) {
    document.getElementById('customerName').value = currentUser.name || '';
    document.getElementById('customerPhone').value = currentUser.phone || '';
    document.getElementById('customerEmail').value = currentUser.email || '';
  }

  function renderSummary() {
    const selectedPackageId = select?.value || '';
    const selectedDuration = durationSelect?.value || '';
    const item = selectedPackageId ? getPackageById(selectedPackageId) : null;

    if (!item || !selectedDuration) {
      if (summary) {
        summary.innerHTML = `
          <div class="booking-placeholder">
            <strong>Ringkasan belum tersedia</strong>
            <span>Silakan pilih paket dan durasi terlebih dahulu agar total pembayaran dapat dihitung.</span>
          </div>
        `;
      }
      return { item: null, duration: selectedDuration, total: 0 };
    }

    const multiplier = selectedDuration.includes('Minggu') ? 6 : parseInt(selectedDuration, 10) || 1;
    const total = item.price * multiplier;
    if (summary) {
      summary.innerHTML = `
        <div class="summary-box-item">
          <h4>${item.name}</h4>
          <p class="muted">${item.description}</p>
        </div>
        <div class="summary-box-item">
          <div class="summary-line"><span>Durasi</span><strong>${selectedDuration}</strong></div>
          <div class="summary-line"><span>Harga per hari</span><strong>${formatCurrency(item.price)}</strong></div>
          <hr style="border:none;border-top:1px solid var(--border); margin:10px 0;">
          <div class="summary-line"><span>Total Bayar</span><strong class="summary-total">${formatCurrency(total)}</strong></div>
        </div>
      `;
    }
    return { item, duration: selectedDuration, total };
  }

  ['packageSelect','rentalDuration','customerName','customerPhone','customerEmail'].forEach(id => {
    document.getElementById(id)?.addEventListener('input', renderSummary);
    document.getElementById(id)?.addEventListener('change', renderSummary);
  });
  renderSummary();

  document.getElementById('bookingForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('customerName').value.trim();
    const phone = document.getElementById('customerPhone').value.trim();
    const email = document.getElementById('customerEmail').value.trim();
    const pickupLocation = document.getElementById('pickupLocation').value.trim();
    const destination = document.getElementById('destination').value.trim();
    const rentalDate = document.getElementById('rentalDate').value;
    const rentalTime = document.getElementById('rentalTime').value;
    const note = document.getElementById('note').value.trim();
    const { item, duration, total } = renderSummary();

    if (!item) {
      showAlert('bookingAlert', 'Silakan pilih paket kendaraan terlebih dahulu.', 'error');
      select?.focus();
      return;
    }

    if (!duration) {
      showAlert('bookingAlert', 'Silakan pilih durasi sewa terlebih dahulu.', 'error');
      durationSelect?.focus();
      return;
    }

    if (!name || !phone || !email || !pickupLocation || !destination || !rentalDate || !rentalTime) {
      showAlert('bookingAlert', 'Mohon lengkapi semua data booking.', 'error');
      return;
    }

    const pendingBooking = {
      customer: { name, phone, email },
      item,
      duration,
      total,
      pickupLocation,
      destination,
      rentalDate,
      rentalTime,
      note,
      createdAt: new Date().toISOString()
    };

    sessionStorage.setItem(STORAGE_KEYS.pendingBooking, JSON.stringify(pendingBooking));
    showAlert('bookingAlert', 'Data booking tersimpan. Mengarahkan ke halaman pembayaran...', 'success');
    setTimeout(() => {
      window.location.href = './pembayaran.html';
    }, 700);
  });
}

function initPayment() {
  if (getPage() !== 'pembayaran') return;

  const currentUser = getCurrentUser();
  if (!currentUser) {
    sessionStorage.setItem(STORAGE_KEYS.afterLogin, './pembayaran.html');
    alert('Silakan login terlebih dahulu sebelum melakukan pembayaran.');
    window.location.href = './login.html?redirect=payment';
    return;
  }

  const pending = JSON.parse(sessionStorage.getItem(STORAGE_KEYS.pendingBooking) || 'null');
  const pageAlert = document.getElementById('paymentAlert');
  const summaryTarget = document.getElementById('paymentSummary');

  if (!pending || !pending.item) {
    if (summaryTarget) {
      summaryTarget.innerHTML = `
        <div class="booking-placeholder">
          <strong>Belum ada data booking</strong>
          <span>Silakan lengkapi data booking terlebih dahulu sebelum masuk ke pembayaran.</span>
        </div>
      `;
    }
    showAlert('paymentAlert', 'Belum ada data booking yang perlu dibayar. Mengarahkan ke halaman booking...', 'error');
    setTimeout(() => window.location.href = './booking.html', 1400);
    return;
  }

  function renderPaymentSummary() {
    const selectedMethod = document.querySelector('input[name="paymentMethod"]:checked')?.value || 'Transfer Bank';
    if (!summaryTarget) return;
    summaryTarget.innerHTML = `
      <div class="payment-car-card">
        <img src="${pending.item.image}" alt="${pending.item.name}">
        <div>
          <span class="eyebrow small">${pending.item.type.toUpperCase()}</span>
          <h3>${pending.item.name}</h3>
          <p>${pending.pickupLocation} → ${pending.destination}</p>
        </div>
      </div>
      <div class="payment-summary-list">
        <div class="payment-row"><span>Pelanggan</span><strong>${pending.customer.name}</strong></div>
        <div class="payment-row"><span>Durasi</span><strong>${pending.duration}</strong></div>
        <div class="payment-row"><span>Jadwal</span><strong>${pending.rentalDate} • ${pending.rentalTime}</strong></div>
        <div class="payment-row"><span>Metode</span><strong>${selectedMethod}</strong></div>
        <div class="payment-row total"><span>Total Bayar</span><strong>${formatCurrency(pending.total)}</strong></div>
      </div>
    `;
  }

  document.querySelectorAll('input[name="paymentMethod"]').forEach(input => input.addEventListener('change', renderPaymentSummary));
  renderPaymentSummary();

  document.getElementById('paymentForm')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked')?.value || 'Transfer Bank';
    const code = 'BK' + Date.now().toString().slice(-6);
    const booking = {
      ...pending,
      code,
      paymentMethod,
      paymentStatus: 'Sudah Dibayar',
      progress: 1,
      completed: false,
      paidAt: new Date().toISOString()
    };
    const bookings = getBookings();
    bookings.push(booking);
    saveBookings(bookings);
    localStorage.setItem(STORAGE_KEYS.lastBooking, JSON.stringify(booking));
    sessionStorage.removeItem(STORAGE_KEYS.pendingBooking);

    showAlert('paymentAlert', `Pembayaran berhasil. Kode booking Anda: ${code}. Mengarahkan ke tracking...`, 'success');
    setTimeout(() => {
      window.location.href = './tracking.html?code=' + code;
    }, 1200);
  });
}

function buildTrackingView(booking) {
  const result = document.getElementById('trackingResult');
  const empty = document.getElementById('trackingEmpty');
  if (!result || !empty || !booking) return;
  result.classList.remove('hidden');
  empty.classList.add('hidden');

  const statuses = ['Pending', 'Konfirmasi', 'Mobil Disiapkan', 'Sedang Dijemput', 'Selesai'];
  const progress = Math.min((booking.progress || 1), statuses.length - 1);

  const stepper = document.getElementById('statusStepper');
  stepper.innerHTML = statuses.map((status, index) => `
    <div class="step-item ${index < progress ? 'done' : ''} ${index === progress ? 'active' : ''}">
      <div class="step-dot">${index + 1}</div>
      <div class="step-label">${status}</div>
    </div>
  `).join('');

  const vehicle = document.getElementById('trackingVehicle');
  vehicle.innerHTML = `
    <img src="${booking.item.image}" alt="${booking.item.name}">
    <div class="vehicle-info">
      <div class="eyebrow">Kode ${booking.code}</div>
      <h3>${booking.item.name}</h3>
      <p class="muted">${booking.pickupLocation} → ${booking.destination}</p>
      <div class="package-actions" style="margin-top:12px;">
        ${progress >= 4 ? `<button class="btn btn-accent" id="finishOrderBtn" type="button">Selesaikan Pesanan</button>` : `<button class="btn btn-primary" type="button" disabled>${statuses[progress]}</button>`}
      </div>
    </div>
  `;

  const payment = document.getElementById('trackingPayment');
  payment.innerHTML = `
    <div class="section-mini-title">Ringkasan Pembayaran</div>
    <div class="tracking-payment-list">
      <div class="tracking-pay-row"><span>Unit</span><strong>${booking.item.name}</strong></div>
      <div class="tracking-pay-row"><span>Durasi</span><strong>${booking.duration}</strong></div>
      <div class="tracking-pay-row"><span>Metode</span><strong>${booking.paymentMethod || 'Transfer Bank'}</strong></div>
      <div class="tracking-pay-row total"><span>Total</span><strong>${formatCurrency(booking.total)}</strong></div>
    </div>
  `;

  const details = document.getElementById('trackingDetails');
  details.innerHTML = [
    ['Full Name', booking.customer.name],
    ['Lokasi Jemput', booking.pickupLocation],
    ['Tujuan', booking.destination],
    ['Jadwal', `${booking.rentalDate} • ${booking.rentalTime}`],
    ['Durasi', booking.duration],
    ['Catatan', booking.note || '-']
  ].map(([title, value]) => `<div class="detail-mini"><div class="muted">${title}</div><strong>${value}</strong></div>`).join('');

  const routeFill = document.getElementById('routeFill');
  const carMarker = document.getElementById('carMarker');
  const mapNote = document.getElementById('mapNote');
  const percentages = [8, 28, 52, 76, 100];
  routeFill.style.width = percentages[progress] + '%';
  carMarker.style.left = `calc(${12 + (76 * percentages[progress] / 100)}% - 26px)`;
  mapNote.textContent = `Status saat ini: ${statuses[progress]}. Kendaraan bergerak dari ${booking.pickupLocation} menuju ${booking.destination}.`;

  const finishButton = document.getElementById('finishOrderBtn');
  if (finishButton) {
    finishButton.addEventListener('click', () => {
      const confirmFinish = confirm('Kamu yakin untuk menyelesaikan pesanan?');
      if (!confirmFinish) return;
      const updatedBooking = { ...booking, progress: 4, completed: true, completedAt: new Date().toISOString() };
      const updatedBookings = getBookings().map(item => item.code === booking.code ? updatedBooking : item);
      saveBookings(updatedBookings);
      localStorage.setItem(STORAGE_KEYS.lastBooking, JSON.stringify(updatedBooking));
      alert('Pesanan berhasil diselesaikan. Terima kasih sudah menggunakan Nexora Mobility.');
      window.location.href = './beranda.html';
    });
  }
}

function initTracking() {
  if (getPage() !== 'tracking') return;
  const params = new URLSearchParams(window.location.search);
  const codeInput = document.getElementById('trackingCodeInput');
  const explicitCode = params.get('code');
  if (explicitCode && codeInput) codeInput.value = explicitCode;

  function findBooking(code) {
    const bookings = getBookings();
    return bookings.find(item => item.code === code) || null;
  }

  function simulateProgress(booking) {
    if (!booking) return;
    buildTrackingView(booking);
    let current = booking.progress || 1;
    const steps = [1,2,3,4];
    let idx = steps.indexOf(current);
    if (idx < 0) idx = 0;
    const interval = setInterval(() => {
      current += 1;
      if (current > 4) {
        clearInterval(interval);
        return;
      }
      booking.progress = current;
      const bookings = getBookings().map(item => item.code === booking.code ? booking : item);
      saveBookings(bookings);
      localStorage.setItem(STORAGE_KEYS.lastBooking, JSON.stringify(booking));
      buildTrackingView(booking);
    }, 2500);
  }

  document.getElementById('trackBtn')?.addEventListener('click', () => {
    const code = codeInput.value.trim();
    const booking = findBooking(code);
    if (!booking) {
      alert('Kode booking tidak ditemukan.');
      return;
    }
    simulateProgress(booking);
  });

  document.getElementById('useLatestBooking')?.addEventListener('click', () => {
    const booking = JSON.parse(localStorage.getItem(STORAGE_KEYS.lastBooking) || 'null');
    if (!booking) {
      alert('Belum ada booking terbaru.');
      return;
    }
    if (codeInput) codeInput.value = booking.code;
    simulateProgress(booking);
  });

  if (explicitCode) {
    const booking = findBooking(explicitCode);
    if (booking) simulateProgress(booking);
  }
}

const DEFAULT_FAQS = [
  {
    question: 'Apa saja syarat untuk menyewa kendaraan?',
    answer: 'Pelanggan perlu menyiapkan identitas aktif seperti KTP atau kartu mahasiswa, nomor WhatsApp yang dapat dihubungi, serta mengisi data booking secara lengkap.'
  },
  {
    question: 'Apakah bisa sewa mobil dengan driver?',
    answer: 'Bisa. Nexora Mobility menyediakan pilihan sewa lepas kunci maupun dengan driver. Pilihan driver dapat ditambahkan pada catatan booking atau dikonsultasikan melalui halaman kontak.'
  },
  {
    question: 'Bagaimana sistem pembayaran rental?',
    answer: 'Pembayaran dapat dilakukan melalui transfer bank, virtual account, atau e-wallet. Bukti pembayaran dapat disimpan oleh pelanggan sebagai konfirmasi transaksi.'
  },
  {
    question: 'Apakah kendaraan bisa diantar ke lokasi pelanggan?',
    answer: 'Bisa. Layanan antar kendaraan tersedia untuk area tertentu seperti Pool Bukit Besar, Kampus UNSRI, Bandara SMB II, dan beberapa titik strategis Palembang.'
  },
  {
    question: 'Bagaimana cara menggunakan tracking real time?',
    answer: 'Setelah booking berhasil, pelanggan akan mendapatkan kode booking. Kode tersebut dapat dimasukkan pada halaman tracking untuk melihat simulasi status pesanan secara real time.'
  }
];

const DEFAULT_REVIEWS = [
  {
    name: 'Aditya Pratama',
    role: 'Mahasiswa UNSRI',
    rating: 5,
    message: 'Booking motor untuk ke kampus jadi lebih mudah. Tampilan websitenya jelas dan proses pesannya tidak membingungkan.'
  },
  {
    name: 'Nabila Putri',
    role: 'Pelanggan Harian',
    rating: 5,
    message: 'Mobilnya bersih, admin responsif, dan informasi paketnya lengkap. Cocok untuk perjalanan keluarga di Palembang.'
  },
  {
    name: 'Rangga Wijaya',
    role: 'Karyawan Swasta',
    rating: 4,
    message: 'Fitur tracking sangat membantu untuk melihat progres pesanan. Desain dark mode-nya juga kelihatan modern.'
  }
];

function getReviews() {
  return JSON.parse(localStorage.getItem('rent-customer-reviews') || 'null') || DEFAULT_REVIEWS;
}

function saveReviews(reviews) {
  localStorage.setItem('rent-customer-reviews', JSON.stringify(reviews));
}

function renderStars(value) {
  const rating = Number(value || 5);
  return Array.from({ length: 5 }, (_, index) => index < rating ? '★' : '☆').join('');
}

function reviewCardTemplate(review) {
  const initial = (review.name || 'P').trim().charAt(0).toUpperCase();
  return `
    <article class="rating-card card-surface">
      <div class="star-row">${renderStars(review.rating)}</div>
      <p>“${review.message}”</p>
      <div class="review-user">
        <div class="avatar">${initial}</div>
        <div>
          <strong>${review.name}</strong>
          <span>${review.role || 'Pelanggan Nexora'}</span>
        </div>
      </div>
    </article>
  `;
}

function initCustomer() {
  if (getPage() !== 'customer') return;
  const reviewList = document.getElementById('customerReviews');
  const ratingInput = document.getElementById('ratingValue');

  function renderReviews() {
    if (!reviewList) return;
    const reviews = getReviews();
    reviewList.innerHTML = reviews.map(reviewCardTemplate).join('');
    const average = reviews.reduce((sum, item) => sum + Number(item.rating || 0), 0) / reviews.length;
    const avgTarget = document.getElementById('averageRating');
    const countTarget = document.getElementById('reviewCount');
    if (avgTarget) avgTarget.textContent = average.toFixed(1);
    if (countTarget) countTarget.textContent = reviews.length + ' ulasan pelanggan';
  }

  document.querySelectorAll('.rating-choice button').forEach(button => {
    button.addEventListener('click', () => {
      document.querySelectorAll('.rating-choice button').forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      if (ratingInput) ratingInput.value = button.dataset.rating;
    });
  });

  document.getElementById('customerForm')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.getElementById('reviewName').value.trim();
    const role = document.getElementById('reviewRole').value.trim();
    const message = document.getElementById('reviewMessage').value.trim();
    const rating = Number(ratingInput?.value || 5);
    if (!name || !message) {
      showAlert('customerAlert', 'Nama dan ulasan wajib diisi.', 'error');
      return;
    }
    const reviews = getReviews();
    reviews.unshift({ name, role: role || 'Pelanggan Nexora', rating, message });
    saveReviews(reviews);
    renderReviews();
    showAlert('customerAlert', 'Ulasan berhasil ditambahkan.', 'success');
    event.target.reset();
    if (ratingInput) ratingInput.value = 5;
    document.querySelectorAll('.rating-choice button').forEach(btn => btn.classList.toggle('active', btn.dataset.rating === '5'));
  });

  renderReviews();
}

function initFAQ() {
  if (getPage() !== 'faq') return;
  const faqList = document.getElementById('faqList');
  if (!faqList) return;
  faqList.innerHTML = DEFAULT_FAQS.map((item, index) => `
    <article class="faq-item card-surface ${index === 0 ? 'open' : ''}">
      <button type="button" class="faq-question" aria-expanded="${index === 0 ? 'true' : 'false'}">
        <span>${item.question}</span>
        <span class="faq-icon">+</span>
      </button>
      <div class="faq-answer">
        <p>${item.answer}</p>
      </div>
    </article>
  `).join('');

  document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
      const item = button.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(el => {
        el.classList.remove('open');
        el.querySelector('.faq-question')?.setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        item.classList.add('open');
        button.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

function initContact() {
  if (getPage() !== 'contact') return;
  const currentUser = getCurrentUser();
  if (currentUser) {
    const nameInput = document.getElementById('contactName');
    const emailInput = document.getElementById('contactEmail');
    if (nameInput) nameInput.value = currentUser.name || '';
    if (emailInput) emailInput.value = currentUser.email || '';
  }

  document.getElementById('contactForm')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.getElementById('contactName').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const message = document.getElementById('contactMessage').value.trim();
    if (!name || !email || !message) {
      showAlert('contactAlert', 'Nama, email, dan pesan wajib diisi.', 'error');
      return;
    }
    const inbox = JSON.parse(localStorage.getItem('rent-contact-messages') || '[]');
    inbox.push({ name, email, message, createdAt: new Date().toISOString() });
    localStorage.setItem('rent-contact-messages', JSON.stringify(inbox));
    showAlert('contactAlert', 'Pesan berhasil dikirim. Admin akan menghubungi Anda melalui email atau WhatsApp.', 'success');
    event.target.reset();
  });
}


function initRevealAnimations() {
  const animatedItems = document.querySelectorAll(
    '.page-heading, .hero-floating-card, .hero-search-panel, .section-header-row, .card-surface, .package-card, .feature-box, .rating-card, .stats-grid article, .contact-grid, .customer-hero-grid, .faq-layout, .booking-layout'
  );

  animatedItems.forEach((item, index) => {
    item.classList.add('reveal-item');
    item.style.transitionDelay = `${Math.min(index * 35, 280)}ms`;
  });

  if (!('IntersectionObserver' in window)) {
    animatedItems.forEach(item => item.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  animatedItems.forEach(item => observer.observe(item));
}

function init() {
  createNavbar();
  createFooter();
  applyTheme(getTheme());
  bindThemeToggle();
  initRegister();
  initLogin();
  initForgotPassword();
  initHome();
  initServices();
  initDetail();
  initBooking();
  initPayment();
  initTracking();
  initCustomer();
  initFAQ();
  initContact();
  initRevealAnimations();
}

document.addEventListener('DOMContentLoaded', init);
