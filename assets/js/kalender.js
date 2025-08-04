/**
 * This configuration was generated using the CKEditor 5 Builder. You can modify it anytime using this link:
 * https://ckeditor.com/ckeditor-5/builder/?redirect=portal#installation/NoBgNARATAdA7DEFIEYRRQVhSuAWOOFATgDZSNDyK5StSAOPLTQuEBhpSAUwDtkAZjDAUYMeDESAupEF5MnAGYMI0oA=
 */

const {
	DecoupledEditor,
	Autosave,
	BalloonToolbar,
	Bold,
	Code,
	Essentials,
	FontBackgroundColor,
	FontColor,
	FontFamily,
	FontSize,
	ImageEditing,
	ImageUtils,
	Italic,
	Paragraph,
	RemoveFormat,
	Strikethrough,
	Subscript,
	Superscript,
	Underline
} = window.CKEDITOR;

const LICENSE_KEY =
	'eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3NTQ1MjQ3OTksImp0aSI6ImZlYTEyNzcxLTQzYzMtNDkzYi1iMTkzLWU2ZTdmNjUxYjc2NSIsInVzYWdlRW5kcG9pbnQiOiJodHRwczovL3Byb3h5LWV2ZW50LmNrZWRpdG9yLmNvbSIsImRpc3RyaWJ1dGlvbkNoYW5uZWwiOlsiY2xvdWQiLCJkcnVwYWwiLCJzaCJdLCJ3aGl0ZUxhYmVsIjp0cnVlLCJsaWNlbnNlVHlwZSI6InRyaWFsIiwiZmVhdHVyZXMiOlsiKiJdLCJ2YyI6ImVkMmE1ZmI0In0.MDvE_D8NLX2qmr9gxWXlCP9-j7MPVuTiSQqpinsbUDj16qKHDftMPRc3WiWslWhq-tpdPQNJp3MB6r6NGX6Uow';

const editorConfig = {
	toolbar: {
		items: ['undo', 'redo', '|', 'fontSize', 'fontFamily', 'fontColor', 'fontBackgroundColor', '|', 'bold', 'italic', 'underline'],
		shouldNotGroupWhenFull: false
	},
	plugins: [
		Autosave,
		BalloonToolbar,
		Bold,
		Code,
		Essentials,
		FontBackgroundColor,
		FontColor,
		FontFamily,
		FontSize,
		ImageEditing,
		ImageUtils,
		Italic,
		Paragraph,
		RemoveFormat,
		Strikethrough,
		Subscript,
		Superscript,
		Underline
	],
	balloonToolbar: ['bold', 'italic'],
	fontFamily: {
		supportAllValues: true
	},
	fontSize: {
		options: [10, 12, 14, 'default', 18, 20, 22],
		supportAllValues: true
	},
	initialData:
		"<h2>Congratulations on setting up CKEditor 5! 🎉</h2>\n<p>\n\tYou've successfully created a CKEditor 5 project. This powerful text editor\n\twill enhance your application, enabling rich text editing capabilities that\n\tare customizable and easy to use.\n</p>\n<h3>What's next?</h3>\n<ol>\n\t<li>\n\t\t<strong>Integrate into your app</strong>: time to bring the editing into\n\t\tyour application. Take the code you created and add to your application.\n\t</li>\n\t<li>\n\t\t<strong>Explore features:</strong> Experiment with different plugins and\n\t\ttoolbar options to discover what works best for your needs.\n\t</li>\n\t<li>\n\t\t<strong>Customize your editor:</strong> Tailor the editor's\n\t\tconfiguration to match your application's style and requirements. Or\n\t\teven write your plugin!\n\t</li>\n</ol>\n<p>\n\tKeep experimenting, and don't hesitate to push the boundaries of what you\n\tcan achieve with CKEditor 5. Your feedback is invaluable to us as we strive\n\tto improve and evolve. Happy editing!\n</p>\n<h3>Helpful resources</h3>\n<p>\n\t<i>An editor without the </i><code>Link</code>\n\t<i>plugin? That's brave! We hope the links below will be useful anyway </i>😉\n</p>\n<ul>\n\t<li>📝 Trial sign up: https://portal.ckeditor.com/checkout?plan=free,</li>\n\t<li>📕 Documentation: https://ckeditor.com/docs/ckeditor5/latest/installation/index.html,</li>\n\t<li>⭐️ GitHub (star us if you can!): https://github.com/ckeditor/ckeditor5,</li>\n\t<li>🏠 CKEditor Homepage: https://ckeditor.com,</li>\n\t<li>🧑‍💻 CKEditor 5 Demos: https://ckeditor.com/ckeditor-5/demo/</li>\n</ul>\n<h3>Need help?</h3>\n<p>\n\tSee this text, but the editor is not starting up? Check the browser's\n\tconsole for clues and guidance. It may be related to an incorrect license\n\tkey if you use premium features or another feature-related requirement. If\n\tyou cannot make it work, file a GitHub issue, and we will help as soon as\n\tpossible!\n</p>\n",
	licenseKey: LICENSE_KEY,
	placeholder: 'Type or paste your content here!'
};

