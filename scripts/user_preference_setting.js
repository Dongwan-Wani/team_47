firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        console.log("Success")
        var user = firebase.auth().currentUser;
        var uid = user.uid;
        console.log(uid)
        // db.collection("users").doc(user.uid).update({
        // }, {merge: true})
    } else {
        // No user is signed in.
        console.log("not log-in")
    }
});

let saveButton = document.querySelector("#sButton");
saveButton.addEventListener("click", function () {
    console.log("button clicked.")

    //update food_quality or service_quality fields based on user choice
    food_quality = document.querySelector('input[id="FoodQuality"]').checked
    service_quality = document.querySelector('input[id="ServiceQuality"]').checked

    //only get current logged in user id
    var user = firebase.auth().currentUser;
    var uid = user.uid;
    db.collection("users").doc(user.uid).update({
        "food_quality": food_quality,
        "service_quality": service_quality
    }, { merge: true })
});