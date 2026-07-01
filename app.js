const API = 'https://api.ghalamchihashtgerd.ir'; // ساب‌دامین API (بک‌اند PHP)

/* ---------- تم‌ها ---------- */
const THEMES = [
  { id:'stadium',  name:'چمن',     dot:'#22c55e' },
  { id:'midnight', name:'نیمه‌شب', dot:'#38bdf8' },
  { id:'sunset',   name:'غروب',    dot:'#fb7185' },
  { id:'royal',    name:'سلطنتی',  dot:'#a78bfa' },
  { id:'light',    name:'روشن',    dot:'#0ea5e9' },
  { id:'coffee',   name:'قهوه',    dot:'#b07d56' },
];
function isThemeLocked(id){ return id === 'coffee' && !(ME && ME.username === 'SayeTheCat'); }
function applyTheme(id){ if (isThemeLocked(id)){ toast('این تم قفل است', false); return; } document.documentElement.setAttribute('data-theme', id); localStorage.setItem('theme', id); renderThemeSwitch(); }
function renderThemeSwitch(){
  const cur = document.documentElement.getAttribute('data-theme') || 'stadium';
  document.getElementById('theme-switch').innerHTML = THEMES.map(t => `<button class="swatch ${t.id===cur?'active':''} ${isThemeLocked(t.id)?'locked':''}" title="${t.name}${isThemeLocked(t.id)?' — قفل':''}" style="--dot:${t.dot}" onclick="applyTheme('${t.id}')">${isThemeLocked(t.id)?"<i class='bi bi-lock-fill'></i>":''}</button>`).join('');
}
function toggleMenu(which){ ['settings','profile'].forEach(id => { const el = document.getElementById('menu-' + id); if (el) el.classList.toggle('open', id === which ? !el.classList.contains('open') : false); }); }
function closeMenus(){ document.querySelectorAll('.popover.open').forEach(p => p.classList.remove('open')); }
document.addEventListener('click', (e) => { if (!e.target.closest('.menu-wrap')) closeMenus(); });

/* ---------- رقابت‌ها (بخش هشتم) ---------- */
const COMPETITIONS = [
  { code:'WC', name:'جام جهانی', icon:'bi-trophy-fill' },
  { code:'CL', name:'لیگ قهرمانان', icon:'bi-trophy' },
  { code:'PL', name:'لیگ برتر', icon:'bi-shield-fill' },
  { code:'PD', name:'لالیگا', icon:'bi-shield-shaded' },
];
let CURRENT_COMP = 'WC';
function renderCompBar(){ const bar = document.getElementById('comp-bar'); if (!bar) return; bar.innerHTML = COMPETITIONS.map(c => `<button class="comp-chip ${c.code===CURRENT_COMP?'active':''}" onclick="selectComp('${c.code}')"><i class="bi ${c.icon}"></i> ${c.name}</button>`).join(''); }
function selectComp(code){ CURRENT_COMP = code; renderCompBar(); loadMatches(); }

