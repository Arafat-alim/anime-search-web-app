firebase.auth().onAuthStateChanged((user) => {
  if (!user) {
    location.replace("../index.html");
  } else {
    document.getElementById("Yemail").innerHTML = user.email;
  }
});

let logoutBtn = document.getElementById("logbtn");
logoutBtn.addEventListener("click", () => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      // sign Out Successfully
    })
    .catch((error) => {
      // no error happend
      console.log(error.message);
    });
});
