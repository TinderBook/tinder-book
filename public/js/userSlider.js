
document.addEventListener('DOMContentLoaded', (event) => {
    // Todo el código que ya tienes en userSlider.js

let currentSlide = 0;
const userContainers = document.querySelectorAll('.user-container');
const prevButton = document.querySelector('.slider-button.prev');
const nextButton = document.querySelector('.slider-button.next');

console.log('Número de usuarios:', userContainers.length); // Debería mostrar el número de usuarios en la consola.

prevButton.addEventListener('click', () => {
    console.log('Botón anterior presionado'); // Debería mostrar este mensaje cada vez que hagas clic en el botón previo.
    currentSlide--;
    if (currentSlide < 0) {
        currentSlide = userContainers.length - 1;
    }
    updateSlider();
});

nextButton.addEventListener('click', () => {
    console.log('Botón siguiente presionado'); // Debería mostrar este mensaje cada vez que hagas clic en el botón siguiente.
    currentSlide++;
    if (currentSlide > userContainers.length - 1) {
        currentSlide = 0;
    }
    updateSlider();
});

function updateSlider() {
    const transformValue = -currentSlide * 100;
    const usersWrapper = document.querySelector('.users-wrapper');
    usersWrapper.style.transform = `translateX(${transformValue}%)`;
    console.log('Actualizando slider a slide:', currentSlide); // Debería mostrar el índice actual del slide.
}
});