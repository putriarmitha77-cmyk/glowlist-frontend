import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditProduk() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        judul: "",
        deskripsi: "",
        harga: "",
        id_kategori: "",
    });

    const [kategori, setKategori] = useState([]);
    const [loading, setLoading] = useState(true);

    // =========================
    // AMBIL DATA PRODUK
    // =========================
    useEffect(() => {
        const ambilProduk = async () => {
            try {
                const response = await fetch(
                    `http://localhost:3001/produk/${id}`
                );

                if (!response.ok) {
                    throw new Error("Gagal mengambil data produk");
                }

                const data = await response.json();

                console.log("DATA PRODUK:", data);

                if (data.length > 0) {
                    const produk = data[0];

                    setFormData({
                        judul: produk.judul || "",
                        deskripsi: produk.deskripsi || "",
                        harga: produk.harga || "",
                        id_kategori: produk.id_kategori || "",
                    });
                }
            } catch (error) {
                console.error("ERROR PRODUK:", error);
            } finally {
                setLoading(false);
            }
        };

        ambilProduk();
    }, [id]);

    // =========================
    // AMBIL DATA KATEGORI
    // =========================
    useEffect(() => {
        const ambilKategori = async () => {
            try {
                const response = await fetch(
                    "http://localhost:3001/kategori"
                );

                if (!response.ok) {
                    throw new Error("Gagal mengambil kategori");
                }

                const data = await response.json();

                console.log("DATA KATEGORI:", data);

                setKategori(data);
            } catch (error) {
                console.error("ERROR KATEGORI:", error);
            }
        };

        ambilKategori();
    }, []);

    // =========================
    // HANDLE INPUT
    // =========================
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // =========================
    // UPDATE PRODUK
    // =========================
    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("DATA YANG DIKIRIM:", formData);

        try {
            const response = await fetch(
                `http://localhost:3001/produk/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                }
            );

            const data = await response.json();

            console.log("RESPONSE SERVER:", data);

            if (response.ok) {
                alert("Produk berhasil diperbarui!");

                navigate("/produk");
            } else {
                alert(
                    data.message ||
                    "Gagal memperbarui produk"
                );
            }
        } catch (error) {
            console.error("ERROR UPDATE:", error);

            alert(
                "Terjadi kesalahan saat memperbarui produk"
            );
        }
    };

    // =========================
    // LOADING
    // =========================
    if (loading) {
        return (
            <div className="container mt-4">
                Sedang memuat data...
            </div>
        );
    }

    // =========================
    // FORM
    // =========================
    return (
        <div className="container mt-4">

            <h2>✏️ Edit Produk</h2>

            <form
                onSubmit={handleSubmit}
                className="card p-4 shadow-sm"
            >

                {/* JUDUL */}
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


                {/* DESKRIPSI */}
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
                    ></textarea>
                </div>


                {/* HARGA */}
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
                        required
                    />
                </div>


                {/* KATEGORI */}
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


                {/* TOMBOL */}
                <div>
                    <button
                        type="submit"
                        className="btn btn-success me-2"
                    >
                        Simpan Perubahan
                    </button>

                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => navigate("/produk")}
                    >
                        Batal
                    </button>
                </div>

            </form>
        </div>
    );
}
