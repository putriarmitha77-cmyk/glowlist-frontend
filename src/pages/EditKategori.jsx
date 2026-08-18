import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function EditKategori() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nama_kategori: "",

    });

    const [loading, setLoading] = useState(true);

    //Ambil data kategori berdasarkan ID
    useEffect(() => {
        fetch(`http://localhost:3001/kategori/${id}`)
        .then((res) => res.json())
        .then((data) => {
            setFormData(data[0]);
            setLoading(false);
        })
        .catch((err) => console.error(err)); 
    }, [id]);

const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
};

const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:3001/produk/${id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(formData),
    });
    alert("Kategori berhasil diperbarui!");
    navigate("/kategori");
};

if (loading) {
    return <div className="container mt-4">Loading...</div>;
}

return (
    <div className="container mt-4">
        <h2>Edit Kategori</h2>
        <form onSubmit={handleSubmit} className="mt-3">
            <div className="mb-3">
                <label className="form-label">Nama Kategori</label>
                <input
                type="text"
                name="nama_kategori"
                value={formData.nama_kategori}
                onChange={handleChange}
                className="form-control"
                />
            </div>
            <button type="submit" className="btn btn-success me-2">
                Simpan Perubahan
            </button>

            <button type="button" className="btn btn-secondary" onClick={() => navigate("/kategori")}>
                Batal
            </button>
        </form>
    </div>
    )
}
