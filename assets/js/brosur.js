function tambahSortingBrosur() {
  let table = document.querySelector("#tabelSorting tbody");
  let rowCount = table.rows.length + 1;

  let nama = document.getElementById('inputNamaSorting').value;
  let qty = document.getElementById('inputQtySorting').value;
  let ukuran = document.getElementById('inputUkuranSorting').value;
  let bahan = document.getElementById('inputBahanSorting').value;
  let isi = document.getElementById('inputIsiSorting').value;
  let gantungan = document.getElementById('inputGantunganSorting').value;
  let laminasi = document.getElementById('inputLaminasiSorting').value;
  let link = document.getElementById('inputLinkSorting').value;
  let status = document.getElementById('inputStatusSorting').value;

  let newRow = table.insertRow();
  newRow.innerHTML = `
    <td>${rowCount}</td>
    <td>${nama}</td>
    <td>${qty}</td>
    <td>${ukuran}</td>
    <td>${bahan}</td>
    <td>${isi}</td>
    <td>${gantungan}</td>
    <td>${laminasi}</td>
    <td>${link}</td>
    <td><span class="badge bg-primary">${status}</span></td>
    <td>
      <a href="#" class="btn btn-sm btn-outline-secondary me-1" onclick="openEditSortingModal(this)"><i class="bi bi-pencil"></i></a>
      <a href="#" class="btn btn-sm btn-outline-danger" onclick="hapusSorting(this)"><i class="bi bi-trash"></i></a>
    </td>
  `;

  // Tutup modal & reset input
  bootstrap.Modal.getInstance(document.getElementById('modalTambahSorting')).hide();
  document.querySelectorAll('#modalTambahSorting input, #modalTambahSorting select').forEach(el => el.value = '');
}

function openEditModalBrosur(btn) {
  // Cari tr terdekat
  editedRow = btn.closest('tr');
  if (!editedRow) return;

  // Ambil data dari kolom
  var cells = editedRow.getElementsByTagName('td');
  document.getElementById('editUkuran').value = cells[1].innerText;
  document.getElementById('editPanjang').value = cells[2].innerText;
  document.getElementById('editLebar').value = cells[3].innerText;
  document.getElementById('editStatus').value = cells[4].innerText.trim();
  document.getElementById('editUser').value = cells[6].innerText;

  // Tampilkan modal
  var modal = new bootstrap.Modal(document.getElementById('modalEditUkuran'));
  modal.show();
}
function tambahGambarBrosur() {
  const inputFile = document.getElementById('inputFileGambar');
  const gridGambar = document.getElementById('gridGambarBrosur');

  // 1. Cek apakah pengguna sudah memilih file
  if (inputFile.files.length === 0) {
    alert('Silakan pilih file gambar terlebih dahulu.');
    return;
  }

  const file = inputFile.files[0];
  
  // 2. Buat URL sementara untuk file gambar yang dipilih
  const imageURL = URL.createObjectURL(file);

  // 3. Buat elemen HTML baru untuk gambar
  const divCol = document.createElement('div');
  divCol.className = 'col';
  divCol.innerHTML = `
    <div class="brosur-item position-relative border rounded overflow-hidden"">
      <img src="${imageURL}" class="img-brosur" alt="Gambar Brosur">
      <input type="checkbox" class="form-check-input position-absolute top-0 end-0 m-1">
    </div>
  `;

  // 4. Tambahkan elemen baru ke dalam grid
  gridGambar.appendChild(divCol);

  // 5. Kosongkan input file dan tutup modal
  inputFile.value = ''; // Reset input file
  modalInstance.hide();
}

