(function () {
  "use strict";

  var catalog = (window.CYBERDOCS_CATALOG || []).map(function (item, index) {
    return {
      title: item.title,
      displayTitle: item.title.replace(/^\d+\.\s*/, ""),
      searchTitle: item.title.toLowerCase(),
      category: item.category,
      number: index + 1,
      url: "pdfs/" + encodeURIComponent(item.filename)
    };
  });
  var elements = {
    body: document.getElementById("catalog-body"),
    search: document.getElementById("search"),
    category: document.getElementById("category"),
    sort: document.getElementById("sort"),
    resultCount: document.getElementById("result-count"),
    emptyState: document.getElementById("empty-state"),
    reader: document.getElementById("reader"),
    frame: document.getElementById("pdf-frame"),
    loading: document.getElementById("reader-loading"),
    readerTitle: document.getElementById("reader-title"),
    downloadLink: document.getElementById("download-link"),
    pageNumber: document.getElementById("page-number"),
    zoom: document.getElementById("zoom")
  };
  var currentDocument = null;
  var loadingTimer = null;
  var renderFrame = null;
  var collator = new Intl.Collator(undefined, { sensitivity: "base" });

  Array.from(new Set(catalog.map(function (item) { return item.category; })))
    .sort(collator.compare)
    .forEach(function (name) {
      var option = document.createElement("option");
      option.value = name;
      option.textContent = name;
      elements.category.appendChild(option);
    });

  function pdfUrl(item) {
    return item.url;
  }

  function render() {
    var query = elements.search.value.trim().toLowerCase();
    var selectedCategory = elements.category.value;
    var items = catalog.filter(function (item) {
      return (!query || item.searchTitle.includes(query)) &&
        (selectedCategory === "all" || item.category === selectedCategory);
    });
    items.sort(function (a, b) {
      if (elements.sort.value === "title") return collator.compare(a.displayTitle, b.displayTitle);
      if (elements.sort.value === "category") return collator.compare(a.category, b.category) || a.number - b.number;
      return a.number - b.number;
    });
    var fragment = document.createDocumentFragment();
    items.forEach(function (item) {
      var row = document.createElement("tr");
      var numberCell = document.createElement("td");
      numberCell.textContent = String(item.number).padStart(2, "0");
      var titleCell = document.createElement("td");
      titleCell.className = "doc-title";
      titleCell.textContent = item.displayTitle;
      var categoryCell = document.createElement("td");
      var categoryTag = document.createElement("span");
      categoryTag.className = "category-tag";
      categoryTag.textContent = item.category;
      categoryCell.appendChild(categoryTag);
      var actionCell = document.createElement("td");
      var readButton = document.createElement("button");
      readButton.className = "read-button";
      readButton.type = "button";
      readButton.dataset.number = item.number;
      readButton.textContent = "Read";
      actionCell.appendChild(readButton);
      row.append(numberCell, titleCell, categoryCell, actionCell);
      fragment.appendChild(row);
    });
    elements.body.replaceChildren(fragment);
    elements.resultCount.textContent = items.length;
    elements.emptyState.hidden = items.length !== 0;
  }

  function scheduleRender() {
    if (renderFrame !== null) return;
    renderFrame = window.requestAnimationFrame(function () {
      renderFrame = null;
      render();
    });
  }

  function showReader(item) {
    currentDocument = item;
    elements.readerTitle.textContent = item.displayTitle;
    elements.downloadLink.href = pdfUrl(item);
    elements.pageNumber.value = 1;
    if (!elements.reader.open) elements.reader.showModal();
    loadDocument(1, "page-width");
  }

  function loadDocument(page, zoom) {
    if (!currentDocument) return;
    window.clearTimeout(loadingTimer);
    elements.loading.hidden = false;
    elements.frame.hidden = true;
    elements.frame.src = pdfUrl(currentDocument) + "#page=" + page + "&zoom=" + zoom;
    loadingTimer = window.setTimeout(showFrame, 1500);
  }

  function showFrame() {
    elements.loading.hidden = true;
    elements.frame.hidden = false;
  }

  function updateReaderView() {
    var page = Math.max(1, Number(elements.pageNumber.value) || 1);
    elements.pageNumber.value = page;
    loadDocument(page, elements.zoom.value);
  }

  elements.body.addEventListener("click", function (event) {
    var button = event.target.closest(".read-button");
    if (button) showReader(catalog[Number(button.dataset.number) - 1]);
  });
  elements.frame.addEventListener("load", function () {
    window.clearTimeout(loadingTimer);
    showFrame();
  });
  var closeReader = document.getElementById("close-reader");
  var goPage = document.getElementById("go-page");
  closeReader.addEventListener("click", function () {
    elements.reader.close();
    elements.frame.src = "about:blank";
    window.clearTimeout(loadingTimer);
    currentDocument = null;
  });
  goPage.addEventListener("click", updateReaderView);
  elements.pageNumber.addEventListener("keydown", function (event) {
    if (event.key === "Enter") updateReaderView();
  });
  elements.zoom.addEventListener("change", updateReaderView);
  elements.search.addEventListener("input", scheduleRender);
  elements.category.addEventListener("change", scheduleRender);
  elements.sort.addEventListener("change", scheduleRender);
  render();
}());
