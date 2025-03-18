import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Cardapio from './pages/Cardapio';
import Reserva from './pages/Reserva';
import FaleConosco from './pages/FaleConosco';
import Vagas from './pages/vagas';
import { CartProvider } from './contexts/CartContext';
import Pedidos from './pages/PedidosOnline';
import AreaAdm from './pages/AreaAdm';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './pages/Login';
import CardapioAdmin from './pages/CardapioAdmin';
import ReservaAdmin from './pages/ReservaAdmin';
import PromocaoAdmin from './pages/PromocaoAdmin';
import { PromocaoProvider } from './contexts/PromocaoContext';
import { CardapioProvider } from './contexts/CardapioContext';

// Componente de Rota Privada
const PrivateRoute = ({ element }: { element: JSX.Element }) => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? element : <Navigate to="/login" />;
};

function App() {
    return (
        <AuthProvider>
            <CartProvider>
                <PromocaoProvider>
                    <CardapioProvider>
                        <Router>
                            <Layout>
                                <Routes>
                                    <Route path="/" element={<Home />} />
                                    <Route path="/cardapio" element={<Cardapio />} />
                                    <Route path="/reserva" element={<Reserva />} />
                                    <Route path="/fale-conosco" element={<FaleConosco />} />
                                    <Route path="/vagas" element={<Vagas />} />
                                    <Route path="/pedidos" element={<Pedidos />} />
                                    <Route path="/login" element={<Login />} />
                                    <Route path="/area-adm" element={<PrivateRoute element={<AreaAdm />} />} />
                                    <Route path="/cardapio-admin" element={<PrivateRoute element={<CardapioAdmin />} />} />
                                    <Route path="/reserva-admin" element={<PrivateRoute element={<ReservaAdmin />} />} />
                                    <Route path="/promocao-admin" element={<PrivateRoute element={<PromocaoAdmin />} />} />
                                </Routes>
                            </Layout>
                        </Router>
                    </CardapioProvider>
                </PromocaoProvider>
            </CartProvider>
        </AuthProvider>
    );
}

export default App;