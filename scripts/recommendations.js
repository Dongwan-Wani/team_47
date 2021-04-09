function dishQuery() {
    top_three = []
    db.collection("dishes")
        //.where("population", ">", 1000000)
        //.where("hemisphere", "==", "south")
        //.limit(2)
        //.orderBy("population")
        .orderBy("foodqualityscore", "desc").limit(3)
        .get()
        .then(function (snap) {
            // console.log(snap)
            snap.forEach(function (doc) {
                var dish = doc.data().dish_name;
                console.log(dish);
                top_three.push(dish)
                //document.getElementById("cities-go-here").innerHTML = newdom;
            })
            readdishInfo(top_three[0], 'first')
            readdishInfo(top_three[1], 'second')
            readdishInfo(top_three[2], 'third')
        })
    console.log(top_three)

}


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
                // let rest_a_element = `#${rank}-restaurant-atag-goes-here`

                $(dish_element).text(dish_name);
                $(rest_element).text(restaurant);
                $(like_element).text(likes);
                $(pic_element).attr("src", picture);
                $(rest_element).attr("href", `restaurants_page.html?category=${restaurant}`);

                console.log(dish_name)
                console.log(restaurant)
                console.log(likes)
                console.log(picture)
                console.log(rank)
                console.log(pic_element)
            })
        })
}

dishQuery();