/* ---------- نام فارسی + پرچم کشورها ---------- */
const COUNTRIES = {
  'iran':{fa:'ایران',code:'ir'}, 'ir iran':{fa:'ایران',code:'ir'},
  'brazil':{fa:'برزیل',code:'br'}, 'argentina':{fa:'آرژانتین',code:'ar'},
  'france':{fa:'فرانسه',code:'fr'}, 'spain':{fa:'اسپانیا',code:'es'},
  'germany':{fa:'آلمان',code:'de'}, 'england':{fa:'انگلیس',code:'gb-eng'},
  'portugal':{fa:'پرتغال',code:'pt'}, 'netherlands':{fa:'هلند',code:'nl'},
  'belgium':{fa:'بلژیک',code:'be'}, 'italy':{fa:'ایتالیا',code:'it'},
  'croatia':{fa:'کرواسی',code:'hr'}, 'uruguay':{fa:'اروگوئه',code:'uy'},
  'usa':{fa:'آمریکا',code:'us'}, 'united states':{fa:'آمریکا',code:'us'},
  'mexico':{fa:'مکزیک',code:'mx'}, 'canada':{fa:'کانادا',code:'ca'},
  'japan':{fa:'ژاپن',code:'jp'},
  'korea republic':{fa:'کره جنوبی',code:'kr'}, 'south korea':{fa:'کره جنوبی',code:'kr'},
  'korea dpr':{fa:'کره شمالی',code:'kp'}, 'north korea':{fa:'کره شمالی',code:'kp'},
  'australia':{fa:'استرالیا',code:'au'}, 'saudi arabia':{fa:'عربستان',code:'sa'},
  'qatar':{fa:'قطر',code:'qa'}, 'morocco':{fa:'مراکش',code:'ma'},
  'senegal':{fa:'سنگال',code:'sn'}, 'ghana':{fa:'غنا',code:'gh'},
  'nigeria':{fa:'نیجریه',code:'ng'}, 'cameroon':{fa:'کامرون',code:'cm'},
  'egypt':{fa:'مصر',code:'eg'}, 'tunisia':{fa:'تونس',code:'tn'},
  'algeria':{fa:'الجزایر',code:'dz'},
  'ivory coast':{fa:'ساحل عاج',code:'ci'}, 'cote divoire':{fa:'ساحل عاج',code:'ci'},
  'switzerland':{fa:'سوئیس',code:'ch'}, 'denmark':{fa:'دانمارک',code:'dk'},
  'sweden':{fa:'سوئد',code:'se'}, 'poland':{fa:'لهستان',code:'pl'},
  'serbia':{fa:'صربستان',code:'rs'}, 'wales':{fa:'ولز',code:'gb-wls'},
  'scotland':{fa:'اسکاتلند',code:'gb-sct'}, 'austria':{fa:'اتریش',code:'at'},
  'turkey':{fa:'ترکیه',code:'tr'}, 'turkiye':{fa:'ترکیه',code:'tr'},
  'ukraine':{fa:'اوکراین',code:'ua'}, 'colombia':{fa:'کلمبیا',code:'co'},
  'ecuador':{fa:'اکوادور',code:'ec'}, 'peru':{fa:'پرو',code:'pe'},
  'chile':{fa:'شیلی',code:'cl'}, 'paraguay':{fa:'پاراگوئه',code:'py'},
  'costa rica':{fa:'کاستاریکا',code:'cr'}, 'panama':{fa:'پاناما',code:'pa'},
  'jamaica':{fa:'جامائیکا',code:'jm'}, 'new zealand':{fa:'نیوزیلند',code:'nz'},
  'south africa':{fa:'آفریقای جنوبی',code:'za'}, 'norway':{fa:'نروژ',code:'no'},
  'greece':{fa:'یونان',code:'gr'},
  'czech republic':{fa:'جمهوری چک',code:'cz'}, 'czechia':{fa:'جمهوری چک',code:'cz'},
  'romania':{fa:'رومانی',code:'ro'}, 'hungary':{fa:'مجارستان',code:'hu'},
  'uzbekistan':{fa:'ازبکستان',code:'uz'}, 'jordan':{fa:'اردن',code:'jo'},
  'iraq':{fa:'عراق',code:'iq'}, 'united arab emirates':{fa:'امارات',code:'ae'},
  'oman':{fa:'عمان',code:'om'}, 'bahrain':{fa:'بحرین',code:'bh'},
  'kuwait':{fa:'کویت',code:'kw'}, 'lebanon':{fa:'لبنان',code:'lb'},
  'syria':{fa:'سوریه',code:'sy'}, 'palestine':{fa:'فلسطین',code:'ps'},
  'yemen':{fa:'یمن',code:'ye'}, 'india':{fa:'هند',code:'in'},
  'china':{fa:'چین',code:'cn'}, 'china pr':{fa:'چین',code:'cn'},
  'thailand':{fa:'تایلند',code:'th'}, 'vietnam':{fa:'ویتنام',code:'vn'},
  'indonesia':{fa:'اندونزی',code:'id'}, 'malaysia':{fa:'مالزی',code:'my'},
  'philippines':{fa:'فیلیپین',code:'ph'}, 'tajikistan':{fa:'تاجیکستان',code:'tj'},
  'turkmenistan':{fa:'ترکمنستان',code:'tm'}, 'kyrgyzstan':{fa:'قرقیزستان',code:'kg'},
  'kazakhstan':{fa:'قزاقستان',code:'kz'}, 'afghanistan':{fa:'افغانستان',code:'af'},
  'cape verde':{fa:'کیپ‌ورد',code:'cv'}, 'cabo verde':{fa:'کیپ‌ورد',code:'cv'},
  'dr congo':{fa:'کنگو دموکراتیک',code:'cd'}, 'congo dr':{fa:'کنگو دموکراتیک',code:'cd'},
  'congo':{fa:'کنگو',code:'cg'}, 'haiti':{fa:'هائیتی',code:'ht'},
  'mali':{fa:'مالی',code:'ml'}, 'burkina faso':{fa:'بورکینافاسو',code:'bf'},
  'honduras':{fa:'هندوراس',code:'hn'}, 'venezuela':{fa:'ونزوئلا',code:'ve'},
  'bolivia':{fa:'بولیوی',code:'bo'}, 'guatemala':{fa:'گواتمالا',code:'gt'},
  'el salvador':{fa:'السالوادور',code:'sv'}, 'trinidad and tobago':{fa:'ترینیداد و توباگو',code:'tt'},
  'suriname':{fa:'سورینام',code:'sr'}, 'curacao':{fa:'کوراسائو',code:'cw'},
  'angola':{fa:'آنگولا',code:'ao'}, 'zambia':{fa:'زامبیا',code:'zm'},
  'gabon':{fa:'گابن',code:'ga'}, 'equatorial guinea':{fa:'گینهٔ استوایی',code:'gq'},
  'benin':{fa:'بنین',code:'bj'}, 'namibia':{fa:'نامیبیا',code:'na'},
  'mozambique':{fa:'موزامبیک',code:'mz'}, 'madagascar':{fa:'ماداگاسکار',code:'mg'},
  'kenya':{fa:'کنیا',code:'ke'}, 'uganda':{fa:'اوگاندا',code:'ug'},
  'tanzania':{fa:'تانزانیا',code:'tz'}, 'guinea':{fa:'گینه',code:'gn'},
  'guinea-bissau':{fa:'گینهٔ بیسائو',code:'gw'}, 'guinea bissau':{fa:'گینهٔ بیسائو',code:'gw'},
  'mauritania':{fa:'موریتانی',code:'mr'}, 'gambia':{fa:'گامبیا',code:'gm'},
  'togo':{fa:'توگو',code:'tg'}, 'libya':{fa:'لیبی',code:'ly'},
  'sudan':{fa:'سودان',code:'sd'}, 'ethiopia':{fa:'اتیوپی',code:'et'},
  'zimbabwe':{fa:'زیمبابوه',code:'zw'}, 'niger':{fa:'نیجر',code:'ne'},
  'sierra leone':{fa:'سیرالئون',code:'sl'}, 'rwanda':{fa:'رواندا',code:'rw'},
  'malawi':{fa:'مالاوی',code:'mw'}, 'comoros':{fa:'کومور',code:'km'},
  'russia':{fa:'روسیه',code:'ru'}, 'finland':{fa:'فنلاند',code:'fi'},
  'ireland':{fa:'ایرلند',code:'ie'}, 'republic of ireland':{fa:'ایرلند',code:'ie'},
  'northern ireland':{fa:'ایرلند شمالی',code:'gb-nir'}, 'iceland':{fa:'ایسلند',code:'is'},
  'slovakia':{fa:'اسلواکی',code:'sk'}, 'slovenia':{fa:'اسلوونی',code:'si'},
  'bulgaria':{fa:'بلغارستان',code:'bg'}, 'bosnia and herzegovina':{fa:'بوسنی و هرزگوین',code:'ba'},
  'bosnia herzegovina':{fa:'بوسنی و هرزگوین',code:'ba'}, 'bosnia':{fa:'بوسنی و هرزگوین',code:'ba'}, 'cape verde islands':{fa:'کیپ‌ورد',code:'cv'},
  'north macedonia':{fa:'مقدونیهٔ شمالی',code:'mk'}, 'montenegro':{fa:'مونته‌نگرو',code:'me'},
  'albania':{fa:'آلبانی',code:'al'}, 'kosovo':{fa:'کوزوو',code:'xk'},
  'georgia':{fa:'گرجستان',code:'ge'}, 'armenia':{fa:'ارمنستان',code:'am'},
  'azerbaijan':{fa:'آذربایجان',code:'az'}, 'belarus':{fa:'بلاروس',code:'by'},
  'moldova':{fa:'مولداوی',code:'md'}, 'estonia':{fa:'استونی',code:'ee'},
  'latvia':{fa:'لتونی',code:'lv'}, 'lithuania':{fa:'لیتوانی',code:'lt'},
  'luxembourg':{fa:'لوکزامبورگ',code:'lu'}, 'cyprus':{fa:'قبرس',code:'cy'},
  'israel':{fa:'اسرائیل',code:'il'},
  'fiji':{fa:'فیجی',code:'fj'}, 'solomon islands':{fa:'جزایر سلیمان',code:'sb'},
  'vanuatu':{fa:'وانواتو',code:'vu'}, 'papua new guinea':{fa:'پاپوآ گینهٔ نو',code:'pg'},
  'tahiti':{fa:'تاهیتی',code:'pf'}, 'new caledonia':{fa:'کالدونیای جدید',code:'nc'},
};
function norm(s){ return (s||'').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/\(.*?\)/g,'').replace(/[^a-z ]/g,'').replace(/\s+/g,' ').trim(); }
function findCountry(name){
  const n = norm(name);
  if (COUNTRIES[n]) return COUNTRIES[n];
  const n2 = n.replace(/\band\b/g,' ').replace(/\s+/g,' ').trim();
  return COUNTRIES[n2] || null;
}
function team(name, crest){
  const c = findCountry(name);
  const label = c ? c.fa : (name || '؟');
  let flag;
  if (crest) flag = `<img class="flag" loading="lazy" src="${crest}" alt="">`;            // پرچم مستقیم از API (مطمئن‌ترین)
  else if (c) flag = `<img class="flag" loading="lazy" src="https://flagcdn.com/w40/${c.code}.png" srcset="https://flagcdn.com/w80/${c.code}.png 2x" alt="">`; // جایگزین
  else flag = `<span class="flag flag-unknown"><i class="bi bi-flag"></i></span>`;
  return `<span class="team">${flag}<span class="team-name">${label}</span></span>`;
}
function teamFa(name){ const c = findCountry(name); return c ? c.fa : (name || '؟'); }

