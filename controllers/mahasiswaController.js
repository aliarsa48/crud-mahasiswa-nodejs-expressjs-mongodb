// Membuat variabel Mahasiswa dan mengimport/required dari model Mahasiswa
const Mahasiswa = require("../models/mahasiswa.js");
const Keluarga = require("../models/keluarga.js");

// Dibawah ini kita menggunakan metod export, maka semua metod yang ada di dalam object(module.exports) akan terexport
module.exports = {
    // Membuat view untuk mahasiswa
    viewMahasiswa: async (req, res) => {
        try {
            // Membuat variabel mahasiswa, dan menunda eksekusi hingga proses async selesai lalu mengambil model Mahasiswa
            // dan menggunakan method find untuk mengambil semua collection/tabel yang ada di database Mahasiswa
            const mahasiswa = await Mahasiswa.find();
            // Membuat variabel untuk alertMessage dan alertStatus
            const alertMessage = req.flash("alertMessage");
            const alertStatus = req.flash("alertStatus");
            // Membuat variable yang bersifat object dan memiliki sebuah pesan isinya mengambil dari variable alertMessage dan alertStatus
            const alert = {message: alertMessage, status: alertStatus};

            // Lalu render viewnya yang ada di dalam file index
            // menampilkan datanya dan mendestracturkannya, lalu memanggil variabel mahasiswa diatas
            // Lalu merender alert yang sudah di deklar di atas

            res.render("index", {
                mahasiswa,
                alert,
                title: "CRUD",
            });
        } catch (error) {
            // Jika error makan akan meredirect ke route mahasiswa(routenya akan kita buat setelah selesai dengan mahasiswaController)
            res.redirect("/mahasiswa");
        }
    },

    addMahasiswa: async (req, res) => {
        try {
            const {nama,nim,jurusan,alamat} = req.body;

            await Mahasiswa.create({nama,nim,jurusan,alamat});

            req.flash('alertMessage','Success add data Mahasiswa');
            req.flash('alertStatus','success');
            res.redirect("/mahasiswa");
        } catch (error) {
            req.flash('alertMessage',`${error.message}`);
            req.flash('alertStatus','danger');
            res.redirect("/mahasiswa");
        }
    },

    editMahasiswa: async (req, res) => {
        try {
            // membuat variabel yang menerima id, dan nama yang didapat dari req body atau yang diinputkan di form input
            const { id, nama, nim, jurusan, alamat } = req.body;
            // mencari variabel yang dideklarasikan diatas dan mengecek _id yang ada di req body yang dikirim _id didapat database dan id isinya dari inputan user
            const mahasiswa = await Mahasiswa.findOne({ _id: id });
            // mahasiswa diambil dari fungsi diatas dan titik(.) nama diambil dari database = nama yang didapat dari req body 
            // yang tentu dikirimkan dari inputan user
            mahasiswa.nama = nama;
            mahasiswa.nim = nim;
            mahasiswa.jurusan = jurusan;
            mahasiswa.alamat = alamat;
            // menyimpan datanya ke database
            await mahasiswa.save();
            // ketika edit data berhasil memberikan notifikasi/alert
            req.flash('alertMessage','Success edit data mahasiswa');
            req.flash('alertStatus','success');
            // ketika berhasil maka akan redirect kembali
            res.redirect('/mahasiswa');
        } catch (error) {
            req.flash('alertMessage',`${error.message}`);
            req.flash('alertStatus','danger');
            res.redirect('/mahasiswa');
        }
    },

    deleteMahasiswa: async (req, res) => {
        try {
            const { id } = req.params;

            const mahasiswa = await Mahasiswa.findOne({ _id : id});

            await mahasiswa.deleteOne();

            req.flash('alertMessage','Data berhasil dihapus');
            req.flash('alertStatus','success');

            res.redirect('/mahasiswa');
        } catch (error) {
            req.flash('alertMessage',`${error.message}`);
            req.flash('alertStatus','danger');

            res.redirect('/mahasiswa');
        }
    },

    detailMahasiswa: async (req, res) => {
        try {
            const { id } = req.params;

            const mahasiswa = await Mahasiswa.findOne({ _id : id });
            const keluarga = await Keluarga.find({ id_mhs: id });

            const alertMessage = req.flash("alertMessage");
            const alertStatus = req.flash("alertStatus");
            const alert = {message: alertMessage, status: alertStatus};

            res.render("keluarga", {
                alert,
                mahasiswa,
                keluarga,
                title: mahasiswa.nama
            });
        } catch (error) {

        }
    },

    addKeluarga: async (req, res) => {
        try {
            const {id_mhs, hubungan, nama} = req.body;
            
            await Keluarga.create({id_mhs,hubungan,nama});

            req.flash('alertMessage','Berhasil ditambahkan');
            req.flash('alertStatus','success');

            res.redirect(req.get('referer'));
        } catch (error) {
            req.flash('alertMessage',`${error.message}`);
        }
    },

    editKeluarga: async (req, res) => {
        try {
            const { id, hubungan, nama } = req.body;

            const keluarga = await Keluarga.findOne({ _id: id });
            
            keluarga.hubungan = hubungan;
            keluarga.nama = nama;

            await keluarga.save();

            req.flash('alertMessage','Success edit data mahasiswa');
            req.flash('alertStatus','success');

            res.redirect('back');
        } catch (error) {
            req.flash('alertMessage',`${error.message}`);
            req.flash('alertStatus','danger');
            res.redirect('back');
        }
    },

    deleteKeluarga: async (req, res) => {
        try {
            const { id } = req.params;

            const keluarga = await Keluarga.findOne({ _id : id});

            await keluarga.deleteOne();

            req.flash('alertMessage','Data berhasil dihapus');
            req.flash('alertStatus','success');

            res.redirect('back');
        } catch (error) {
            req.flash('alertMessage',`${error.message}`);
            req.flash('alertStatus','danger');

            res.redirect('back');
        }
    },
}
