// Menyimpan row yang sedang diedit
let editedIsiRow = null;

// Fungsi tambah isi kalender
function tambahIsiKalender() {
  var nama = document.getElementById('inputNamaIsi').value;
  var isi = document.getElementById('inputJumlahIsi').value;
  var status = document.getElementById('inputStatusIsi').value;
  var createdDate = document.getElementById('inputCreatedDateIsi').value;
  var userCreate = document.getElementById('inputUserCreateIsi').value;
  var updateDate = document.getElementById('inputUpdateDateIsi').value;
  var userUpdate = document.getElementById('inputUserUpdateIsi').value;

  // Format tanggal ke dd/mm/yyyy
  createdDate = formatDate(createdDate);
  updateDate = formatDate(updateDate);

  var table = document.getElementById('tabelIsi').getElementsByTagName('tbody')[0];
  var rowCount = table.rows.length + 1;

  var newRow = table.insertRow();

  newRow.innerHTML = `
    <td>${rowCount}</td>
    <td>${nama}</td>
    <td>${isi}</td>
    <td><span class="badge ${status === 'Aktif' ? 'bg-success' : 'bg-secondary'}">${status}</span></td>
    <td>${createdDate}</td>
    <td>${userCreate}</td>
    <td>${updateDate}</td>
    <td>${userUpdate}</td>
    <td>
      <a href="#" class="btn btn-sm btn-outline-secondary me-1" onclick="openEditIsiModal(this)">
        <i class="bi bi-pencil"></i>
      </a>
      <a href="#" class="btn btn-sm btn-outline-danger" onclick="hapusIsi(this)">
        <i class="bi bi-trash"></i>
      </a>
    </td>
  `;

  // Reset input
  document.getElementById('inputNamaIsi').value = '';
  document.getElementById('inputJumlahIsi').value = '';
  document.getElementById('inputStatusIsi').value = 'Aktif';
  document.getElementById('inputCreatedDateIsi').value = '';
  document.getElementById('inputUserCreateIsi').value = 'Admin';
  document.getElementById('inputUpdateDateIsi').value = '';
  document.getElementById('inputUserUpdateIsi').value = 'Admin';

  // Tutup modal
  var modal = bootstrap.Modal.getInstance(document.getElementById('modalTambahIsi'));
  modal.hide();
}

// Fungsi buka modal edit dan isi data
function openEditIsiModal(btn) {
  editedIsiRow = btn.closest('tr');
  var cells = editedIsiRow.getElementsByTagName('td');

  document.getElementById('editNamaIsi').value = cells[1].innerText;
  document.getElementById('editJumlahIsi').value = cells[2].innerText;
  document.getElementById('editStatusIsi').value = cells[3].innerText.trim();
  document.getElementById('editCreatedDateIsi').value = convertToDateValue(cells[4].innerText);
  document.getElementById('editUserCreateIsi').value = cells[5].innerText;
  document.getElementById('editUpdateDateIsi').value = convertToDateValue(cells[6].innerText);
  document.getElementById('editUserUpdateIsi').value = cells[7].innerText;

  var modal = new bootstrap.Modal(document.getElementById('modalEditIsi'));
  modal.show();
}

// Fungsi update isi kalender
function updateIsiKalender() {
  if (!editedIsiRow) return;

  var cells = editedIsiRow.getElementsByTagName('td');

  var nama = document.getElementById('editNamaIsi').value;
  var isi = document.getElementById('editJumlahIsi').value;
  var status = document.getElementById('editStatusIsi').value;
  var createdDate = formatDate(document.getElementById('editCreatedDateIsi').value);
  var userCreate = document.getElementById('editUserCreateIsi').value;
  var updateDate = formatDate(document.getElementById('editUpdateDateIsi').value);
  var userUpdate = document.getElementById('editUserUpdateIsi').value;

  cells[1].innerText = nama;
  cells[2].innerText = isi;
  cells[3].innerHTML = `<span class="badge ${status === 'Aktif' ? 'bg-success' : 'bg-secondary'}">${status}</span>`;
  cells[4].innerText = createdDate;
  cells[5].innerText = userCreate;
  cells[6].innerText = updateDate;
  cells[7].innerText = userUpdate;

  // Tutup modal
  var modal = bootstrap.Modal.getInstance(document.getElementById('modalEditIsi'));
  modal.hide();
}

// Fungsi hapus isi kalender
function hapusIsi(btn) {
  if (confirm("Apakah Anda yakin ingin menghapus data ini?")) {
    var row = btn.closest('tr');
    row.remove();

    // Perbarui nomor urut
    var table = document.getElementById('tabelIsi').getElementsByTagName('tbody')[0];
    for (var i = 0; i < table.rows.length; i++) {
      table.rows[i].cells[0].innerText = i + 1;
    }
  }
}


// Fungsi bantu: konversi yyyy-mm-dd ke dd/mm/yyyy
function formatDate(dateStr) {
  if (!dateStr) return '';
  var parts = dateStr.split('-'); // yyyy-mm-dd
  if (parts.length === 3) {
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  }
  return dateStr;
}

// Fungsi bantu: konversi dd/mm/yyyy ke yyyy-mm-dd
function convertToDateValue(dateStr) {
  var parts = dateStr.split('/');
  if (parts.length === 3) {
    return `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
  }
  return '';
}
