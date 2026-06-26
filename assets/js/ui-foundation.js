(function (window, document) {
  "use strict";

  const legacyIconMap = {
    "fa-angle-down": "chevron-down",
    "fa-angle-left": "chevron-left",
    "fa-angle-right": "chevron-right",
    "fa-angle-up": "chevron-up",
    "fa-arrow-down": "arrow-down",
    "fa-arrow-right-circle": "arrow-right-circle",
    "fa-arrow-up": "arrow-up",
    "fa-calendar": "calendar",
    "fa-check-circle": "check-circle",
    "fa-chevron-down": "chevron-down",
    "fa-chevron-left": "chevron-left",
    "fa-chevron-right": "chevron-right",
    "fa-chevron-up": "chevron-up",
    "fa-circle-info": "info",
    "fa-circle": "circle",
    "fa-draw-polygon": "pen-tool",
    "fa-edit": "edit",
    "fa-ellipsis-h": "more-horizontal",
    "fa-ellipsis-v": "more-vertical",
    "fa-eye": "eye",
    "fa-eye-slash": "eye-off",
    "fa-heart": "heart",
    "fa-info-circle": "info",
    "fa-layer-group": "layers",
    "fa-leaf": "feather",
    "fa-money-bill": "dollar-sign",
    "fa-moon": "moon",
    "fa-mouse-pointer": "mouse-pointer",
    "fa-paperclip": "paperclip",
    "fa-pencil": "edit",
    "fa-search": "search",
    "fa-star": "star",
    "fa-star-o": "star",
    "fa-times": "x",
    "fa-trash": "trash-2",
    "fa-trash-alt": "trash-2",
    "fa-user-plus": "user-plus",
    "bi-search": "search",
    "bi-x-lg": "x",
    "bx-microphone": "mic",
    "bx-microphone-off": "mic-off",
    "bx-video": "video",
    "bx-video-off": "video-off",
    "ti-box": "box",
    "ti-circle-filled": "circle",
    "ti-currency-dollar": "dollar-sign",
    "ti-search": "search",
    "ti-square-rounded-filled": "square",
    "ti-users": "users",
  };

  const legacySizeMap = {
    "fa-lg": "feather-20",
    "fa-2x": "feather-32",
    "fa-3x": "feather-32",
  };

  const legacyFamilyClasses = new Set([
    "fa",
    "fas",
    "far",
    "fab",
    "fal",
    "fad",
    "fa-solid",
    "fa-regular",
    "fa-brands",
    "bi",
    "bx",
    "mdi",
    "ti",
    "la",
    "las",
    "lar",
    "lab",
  ]);

  function isLegacyIconClass(className) {
    return (
      legacyFamilyClasses.has(className) ||
      /^fa-/.test(className) ||
      /^bi-/.test(className) ||
      /^bx-/.test(className) ||
      /^mdi-/.test(className) ||
      /^ti-/.test(className) ||
      /^la-/.test(className)
    );
  }

  function iconNameFromClasses(classList) {
    for (const className of classList) {
      if (legacyIconMap[className]) {
        return legacyIconMap[className];
      }
    }
    return null;
  }

  function cleanedClasses(classList) {
    const nextClasses = [];

    classList.forEach((className) => {
      if (legacySizeMap[className]) {
        nextClasses.push(legacySizeMap[className]);
        return;
      }

      if (!isLegacyIconClass(className)) {
        nextClasses.push(className);
      }
    });

    return Array.from(new Set(nextClasses));
  }

  function scopedQuery(scope, selector) {
    const root = scope || document;
    const elements = Array.from(root.querySelectorAll(selector));

    if (root.nodeType === 1 && root.matches(selector)) {
      elements.unshift(root);
    }

    return elements;
  }

  function migrateLegacyIcons(root) {
    const scope = root || document;
    const selector = [
      'i[class*="fa"]',
      'i[class*="bi-"]',
      'i[class*="bx-"]',
      'i[class*="ti-"]',
      'i[class*="mdi-"]',
      'i[class*="la-"]',
      'span[class*="fa"]',
      'span[class*="bi-"]',
      'span[class*="bx-"]',
    ].join(",");

    scopedQuery(scope, selector).forEach((element) => {
      const classList = Array.from(element.classList);
      const iconName = element.getAttribute("data-feather") || iconNameFromClasses(classList);
      const classes = cleanedClasses(classList);

      element.className = classes.join(" ");

      if (iconName) {
        element.setAttribute("data-feather", iconName);
      }
    });
  }

  function refreshIcons(root) {
    migrateLegacyIcons(root || document);

    if (window.feather) {
      window.feather.replace({
        width: 16,
        height: 16,
        "stroke-width": 2,
      });
    }
  }

  function icon(name, className, attrs) {
    const attrList = Object.assign({}, attrs || {}, {
      "data-feather": name,
      class: className || "",
    });

    return (
      "<i " +
      Object.keys(attrList)
        .filter((key) => attrList[key] !== "")
        .map((key) => `${key}="${String(attrList[key]).replace(/"/g, "&quot;")}"`)
        .join(" ") +
      "></i>"
    );
  }

  function replaceIcon(element, name) {
    if (!element || !element.parentNode) {
      return null;
    }

    const replacement = document.createElement("i");
    const classes = cleanedClasses(Array.from(element.classList || []));

    replacement.setAttribute("data-feather", name);
    replacement.className = classes.join(" ");
    element.parentNode.replaceChild(replacement, element);
    refreshIcons(replacement.parentNode || document);

    return replacement;
  }

  function inferModalTemplate(modal) {
    const signature = `${modal.id || ""} ${modal.className || ""} ${(modal.textContent || "").slice(0, 300)}`.toLowerCase();

    if (modal.querySelector(".right-slider-modal, .offcanvas")) {
      return "drawer";
    }

    if (modal.querySelector(".modal-body-table, table") || /stock|variant|orders/.test(signature)) {
      return "table";
    }

    if (/delete|hapus|remove|confirm|success|completed|berhasil|logout/.test(signature)) {
      return "confirm";
    }

    if (/upload|image|photo|avatar|file/.test(signature)) {
      return "media";
    }

    return "form";
  }

  const modalButtonColorClasses = [
    "btn-primary",
    "btn-secondary",
    "btn-success",
    "btn-danger",
    "btn-info",
    "btn-light",
    "btn-dark",
    "btn-warning",
    "btn-submit",
    "btn-cancel",
    "btn-save",
    "btn-outline-primary",
    "btn-outline-secondary",
    "btn-outline-success",
    "btn-outline-danger",
    "btn-outline-info",
    "btn-outline-light",
    "btn-outline-dark",
    "btn-outline-warning",
  ];

  function modalActionText(element) {
    if (!element) {
      return "";
    }

    if (element.tagName === "INPUT") {
      return element.value || "";
    }

    return (element.textContent || "").replace(/\s+/g, " ").trim();
  }

  function isModalActionControl(element) {
    if (!element || element.closest(".modal-header")) {
      return false;
    }

    if (element.matches(".btn-close, .close")) {
      return false;
    }

    return element.matches("button, a.btn, input[type='button'], input[type='submit']");
  }

  function isCancelLike(element) {
    const text = modalActionText(element).toLowerCase();
    const isDismiss = element.getAttribute("data-bs-dismiss") === "modal" || element.getAttribute("data-dismiss") === "modal";

    if (/\b(cancel|close|batal|tutup)\b/.test(text)) {
      return true;
    }

    return isDismiss && !/\b(save|submit|create|update|add|apply|confirm|yes)\b/.test(text);
  }

  function ensureButtonElement(tagName, type) {
    const button = document.createElement(tagName || "button");

    if (button.tagName === "BUTTON") {
      button.type = type || "button";
    }

    return button;
  }

  function setActionLabel(element, label) {
    if (element.tagName === "INPUT") {
      element.value = label;
      return;
    }

    element.textContent = label;
  }

  function normalizeActionClasses(element, variant) {
    modalButtonColorClasses.forEach((className) => element.classList.remove(className));
    element.classList.add("btn", variant === "cancel" ? "btn-dark" : "btn-warning");
    element.classList.toggle("modal-action-cancel", variant === "cancel");
    element.classList.toggle("modal-action-submit", variant === "submit");
    element.classList.remove("me-2", "ms-2", "ms-auto", "me-auto");

    if (variant === "cancel") {
      element.setAttribute("data-bs-dismiss", "modal");

      if (element.tagName === "BUTTON") {
        element.type = "button";
      }
    }

    if (variant === "submit" && element.tagName === "BUTTON" && !element.getAttribute("type")) {
      element.type = "submit";
    }
  }

  function findModalActionContainers(modal) {
    const explicitContainers = Array.from(modal.querySelectorAll(".modal-footer, .modal-footer-btn, .custom-modal-footer"));

    if (explicitContainers.length > 0) {
      return explicitContainers;
    }

    const implicitContainers = Array.from(
      modal.querySelectorAll(".d-flex.justify-content-end, .d-flex.justify-content-between, .text-end, .text-right")
    ).filter((container) => Array.from(container.querySelectorAll("button, a.btn, input[type='button'], input[type='submit']")).some(isModalActionControl));

    if (implicitContainers.length > 0) {
      return [implicitContainers[implicitContainers.length - 1]];
    }

    const content = modal.querySelector(".modal-content");
    const body = modal.querySelector(".modal-body, .custom-modal-body");
    const container = document.createElement("div");

    container.className = "modal-footer modal-action-footer";

    if (body && body.parentNode) {
      body.parentNode.insertBefore(container, body.nextSibling);
    } else if (content) {
      content.appendChild(container);
    }

    return content || body ? [container] : [];
  }

  function normalizeModalActionContainer(container) {
    const controls = Array.from(container.querySelectorAll("button, a.btn, input[type='button'], input[type='submit']")).filter(isModalActionControl);
    let cancel = controls.find(isCancelLike);
    let submit = controls
      .filter((element) => element !== cancel && !isCancelLike(element))
      .find((element) => element.matches("[type='submit'], .btn-submit, .btn-save, .btn-primary, .btn-warning"));

    if (!submit) {
      submit = controls.filter((element) => element !== cancel && !isCancelLike(element)).pop();
    }

    if (!cancel) {
      cancel = ensureButtonElement("button", "button");
    }

    if (!submit) {
      submit = ensureButtonElement("button", "submit");
    }

    setActionLabel(cancel, "Cancel");
    setActionLabel(submit, "Submit");
    normalizeActionClasses(cancel, "cancel");
    normalizeActionClasses(submit, "submit");

    container.classList.add("modal-action-footer");
    container.classList.remove("justify-content-start", "justify-content-center", "justify-content-between");
    container.classList.add("justify-content-end");

    if (cancel.parentNode !== container) {
      container.appendChild(cancel);
    }

    if (submit.parentNode !== container) {
      container.appendChild(submit);
    }

    container.appendChild(cancel);
    container.appendChild(submit);
  }

  function normalizeModalActions(root) {
    const scope = root || document;

    scopedQuery(scope, ".modal").forEach((modal) => {
      findModalActionContainers(modal).forEach(normalizeModalActionContainer);
    });
  }

  function applyModalTemplates(root) {
    const scope = root || document;

    scopedQuery(scope, ".modal").forEach((modal) => {
      const dialog = modal.querySelector(".modal-dialog");
      const template = modal.getAttribute("data-modal-template") || inferModalTemplate(modal);

      modal.setAttribute("data-modal-template", template);
      modal.classList.add("modal-template", `modal-template--${template}`);

      if (dialog && !dialog.classList.contains("right-slider-modal")) {
        dialog.classList.add("modal-dialog-centered");
      }
    });
  }

  function closestPasswordInput(trigger) {
    const preferredScope = trigger.closest(".pass-group, .input-group, .form-group, .input-blocks, .mb-3, .col-lg-6, .col-md-6, .col-sm-6, .col-12");
    const selectors = ["input.pass-input", "input.pass-inputs", "input.pass-inputa", 'input[type="password"]', 'input[type="text"]'];
    const scope = preferredScope || trigger.parentElement || document;

    for (const selector of selectors) {
      const input = scope.querySelector(selector);
      if (input) {
        return input;
      }
    }

    if (trigger.classList.contains("toggle-passwords")) {
      return document.querySelector(".pass-inputs");
    }

    if (trigger.classList.contains("toggle-passworda")) {
      return document.querySelector(".pass-inputa");
    }

    return document.querySelector(".pass-input");
  }

  function bindPasswordToggles() {
    if (document.documentElement.dataset.kcPasswordToggleBound === "true") {
      return;
    }

    document.documentElement.dataset.kcPasswordToggleBound = "true";

    document.addEventListener("click", (event) => {
      const trigger = event.target.closest(".toggle-password, .toggle-passwords, .toggle-passworda");

      if (!trigger) {
        return;
      }

      const input = closestPasswordInput(trigger);

      if (!input) {
        return;
      }

      const shouldShow = input.type === "password";
      input.type = shouldShow ? "text" : "password";
      replaceIcon(trigger, shouldShow ? "eye" : "eye-off");
    });
  }

  function init(root) {
    const scope = root || document;

    applyModalTemplates(scope);
    normalizeModalActions(scope);
    refreshIcons(scope);
    bindPasswordToggles();
  }

  window.KacetakUI = {
    applyModalTemplates,
    icon,
    init,
    migrateLegacyIcons,
    normalizeModalActions,
    refreshIcons,
    replaceIcon,
  };

  document.addEventListener("DOMContentLoaded", () => init(document));
  document.addEventListener("shown.bs.modal", (event) => init(event.target));
})(window, document);
