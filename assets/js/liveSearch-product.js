fetch("/assets/json/product.json")
  .then((res) => res.json())
  .then((data) => {
    const products = data.product || [];

    function initProductSearch(input, resultBox) {
      function renderList(list) {
        resultBox.innerHTML = "";

        if (list.length === 0) {
          resultBox.innerHTML = '<div class="p-2 text-muted text-center">No results found</div>';
          return;
        }

        list.forEach((product) => {
          const item = document.createElement("div");
          item.className = "customer-item";
          item.innerHTML = `
            <div class="fw-semibold">${product.name}</div>
            <div class="text-muted small">${product.code} - ${product.category}</div>
          `;

          item.addEventListener("click", () => {
            input.value = product.name;
            input.dispatchEvent(new Event("input"));
            resultBox.style.display = "none";
          });

          resultBox.appendChild(item);
        });
      }

      renderList(products.slice(0, 5));

      input.addEventListener("input", (event) => {
        const query = event.target.value.trim().toLowerCase();

        if (query.length < 3) {
          renderList(products.slice(0, 5));
          resultBox.style.display = "block";
          return;
        }

        const filtered = products.filter((product) => {
          return (
            product.name.toLowerCase().includes(query) ||
            product.code.toLowerCase().includes(query) ||
            product.category.toLowerCase().includes(query)
          );
        });

        renderList(filtered);
        resultBox.style.display = "block";
      });

      input.addEventListener("focus", () => {
        renderList(products.slice(0, 5));
        resultBox.style.display = "block";
      });

      document.addEventListener("click", (event) => {
        if (!event.target.closest(".search-container")) {
          resultBox.style.display = "none";
        }
      });
    }

    document.querySelectorAll(".product-input").forEach((input) => {
      const container = input.closest(".search-container");

      if (!container) {
        return;
      }

      const resultBox = container.querySelector(".search-results");

      if (!resultBox) {
        return;
      }

      initProductSearch(input, resultBox);
    });
  });
