// Import Firebase functions yang diperlukan
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

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

// Fungsi Login
document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log("Login berhasil:", user);
    alert("Login berhasil!");

    // Alihkan ke halaman utama atau halaman lain
    window.location.href = "index.html";
  } catch (error) {
    console.error("Login gagal:", error.message);
    alert("Login gagal. Silakan periksa email dan password Anda.");
  }
});
