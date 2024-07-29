// The script for receiving donation address data.
const jsonUrl = 'json-donate.json';
fetch(jsonUrl)
	.then(response => response.json())
	.then(data =>
	{
		const qrCodes = {};
		const chains = {};
		const addresses = {};
		const tokens = {};
		for(const [key, value] of Object.entries(data))
		{
			if(value.qrcode)
			{
				qrCodes[key] = `data:image/svg+xml;base64,${value.qrcode}`;
			}
			chains[key] = value.chain || '';
			addresses[key] = value.address || '';
			tokens[key] = value.token ? Object.entries(value.token[0])
				.map(([tokenName, tokenSymbol]) => `${tokenName} (${tokenSymbol})`)
				.join(', ') : 'None';
		}
		document.getElementById('currency')
			.addEventListener('change', function()
			{
				const selectedCurrency = this.value;
				const qrCodeImg = document.getElementById('qr-code-img');
				const chainInfo = document.getElementById('chain-info');
				const addressInfo = document.getElementById('address-info');
				const tokenList = document.getElementById('token-list');
				qrCodeImg.src = qrCodes[selectedCurrency] || '';
				chainInfo.textContent = chains[selectedCurrency] || 'N/A';
				addressInfo.textContent = addresses[selectedCurrency] || 'N/A';
				tokenList.textContent = tokens[selectedCurrency] || 'None';
			});
		const initialCurrency = 'bitcoin';
		document.getElementById('qr-code-img')
			.src = qrCodes[initialCurrency] || '';
		document.getElementById('chain-info')
			.textContent = chains[initialCurrency] || 'N/A';
		document.getElementById('address-info')
			.textContent = addresses[initialCurrency] || 'N/A';
		document.getElementById('token-list')
			.textContent = tokens[initialCurrency] || 'None';
	})
	.catch(error => console.error('Error fetching JSON:', error));