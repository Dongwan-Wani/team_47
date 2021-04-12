
function readRestaurants() {
    firebase.auth().onAuthStateChanged(function (user) {
        var user = firebase.auth().currentUser;
        var uid = user.uid;
        db.collection("users").doc(uid)
            .get().then(function (doc) {
                if (doc.data().food_quality) {
                    db.collection("restaurants")
                        .get()
                        .then(function (query) {
                            query.forEach(function (doc) {
                                if (doc.data().foodqualityscore >= doc.data().servicequalityscore) {
                                    add_restaurants(doc.id, doc.data().name, doc.data().pictures)
                                }
                            })
                        })

                } else {
                    db.collection("restaurants")
                        .get()
                        .then(function (query) {
                            query.forEach(function (doc) {
                                if (doc.data().foodqualityscore < doc.data().servicequalityscore) {
                                    add_restaurants(doc.id, doc.data().name, doc.data().pictures)
                                }
                            })
                        })
                }


            })

    })
}


readRestaurants();

function add_restaurants(id, name, pic) {
    //create a parent div
    let restaurant_name = document.createElement("div")

    //assign class to restaurant_name
    restaurant_name.className = "img_div d-flex flex-column align-items-center me-5 mb-1"

    //create an image div inside parent div  
    let img_div = document.createElement("div")
    img_div.className = "food mb-2 pe-3 pt-1"  // set a class

    let image = document.createElement("img")
    image.setAttribute("src", pic)
    let a_link = document.createElement("a")
    a_link.setAttribute("href", "restaurants_page.html?name=" + name)
    a_link.appendChild(image)
    img_div.appendChild(a_link)

    //create a div for restaurant name
    let text_div = document.createElement("div")
    let header = document.createElement("h5")
    text_div.appendChild(header)
    header.innerText = name

    //create a like button
    let like_div = document.createElement("div")

    //create a class to create hover effect in css
    like_div.className = "thumb"
    let like = document.createElement("h5")
    like.innerHTML = '<button type="button" class="btn btn-sm btn-outline-secondary"><i class="bi bi-hand-thumbs-up-fill"></i> Likes</button>'
    like_div.appendChild(like)

    //create a second like button
    let like_div2 = document.createElement("div")

    //create a class to create hover effect in css
    like_div2.className = "thumb"
    let like2 = document.createElement("h5")
    like2.innerHTML = '<button type="button" class="btn btn-sm btn-outline-secondary"><i class="bi bi-hand-thumbs-up-fill"></i> Likes</button>'
    like_div2.appendChild(like2)

    //number_p is the amount of likes for food quality
    let number_p = document.createElement("p")
    like_div.appendChild(number_p)


    let number_p2 = document.createElement("p")
    like_div2.appendChild(number_p2)


    //attache event listener to the first thumb
    addLikeListener(id, like, number_p)

    //attache event listener to the second thumb
    addLikeListener2(id, like2, number_p2)


    //append child divs to parent div
    restaurant_name.appendChild(img_div)
    restaurant_name.appendChild(text_div)
    restaurant_name.appendChild(like_div)
    restaurant_name.appendChild(like_div2)

    document.getElementsByClassName("restaurant")[0].appendChild(restaurant_name)
}

function addLikeListener(id, like, number_p) {
    firebase.auth().onAuthStateChanged(function (user) {
        like.addEventListener("click", function () {
            console.log("like was click!")
            db.collection("restaurants")
                .doc(id)
                .update({
                    foodqualityscore: firebase.firestore.FieldValue.increment(1) //increments like!
                })

        })
    })

    db.collection("restaurants")
    .doc(id)
    .onSnapshot(function(snap){
        number_p.innerText="food quality " + snap.get("foodqualityscore")
    })
}

function addLikeListener2(id, like2, number_p2) {
    firebase.auth().onAuthStateChanged(function (user) {
        like2.addEventListener("click", function () {
            console.log("like was click!")
            db.collection("restaurants")
                .doc(id)
                .update({
                    servicequalityscore: firebase.firestore.FieldValue.increment(1) //increments like!
                })

        })
    })

    db.collection("restaurants")
    .doc(id)
    .onSnapshot(function(snap){
        number_p2.innerHTML="service quality " + snap.get("servicequalityscore")
    })
}
