document.getElementById('btnTambahRow').onclick = function () {
    // Reset form
    document.getElementById("formRow").reset();
    // document.getElementById("editRowIndex").value = "";
    document.getElementById("modalFormLabel").innerText = "Tambah Data";
    new bootstrap.Modal(document.getElementById('modaladdukuran')).show();
};

// Tambah data ke tabel
// document.getElementById('formRow').onsubmit = function (e) {
//     e.preventDefault();
//     const tbody = document.querySelector('.table-responsive tbody');
//     const rows = tbody.querySelectorAll('tr');
//     const idx = document.getElementById("editRowIndex").value;
//     const now = new Date();
//     const dateStr = now.toLocaleDateString('en-GB') + ", " + now.toLocaleTimeString('en-GB');
//     const data = [
//         document.getElementById("inputUkuran").value,
//         document.getElementById("inputPanjang").value,
//         document.getElementById("inputLebar").value,
//         document.getElementById("inputStatus").value,
//         dateStr,
//         "Admin1",
//         dateStr,
//         "Admin1"
//     ];
//     if (idx === "") {
//         // Tambah baru
//         const no = rows.length + 1;
//         const badge = data[3].toLowerCase() === "active"
//             ? `<span class="badge bg-soft-success">Active</span>`
//             : `<span class="badge bg-soft-danger">Inactive</span>`;
//         const tr = document.createElement('tr');
//         tr.innerHTML = `
//             <td>${no}</td>
//             <td>${data[0]}</td>
//             <td>${data[1]}</td>
//             <td>${data[2]}</td>
//             <td>${badge}</td>
//             <td>${data[4]}</td>
//             <td>${data[5]}</td>
//             <td>${data[6]}</td>
//             <td>${data[7]}</td>
//             <td>
//                 <div class="hstack gap-2 fs-15">
//                     <a href="javascript:void(0);" class="btn btn-icon btn-sm btn-light btn-delete"><i class="feather-trash"></i></a>
//                     <a href="javascript:void(0);" class="btn btn-icon btn-sm btn-light btn-edit"><i class="feather-edit"></i></a>
//                 </div>
//             </td>
//         `;
//         tbody.appendChild(tr);
//     } else {
//         // Edit
//         const badge = data[3].toLowerCase() === "active"
//             ? `<span class="badge bg-soft-success">Active</span>`
//             : `<span class="badge bg-soft-danger">Inactive</span>`;
//         const tr = rows[idx];
//         tr.children[1].innerText = data[0];
//         tr.children[2].innerText = data[1];
//         tr.children[3].innerText = data[2];
//         tr.children[4].innerHTML = badge;
//         tr.children[5].innerText = data[4];
//         tr.children[6].innerText = data[5];
//         tr.children[7].innerText = data[6];
//         tr.children[8].innerText = data[7];
//     }
//     // ...existing code...
//     bootstrap.Modal.getInstance(document.getElementById('modalForm')).hide();
// };

// Hapus & Edit
// document.querySelector('.table-responsive tbody').onclick = function(e) {
//     const tr = e.target.closest('tr');
//     if(e.target.closest('.btn-delete')) {
//         tr.remove();
//         // Update nomor urut
//         document.querySelectorAll('.table-responsive tbody tr').forEach((row, i) => {
//             row.children[0].innerText = i+1;
//         });
//     }
//     if(e.target.closest('.btn-edit')) {
//         const idx = Array.from(tr.parentNode.children).indexOf(tr);
//         document.getElementById("modalFormLabel").innerText = "Edit Data";
//         document.getElementById("inputUkuran").value = tr.children[1].innerText;
//         document.getElementById("inputPanjang").value = tr.children[2].innerText;
//         document.getElementById("inputLebar").value = tr.children[3].innerText;
//         document.getElementById("inputStatus").value = tr.children[4].innerText;
//         document.getElementById("editRowIndex").value = idx;
//         new bootstrap.Modal(document.getElementById('modalForm')).show();
//     }
// };


