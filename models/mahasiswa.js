const mongoose = require("mongoose");

// Membuat variabel baru dengan nama mahasiswaScheme
const mahasiswaScheme = new mongoose.Schema({
    nama: {
        type: String,
        required: true,
    },
    nim: {
        type: Number,
        required: true,
    },
    jurusan: {
        type: String,
        required: true,
    },
    alamat: {
        type: String,
        required: true,
    },
});

// lalu mengekspor model dari mahasiswa, tujuan mengekspor ini supaya model dari mahasiswa ini bisa digunakan dimana saja atau reusable
module.exports = mongoose.model("Mahasiswa", mahasiswaScheme);