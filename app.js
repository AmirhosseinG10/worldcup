const API = 'https://api.ghalamchihashtgerd.ir'; // ساب‌دامین API (بک‌اند PHP)

/* ---------- تم‌ها ---------- */
const THEMES = [
  { id:'stadium',  name:'چمن',     dot:'#22c55e' },
  { id:'midnight', name:'نیمه‌شب', dot:'#38bdf8' },
  { id:'sunset',   name:'غروب',    dot:'#fb7185' },
  { id:'royal',    name:'سلطنتی',  dot:'#a78bfa' },
  { id:'light',    name:'روشن',    dot:'#0ea5e9' },
];
function applyTheme(id){ document.documentElement.setAttribute('data-theme', id); localStorage.setItem('theme', id); renderThemeSwitch(); }
function renderThemeSwitch(){
  const cur = document.documentElement.getAttribute('data-theme') || 'stadium';
  document.getElementById('theme-switch').innerHTML = THEMES.map(t =>
    `<button class="swatch ${t.id===cur?'active':''}" title="${t.name}" style="--dot:${t.dot}" onclick="applyTheme('${t.id}')"></button>`
  ).join('');
}

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
function team(name){
  const c = COUNTRIES[norm(name)];
  const label = c ? c.fa : (name || '؟');
  const flag = c
    ? `<img class="flag" loading="lazy" src="https://flagcdn.com/w40/${c.code}.png" srcset="https://flagcdn.com/w80/${c.code}.png 2x" alt="">`
    : `<span class="flag flag-unknown">🏳️</span>`;
  return `<span class="team">${flag}<span class="team-name">${label}</span></span>`;
}

/* ---------- نام فارسی مراحل ---------- */
const STAGE_FA = { group:'مرحلهٔ گروهی', r32:'مرحلهٔ ۳۲ تیمی', r16:'یک‌هشتم نهایی', qf:'یک‌چهارم نهایی', sf:'نیمه‌نهایی', third:'ردهٔ سوم', final:'فینال' };

/* ---------- ابزار ---------- */
const opts = (m, b) => ({ method:m, credentials:'include', headers:{ 'Content-Type':'application/json' }, body: b ? JSON.stringify(b) : undefined });
const FA_DIGITS = '۰۱۲۳۴۵۶۷۸۹';
function faNum(n){ return String(n ?? '').replace(/\d/g, d => FA_DIGITS[d]); }
function toast(msg, ok=true){
  const el = document.getElementById('toast');
  el.textContent = msg; el.className = 'toast show ' + (ok ? 'ok' : 'err');
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

/* ---------- نمایش ---------- */
async function init(){
  let me;
  try { me = await (await fetch(`${API}/auth.php?action=me`, opts('GET'))).json(); } catch(e){ return; }
  if (!me.logged_in){ showLogin(); return; }
  document.getElementById('login-view').style.display = 'none';
  document.getElementById('app-view').style.display = 'block';
  document.getElementById('user-chip').style.display = 'flex';
  document.getElementById('who').textContent = me.username;
  loadMatches(); loadLeaderboard();
}
function showLogin(){
  document.getElementById('login-view').style.display = 'flex';
  document.getElementById('app-view').style.display = 'none';
  document.getElementById('user-chip').style.display = 'none';
}
function switchTab(name){
  document.querySelectorAll('.tab').forEach(t => t.classList.toggle('active', t.dataset.tab === name));
  document.getElementById('tab-matches').style.display = name === 'matches' ? 'block' : 'none';
  document.getElementById('tab-leaderboard').style.display = name === 'leaderboard' ? 'block' : 'none';
}

async function loadMatches(){
  const box = document.getElementById('matches');
  box.innerHTML = '<div class="skeleton"></div><div class="skeleton"></div><div class="skeleton"></div>';
  const data = await (await fetch(`${API}/matches.php`, opts('GET'))).json();
  const now = new Date((data.now||'').replace(' ','T'));
  if (!data.matches || !data.matches.length){ box.innerHTML = '<p class="muted center">هنوز بازی‌ای ثبت نشده.</p>'; return; }
  box.innerHTML = data.matches.map(m => {
    const locked = new Date((m.start_time||'').replace(' ','T')) <= now;
    const finished = m.status === 'FINISHED';
    const stageFa = STAGE_FA[m.stage] || m.stage;
    return `<div class="card match ${locked?'locked':''}">
      <div class="match-head">
        <span class="badge">${stageFa}</span>
        <span class="badge badge-x">×${faNum(m.multiplier)}</span>
        <span class="match-time">${fmtDate(m.start_time)}</span>
      </div>
      <div class="match-body">
        <div class="side">${team(m.home_team)}</div>
        <div class="vs">
          ${finished
            ? `<span class="score-final">${faNum(m.home_score_90)} − ${faNum(m.away_score_90)}</span>`
            : `<input type="number" min="0" inputmode="numeric" id="h-${m.id}" ${locked?'disabled':''} placeholder="-"><span class="dash">−</span><input type="number" min="0" inputmode="numeric" id="a-${m.id}" ${locked?'disabled':''} placeholder="-">`}
        </div>
        <div class="side side-away">${team(m.away_team)}</div>
      </div>
      <div class="match-foot">
        ${finished ? '<span class="tag tag-done">پایان‌یافته</span>' : locked ? '<span class="tag tag-locked">⛔ مهلت تمام شد</span>' : `<button class="btn-primary btn-sm" onclick="predict(${m.id})">ثبت پیش‌بینی</button>`}
      </div>
    </div>`;
  }).join('');
}

async function predict(id){
  const h = document.getElementById(`h-${id}`).value;
  const a = document.getElementById(`a-${id}`).value;
  if (h === '' || a === ''){ toast('هر دو مقدار را وارد کن', false); return; }
  const r = await fetch(`${API}/predict.php`, opts('POST', { match_id:id, pred_home_90:+h, pred_away_90:+a }));
  if (r.ok){ toast('پیش‌بینی ثبت شد ✅'); loadLeaderboard(); }
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
  const medals = ['🥇','🥈','🥉'];
  const head = '<div class="lb-row lb-head"><span>رتبه</span><span>کاربر</span><span>امتیاز</span><span>دقیق</span></div>';
  const body = rows.map((r,i) => `<div class="lb-row ${i<3?'top':''}"><span class="rank">${medals[i] || (i+1)}</span><span class="lb-user">${r.username}</span><span class="pts">${(+r.total_points).toLocaleString('fa-IR')}</span><span class="exact">${(+r.exact_count).toLocaleString('fa-IR')}</span></div>`).join('');
  box.innerHTML = `<div class="card lb">${head}${body}</div>`;
}

/* ---------- اجرا ---------- */
renderThemeSwitch();
init();