document.querySelector('#tableUkuran').addEventListener('click', function (e) {
    if (e.target.closest('.btn-edit')) {
        const tr = e.target.closest('tr');
        const idx = Array.from(tr.parentNode.children).indexOf(tr);
        // Isi modal dengan data dari baris
        document.getElementById('editRowIndex2').value = idx;
        document.getElementById('editUkuran').value = tr.children[1].innerText;
        document.getElementById('editPanjang').value = tr.children[2].innerText;
        document.getElementById('editLebar').value = tr.children[3].innerText;
        // Ambil status dari badge
        document.getElementById('editStatus').value = tr.children[4].innerText.trim();
        new bootstrap.Modal(document.getElementById('modalEditUkuran')).show();
    }
});

// Simpan perubahan edit
// document.getElementById('formEditRow').onsubmit = function (e) {
//     e.preventDefault();
//     const idx = document.getElementById('editRowIndex2').value;
//     const rows = document.querySelectorAll('#tableUkuran tbody tr');
//     const tr = rows[idx];
//     tr.children[1].innerText = document.getElementById('editUkuran').value;
//     tr.children[2].innerText = document.getElementById('editPanjang').value;
//     tr.children[3].innerText = document.getElementById('editLebar').value;
//     const statusVal = document.getElementById('editStatus').value;
//     tr.children[4].innerHTML = statusVal === "Active"
//         ? '<span class="badge bg-soft-success">Active</span>'
//         : '<span class="badge bg-soft-danger">Inactive</span>';
//     bootstrap.Modal.getInstance(document.getElementById('modalEditUkuran')).hide();
// };

// // Modal Tambah soring
// document.getElementById('btnTambahSorting').onclick = function () {
//     document.getElementById("formSorting").reset();
//     document.getElementById("editSortingIndex").value = "";
//     document.getElementById("modalSortingLabel").innerText = "Tambah Sorting Tag";
//     new bootstrap.Modal(document.getElementById('modalSorting')).show();
// };

// Tambah/Edit data ke tabel
document.getElementById('formSorting').onsubmit = function (e) {
    e.preventDefault();
    const tbody = document.querySelector('#tableSorting tbody');
    const rows = tbody.querySelectorAll('tr');
    const idx = document.getElementById("editSortingIndex").value;
    const data = [
        document.getElementById("inputSortingNama").value,
        document.getElementById("inputSortingQty").value,
        document.getElementById("inputSortingUkuran").value,
        document.getElementById("inputSortingKertas").value,
        document.getElementById("inputSortingSisi").value,
        document.getElementById("inputSortingLaminasi").value,
        document.getElementById("inputSortingLipat").value,
        document.getElementById("inputSortingRoute").value,
        document.getElementById("inputSortingStatus").value
    ];
    const statusDropdown = `
										<div class="dropdown">
											<button class="btn btn-sm btn-light border dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
												${data[8]}
											</button>
											<ul class="dropdown-menu">
												<li><a class="dropdown-item" href="#">Default</a></li>
												<li><a class="dropdown-item" href="#">Publish</a></li>
											</ul>
										</div>
									`;
    const aksi = `
										<div class="hstack gap-2 fs-15">
											<a href="javascript:void(0);" class="btn btn-icon btn-sm btn-light text-info btn-edit-sorting"><i class="fa fa-edit"></i></a>
											<a href="javascript:void(0);" class="btn btn-icon btn-sm btn-light text-danger btn-delete-sorting"><i class="fa fa-trash"></i></a>
										</div>
									`;
    if (idx === "") {
        // Tambah baru
        const no = rows.length + 1;
        const tr = document.createElement('tr');
        tr.innerHTML = `
											<td>${no}</td>
											<td>${data[0]}</td>
											<td>${data[1]}</td>
											<td>${data[2]}</td>
											<td>${data[3]}</td>
											<td>${data[4]}</td>
											<td>${data[5]}</td>
											<td>${data[6]}</td>
											<td>${data[7]}</td>
											<td>${statusDropdown}</td>
											<td>${aksi}</td>
										`;
        tbody.appendChild(tr);
    } else {
        // Edit
        const tr = rows[idx];
        tr.children[1].innerText = data[0];
        tr.children[2].innerText = data[1];
        tr.children[3].innerText = data[2];
        tr.children[4].innerText = data[3];
        tr.children[5].innerText = data[4];
        tr.children[6].innerText = data[5];
        tr.children[7].innerText = data[6];
        tr.children[8].innerText = data[7];
        tr.children[9].innerHTML = statusDropdown;
    }
    bootstrap.Modal.getInstance(document.getElementById('modalSorting')).hide();
};

