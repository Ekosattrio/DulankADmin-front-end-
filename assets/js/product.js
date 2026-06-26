document.addEventListener('DOMContentLoaded', () => {
	const defaultProductImages = [
		'https://percetakan-dulank.netlify.app/images/brosur.jpg',
		'https://commons.wikimedia.org/wiki/Special:FilePath/Tri_Fold_Brochure_Mockup_01.jpg',
		'https://commons.wikimedia.org/wiki/Special:FilePath/Cathedral_brochure_0001.jpg'
	];
	const defaultProductImage = defaultProductImages[0];
	const productModalElement = document.getElementById('modaladdukuran');
	const productModalTitle = document.getElementById('modalFormLabel');
	const productForm = document.getElementById('formRow');
	const productNameInput = document.getElementById('inputProduct');
	const productContentInput = document.getElementById('inputDescription');
	const addProductButton = document.getElementById('btnTambahRow');
	const productCardGrid = document.getElementById('productCardGrid');
	const addImageButton = document.getElementById('productAddImage');
	const imageInput = document.getElementById('productImageInput');
	const imageList = document.getElementById('productImageList');
	let activeProductCard = null;
	let modalImages = [];

	if (!productModalElement || !productForm || !productCardGrid) return;

	if (addProductButton) addProductButton.onclick = null;

	function escapeHtml(value) {
		return String(value || '')
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;')
			.replace(/'/g, '&#039;');
	}

	function getProductRows(card) {
		return Array.from(card.querySelectorAll('.product-spec-row'));
	}

	function getProductContent(card, label) {
		const row = getProductRows(card).find(item => item.firstElementChild?.textContent.trim() === label);
		return row?.lastElementChild?.textContent.trim() || '';
	}

	function setProductContent(card, label, value) {
		const row = getProductRows(card).find(item => item.firstElementChild?.textContent.trim() === label);
		if (row?.lastElementChild) row.lastElementChild.textContent = value;
	}

	function getCardImages(card) {
		try {
			const images = JSON.parse(card.dataset.images || '[]');
			if (Array.isArray(images) && images.length) return images;
		} catch (error) { }

		return Array.from(card.querySelectorAll('.product-image-img'))
			.map(img => img.getAttribute('src'))
			.filter(Boolean);
	}

	function setCardImages(card, images) {
		const nextImages = images.length ? images : [...defaultProductImages];
		const frame = card.querySelector('.product-image-frame');
		const img = frame?.querySelector('.product-image-img');

		card.dataset.images = JSON.stringify(nextImages);
		card.dataset.imageIndex = '0';
		if (img) img.src = nextImages[0];
	}

	function showCardImage(card, direction) {
		const images = getCardImages(card);
		if (!images.length) return;

		const currentIndex = Number(card.dataset.imageIndex || 0);
		const nextIndex = (currentIndex + direction + images.length) % images.length;
		const img = card.querySelector('.product-image-img');

		card.dataset.imageIndex = String(nextIndex);
		if (img) img.src = images[nextIndex];
	}

	function createPreview(src) {
		const preview = document.createElement('div');
		preview.className = 'product-image-preview d-flex align-items-center justify-content-center';
		preview.innerHTML = `
			<button type="button" class="remove-preview">x</button>
			<img class="product-image-img" src="${escapeHtml(src)}" alt="Product image">
		`;
		return preview;
	}

	function renderImagePreviews() {
		if (!imageList) return;
		imageList.innerHTML = '';
		modalImages.forEach(src => imageList.appendChild(createPreview(src)));
	}

	function resetProductOptionSwitches() {
		productForm.querySelectorAll('.product-switch').forEach(toggle => {
			toggle.classList.add('active');
			toggle.setAttribute('aria-pressed', 'true');
			const label = toggle.parentElement?.querySelector('.product-switch-label');
			if (label) label.textContent = 'Enable';
		});

		productForm.querySelectorAll('.product-option-group').forEach(group => {
			group.classList.remove('is-disabled');
			group.querySelectorAll('.product-checkbox').forEach(input => {
				input.disabled = false;
			});
			group.querySelectorAll('.product-default-radio').forEach(input => {
				input.disabled = !input.closest('label')?.querySelector('.product-checkbox')?.checked;
			});
			group.querySelectorAll('label').forEach(label => {
				const defaultRadio = label.querySelector('.product-default-radio');
				const defaultStar = label.querySelector('.product-default-star');
				if (!defaultRadio || !defaultStar) return;
				defaultStar.classList.toggle('text-warning', defaultRadio.checked);
				defaultStar.classList.toggle('text-muted', !defaultRadio.checked);
			});
		});
	}

	function readImageFile(file) {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onload = () => resolve(reader.result);
			reader.onerror = reject;
			reader.readAsDataURL(file);
		});
	}

	function openProductModal(mode, card) {
		if (typeof bootstrap === 'undefined') return;

		activeProductCard = mode === 'edit' ? card : null;
		productModalTitle.textContent = mode === 'edit' ? 'Edit Product' : 'Add New Product';
		productForm.dataset.mode = mode;
		productForm.reset();

		if (mode === 'edit' && card) {
			productNameInput.value = getProductContent(card, 'Product Name');
			productContentInput.value = getProductContent(card, 'Content Article');
			modalImages = getCardImages(card);
		} else {
			productNameInput.value = '';
			productContentInput.value = '';
			modalImages = [];
		}

		resetProductOptionSwitches();
		renderImagePreviews();
		bootstrap.Modal.getOrCreateInstance(productModalElement).show();
	}

	function buildProductCard(name, content, images) {
		const cardImages = images.length ? images : [...defaultProductImages];
		const card = document.createElement('div');
		card.className = 'product-display-card border rounded-2 bg-white';
		card.dataset.images = JSON.stringify(cardImages);
		card.dataset.imageIndex = '0';
		card.innerHTML = `
			<div class="product-image-frame d-flex align-items-center justify-content-center bg-white">
				<button type="button" class="product-slide-btn prev">&lt;</button>
				<img class="product-image-img" src="${escapeHtml(cardImages[0])}" alt="Product image">
				<button type="button" class="product-slide-btn next">&gt;</button>
			</div>
			<div class="p-4">
				<div class="product-spec-row">
					<div class="fw-medium">Product Name</div>
					<div>${escapeHtml(name)}</div>
				</div>
				<div class="product-spec-row">
					<div class="fw-medium">Ukuran Brosur</div>
					<div>A4 (297x210mm) (Default), A5 (210x149mm)</div>
				</div>
				<div class="product-spec-row">
					<div class="fw-medium">Jenis Kertas</div>
					<div>Art Paper (default), Art Carton, HVS, Carton BC</div>
				</div>
				<div class="product-spec-row">
					<div class="fw-medium">Laminasi</div>
					<div>Tanpa Laminasi (Default), Glossy, Doff, UV Vernish, Spot UV</div>
				</div>
				<div class="product-spec-row">
					<div class="fw-medium">Sisi Cetak</div>
					<div>Cetak 1 Sisi (default), Cetak Bolak Balik</div>
				</div>
				<div class="product-spec-row">
					<div class="fw-medium">Lipatan</div>
					<div>Tanpa Lipatan (default), 1 Lipatan, 2 Lipatan</div>
				</div>
				<div class="product-spec-row">
					<div class="fw-medium">Content Article</div>
					<div>${escapeHtml(content)}</div>
				</div>
				<div class="product-card-actions d-flex justify-content-between pt-2">
					<button type="button" class="btn btn-link js-product-edit">Edit</button>
					<button type="button" class="btn btn-link js-product-delete">Delete</button>
				</div>
			</div>
		`;
		return card;
	}

	productCardGrid.querySelectorAll('.product-display-card').forEach(card => {
		const images = getCardImages(card);
		setCardImages(card, images.length > 1 ? images : [...defaultProductImages]);
	});

	addProductButton?.addEventListener('click', () => openProductModal('add'));

	addImageButton?.addEventListener('click', () => {
		imageInput?.click();
	});

	imageInput?.addEventListener('change', async () => {
		const files = Array.from(imageInput.files || []).filter(file => file.type.startsWith('image/'));
		const images = await Promise.all(files.map(readImageFile));
		modalImages = modalImages.concat(images);
		renderImagePreviews();
		imageInput.value = '';
	});

	productCardGrid.addEventListener('click', (event) => {
		const editButton = event.target.closest('.js-product-edit');
		const deleteButton = event.target.closest('.js-product-delete');
		const prevButton = event.target.closest('.product-slide-btn.prev');
		const nextButton = event.target.closest('.product-slide-btn.next');
		const card = event.target.closest('.product-display-card');

		if (prevButton && card) {
			showCardImage(card, -1);
			return;
		}

		if (nextButton && card) {
			showCardImage(card, 1);
			return;
		}

		if (editButton && card) {
			openProductModal('edit', card);
			return;
		}

		if (deleteButton && card) {
			const removeCard = () => card.remove();

			if (typeof Swal !== 'undefined') {
				Swal.fire({
					title: 'Delete product?',
					text: 'Data product akan dihapus dari daftar.',
					icon: 'warning',
					showCancelButton: true,
					confirmButtonText: 'Yes',
					cancelButtonText: 'No',
					confirmButtonColor: '#f18700',
					cancelButtonColor: '#bbb0ac'
				}).then((result) => {
					if (result.isConfirmed) removeCard();
				});
				return;
			}

			if (confirm('Delete product?')) removeCard();
		}
	});

	productForm.addEventListener('click', (event) => {
		const toggle = event.target.closest('.product-switch');
		const removePreviewButton = event.target.closest('.remove-preview');

		if (toggle) return;

		if (removePreviewButton) {
			const preview = removePreviewButton.closest('.product-image-preview');
			const index = Array.from(imageList.children).indexOf(preview);
			if (index > -1) {
				modalImages.splice(index, 1);
				renderImagePreviews();
			}
		}
	});

	productForm.addEventListener('submit', (event) => {
		event.preventDefault();

		const name = productNameInput.value.trim();
		const content = productContentInput.value.trim();
		const images = modalImages.length ? modalImages : [...defaultProductImages];

		if (productForm.dataset.mode === 'edit' && activeProductCard) {
			setProductContent(activeProductCard, 'Product Name', name);
			setProductContent(activeProductCard, 'Content Article', content);
			setCardImages(activeProductCard, images);
		} else {
			productCardGrid.appendChild(buildProductCard(name, content, images));
		}

		bootstrap.Modal.getOrCreateInstance(productModalElement).hide();
	});
});