DecoupledEditor.create(document.querySelector('#editor'), editorConfig).then(editor => {
	document.querySelector('#editor-toolbar').appendChild(editor.ui.view.toolbar.element);
	document.querySelector('#editor-menu-bar').appendChild(editor.ui.view.menuBarView.element);

	return editor;
});


// Fungsi tambah data ke tabel ukuran
function tambahUkuran() {
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



let editedRow = null; // simpan baris yang diedit

function openEditModal(btn) {
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

function updateUkuran() {
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

function hapusBaris(btn) {
  if (confirm("Yakin ingin menghapus data ini?")) {
    var row = btn.closest('tr');
    if (row) {
      row.remove();
      // update nomor
      updateNomorUrut();
    }
  }
}

// Update nomor urut setelah hapus
function updateNomorUrut() {
  var table = document.getElementById('tabelUkuran').querySelector('tbody');
  var rows = table.rows;
  for (var i = 0; i < rows.length; i++) {
    rows[i].cells[0].innerText = i + 1;
  }
}

function openTambahGambarModal() {
  var modal = new bootstrap.Modal(document.getElementById('modalTambahGambar'));
  modal.show();
}
  
function tambahGambar() {
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

let currentEditRowSorting = null;

// Tambah data
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

// Buka modal edit + isi data
function openEditSortingModal(button) {
    event.preventDefault();
    const row = button.closest('tr');
    currentEditRowSorting = row;
    const cells = row.querySelectorAll('td');

    document.getElementById('editNamaSorting').value    = cells[1].textContent.trim();
    document.getElementById('editQtySorting').value     = cells[2].textContent.trim();
    document.getElementById('editUkuranSorting').value  = cells[3].textContent.trim();
    document.getElementById('editBahanSorting').value   = cells[4].textContent.trim();
    document.getElementById('editIsiSorting').value     = cells[5].textContent.trim();
    document.getElementById('editLaminasiSorting').value= cells[6].textContent.trim();
    document.getElementById('editLinkSorting').value    = cells[7].textContent.trim();
    document.getElementById('editStatusSorting').value  = cells[8].querySelector('span')?.textContent.trim();

    const modal = new bootstrap.Modal(document.getElementById('modalEditSorting'));
    modal.show();
  }

  function updateSorting() {
    if (!currentEditRowSorting) return;
    const cells = currentEditRowSorting.querySelectorAll('td');

    cells[1].textContent = document.getElementById('editNamaSorting').value;
    cells[2].textContent = document.getElementById('editQtySorting').value;
    cells[3].textContent = document.getElementById('editUkuranSorting').value;
    cells[4].textContent = document.getElementById('editBahanSorting').value;
    cells[5].textContent = document.getElementById('editIsiSorting').value;
    cells[6].textContent = document.getElementById('editLaminasiSorting').value;
    cells[7].textContent = document.getElementById('editLinkSorting').value;
    const status = document.getElementById('editStatusSorting').value;
    cells[8].innerHTML = `<span class="badge ${status === 'Default' ? 'bg-success' : 'bg-secondary'}">${status}</span>`;
    cells[9].textContent = 'admin';

    bootstrap.Modal.getInstance(document.getElementById('modalEditSorting')).hide();
  }

  function hapusBaris(button) {
    const row = button.closest('tr');
    row.remove();
  }

  function tambahSorting() {
    const table = document.getElementById('tabelSorting').querySelector('tbody');
    const rowCount = table.rows.length;

    const nama = document.getElementById('inputNamaSorting').value;
    const qty = document.getElementById('inputQtySorting').value;
    const ukuran = document.getElementById('inputUkuranSorting').value;
    const bahan = document.getElementById('inputBahanSorting').value;
    const isi = document.getElementById('inputIsiSorting').value;
    const laminasi = document.getElementById('inputLaminasiSorting').value;
    const link = document.getElementById('inputLinkSorting').value;
    const status = document.getElementById('inputStatusSorting').value;

    const newRow = table.insertRow();
    newRow.innerHTML = `
      <td>${rowCount + 1}</td>
      <td>${nama}</td>
      <td>${qty}</td>
      <td>${ukuran}</td>
      <td>${bahan}</td>
      <td>${isi}</td>
      <td>${laminasi}</td>
      <td>${link}</td>
      <td><span class="badge ${status === 'Default' ? 'bg-success' : 'bg-secondary'}">${status}</span></td>
      <td>admin</td>
      <td>
        <a href="#" class="btn btn-sm btn-outline-secondary me-1" onclick="openEditSortingModal(this)">
          <i class="bi bi-pencil"></i>
        </a>
        <a href="#" class="btn btn-sm btn-outline-danger" onclick="hapusBaris(this)">
          <i class="bi bi-trash"></i>
        </a>
      </td>
    `;
    bootstrap.Modal.getInstance(document.getElementById('modalTambahSorting')).hide();
  }

// Hapus data
function hapusSorting(button) {
  if (confirm("Yakin ingin menghapus data ini?")) {
    let row = button.closest('tr');
    row.remove();
  }
}

let currentEditRowKalender2Warna = null;

function openEditSortingModalKalender2Warna(button) {
  const row = button.closest('tr');
  currentEditRowKalender2Warna = row;
  const cells = row.querySelectorAll('td');

  document.getElementById('editNamaSortingKalender2Warna').value = cells[1].textContent.trim();
  document.getElementById('editQtySortingKalender2Warna').value = cells[2].textContent.trim();
  document.getElementById('editUkuranSortingKalender2Warna').value = cells[3].textContent.trim();
  document.getElementById('editBahanSortingKalender2Warna').value = cells[4].textContent.trim();
  document.getElementById('editIsiSortingKalender2Warna').value = cells[5].textContent.trim();
  document.getElementById('editGantunganSortingKalender2Warna').value = cells[6].textContent.trim();
  document.getElementById('editLaminasiSortingKalender2Warna').value = cells[7].textContent.trim();
  document.getElementById('editLinkSortingKalender2Warna').value = cells[8].textContent.trim();
  document.getElementById('editStatusSortingKalender2Warna').value = cells[9].querySelector('span')?.textContent.trim();

  const modal = new bootstrap.Modal(document.getElementById('modalEditSortingKalender2Warna'));
  modal.show();
}

function updateSortingKalender2Warna() {
  if (!currentEditRowKalender2Warna) return;
  const cells = currentEditRowKalender2Warna.querySelectorAll('td');

  cells[1].textContent = document.getElementById('editNamaSortingKalender2Warna').value;
  cells[2].textContent = document.getElementById('editQtySortingKalender2Warna').value;
  cells[3].textContent = document.getElementById('editUkuranSortingKalender2Warna').value;
  cells[4].textContent = document.getElementById('editBahanSortingKalender2Warna').value;
  cells[5].textContent = document.getElementById('editIsiSortingKalender2Warna').value;
  cells[6].textContent = document.getElementById('editGantunganSortingKalender2Warna').value;
  cells[7].textContent = document.getElementById('editLaminasiSortingKalender2Warna').value;
  cells[8].textContent = document.getElementById('editLinkSortingKalender2Warna').value;
  const status = document.getElementById('editStatusSortingKalender2Warna').value;
  cells[9].innerHTML = `<span class="badge ${status === 'Default' ? 'bg-success' : 'bg-secondary'}">${status}</span>`;
  cells[10].textContent = 'admin';
  bootstrap.Modal.getInstance(document.getElementById('modalEditSortingKalender2Warna')).hide();
}

function tambahSortingKalender2Warna() {
  const table = document.querySelector('#tabelSorting tbody');
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${table.rows.length + 1}</td>
    <td>${document.getElementById('inputNamaSortingKalender2Warna').value}</td>
    <td>${document.getElementById('inputQtySortingKalender2Warna').value}</td>
    <td>${document.getElementById('inputUkuranSortingKalender2Warna').value}</td>
    <td>${document.getElementById('inputBahanSortingKalender2Warna').value}</td>
    <td>${document.getElementById('inputIsiSortingKalender2Warna').value}</td>
    <td>${document.getElementById('inputGantunganSortingKalender2Warna').value}</td>
    <td>${document.getElementById('inputLaminasiSortingKalender2Warna').value}</td>
    <td>${document.getElementById('inputLinkSortingKalender2Warna').value}</td>
    <td><span class="badge ${document.getElementById('inputStatusSortingKalender2Warna').value === 'Default' ? 'bg-success' : 'bg-secondary'}">${document.getElementById('inputStatusSortingKalender2Warna').value}</span></td>
    <td>admin</td>
    <td>
      <a href="#" class="btn btn-sm btn-outline-secondary me-1" onclick="openEditSortingModalKalender2Warna(this)"><i class="bi bi-pencil"></i></a>
      <a href="#" class="btn btn-sm btn-outline-danger" onclick="hapusBarisKalender2Warna(this)"><i class="bi bi-trash"></i></a>
    </td>
  `;
  table.appendChild(row);
  bootstrap.Modal.getInstance(document.getElementById('modalTambahSortingKalender2Warna')).hide();
}

function hapusBarisKalender2Warna(button) {
  const row = button.closest('tr');
  row.remove();
  // Re-number
  document.querySelectorAll('#tabelSorting tbody tr').forEach((tr, i) => {
    tr.children[0].textContent = i + 1;
  });
}

function updateSortingKalender2Warna() {
  if (!currentEditRowKalender2Warna) return;

  const cells = currentEditRowKalender2Warna.querySelectorAll('td');

  cells[1].textContent = document.getElementById('editNamaSortingKalender2Warna').value;
  cells[2].textContent = document.getElementById('editQtySortingKalender2Warna').value;
  cells[3].textContent = document.getElementById('editUkuranSortingKalender2Warna').value;
  cells[4].textContent = document.getElementById('editBahanSortingKalender2Warna').value;
  cells[5].textContent = document.getElementById('editIsiSortingKalender2Warna').value;
  cells[6].textContent = document.getElementById('editGantunganSortingKalender2Warna').value;
  cells[7].textContent = document.getElementById('editLaminasiSortingKalender2Warna').value;
  cells[8].textContent = document.getElementById('editLinkSortingKalender2Warna').value;

  const status = document.getElementById('editStatusSortingKalender2Warna').value;
  cells[9].innerHTML = status === "Default"
    ? `<span class="badge bg-success">${status}</span>`
    : `<span class="badge bg-secondary">${status}</span>`;

  cells[10].textContent = "admin"; // Update user (contoh)

  bootstrap.Modal.getInstance(document.getElementById('modalEditSortingKalender2Warna')).hide();
}

function hapusBarisKalender2Warna(button) {
  const row = button.closest('tr');
  row.remove();

  // Renumber kolom "No"
  const rows = document.querySelectorAll('#tabelSorting tbody tr');
  rows.forEach((r, i) => {
    r.querySelector('td').textContent = i + 1;
  });
}



let currentEditRowKalenders = null;

function tambahSortingKalenders() {
  const nama = document.getElementById("inputNamaSorting").value.trim();
  const qty = document.getElementById("inputQtySorting").value;
  const ukuran = document.getElementById("inputUkuranSorting").value.trim();
  const bahan = document.getElementById("inputBahanSorting").value.trim();
  const isi = document.getElementById("inputIsiSorting").value;
  const gantungan = document.getElementById("inputGantunganSorting").value.trim();
  const laminasi = document.getElementById("inputLaminasiSorting").value.trim();
  const link = document.getElementById("inputLinkSorting").value.trim();
  const status = document.getElementById("inputStatusSorting").value;

  const tbody = document.querySelector("#tabelSortingKalender tbody");
  const rowCount = tbody.rows.length + 1;
  const row = tbody.insertRow();

  row.innerHTML = `
    <td>${rowCount}</td>
    <td>${nama}</td>
    <td>${qty}</td>
    <td>${ukuran}</td>
    <td>${bahan}</td>
    <td>${isi}</td>
    <td>${gantungan}</td>
    <td>${laminasi}</td>
    <td>${link}</td>
    <td><span class="badge ${status === 'Default' ? 'bg-success' : 'bg-secondary'}">${status}</span></td>
    <td>
      <a href="#" class="btn btn-sm btn-outline-secondary me-1" onclick="openEditSortingKalenders(this)"><i class="bi bi-pencil"></i></a>
      <a href="#" class="btn btn-sm btn-outline-danger" onclick="hapusSortingKalenders(this)"><i class="bi bi-trash"></i></a>
    </td>
  `;

  const mobileContainer = document.getElementById("mobileSortingContainer");
  const mobileCard = document.createElement("div");
  mobileCard.className = "card mb-3 border";
  mobileCard.innerHTML = `
    <div class="card-body p-3">
      <h6 class="card-title mb-2">Nama Sorting: <strong>${nama}</strong></h6>
      <p class="mb-1"><strong>QTY:</strong> ${qty}</p>
      <p class="mb-1"><strong>Ukuran:</strong> ${ukuran}</p>
      <p class="mb-1"><strong>Bahan:</strong> ${bahan}</p>
      <p class="mb-1"><strong>Isi:</strong> ${isi}</p>
      <p class="mb-1"><strong>Gantungan:</strong> ${gantungan}</p>
      <p class="mb-1"><strong>Laminasi:</strong> ${laminasi}</p>
      <p class="mb-1"><strong>Link/Route:</strong> ${link}</p>
      <p class="mb-1"><strong>Status:</strong> <span class="badge ${status === 'Default' ? 'bg-success' : 'bg-secondary'}">${status}</span></p>
      <div class="d-flex gap-2 mt-2">
        <a href="#" class="btn btn-sm btn-outline-secondary me-1" onclick="openEditSortingKalenders(this)"><i class="bi bi-pencil"></i></a>
        <a href="#" class="btn btn-sm btn-outline-danger" onclick="hapusSortingKalenders(this)"><i class="bi bi-trash"></i></a>
      </div>
    </div>
  `;
  mobileContainer.appendChild(mobileCard);

  bootstrap.Modal.getInstance(document.getElementById("modalTambahSortingKalender")).hide();
  document.querySelector("#modalTambahSortingKalender form")?.reset();
}

function openEditSortingKalenders(button) {
  const row = button.closest("tr");
  if (!row) return;
  currentEditRowKalenders = row;

  const cells = row.querySelectorAll("td");
  document.getElementById("editNamaSorting").value = cells[1].textContent.trim();
  document.getElementById("editQtySorting").value = cells[2].textContent.trim();
  document.getElementById("editUkuranSorting").value = cells[3].textContent.trim();
  document.getElementById("editBahanSorting").value = cells[4].textContent.trim();
  document.getElementById("editIsiSorting").value = cells[5].textContent.trim();
  document.getElementById("editGantunganSorting").value = cells[6].textContent.trim();
  document.getElementById("editLaminasiSorting").value = cells[7].textContent.trim();
  document.getElementById("editLinkSorting").value = cells[8].textContent.trim();
  document.getElementById("editStatusSorting").value = cells[9].textContent.trim();

  const modal = new bootstrap.Modal(document.getElementById("modalEditSortingKalender"));
  modal.show();
}

function updateSortingKalenders() {
  if (!currentEditRowKalenders) return;

  const cells = currentEditRowKalenders.querySelectorAll("td");

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

  bootstrap.Modal.getInstance(document.getElementById("modalEditSortingKalender")).hide();
}

function hapusSortingKalenders(button) {
  const row = button.closest("tr");
  if (row) row.remove();

  document.querySelectorAll("#tabelSortingKalender tbody tr").forEach((tr, index) => {
    tr.querySelector("td").textContent = index + 1;
  });

  // Optional: remove mobile card if needed
}
