import { useEffect, useState } from "react";
import { Link, useNavigate} from "react-router-dom";

export default function Kategori() {
    const navigate = useNavigate();
    const [kategori, setKategori] = useState([]);
    const [loading, setLoading] = useState(true);

    const getKategori = async () => {
        try {
            const res = await fetch("http://localhost:3001/kategori");
            const data = await res.json();
            setKategori(data);
        }   catch (err) {
            console.error("Gagal fetch data:", err)
        }   finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getKategori();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Apakah Anda yakin inging menghapus kategori ini??")) {
            try {
                const res = await fetch(`http://localhost:3001/kategori/${id}`, {
                    method: "DELETE",
                });
                if (res.ok) {
                    alert("Kategori berhasill dihapus");
                    getKategori(); //ambil ulang dari data terbaru
                } else {
                    alert("Gagal menghapus kategori");
                }
            } catch (err) {
                console.error("Error:", err);
                alert("Terjadi kesalahan saat menghapus Kategori");
            }
        }
    };

    const handleEdit = (id) => {
        navigate(`/kategori/edit/${id}`);
    };

if (loading) {
    return <div className="container mt-4">Sedang memuat data...</div>;
}

return (
    <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
            <h2>✦ Daftar Kategori Glowlist ✦</h2>
        </div>

    <table className="table table-bordered table-striped">
        <thead className="table-primary">
            <tr>
                <th>ID</th>
                <th>Kategori</th>
                <th>Edit</th>
                <th>Delete</th>
            </tr>
        </thead>
        <tbody>
            {kategori.length > 0 ? (
                kategori.map((item) => (
                    <tr key={item.id_kategori}>
                        <td>{item.id_kategori}</td>
                        <td>{item.kategori}</td>
                        
                        <td>
                            <button
                            className="btn btn-warning btn-sm me-2"onClick={() => handleEdit(item.id_kategori)}>
                            Edit
                            </button>
                        </td>

                        <td>
                            <button
                            className="btn btn-danger btn-sm me-2"onClick={() => handleDelete(item.id_kategori)}>
                            Delete
                            </button>
                        </td>
                    </tr>
                ))
            ) : (
                <tr>
                    <td colSpan="4" className="text-center">
                        Tidak ada Kategori
                    </td>
                </tr>
            )}
        </tbody>
    </table>
</div>
);
}