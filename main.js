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

//About me content toggle
var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");

function opentab(tabname) {
    for (tablink of tablinks) {
        tablink.classList.remove("active-link");
    }

    for (tabcontent of tabcontents) {
        tabcontent.classList.remove("active-tab");
    }
    event.currentTarget.classList.add("active-link");
    document.getElementById(tabname).classList.add("active-tab");
}

//for google sheets
const scriptURL = 'https://script.google.com/macros/s/AKfycbxD3gUubnLHc7EGVQSd47D7BhFlw0V9Tm0gboo_ONuasvRk0ez_9v-EUdHhaPZr1CcV/exec'
const form = document.forms['submit-to-google-sheet']
const msg = document.getElementById("msg");

form.addEventListener('submit', e => {
    e.preventDefault()
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(response => {
            msg.innerHTML = "Sent Successfully!";
            setTimeout(function () {
                msg.innerHTML = "";
            }, 3000);
            form.reset();
        })
        .catch(error => console.error('Error!', error.message))
});

//submit button animation
const submitBtn = document.getElementById("submitbtn");

submitBtn.addEventListener("click", function () {
    submitBtn.classList.add("clicked");
    setTimeout(function () {
        submitBtn.classList.remove("clicked");
    }, 300);
});     