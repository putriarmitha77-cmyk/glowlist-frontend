import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddProduk() {
    const navigate = useNavigate();

    // Data form produk
    const [formData, setFormData] = useState({
        judul: "",
        deskripsi: "",
        harga: "",
        id_kategori: "",
    });
    const [file, setFile] = useState(null);

    // Data kategori dari database
    const [kategori, setKategori] = useState([]);

    // Mengambil data kategori dari backend
    useEffect(() => {
        const ambilKategori = async () => {
            try {
                const response = await fetch(
                    "http://localhost:3001/kategori"
                );

                console.log("STATUS:", response.status);

                if (!response.ok) {
                    throw new Error("Gagal mengambil data kategori");
                }

                const data = await response.json();

                console.log("DATA KATEGORI:", data);
                console.log("JUMLAH KATEGORI:", data.length);

                setKategori(data);
            } catch (error) {
                console.error("ERROR KATEGORI:", error);
                alert("Gagal mengambil data kategori");
            }
        };

        ambilKategori();
    }, []);

    // Menangani perubahan input
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Menyimpan produk
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (file && file.size > 2 * 1024 * 1024) {
            alert("Ukuran file terlalu besar, maksimal 2MB");
            return;
        }

        
            const data = new FormData();

            data.append("judul", formData.judul);
            data.append("deskripsi", formData.deskripsi);
            data.append("harga", formData.harga);
            data.append("id_kategori", formData.id_kategori);


            if (file) {
                data.append("file", file);
            }

        
            
            try {
            const response = await fetch("http://localhost:3001/produk", {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                    body: data,
                 });

        
            if (response.ok) {
                alert("Produk berhasil ditambahkan");
                navigate("/produk");
            } else {
                alert(
                    "Gagal menambahkan produk"
                );
            }
        } catch (error) {
            console.error("ERROR:", error);

            alert(
                "Terjadi kesalahan saat menambahkan produk"
            );
        }
       
    };


    return (
        <div className="container mt-4">

            <h2>✨ Tambah Produk Baru 🛍️</h2>

            <form
                onSubmit={handleSubmit}
                className="card p-4 shadow-sm"
            >

                {/* ================= JUDUL ================= */}
                <div className="mb-3">
                    <label className="form-label">
                        Judul Produk
                    </label>

                    <input
                        type="text"
                        name="judul"
                        value={formData.judul}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Masukkan Nama Produk"
                        required
                    />
                </div>


                {/* ================= DESKRIPSI ================= */}
                <div className="mb-3">
                    <label className="form-label">
                        Deskripsi Produk
                    </label>

                    <textarea
                        name="deskripsi"
                        value={formData.deskripsi}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Masukkan Deskripsi Produk"
                        rows="4"
                        required
                    ></textarea>
                </div>


                {/* ================= HARGA ================= */}
                <div className="mb-3">
                    <label className="form-label">
                        Harga Produk
                    </label>

                    <input
                        type="number"
                        name="harga"
                        value={formData.harga}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Masukkan Harga Produk"
                        min="0"
                        required
                    />
                </div>


                {/* ================= KATEGORI ================= */}
                <div className="mb-3">
                    <label className="form-label">
                        Kategori Produk
                    </label>

                    <select
                        name="id_kategori"
                        value={formData.id_kategori}
                        onChange={handleChange}
                        className="form-select"
                        required
                    >

                        <option value="">
                            -- Pilih Kategori --
                        </option>

                        {kategori.map((item, index) => (
                            <option
                                key={`${item.id_kategori}-${index}`}
                                value={item.id_kategori}
                            >
                                {item.kategori}
                            </option>
                        ))}

                    </select>
                </div>
                {/*================FOTO=============*/}
                <div className="mb-3">
                    <label className="form-label">
                        Foto Produk
                    </label>
                    <input
                    type="file"
                    accept="image/*"
                    onChange={ (e) => setFile(e.target.files[0])}
                    className="form-control"
                    required
                    />
                </div>


                {/* ================= TOMBOL ================= */}
                <button
                    type="submit"
                    className="btn btn-success"
                >
                    Simpan Produk
                </button>

            </form>
        </div>
    );
}
