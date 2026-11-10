(function () {
  "use strict";

  var catalog = window.CYBERDOCS_CATALOG || [];
  var body = document.getElementById("catalog-body");
  var search = document.getElementById("search");
  var category = document.getElementById("category");
  var sort = document.getElementById("sort");
  var resultCount = document.getElementById("result-count");
  var emptyState = document.getElementById("empty-state");
  var reader = document.getElementById("reader");
  var frame = document.getElementById("pdf-frame");
  var loading = document.getElementById("reader-loading");
  var error = document.getElementById("reader-error");
  var currentDocument;

  catalog.forEach(function (documentItem, index) {
    documentItem.number = index + 1;
  });
  Array.from(new Set(catalog.map(function (item) { return item.category; }))).sort().forEach(function (name) {
    var option = document.createElement("option");
    option.value = name;
    option.textContent = name;
    category.appendChild(option);
  });

  function pdfUrl(item) {
    return "pdfs/" + encodeURIComponent(item.filename);
  }

  function displayTitle(item) {
    return item.title.replace(/^\d+\.\s*/, "");
  }

  function render() {
    var query = search.value.trim().toLowerCase();
    var selectedCategory = category.value;
    var items = catalog.filter(function (item) {
      return (!query || item.title.toLowerCase().indexOf(query) !== -1) &&
        (selectedCategory === "all" || item.category === selectedCategory);
    });
    items.sort(function (a, b) {
      if (sort.value === "title") return a.title.localeCompare(b.title);
      if (sort.value === "category") return a.category.localeCompare(b.category) || a.number - b.number;
      return a.number - b.number;
    });
    body.innerHTML = "";
    items.forEach(function (item) {
      var row = document.createElement("tr");
      row.innerHTML = "<td>" + String(item.number).padStart(2, "0") + "</td>" +
        "<td class=\"doc-title\">" + escapeHtml(displayTitle(item)) + "</td>" +
        "<td><span class=\"category-tag\">" + escapeHtml(item.category) + "</span></td>" +
        "<td><button class=\"read-button\" type=\"button\" data-number=\"" + item.number + "\">Read</button></td>";
      body.appendChild(row);
    });
    resultCount.textContent = items.length;
    emptyState.hidden = items.length !== 0;
  }

  function escapeHtml(value) {
    return value.replace(/[&<>"']/g, function (character) {
      return {"&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#039;"}[character];
    });
  }

  function showReader(item) {
    currentDocument = item;
    document.getElementById("reader-title").textContent = displayTitle(item);
    document.getElementById("download-link").href = pdfUrl(item);
    document.getElementById("page-number").value = 1;
    if (!reader.open) reader.showModal();
    loadDocument(1, "page-width");
  }

  function loadDocument(page, zoom) {
    if (!currentDocument) return;
    loading.hidden = false;
    error.hidden = true;
    frame.hidden = true;
    frame.src = pdfUrl(currentDocument) + "#page=" + page + "&zoom=" + zoom;
  }

  function updateReaderView() {
    var page = Math.max(1, Number(document.getElementById("page-number").value) || 1);
    loadDocument(page, document.getElementById("zoom").value);
  }

  body.addEventListener("click", function (event) {
    var button = event.target.closest(".read-button");
    if (button) showReader(catalog[Number(button.dataset.number) - 1]);
  });
  frame.addEventListener("load", function () { loading.hidden = true; frame.hidden = false; });
  document.getElementById("retry-reader").addEventListener("click", updateReaderView);
  document.getElementById("close-reader").addEventListener("click", function () { reader.close(); frame.src = "about:blank"; });
  document.getElementById("go-page").addEventListener("click", updateReaderView);
  document.getElementById("zoom").addEventListener("change", updateReaderView);
  search.addEventListener("input", render);
  category.addEventListener("change", render);
  sort.addEventListener("change", render);
  render();
}());
