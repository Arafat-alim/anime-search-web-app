console.log("Script Loaded");
//! getting data from the form

let submit = document.getElementById("submit");

submit.addEventListener("click", async (e) => {
  e.preventDefault();
  let fname = document.getElementById("fname").value;
  let lname = document.getElementById("lname").value;
  let email = document.getElementById("email").value;
  let msg = document.getElementById("mesasge").value;
  let extra = document.getElementById("extraDetail").value;

  //! Validation
  if (fname && lname && email && msg) {
    //   ! sending the datas to the firebase
    let res = await fetch(
      "https://contactus-ec3b4-default-rtdb.firebaseio.com/contactus.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: fname,
          lastName: lname,
          emailId: email,
          comment: msg,
          ExtraComment: extra,
        }),
      }
    );
    if (res) {
      document.getElementById("fname").value = "";
      document.getElementById("lname").value = "";
      document.getElementById("email").value = "";
      document.getElementById("mesasge").value = "";
      document.getElementById("extraDetail").value = "";
    }
    alert("Thank You For Your Valuable Feedback!");
    res.catch((err) => alert(err));
  } else {
    alert("Please Fill the required Fields.");
  }
});
