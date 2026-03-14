$(document).ready(function () {
    // Handler untuk semua editable label
    $(document).on('click', '[data-editable-action="edit"]', function (e) {
        e.preventDefault();
        const $viewSpan = $(this).closest('.editable-label-view');
        const $editSpan = $viewSpan.next('.editable-label-edit');
        const currentText = $viewSpan.find('.editable-label-text').text();

        // Set input value ke text current
        $editSpan.find('[data-editable-input]').val(currentText);

        // Hide view, show edit
        $viewSpan.hide();
        $editSpan.show();

        // Focus ke input
        $editSpan.find('[data-editable-input]').focus().select();
    });

    // Handler untuk save
    $(document).on('click', '[data-editable-action="save"]', function (e) {
        e.preventDefault();
        const $editSpan = $(this).closest('.editable-label-edit');
        const $viewSpan = $editSpan.prev('.editable-label-view');
        const newValue = $editSpan.find('[data-editable-input]').val();

        if (newValue.trim() !== '') {
            // Update text di view span
            $viewSpan.find('.editable-label-text').text(newValue);

            // Show view, hide edit
            $editSpan.hide();
            $viewSpan.show();
        } else {
            alert('Label tidak boleh kosong');
        }
    });

    // Handler untuk cancel
    $(document).on('click', '[data-editable-action="cancel"]', function (e) {
        e.preventDefault();
        const $editSpan = $(this).closest('.editable-label-edit');
        const $viewSpan = $editSpan.prev('.editable-label-view');

        // Reset input value
        const currentText = $viewSpan.find('.editable-label-text').text();
        $editSpan.find('[data-editable-input]').val(currentText);

        // Show view, hide edit
        $editSpan.hide();
        $viewSpan.show();
    });

    // Handler untuk Enter key pada input
    $(document).on('keypress', '[data-editable-input]', function (e) {
        if (e.which == 13) { // Enter key
            $(this).closest('.editable-label-edit').find('[data-editable-action="save"]').click();
            return false;
        }
    });

    // Handler untuk Escape key pada input
    $(document).on('keydown', '[data-editable-input]', function (e) {
        if (e.which == 27) { // Escape key
            $(this).closest('.editable-label-edit').find('[data-editable-action="cancel"]').click();
        }
    });

    // Handler untuk Add Item button (generic untuk berbagai tipe)
    $(document).on('click', '.add-item-btn', function (e) {
        e.preventDefault();
        const $container = $(this).closest('.col-md-12').find('.dynamic-items-container');

        const newItemHTML = this.parentElement.querySelector('template').innerHTML
        const $newItem = $(newItemHTML);

        $container.append($newItem);

        if (window.initNumberSeparatorFor) {
            window.initNumberSeparatorFor($newItem[0]);
        }
    });

    // Handler untuk Remove Item button (generic untuk berbagai tipe)
    $(document).on('click', '.remove-item-btn', function (e) {
        e.preventDefault();
        $(this).closest('.dynamic-item').remove();
    });
});