// Hapus & Edit

// Tampilkan modal tambah gambar
document.getElementById('btnTambahGambar').onclick = function () {
    document.getElementById('inputFileGambar').value = '';
    new bootstrap.Modal(document.getElementById('modalTambahGambar')).show();
};

// Fungsi tambah gambar ke grid
function tambahGambar() {
    const input = document.getElementById('inputFileGambar');
    if (!input.files || !input.files[0]) return;
    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = function (e) {
        const grid = document.getElementById('gridGambarBrosur');
        const col = document.createElement('div');
        col.className = 'col';
        col.innerHTML = `
            <div class="brosur-item position-relative border rounded overflow-hidden">
                <img src="${e.target.result}" class="img-brosur" alt="">
                <input type="checkbox" class="form-check-input position-absolute top-0 end-0 m-1">
            </div>
        `;
        grid.appendChild(col);
        bootstrap.Modal.getInstance(document.getElementById('modalTambahGambar')).hide();
    };
    reader.readAsDataURL(file);
}

// Hapus gambar yang dicentang
document.getElementById('btnHapusGambar').onclick = function () {
    const grid = document.getElementById('gridGambarBrosur');
    let found = false;
    grid.querySelectorAll('.col').forEach(function (col) {
        const cb = col.querySelector('input[type="checkbox"]');
        if (cb && cb.checked) {
            col.remove();
            found = true;
        }
    });
    if (!found) {
        Swal.fire('Pilih gambar yang ingin dihapus!', '', 'warning');
    }
};

// Pilih gambar utama (hanya satu yang checked)
document.getElementById('btnGambarUtama').onclick = function () {
    const grid = document.getElementById('gridGambarBrosur');
    const checked = grid.querySelectorAll('input[type="checkbox"]:checked');
    if (checked.length === 0) {
        Swal.fire('Pilih gambar yang ingin dijadikan utama!', '', 'warning');
        return;
    }
    // Uncheck semua, lalu check yang pertama dipilih
    grid.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
    checked[0].checked = true;
    Swal.fire('Berhasil!', 'Gambar utama telah dipilih.', 'success');
};

// Inisialisasi feather icon setelah render
if (window.feather) feather.replace();

function enableEditParagraf(btn) {
    var target = btn.getAttribute('data-target');
    var container = document.querySelector('.editable-paragraf[data-id="' + target + '"]');
    var ps = container.querySelectorAll('p');
    var text = Array.from(ps).map(p => p.innerText).join('\n');
    container.innerHTML = `
        <textarea class="form-control mb-2" style="min-height:50px;resize:vertical;">${text}</textarea>
        <div>
            <button type="button" class="btn btn-warning btn-sm me-1 btn-simpan-paragraf">Simpan</button>
            <button type="button" class="btn btn-light btn-sm btn-batal-paragraf">Batal</button>
        </div>
    `;
    // Simpan
    container.querySelector('.btn-simpan-paragraf').onclick = function () {
        var val = container.querySelector('textarea').value.split('\n');
        container.innerHTML = val.map((t, i) => `<p class="mb-${i == val.length - 1 ? 0 : 1}">${t}</p>`).join('');
    };
    // Batal
    container.querySelector('.btn-batal-paragraf').onclick = function () {
        container.innerHTML = ps[0].outerHTML + (ps[1] ? ps[1].outerHTML : '');
    };
}

// Event delegation untuk semua tombol edit
document.addEventListener('click', function (e) {
    if (e.target.closest('.btn-edit-paragraf')) {
        enableEditParagraf(e.target.closest('.btn-edit-paragraf'));
    }
});