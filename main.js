// main.js

//Carousel functionality   
let index = 0;
const slides = document.getElementById("slides");
const totalSlides = slides.children.length;

function showSlide(i) {
    slides.style.transform = `translateX(-${i * 100}%)`;
}

function nextSlide() {
    index = (index + 1) % totalSlides;
    showSlide(index);
}

function prevSlide() {
    index = (index - 1 + totalSlides) % totalSlides;
    showSlide(index);
}

// Auto slide every 5 seconds
setInterval(nextSlide, 5000);

// About-Me section functionality
const aboutmeTabs = document.querySelectorAll('.aboutme-tab');
const aboutmeContents = document.querySelectorAll('.aboutme-tab-content');

aboutmeTabs.forEach(tab => {

    tab.addEventListener('click', () => {

        aboutmeTabs.forEach(btn =>
            btn.classList.remove('active'));

        aboutmeContents.forEach(content =>
            content.classList.remove('active'));

        tab.classList.add('active');

        document
            .getElementById(tab.dataset.tab)
            .classList.add('active');
    });

});

const aboutmeItems =
    document.querySelectorAll('.aboutme-icon-item');

const aboutmeModal =
    document.querySelector('.aboutme-modal');

const aboutmeOverlay =
    document.querySelector('.aboutme-overlay');

const aboutmeTitle =
    document.getElementById('aboutme-modal-title');

const aboutmeDesc =
    document.getElementById('aboutme-modal-desc');

aboutmeItems.forEach(item => {

    item.addEventListener('click', () => {

        aboutmeTitle.textContent =
            item.dataset.title || 'Details';

        aboutmeDesc.textContent =
            item.dataset.desc || 'No description available.';

        aboutmeModal.classList.add('active');
        aboutmeOverlay.classList.add('active');

    });

});

function closeAboutModal() {

    aboutmeModal.classList.remove('active');
    aboutmeOverlay.classList.remove('active');
}

document
    .querySelector('.aboutme-close-btn')
    .addEventListener('click', closeAboutModal);

aboutmeOverlay.addEventListener(
    'click',
    closeAboutModal
);

document.addEventListener('keydown', e => {

    if (e.key === 'Escape') {
        closeAboutModal();
    }

});


