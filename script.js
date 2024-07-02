async function shortenUrl() {
    const originalUrl = document.getElementById('original-url').value;
    const customAlias = document.getElementById('custom-alias').value;
    const resultContainer = document.getElementById('result-container');

    if (!originalUrl) {
        alert("Please enter a valid URL.");
        return;
    }

    try {
        const response = await fetch('https://api.github.com/gists', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                description: "Shortened URL",
                public: true,
                files: {
                    'link.txt': {
                        content: originalUrl
                    }
                }
            })
        });

        const data = await response.json();
        let shortUrl = `https://gist.github.com/${data.id}`;
        if (customAlias) {
            shortUrl = `https://gist.github.com/${customAlias}`;
        }

        const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(shortUrl)}&size=150x150`;

        resultContainer.innerHTML = `
            <div class="result">
                <p>Short URL: <a href="${shortUrl}" target="_blank">${shortUrl}</a></p>
                <div class="qr-code">
                    <img src="${qrCodeUrl}" alt="QR Code">
                </div>
            </div>
        `;
    } catch (error) {
        console.error('Error:', error);
        alert("There was an error shortening the URL.");
    }
}
