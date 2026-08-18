import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddKategori() {
    const [formData, setFormData] = useState({
        Nama_kategori: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:3001/kategori", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            if (res.ok) {
                alert("Kategori Berhasil Di Tambahkan");
                navigate("/kategori");
            } else {
                const data = await res.json();
                alert(data.message || "Gagal menambahkan kategori");
            }
        }catch (err) {
            console.error("Error:", err);
            alert("Terjadi kesalahan saat menambahkan kategori");
        }
    };

    return (
        <div className="container mt-4">
            <h2>✨ Tambah Kategori 🛍️</h2>
            <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
                <div className="mb-3">
                    <label className="form-label">Nama Kategori</label>
                    <input
                        type="text"
                        name="nama_kategori"
                        value={formData.nama_kategori}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Masukkan Nama Kategori"
                        required
                    />
                </div>
                
                <button type="submit" className="btn btn-success">
                    Simpan Kategori
                </button>
            </form>
        </div>
    )
}