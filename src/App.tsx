import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import { Login } from './pages/login/Login';
import Cadastro from './pages/cadastro/Cadastro';
import Home from './pages/home/Home';
import ListarCategorias from './components/categorias/listarcategorias/ListarCategorias';
import FormCategoria from './components/categorias/formcategoria/FormCategoria';
import DeletarCategoria from './components/categorias/deletarcategorias/DeletarCategoria';
import ListaProdutos from './components/produtos/listaprodutos/ListaProdutos';
import FormProduto from './components/produtos/formproduto/FormProduto';
import DeletarProduto from './components/produtos/deletarproduto/DeletarProduto';
import Perfil from './pages/perfil/Perfil';
import { CartProvider } from './contexts/CartContext';
import Cart from './components/carrinho/cart/Cart';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <AuthProvider>
	    <CartProvider>
		    <BrowserRouter>
        <Navbar />
        <div className="min-h-[80vh]">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/home" element={<Home />} />
            <Route path="/categorias" element={<ListarCategorias />} />
            <Route path="/cadastrarcategoria" element={<FormCategoria />} />
            <Route path="/editarcategoria/:id" element={<FormCategoria />} />
            <Route path="/deletarcategoria/:id" element={<DeletarCategoria />} />
            <Route path="/produtos" element={<ListaProdutos />} />
            <Route path="/cadastrarproduto" element={<FormProduto />} />
            <Route path="/editarproduto/:id" element={<FormProduto />} />
            <Route path="/deletarproduto/:id" element={<DeletarProduto />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/carrinho" element={<Cart />} />
          </Routes>
        </div>
        <Footer />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnHover
          theme="colored"
        />
      	</BrowserRouter>
	</CartProvider>
</AuthProvider>
  );
}

export default App;