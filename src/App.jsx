
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigate }from "react-router-dom";
import Login from "./pages/Login";
import Layout from "./components/Layout";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Produk from "./pages/Produk";
import AddProduk from "./pages/AddProduk";
import EditProduk from "./pages/EditProduk";
import EditKategori from "./pages/EditKategori";
import Kategori from "./pages/Kategori";
import Tentang from "./pages/Tentang";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route 
        path="/" 
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path="produk" element={<Produk />} />
          <Route path="kategori" element={<Kategori />} />
          <Route path="tentang" element={<Tentang />} />
          <Route path="produk/tambah" element={<AddProduk />} />
          <Route path="produk/edit/:id" element={<EditProduk />} />
          <Route path="kategori/edit/:id" element={<EditKategori />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

