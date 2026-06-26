const API = "https://api.ghalamchihashtgerd.ir"; // ساب‌دامین API؛ فرانت روی GitHub Pages است
const opts = (m, b) => ({
	method: m,
	credentials: "include",
	headers: { "Content-Type": "application/json" },
	body: b ? JSON.stringify(b) : undefined,
});

async function login() {
	const username = document.getElementById("username").value;
	const password = document.getElementById("password").value;
	const r = await fetch(
		`${API}/auth.php?action=login`,
		opts("POST", { username, password }),
	);
	if (r.ok) {
		init();
	} else {
		document.getElementById("login-error").textContent =
			"نام کاربری یا رمز اشتباه است";
	}
}
async function logout() {
	await fetch(`${API}/auth.php?action=logout`, opts("GET"));
	location.reload();
}

async function init() {
	const me = await (
		await fetch(`${API}/auth.php?action=me`, opts("GET"))
	).json();
	if (!me.logged_in) return;
	document.getElementById("login-box").style.display = "none";
	document.getElementById("app").style.display = "block";
	document.getElementById("who").textContent = "سلام " + me.username;
	loadMatches();
	loadLeaderboard();
}

async function loadMatches() {
	const data = await (await fetch(`${API}/matches.php`, opts("GET"))).json();
	const now = new Date(data.now);
	document.getElementById("matches").innerHTML = data.matches
		.map((m) => {
			const locked = new Date(m.start_time) <= now;
			return `<div class="match">
      <b>${m.home_team} و ${m.away_team}</b> <small>(ضریب ${m.multiplier})</small>
      <div>
        <input type="number" min="0" id="h-${m.id}" ${locked ? "disabled" : ""} style="width:50px">
        -
        <input type="number" min="0" id="a-${m.id}" ${locked ? "disabled" : ""} style="width:50px">
        ${locked ? "<span>بسته شد</span>" : `<button onclick="predict(${m.id})">ثبت</button>`}
      </div>
    </div>`;
		})
		.join("");
}

async function predict(id) {
	const body = {
		match_id: id,
		pred_home_90: +document.getElementById(`h-${id}`).value,
		pred_away_90: +document.getElementById(`a-${id}`).value,
	};
	const r = await fetch(`${API}/predict.php`, opts("POST", body));
	alert(r.ok ? "ثبت شد ✅" : "خطا — شاید ددلاین گذشته");
}

async function loadLeaderboard() {
	const data = await (
		await fetch(`${API}/leaderboard.php`, opts("GET"))
	).json();
	document.getElementById("leaderboard").innerHTML =
		"<table><tr><th>کاربر</th><th>امتیاز</th><th>دقیق</th></tr>" +
		data.leaderboard
			.map(
				(r) =>
					`<tr><td>${r.username}</td><td>${r.total_points}</td><td>${r.exact_count}</td></tr>`,
			)
			.join("") +
		"</table>";
}

init();
