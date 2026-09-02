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
document.addEventListener("DOMContentLoaded", () => {
    const portfolioSection = document.querySelector(".portfolio-about");

    if (!portfolioSection) return;

    const tabs = portfolioSection.querySelectorAll(
        ".portfolio-about__tab"
    );

    const panels = portfolioSection.querySelectorAll(
        ".portfolio-about__panel"
    );

    tabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            const targetId = tab.dataset.tab;

            // Remove active state from tabs
            tabs.forEach((item) => {
                item.classList.remove("portfolio-about__tab--active");
            });

            // Hide all panels
            panels.forEach((panel) => {
                panel.classList.remove("portfolio-about__panel--active");
            });

            // Activate clicked tab
            tab.classList.add("portfolio-about__tab--active");

            // Show corresponding panel
            const targetPanel = portfolioSection.querySelector(
                `#${targetId}`
            );

            if (targetPanel) {
                targetPanel.classList.add(
                    "portfolio-about__panel--active"
                );
            }
        });
    });
});


//CONTACT ME

"use strict";

//CONTACT FORM CONFIGURATION

const GOOGLE_FORM = {
    action:
        "https://docs.google.com/forms/d/e/1FAIpQLSeuUp7SQhnHs6sZXgPnQP0cx64m3WW54mNzc2Nq1Sjd-sGkfw/formResponse",

    fields: {
        name: "entry.1708362030",
        email: "entry.1808703948",
        subject: "entry.583846681",
        message: "entry.1373481183"
    }
};

//APPLICATION ENTRY POINT

document.addEventListener("DOMContentLoaded", initializeContactForm);

//CONTACT FORM INITIALIZATION

function initializeContactForm() {

    console.log("Contact module initialized.");

    const form = document.getElementById("contactForm");

    if (!form) return;

    const elements = cacheFormElements(form);

    const status = createStatusElement(form);

    initializeCharacterCounter(elements);

    registerEventListeners(form, elements, status);

}

//DOM ELEMENT CAHCE

function cacheFormElements(form) {

    return {

        name: document.getElementById("name"),

        email: document.getElementById("email"),

        subject: document.getElementById("subject"),

        message: document.getElementById("message"),

        messageCount: document.getElementById("messageCount"),

        website: document.getElementById("website"),

        submitButton: form.querySelector("button")

    };

}

//STATUS ELEMENT

function createStatusElement(form) {

    const status = document.createElement("div");

    status.id = "contact-status";

    form.appendChild(status);

    return status;

}

//CHARACTER COUNTER INITIALIZATION

function initializeCharacterCounter(elements) {

    updateCharacterCounter(elements);

    elements.message.addEventListener("input", () => {

        updateCharacterCounter(elements);

    });

}

//EVENT LISTENERS

function registerEventListeners(form, elements, status) {

    form.addEventListener("submit", (event) =>

        handleFormSubmission(event, form, elements, status)

    );

}

//FORM SUBMISSION

async function handleFormSubmission(event, form, elements, status) {

    event.preventDefault();

    if (!form.reportValidity()) {

        return;

    }

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

    elements.name.value = sanitizeInput(elements.name.value);

    elements.email.value = sanitizeInput(elements.email.value);

    elements.subject.value = sanitizeInput(elements.subject.value);

    elements.message.value = sanitizeMessage(elements.message.value);

    try {

        await sendToGoogleForm(elements);

        showStatus(
            status,
            "✓ Thank you! Your message has been sent.",
            "success"
        );

        form.reset();

        updateCharacterCounter(elements);

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

}

//FORM VALIDATION

function validateForm(elements) {

    // Honeypot protection
    if (elements.website.value.trim() !== "") {

        return {
            valid: false,
            message: "Submission rejected."
        };

    }

    // Message length
    if (elements.message.value.length > 1000) {

        return {
            valid: false,
            message: "Message cannot exceed 1000 characters."
        };

    }

    // Name
    if (elements.name.value.trim().length < 2) {

        return {
            valid: false,
            message: "Please enter your name."
        };

    }

    // Email
    if (!validateEmail(elements.email.value.trim())) {

        return {
            valid: false,
            message: "Please enter a valid email address."
        };

    }

    // Subject
    if (elements.subject.value.trim().length < 3) {

        return {
            valid: false,
            message: "Please enter a subject."
        };

    }

    // Message
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

//USER INTERFACE COMPONENTS

function updateCharacterCounter(elements) {

    const length = elements.message.value.length;

    const counter = elements.messageCount.parentElement;

    elements.messageCount.textContent = length;

    counter.classList.remove("warning", "danger");

    if (length >= 800 && length < 950) {

        counter.classList.add("warning");

    }

    if (length >= 950) {

        counter.classList.add("danger");

    }

}

//INPT SANITIZATION

function sanitizeInput(text) {

    return text
        .trim()
        .replace(/\s+/g, " ");

}

function sanitizeMessage(text) {

    return text
        .trim()
        .replace(/\r\n/g, "\n")
        .replace(/\n{3,}/g, "\n\n");

}

//INPUT VALIDATION UTILITIES

function validateEmail(email) {

    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return pattern.test(email);

}

//GOOGLE FORMS SERVICE

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

//STATUS MESSAGE UTILITIES

function showStatus(statusElement, message, type) {

    statusElement.textContent = message;

    statusElement.className = type;

}

function clearStatus(statusElement) {

    statusElement.textContent = "";

    statusElement.className = "";

}