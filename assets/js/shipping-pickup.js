// Support multiple shipping/pickup blocks on the same page.
function displayShipping(el, display) {
    // el is the clicked radio input; find the nearest container that includes shipping/pickup blocks
    let root = (el && el.closest) ? el.closest('.col-md-6') || el.closest('.mt-1') || el.parentElement : document;
    const shippingEls = root.querySelectorAll('.shipping-method');
    const pickupEls = root.querySelectorAll('.pickup-method');
    shippingEls.forEach(s => {
        if (display) s.classList.remove('d-none'); else s.classList.add('d-none');
    });
    pickupEls.forEach(p => {
        if (display) p.classList.add('d-none'); else p.classList.remove('d-none');
    });
}

// Immediately hide all pickup blocks to avoid initial flash
document.querySelectorAll('.pickup-method').forEach(p => p.classList.add('d-none'));

// Initialize visibility on load: for each shipping/pickup block, read local radios and set visibility accordingly
document.addEventListener('DOMContentLoaded', function () {
    // Initially clear shipping in Add Sales modal to avoid showing stale/default address
    document.querySelectorAll('#add-method .shipping-method').forEach(el => { el.innerHTML = '<div class="no-address text-muted small mt-1">Pilih customer untuk menampilkan alamat</div>'; });

    // For each shipping block, find the local radio set and apply current selection
    document.querySelectorAll('.shipping-method').forEach(function (shippingEl) {
        const root = shippingEl.closest('.col-md-6') || shippingEl.closest('.mt-1') || shippingEl.parentElement;
        if (!root) return;
        const radios = root.querySelectorAll('input[type="radio"][name="radioShipping"]');
        if (radios.length) {
            let checkedIndex = -1;
            radios.forEach(function (r, i) { if (r.checked) checkedIndex = i; });
            if (checkedIndex === -1) checkedIndex = 0; // default to first (Shipping)
            const radio = radios[checkedIndex];
            displayShipping(radio, checkedIndex === 0);
        }
    });
});

