// Toggles collapsed state of topic-tree branches; expands the active branch on load.
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".topic-tree__toggle").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var row = btn.closest(".topic-tree__row");
      var collapsed = row.getAttribute("data-collapsed") === "true";
      row.setAttribute("data-collapsed", collapsed ? "false" : "true");
      btn.textContent = collapsed ? "▾" : "▸";
    });
  });
});

// By Topic tab: clicking a folder filters the article list below instead of
// navigating away, and collapses the tree down to folder levels only.
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("[data-topic-explorer]").forEach(function (explorer) {
    var filteredList = explorer.querySelector("[data-topic-filtered-list]");
    var clearBtn = explorer.querySelector("[data-topic-clear]");
    var items = filteredList ? Array.prototype.slice.call(filteredList.querySelectorAll("[data-sections]")) : [];
    var links = Array.prototype.slice.call(explorer.querySelectorAll("[data-topic-target]"));

    function showFiltered(target) {
      explorer.classList.add("is-filtered");
      if (filteredList) filteredList.hidden = false;
      if (clearBtn) clearBtn.hidden = false;
      items.forEach(function (item) {
        var sections = (item.getAttribute("data-sections") || "").split(",");
        item.hidden = sections.indexOf(target) === -1;
      });
      links.forEach(function (link) {
        link.classList.toggle("is-current", link.getAttribute("data-topic-target") === target);
      });
    }

    function resetFiltered() {
      explorer.classList.remove("is-filtered");
      if (filteredList) filteredList.hidden = true;
      if (clearBtn) clearBtn.hidden = true;
      links.forEach(function (link) { link.classList.remove("is-current"); });
    }
    // Exposed so the "By Topic" tab button can reset this explorer when clicked.
    explorer.__resetTopicExplorer = resetFiltered;

    links.forEach(function (link) {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        showFiltered(link.getAttribute("data-topic-target"));
      });
    });

    if (clearBtn) {
      clearBtn.addEventListener("click", resetFiltered);
    }
  });
});

// Posts page: tab switching (All Posts / By Topic) + client-side title search.
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("[data-tabs]").forEach(function (tabs) {
    var buttons = Array.prototype.slice.call(tabs.querySelectorAll(".tab"));
    var panels = Array.prototype.slice.call(tabs.querySelectorAll(".tab-panel"));
    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var name = btn.getAttribute("data-tab");
        buttons.forEach(function (b) { b.classList.toggle("is-active", b === btn); });
        panels.forEach(function (p) {
          p.classList.toggle("is-active", p.getAttribute("data-panel") === name);
        });
        if (name === "topic") {
          tabs.querySelectorAll("[data-topic-explorer]").forEach(function (explorer) {
            if (explorer.__resetTopicExplorer) explorer.__resetTopicExplorer();
          });
        }
        if (name === "all") {
          tabs.querySelectorAll("[data-post-search]").forEach(function (input) {
            if (input.__resetPostSearch) input.__resetPostSearch();
          });
        }
      });
    });
  });

  var input = document.querySelector("[data-post-search]");
  if (input) {
    var list = document.querySelector("[data-post-list]");
    var searchEmpty = document.querySelector("[data-search-empty]");
    var searchItems = Array.prototype.slice.call(list.querySelectorAll("[data-title]"));
    function filterPosts() {
      var q = input.value.trim().toLowerCase();
      var any = false;
      searchItems.forEach(function (item) {
        var show = item.getAttribute("data-title").indexOf(q) !== -1;
        item.hidden = !show;
        if (show) any = true;
      });
      if (searchEmpty) searchEmpty.hidden = any;
    }
    input.__resetPostSearch = function () {
      input.value = "";
      filterPosts();
    };
    input.addEventListener("input", filterPosts);
  }
});

// Tags page: multi-select chips that AND-filter posts.
document.addEventListener("DOMContentLoaded", function () {
  var root = document.querySelector("[data-tag-filter]");
  if (!root) return;

  var chips = Array.prototype.slice.call(root.querySelectorAll(".tag-chip"));
  var items = Array.prototype.slice.call(root.querySelectorAll("[data-tags]"));
  var clearBtn = root.querySelector("[data-tag-clear]");
  var empty = root.querySelector("[data-tag-empty]");
  var selected = [];

  function apply() {
    var any = false;
    items.forEach(function (item) {
      var tags = (item.getAttribute("data-tags") || "").split(",").filter(Boolean);
      var show = selected.every(function (t) { return tags.indexOf(t) !== -1; });
      item.hidden = !show;
      if (show) any = true;
    });
    if (empty) empty.hidden = any;
    if (clearBtn) clearBtn.hidden = selected.length === 0;
  }

  chips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      var t = chip.getAttribute("data-tag");
      var i = selected.indexOf(t);
      if (i === -1) { selected.push(t); chip.classList.add("is-active"); }
      else { selected.splice(i, 1); chip.classList.remove("is-active"); }
      apply();
    });
  });

  if (clearBtn) {
    clearBtn.addEventListener("click", function () {
      selected = [];
      chips.forEach(function (c) { c.classList.remove("is-active"); });
      apply();
    });
  }
});
