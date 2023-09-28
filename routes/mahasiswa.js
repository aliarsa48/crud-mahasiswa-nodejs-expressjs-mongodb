// membuat variable router dengan require atau export variabel express
// dan menggunakan metode router
const router = require("express").Router();

// export controller yang ingin dipakai
const mahasiswaController = require("../controllers/mahasiswaController");

// endpoint mahasiswa
router.get("/", mahasiswaController.viewMahasiswa); // untuk view
router.post('/', mahasiswaController.addMahasiswa); // untuk menambahkan data mahasiswa
router.put('/', mahasiswaController.editMahasiswa); // untuk edit data mahasiswa
router.delete('/:id',mahasiswaController.deleteMahasiswa);
router.get("/keluarga/:id", mahasiswaController.detailMahasiswa);
router.post('/keluarga', mahasiswaController.addKeluarga); // untuk menambahkan data keluarga
router.put('/keluarga', mahasiswaController.editKeluarga);
router.delete('/keluarga/:id', mahasiswaController.deleteKeluarga);

// lalu export routernya
module.exports = router;