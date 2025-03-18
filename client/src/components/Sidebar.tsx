import { Link } from 'react-router-dom';

function Sidebar() {
    return (
        <div className="sidebar">
            {/* Outros links */}
            <Link to="/reserva-admin">Gerenciar Reservas</Link>
            <Link to="/promocao-admin">Gerenciar Promoções</Link>
            {/* Outros links */}
        </div>
    );
}

export default Sidebar; 