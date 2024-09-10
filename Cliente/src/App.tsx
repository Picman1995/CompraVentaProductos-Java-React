import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/auth/Login';
import Home from './pages/Home'; 
import Register from './components/auth/Register';
import CreateProduct from './components/products/CreateProduct';
import ProductList from './components/products/ProductList';
import ProductEdit from './components/products/ProductEdit'; 
import CreateCompra from './components/compra/CreateCompra';
import GananciasByWeek from './components/compra/GananciasByWeek';
import CompraList from './components/compra/CompraList';
import LineaCompraPage from './pages/LineaCompraPage';
import CreateVenta from './components/venta/CreateVenta'; 
import VentaList from './components/venta/VentaList'; 
import Layout from './components/Layout'; 
import LogoutPage from './pages/LogoutPage';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Redirigir a login por defecto */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Rutas que no usan el Layout */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rutas que usan el Layout */}
        <Route element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/create-product" element={<CreateProduct />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/edit-products/:id" element={<ProductEdit />} />
          <Route path="/create-compra" element={<CreateCompra />} />
          <Route path="/ganancias-by-week" element={<GananciasByWeek />} />
          <Route path="/compra-list" element={<CompraList />} />
          <Route path="/linea-compra/:idCompra" element={<LineaCompraPage />} />
          <Route path="/create-venta" element={<CreateVenta />} />
          <Route path="/ventas" element={<VentaList />} />
          <Route path="/logout" element={<LogoutPage />} />
        </Route>

        {/* Ruta por defecto o no encontrada */}
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    </Router>
  );
};

export default App;
