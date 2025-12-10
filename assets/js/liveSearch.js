// Ambil data customer sekali saja
fetch("/assets/json/customer.json")
    .then(res => res.json())
    .then(data => {
        const customers = data.customer;

        // fungsi reusable untuk setiap input
        function initCustomerSearch(input, resultBox) {
            function renderList(list) {
                resultBox.innerHTML = "";
                if (list.length === 0) {
                    resultBox.innerHTML = `<div class="p-2 text-muted text-center">No results found</div>`;
                    return;
                }
                list.forEach(cust => {
                    const item = document.createElement("div");
                    item.className = "customer-item";
                    item.innerHTML = `
                <div class="fw-semibold">${cust.name}</div>
                <div class="text-muted small">${cust.phone}</div>
              `;
                    item.addEventListener("click", () => {
                        input.value = cust.name;
                        resultBox.style.display = "none";
                        let el = document.getElementById(input.getAttribute("data-target"))
                        el.querySelector('.name').textContent = cust.name
                        el.querySelector('.phone').textContent = cust.phone
                        el.querySelector('.email').textContent = cust.email
                        el.querySelector('.address').textContent = cust.address
                        console.log(el)
                    });
                    resultBox.appendChild(item);
                });
            }

            // tampilkan 5 data teratas awal
            renderList(customers.slice(0, 5));
            // resultBox.style.display = "block";

            input.addEventListener("input", e => {
                const query = e.target.value.trim().toLowerCase();

                if (query.length < 3) {
                    renderList(customers.slice(0, 5));
                    resultBox.style.display = "block";
                    return;
                }

                const filtered = customers.filter(c =>
                    c.name.toLowerCase().includes(query) ||
                    c.phone.includes(query)
                );
                renderList(filtered);
                resultBox.style.display = "block";
            });

            input.addEventListener("focus", () => {
                resultBox.style.display = "block";
            });

            document.addEventListener("click", e => {
                if (!e.target.closest(".search-container")) {
                    resultBox.style.display = "none";
                }
            });
        }

        // inisialisasi untuk semua input dengan class "customer-input"
        document.querySelectorAll(".customer-input").forEach(containerInput => {
            const resultBox = containerInput.parentElement.querySelector(".search-results");
            initCustomerSearch(containerInput, resultBox);
        });
    });
