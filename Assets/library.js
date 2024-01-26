import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-analytics.js";
import { getFirestore, collection, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js";

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

// Get a reference to the "books" collection
const booksCollection = collection(db, "ebooks");

// Fetch all documents from the "books" collection
getDocs(booksCollection).then((querySnapshot) => {
    const bookList = document.getElementById('book-list');

    // Clear the book list
    bookList.innerHTML = '';

    querySnapshot.forEach((doc) => {
        // Get the book data
        const book = doc.data();

        // Create a new list item
        const li = document.createElement('li');

        // Create a button to open the PDF or EPUB
        const button = document.createElement('button');
        button.textContent = `${book.title} - ${book.author}`;
        button.onclick = function() {
            // Remove the query parameters from the URL
            const urlWithoutQueryParameters = book.url.split('?')[0];

            // Check the file extension
            const fileExtension = urlWithoutQueryParameters.split('.').pop().toLowerCase();

            if (fileExtension === 'pdf') {
                // Open the PDF in a new window using PDF.js
                window.open(`/Assets/viewer.html?file=${encodeURIComponent(book.url)}`, '_blank');
            } else if (fileExtension === 'epub') {
                // Open the EPUB in a new window using EPUB.js
                window.open(`/Assets/epubViewer.html?file=${encodeURIComponent(book.url)}`, '_blank');
            } else {
                alert('Unsupported file format');
            }
        };

        // Add the button to the list item
        li.appendChild(button);

        // Add the list item to the book list
        bookList.appendChild(li);
    });
});