// ═══════════════════════════════════════════════════════════════
// DATA — 3 example use cases pre-populated
// ═══════════════════════════════════════════════════════════════

const INITIAL_DATA = [
  {
    id: 'uc-001',
    title: 'Meeting Brief Generator',
    type: 'automation',
    status: 'idea',
    impact: 4,
    effort: 2,
    department: 'Operations',
    stakeholders: ['CEO', 'CFO', 'All HoDs'],
    painpoint: 'Founders and department heads lack structured AI context before meetings, leading to shallow discussions and repeated status updates instead of forward momentum.',
    description: 'An automated workflow that compiles current AI initiative statuses, key metrics, open decisions, and next steps into a personalised briefing document — triggered automatically ahead of calendar events featuring the relevant stakeholders.',
    userStory: 'As a founder, I want a concise briefing on AI initiatives before meetings so I can ask informed questions and drive better decisions without 30 minutes of manual prep.',
    benchmarks: 'Industry standard: 30–60 min of meeting prep per exec per week. McKinsey reports 20% of executive time is spent on information gathering.',
    successMetrics: [
      'Meeting prep time reduced to <5 minutes per session',
      'Briefing adopted by all founders within 4 weeks of launch',
      'Positive NPS from recipients after 4 sessions',
    ],
    notes: 'Consider integrating with Google Calendar to auto-trigger. ahead-lab dashboard could serve as the data source. Start with a simple n8n workflow before productising.',
    repoUrl: '',
    appUrl: '',
    createdAt: '13.04.2026',
    updatedAt: '13.04.2026',
  },
  {
    id: 'uc-002',
    title: 'Product Copy Microapp',
    type: 'slc-app',
    status: 'exploring',
    impact: 4,
    effort: 3,
    department: 'Marketing',
    stakeholders: ['Head of Marketing', 'Brand Manager', 'E-commerce Team'],
    painpoint: 'Writing product descriptions, social captions, and PDP copy for each SKU is repetitive, time-consuming, and inconsistent across channels — causing delays and brand drift.',
    description: 'A simple, loveable, complete web app where staff enter product details (name, ingredients, claims, tone) and receive AI-generated copy variants: product descriptions, social captions, and PDP copy — all following the ahead brand voice.',
    userStory: 'As a marketing manager, I want to generate on-brand product copy in under 10 minutes so I can focus on strategy rather than repetitive writing tasks.',
    benchmarks: 'Current time per SKU copy set: 2–4 hours manual. Competitors using AI copy tools report 70–85% time reduction. Jasper/Copy.ai adoption in CPG sector growing at 40% YoY.',
    successMetrics: [
      'Copy generation time reduced by ≥80% per SKU',
      'Brand voice consistency ≥90% in internal review scoring',
      '≥5 SKUs produced per week using the tool within 6 weeks',
      'Tool adopted by full marketing team within 8 weeks',
    ],
    notes: 'Brand voice guidelines and tone-of-voice document must be embedded as system prompt. Include a review/approval step. Consider adding "regenerate" and tone slider controls.',
    repoUrl: '',
    appUrl: '',
    createdAt: '13.04.2026',
    updatedAt: '13.04.2026',
  },
  {
    id: 'uc-003',
    title: 'Supplier Spec Q&A Bot',
    type: 'microapp',
    status: 'idea',
    impact: 3,
    effort: 3,
    department: 'Supply Chain',
    stakeholders: ['Head of Supply Chain', 'Procurement Lead', 'Quality Assurance'],
    painpoint: 'Procurement and QA teams spend 20–45 minutes per query manually searching supplier PDFs, spec sheets, and certificates to answer product or compliance questions.',
    description: 'A RAG-based microapp that ingests supplier documents, spec sheets, and compliance certificates, enabling staff to ask plain-language questions and receive cited, accurate answers in seconds.',
    userStory: 'As a procurement manager, I want to ask questions about supplier specs in plain English so I can get accurate, sourced answers without reading hundreds of pages manually.',
    benchmarks: 'Average query resolution time today: 20–45 min. RAG implementations in similar industries report 85–95% reduction in document search time.',
    successMetrics: [
      'Query resolution time reduced to <2 minutes',
      'Document corpus covers ≥95% of active supplier documents',
      'Weekly active usage by at least 3 procurement team members',
      'Zero critical compliance errors attributable to missed spec information',
    ],
    notes: 'Need to assess document formats in use (PDF, Excel, Word). Privacy and confidentiality review required before cloud upload. Start with 2–3 pilot suppliers.',
    repoUrl: '',
    appUrl: '',
    createdAt: '13.04.2026',
    updatedAt: '13.04.2026',
  },
];

// ═══════════════════════════════════════════════════════════════
// CONSTANTS
// ═══════════════════════════════════════════════════════════════

const TYPE_LABEL = { 'slc-app': 'SLC App', microapp: 'Microapp', automation: 'Automation' };
const STAT_LABEL = { idea: 'Idea', exploring: 'Exploring', prototyping: 'Prototyping', live: 'Live' };
const TYPE_BADGE = { 'slc-app': 'b-slc', microapp: 'b-micro', automation: 'b-auto' };
const STAT_BADGE = { idea: 'b-idea', exploring: 'b-exp', prototyping: 'b-proto', live: 'b-live' };
const DOT_CLS    = { 'slc-app': 'ds', microapp: 'dm', automation: 'da' };
const DOT_COLOR  = { 'slc-app': '#8345BA', microapp: '#C07BA8', automation: '#C9A800' };

// ═══════════════════════════════════════════════════════════════
// STATE
// ═══════════════════════════════════════════════════════════════

let useCases    = [];
let currentView = 'overview';
let modalState  = null; // { mode: 'view'|'edit'|'add', id: string|null }

// ═══════════════════════════════════════════════════════════════
// STORAGE
// ═══════════════════════════════════════════════════════════════

function loadData() {
  const raw = localStorage.getItem('ahead-lab-v1');
  useCases = raw ? JSON.parse(raw) : JSON.parse(JSON.stringify(INITIAL_DATA));
}

function saveData() {
  localStorage.setItem('ahead-lab-v1', JSON.stringify(useCases));
}

