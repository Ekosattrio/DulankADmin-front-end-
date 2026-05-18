(function (window, document, $) {
  "use strict";

  const defaultEmployeeOptions = ["Adul", "Nurdin", "Admin", "Arif", "Galih", "Rapli", "Dadang"];
  const defaultDepartmentMembers = {
    "tim-cutting": ["Rapli", "Nurdin", "Bagas"],
    "tim-printing": ["Adul", "Arif", "Galih"],
    "tim-design": ["Admin", "Nurdin", "Citra"]
  };

  function ensureOption($select, value) {
    if (!value || $select.find(`option[value="${value}"]`).length > 0) {
      return;
    }

    $select.append(new Option(value, value, false, false));
  }

  function setValues(selectElement, values) {
    const $select = $(selectElement);
    const selectedValues = Array.isArray(values) ? values : [];

    selectedValues.forEach((value) => ensureOption($select, value));
    $select.val(selectedValues).trigger("change");
  }

  function getDropdownParent($select) {
    const $modal = $select.closest(".modal");
    return $modal.length ? $modal : $(document.body);
  }

  function initSelect(selectElement, options) {
    const settings = Object.assign({
      employeeOptions: defaultEmployeeOptions,
      placeholder: "Select assignee name",
      values: []
    }, options || {});
    const $select = $(selectElement);

    if (!$select.length || typeof $select.select2 !== "function") {
      return;
    }

    settings.employeeOptions.forEach((name) => ensureOption($select, name));

    if ($select.data("select2")) {
      $select.select2("destroy");
    }

    $select.select2({
      tags: true,
      placeholder: settings.placeholder,
      width: "100%",
      tokenSeparators: [","],
      dropdownParent: getDropdownParent($select)
    });

    if (settings.values.length > 0) {
      setValues($select, settings.values);
    }
  }

  function syncMode(containerElement, options) {
    const settings = Object.assign({
      departmentMembers: defaultDepartmentMembers,
      fallbackValues: ["Adul", "Nurdin"]
    }, options || {});
    const $container = $(containerElement);
    const isDepartment = $container.find(".assignee-type-radio[value='department']").is(":checked");
    const $departmentWrapper = $container.find(".department-select-wrapper");
    const $departmentSelect = $container.find(".assigne-department-select");
    const $assigneeSelect = $container.find(".assigne-multiple-select");

    $departmentWrapper.toggleClass("d-none", !isDepartment);
    $departmentSelect.prop("disabled", !isDepartment);

    if (!$assigneeSelect.length) {
      return;
    }

    if (isDepartment) {
      setValues($assigneeSelect, settings.departmentMembers[$departmentSelect.val()] || []);
      return;
    }

    if (!$assigneeSelect.val() || $assigneeSelect.val().length === 0) {
      setValues($assigneeSelect, settings.fallbackValues);
    }
  }

  function initAll(root, options) {
    const scope = root || document;

    $(scope).find(".assigne-multiple-select").each(function () {
      const values = this.dataset.assigneeValues
        ? this.dataset.assigneeValues.split("|").map((item) => item.trim()).filter(Boolean)
        : [];

      initSelect(this, Object.assign({}, options || {}, { values }));
    });
  }

  window.AssigneeSelect = {
    employeeOptions: defaultEmployeeOptions,
    departmentMembers: defaultDepartmentMembers,
    ensureOption,
    setValues,
    init: initSelect,
    initAll,
    syncMode
  };
})(window, document, window.jQuery);
