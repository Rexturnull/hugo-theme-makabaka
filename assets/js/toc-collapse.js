// Toggles the floating article TOC's body open/closed.
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("[data-toc-toggle]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var toc = btn.closest("[data-toc]");
      var collapsed = toc.classList.toggle("is-collapsed");
      btn.innerHTML = collapsed ? "&#9656;" : "&#9662;";
    });
  });

  document.querySelectorAll("[data-toc-top]").forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });
});
