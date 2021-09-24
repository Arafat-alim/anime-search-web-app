console.log("object");

let loginForm = document.getElementById("login-form");
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
});

let signUp = document.getElementById("btnSign");

signUp.addEventListener("click", (e) => {
  e.preventDefault();
  signup();
});

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    location.replace("../html/home.html");
  }
});

// login part
let login = document.getElementById("btnLog");
login.addEventListener("click", function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  console.log(email, password);
  if (email && password) {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => {
        // const errorCode = error.code;
        const errorMessage = error.message;
        document.getElementById("msg").innerHTML = errorMessage;
      });
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
  } else {
    alert("Input Field cant be an empty");
  }
});

function signup() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  console.log(email, password);
  if (email && password) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((e) => {
        var errormsg = e.message;
        document.getElementById("msg").innerHTML = errormsg;
      });
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
  } else {
    alert("Input Field cant be an empty");
  }
}