// Attach dropdown change and cancel behavior for Ubah Alamat
(function () {
    const shippingAddresses = [
        {
            id: 1,
            name: 'Ahmad Dhani',
            phone: '(+62) 852053769',
            tag: 'Office',
            addressHtml: `Toko Kelontong Depan Desa Teluk Jambe, <br>
									515 Sarah Shore Suite 828, Port Kennethstad (Depan Stasiun) <br>
									KAB. KARAWANG - TELUK JAMBE TIMUR, JAWA BARAT, ID 41360`
        },
        {
            id: 2,
            name: 'Siti Aminah',
            phone: '(+62) 8123456789',
            tag: 'Rumah',
            addressHtml: `Jl. Merpati No. 12, RT 03/RW 02<br>
									Kel. Sukamaju, Kec. Cikampek<br>
									KAB. KARAWANG - JAWA BARAT, ID 41311`
        }
    ];

    window.shippingAddresses = shippingAddresses;

    document.querySelectorAll('.shipping-method').forEach(shippingMethodEl => {
        let originalHTML = shippingMethodEl.innerHTML;

        function stripHtml(html) {
            return html.replace(/<br\s*\/?\>/gi, ' ').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
        }

        function renderShipping(address) {
            return `
									<div class="shipping-address">
										<div class="align-items-center">
											<span class="fw-semibold text-dark">${address.name}</span>
											<span class="text-secondary ms-2">${address.phone} </span>
											<span class="badge my-bg-primary text-white align-middle ms-2">${address.tag}</span>
										</div>
										<div class="text-standard text-dark small mt-1">
											${address.addressHtml}
										</div>
									</div>
									<button class="btn my-btn-outline-primary float-end mb-2 shipping-change-address">Ubah Alamat</button>
								`;
        }

        function openSelect() {
            let html = `
									<div class="select-wrapper">
										<div class="select-display" id="shippingSelectDisplay">
											<span>-- Pilih alamat shipping --</span>
											<div class="select-arrow"></div>
										</div>
										<div class="select-options" id="shippingSelectOptions">
											${shippingAddresses.map(a => `<div class="select-option" data-value="${a.id}">
												<strong>${a.name}</strong>
												${stripHtml(a.addressHtml).replace(/, /g, ',<br>')}
											</div>`).join('')}
										</div>
									</div>
									<div class="d-flex justify-content-end mt-2">
										<button class="btn btn-secondary me-2" id="shipping-cancel">Batal</button>
									</div>
								`;
            shippingMethodEl.innerHTML = html;

            const selectWrapper = shippingMethodEl.querySelector('.select-wrapper');
            const selectDisplay = shippingMethodEl.querySelector('#shippingSelectDisplay');
            const selectOptions = shippingMethodEl.querySelector('#shippingSelectOptions');

            selectDisplay.addEventListener("click", () => {
                selectWrapper.classList.toggle('open');
            });

            selectOptions.querySelectorAll(".select-option").forEach(option => {
                option.addEventListener("click", () => {
                    const id = parseInt(option.dataset.value);
                    const addr = shippingAddresses.find(a => a.id === id);
                    if (addr) {
                        shippingMethodEl.innerHTML = renderShipping(addr);
                        attach();
                    }
                });
            });

            document.addEventListener("click", (e) => {
                if (!e.target.closest(".select-wrapper")) {
                    selectWrapper.classList.remove('open');
                }
            });

            const cancelBtn = shippingMethodEl.querySelector('#shipping-cancel');

            cancelBtn.addEventListener('click', function () {
                shippingMethodEl.innerHTML = originalHTML;
                attach();
            });
        }

        function attach() {
            const btn = shippingMethodEl.querySelector('.shipping-change-address');
            if (btn) {
                btn.addEventListener('click', function () { openSelect(); });
            }
        }

        attach();
    });
})();
(function () {
    const pickupAddresses = [
        {
            id: 1,
            name: 'Dulank Pickup 1',
            phone: '(081906855554)',
            addressHtml: `Toko Kelontong Depan Desa Teluk Jambe 515 Sarah Shore Suite 828, Port Kennethstad, Iowa, TH, KAB. KARAWANG - TELUK JAMBE TIMUR, JAWA BARAT, ID 41360`
        },
        {
            id: 2,
            name: 'Dulank Pickup 2',
            phone: '(081906855555)',
            addressHtml: `Jl. Merpati No. 12
										Kel. Sukamaju, Kec. Cikampek
										KAB. KARAWANG - JAWA BARAT, ID 41311`
        }
    ];

    document.querySelectorAll('.pickup-method').forEach(pickupMethodEl => {
        let originalPickupHTML = pickupMethodEl.innerHTML;

        function stripHtml(html) {
            return html.replace(/<br\s*\/?\>/gi, ' ').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
        }

        function renderPickup(address) {
            return `
										<div id="pickup-method-address">
											<span class="fw-semibold text-dark">${address.name} <span class="text-dark">${address.phone}</span></span>
											<div class="mt-1 mb-2 text-color text-standard pickup-list-value">
												${address.addressHtml}
											</div>
										</div>
										<button class="btn my-btn-outline-primary float-end mb-2 pickup-change-address">Pilih Alamat Pickup</button>
									`;
        }

        function openPickupSelect() {
            let html = `
										<div class="select-wrapper">
											<div class="select-display" id="pickupSelectDisplay">
												<span>-- Pilih alamat pickup --</span>
												<div class="select-arrow"></div>
											</div>
											<div class="select-options" id="pickupSelectOptions">
												${pickupAddresses.map(a => `<div class="select-option" data-value="${a.id}">
													<strong>${a.name}</strong>
													${stripHtml(a.addressHtml)}
												</div>`).join('')}
											</div>
										</div>
										<div class="d-flex justify-content-end mt-2">
											<button class="btn btn-secondary me-2" id="pickup-cancel">Batal</button>
										</div>
									`;

            pickupMethodEl.innerHTML = html;

            const selectWrapper = pickupMethodEl.querySelector('.select-wrapper');
            const selectDisplay = pickupMethodEl.querySelector('#pickupSelectDisplay');
            const selectOptions = pickupMethodEl.querySelector('#pickupSelectOptions');

            selectDisplay.addEventListener("click", () => {
                selectWrapper.classList.toggle('open');
            });

            selectOptions.querySelectorAll(".select-option").forEach(option => {
                option.addEventListener("click", () => {
                    const id = parseInt(option.dataset.value);
                    const addr = pickupAddresses.find(a => a.id === id);
                    if (addr) {
                        pickupMethodEl.innerHTML = renderPickup(addr);
                        attachPickup();
                    }
                });
            });

            document.addEventListener("click", (e) => {
                if (!e.target.closest(".select-wrapper")) {
                    selectWrapper.classList.remove('open');
                }
            });

            const cancelBtn = pickupMethodEl.querySelector('#pickup-cancel');

            cancelBtn.addEventListener('click', function () {
                pickupMethodEl.innerHTML = originalPickupHTML;
                attachPickup();
            });
        }

        function attachPickup() {
            const btn = pickupMethodEl.querySelector('.pickup-change-address');
            if (btn) {
                btn.addEventListener('click', function () { openPickupSelect(); });
            }
        }

        attachPickup();
    });
})();
// Ensure any legacy id="pickup-method-address" is converted to a class to avoid duplicate IDs
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('#pickup-method-address').forEach(el => { el.classList.add('pickup-method-address'); el.removeAttribute('id'); });
});
document.addEventListener('DOMContentLoaded', function () {
    const modalAddSales = document.getElementById('add-sels');

    if (modalAddSales) {
        modalAddSales.addEventListener('hidden.bs.modal', function () {
            const shippingMethod = modalAddSales.querySelector('.shipping-method');
            if (shippingMethod) {
                shippingMethod.innerHTML = '<div class="no-address text-muted small mt-1">Pilih customer untuk menampilkan alamat</div>';
            }
            const pickupMethod = modalAddSales.querySelector('.pickup-method');
            if (pickupMethod) {
                pickupMethod.classList.add('d-none');
            }
            const radioShipping1 = document.getElementById('radioShipping1');
            if (radioShipping1) {
                radioShipping1.checked = true;
                displayShipping(radioShipping1, true);
            }
            const customerData = document.getElementById('data-customer');
            if (customerData) {
                customerData.querySelectorAll('strong, small').forEach(el => el.innerText = '');
            }
            const customerInput = modalAddSales.querySelector('.customer-input');
            if (customerInput) customerInput.value = '';
        });
    }
});