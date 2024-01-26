import { collection, addDoc, getFirestore } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js";
const db = getFirestore();



// Function to handle going back to the library
function goToLibrary() {
    // Navigate to the library page
    window.location.href = "/library.html";
}




// Function to handle adjusting settings
function adjustSettings() {
    // Navigate to the settings page
    window.location.href = "Assets/settings.html";
}




// Function to handle searching within the book
function searchInBook(query) {
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

// Function to add a new book to Firestore
async function addBook() {
    try {
        const docRef = await addDoc(collection(db, "books"), {
            title: "New Book",
            author: "Author Name",
            // add other book properties here
        });
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

// firebase database function starts
import { addDoc, collection } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js";

async function addBook() {
    try {
        const docRef = await addDoc(collection(db, "books"), {
            title: "New Book",
            author: "Author Name",
            // add other book properties here
        });
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

addBook();

// firebase database function ends




// Function to handle going to the previous page starts
function goToPreviousPage() {
    // This will depend on how your books are structured in Firebase
    // For simplicity, we'll just alert the user
    alert("Going to the previous page...");
}
// Function to handle going to the previous page starts



// Function to handle going to the next page starts
function goToNextPage() {
    // This will depend on how your books are structured in Firebase
    // For simplicity, we'll just alert the user
    alert("Going to the next page...");
}
// Function to handle going to the next page ends



// Function to handle adjusting font size
function adjustFontSize() {
    // Adjust the font size of the book content
    var bookContent = document.getElementById('book-content');
    var currentFontSize = parseFloat(window.getComputedStyle(bookContent).fontSize);
    bookContent.style.fontSize = (currentFontSize + 1) + "px";
}




// Function to handle bookmarking
function bookmarkPage() {
    // Add a bookmark to the current page
    // This will depend on how your books are structured in Firebase
    // For simplicity, we'll just alert the user
    alert("Bookmarking this page...");
}