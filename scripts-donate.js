// 
document.addEventListener("DOMContentLoaded", function() {
	let e = document.getElementById("network"),
		t = document.getElementById("coin"),
		n = document.getElementById("result"),
		o = document.getElementById("address"),
		l = document.getElementById("qr-code");
	fetch("json-donate.json").then(e => e.json()).then(a => {
		let s = new Map,
			d = a.qr_codes;
		Object.keys(a.networks).forEach(e => {
			Object.keys(a.networks[e]).forEach(t => {
				s.has(t) || s.set(t, []), s.get(t).push(e)
			})
		}), s.forEach((e, n) => {
			let o = document.createElement("option");
			o.value = n, o.textContent = n, t.appendChild(o)
		}), t.addEventListener("change", function() {
			let a = t.value;
			if(a) {
				e.innerHTML = '<option value="">Select Network</option>';
				let d = s.get(a);
				d.forEach(t => {
					let n = document.createElement("option");
					n.value = t, n.textContent = t, e.appendChild(n)
				}), n.style.display = "none"
			} else e.innerHTML = '<option value="">Select Network</option>', o.textContent = "", l.src = "", n.style.display = "none"
		}), e.addEventListener("change", function() {
			let s = e.value,
				r = t.value;
			if(s && r) {
				let i = a.networks[s][r];
				if(i) {
					o.textContent = `Wallet Address: ${i.address}`;
					let c = i.qr_code_key,
						y = d[c];
					l.src = `data:image/svg+xml;base64,${y}`, n.style.display = "block"
				}
			} else o.textContent = "", l.src = "", n.style.display = "none"
		})
	}).catch(e => console.error("Error loading data:", e))
});