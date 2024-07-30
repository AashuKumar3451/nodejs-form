const signup = document.getElementById('signup');
const signin = document.getElementById('signin');

signup.addEventListener('click',(e)=>{
    e.preventDefault();
    const currentURL = window.location.origin;
    window.location.href = currentURL + "/signup";
});

signin.addEventListener('click',(e)=>{
    e.preventDefault();
    const currentURL = window.location.origin;
    window.location.href = currentURL + "/signin";
});

