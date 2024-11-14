const express = require('express');
const admin = require('firebase-admin');
const bodyParser = require('body-parser');

// Inisialisasi aplikasi Express
const app = express();
app.use(bodyParser.json());

// Inisialisasi Firebase Admin SDK
const serviceAccount = require('./path/to/serviceAccountKey.json'); // Ubah dengan path file service account key
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const auth = admin.auth();

// Fungsi login endpoint
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Login user dengan Firebase Authentication menggunakan email dan password
    const userRecord = await auth.getUserByEmail(email);

    // Setelah mendapatkan user, tambahkan logika verifikasi password di sini
    // (Firebase Admin SDK tidak mendukung verifikasi password secara langsung di backend)

    // Kirim respons jika login berhasil
    res.status(200).json({ message: 'Login berhasil', user: userRecord });
  } catch (error) {
    // Kirim error jika login gagal
    res.status(401).json({ message: 'Login gagal', error: error.message });
  }
});

// Jalankan server di port 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
