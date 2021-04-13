function add_review(restaurant, img, review_title, review) {
    let image_div = document.createElement("div")
    image_div.className = "img_div d-flex flex-row align-items-center me-5 mb-5"
    let image_source_div = document.createElement("div")
    image_source_div.className = "review_individual_restaurant mb-2 pe-3 pt-1"
    let image = document.createElement("img")
    image.setAttribute("src", img)
    image_source_div.appendChild(image)
    let review_text = document.createElement("div")
    let title = document.createElement("h5")
    title.innerText = restaurant
    review_text.appendChild(title)
    let review_header = document.createElement("h6")
    review_header.innerText = "Food quality"
    review_text.appendChild(review_header)
    let review_description = document.createElement("p")
    review_description.innerText = review
    review_text.appendChild(review_description)
    image_div.appendChild(image_source_div)
    image_div.appendChild(review_text)
    document.getElementsByClassName("food_review")[0].appendChild(image_div)
}

function readReviews(id) {
    let reference = db.collection("restaurants").doc(id)
    reference.get().then(function (restaurant) {

        db.collection("food_quality_review").where("restaurant", "==", reference)
            .onSnapshot(function (query) {
                query.forEach(function (document) {
                    add_review(restaurant.get("name"), "./Dynasty.jpg", "Food quality", document.get("review"))
                })
            })

    })

}


const params = new URLSearchParams(window.location.search)
const value = params.get('restaurant')

readReviews(value)