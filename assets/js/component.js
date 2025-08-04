const loadHTML = (url, elementId) => {
    return fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
    })
    .then(data => {
        const element = document.getElementById(elementId);
        if (element) {
            element.innerHTML = data;
        } else {
            console.error(`Element with id "${elementId}" not found.`);
        }
    })
    .catch(error => {
        console.error(`Error loading HTML from ${url}:`, error);
        const element = document.getElementById(elementId);
        if (element) {
            element.innerHTML = `<p style="color:red;">Gagal memuat ${elementId}.</p>`;
        }
    });
};

document.addEventListener("DOMContentLoaded", function() {
    // Muat Navbar, lalu tandai link aktif setelah navbar dimuat
    loadHTML('templates/navbar.html', 'navbar-placeholder')

    // Muat Footer
    loadHTML('templates/sidebar.html', 'sidebar-placeholder')
})