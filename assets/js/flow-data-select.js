(function () {
  "use strict";

  const selectDataStore = {};
  let activeKey = "";
  let activeSelect = null;
  let activeTrigger = null;
  let ownerModal = null;
  let shouldReopenOwnerModal = false;

  function normalizeTypeValue(value) {
    return String(value || "").trim().toLowerCase();
  }

  function ensureDataSelectModal() {
    let modal = document.getElementById("add-data-select-modal");

    if (modal) {
      return modal;
    }

    const modalWrapper = document.createElement("div");
    modalWrapper.innerHTML = `
      <div class="modal fade text-standard" id="add-data-select-modal" tabindex="-1" aria-labelledby="add-data-select-modal-label" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg">
          <div class="modal-content">
            <div class="modal-header py-2">
              <h5 class="modal-title" id="add-data-select-modal-label">Add Data Select</h5>
              <div class="d-flex align-items-center">
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
            </div>
            <div class="modal-body">
              <form id="add-data-select-form">
                <div class="row align-items-center mb-4">
                  <div class="col-lg-3 mb-2 mb-lg-0">
                    <label class="form-label" for="data-select-information">Information</label>
                  </div>
                  <div class="col-lg-8">
                    <input type="text" class="form-control" id="data-select-information" readonly />
                  </div>
                </div>

                <div class="row align-items-center mb-4">
                  <div class="col-lg-3 mb-2 mb-lg-0">
                    <label class="form-label" for="data-select-input">Add Data Select</label>
                  </div>
                  <div class="col-lg-6 mb-2 mb-lg-0">
                    <input type="text" class="form-control" id="data-select-input" />
                  </div>
                  <div class="col-lg-2">
                    <button type="button" class="btn btn-warning text-white w-100" id="data-select-add-btn">Add</button>
                  </div>
                </div>

                <div class="border rounded p-4 mb-4">
                  <h5 class="mb-3">Data Select Saved</h5>
                  <div class="border-top pt-3" id="data-select-saved-list"></div>
                </div>

                <div class="d-flex justify-content-end gap-3">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                  <button type="submit" class="btn btn-warning text-white">Save</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modalWrapper.firstElementChild);
    return document.getElementById("add-data-select-modal");
  }

  function getDataSelectParts() {
    const modal = ensureDataSelectModal();

    return {
      modal,
      form: document.getElementById("add-data-select-form"),
      title: document.getElementById("add-data-select-modal-label"),
      informationInput: document.getElementById("data-select-information"),
      optionInput: document.getElementById("data-select-input"),
      addButton: document.getElementById("data-select-add-btn"),
      savedList: document.getElementById("data-select-saved-list")
    };
  }

  function getSelectLabel(selectElement) {
    if (selectElement.dataset.information) {
      return selectElement.dataset.information.trim();
    }

    const formRow = selectElement.closest(".flow-field-row, .row");
    const label = formRow ? formRow.querySelector("label, .col-lg-4, .col-md-3, .col-5") : null;

    if (label && label.textContent.trim()) {
      return label.textContent.trim();
    }

    const tableRow = selectElement.closest("tr");
    const informationCell = tableRow ? tableRow.querySelector("td:first-child") : null;

    if (informationCell && informationCell.textContent.trim()) {
      return informationCell.textContent.trim();
    }

    return "Data Select";
  }

  function getDefaultOptions(selectElement, trigger) {
    return (trigger.getAttribute("data-default-options") || selectElement.dataset.defaultOptions || "")
      .split("|")
      .map(function (item) {
        return item.trim();
      })
      .filter(Boolean);
  }

  function getStoredOptions(key, defaults) {
    if (!selectDataStore[key]) {
      selectDataStore[key] = defaults.slice();
    }

    return selectDataStore[key];
  }

  function getActionHost(selectElement) {
    const tableRow = selectElement.closest("tr");

    if (tableRow) {
      return tableRow.querySelector(".data-select-action-cell") || tableRow.cells[4] || selectElement.closest("td");
    }

    return selectElement.parentElement;
  }

  function ensureDataSelectAction(selectElement) {
    const host = getActionHost(selectElement);

    if (!host) {
      return null;
    }

    let wrapper = host.querySelector(".data-select-action-wrap");
    let trigger = host.querySelector(".data-select-trigger");

    if (!trigger) {
      wrapper = document.createElement("div");
      wrapper.className = "data-select-action-wrap mt-2";

      trigger = document.createElement("a");
      trigger.href = "javascript:void(0);";
      trigger.className = "text-primary data-select-trigger d-none";
      trigger.textContent = "Add/Edit Data Select";

      wrapper.appendChild(trigger);
      host.appendChild(wrapper);
    }

    const label = getSelectLabel(selectElement);
    trigger.setAttribute("data-information", label);
    trigger._flowDataSelect = selectElement;

    return trigger;
  }

  function updateDataSelectAction(selectElement) {
    const trigger = ensureDataSelectAction(selectElement);

    if (!trigger) {
      return;
    }

    const isSelectType = normalizeTypeValue(selectElement.value) === "select type";
    const defaultOptions = getDefaultOptions(selectElement, trigger);
    const key = trigger.getAttribute("data-information");
    const storedOptions = selectDataStore[key] || [];
    const hasOptions = defaultOptions.length > 0 || storedOptions.length > 0;

    trigger.classList.toggle("d-none", !isSelectType);
    trigger.textContent = "Add/Edit Data Select";
  }

  function syncDataSelectActions(scope) {
    (scope || document).querySelectorAll(".flow-input-type-select").forEach(updateDataSelectAction);
  }

  function renderSavedOptions() {
    const parts = getDataSelectParts();
    const savedOptions = selectDataStore[activeKey] || [];

    if (!savedOptions.length) {
      parts.savedList.innerHTML = '<p class="mb-0 text-muted">Belum ada data select.</p>';
      return;
    }

    parts.savedList.innerHTML = savedOptions
      .map(function (item, index) {
        return `
          <div class="d-flex justify-content-between align-items-center mb-3">
            <span>${item}</span>
            <a href="javascript:void(0);" class="text-primary data-select-delete" data-index="${index}">Hapus</a>
          </div>
        `;
      })
      .join("");
  }

  function openDataSelectModal(trigger) {
    const parts = getDataSelectParts();
    const selectElement = trigger._flowDataSelect || document.querySelector(".flow-input-type-select");
    const information = trigger.getAttribute("data-information") || getSelectLabel(selectElement);
    const defaultOptions = selectElement ? getDefaultOptions(selectElement, trigger) : [];

    activeKey = information;
    activeSelect = selectElement;
    activeTrigger = trigger;
    parts.title.textContent = getStoredOptions(activeKey, defaultOptions).length ? "Edit Data Select" : "Add Data Select";
    parts.informationInput.value = information;
    parts.optionInput.value = "";
    renderSavedOptions();

    ownerModal = trigger.closest(".modal");
    shouldReopenOwnerModal = Boolean(ownerModal);

    if (ownerModal && window.bootstrap) {
      bootstrap.Modal.getOrCreateInstance(ownerModal).hide();
      ownerModal.addEventListener(
        "hidden.bs.modal",
        function () {
          bootstrap.Modal.getOrCreateInstance(parts.modal).show();
        },
        { once: true }
      );
      return;
    }

    bootstrap.Modal.getOrCreateInstance(parts.modal).show();
  }

  function addOption() {
    const parts = getDataSelectParts();
    const value = parts.optionInput.value.trim();

    if (!value || !activeKey) {
      parts.optionInput.focus();
      return;
    }

    selectDataStore[activeKey].push(value);
    parts.optionInput.value = "";
    renderSavedOptions();
    updateDataSelectAction(activeSelect);
    parts.optionInput.focus();
  }

  function bindEvents() {
    document.addEventListener("change", function (event) {
      const selectElement = event.target.closest(".flow-input-type-select");

      if (selectElement) {
        updateDataSelectAction(selectElement);
      }
    });

    document.addEventListener("click", function (event) {
      const trigger = event.target.closest(".data-select-trigger");

      if (!trigger) {
        return;
      }

      event.preventDefault();
      openDataSelectModal(trigger);
    });

    document.addEventListener("click", function (event) {
      const addButton = event.target.closest("#data-select-add-btn");

      if (addButton) {
        event.preventDefault();
        addOption();
      }
    });

    document.addEventListener("click", function (event) {
      const deleteTrigger = event.target.closest(".data-select-delete");

      if (!deleteTrigger) {
        return;
      }

      event.preventDefault();

      const index = Number(deleteTrigger.getAttribute("data-index"));

      if (Number.isNaN(index) || !selectDataStore[activeKey]) {
        return;
      }

      selectDataStore[activeKey].splice(index, 1);
      renderSavedOptions();
      updateDataSelectAction(activeSelect);
    });

    document.addEventListener("submit", function (event) {
      if (event.target && event.target.id === "add-data-select-form") {
        event.preventDefault();
        bootstrap.Modal.getOrCreateInstance(getDataSelectParts().modal).hide();
      }
    });

    const modal = ensureDataSelectModal();
    modal.addEventListener("hidden.bs.modal", function () {
      const parts = getDataSelectParts();
      parts.form.reset();

      if (shouldReopenOwnerModal && ownerModal && window.bootstrap) {
        shouldReopenOwnerModal = false;
        bootstrap.Modal.getOrCreateInstance(ownerModal).show();
      }
    });

    modal.addEventListener("shown.bs.modal", function () {
      getDataSelectParts().optionInput.focus();
    });

    if (window.jQuery) {
      window.jQuery(document).on("change.select2FlowDataSelect select2:select", ".flow-input-type-select", function () {
        updateDataSelectAction(this);
      });
    }
  }

  function init(scope) {
    ensureDataSelectModal();
    syncDataSelectActions(scope || document);
  }

  window.FlowDataSelect = {
    init,
    sync: syncDataSelectActions,
    store: selectDataStore
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      bindEvents();
      init(document);
    });
  } else {
    bindEvents();
    init(document);
  }
})();