// ═══════════════════════════════════════════════════════════════
// NAVIGATION
// ═══════════════════════════════════════════════════════════════

function navigate(view) {
  currentView = view;
  document.querySelectorAll('.nav-item[data-view]').forEach(function(el) {
    el.classList.toggle('active', el.dataset.view === view);
  });
  document.querySelectorAll('.view').forEach(function(el) {
    el.classList.toggle('active', el.id === 'view-' + view);
  });
  renderCurrent();
}

function renderCurrent() {
  if (currentView === 'overview')  renderOverview();
  if (currentView === 'usecases') renderUseCases();
  if (currentView === 'matrix')   renderMatrix();
}

// ═══════════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════════

function esc(s) {
  if (s === null || s === undefined) return '';
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function typeBadge(type) {
  var cls   = TYPE_BADGE[type] || 'b-idea';
  var label = TYPE_LABEL[type] || type;
  var span = document.createElement('span');
  span.className = 'badge ' + cls;
  span.textContent = label;
  return span;
}

function statusBadge(status) {
  var cls   = STAT_BADGE[status] || 'b-idea';
  var label = STAT_LABEL[status] || status;
  var span = document.createElement('span');
  span.className = 'badge ' + cls;
  span.textContent = label;
  return span;
}

function pipsEl(val, max) {
  max = max || 5;
  var wrap = document.createElement('div');
  wrap.className = 'pips';
  for (var i = 1; i <= max; i++) {
    var pip = document.createElement('span');
    pip.className = 'pip ' + (i <= val ? 'on' : 'off');
    wrap.appendChild(pip);
  }
  return wrap;
}

function today() {
  var d = new Date();
  var dd = String(d.getDate()).padStart(2, '0');
  var mm = String(d.getMonth() + 1).padStart(2, '0');
  var yyyy = d.getFullYear();
  return dd + '.' + mm + '.' + yyyy;
}

function uid() {
  return 'uc-' + Math.random().toString(36).slice(2, 9);
}

function getDepts() {
  var depts = [];
  useCases.forEach(function(uc) {
    if (uc.department && depts.indexOf(uc.department) === -1) {
      depts.push(uc.department);
    }
  });
  return depts.sort();
}

// Matrix dot positioning: impact 1-5 (high=top), effort 1-5 (high=right)
function matrixPos(impact, effort) {
  var x = ((effort  - 1) / 4) * 82 + 9;
  var y = (1 - (impact - 1) / 4) * 82 + 9;
  return { x: x, y: y };
}

// ═══════════════════════════════════════════════════════════════
// OVERVIEW
// ═══════════════════════════════════════════════════════════════

function renderOverview() {
  var d = new Date();
  var dateStr = d.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  var ov = document.getElementById('ov-date');
  if (ov) ov.textContent = dateStr;

  var fd = document.getElementById('footer-date');
  if (fd) fd.textContent = today();

  var total   = useCases.length;
  var live    = useCases.filter(function(u) { return u.status === 'live'; }).length;
  var idea    = useCases.filter(function(u) { return u.status === 'idea'; }).length;
  var inProg  = useCases.filter(function(u) { return u.status === 'exploring' || u.status === 'prototyping'; }).length;

  document.getElementById('s-total').textContent     = total;
  document.getElementById('s-live').textContent      = live;
  document.getElementById('s-live-sub').textContent  = live === 1 ? '1 app in production' : live + ' apps in production';
  document.getElementById('s-inprogress').textContent = inProg;
  document.getElementById('s-ideas').textContent     = idea;

  // Table
  var tbody = document.getElementById('ov-tbody');
  tbody.textContent = '';

  if (useCases.length === 0) {
    var tr = document.createElement('tr');
    var td = document.createElement('td');
    td.colSpan = 4;
    td.style.cssText = 'padding:2rem;text-align:center;color:var(--text-faint)';
    td.textContent = 'No use cases yet. Add one to get started.';
    tr.appendChild(td);
    tbody.appendChild(tr);
  } else {
    useCases.forEach(function(uc) {
      var tr = document.createElement('tr');
      tr.className = 'clickable';
      tr.addEventListener('click', function() { openModal(uc.id, 'view'); });

      // Title cell
      var tdTitle = document.createElement('td');
      var divTitle = document.createElement('div');
      divTitle.className = 'cell-title';
      divTitle.textContent = uc.title;
      var divSub = document.createElement('div');
      divSub.className = 'cell-sub';
      divSub.textContent = uc.department || '';
      tdTitle.appendChild(divTitle);
      tdTitle.appendChild(divSub);

      // Type cell
      var tdType = document.createElement('td');
      tdType.appendChild(typeBadge(uc.type));

      // Status cell
      var tdStat = document.createElement('td');
      tdStat.appendChild(statusBadge(uc.status));

      // Impact cell
      var tdImpact = document.createElement('td');
      tdImpact.appendChild(pipsEl(uc.impact));

      tr.appendChild(tdTitle);
      tr.appendChild(tdType);
      tr.appendChild(tdStat);
      tr.appendChild(tdImpact);
      tbody.appendChild(tr);
    });
  }

  renderMiniMatrix();
}

function renderMiniMatrix() {
  var matrix = document.getElementById('mini-matrix');
  matrix.querySelectorAll('.m-dot').forEach(function(el) { el.remove(); });

  useCases.forEach(function(uc, i) {
    var pos = matrixPos(uc.impact, uc.effort);
    var dot = document.createElement('div');
    dot.className = 'm-dot ' + (DOT_CLS[uc.type] || 'da');
    dot.style.left = pos.x + '%';
    dot.style.top  = pos.y + '%';
    dot.textContent = String(i + 1);

    dot.addEventListener('mouseenter', function(e) {
      showTooltip(e, uc.title, TYPE_LABEL[uc.type] + ' · ' + STAT_LABEL[uc.status]);
    });
    dot.addEventListener('mousemove', moveTooltip);
    dot.addEventListener('mouseleave', hideTooltip);
    dot.addEventListener('click', function() { openModal(uc.id, 'view'); });

    matrix.appendChild(dot);
  });
}

// ═══════════════════════════════════════════════════════════════
// USE CASES VIEW
// ═══════════════════════════════════════════════════════════════

function renderUseCases() {
  var deptSel = document.getElementById('filter-dept');
  var currentDept = deptSel.value;
  while (deptSel.options.length > 1) deptSel.remove(1);
  getDepts().forEach(function(d) {
    var opt = document.createElement('option');
    opt.value = d;
    opt.textContent = d;
    if (d === currentDept) opt.selected = true;
    deptSel.appendChild(opt);
  });
  filterUseCases();
}

function filterUseCases() {
  var search = (document.getElementById('search-inp').value || '').toLowerCase();
  var type   = document.getElementById('filter-type').value;
  var status = document.getElementById('filter-status').value;
  var dept   = document.getElementById('filter-dept').value;

  var filtered = useCases.filter(function(uc) {
    if (type   !== 'all' && uc.type      !== type)   return false;
    if (status !== 'all' && uc.status    !== status)  return false;
    if (dept   !== 'all' && uc.department !== dept)   return false;
    if (search) {
      var hay = [uc.title, uc.description, uc.painpoint, uc.department, uc.notes].join(' ').toLowerCase();
      if (hay.indexOf(search) === -1) return false;
    }
    return true;
  });

  var grid = document.getElementById('uc-grid');
  grid.textContent = '';

  if (filtered.length === 0) {
    var empty = document.createElement('div');
    empty.className = 'empty';
    empty.style.gridColumn = '1/-1';
    var icon = document.createElement('div');
    icon.className = 'empty-icon';
    icon.textContent = '🔍';
    var heading = document.createElement('h3');
    heading.textContent = 'No use cases found';
    var para = document.createElement('p');
    para.textContent = 'Try adjusting your filters or add a new use case.';
    empty.appendChild(icon);
    empty.appendChild(heading);
    empty.appendChild(para);
    grid.appendChild(empty);
    return;
  }

  filtered.forEach(function(uc) {
    var card = document.createElement('div');
    card.className = 'uc-card';
    card.addEventListener('click', function() { openModal(uc.id, 'view'); });

    // Top row
    var top = document.createElement('div');
    top.className = 'uc-card-top';
    var titleEl = document.createElement('div');
    titleEl.className = 'uc-card-title';
    titleEl.textContent = uc.title;
    top.appendChild(titleEl);
    card.appendChild(top);

    // Badges
    var badges = document.createElement('div');
    badges.className = 'uc-card-badges';
    badges.appendChild(typeBadge(uc.type));
    badges.appendChild(statusBadge(uc.status));
    card.appendChild(badges);

    // Department
    var dept = document.createElement('div');
    dept.className = 'uc-card-dept';
    dept.textContent = uc.department || '';
    card.appendChild(dept);

    // Painpoint
    var pain = document.createElement('div');
    pain.className = 'uc-card-pain';
    pain.textContent = uc.painpoint || '';
    card.appendChild(pain);

    // Footer
    var footer = document.createElement('div');
    footer.className = 'uc-card-footer';

    var scores = document.createElement('div');
    scores.className = 'uc-card-scores';

    var impW = document.createElement('div');
    impW.className = 'uc-score-wrap';
    var impL = document.createElement('span');
    impL.className = 'uc-score-lbl';
    impL.textContent = 'Impact';
    impW.appendChild(impL);
    impW.appendChild(pipsEl(uc.impact));
    scores.appendChild(impW);

    var effW = document.createElement('div');
    effW.className = 'uc-score-wrap';
    var effL = document.createElement('span');
    effL.className = 'uc-score-lbl';
    effL.textContent = 'Effort';
    effW.appendChild(effL);
    effW.appendChild(pipsEl(uc.effort));
    scores.appendChild(effW);

    footer.appendChild(scores);

    // Action links
    var actions = document.createElement('div');
    actions.className = 'uc-card-actions';
    if (uc.appUrl) {
      var appLink = document.createElement('a');
      appLink.href = uc.appUrl;
      appLink.target = '_blank';
      appLink.className = 'btn btn-primary btn-sm btn-icon';
      appLink.title = 'Open App';
      appLink.textContent = '↗';
      appLink.addEventListener('click', function(e) { e.stopPropagation(); });
      actions.appendChild(appLink);
    }
    if (uc.repoUrl) {
      var repoLink = document.createElement('a');
      repoLink.href = uc.repoUrl;
      repoLink.target = '_blank';
      repoLink.className = 'btn btn-secondary btn-sm btn-icon';
      repoLink.title = 'View Repo';
      repoLink.textContent = '⌥';
      repoLink.addEventListener('click', function(e) { e.stopPropagation(); });
      actions.appendChild(repoLink);
    }
    footer.appendChild(actions);
    card.appendChild(footer);

    grid.appendChild(card);
  });
}

// ═══════════════════════════════════════════════════════════════
// MATRIX VIEW
// ═══════════════════════════════════════════════════════════════

function renderMatrix() {
  var inner      = document.getElementById('matrix-inner');
  var legendList = document.getElementById('matrix-legend-list');

  // Remove old dots
  inner.querySelectorAll('.f-dot').forEach(function(el) { el.remove(); });
  legendList.textContent = '';

  if (useCases.length === 0) {
    var msg = document.createElement('div');
    msg.style.cssText = 'font-size:0.78rem;color:var(--text-faint);padding:0.5rem 0;';
    msg.textContent = 'No use cases yet.';
    legendList.appendChild(msg);
    return;
  }

  useCases.forEach(function(uc, i) {
    // Legend item
    var item = document.createElement('div');
    item.className = 'legend-item';
    item.addEventListener('click', function() { openModal(uc.id, 'view'); });

    var ldot = document.createElement('span');
    ldot.className = 'l-dot';
    ldot.style.background = DOT_COLOR[uc.type] || '#E8D400';

    var lnum = document.createElement('span');
    lnum.style.cssText = 'color:var(--text-faint);margin-right:4px;font-size:0.68rem;font-family:"JetBrains Mono",monospace;';
    lnum.textContent = String(i + 1);

    var ltxt = document.createElement('span');
    ltxt.textContent = uc.title;

    item.appendChild(ldot);
    item.appendChild(lnum);
    item.appendChild(ltxt);
    legendList.appendChild(item);

    // Matrix dot
    var pos  = matrixPos(uc.impact, uc.effort);
    var dot  = document.createElement('div');
    dot.className = 'f-dot';
    dot.style.left       = pos.x + '%';
    dot.style.top        = pos.y + '%';
    dot.style.width      = '32px';
    dot.style.height     = '32px';
    dot.style.background = DOT_COLOR[uc.type] || '#E8D400';
    dot.textContent      = String(i + 1);

    dot.addEventListener('mouseenter', function(e) {
      showTooltip(e, uc.title, 'Impact: ' + uc.impact + '/5 · Effort: ' + uc.effort + '/5');
    });
    dot.addEventListener('mousemove', moveTooltip);
    dot.addEventListener('mouseleave', hideTooltip);
    dot.addEventListener('click', function() { openModal(uc.id, 'view'); });

    inner.appendChild(dot);
  });
}

// ═══════════════════════════════════════════════════════════════
// MODAL
// ═══════════════════════════════════════════════════════════════

function openModal(id, mode) {
  modalState = { mode: mode, id: id };
  var overlay = document.getElementById('overlay');
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  overlay.onclick = function(e) { if (e.target === overlay) closeModal(); };
  renderModal();
}

function closeModal() {
  document.getElementById('overlay').classList.remove('open');
  document.body.style.overflow = '';
  modalState = null;
}

function renderModal() {
  var mode = modalState.mode;
  var id   = modalState.id;
  var uc   = id ? useCases.find(function(u) { return u.id === id; }) : null;
  if (mode === 'view') buildModalView(uc);
  else                 buildModalEdit(uc, mode);
}

// ─── View mode ──────────────────────────────────────────────────
function buildModalView(uc) {
  var modal = document.getElementById('modal');
  modal.textContent = '';

  // Header
  var header = document.createElement('div');
  header.className = 'modal-header';

  var info = document.createElement('div');
  info.className = 'modal-header-info';
  var title = document.createElement('div');
  title.className = 'modal-h-title';
  title.textContent = uc.title;
  var badgeRow = document.createElement('div');
  badgeRow.className = 'modal-h-badges';
  badgeRow.appendChild(typeBadge(uc.type));
  badgeRow.appendChild(statusBadge(uc.status));
  info.appendChild(title);
  info.appendChild(badgeRow);

  var actions = document.createElement('div');
  actions.className = 'modal-h-actions';
  var closeBtn = document.createElement('button');
  closeBtn.className = 'btn btn-ghost btn-sm btn-icon';
  closeBtn.textContent = '✕';
  closeBtn.title = 'Close';
  closeBtn.addEventListener('click', closeModal);
  actions.appendChild(closeBtn);

  header.appendChild(info);
  header.appendChild(actions);
  modal.appendChild(header);

  // Body
  var body = document.createElement('div');
  body.className = 'modal-body';

  var grid = document.createElement('div');
  grid.className = 'field-grid';

  // Department
  addViewField(grid, 'Department', uc.department, false);

  // Stakeholders
  var stakeholderEl = document.createElement('div');
  if (uc.stakeholders && uc.stakeholders.length > 0) {
    var tags = document.createElement('div');
    tags.className = 'tags';
    uc.stakeholders.forEach(function(s) {
      var tag = document.createElement('span');
      tag.className = 'tag';
      tag.textContent = s;
      tags.appendChild(tag);
    });
    stakeholderEl = tags;
  } else {
    stakeholderEl.className = 'field-val';
    stakeholderEl.style.cssText = 'color:var(--text-faint);font-style:italic';
    stakeholderEl.textContent = 'Not set';
  }
  addViewFieldEl(grid, 'Stakeholders', stakeholderEl);

  // Impact
  var impEl = document.createElement('div');
  impEl.className = 'metric-score';
  impEl.appendChild(pipsEl(uc.impact));
  var impNum = document.createElement('span');
  impNum.className = 'score-num';
  impNum.textContent = uc.impact + '/5';
  impEl.appendChild(impNum);
  addViewFieldEl(grid, 'Impact', impEl);

  // Effort
  var effEl = document.createElement('div');
  effEl.className = 'metric-score';
  effEl.appendChild(pipsEl(uc.effort));
  var effNum = document.createElement('span');
  effNum.className = 'score-num';
  effNum.textContent = uc.effort + '/5';
  effEl.appendChild(effNum);
  addViewFieldEl(grid, 'Effort', effEl);

  addDivider(grid);

  addViewField(grid, 'Pain Point', uc.painpoint, true);
  addViewField(grid, 'Description', uc.description, true);

  // User story (italic)
  if (uc.userStory) {
    var usGroup = document.createElement('div');
    usGroup.className = 'fg-full form-group';
    var usLabel = document.createElement('div');
    usLabel.className = 'field-label';
    usLabel.textContent = 'User Story';
    var usVal = document.createElement('div');
    usVal.className = 'field-val';
    usVal.style.cssText = 'font-style:italic;color:var(--text-muted);';
    usVal.textContent = uc.userStory;
    usGroup.appendChild(usLabel);
    usGroup.appendChild(usVal);
    grid.appendChild(usGroup);
  }

  addDivider(grid);

  addViewField(grid, 'Benchmarks', uc.benchmarks, true);

  // Success metrics
  if (uc.successMetrics && uc.successMetrics.length > 0) {
    var smGroup = document.createElement('div');
    smGroup.className = 'fg-full form-group';
    var smLabel = document.createElement('div');
    smLabel.className = 'field-label';
    smLabel.textContent = 'Success Metrics';
    var smList = document.createElement('div');
    smList.className = 'metrics-list';
    uc.successMetrics.forEach(function(m) {
      var item = document.createElement('div');
      item.className = 'metric-item';
      var bullet = document.createElement('span');
      bullet.className = 'metric-bullet';
      bullet.textContent = '▸';
      var text = document.createElement('span');
      text.textContent = m;
      item.appendChild(bullet);
      item.appendChild(text);
      smList.appendChild(item);
    });
    smGroup.appendChild(smLabel);
    smGroup.appendChild(smList);
    grid.appendChild(smGroup);
  }

  // Notes
  if (uc.notes) {
    addDivider(grid);
    var notesGroup = document.createElement('div');
    notesGroup.className = 'fg-full form-group';
    var notesLabel = document.createElement('div');
    notesLabel.className = 'field-label';
    notesLabel.textContent = 'Notes';
    var notesVal = document.createElement('div');
    notesVal.className = 'field-val';
    notesVal.style.cssText = 'background:var(--surface-2);border:1px solid var(--border);border-radius:var(--radius-sm);padding:0.75rem;white-space:pre-wrap;';
    notesVal.textContent = uc.notes;
    notesGroup.appendChild(notesLabel);
    notesGroup.appendChild(notesVal);
    grid.appendChild(notesGroup);
  }

  // Links
  if (uc.repoUrl || uc.appUrl) {
    addDivider(grid);
    if (uc.repoUrl) {
      var repoGroup = document.createElement('div');
      repoGroup.className = 'form-group';
      var repoLabel = document.createElement('div');
      repoLabel.className = 'field-label';
      repoLabel.textContent = 'Repository';
      var repoA = document.createElement('div');
      repoA.className = 'field-val';
      var repoLink = document.createElement('a');
      repoLink.href = uc.repoUrl;
      repoLink.target = '_blank';
      repoLink.textContent = '↗ View Repo';
      repoA.appendChild(repoLink);
      repoGroup.appendChild(repoLabel);
      repoGroup.appendChild(repoA);
      grid.appendChild(repoGroup);
    }
    if (uc.appUrl) {
      var appGroup = document.createElement('div');
      appGroup.className = 'form-group';
      var appLabel = document.createElement('div');
      appLabel.className = 'field-label';
      appLabel.textContent = 'Live App';
      var appA = document.createElement('div');
      appA.className = 'field-val';
      var appLink = document.createElement('a');
      appLink.href = uc.appUrl;
      appLink.target = '_blank';
      appLink.textContent = '↗ Open App';
      appA.appendChild(appLink);
      appGroup.appendChild(appLabel);
      appGroup.appendChild(appA);
      grid.appendChild(appGroup);
    }
  }

  body.appendChild(grid);
  modal.appendChild(body);

  // Footer
  var footer = document.createElement('div');
  footer.className = 'modal-footer';

  var meta = document.createElement('div');
  meta.style.cssText = 'font-size:0.7rem;color:var(--text-faint);';
  meta.textContent = 'Created ' + (uc.createdAt || '—') + ' · Updated ' + (uc.updatedAt || '—');

  var right = document.createElement('div');
  right.className = 'modal-footer-right';

  var delBtn = document.createElement('button');
  delBtn.className = 'btn btn-danger btn-sm';
  delBtn.textContent = 'Delete';
  delBtn.addEventListener('click', function() { deleteUseCase(uc.id); });

  var editBtn2 = document.createElement('button');
  editBtn2.className = 'btn btn-primary btn-sm';
  editBtn2.textContent = 'Edit';
  editBtn2.addEventListener('click', function() { openModal(uc.id, 'edit'); });

  right.appendChild(delBtn);
  right.appendChild(editBtn2);
  footer.appendChild(meta);
  footer.appendChild(right);
  modal.appendChild(footer);
}

function addViewField(grid, label, value, full) {
  var group = document.createElement('div');
  group.className = (full ? 'fg-full ' : '') + 'form-group';
  var lbl = document.createElement('div');
  lbl.className = 'field-label';
  lbl.textContent = label;
  var val = document.createElement('div');
  val.className = 'field-val';
  if (value) {
    val.textContent = value;
  } else {
    val.style.cssText = 'color:var(--text-faint);font-style:italic;';
    val.textContent = 'Not set';
  }
  group.appendChild(lbl);
  group.appendChild(val);
  grid.appendChild(group);
}

function addViewFieldEl(grid, label, el) {
  var group = document.createElement('div');
  group.className = 'form-group';
  var lbl = document.createElement('div');
  lbl.className = 'field-label';
  lbl.textContent = label;
  group.appendChild(lbl);
  group.appendChild(el);
  grid.appendChild(group);
}

function addDivider(grid) {
  var hr = document.createElement('hr');
  hr.className = 'fg-divider';
  grid.appendChild(hr);
}

// ─── Edit / Add mode ────────────────────────────────────────────
function buildModalEdit(uc, mode) {
  var isNew = mode === 'add';
  var modal = document.getElementById('modal');
  modal.textContent = '';

  // Header
  var header = document.createElement('div');
  header.className = 'modal-header';

  var info = document.createElement('div');
  info.className = 'modal-header-info';
  var titleEl = document.createElement('div');
  titleEl.className = 'modal-h-title';
  titleEl.textContent = isNew ? 'New Use Case' : 'Edit: ' + uc.title;
  var hint = document.createElement('div');
  hint.className = 'modal-h-badges';
  hint.style.marginTop = '0.25rem';
  var hintSpan = document.createElement('span');
  hintSpan.style.cssText = 'font-size:0.72rem;color:var(--text-faint);';
  hintSpan.textContent = isNew ? 'Fill in the details below to register a new use case.' : 'Edit the fields and save when done.';
  hint.appendChild(hintSpan);
  info.appendChild(titleEl);
  info.appendChild(hint);

  var acts = document.createElement('div');
  acts.className = 'modal-h-actions';
  var xBtn = document.createElement('button');
  xBtn.className = 'btn btn-ghost btn-sm btn-icon';
  xBtn.textContent = '✕';
  xBtn.addEventListener('click', closeModal);
  acts.appendChild(xBtn);

  header.appendChild(info);
  header.appendChild(acts);
  modal.appendChild(header);

  // Body / Form
  var body = document.createElement('div');
  body.className = 'modal-body';

  var form = document.createElement('form');
  form.id = 'uc-form';
  form.className = 'form-grid';
  form.addEventListener('submit', function(e) { e.preventDefault(); });

  // Title
  addFormField(form, 'title', 'Title *', 'input', '', uc ? uc.title : '', 'e.g. Meeting Brief Generator', true);

  // Type + Status (two columns)
  addFormSelect(form, 'type', 'Type *', [
    { val: 'slc-app',    lbl: 'SLC App' },
    { val: 'microapp',   lbl: 'Microapp' },
    { val: 'automation', lbl: 'Automation' },
  ], uc ? uc.type : 'automation', false);

  addFormSelect(form, 'status', 'Status *', [
    { val: 'idea',        lbl: 'Idea' },
    { val: 'exploring',   lbl: 'Exploring' },
    { val: 'prototyping', lbl: 'Prototyping' },
    { val: 'live',        lbl: 'Live' },
  ], uc ? uc.status : 'idea', false);

  // Department + Stakeholders
  addFormField(form, 'department', 'Department', 'input', '', uc ? uc.department : '', 'e.g. Marketing', false);
  addFormField(form, 'stakeholders', 'Stakeholders (comma-separated)', 'input', '', uc ? (uc.stakeholders || []).join(', ') : '', 'e.g. CEO, Head of Marketing', false);

  // Sliders
  addFormRange(form, 'impact', 'Impact (1 = low, 5 = high)', uc ? uc.impact : 3, 'How significantly will this impact business outcomes?');
  addFormRange(form, 'effort', 'Effort (1 = easy, 5 = complex)', uc ? uc.effort : 3, 'How much time, skill, and resource is required?');

  addFormDivider(form);

  addFormField(form, 'painpoint',   'Pain Point — what problem does this solve?',      'textarea', '', uc ? uc.painpoint   : '', 'Describe the problem this addresses…', true);
  addFormField(form, 'description', 'Description — what does it do?',                  'textarea', '', uc ? uc.description : '', 'Describe the solution and how it works…', true);
  addFormField(form, 'userStory',   'User Story — "As a [role], I want [goal] so that [reason]"', 'textarea', 'short', uc ? uc.userStory   : '', 'As a … I want … so that …', true);

  addFormDivider(form);

  addFormField(form, 'benchmarks',     'Benchmarks — industry data, competitor context',  'textarea', 'short', uc ? uc.benchmarks     : '', 'e.g. Industry average: 2 hours per task…', true);
  addFormField(form, 'successMetrics', 'Success Metrics — one per line',                 'textarea', '', uc ? (uc.successMetrics || []).join('\n') : '', 'Time reduced by 80%\nAdoption by full team within 8 weeks', true);
  addFormField(form, 'notes',          'Notes — decisions, questions, context',           'textarea', '', uc ? uc.notes          : '', 'Working notes, open questions, next steps…', true);

  addFormDivider(form);

  addFormField(form, 'repoUrl', 'Repository URL', 'input', 'url', uc ? uc.repoUrl : '', 'https://github.com/…', false);
  addFormField(form, 'appUrl',  'App URL',         'input', 'url', uc ? uc.appUrl  : '', 'https://…', false);

  body.appendChild(form);
  modal.appendChild(body);

  // Footer
  var footer = document.createElement('div');
  footer.className = 'modal-footer';

  var leftDiv = document.createElement('div');
  if (!isNew) {
    var delBtn = document.createElement('button');
    delBtn.className = 'btn btn-danger btn-sm';
    delBtn.textContent = 'Delete';
    delBtn.addEventListener('click', function() { deleteUseCase(uc.id); });
    leftDiv.appendChild(delBtn);
  }

  var right = document.createElement('div');
  right.className = 'modal-footer-right';

  var cancelBtn = document.createElement('button');
  cancelBtn.className = 'btn btn-secondary btn-sm';
  cancelBtn.textContent = 'Cancel';
  cancelBtn.addEventListener('click', function() {
    if (isNew) closeModal();
    else openModal(uc.id, 'view');
  });

  var saveBtn = document.createElement('button');
  saveBtn.className = 'btn btn-primary btn-sm';
  saveBtn.textContent = isNew ? 'Add Use Case' : 'Save Changes';
  saveBtn.addEventListener('click', function() { saveUseCase(isNew ? '' : uc.id); });

  var pasteBtn = document.createElement('button');
  pasteBtn.className = 'btn btn-secondary btn-sm';
  pasteBtn.textContent = '⇣ Paste';
  pasteBtn.addEventListener('click', openPasteOverlay);

  right.appendChild(pasteBtn);
  right.appendChild(cancelBtn);
  right.appendChild(saveBtn);
  footer.appendChild(leftDiv);
  footer.appendChild(right);
  modal.appendChild(footer);
}

function addFormField(form, name, label, type, subtype, value, placeholder, full) {
  var group = document.createElement('div');
  group.className = 'form-group' + (full ? ' ff-full' : '');
  var lbl = document.createElement('label');
  lbl.className = 'form-lbl';
  lbl.textContent = label;
  group.appendChild(lbl);

  if (type === 'textarea') {
    var ta = document.createElement('textarea');
    ta.className = 'form-txt';
    ta.name = name;
    ta.placeholder = placeholder || '';
    ta.value = value || '';
    ta.rows = subtype === 'short' ? 2 : 3;
    group.appendChild(ta);
  } else {
    var inp = document.createElement('input');
    inp.className = 'form-inp';
    inp.type = subtype || 'text';
    inp.name = name;
    inp.placeholder = placeholder || '';
    inp.value = value || '';
    group.appendChild(inp);
  }

  form.appendChild(group);
}

function addFormSelect(form, name, label, options, selected, full) {
  var group = document.createElement('div');
  group.className = 'form-group' + (full ? ' ff-full' : '');
  var lbl = document.createElement('label');
  lbl.className = 'form-lbl';
  lbl.textContent = label;
  var sel = document.createElement('select');
  sel.className = 'form-sel';
  sel.name = name;
  options.forEach(function(opt) {
    var o = document.createElement('option');
    o.value = opt.val;
    o.textContent = opt.lbl;
    if (opt.val === selected) o.selected = true;
    sel.appendChild(o);
  });
  group.appendChild(lbl);
  group.appendChild(sel);
  form.appendChild(group);
}

function addFormRange(form, name, label, value, hint) {
  var group = document.createElement('div');
  group.className = 'form-group';
  var lbl = document.createElement('label');
  lbl.className = 'form-lbl';
  lbl.textContent = label;
  var row = document.createElement('div');
  row.className = 'range-row';
  var range = document.createElement('input');
  range.type = 'range';
  range.className = 'form-range';
  range.name = name;
  range.min = 1; range.max = 5; range.step = 1;
  range.value = value || 3;
  var valSpan = document.createElement('span');
  valSpan.className = 'range-val';
  valSpan.textContent = String(value || 3);
  range.addEventListener('input', function() { valSpan.textContent = range.value; });
  row.appendChild(range);
  row.appendChild(valSpan);
  var hintEl = document.createElement('span');
  hintEl.className = 'range-hint';
  hintEl.textContent = hint || '';
  group.appendChild(lbl);
  group.appendChild(row);
  group.appendChild(hintEl);
  form.appendChild(group);
}

function addFormDivider(form) {
  var hr = document.createElement('hr');
  hr.className = 'ff-divider';
  form.appendChild(hr);
}

// ─── Save ────────────────────────────────────────────────────────
function saveUseCase(id) {
  var form = document.getElementById('uc-form');
  if (!form) return;

  var titleInp = form.querySelector('[name="title"]');
  var title = titleInp ? titleInp.value.trim() : '';
  if (!title) { alert('Please enter a title.'); return; }

  function val(n) {
    var el = form.querySelector('[name="' + n + '"]');
    return el ? el.value : '';
  }

  var successMetrics = val('successMetrics').split('\n').map(function(s) { return s.trim(); }).filter(Boolean);
  var stakeholders   = val('stakeholders').split(',').map(function(s) { return s.trim(); }).filter(Boolean);
  var now = today();

  if (!id) {
    // New
    var newUC = {
      id:             uid(),
      title:          title,
      type:           val('type'),
      status:         val('status'),
      impact:         parseInt(val('impact'), 10),
      effort:         parseInt(val('effort'), 10),
      department:     val('department'),
      stakeholders:   stakeholders,
      painpoint:      val('painpoint'),
      description:    val('description'),
      userStory:      val('userStory'),
      benchmarks:     val('benchmarks'),
      successMetrics: successMetrics,
      notes:          val('notes'),
      repoUrl:        val('repoUrl'),
      appUrl:         val('appUrl'),
      createdAt:      now,
      updatedAt:      now,
    };
    useCases.push(newUC);
    saveData();
    closeModal();
    renderCurrent();
    setTimeout(function() { openModal(newUC.id, 'view'); }, 50);
  } else {
    // Update
    var idx = useCases.findIndex(function(u) { return u.id === id; });
    if (idx < 0) return;
    var existing = useCases[idx];
    useCases[idx] = {
      id:             existing.id,
      title:          title,
      type:           val('type'),
      status:         val('status'),
      impact:         parseInt(val('impact'), 10),
      effort:         parseInt(val('effort'), 10),
      department:     val('department'),
      stakeholders:   stakeholders,
      painpoint:      val('painpoint'),
      description:    val('description'),
      userStory:      val('userStory'),
      benchmarks:     val('benchmarks'),
      successMetrics: successMetrics,
      notes:          val('notes'),
      repoUrl:        val('repoUrl'),
      appUrl:         val('appUrl'),
      createdAt:      existing.createdAt,
      updatedAt:      now,
    };
    saveData();
    modalState = { mode: 'view', id: id };
    renderModal();
    renderCurrent();
  }
}

function deleteUseCase(id) {
  if (!confirm('Delete this use case? This cannot be undone.')) return;
  useCases = useCases.filter(function(uc) { return uc.id !== id; });
  saveData();
  closeModal();
  renderCurrent();
}

// ═══════════════════════════════════════════════════════════════
// PASTE IMPORT
// ═══════════════════════════════════════════════════════════════

function openPasteOverlay() {
  var overlay = document.createElement('div');
  overlay.id = 'paste-overlay';
  overlay.style.cssText = 'position:fixed;inset:0;background:rgba(45,27,66,0.6);backdrop-filter:blur(3px);z-index:200;display:flex;align-items:center;justify-content:center;padding:1.5rem;';

  var box = document.createElement('div');
  box.style.cssText = 'background:var(--surface);border:1px solid var(--border-lg);border-radius:var(--radius-lg);width:100%;max-width:600px;box-shadow:0 32px 80px rgba(131,69,186,0.15);';

  var hdr = document.createElement('div');
  hdr.style.cssText = 'padding:1.25rem 1.5rem;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;';
  var hdrTitle = document.createElement('div');
  hdrTitle.style.cssText = 'font-weight:700;font-size:0.95rem;color:var(--purple);';
  hdrTitle.textContent = 'Paste from AI';
  var hdrX = document.createElement('button');
  hdrX.className = 'btn btn-ghost btn-sm btn-icon';
  hdrX.textContent = '✕';
  hdrX.addEventListener('click', function() { overlay.remove(); });
  hdr.appendChild(hdrTitle);
  hdr.appendChild(hdrX);

  var bdy = document.createElement('div');
  bdy.style.cssText = 'padding:1.25rem 1.5rem;';
  var hint = document.createElement('p');
  hint.style.cssText = 'font-size:0.78rem;color:var(--text-muted);margin-bottom:0.75rem;';
  hint.textContent = 'Paste your YAML + Markdown below. Fields in the form will be overwritten with matching values.';
  var ta = document.createElement('textarea');
  ta.className = 'form-txt';
  ta.style.cssText = 'height:260px;font-family:"JetBrains Mono",monospace;font-size:0.76rem;line-height:1.55;';
  ta.placeholder = '---\ntitle: My Use Case\ntype: automation\nstatus: idea\nimpact: 4\neffort: 2\ndepartment: Marketing\nstakeholders:\n  - CEO\n  - Head of Marketing\n---\n\n## Pain Point\n...\n\n## Description\n...\n\n## User Story\nAs a ...\n\n## Benchmarks\n...\n\n## Success Metrics\n- Metric one\n- Metric two\n\n## Notes\n...';
  bdy.appendChild(hint);
  bdy.appendChild(ta);

  var ftr = document.createElement('div');
  ftr.style.cssText = 'padding:1rem 1.5rem;border-top:1px solid var(--border);display:flex;justify-content:flex-end;gap:0.5rem;';
  var cancelBtn = document.createElement('button');
  cancelBtn.className = 'btn btn-secondary btn-sm';
  cancelBtn.textContent = 'Cancel';
  cancelBtn.addEventListener('click', function() { overlay.remove(); });
  var fillBtn = document.createElement('button');
  fillBtn.className = 'btn btn-primary btn-sm';
  fillBtn.textContent = 'Fill Fields';
  fillBtn.addEventListener('click', function() {
    var parsed = parseMarkdownUseCase(ta.value);
    if (!parsed) { alert('Could not parse input. Check the format and try again.'); return; }
    fillFormFromParsed(parsed);
    overlay.remove();
  });
  ftr.appendChild(cancelBtn);
  ftr.appendChild(fillBtn);

  box.appendChild(hdr);
  box.appendChild(bdy);
  box.appendChild(ftr);
  overlay.appendChild(box);
  overlay.addEventListener('click', function(e) { if (e.target === overlay) overlay.remove(); });
  document.body.appendChild(overlay);
  ta.focus();
}

function parseMarkdownUseCase(text) {
  text = (text || '').trim();
  if (!text) return null;

  var fm = {};
  var body = text;
  var fmMatch = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (fmMatch) {
    body = text.slice(fmMatch[0].length).trim();
    var lines = fmMatch[1].split('\n');
    var i = 0;
    while (i < lines.length) {
      var kv = lines[i].match(/^(\w+):\s*(.*)/);
      if (kv) {
        var key = kv[1];
        var val = kv[2].trim();
        if (val === '') {
          var arr = [];
          i++;
          while (i < lines.length && /^\s+-\s+/.test(lines[i])) {
            arr.push(lines[i].replace(/^\s+-\s+/, '').trim());
            i++;
          }
          fm[key] = arr;
          continue;
        } else if (/^\[.*\]$/.test(val)) {
          fm[key] = val.slice(1, -1).split(',').map(function(s) { return s.trim(); }).filter(Boolean);
        } else {
          fm[key] = val;
        }
      }
      i++;
    }
  }

  var sectionMap = {
    'pain point':       'painpoint',
    'description':      'description',
    'user story':       'userStory',
    'benchmarks':       'benchmarks',
    'success metrics':  'successMetrics',
    'notes':            'notes',
  };

  var sections = {};
  body.split(/^## /m).forEach(function(part) {
    if (!part.trim()) return;
    var nl = part.indexOf('\n');
    if (nl === -1) return;
    sections[part.slice(0, nl).trim().toLowerCase()] = part.slice(nl + 1).trim();
  });

  var result = {};
  ['title', 'type', 'status', 'department', 'stakeholders', 'repoUrl', 'appUrl'].forEach(function(k) {
    if (fm[k] !== undefined) result[k] = fm[k];
  });
  if (fm.impact !== undefined) result.impact = parseInt(fm.impact, 10);
  if (fm.effort !== undefined) result.effort = parseInt(fm.effort, 10);

  Object.keys(sectionMap).forEach(function(heading) {
    var field = sectionMap[heading];
    if (!sections[heading]) return;
    if (field === 'successMetrics') {
      result.successMetrics = sections[heading]
        .split('\n')
        .map(function(l) { return l.replace(/^[-*]\s*/, '').trim(); })
        .filter(Boolean);
    } else {
      result[field] = sections[heading];
    }
  });

  return result;
}

