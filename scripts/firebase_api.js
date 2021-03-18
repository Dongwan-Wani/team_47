
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBuO-yRjUE2WoVFJ2qt4dFixREz4i93514",
    authDomain: "no-more-hesitation.firebaseapp.com",
    projectId: "no-more-hesitation",
    storageBucket: "no-more-hesitation.appspot.com",
    messagingSenderId: "70558095069",
    appId: "1:70558095069:web:9bd87d03bef949ba68ed34"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(); // add this to read/write