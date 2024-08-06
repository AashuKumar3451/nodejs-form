const userinfo = document.getElementById('userinfo');
const signUpForm = document.getElementById('signUpForm');
signUpForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = {
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
    };

    console.log(formData);

    fetch('/signup', {
        method: 'POST', // Ensure this is a string
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        userinfo.innerHTML = `${data.user.email}  ${data.token}`;
        alert("SignUp successful!");
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        userinfo.innerHTML="<h1>Email selection is not good select some other email."
    });

    document.getElementById('email').value = "";
    document.getElementById('password').value = "";
});

