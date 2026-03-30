const ANN_KEY = 'zakolaki_announcements';

let announcements = loadAnnouncements();

function loadAnnouncements() {
  try {
    const stored = localStorage.getItem(ANN_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    return [];
  }
}

function showPage(name) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + name).classList.add('active');
  if (name === 'announcements') renderAnnouncements();
}

const hamburgerBtn = document.getElementById('hamburgerBtn');
const headerNav    = document.getElementById('headerNav');

hamburgerBtn.addEventListener('click', () => {
  headerNav.classList.toggle('open');
});

function closeMobileMenu() {
  headerNav.classList.remove('open');
}

document.addEventListener('click', (e) => {
  if (!headerNav.contains(e.target) && !hamburgerBtn.contains(e.target)) {
    closeMobileMenu();
  }
});

const TYPE_EMOJI = {
  info:    'ℹ️',
  event:   '🎮',
  warning: '⚠️',
  trophy:  '🏆',
};

function renderAnnouncements() {
  const list = document.getElementById('announcementsList');
  if (!list) return;

  if (announcements.length === 0) {
    list.innerHTML = `
      <div class="no-ann">
        <div class="no-ann-icon">📢</div>
        <div class="no-ann-title">BRAK OGLOSZEN</div>
        <div class="no-ann-sub">Nie ma zadnych aktualnych ogloszen</div>
      </div>`;
    return;
  }

  list.innerHTML = announcements.map(a => `
    <div class="ann-card" data-type="${escapeHtml(a.type)}">
      <div class="ann-card-header">
        <div class="ann-type-badge">${TYPE_EMOJI[a.type] || 'ℹ️'}</div>
        <div class="ann-title">${escapeHtml(a.title)}</div>
      </div>
      <div class="ann-body">${escapeHtml(a.body)}</div>
      <div class="ann-date">${escapeHtml(a.date)}</div>
    </div>
  `).join('');
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

renderAnnouncements();
