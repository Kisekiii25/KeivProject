let navButton = document.getElementsByClassName("yo")[0]
let navLinks = document.getElementsByClassName("linksContainer")[0]

const result = document.getElementById('result');
const form = document.getElementById('form');


form.addEventListener('submit', function(e) {
    const formData = new FormData(form);
    e.preventDefault();

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    result.innerHTML = "Please wait..."

    fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
        
        .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
                result.innerHTML = json.message;
            } else {
                console.log(response);
                result.innerHTML = json.message;
            }
        })
        .catch(error => {
            console.log(error);
            result.innerHTML = "Something went wrong!";
        })

        .then(function() {
            form.reset();
            setTimeout(() => {
                result.innerHTML = "Send";
            }, 3000);
        });
});

navButton.addEventListener("click", () =>{
    navLinks.classList.toggle("active");
});

document.getElementById("year").textContent = new Date().getFullYear();
