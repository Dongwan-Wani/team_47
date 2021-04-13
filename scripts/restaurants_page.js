const params = new URLSearchParams(window.location.search)
const restaurant_name = params.get('name')

function add_dishes(id, name, pic) {
    //create a parent div
    let dish_name = document.createElement("div")

    //assign class to restaurant_name
    dish_name.className = "img_div d-flex flex-column align-items-center me-5 mb-1"

    //create an image div inside parent div  
    let img_div = document.createElement("div")
    img_div.className = "food mb-2 pe-3 pt-1"  // set a class

    let image = document.createElement("img")
    image.setAttribute("src", pic)
    let a_link = document.createElement("a")
    a_link.setAttribute("href", "#")
    a_link.appendChild(image)
    img_div.appendChild(a_link)

    //create a div for Dish name
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

    let number_p = document.createElement("p")
    like_div.appendChild(number_p)

    //attache event listener to thumb
    addLikeListener(id, like, number_p)


    //append child divs to parent div
    dish_name.appendChild(img_div)
    dish_name.appendChild(text_div)
    dish_name.appendChild(like_div)

    document.getElementsByClassName("restaurant")[0].appendChild(dish_name)
}



function readrestaurants(restaurant_name) {
    // let reference = db.collection("categories").doc(category)
    db.collection("dishes").where("restaurant", "==", restaurant_name)
        .get()
        .then(function (query) {
            readRestaurantInfo(restaurant_name)
            query.forEach(function (document) {
                // add_restaurant(document.id, document.get("name"), document.get("pictures"), "Food quality")
                console.log(document.id, document.get("dish_name"), document.get("restaurant"))
                add_dishes(document.id, document.get("dish_name"), document.get("images"))
            })
        })
}

function readRestaurantInfo(restaurant_name) {
    db.collection("restaurants").where("name", "==", restaurant_name)
        .get()
        .then(function (snap) {
            snap.forEach(function (doc) {
                var name = doc.data().name;
                var info = doc.data().info;
                var picture = doc.data().pictures;
                $("#name-goes-here").text(name);
                $("#info-goes-here").text(info);
                $("#resPicture").attr("src", picture);

                console.log(name)
                console.log(info)
                console.log(picture)


            })
        })
}

function addLikeListener(id, like, number_p) {
    firebase.auth().onAuthStateChanged(function (user) {
        like.addEventListener("click", function () {
            console.log("like was click!")
            db.collection("dishes")
                .doc(id)
                .update({
                    foodqualityscore: firebase.firestore.FieldValue.increment(1) //increments like!
                })

        })
    })

    db.collection("dishes")
        .doc(id)
        .onSnapshot(function (snap) {
            number_p.innerText = snap.get("foodqualityscore")
        })
}

function writeDishes() {
    var DishesRef = db.collection("dishes");
    // Bibimbap
    // Tteok-bokki
    DishesRef.add({
        dish_name: "Tteok-bokki",
        images: "./imges/dishes/food1.PNG",
        restaurant: "Haru",
        foodqualityscore: 0
    });

}

console.log(restaurant_name);
readrestaurants(restaurant_name);