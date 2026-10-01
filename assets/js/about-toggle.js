// Switches the About page between Chinese and English, persisted in localStorage.
document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.querySelector("[data-lang-toggle]");
  if (!toggle) return;

  function setLang(lang) {
    document.body.classList.remove("lang-zh", "lang-en");
    document.body.classList.add("lang-" + lang);
    toggle.querySelectorAll("button").forEach(function (btn) {
      btn.classList.toggle("is-active", btn.getAttribute("data-lang") === lang);
    });
    localStorage.setItem("makabaka-lang", lang);
  }

  toggle.querySelectorAll("button").forEach(function (btn) {
    btn.addEventListener("click", function () {
      setLang(btn.getAttribute("data-lang"));
    });
  });

  setLang(localStorage.getItem("makabaka-lang") || "zh");
});
