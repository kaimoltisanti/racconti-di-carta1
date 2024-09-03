const accordions = document.querySelectorAll(".wave__accordion");

accordions.forEach((accordion) => {
    const title = accordion.querySelector('.wave__accordion__title');
    
    // Aggiungi l'evento di click solo sul titolo dell'accordion
    title.addEventListener("click", () => {
        accordion.classList.toggle("active");
    });
});
