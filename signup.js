// Import Firebase functions yang diperlukan
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

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

// Fungsi Registrasi
document.getElementById("signup-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    // Buat akun baru dengan email dan password
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Update profil pengguna dengan username
    await updateProfile(user, { displayName: username });
    console.log("Registrasi berhasil:", user);
    alert("Registrasi berhasil!");

    // Alihkan ke halaman utama atau halaman lain
    window.location.href = "login.html";
  } catch (error) {
    console.error("Registrasi gagal:", error.message);
    alert("Registrasi gagal. Silakan coba lagi.");
  }
});
