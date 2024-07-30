document.addEventListener('DOMContentLoaded', function() {
    function displayUserAgentAndOS() {
        const userAgent = navigator.userAgent;
        const infoContainer = document.getElementById('info-container');
        infoContainer.innerHTML += '<p>User-Agent: <strong>' + userAgent + '</strong></p>';
        let os = 'Unknown OS';
        if (/Android/.test(userAgent)) os = 'Android';
        else if (/iPhone/.test(userAgent)) os = 'iOS (iPhone)';
        else if (/iPad/.test(userAgent)) os = 'iOS (iPad)';
        else if (/iPod/.test(userAgent)) os = 'iOS (iPod)';
        else if (/Macintosh/.test(userAgent)) os = 'Mac OS X';
        else if (/Windows NT 10.0/.test(userAgent)) os = 'Windows 10';
        else if (/Windows NT 6.3/.test(userAgent)) os = 'Windows 8.1';
        else if (/Windows NT 6.2/.test(userAgent)) os = 'Windows 8';
        else if (/Windows NT 6.1/.test(userAgent)) os = 'Windows 7';
        else if (/Windows NT 6.0/.test(userAgent)) os = 'Windows Vista';
        else if (/Windows NT 5.1/.test(userAgent)) os = 'Windows XP';
        else if (/Linux/.test(userAgent)) os = 'Linux';
        else if (/X11/.test(userAgent)) os = 'UNIX';
        infoContainer.innerHTML += '<p>Operating System: <strong>' + os + '</strong></p>';
    }
    function fetchIpAndCountry() {
        fetch('https://api.ipify.org?format=json')
            .then(response => response.json())
            .then(data => {
                const ipAddress = data.ip;
                const infoContainer = document.getElementById('info-container');
                infoContainer.innerHTML += `<p>Your IP address is: <strong>${ipAddress}</strong></p>`;
                return fetch(`https://ipapi.co/${ipAddress}/json/`);
            })
            .then(response => response.json())
            .then(data => {
                const country = data.country_name;
                const infoContainer = document.getElementById('info-container');
                return fetch('flags.xml')
                    .then(response => response.text())
                    .then(xmlText => {
                        const parser = new DOMParser();
                        const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
                        const flags = xmlDoc.getElementsByTagName('flag');
                        let flagBase64 = '';
                        for (let i = 0; i < flags.length; i++) {
                            if (flags[i].getAttribute('country') === country) {
                                flagBase64 = flags[i].getElementsByTagName('base64')[0].textContent;
                                break;
                            }
                        }
                        infoContainer.innerHTML += `<p>Country: <strong>${country}</strong> <img src="${flagBase64}" alt="${country} flag" class="flags"></p>`;
                    });
            })
            .catch(error => {
                console.error('Error fetching IP address or country:', error);
                const infoContainer = document.getElementById('info-container');
                infoContainer.innerHTML += `<p>IP address: <strong class="error-message">Unable to fetch IP address at this time.</strong></p><p>Country: <strong class="error-message">Unable to fetch country information at this time.</strong></p>`;
            });
    }
    displayUserAgentAndOS();
    fetchIpAndCountry();
});