function fillFormFromParsed(data) {
  var form = document.getElementById('uc-form');
  if (!form) return;

  function setField(name, value) {
    var el = form.querySelector('[name="' + name + '"]');
    if (!el) return;
    if (el.tagName === 'SELECT') {
      for (var i = 0; i < el.options.length; i++) {
        if (el.options[i].value === value) { el.value = value; break; }
      }
    } else {
      el.value = value;
    }
    if (el.type === 'range') {
      var span = el.parentNode.querySelector('.range-val');
      if (span) span.textContent = value;
    }
  }

  if (data.title)          setField('title',          data.title);
  if (data.type)           setField('type',           data.type);
  if (data.status)         setField('status',         data.status);
  if (data.department)     setField('department',     data.department);
  if (data.stakeholders)   setField('stakeholders',   Array.isArray(data.stakeholders) ? data.stakeholders.join(', ') : data.stakeholders);
  if (data.impact)         setField('impact',         String(data.impact));
  if (data.effort)         setField('effort',         String(data.effort));
  if (data.painpoint)      setField('painpoint',      data.painpoint);
  if (data.description)    setField('description',    data.description);
  if (data.userStory)      setField('userStory',      data.userStory);
  if (data.benchmarks)     setField('benchmarks',     data.benchmarks);
  if (data.successMetrics) setField('successMetrics', Array.isArray(data.successMetrics) ? data.successMetrics.join('\n') : data.successMetrics);
  if (data.notes)          setField('notes',          data.notes);
  if (data.repoUrl)        setField('repoUrl',        data.repoUrl);
  if (data.appUrl)         setField('appUrl',         data.appUrl);
}

// ═══════════════════════════════════════════════════════════════
// TOOLTIP
// ═══════════════════════════════════════════════════════════════

function showTooltip(e, title, sub) {
  var tt = document.getElementById('tooltip');
  document.getElementById('tt-title').textContent = title;
  document.getElementById('tt-sub').textContent   = sub || '';
  tt.classList.add('show');
  moveTooltip(e);
}

function moveTooltip(e) {
  var tt  = document.getElementById('tooltip');
  var x   = e.clientX + 14;
  var y   = e.clientY - 10;
  var vw  = window.innerWidth;
  var vh  = window.innerHeight;
  tt.style.left = (x + 220 > vw ? x - 240 : x) + 'px';
  tt.style.top  = (y + 60  > vh ? y - 70  : y) + 'px';
}

function hideTooltip() {
  document.getElementById('tooltip').classList.remove('show');
}

// ═══════════════════════════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════════════════════════

function init() {
  loadData();
  document.getElementById('footer-date').textContent = today();
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modalState) closeModal();
  });
  renderOverview();
}

init();
