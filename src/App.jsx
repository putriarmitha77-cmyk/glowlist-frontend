
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Produk from "./pages/Produk";
import AddProduk from "./pages/AddProduk";
import EditProduk from "./pages/EditProduk";
import AddKategori from "./pages/AddKategori";
import EditKategori from "./pages/EditKategori";
import Kategori from "./pages/Kategori";
import Tentang from "./pages/Tentang";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="produk" element={<Produk />} />
          <Route path="kategori" element={<Kategori />} />
          <Route path="tentang" element={<Tentang />} />
          <Route path="produk/tambah" element={<AddProduk />} />
          <Route path="produk/edit/:id" element={<EditProduk />} />
          <Route path="kategori/tambah" element={<AddKategori />} />
          <Route path="kategori/edit/:id" element={<EditKategori />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

