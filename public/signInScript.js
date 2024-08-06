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
      alert("SignIn successful!");
      localStorage.setItem("token", data.token);

      document.getElementById("email").value = "";
      document.getElementById("password").value = "";
    });

});

