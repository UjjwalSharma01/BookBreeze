import { collection, addDoc, getFirestore } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-analytics.js";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-storage.js";

// app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAlfjG6kS4N0fgFVNnnJ7edDLOdvNvBFrY",
    authDomain: "bookbreeze11.firebaseapp.com",
    projectId: "bookbreeze11",
    storageBucket: "bookbreeze11.appspot.com",
    messagingSenderId: "664143329195",
    appId: "1:664143329195:web:82e2b5bf244a84506404ee",
    measurementId: "G-TSDZ4JQR3G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Firebase Storage
const storage = getStorage(app);

// Function to handle going back to the library
window.goToLibrary = function() {
    window.location.href = "/Assets/library.html";
}

// Function to handle adjusting settings
window.adjustSettings = function() {
    window.location.href = "/Assets/settings.html";
}

// Function to upload ebook
window.uploadEbook = async function(event) {
    const file = event.target.files[0];

    // Ask the user for the book details
    const title = prompt('Enter the book title:', file.name);
    const author = prompt('Enter the author name:');

    // Create a storage reference
    const storageRef = ref(storage, 'ebooks/' + file.name);

    // Upload the file to Firebase Storage
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', 
        (snapshot) => {
            // Handle the upload progress
        }, 
        (error) => {
            // Handle unsuccessful uploads
            console.error("Error uploading file: ", error);
        }, 
        () => {
            // Handle successful uploads on complete
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                const ebook = {
                    title: title,
                    author: author,
                    url: downloadURL,  // Store the URL of the uploaded file
                };

                addDoc(collection(db, "ebooks"), ebook).then((docRef) => {
                    console.log("Document written with ID: ", docRef.id);
                    alert("Document uploaded successfully!");
                }).catch((error) => {
                    console.error("Error adding document: ", error);
                });
            });
        }
    );
}

// Function to handle searching within the book
window.searchInBook = function(query) {
    // Search the current book for the query
    // This will depend on how your books are structured in Firebase
    var bookRef = firebase.firestore().collection('books').doc('currentBook');
    bookRef.get().then((doc) => {
        if (doc.exists) {
            var bookContent = doc.data().content;
            var searchResults = bookContent.match(new RegExp(query, 'gi'));
            console.log(searchResults);
        } else {
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
}

// Function to handle going to the previous page
window.goToPreviousPage = function() {
    alert("Going to the previous page...");
}

// Function to handle going to the next page
window.goToNextPage = function() {
    alert("Going to the next page...");
}

// Function to handle adjusting font size
window.adjustFontSize = function() {
    var bookContent = document.getElementById('book-content');
    var currentFontSize = parseFloat(window.getComputedStyle(bookContent).fontSize);
    bookContent.style.fontSize = (currentFontSize + 1) + "px";
}

// Function to handle bookmarking
window.bookmarkPage = function() {
    alert("Bookmarking this page...");
}