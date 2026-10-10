import { clients, deals, activities } from './data.js';

/* ==================== УТИЛИТЫ ==================== */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
const el = (tag, props = {}, ...children) => {
  const node = document.createElement(tag);
  Object.entries(props).forEach(([k, v]) => {
    if (k === 'class') node.className = v;
    else if (k === 'text') node.textContent = v;
    else if (k === 'dataset') Object.assign(node.dataset, v);
    else if (k.startsWith('on')) node.addEventListener(k.slice(2), v);
    else node.setAttribute(k, v);
  });
  children.flat().forEach(c => c && node.append(c));
  return node;
};
const fmtDate = iso => new Intl.DateTimeFormat('ru-RU', { dateStyle: 'medium' }).format(new Date(iso));
const fmtMoney = n => new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(n);

const STATUS = { active:'Активен', lead:'Лид', inactive:'Неактивен', blocked:'Заблокирован' };
const DEAL_STATUS = { won:'Закрыта', pending:'Ожидает', in_progress:'В работе', lost:'Провалена' };
const ACT_STATUS = { done:'Выполнено', planned:'Запланировано', in_progress:'В работе' };

/* ==================== СОСТОЯНИЕ ==================== */
const state = {
  clients: [...clients],
  filters: { search:'', status:'', tags:[] },
  view: 'cards'
};

/* ==================== TOAST ==================== */
function toast(msg, type = 'info') {
  const node = el('div', { class: `toast toast--${type}`, role:'status', text: msg });
  $('#toast-root').append(node);
  setTimeout(() => {
    node.style.opacity = '0';
    node.style.transition = 'opacity .3s';
    setTimeout(() => node.remove(), 300);
  }, 3000);
}

/* ==================== РЕНДЕР КАРТОЧКИ КЛИЕНТА ==================== */
function clientCard(c) {
  const head = el('header', { class:'card__head' },
    el('span', { class:'card__id', text: c.id }),
    el('h3', { class:'card__title', text: `${c.firstName} ${c.lastName}` }),
    el('span', { class:`badge badge--${c.status}`, text: STATUS[c.status] })
  );

  const body = el('p', { class:'card__company', text: c.company });

  const meta = el('footer', { class:'card__meta' },
    el('time', { datetime: c.createdAt, text: fmtDate(c.createdAt) }),
    el('span', { text: c.manager })
  );

  return el('li', {},
    el('article', {
      class:'card',
      tabindex:'0',
      role:'button',
      'aria-label':`Открыть карточку ${c.firstName} ${c.lastName}`,
      dataset: { id: c.id },
      onClick: () => openClientModal(c),
      onKeydown: e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openClientModal(c); } }
    }, head, body, meta)
  );
}

/* ==================== РЕНДЕР ТАБЛИЦЫ КЛИЕНТОВ ==================== */
function clientRow(c) {
  const cells = [
    ['ID', c.id],
    ['Клиент', `${c.firstName} ${c.lastName}`],
    ['Компания', c.company],
    ['Статус', STATUS[c.status]],
    ['Создан', fmtDate(c.createdAt)]
  ];
  const tr = el('tr', {});
  cells.forEach(([label, val]) => {
    tr.append(el('td', { dataset: { label }, text: val }));
  });
  return tr;
}

/* ==================== РЕНДЕР СДЕЛОК ==================== */
function dealRow(d) {
  const cells = [
    ['ID', d.id],
    ['Клиент', d.clientName],
    ['Сумма', fmtMoney(d.amount)],
    ['Статус', DEAL_STATUS[d.status]],
    ['Дата', fmtDate(d.closedAt)]
  ];
  const tr = el('tr', {});
  cells.forEach(([label, val], i) => {
    const td = el('td', { dataset: { label } });
    if (i === 3) td.append(el('span', { class:`badge badge--${d.status}`, text: val }));
    else td.textContent = val;
    tr.append(td);
  });
  return tr;
}

/* ==================== АККОРДЕОН АКТИВНОСТЕЙ ==================== */
function activityItem(a) {
  const item = el('details', { class:'acc-item' });

  const summary = el('summary', { class:'acc-head' },
    el('span', { text: a.title }),
    el('span', { class:'acc-head__meta', text: `${ACT_STATUS[a.status]} · ${fmtDate(a.date)}` })
  );

  const body = el('div', { class:'acc-body' },
    el('p', { text: a.description }),
    el('dl', {},
      el('dt', { text:'Ответственный' }), el('dd', { text: a.responsible }),
      el('dt', { text:'Клиент' }),        el('dd', { text: a.clientId }),
      ...Object.entries(a.details).map(([k,v]) => [el('dt',{text:k}), el('dd',{text:v})]).flat()
    )
  );

  item.append(summary, body);
  return item;
}

