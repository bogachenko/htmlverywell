// The script for collecting information about a user's IP and country.
fetch('https://api.ipify.org?format=json')
	.then(response => response.json())
	.then(data =>
	{
		const ipAddress = data.ip;
		const infoContainer = document.getElementById('info-container');
		infoContainer.innerHTML = `<p>Your IP address is: <strong>${ipAddress}</strong></p>`;
		return fetch(`https://ipapi.co/${ipAddress}/json/`);
	})
	.then(response => response.json())
	.then(data =>
	{
		const country = data.country_name;
		const infoContainer = document.getElementById('info-container');
		return fetch('flags.xml')
			.then(response => response.text())
			.then(xmlText =>
			{
				const parser = new DOMParser();
				const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
				const flags = xmlDoc.getElementsByTagName('flag');
				let flagBase64 = '';
				for(let i = 0; i < flags.length; i++)
				{
					if(flags[i].getAttribute('country') === country)
					{
						flagBase64 = flags[i].getElementsByTagName('base64')[0].textContent;
						break;
					}
				}
				infoContainer.innerHTML += `<p>Your country is: <strong>${country}</strong> <img src="${flagBase64}" alt="${country} flag" class="flags"></p>`;
			});
	})
	.catch(error =>
	{
		console.error('Error fetching IP address or country:', error);
		const infoContainer = document.getElementById('info-container');
		infoContainer.innerHTML = `<p>Your IP address is: <strong class="error-message">Unable to fetch IP address at this time.</strong></p><p>Your country is: <strong class="error-message">Unable to fetch country information at this time.</strong></p>`;
	});
});