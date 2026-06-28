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


"use strict";
/* =====================================================
   Google Form Configuration
===================================================== */

const GOOGLE_FORM = {
    action: "https://docs.google.com/forms/d/e/1FAIpQLSeuUp7SQhnHs6sZXgPnQP0cx64m3WW54mNzc2Nq1Sjd-sGkfw/formResponse",

    fields: {
        name: "entry.1708362030",
        email: "entry.1808703948",
        subject: "entry.583846681",
        message: "entry.1373481183"
    }
};

/* =====================================================
   Portfolio Contact Form
===================================================== */

document.addEventListener("DOMContentLoaded", initializeContactForm);

/* =====================================================
   Initialize
===================================================== */

function initializeContactForm() {

    console.log("Contact module initialized.");

    const form = document.getElementById("contactForm");

    const elements = {
        name: document.getElementById("name"),
        email: document.getElementById("email"),
        subject: document.getElementById("subject"),
        message: document.getElementById("message"),
        website: document.getElementById("website"),
        submitButton: form.querySelector("button")
    };

    const status = document.createElement("div");
    status.id = "contact-status";
    form.appendChild(status);

    form.addEventListener("submit", async function (event) {

        event.preventDefault();

        clearStatus(status);

        const validation = validateForm(elements);

        if (!validation.valid) {

            showStatus(status, validation.message, "error");

            return;

        }

        showStatus(status, "Sending...", "success");

        elements.submitButton.disabled = true;

        elements.submitButton.innerHTML =
            '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';

        try {

            await sendToGoogleForm(elements);

            showStatus(
                status,
                "✓ Thank you! Your message has been sent.",
                "success"
            );

            form.reset();

        }
        catch (error) {

            console.error(error);

            showStatus(
                status,
                "Unable to send your message.",
                "error"
            );

        }
        finally {

            elements.submitButton.disabled = false;

            elements.submitButton.innerHTML =
                '<i class="fa-solid fa-paper-plane"></i> Send Message';

        }

    });

}

/* =====================================================
   Validation
===================================================== */

function validateForm(elements) {

    if (elements.name.value.trim().length < 2) {

        return {
            valid: false,
            message: "Please enter your name."
        };

    }

    if (!validateEmail(elements.email.value.trim())) {

        return {
            valid: false,
            message: "Please enter a valid email address."
        };

    }

    if (elements.subject.value.trim().length < 3) {

        return {
            valid: false,
            message: "Please enter a subject."
        };

    }

    if (elements.message.value.trim().length < 10) {

        return {
            valid: false,
            message: "Your message is too short."
        };

    }

    return {
        valid: true
    };

}

/* =====================================================
   Email Validation
===================================================== */

function validateEmail(email) {

    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return pattern.test(email);

}

/* =====================================================
   Google Form Service
===================================================== */

async function sendToGoogleForm(elements) {

    const formData = new FormData();

    formData.append(
        GOOGLE_FORM.fields.name,
        elements.name.value.trim()
    );

    formData.append(
        GOOGLE_FORM.fields.email,
        elements.email.value.trim()
    );

    formData.append(
        GOOGLE_FORM.fields.subject,
        elements.subject.value.trim()
    );

    formData.append(
        GOOGLE_FORM.fields.message,
        elements.message.value.trim()
    );

    await fetch(GOOGLE_FORM.action, {

        method: "POST",

        mode: "no-cors",

        body: formData

    });

}

/* =====================================================
   Status Messages
===================================================== */

function showStatus(statusElement, message, type) {

    statusElement.textContent = message;

    statusElement.className = type;

}

function clearStatus(statusElement) {

    statusElement.textContent = "";

    statusElement.className = "";

}