/* ---------- نام فارسی مراحل ---------- */
const STAGE_FA = { group:'مرحلهٔ گروهی', r32:'مرحلهٔ ۳۲ تیمی', r16:'یک‌هشتم نهایی', qf:'یک‌چهارم نهایی', sf:'نیمه‌نهایی', third:'ردهٔ سوم', final:'فینال' };

/* ---------- ابزار ---------- */
const opts = (m, b) => ({ method:m, credentials:'include', headers:{ 'Content-Type':'application/json' }, body: b ? JSON.stringify(b) : undefined });
const FA_DIGITS = '۰۱۲۳۴۵۶۷۸۹';
function faNum(n){ return String(n ?? '').replace(/\d/g, d => FA_DIGITS[d]); }
function toast(msg, ok=true){
  const el = document.getElementById('toast');
  el.innerHTML = `<i class="bi ${ok ? 'bi-check-circle-fill' : 'bi-exclamation-triangle-fill'}"></i><span>${msg}</span>`;
  el.className = 'toast show ' + (ok ? 'ok' : 'err');
  setTimeout(() => el.className = 'toast', 2600);
}
function fmtDate(s){
  const d = new Date((s||'').replace(' ','T'));
  if (isNaN(d)) return '';
  try { return d.toLocaleDateString('fa-IR',{month:'long',day:'numeric'}) + ' • ' + d.toLocaleTimeString('fa-IR',{hour:'2-digit',minute:'2-digit'}); }
  catch(e){ return s; }
}

