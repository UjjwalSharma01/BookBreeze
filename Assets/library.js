import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-analytics.js";
import { getFirestore, collection, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js";

// app's Firebase configuration
const firebaseConfig = {
    // Your Firebase configuration
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

        // Create a button to open the PDF
        const button = document.createElement('button');
        button.textContent = `${book.title} - ${book.author}`;
        button.onclick = function() {
            // Open the PDF in a new window using PDF.js
            window.open(`/web/viewer.html?file=${encodeURIComponent(book.url)}`, '_blank');
        };

        // Add the button to the list item
        li.appendChild(button);

        // Add the list item to the book list
        bookList.appendChild(li);
    });
});