document.addEventListener("DOMContentLoaded", () => {
  const scope = document.getElementById("profitSettingTabContent");
  if (!scope) return;

  let selected = "select-1";
  const updateButton = scope.querySelector("#update-btn");
  const infoSelectedAll = scope.querySelector("#info-selected-all");

  function formatRupiah(value) {
    return String(value || "")
      .replace(/\D/g, "")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  function initNumberSeparator(container = scope) {
    container.querySelectorAll(".number-separator").forEach((input) => {
      if (input.dataset.separatorReady) return;
      input.dataset.separatorReady = "true";
      input.setAttribute("inputmode", "numeric");
      input.setAttribute("pattern", "[0-9]*");

      input.addEventListener("input", () => {
        const numericValue = input.value.replace(/\D/g, "");
        if (input.value !== numericValue) input.value = numericValue;
      });

      if (typeof easyNumberSeparator === "function") {
        easyNumberSeparator({
          selector: input,
          separator: ".",
          decimalSeparator: ",",
          resultInput: input.parentElement.querySelector(".result-input"),
        });
        return;
      }

      input.addEventListener("input", () => {
        const rawValue = input.value.replace(/\D/g, "");
        const resultInput = input.parentElement.querySelector(".result-input");
        input.value = formatRupiah(rawValue);
        if (resultInput) resultInput.value = rawValue;
      });
    });
  }

  function getVisibleInputs(form) {
    return Array.from(form.querySelectorAll("input")).filter(
      (input) => !input.disabled && input.type !== "hidden" && !input.readOnly,
    );
  }

  function getOptionBlock(selectId) {
    return scope.querySelector(`#${selectId}`)?.closest(".persentase-form, .range-form");
  }

  function checkValue() {
    const selectedForm = getOptionBlock(selected);
    const forms = [selectedForm, scope.querySelector(".tambahan-form"), scope.querySelector(".pajak-form")].filter(Boolean);

    return forms.every((form) => getVisibleInputs(form).every((input) => input.value.trim() !== ""));
  }

  function disabledInput(selectId) {
    const parent = getOptionBlock(selectId);
    if (!parent) return;

    parent
      .querySelector(".input-select")
      ?.querySelectorAll("input, select, textarea")
      .forEach((input) => {
        input.disabled = true;
      });
    parent.querySelector(".input-select")?.classList.add("d-none");
  }

  function display(selectId) {
    ["select-1", "select-3"].forEach(disabledInput);

    const parent = getOptionBlock(selectId);
    if (!parent) return;

    parent
      .querySelector(".input-select")
      ?.querySelectorAll("input, select, textarea")
      .forEach((input) => {
        input.disabled = false;
      });
    parent.querySelector(".input-select")?.classList.remove("d-none");
  }

  function updateSelectedOption(option) {
    scope.querySelectorAll(".btn-spec").forEach((item) => {
      item.checked = false;
    });

    option.checked = true;
  }

  function showValidationIfNeeded() {
    if (!checkValue()) {
      infoSelectedAll?.classList.remove("d-none");
      updateButton?.classList.add("disabled");
      return;
    }

    infoSelectedAll?.classList.add("d-none");
    updateButton?.classList.remove("disabled");
  }

  function createCostRow(label, unit, value = "") {
    const row = document.createElement("div");
    row.className = "row align-items-center";
    row.innerHTML = `
			<div class="col-md-3 mt-3">
				<label class="form-label mb-0 label-biaya">${label}</label>
			</div>
			<div class="d-flex col-md-5 align-items-center mt-3">
				<input type="text" class="form-control me-2 w-50 number-separator price-input" inputmode="numeric" pattern="[0-9]*" value="${value}">
				<input type="hidden" class="result-input">
				<span>${unit}</span>
			</div>
			<div class="d-flex mt-3 col-md-3">
				<button class="btn btn-link text-decoration-none btn-edit" type="button">Ubah</button>
				<button class="btn btn-link text-danger text-decoration-none btn-hapus" type="button">Hapus</button>
			</div>
		`;
    return row;
  }

  function createCostEditRow(label = "", unit = "Per Pekerjaan/Job", value = "", cancellable = false) {
    const row = document.createElement("div");
    row.className = "row align-items-center other-temp-row";
    row.innerHTML = `
			<div class="col-md-3 mt-3">
				<input type="text" class="form-control w-100" placeholder="Label Biaya" value="${label}">
			</div>
			<div class="d-flex col-md-5 align-items-center mt-3">
				<input type="text" class="form-control w-100 number-separator price-input" inputmode="numeric" pattern="[0-9]*" value="${value}">
				<input type="hidden" class="result-input">
				<select class="form-select ms-2 satuan-input">
					<option value="Per Pekerjaan/Job">Per Pekerjaan/Job</option>
					<option value="Per Lembar">Per Lembar</option>
				</select>
			</div>
			<div class="d-flex mt-3 col-md-3">
				<button class="btn btn-link btn-selesai" type="button">Save</button>
				${cancellable ? '<button class="btn btn-link text-danger text-decoration-none btn-batal" type="button">Cancel</button>' : ""}
			</div>
		`;
    row.querySelector(".satuan-input").value = unit;
    return row;
  }

  function attachCostHandlers(row) {
    row.querySelector(".btn-hapus")?.addEventListener("click", () => row.remove());
    row.querySelector(".btn-edit")?.addEventListener("click", () => {
      const label = row.querySelector(".label-biaya")?.textContent.trim() || "";
      const unit =
        row.querySelector(".price-input")?.nextElementSibling?.nextElementSibling?.textContent.trim() ||
        row.querySelector(".d-flex.col-md-5 span")?.textContent.trim() ||
        "Per Pekerjaan/Job";
      const value = row.querySelector(".price-input")?.value || "";
      const editRow = createCostEditRow(label, unit, value);
      row.parentNode.insertBefore(editRow, row.nextSibling);
      row.remove();
      initNumberSeparator(editRow);
      attachCostEditHandlers(editRow);
      editRow.querySelector('input[placeholder="Label Biaya"]')?.focus();
    });
  }

  function attachCostEditHandlers(row) {
    row.querySelector(".btn-selesai")?.addEventListener("click", () => {
      const labelInput = row.querySelector('input[placeholder="Label Biaya"]');
      const unitInput = row.querySelector(".satuan-input");
      const valueInput = row.querySelector(".price-input");
      const label = labelInput.value.trim();

      if (!label) {
        labelInput.classList.add("is-invalid");
        labelInput.focus();
        return;
      }

      const finalRow = createCostRow(label, unitInput.value, valueInput.value);
      row.parentNode.insertBefore(finalRow, row.nextSibling);
      row.remove();
      initNumberSeparator(finalRow);
      attachCostHandlers(finalRow);
      scope.querySelector("#addOther")?.classList.remove("disabled");
    });

    row.querySelector(".btn-batal")?.addEventListener("click", () => {
      row.remove();
      scope.querySelector("#addOther")?.classList.remove("disabled");
    });
  }

  function createTaxRow(label, value = "") {
    const row = document.createElement("div");
    row.className = "row align-items-center mt-3 pajak-row";
    row.innerHTML = `
			<div class="col-3">
				<label class="form-label mb-0 label-pajak">${label}</label>
			</div>
			<div class="col-5 input-group input-group-sm w-25 me-3">
				<input type="text" class="form-control number-separator" inputmode="numeric" pattern="[0-9]*" value="${value}">
				<input type="hidden" class="result-input">
				<span class="input-group-text">%</span>
			</div>
			<div class="d-flex col-3">
				<button class="btn btn-link text-decoration-none btn-edit" type="button">Ubah</button>
				<button class="btn btn-link text-danger text-decoration-none btn-hapus" type="button">Hapus</button>
			</div>
		`;
    return row;
  }

  function createTaxEditRow(label = "", value = "", cancellable = false) {
    const row = document.createElement("div");
    row.className = "row align-items-center mt-3 pajak-row pajak-temp-row";
    row.innerHTML = `
			<div class="col-3">
				<input type="text" class="form-control w-100" placeholder="Nama Pajak" value="${label}">
			</div>
			<div class="col-5 input-group input-group-sm w-25 me-3">
				<input type="text" class="form-control number-separator" inputmode="numeric" pattern="[0-9]*" value="${value}">
				<input type="hidden" class="result-input">
				<span class="input-group-text">%</span>
			</div>
			<div class="d-flex col-3">
				<button class="btn btn-link btn-selesai" type="button">Save</button>
				${cancellable ? '<button class="btn btn-link text-danger text-decoration-none btn-batal" type="button">Cancel</button>' : ""}
			</div>
		`;
    return row;
  }

  function attachTaxHandlers(row) {
    row.querySelector(".btn-hapus")?.addEventListener("click", () => row.remove());
    row.querySelector(".btn-edit")?.addEventListener("click", () => {
      const label = row.querySelector(".label-pajak")?.textContent.trim() || "";
      const value = row.querySelector(".number-separator")?.value || "";
      const editRow = createTaxEditRow(label, value);
      row.parentNode.insertBefore(editRow, row.nextSibling);
      row.remove();
      initNumberSeparator(editRow);
      attachTaxEditHandlers(editRow);
      editRow.querySelector('input[placeholder="Nama Pajak"]')?.focus();
    });
  }

  function attachTaxEditHandlers(row) {
    row.querySelector(".btn-selesai")?.addEventListener("click", () => {
      const labelInput = row.querySelector('input[placeholder="Nama Pajak"]');
      const valueInput = row.querySelector(".number-separator");
      const label = labelInput.value.trim();

      if (!label) {
        labelInput.classList.add("is-invalid");
        labelInput.focus();
        return;
      }

      const finalRow = createTaxRow(label, valueInput.value);
      row.parentNode.insertBefore(finalRow, row.nextSibling);
      row.remove();
      initNumberSeparator(finalRow);
      attachTaxHandlers(finalRow);
      scope.querySelector("#addTax")?.classList.remove("disabled");
    });

    row.querySelector(".btn-batal")?.addEventListener("click", () => {
      row.remove();
      scope.querySelector("#addTax")?.classList.remove("disabled");
    });
  }

  disabledInput("select-3");
  initNumberSeparator();

  updateButton?.addEventListener("click", (event) => {
    event.preventDefault();
    showValidationIfNeeded();
  });

  scope.addEventListener("input", () => {
    if (checkValue()) {
      infoSelectedAll?.classList.add("d-none");
      updateButton?.classList.remove("disabled");
    }
  });

  scope.querySelectorAll(".btn-spec").forEach((option) => {
    option.addEventListener("change", () => {
      selected = option.id;
      updateSelectedOption(option);
      display(selected);
      infoSelectedAll?.classList.add("d-none");
      updateButton?.classList.remove("disabled");
    });
  });

  scope.querySelector(".range-form")?.addEventListener("focusout", (event) => {
    if (!event.target.classList.contains("input-ke")) return;
    const keValue = parseInt(
      (event.target.parentElement.querySelector(".result-input")?.value || event.target.value).replace(/\D/g, ""),
      10,
    );
    const nextRow = event.target.closest(".row")?.nextElementSibling;
    const nextDariInput = nextRow?.querySelector(".input-dari");

    if (!Number.isNaN(keValue) && nextDariInput) nextDariInput.value = formatRupiah(keValue + 1);
  });

  scope.querySelector(".range-form")?.addEventListener("keydown", (event) => {
    if (event.target.classList.contains("input-ke") && event.key === "Enter") {
      event.preventDefault();
      event.target.blur();
    }
  });

  scope.querySelector(".range-form")?.addEventListener("click", (event) => {
    if (event.target.classList.contains("add-range")) {
      event.preventDefault();
      const row = event.target.closest(".row");
      const newRow = row.cloneNode(true);
      newRow.querySelector(".delete-range")?.classList.remove("d-none");
      newRow.querySelectorAll("input").forEach((input) => {
        delete input.dataset.separatorReady;
        if (!input.readOnly) input.value = "";
      });
      row.parentNode.insertBefore(newRow, row.nextSibling);
      initNumberSeparator(newRow);
    }

    if (event.target.classList.contains("delete-range")) {
      event.preventDefault();
      const row = event.target.closest(".row");
      const rows = row.parentNode.querySelectorAll(".row");
      if (rows.length > 1) row.remove();
    }
  });

  scope.querySelector("#addOther")?.addEventListener("click", (event) => {
    event.preventDefault();
    const button = event.currentTarget;
    if (button.classList.contains("disabled")) return;

    const row = createCostEditRow("", "Per Pekerjaan/Job", "", true);
    scope.querySelector(".tambahan-form").appendChild(row);
    button.classList.add("disabled");
    initNumberSeparator(row);
    attachCostEditHandlers(row);
    row.querySelector('input[placeholder="Label Biaya"]')?.focus();
  });

  scope.querySelectorAll(".tambahan-form .row.align-items-center").forEach(attachCostHandlers);

  scope.querySelector("#addTax")?.addEventListener("click", (event) => {
    event.preventDefault();
    const button = event.currentTarget;
    if (button.classList.contains("disabled")) return;

    const row = createTaxEditRow("", "", true);
    scope.querySelector(".pajak-form").appendChild(row);
    button.classList.add("disabled");
    initNumberSeparator(row);
    attachTaxEditHandlers(row);
    row.querySelector('input[placeholder="Nama Pajak"]')?.focus();
  });

  scope.querySelectorAll(".pajak-form .row.align-items-center").forEach(attachTaxHandlers);
});