/* ---------- احراز هویت ---------- */
async function login(){
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;
  const err = document.getElementById('login-error'); err.textContent = '';
  try {
    const r = await fetch(`${API}/auth.php?action=login`, opts('POST', { username, password }));
    if (r.ok) { await init(); } else { err.textContent = 'نام کاربری یا رمز اشتباه است'; }
  } catch(e){ err.textContent = 'خطا در اتصال به سرور'; }
}
async function logout(){ await fetch(`${API}/auth.php?action=logout`, opts('GET')); location.reload(); }
function showAuth(which){
  ['login','register','forgot'].forEach(v => { const el = document.getElementById('auth-'+v); if (el) el.style.display = (v===which)?'block':'none'; });
  if (which === 'register') loadChallenge();
}
async function register(){
  const username = document.getElementById('reg-username').value.trim();
  const email = document.getElementById('reg-email').value.trim();
  const password = document.getElementById('reg-password').value;
  const nickname = document.getElementById('reg-nickname').value; // هانی‌پات (باید خالی بماند)
  const captcha = document.getElementById('reg-captcha').value;
  const tEl = document.querySelector('[name="cf-turnstile-response"]');
  const turnstile = tEl ? tEl.value : '';
  const err = document.getElementById('reg-error'); err.textContent = '';
  if (username.length < 3 || password.length < 4 || !email.includes('@')){ err.textContent = 'نام کاربری ۳+، رمز ۴+ و ایمیل معتبر لازم است'; return; }
  if (captcha === ''){ err.textContent = 'پاسخ سؤال ریاضی را وارد کن'; return; }
  try {
    const r = await fetch(`${API}/auth.php?action=register`, opts('POST', { username, email, password, nickname, captcha:+captcha, turnstile }));
    if (r.ok){ await init(); }
    else { const e = await r.json().catch(()=>({})); err.textContent = e.error === 'already_exists' ? 'این نام کاربری یا ایمیل قبلاً ثبت شده' : (e.error === 'captcha_failed' ? 'پاسخ سؤال اشتباه است، دوباره تلاش کن' : (e.error === 'bot_detected' ? 'ثبت‌نام مشکوک رد شد' : 'اطلاعات نامعتبر است')); loadChallenge(); }
  } catch(e){ err.textContent = 'خطا در اتصال به سرور'; }
}
async function loadChallenge(){
  try {
    const c = await (await fetch(`${API}/auth.php?action=challenge`, opts('GET'))).json();
    const q = document.getElementById('captcha-q'); if (q) q.textContent = `${faNum(c.a)} + ${faNum(c.b)} = ؟`;
    const inp = document.getElementById('reg-captcha'); if (inp) inp.value = '';
  } catch(e){}
}
async function forgot(){
  const email = document.getElementById('forgot-email').value.trim();
  const msg = document.getElementById('forgot-msg'); msg.style.color = ''; msg.textContent = '';
  if (!email.includes('@')){ msg.textContent = 'ایمیل معتبر وارد کن'; return; }
  try {
    await fetch(`${API}/auth.php?action=forgot`, opts('POST', { email }));
    msg.style.color = 'var(--accent)'; msg.textContent = 'اگر این ایمیل ثبت شده باشد، رمز جدید ارسال شد. ایمیلت را چک کن.'; }
  catch(e){ msg.textContent = 'خطا در اتصال به سرور'; }
}

