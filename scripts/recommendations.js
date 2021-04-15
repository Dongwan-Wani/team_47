
// order dishes by food qulity score and retrieve top three dishes
function dishQuery() {
    top_three = []
    db.collection("dishes")
        .orderBy("foodqualityscore", "desc").limit(3)  // retrieve top three dishes in the array in a desc order
        .get()
        .then(function (snap) {
            snap.forEach(function (doc) {
                var dish = doc.data().dish_name;
                console.log(dish);
                top_three.push(dish)
            })
            readdishInfo(top_three[0], 'first') 
            readdishInfo(top_three[1], 'second')
            readdishInfo(top_three[2], 'third')
        })
    console.log(top_three)

}

// Read data of dishes and replace text and attr with the data with retrieved from Firestore
function readdishInfo(dish_name, rank) {
    db.collection("dishes").where("dish_name", "==", dish_name)
        .get()
        .then(function (snap) {
            snap.forEach(function (doc) {
                var dish_name = doc.data().dish_name;
                var restaurant = doc.data().restaurant;
                var likes = doc.data().foodqualityscore;
                var picture = doc.data().images;

                let dish_element = `#${rank}-dish-name-goes-here`
                let rest_element = `#${rank}-restaurant-name-goes-here`
                let like_element = `#${rank}-likes`
                let pic_element = `#${rank}-dishPicture`

                $(dish_element).text(dish_name);
                $(rest_element).text(restaurant);
                $(like_element).text(likes);
                $(pic_element).attr("src", picture);
                $(rest_element).attr("href", `restaurants_page.html?name=${restaurant}`);

                console.log(dish_name, restaurant, likes, picture, rank, pic_element)
            })
        })
}

dishQuery();