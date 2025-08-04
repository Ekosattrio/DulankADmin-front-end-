function openEditHargaJasa(btn) {
  editedIsiRow = btn.closest('tr');
  var cells = editedIsiRow.getElementsByTagName('td');

  document.getElementById('editNamaJasa').value = cells[1].innerText;
  document.getElementById('editHarga').value = cells[2].innerText;
  document.getElementById('editSatuan').value = cells[3].innerText.trim();
  document.getElementById('editHargaMinim').value = cells[4].innerText;

  var modal = new bootstrap.Modal(document.getElementById('modalEditHargaJasa'));
  modal.show();
}