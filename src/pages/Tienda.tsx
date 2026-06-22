import Producto from "../components/CardProducto";
import type {ProductoMercadona} from "../types";

//Le decimos a TypeScript que datos necesita la pagina para funcionar 
interface TiendaProps{
    cargando : boolean;
    listaProductos : ProductoMercadona[];
    alAniadir : (producto : ProductoMercadona) => void;
}

function Tienda ({cargando, listaProductos, alAniadir} : TiendaProps){
    return(
    <div>
      <h1 style={{ marginBottom: '30px' }}>Escaparate de Productos</h1>
      
      {cargando ? (
        <h2 style={{ marginTop: '40px', color: '#666' }}>⏳ Conectando con Mercadona...</h2>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px' }}>
          {listaProductos.map((prod) => (
            <Producto 
              key={prod.id}
              titulo={prod.display_name}
              precio={parseFloat(prod.price_instructions.unit_price)}
              imagen={prod.thumbnail}
              alAniadir={() => alAniadir(prod)} 
            />
          ))}
        </div>
      )}
    </div>    );
}

export default Tienda;