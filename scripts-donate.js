// The script for displaying wallet addresses for donations.
function selectText(e) {
	let t = document.createRange(),
		n = window.getSelection();
	t.selectNodeContents(e), n.removeAllRanges(), n.addRange(t)
}
document.addEventListener("DOMContentLoaded", function() {
	let e = document.getElementById("network"),
		t = document.getElementById("coin"),
		n = document.getElementById("result"),
		o = document.getElementById("address"),
		l = document.getElementById("qr-code");
	fetch("json-donate.json").then(e => e.json()).then(a => {
		let s = new Map,
			d = a.qr_codes;
		Object.keys(a.chains).forEach(e => {
			Object.keys(a.chains[e]).forEach(t => {
				s.has(t) || s.set(t, []), s.get(t).push(e)
			})
		}), s.forEach((e, n) => {
			let o = document.createElement("option");
			o.value = n, o.textContent = n, t.appendChild(o)
		}), t.addEventListener("change", function() {
			let a = t.value;
			if (a) {
				e.innerHTML = '<option value="">Choosing a chain</option>';
				let d = s.get(a);
				d.forEach(t => {
					let n = document.createElement("option");
					n.value = t, n.textContent = t, e.appendChild(n)
				}), n.style.display = "none"
			} else e.innerHTML = '<option value="">Choosing a chain</option>', o.textContent = "", l.src = "", n.style.display = "none"
		}), e.addEventListener("change", function() {
			let s = e.value,
				r = t.value;
			if (s && r) {
				let c = a.chains[s][r];
				if (c) {
					o.textContent = `${c.address}`;
					let i = c.qrcode_address,
						g = d[i];
					l.src = `data:image/svg+xml;base64,${g}`, n.style.display = "block", selectText(o)
				}
			} else o.textContent = "", l.src = "", n.style.display = "none"
		})
	}).catch(e => console.error("Error loading data:", e))
});