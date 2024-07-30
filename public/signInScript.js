// const { response } = require("express");

const signInForm = document.getElementById("signInForm");
const userinfo = document.getElementById("userinfo");
signInForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = {
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
  };

  console.log(formData);

  fetch("/signin", {
    method: "POST", // Ensure this is a string
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => {
      if (!response.ok) {
        userinfo.innerHTML = "<h1>Username or password is incorrect try again!";
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      userinfo.innerHTML = `${data.user.email}  ${data.token}`;
      localStorage.setItem("token", data.token);
      alert("SignIn successful!");

      document.getElementById("email").value = "";
      document.getElementById("password").value = "";
    });

  // document.getElementById('email').value = "";
  // document.getElementById('password').value = "";
});

if (window.location.pathname === "/profile") {
  fetch("/profile", {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    }
  })
  .then(response => {
    if (response.status === 401) {
      throw new Error("Unauthorized: Please log in.");
    }
    return response.json();
  })
  .then(data => {
    console.log("Profile Data:", data);
  })
  .catch(err => {
    console.error("Error:", err);
  });
  
}