/* ---------- نمایش ---------- */
let ME = null;
async function init(){
  let me;
  try { me = await (await fetch(`${API}/auth.php?action=me`, opts('GET'))).json(); } catch(e){ return; }
  if (!me.logged_in){ showLogin(); return; }
  ME = me;
  document.getElementById('login-view').style.display = 'none';
  document.getElementById('app-view').style.display = 'block';
  document.getElementById('profile-wrap').style.display = 'block';
  document.getElementById('who').textContent = me.username;
  renderMyAvatar();
  document.getElementById('main-tabs').style.display = 'flex';
  if (document.documentElement.getAttribute('data-theme') === 'coffee' && me.username !== 'SayeTheCat') applyTheme('stadium'); else renderThemeSwitch();
  renderCompBar();
  loadMatches(true); loadLeaderboard();
}
function renderMyAvatar(){ if (!ME) return; renderAvatar(document.getElementById('chip-avatar'), ME.avatar); renderAvatar(document.getElementById('chip-avatar-lg'), ME.avatar); }
function renderAvatar(el, avatar){
  if (!el) return;
  if (avatar && /^https?:\/\//.test(avatar)) el.innerHTML = `<img src="${avatar}" alt="">`;
  else el.innerHTML = `<i class="bi ${avatar && avatar.indexOf('bi-') === 0 ? avatar : 'bi-person-fill'}"></i>`;
}
function showLogin(){
  document.getElementById('login-view').style.display = 'flex';
  document.getElementById('app-view').style.display = 'none';
  document.getElementById('profile-wrap').style.display = 'none';
  document.getElementById('main-tabs').style.display = 'none';
  closeMenus();
  showAuth('login');
}
function switchTab(name){
  document.querySelectorAll('.tab').forEach(t => t.classList.toggle('active', t.dataset.tab === name));
  ['matches','tournament','stats','leaderboard','profile'].forEach(n => {
    const el = document.getElementById('tab-' + n); if (el) el.style.display = (n === name) ? 'block' : 'none';
  });
  if (name === 'tournament') loadTournament();
  if (name === 'stats') loadStats();
  if (name === 'profile') loadProfile();
}

async function loadMatches(autoScroll=false){
  const box = document.getElementById('matches');
  box.innerHTML = '<div class="skeleton"></div><div class="skeleton"></div><div class="skeleton"></div>';
  const data = await (await fetch(`${API}/matches.php?competition=${CURRENT_COMP}`, opts('GET'))).json();
  const now = new Date((data.now||'').replace(' ','T'));
  if (!data.matches || !data.matches.length){ box.innerHTML = '<p class="muted center">هنوز بازی‌ای ثبت نشده.</p>'; return; }
  box.innerHTML = data.matches.map(m => {
    const locked = new Date((m.start_time||'').replace(' ','T')) <= now;
    const finished = m.status === 'FINISHED';
    const stageFa = STAGE_FA[m.stage] || m.stage;
    const isKO = m.stage !== 'group';
    const homeFa = teamFa(m.home_team), awayFa = teamFa(m.away_team);
    const koInputs = (isKO && !finished && !locked) ? `<div class="ko-pred" id="kopred-${m.id}" style="display:none"><div class="ko-hint">چون ۹۰′ را مساوی زدی، نتیجهٔ ۱۲۰′ (با وقت اضافه) را هم پیش‌بینی کن 👇</div><div class="ko-row"><span class="ko-label">نتیجهٔ ۱۲۰′</span><span class="ko-score"><input type="number" min="0" id="h120-${m.id}" placeholder="-" value="${m.pred_home_120 ?? ''}" oninput="koToggle(${m.id})"><span class="dash">−</span><input type="number" min="0" id="a120-${m.id}" placeholder="-" value="${m.pred_away_120 ?? ''}" oninput="koToggle(${m.id})"></span></div><div class="ko-row" id="korowpen-${m.id}" style="display:none"><span class="ko-label">نتیجهٔ پنالتی</span><span class="ko-score"><input type="number" min="0" id="penh-${m.id}" placeholder="-" value="${m.pred_pen_home ?? ''}"><span class="dash">−</span><input type="number" min="0" id="pena-${m.id}" placeholder="-" value="${m.pred_pen_away ?? ''}"></span></div></div>` : '';
    const hasPred = m.pred_home_90 !== null && m.pred_home_90 !== undefined;
    let myPred = '';
    if (hasPred) {
      let cls = 'pred-pending';
      if (finished) {
        const exact = (+m.pred_home_90 === +m.home_score_90 && +m.pred_away_90 === +m.away_score_90);
        const okResult = Math.sign(m.pred_home_90 - m.pred_away_90) === Math.sign(m.home_score_90 - m.away_score_90);
        cls = exact ? 'pred-exact' : (okResult ? 'pred-result' : 'pred-wrong');
      }
      myPred = `<div class="my-pred ${cls}"><span class="my-pred-label">پیش‌بینی تو</span><b>${faNum(m.pred_home_90)} − ${faNum(m.pred_away_90)}</b></div>`;
    }
    return `<div class="card match ${locked?'locked':''}" id="match-${m.id}">
      <div class="match-head">
        <span class="badge">${stageFa}</span>
        <span class="badge badge-x">×${faNum(m.multiplier)}</span>
        <span class="match-time">${fmtDate(m.start_time)}</span>
      </div>
      <div class="match-body">
        <div class="side">${team(m.home_team, m.home_crest)}</div>
        <div class="vs">
          ${finished
            ? `<span class="score-final">${faNum(m.home_score_90)} − ${faNum(m.away_score_90)}</span>`
            : `<input type="number" min="0" inputmode="numeric" id="h-${m.id}" ${locked?'disabled':''} placeholder="-" value="${m.pred_home_90 ?? ''}" oninput="koToggle(${m.id})"><span class="dash">−</span><input type="number" min="0" inputmode="numeric" id="a-${m.id}" ${locked?'disabled':''} placeholder="-" value="${m.pred_away_90 ?? ''}" oninput="koToggle(${m.id})">`}
        </div>
        <div class="side side-away">${team(m.away_team, m.away_crest)}</div>
      </div>
      ${koInputs}
      ${myPred}
      <div class="match-foot">
        ${finished ? '<span class="tag tag-done">پایان‌یافته</span>' : locked ? '<span class="tag tag-locked"><i class="bi bi-lock-fill"></i> مهلت تمام شد</span>' : `<button class="btn-primary btn-sm" onclick="predict(${m.id})">ثبت پیش‌بینی</button>`}
      </div>
    </div>`;
  }).join('');
  data.matches.forEach(m => { if (m.stage !== 'group' && m.status !== 'FINISHED') koToggle(m.id); });
  if (autoScroll) scrollToNextMatch(data.matches, now);
}

// بعد از لاگین، خودکار به نزدیک‌ترین بازیِ پیش‌رو (شروع‌نشده) اسکرول می‌کند
function scrollToNextMatch(matches, now){
  let next = matches.find(m => m.status !== 'FINISHED' && new Date((m.start_time||'').replace(' ','T')) > now);
  if (!next) next = matches.find(m => m.status !== 'FINISHED');
  if (!next) return;
  const el = document.getElementById('match-' + next.id);
  if (el) setTimeout(() => el.scrollIntoView({ behavior:'smooth', block:'center' }), 350);
}

// نمایش شرطی ورودی‌های مرحلهٔ حذفی: ۱۲۰′ فقط اگر ۹۰′ مساوی باشد، پنالتی فقط اگر ۱۲۰′ هم مساوی باشد
function koToggle(id){
  const box = document.getElementById('kopred-' + id);
  if (!box) return;
  const he = document.getElementById('h-' + id), ae = document.getElementById('a-' + id);
  const h = he ? he.value : '', a = ae ? ae.value : '';
  const isDraw90 = h !== '' && a !== '' && +h === +a;
  box.style.display = isDraw90 ? 'flex' : 'none';
  const penRow = document.getElementById('korowpen-' + id);
  if (!penRow) return;
  if (!isDraw90) { penRow.style.display = 'none'; return; }
  const h120 = (document.getElementById('h120-' + id) || {}).value || '';
  const a120 = (document.getElementById('a120-' + id) || {}).value || '';
  penRow.style.display = (h120 !== '' && a120 !== '' && +h120 === +a120) ? 'flex' : 'none';
}

async function predict(id){
  const h = document.getElementById(`h-${id}`).value;
  const a = document.getElementById(`a-${id}`).value;
  if (h === '' || a === ''){ toast('نتیجهٔ ۹۰ دقیقه را وارد کن', false); return; }
  const body = { match_id:id, pred_home_90:+h, pred_away_90:+a };
  // ۱۲۰′ و پنالتی فقط وقتی معنا دارند که کاربر ۹۰′ (و سپس ۱۲۰′) را مساوی زده باشد
  if (+h === +a){
    const e120h = document.getElementById(`h120-${id}`), e120a = document.getElementById(`a120-${id}`);
    if (e120h && e120a && e120h.value !== '' && e120a.value !== ''){
      body.pred_home_120 = +e120h.value; body.pred_away_120 = +e120a.value;
      if (+e120h.value === +e120a.value){
        const epenh = document.getElementById(`penh-${id}`), epena = document.getElementById(`pena-${id}`);
        if (epenh && epena && epenh.value !== '' && epena.value !== ''){ body.pred_pen_home = +epenh.value; body.pred_pen_away = +epena.value; }
      }
    }
  }
  const r = await fetch(`${API}/predict.php`, opts('POST', body));
  if (r.ok){ toast('پیش‌بینی ثبت شد'); loadLeaderboard(); }
  else {
    const e = await r.json().catch(()=>({}));
    toast(e.error === 'deadline_passed' ? 'مهلت این بازی تمام شده' : 'خطا در ثبت', false);
  }
}

async function loadLeaderboard(){
  const box = document.getElementById('leaderboard');
  box.innerHTML = '<div class="skeleton"></div>';
  const data = await (await fetch(`${API}/leaderboard.php`, opts('GET'))).json();
  const rows = data.leaderboard || [];
  const medals = ['<i class="bi bi-trophy-fill" style="color:#ffd700"></i>','<i class="bi bi-award-fill" style="color:#c0c0c0"></i>','<i class="bi bi-award-fill" style="color:#cd7f32"></i>'];
  const head = '<div class="lb-row lb-head"><span>رتبه</span><span>کاربر</span><span>امتیاز</span><span>دقیق</span></div>';
  const body = rows.map((r,i) => `<div class="lb-row ${i<3?'top':''}"><span class="rank">${medals[i] || (i+1)}</span><span class="lb-user">${r.username}</span><span class="pts">${(+r.total_points).toLocaleString('fa-IR')}</span><span class="exact">${(+r.exact_count).toLocaleString('fa-IR')}</span></div>`).join('');
  box.innerHTML = `<div class="card lb">${head}${body}</div>`;
}

/* ---------- پیش‌بینی قهرمانی تورنمنت ---------- */
let TOURNEY_TEAMS = [];
async function loadTournament(){
  const box = document.getElementById('tournament');
  box.innerHTML = '<div class="skeleton"></div>';
  const d = await (await fetch(`${API}/tournament.php`, opts('GET'))).json();
  TOURNEY_TEAMS = d.teams || [];
  const p = d.prediction || {};
  const locked = !!d.locked;
  const teamOpts = (sel) => '<option value="">— انتخاب کن —</option>' +
    TOURNEY_TEAMS.map(t => `<option value="${t}" ${sel===t?'selected':''}>${teamFa(t)}</option>`).join('');
  const dl = d.deadline ? fmtDate(d.deadline) : 'شروع مرحلهٔ حذفی';
  const slots = [
    { key:'champion', icon:'<i class="bi bi-trophy-fill" style="color:#ffd700"></i>', label:'قهرمان',      pts:'۵۰' },
    { key:'runnerup', icon:'<i class="bi bi-award-fill" style="color:#c0c0c0"></i>', label:'نایب‌قهرمان', pts:'۲۵' },
    { key:'third',    icon:'<i class="bi bi-award-fill" style="color:#cd7f32"></i>', label:'تیم سوم',     pts:'۱۵' },
  ];
  box.innerHTML = '<div class="card tourney"><div class="tourney-head"><h2><i class="bi bi-trophy"></i> پیش‌بینی قهرمانی</h2><p class="muted">سه تیم برتر جام جهانی را حدس بزن — فقط جایگاه دقیق امتیاز می‌گیرد.</p>' + (locked ? `<div class="tourney-lock"><i class="bi bi-lock-fill"></i> مهلت ثبت تمام شده (${dl})</div>` : `<div class="tourney-deadline"><i class="bi bi-hourglass-split"></i> مهلت ثبت: تا ${dl}</div>`) + '</div>' + ((p.points != null && +p.points > 0) ? `<div class="tourney-points">امتیاز قهرمانی تو: <b>${faNum(p.points)}</b></div>` : '') + '<div class="tourney-slots">' + slots.map(s => `<div class="tourney-slot"><div class="slot-rank">${s.icon} ${s.label}<span class="slot-pts">${s.pts} امتیاز</span></div><select id="tp-${s.key}" class="ko-select" ${locked?'disabled':''}>${teamOpts(p[s.key])}</select></div>`).join('') + '</div>' + (locked ? '' : '<button class="btn-primary btn-block" onclick="saveTournament()"><i class="bi bi-save"></i> ثبت پیش‌بینی قهرمانی</button>') + '</div>';
}
async function saveTournament(){
  const champion = document.getElementById('tp-champion').value;
  const runnerup = document.getElementById('tp-runnerup').value;
  const third    = document.getElementById('tp-third').value;
  if (!champion || !runnerup || !third){ toast('هر سه جایگاه را انتخاب کن', false); return; }
  if (new Set([champion, runnerup, third]).size < 3){ toast('سه تیم باید متفاوت باشند', false); return; }
  const r = await fetch(`${API}/tournament.php`, opts('POST', { champion, runnerup, third }));
  if (r.ok){ toast('پیش‌بینی قهرمانی ثبت شد'); }
  else {
    const e = await r.json().catch(()=>({}));
    toast(e.error === 'deadline_passed' ? 'مهلت ثبت قهرمانی تمام شده' : 'خطا در ثبت', false);
  }
}

/* ---------- آمار شخصی + تاریخچه ---------- */
let STATS_TARGET = null; // null = آمار خودم؛ در غیر این صورت user_id کاربر انتخاب‌شده
function viewStats(id){ STATS_TARGET = id ? +id : null; loadStats(); }
async function loadStats(){
  const box = document.getElementById('stats');
  box.innerHTML = '<div class="skeleton"></div>';
  const d = await (await fetch(`${API}/stats.php` + (STATS_TARGET ? `?user_id=${STATS_TARGET}` : ''), opts('GET'))).json();
  const s = d.stats || {}, hist = d.history || [];
  const scored = s.scored_preds || 0;
  const wrong = Math.max(0, scored - (s.exact_count||0) - (s.result_count||0));
  const pct = (n) => scored ? Math.round(n / scored * 100) : 0;
  const acc = pct((s.exact_count||0) + (s.result_count||0));
  const cards = [
    { label:'امتیاز کل',     val:faNum(s.total_points), cls:'stat-primary' },
    { label:'پیش‌بینی دقیق', val:faNum(s.exact_count),  cls:'' },
    { label:'نتیجهٔ درست',   val:faNum(s.result_count), cls:'' },
    { label:'دقت کلی',       val:faNum(acc)+'٪',        cls:'' },
  ];
  const bar = (label, n, cls) => `<div class="bar-row"><span class="bar-label">${label}</span><div class="bar-track"><div class="bar-fill ${cls}" style="width:${pct(n)}%"></div></div><span class="bar-val">${faNum(n)} (${faNum(pct(n))}٪)</span></div>`;
  const t = d.tournament || {};
  const tourneyCard = (t.champion || t.runnerup || t.third)
    ? '<div class="card tourney-picks"><h3><i class="bi bi-trophy"></i> پیش‌بینی سه تیم برتر این کاربر</h3><div class="tp-list">'
      + `<div class="tp-item"><span class="tp-rank"><i class="bi bi-trophy-fill" style="color:#ffd700"></i> قهرمان</span><b>${t.champion ? teamFa(t.champion) : '—'}</b></div>`
      + `<div class="tp-item"><span class="tp-rank"><i class="bi bi-award-fill" style="color:#c0c0c0"></i> نایب‌قهرمان</span><b>${t.runnerup ? teamFa(t.runnerup) : '—'}</b></div>`
      + `<div class="tp-item"><span class="tp-rank"><i class="bi bi-award-fill" style="color:#cd7f32"></i> تیم سوم</span><b>${t.third ? teamFa(t.third) : '—'}</b></div>`
      + '</div></div>'
    : '';
  const rows = hist.map(h => {
    const fin = h.status === 'FINISHED';
    let cls = 'pred-pending', mark = '<i class="bi bi-hourglass-split"></i>';
    if (fin){
      const exact = (+h.pred_home_90===+h.home_score_90 && +h.pred_away_90===+h.away_score_90);
      const okRes = Math.sign(h.pred_home_90-h.pred_away_90)===Math.sign(h.home_score_90-h.away_score_90);
      cls = exact ? 'pred-exact' : (okRes ? 'pred-result' : 'pred-wrong');
      mark = exact ? '<i class="bi bi-bullseye"></i>' : (okRes ? '<i class="bi bi-check-lg"></i>' : '<i class="bi bi-x-lg"></i>');
    }
    let predExtra = '';
    if (h.pred_home_120 !== null && h.pred_home_120 !== undefined && h.pred_away_120 !== null && h.pred_away_120 !== undefined) predExtra += ` <span class="hist-x">۱۲۰′ ${faNum(h.pred_home_120)}−${faNum(h.pred_away_120)}</span>`;
    if (h.pred_pen_home !== null && h.pred_pen_home !== undefined && h.pred_pen_away !== null && h.pred_pen_away !== undefined) predExtra += ` <span class="hist-x">پنالتی ${faNum(h.pred_pen_home)}−${faNum(h.pred_pen_away)}</span>`;
    let actual = '—';
    if (fin){
      actual = `واقعی ${faNum(h.home_score_90)}−${faNum(h.away_score_90)}`;
      if (+h.went_to_et === 1) actual += ` <span class="hist-x">۱۲۰′ ${faNum(h.home_score_120)}−${faNum(h.away_score_120)}</span>`;
      if (+h.went_to_pens === 1) actual += ` <span class="hist-x">پنالتی ${faNum(h.pen_home)}−${faNum(h.pen_away)}</span>`;
    }
    return `<div class="hist-row ${cls}"><span class="hist-stage">${STAGE_FA[h.stage]||h.stage}</span><span class="hist-teams">${teamFa(h.home_team)} <b>${faNum(h.pred_home_90)}−${faNum(h.pred_away_90)}</b> ${teamFa(h.away_team)}${predExtra}</span><span class="hist-actual">${actual}</span><span class="hist-mark">${mark}</span><span class="hist-pts">${fin ? '+'+faNum(h.points) : ''}</span></div>`;
  }).join('');
  const users = d.users || [];
  const picker = '<div class="stats-picker"><label><i class="bi bi-bar-chart-fill"></i> آمار: </label><select class="ko-select" onchange="viewStats(this.value)">' + users.map(u => `<option value="${u.id}" ${(+u.id===+d.viewing)?'selected':''}>${u.username}${(+u.id===+d.viewing && d.is_self)?' (خودم)':''}</option>`).join('') + '</select></div>';
  box.innerHTML = picker + '<div class="stats-cards">' + cards.map(c => `<div class="card stat-card ${c.cls}"><div class="stat-val">${c.val}</div><div class="stat-label">${c.label}</div></div>`).join('') + '</div><div class="card stat-chart"><h3>تفکیک ' + faNum(scored) + ' پیش‌بینی امتیازخورده</h3>' + bar('<i class="bi bi-bullseye"></i> دقیق', s.exact_count||0, 'bar-exact') + bar('<i class="bi bi-check-lg"></i> نتیجهٔ درست', s.result_count||0, 'bar-result') + bar('<i class="bi bi-x-lg"></i> اشتباه', wrong, 'bar-wrong') + '</div>' + tourneyCard + '<div class="card hist"><h3>تاریخچهٔ پیش‌بینی‌ها (' + faNum(hist.length) + ')</h3>' + (hist.length ? rows : '<p class="muted center">هنوز پیش‌بینی‌ای ثبت نکرده‌ای.</p>') + '</div>';
}

/* ---------- پروفایل ---------- */
const AVATARS = ['bi-person-fill','bi-emoji-smile-fill','bi-trophy-fill','bi-star-fill','bi-fire','bi-lightning-charge-fill','bi-heart-fill','bi-shield-fill','bi-rocket-takeoff-fill','bi-controller','bi-music-note-beamed','bi-camera-fill','bi-bug-fill','bi-balloon-fill','bi-gem'];
let PROFILE_AVATAR = '';
async function loadProfile(){
  const box = document.getElementById('profile');
  box.innerHTML = '<div class="skeleton"></div>';
  const d = await (await fetch(`${API}/profile.php`, opts('GET'))).json();
  const p = d.profile || {};
  PROFILE_AVATAR = p.avatar || '';
  const grid = AVATARS.map(a => `<button type="button" class="ava-opt ${a===PROFILE_AVATAR?'active':''}" data-val="${a}" onclick="pickAvatar('${a}')"><i class="bi ${a}"></i></button>`).join('');
  box.innerHTML = '<div class="card profile"><i class="bi bi-person-gear profile-corner"></i><div class="profile-head"><div class="profile-ava" id="profile-ava"></div><div><h2>' + (p.username||'') + '</h2><p class="muted">پروفایل خود را شخصی‌سازی کن</p></div></div>' + '<label class="fld-label">آواتار</label><div class="ava-grid">' + grid + '</div>' + '<label class="fld-label">یا آدرس تصویر دلخواه (URL)</label><div class="field"><input id="pf-avatar-url" placeholder="https://..." value="' + (/^https?:\/\//.test(PROFILE_AVATAR)?PROFILE_AVATAR:'') + '" oninput="pickAvatar(this.value)"></div>' + '<label class="fld-label">ایمیل</label><div class="field"><input id="pf-email" type="email" placeholder="ایمیل" value="' + (p.email||'') + '"></div>' + '<label class="fld-label">رمز عبور جدید (اختیاری)</label><div class="field"><input id="pf-password" type="password" placeholder="برای تغییر، رمز جدید را وارد کن" autocomplete="new-password"></div>' + '<button class="btn-primary btn-block" onclick="saveProfile()"><i class="bi bi-save"></i> ذخیرهٔ تغییرات</button><p id="pf-msg" class="error-text"></p></div>';
  renderAvatar(document.getElementById('profile-ava'), PROFILE_AVATAR);
}
function pickAvatar(val){
  PROFILE_AVATAR = val;
  renderAvatar(document.getElementById('profile-ava'), val);
  document.querySelectorAll('.ava-opt').forEach(b => b.classList.toggle('active', b.dataset.val === val));
}
async function saveProfile(){
  const email = document.getElementById('pf-email').value.trim();
  const password = document.getElementById('pf-password').value;
  const msg = document.getElementById('pf-msg'); msg.style.color = ''; msg.textContent = '';
  const body = { email, avatar: PROFILE_AVATAR };
  if (password) body.password = password;
  const r = await fetch(`${API}/profile.php`, opts('POST', body));
  if (r.ok){ msg.style.color = 'var(--accent)'; msg.textContent = 'ذخیره شد'; if (ME){ ME.avatar = PROFILE_AVATAR; ME.email = email; } renderMyAvatar(); toast('پروفایل به‌روزرسانی شد'); }
  else { const e = await r.json().catch(()=>({})); msg.textContent = e.error === 'email_taken' ? 'این ایمیل قبلاً استفاده شده' : (e.error === 'invalid_email' ? 'ایمیل نامعتبر است' : 'خطا در ذخیره'); }
}

/* ---------- دکمهٔ بالا رفتن ---------- */
function goTop(){ window.scrollTo({ top:0, behavior:'smooth' }); }
window.addEventListener('scroll', () => {
  const tt = document.getElementById('to-top'); if (tt) tt.classList.toggle('show', window.scrollY > 200);
  const sh = document.getElementById('site-header'); if (sh) sh.classList.toggle('scrolled', window.scrollY > 10);
});

/* ---------- موزیک‌پلیر ---------- */
const DEFAULT_TRACK = ''; // آدرس فایل صوتی پیش‌فرض (سرود جام جهانی ۲۰۲۶) را اینجا بگذار؛ مثلاً 'anthem.mp3' کنار index.html یا یک URL کامل
const DEFAULT_TRACK_NAME = 'سرود جام جهانی ۲۰۲۶';
function mpAudio(){ return document.getElementById('mp-audio'); }
function toggleMusic(){ document.getElementById('music-player').classList.toggle('open'); }
function mpSetIcon(playing){ const b = document.getElementById('mp-play'); if (b) b.innerHTML = playing ? "<i class='bi bi-pause-fill'></i>" : "<i class='bi bi-play-fill'></i>"; }
function mpPlayPause(){ const a = mpAudio(); if (!a.src){ toast('اول یک موسیقی انتخاب کن', false); return; } if (a.paused) a.play().catch(() => toast('مرورگر اجازهٔ پخش نداد', false)); else a.pause(); }
function mpVolume(v){ mpAudio().volume = +v; }
function mpLoadLocal(e){ const f = e.target.files && e.target.files[0]; if (!f) return; const a = mpAudio(); a.src = URL.createObjectURL(f); document.getElementById('mp-title').textContent = f.name; a.play().catch(() => {}); }
function mpInit(){ const a = mpAudio(); if (!a) return; a.volume = 0.6; a.addEventListener('play', () => mpSetIcon(true)); a.addEventListener('pause', () => mpSetIcon(false)); if (DEFAULT_TRACK){ a.src = DEFAULT_TRACK; document.getElementById('mp-title').textContent = DEFAULT_TRACK_NAME; } else { document.getElementById('mp-title').textContent = 'موسیقی دلخواه'; } }

/* ---------- اجرا ---------- */
renderThemeSwitch();
mpInit();
init();
