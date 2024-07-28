const accordions = document.querySelectorAll(".wave__accordion");

accordions.forEach((accordion) => {
    accordion.addEventListener("click", () => {
        console.log("Accordion clicked!"); // Aggiungi questo per il debug
        accordion.classList.toggle("active");
    });
});