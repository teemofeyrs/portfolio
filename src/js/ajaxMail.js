window.addEventListener("DOMContentLoaded", function () {

        // get the form elements defined in your form HTML above

        let form = document.querySelector("#contactForm");
        let button = document.getElementById("sendEmail");
        let name = document.getElementById("contact-name");
        let email = document.getElementById("contact-email");
        let message = document.getElementById("contact-message");

        let status = document.getElementById("messAlert");


    form.onsubmit = async (e) => {
        e.preventDefault();

        let formD = new FormData();
        formD.append('name' , name.value);
        formD.append('email' , email.value);
        formD.append('message' , message.value);
        let response = await fetch('https://formspree.io/f/maylnpja', {
            method: 'POST',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                // "Content-Type": "multipart/form-data",
            },
            body: formD
        });

        let result = await response.json();

        alert(result.message);
    };


    }
);
