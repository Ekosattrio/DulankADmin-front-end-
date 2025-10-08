let provinsiData = {}, kotaData = {}, kodeposData = {};
let kecamatanList = [];

// ====== LOAD JSON DATA ======
Promise.all([
    fetch('/assets/json/provinsi.json').then(r => r.json()),
    fetch('/assets/json/kota-kabupaten.json').then(r => r.json()),
    fetch('/assets/json/kodepos.json').then(r => r.json())
]).then(([prov, kota, kodepos]) => {
    provinsiData = prov;
    kotaData = kota;
    kodeposData = kodepos;

    // Ambil kecamatan unik dari kodepos.json
    let kecSet = {};
    Object.values(kodeposData).forEach(obj => {
        if (obj.bps && obj.nama) kecSet[obj.bps + '|' + obj.nama] = obj.nama;
    });
    kecamatanList = Object.entries(kecSet).map(([key, nama]) => {
        const [bps] = key.split('|');
        return { bps, nama };
    });

    // Jalankan untuk semua komponen alamat
    document.querySelectorAll('.alamat-container').forEach(initAlamatSearch);
});


// ====== INISIALISASI SETIAP INPUT ======
function initAlamatSearch(container) {
    const alamatInput = container.querySelector('.alamat-input');
    const clearAddress = container.querySelector('.clear-address');
    const dropdownWrapper = container.querySelector('.alamat-dropdown-wrapper');
    const provList = container.querySelector('.provinsi-list');
    const kotaList = container.querySelector('.kota-list');
    const kecList = container.querySelector('.kecamatan-list');
    const searchResult = container.querySelector('.alamat-search-result');
    const searchList = container.querySelector('.alamat-search-list');
    const tabProv = container.querySelector('.tab-provinsi');
    const tabKota = container.querySelector('.tab-kota');
    const tabKec = container.querySelector('.tab-kecamatan');

    const selected = { provinsi: '', kota: '', kecamatan: '' };

    // ====== RENDER PROVINSI ======
    function renderProvinsi() {
        provList.innerHTML = '';
        kotaList.style.display = 'none';
        kecList.style.display = 'none';
        provList.style.display = 'block';
        Object.entries(provinsiData).forEach(([id, name]) => {
            const li = document.createElement('li');
            li.textContent = name;
            li.className = 'py-1 px-2 alamat-prov-item';
            li.style.cursor = 'pointer';
            li.onclick = () => {
                selected.provinsi = id;
                selected.kota = '';
                selected.kecamatan = '';
                alamatInput.value = name + ', ';
                renderKota(id);
                setActiveTab('kota');
            };
            provList.appendChild(li);
        });
    }

    // ====== RENDER KOTA ======
    function renderKota(provId) {
        kotaList.innerHTML = '';
        kotaList.style.display = 'block';
        provList.style.display = 'none';
        kecList.style.display = 'none';
        Object.entries(kotaData).forEach(([id, name]) => {
            if (id.startsWith(provId)) {
                const li = document.createElement('li');
                li.textContent = name;
                li.className = 'py-1 px-2 alamat-kota-item';
                li.style.cursor = 'pointer';
                li.onclick = () => {
                    selected.kota = id;
                    selected.kecamatan = '';
                    alamatInput.value = provinsiData[selected.provinsi] + ', ' + name + ', ';
                    renderKecamatan(id);
                    setActiveTab('kecamatan');
                };
                kotaList.appendChild(li);
            }
        });
    }

    // ====== RENDER KECAMATAN ======
    function renderKecamatan(kotaId) {
        kecList.innerHTML = '';
        kecList.style.display = 'block';
        kotaList.style.display = 'none';
        provList.style.display = 'none';
        const bps = kotaId.substring(0, 4);
        kecamatanList.filter(kec => kec.bps === bps).forEach(kec => {
            const li = document.createElement('li');
            li.textContent = kec.nama;
            li.className = 'py-1 px-2 alamat-kec-item';
            li.style.cursor = 'pointer';
            li.onclick = () => {
                selected.kecamatan = kec.nama;
                alamatInput.value = `${provinsiData[selected.provinsi]}, ${kotaData[selected.kota]}, ${kec.nama}`;
                dropdownWrapper.style.display = 'none';
            };
            kecList.appendChild(li);
        });
    }

    // ====== PENCARIAN CEPAT (≥ 3 HURUF) ======
    alamatInput.addEventListener('input', function () {
        const keyword = this.value.trim().toLowerCase();

        if (keyword.length < 3) {
            searchResult.style.display = 'none';
            provList.style.display = 'block';
            kotaList.style.display = 'none';
            kecList.style.display = 'none';
            clearAddress.classList.add('d-none');
            return;
        }

        clearAddress.classList.remove('d-none');
        provList.style.display = 'none';
        kotaList.style.display = 'none';
        kecList.style.display = 'none';
        searchResult.style.display = 'block';
        searchList.innerHTML = '';

        let results = [];
        let kotaCache = {};
        let provCache = {};
        let kecamatanUnik = new Set();

        for (const [kode, obj] of Object.entries(kodeposData)) {
            const kecamatan = obj.nama || '';
            const bps = obj.bps || '';
            let kota = kotaCache[bps];
            if (!kota) {
                kota = Object.entries(kotaData).find(([id]) => id.startsWith(bps))?.[1] || '';
                kotaCache[bps] = kota;
            }
            let provId = Object.keys(kotaData).find(id => kotaData[id] === kota) || '';
            let prov = provCache[provId?.slice(0, 2)];
            if (!prov) {
                prov = provinsiData[provId?.slice(0, 2)] || '';
                provCache[provId?.slice(0, 2)] = prov;
            }

            const kecKey = `${prov}|${kota}|${kecamatan}`;
            if (kecamatanUnik.has(kecKey)) continue;
            kecamatanUnik.add(kecKey);

            let allMatch = keyword.split(' ').every(kw =>
                kecamatan.toLowerCase().includes(kw) ||
                kota.toLowerCase().includes(kw) ||
                prov.toLowerCase().includes(kw)
            );

            if (allMatch) {
                results.push({ prov, kota, kecamatan, provId: provId?.slice(0, 2), kotaId: provId, bps });
                if (results.length >= 5) break;
            }
        }

        if (results.length === 0) {
            searchList.innerHTML = '<li class="px-2 py-1 text-muted">Tidak ditemukan</li>';
        } else {
            results.forEach(item => {
                const li = document.createElement('li');
                li.className = 'alamat-search-item px-2 py-1';
                li.style.cursor = 'pointer';
                li.innerHTML = `<b>${item.prov}</b>, ${item.kota}, ${item.kecamatan}`;
                li.onclick = () => {
                    alamatInput.value = `${item.prov}, ${item.kota}, ${item.kecamatan}`;
                    dropdownWrapper.style.display = 'none';
                };
                searchList.appendChild(li);
            });
        }
    });

    // ====== CLEAR BUTTON ======
    clearAddress.addEventListener('click', () => {
        alamatInput.value = '';
        clearAddress.classList.add('d-none');
        searchResult.style.display = 'none';
        provList.style.display = 'block';
        renderProvinsi();
    });

    // ====== TAB SWITCH ======
    function setActiveTab(tab) {
        tabProv.classList.remove('active');
        tabKota.classList.remove('active');
        tabKec.classList.remove('active');
        if (tab === 'provinsi') tabProv.classList.add('active');
        if (tab === 'kota') tabKota.classList.add('active');
        if (tab === 'kecamatan') tabKec.classList.add('active');
    }

    tabProv.addEventListener('click', () => {
        setActiveTab('provinsi');
        renderProvinsi();
    });
    tabKota.addEventListener('click', () => {
        if (selected.provinsi) {
            setActiveTab('kota');
            renderKota(selected.provinsi);
        }
    });
    tabKec.addEventListener('click', () => {
        if (selected.kota) {
            setActiveTab('kecamatan');
            renderKecamatan(selected.kota);
        }
    });

    // ====== SHOW DROPDOWN ======
    alamatInput.addEventListener('focus', () => {
        dropdownWrapper.style.display = 'block';
        renderProvinsi();
    });

    // ====== HIDE DROPDOWN SAAT KLIK LUAR ======
    document.addEventListener('mousedown', (e) => {
        if (!container.contains(e.target)) {
            dropdownWrapper.style.display = 'none';
        }
    });
}
