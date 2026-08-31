import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function EditProduk() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        judul: "",
        deskripsi: "",
        harga: "",
        id_kategori: "",
        name_file: "",
    });

    const [fileBaru, setFileBaru] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:3001/produk/${id}`)
        .then((res) => res.json())
        .then((data) => {
            setFormData(data[0]); // ambil data pertama hasil query
            setLoading(false);
        })
        .catch((err) => console.error(err));
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });        
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (fileBaru && fileBaru.size > 2 * 1024 *1024) {
            alert("Ukuran file terlalu besar, maksimal 2MB");
            return;
        }

        const data = new FormData();
        data.append("judul", formData.judul);
        data.append("deskripsi", formData.deskripsi);
        data.append("harga", formData.harga);
        data.append("id_kategori", formData.id_kategori);
        if (fileBaru) {
            console.log("ini jikaa");
            
            data.append("file", fileBaru); // hanya kirim kalau ada foto
        }

        if (!window.confirm("Yakin mau menyimpan perubahan ini?")) {
            return;
        }
        await fetch(`http://localhost:3001/produk/${id}`, {
            method: "PUT",
            headers: {
               "Authorization" : `Bearer ${localStorage.getItem("token")}`
             },
            body: data,
        });
        alert("Produk berhasil diperbarui!");
        navigate("/produk");
    };

    if (loading) {
        return <div className="container mt-4">Loading...</div>;
    }

    return (
        <div className="container mt-4">
            <h2>Edit Produk</h2>
            <form onSubmit={handleSubmit} className="mt-3">

                {/* Menampilkan foto lama */}
                <div className="mb-3">
                    <label className="form-label">Foto saat ini</label>
                </div>
                    {formData.name_file ? (
                        <img
                        src={`http://localhost:3001/uploads/${formData.name_file}`}
                        alt="Foto lama"
                        style={{ width: "120px", borderRadius: "8px"}}
                        />
                    ) : (
                        <p>Tidak ada foto</p>
                    )}

                    <div className="mb-3">
                        <label className="form-label">Ganti Foto</label>
                        <input
                        type="file"
                        accept="image/"
                        className="form-control"
                        onChange={(e) => setFileBaru(e.target.files[0])}
                        /> 
                    </div>

                <div className="mb-3">
                    <label className="form-label">Judul</label>
                    <input
                      type="text"
                      name="judul"
                      value={formData.judul}
                      onChange={handleChange}
                      className="form-control"
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Deskripsi</label>
                    <textarea 
                       type="text"
                       name="deskripsi"
                       value={formData.deskripsi}
                       onChange={handleChange}
                       className="form-control"
                    ></textarea>
                </div>

                <div className="mb-3">
                    <label className="form-label">Harga</label>
                    <input
                       type="number"
                       name="harga"
                       value={formData.harga}
                       onChange={handleChange}
                       className="form-control" 
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">ID Kategori</label>
                    <select
                       type="number"
                       name="id_kategori"
                       value={formData.id_kategori}
                       onChange={handleChange}
                       className="form-control"
                    >
                        <option value="">--Pilih Kategori--</option>
                        <option value="4">Facetology</option>
                        <option value="5">Skintific</option>
                        <option value="2">Cushion</option>
                        <option value="3">Glad 2 Glow</option>
                        <option value="1">Kosmetik</option>
                    </select>
                </div>

                <button type="submit" className="btn btn-success me-2">
                    Simpan Perubahan
                </button>
            </form>
        </div>
    );
}