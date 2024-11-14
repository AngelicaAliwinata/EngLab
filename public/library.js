// Import Firebase functions yang diperlukan
import { getFirestore, doc, setDoc, getDoc, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

// Konfigurasi Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCRI9NPEsq46b7jy95QhYugyNetGzJ93DU",
  authDomain: "englab-f6b6c.firebaseapp.com",
  projectId: "englab-f6b6c",
  storageBucket: "englab-f6b6c.appspot.com",
  messagingSenderId: "55652182721",
  appId: "1:55652182721:web:0d0eaadaf195b8109c0240",
  measurementId: "G-JC7CJFRHS1"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Function to mark book as read
async function markAsRead(bookId) {
    const user = auth.currentUser;
    if (user) {
        const userId = user.uid;
        try {
            // Save "read" status in Firestore
            await setDoc(doc(db, "users", userId, "readBooks", bookId), {
                isRead: true,
                timestamp: new Date()
            });

            // Update button style to indicate "read" status
            const button = document.querySelector(`button[data-book-id="${bookId}"]`);
            if (button) {
                button.classList.add("read");
                button.disabled = true;
            }
            console.log(`Book ${bookId} marked as read in Firestore.`);
        } catch (error) {
            console.error("Error writing document: ", error);
        }
    } else {
        console.log("User is not logged in. Redirect to login page.");
    }
}

// Add event listeners to all "Mark as Read" buttons
document.addEventListener("DOMContentLoaded", () => {
    const markReadButtons = document.querySelectorAll(".mark-read-btn");
    markReadButtons.forEach(button => {
        button.addEventListener("click", () => {
            const bookId = button.getAttribute("data-book-id");
            markAsRead(bookId);
        });
    });
});