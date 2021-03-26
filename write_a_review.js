const reviews = document.querySelector('#exampleFormControlTextarea1');

// create element and render review
function renderReview(doc){
    let li = document.createElement('textarea');
    let qualityreview = document.createElement('textarea');

    qualityreview.setAttribute('data-id', doc.id);
    qualityreview.textContent = doc.data().qualityreview;

    reviews.appendChild(qualityreview);
   


}

db.collection('reviews').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        renderReview(doc);
    })
})