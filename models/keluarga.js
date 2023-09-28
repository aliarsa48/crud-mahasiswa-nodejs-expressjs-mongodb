const mongoose = require("mongoose");
// const Mahasiswa = require("../models/mahasiswa.js");

const keluargaScheme = new mongoose.Schema({
    id_mhs: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Mahasiswa",
        required: true
    },
    hubungan: {
        type: String,
        required: true,
    },
    nama: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Keluarga", keluargaScheme);