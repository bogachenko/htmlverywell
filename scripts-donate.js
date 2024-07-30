// 
document.addEventListener("DOMContentLoaded", function() {
	let e = document.getElementById("network"),
		t = document.getElementById("coin"),
		n = document.getElementById("result"),
		o = document.getElementById("address"),
		l = document.getElementById("qr-code");
	fetch("json-donate.json").then(e => e.json()).then(a => {
		let d = new Map,
			r = a.qr_codes;
		Object.keys(a.networks).forEach(e => {
			Object.keys(a.networks[e]).forEach(t => {
				d.has(t) || d.set(t, []), d.get(t).push(e)
			})
		}), d.forEach((e, n) => {
			let o = document.createElement("option");
			o.value = n, o.textContent = n, t.appendChild(o)
		}), t.addEventListener("change", function() {
			let o = t.value;
			if(o) {
				e.innerHTML = '<option value="">Select Network</option>';
				let l = d.get(o);
				l.forEach(t => {
					let n = document.createElement("option");
					n.value = t, n.textContent = t, e.appendChild(n)
				}), n.style.display = "none"
			} else e.innerHTML = '<option value="">Select Network</option>'
		}), e.addEventListener("change", function() {
			let d = e.value,
				s = t.value;
			if(d && s) {
				let i = a.networks[d][s];
				if(i) {
					o.textContent = `Wallet Address: ${i.address}`;
					let c = i.qrcode_key,
						E = r[c];
					l.src = `data:image/svg+xml;base64,${E}`, n.style.display = "block"
				}
			}
		})
	}).catch(e => console.error("Error loading data:", e))
});