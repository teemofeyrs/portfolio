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

    // Success and Error functions for after the form is submitted

      /*  function success() {
            form.reset();
            button.style = "display: none ";
            status.innerHTML = "Thanks!";
        }

        function error() {
            status.innerHTML = "Oops! There was a problem.";
        }

        // handle the form submission event

        form.addEventListener("submit", function (ev) {
            ev.preventDefault();
            let data = new FormData(form);
            ajax(form.method, form.action, data, success, error);
        });*/
    }
);

// helper function for sending an AJAX request

/*
function ajax(method, url, data, success, error) {
    let xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState !== XMLHttpRequest.DONE) return;
        if (xhr.status === 200) {
            success(xhr.response, xhr.responseType);
        } else {
            error(xhr.status, xhr.response, xhr.responseType);
        }
    };
    xhr.send(data);
}*/