/* ==================== ФИЛЬТРАЦИЯ ==================== */
function filterClients() {
  return state.clients.filter(c => {
    const q = state.filters.search.toLowerCase().trim();
    if (q && !`${c.firstName} ${c.lastName} ${c.company} ${c.email}`.toLowerCase().includes(q)) return false;
    if (state.filters.status && c.status !== state.filters.status) return false;
    if (state.filters.tags.length && !state.filters.tags.every(t => c.tags.includes(t))) return false;
    return true;
  });
}

/* ==================== ГЛАВНЫЙ РЕНДЕР ==================== */
function renderClients() {
  const list = filterClients();
  $('#count').textContent = `Найдено: ${list.length}`;

  const cardsEl = $('#clients-cards');
  const tableWrap = $('#clients-table-wrap');
  const tbody = $('#clients-tbody');

  cardsEl.replaceChildren();
  tbody.replaceChildren();

  if (!list.length) {
    cardsEl.append(el('li', { class:'empty', text:'Ничего не найдено' }));
    return;
  }

  const fragCards = document.createDocumentFragment();
  const fragRows = document.createDocumentFragment();
  list.forEach(c => {
    fragCards.append(clientCard(c));
    fragRows.append(clientRow(c));
  });
  cardsEl.append(fragCards);
  tbody.append(fragRows);
}

/* ==================== МОДАЛКА ==================== */
let lastFocused = null;

function openClientModal(c) {
  lastFocused = document.activeElement;

  const body = el('div', {},
    el('dl', {},
      el('dt', { text:'Компания' }), el('dd', { text: c.company }),
      el('dt', { text:'Email' }),    el('dd', { text: c.email }),
      el('dt', { text:'Телефон' }),  el('dd', { text: c.phone }),
      el('dt', { text:'Менеджер' }), el('dd', { text: c.manager }),
      el('dt', { text:'Теги' }),     el('dd', { text: c.tags.join(', ') || '—' }),
      el('dt', { text:'Сделок' }),   el('dd', { text: `${c.deals.length} на ${fmtMoney(c.deals.reduce((s,d)=>s+d.amount,0))}` }),
      el('dt', { text:'Заметки' }),  el('dd', { text: c.notes })
    )
  );

  const closeBtn = el('button', { class:'btn btn--ghost', text:'Закрыть', onClick: () => close() });
  const editBtn = el('button', { class:'btn', text:'Редактировать', onClick: () => { toast('Функция в разработке', 'info'); } });

  const modal = el('div', { class:'modal', role:'dialog', 'aria-modal':'true', 'aria-labelledby':'modal-title' },
    el('header', { class:'modal__head' },
      el('h2', { id:'modal-title', text:`${c.firstName} ${c.lastName}` }),
      el('button', { class:'modal__close', 'aria-label':'Закрыть', text:'×', onClick: () => close() })
    ),
    el('div', { class:'modal__body' }, body),
    el('footer', { class:'modal__foot' }, editBtn, closeBtn)
  );

  const overlay = el('div', { class:'modal-overlay', onClick: e => { if (e.target === overlay) close(); } }, modal);
  $('#modal-root').append(overlay);
  document.body.style.overflow = 'hidden';
  closeBtn.focus();

  const onKey = e => {
    if (e.key === 'Escape') close();
    if (e.key === 'Tab') trapFocus(e, modal);
  };
  document.addEventListener('keydown', onKey);

  function close() {
    overlay.remove();
    document.body.style.overflow = '';
    document.removeEventListener('keydown', onKey);
    lastFocused?.focus();
  }
}

function trapFocus(e, container) {
  const f = $$('a[href],button:not([disabled]),input,select,textarea,[tabindex]:not([tabindex="-1"])', container);
  if (!f.length) return;
  const first = f[0], last = f[f.length - 1];
  if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
  else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
}

/* ==================== ФИЛЬТРЫ ==================== */
const form       = document.querySelector('#filters');
const searchInp  = form.querySelector('#search');
const statusSel  = form.querySelector('#status');
const tagBoxes   = form.querySelectorAll('input[name="tags"]');
const viewRadios = form.querySelectorAll('input[name="view"]');

