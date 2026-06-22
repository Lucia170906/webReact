import { Link } from "react-router-dom"; // importamos Link por el boton de ir al catalogo

function Inicio(){
    return(

        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
        <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>
            Bienvenido a la revolución de las compras
        </h1>
        <p style={{ fontSize: '20px', color: '#666', marginBottom: '40px' }}>
            Los mejores productos de Mercadona, ahora con entrega a la velocidad de la luz.
        </p>
        
        <Link 
            to="/tienda" 
            style={{ background: '#0070f3', color: 'white', padding: '15px 30px', textDecoration: 'none', borderRadius: '8px', fontSize: '18px', fontWeight: 'bold' }}
        >
            Ver el catálogo completo
        </Link>
        </div>
    );
}
export default Inicio;