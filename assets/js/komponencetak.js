function openEditKomponenCetak(btn) {
  editedIsiRow = btn.closest('tr');
  var cells = editedIsiRow.getElementsByTagName('td');

  document.getElementById('editNamaJasa').value = cells[1].innerText;
  document.getElementById('editNilai').value = cells[2].innerText;

  var modal = new bootstrap.Modal(document.getElementById('modalEditKomponenCetak'));
  modal.show();
}