function tambahUkuranBrosur() {
  // Ambil nilai input
  var ukuran = document.getElementById('inputUkuran').value.trim();
  var panjang = document.getElementById('inputPanjang').value.trim();
  var lebar = document.getElementById('inputLebar').value.trim();
  var status = document.getElementById('inputStatus').value;
  var user = document.getElementById('inputUser').value.trim();

  // Validasi: wajib diisi
  if (!ukuran || !panjang || !lebar || !user) {
    alert("Semua kolom wajib diisi!");
    return;
  }

  var table = document.getElementById('tabelUkuran').querySelector('tbody');
  var rowCount = table.rows.length + 1;
  var today = new Date().toLocaleDateString('id-ID');

  // Tambah baris baru
  var newRow = table.insertRow();

  newRow.innerHTML = `
    <td>${rowCount}</td>
    <td>${ukuran}</td>
    <td>${panjang}</td>
    <td>${lebar}</td>
    <td><span class="badge ${status === 'Aktif' ? 'bg-success' : 'bg-secondary'}">${status}</span></td>
    <td>${today}</td>
    <td>${user}</td>
    <td>${today}</td>
    <td>
      <a href="#" class="btn btn-sm btn-outline-secondary me-1"><i class="bi bi-pencil"></i></a>
      <a href="#" class="btn btn-sm btn-outline-danger"><i class="bi bi-trash"></i></a>
    </td>
  `;

  // Reset form
  document.getElementById('inputUkuran').value = '';
  document.getElementById('inputPanjang').value = '';
  document.getElementById('inputLebar').value = '';
  document.getElementById('inputStatus').value = 'Aktif';
  document.getElementById('inputUser').value = 'Admin';

  // Tutup modal (pakai Bootstrap Modal API)
  var modalEl = document.getElementById('modalTambahUkuran');
  var modalInstance = bootstrap.Modal.getInstance(modalEl);
  if (modalInstance) {
    modalInstance.hide();
  }
}
function updateUkuranBrosur() {
  if (!editedRow) return;

  var ukuran = document.getElementById('editUkuran').value.trim();
  var panjang = document.getElementById('editPanjang').value.trim();
  var lebar = document.getElementById('editLebar').value.trim();
  var status = document.getElementById('editStatus').value;
  var user = document.getElementById('editUser').value.trim();
  var today = new Date().toLocaleDateString('id-ID');

  var cells = editedRow.getElementsByTagName('td');
  cells[1].innerText = ukuran;
  cells[2].innerText = panjang;
  cells[3].innerText = lebar;
  cells[4].innerHTML = `<span class="badge ${status === 'Aktif' ? 'bg-success' : 'bg-secondary'}">${status}</span>`;
  cells[7].innerText = today;
  cells[6].innerText = user;

  // Tutup modal
  var modal = bootstrap.Modal.getInstance(document.getElementById('modalEditUkuran'));
  if (modal) modal.hide();

  editedRow = null;
}


function openTambahGambarModalBrosur() {
  var modal = new bootstrap.Modal(document.getElementById('modalTambahGambar'));
  modal.show();
}

// Variabel global untuk menyimpan baris yang sedang diedit
let currentEditRowBrosur = null;

function openEditSortingBrosur(button) {
  const row = button.closest("tr");
  if (!row) return;
  currentEditRowBrosur = row;

  const cells = row.querySelectorAll("td");

  document.getElementById("editNamaSorting").value = cells[1].textContent.trim();
  document.getElementById("editQtySorting").value = cells[2].textContent.trim();
  document.getElementById("editUkuranSorting").value = cells[3].textContent.trim();
  document.getElementById("editBahanSorting").value = cells[4].textContent.trim();
  document.getElementById("editGantunganSorting").value = cells[6].textContent.trim();
  document.getElementById("editLaminasiSorting").value = cells[7].textContent.trim();
  document.getElementById("editLinkSorting").value = cells[8].textContent.trim();
  document.getElementById("editStatusSorting").value = cells[9].textContent.trim();

  const modal = new bootstrap.Modal(document.getElementById("modalEditSortingBrosur"));

  modal.show();
}

function updateSortingBrosur() {
  if (!currentEditRowBrosur) return;

  const cells = currentEditRowBrosur.querySelectorAll("td");

  cells[1].textContent = document.getElementById("editNamaSorting").value;
  cells[2].textContent = document.getElementById("editQtySorting").value;
  cells[3].textContent = document.getElementById("editUkuranSorting").value;
  cells[4].textContent = document.getElementById("editBahanSorting").value;
  cells[5].textContent = document.getElementById("editIsiSorting").value;
  cells[6].textContent = document.getElementById("editGantunganSorting").value;
  cells[7].textContent = document.getElementById("editLaminasiSorting").value;
  cells[8].textContent = document.getElementById("editLinkSorting").value;

  const status = document.getElementById("editStatusSorting").value;
  cells[9].innerHTML = `<span class="badge ${status === 'Default' ? 'bg-success' : 'bg-secondary'}">${status}</span>`;

  bootstrap.Modal.getInstance(document.getElementById("modalEditSortingBrosur")).hide();
}

function hapusSortingBrosur(button) {
  const row = button.closest("tr");
  if (!row) return;
  row.remove();

  // Re-numbering ulang kolom No
  document.querySelectorAll("#tabelIsi tbody tr").forEach((tr, index) => {
    tr.querySelector("td").textContent = index + 1;
  });
}
