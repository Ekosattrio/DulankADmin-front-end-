// Ambil data customer sekali saja
fetch("/assets/json/company.json")
    .then(res => res.json())
    .then(data => {
        const companies = data.company;

        // fungsi reusable untuk setiap input
        function initCompanySearch(input, resultBox) {
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
                        input.dispatchEvent(new Event('input'));
                        resultBox.style.display = "none";
                        let el = document.getElementById(input.getAttribute("data-target"))
                        el.querySelector('.name').textContent = cust.name
                        el.querySelector('.phone').textContent = cust.phone
                        el.querySelector('.email').textContent = cust.email
                        el.querySelector('.address').textContent = cust.address

                        // If this input is inside a modal/section or inline form that has a .shipping-method, populate it now
                        // Prefer broader containers that group customer + shipping (modal, #add-method, #shipping-section, .row)
                        const root = input.closest('.modal') || input.closest('#add-method') || input.closest('#shipping-section') || input.closest('.row') || input.closest('.col-md-6') || input.closest('.mt-3') || document;
                        const shippingEl = root ? root.querySelector('.shipping-method') : null;
                        if (shippingEl) {
                            // render a simple shipping block based on the selected customer address
                            shippingEl.innerHTML = `
                                <div class="shipping-address">
                                    <div class="align-items-center">
                                        <span class="fw-semibold text-dark">${cust.name}</span>
                                        <span class="text-secondary ms-2">${cust.phone}</span>
                                    </div>
                                    <div class="text-standard text-dark small mt-1">
                                        ${cust.address}
                                    </div>
                                </div>
                                <button class="btn my-btn-outline-primary float-end mb-2 shipping-change-address">Ubah Alamat</button>
                            `;

                            // attach a lightweight address picker using the global window.shippingAddresses (mock)
                            const btn = shippingEl.querySelector('.shipping-change-address');
                            if (btn) {
                                btn.addEventListener('click', function () {
                                    let opts = (window.shippingAddresses || []).map(a => `<option value="${a.id}">${a.name} — ${a.addressHtml.replace(/<br\s*\/?\>/gi, ' ').slice(0, 90)}</option>`).join('');
                                    shippingEl.innerHTML = `
                                        <div class="mb-2">
                                            <select class="form-select select shipping-select">
                                                <option value="">-- Pilih alamat --</option>
                                                ${opts}
                                            </select>
                                        </div>
                                        <div class="d-flex justify-content-end">
                                            <button class="btn btn-secondary me-2 shipping-cancel">Batal</button>
                                        </div>
                                    `;
                                    const sel = shippingEl.querySelector('.shipping-select');
                                    const cancelBtn = shippingEl.querySelector('.shipping-cancel');
                                    sel.addEventListener('change', function () {
                                        const id = parseInt(this.value);
                                        const addr = (window.shippingAddresses || []).find(a => a.id === id);
                                        if (addr) {
                                            shippingEl.innerHTML = `
                                                <div class="shipping-address">
                                                    <div class="align-items-center">
                                                        <span class="fw-semibold text-dark">${addr.name}</span>
                                                        <span class="text-secondary ms-2">${addr.phone}</span>
                                                        <span class="badge my-bg-primary text-white align-middle ms-2">${addr.tag}</span>
                                                    </div>
                                                    <div class="text-standard text-dark small mt-1">
                                                        ${addr.addressHtml}
                                                    </div>
                                                </div>
                                                <button class="btn my-btn-outline-primary float-end mb-2 shipping-change-address">Ubah Alamat</button>
                                            `;
                                        }
                                    });
                                    cancelBtn.addEventListener('click', function () {
                                        shippingEl.innerHTML = `<div class="no-address text-muted small mt-1">Pilih customer untuk menampilkan alamat</div>`;
                                    });
                                });
                            }
                        }

                        console.log(el)
                    });
                    resultBox.appendChild(item);
                });
            }

            // tampilkan 5 data teratas awal
            renderList(companies.slice(0, 5));
            // resultBox.style.display = "block";

            input.addEventListener("input", e => {
                const query = e.target.value.trim().toLowerCase();

                if (query.length < 3) {
                    renderList(companies.slice(0, 5));
                    resultBox.style.display = "block";
                    return;
                }

                const filtered = companies.filter(c =>
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

        document.querySelectorAll(".company-input").forEach(input => {
            const container = input.closest(".search-container");
            const resultBox = container.querySelector(".search-results");
            initCompanySearch(input, resultBox);
        });


    });
