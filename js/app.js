
document.addEventListener("DOMContentLoaded", function() {
var enlaces = document.querySelectorAll(".menu__item > a");

enlaces.forEach(function(enlace) {
    enlace.addEventListener("click", function(event) {
    event.preventDefault();

    enlaces.forEach(function(e) {
        e.classList.remove("active");
    });

    enlace.classList.add("active");
    });
});
});