let searchTimer = null;

function readFilters() {
  state.filters.search = searchInp.value.trim();
  state.filters.status = statusSel.value;
  state.filters.tags   = Array.from(tagBoxes)
    .filter(cb => cb.checked)
    .map(cb => cb.value);

  const checked = Array.from(viewRadios).find(r => r.checked);
  state.view = checked ? checked.value : 'cards';
}

function applyFilters() {
  readFilters();
  renderClients();
}

// 1) Поиск — с debounce
searchInp.addEventListener('input', () => {
  clearTimeout(searchTimer);
  searchTimer = setTimeout(applyFilters, 250);
});

// 2) Статус — сразу
statusSel.addEventListener('change', applyFilters);

// 3) Теги — сразу
tagBoxes.forEach(cb => cb.addEventListener('change', applyFilters));

// 4) Вид (карточки/таблица) — сразу
viewRadios.forEach(r => r.addEventListener('change', applyFilters));

// 5) Сброс
form.addEventListener('reset', () => {
  setTimeout(() => {
    state.filters = { search: '', status: '', tags: [] };
    state.view = 'cards';
    applyFilters();
    toast('Фильтры сброшены', 'ok');
  }, 0);
});

/* ==================== ТЕМА ==================== */
const THEMES = ['light', 'dark', 'contrast'];
$('#theme-toggle').addEventListener('click', () => {
  const cur = document.documentElement.dataset.theme;
  const next = THEMES[(THEMES.indexOf(cur) + 1) % THEMES.length];
  document.documentElement.dataset.theme = next;
  localStorage.setItem('theme', next);
  toast(`Тема: ${next}`, 'ok');
});

matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
  if (!localStorage.getItem('theme')) {
    document.documentElement.dataset.theme = e.matches ? 'dark' : 'light';
  }
});

/* ==================== АКЦЕНТНЫЙ ЦВЕТ ==================== */
const accentPicker = $('#accent-picker');
const savedAccent = localStorage.getItem('accent');
if (savedAccent) accentPicker.value = savedAccent;

accentPicker.addEventListener('input', e => {
  const hex = e.target.value;
  const n = parseInt(hex.slice(1), 16);
  const rgb = [(n>>16)&255, (n>>8)&255, n&255];
  document.documentElement.style.setProperty('--accent', hex);
  document.documentElement.style.setProperty('--accent-rgb', rgb.join(', '));
  localStorage.setItem('accent', hex);
});

/* ==================== БОКОВОЕ МЕНЮ (мобилка) ==================== */
const burger = $('#burger');
const sidebar = $('#sidebar');
const overlay = $('#overlay');

function toggleMenu(open) {
  const isOpen = open ?? !sidebar.classList.contains('is-open');
  sidebar.classList.toggle('is-open', isOpen);
  burger.setAttribute('aria-expanded', String(isOpen));
  overlay.hidden = !isOpen;
  if (isOpen) sidebar.querySelector('a')?.focus();
}

burger.addEventListener('click', () => toggleMenu());
overlay.addEventListener('click', () => toggleMenu(false));
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && sidebar.classList.contains('is-open')) toggleMenu(false);
});

$$('.sidebar__link').forEach(link => {
  link.addEventListener('click', e => {
    $$('.sidebar__link').forEach(l => { l.classList.remove('is-active'); l.removeAttribute('aria-current'); });
    link.classList.add('is-active');
    link.setAttribute('aria-current', 'page');
    if (window.innerWidth < 768) toggleMenu(false);
  });
});

/* ==================== ИНИЦИАЛИЗАЦИЯ ==================== */
function init() {
  // Skeleton
  const cardsEl = $('#clients-cards');
  for (let i = 0; i < 6; i++) cardsEl.append(el('li', { class:'skeleton' }));

  setTimeout(() => {
    renderClients();

    // Сделки
    const dtbody = $('#deals-tbody');
    const dfrag = document.createDocumentFragment();
    deals.slice(0, 10).forEach(d => dfrag.append(dealRow(d)));
    dtbody.append(dfrag);

    // Активности
    const acc = $('#activities');
    const afrag = document.createDocumentFragment();
    activities.forEach(a => afrag.append(activityItem(a)));
    acc.append(afrag);
  }, 600);
}

init();