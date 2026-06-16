import { useState } from "react"
import Producto from "./components/CardProducto"; //Importamos el componente 

//Creamos una interfaz para saber como debe ser un productio en nuestra bbdd
interface ProductoEstructura {
  id : number, 
  titulo : string, 
  descripcion : string, 
  precio : number;
}
function App(){
  //Creamos el estado usando TypeScript
  const listaProductos : ProductoEstructura[] = [
    {
      id: 1,
      titulo: "Curso de TypeScript Avanzado",
      descripcion: "Aprende desde cero hasta crear apps completas.",
      precio: 49.99
    },
    {
      id: 2,
      titulo: "Audífonos Gamer Premium",
      descripcion: "Sonido envolvente para programar concentrado.",
      precio: 99.99
    },
    {
      id: 3,
      titulo: "Taza de Programador de Porcelana",
      descripcion: "Mantiene tu café caliente mientras buscas el error.",
      precio: 14.99
    }
  ]

  //Lista de productos seleccionados 
  const [carrito, setCarrito] = useState<ProductoEstructura[]>([]);

  //Función para añadir el producto completo al carrito 
  
  const aniadirAlCarrito = (productoElejido : ProductoEstructura) =>{
    // cogemos lo que habia en el carrito y le sumamos el nuevo producto 
    setCarrito([...carrito, productoElejido]);
  };

  //Calculamos el precio el precio sumando el precio total de cada elementos del carrito 
  const precioTotal = carrito.reduce((acumulador, prod) => acumulador + prod.precio, 0);



  

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto', display: 'flex', gap: '40px' }}>
      
      {/* SECCIÓN DE PRODUCTOS (Izquierda) */}
      <div style={{ flex: 2 }}>
        <h1>🛒 Mi Tienda Full Stack</h1>
        <p>¡Bienvenido al inicio de tu e-commerce!</p>

        {listaProductos.map((prod) => (
          <Producto 
            key={prod.id}
            titulo={prod.titulo}
            descripcion={prod.descripcion}
            precio={prod.precio}
            // Pasamos la función pasándole el producto específico cuando hagan clic
            alAniadir={() => aniadirAlCarrito(prod)} 
          />
        ))}
      </div>

      {/* SECCIÓN DEL CARRITÓ DE COMPRAS (Derecha) */}
      <div style={{ 
        flex: 1, 
        background: '#fff', 
        padding: '20px', 
        borderRadius: '8px', 
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        height: 'fit-content',
        marginTop: '70px'
      }}>
        <h2>🛍️ Tu Carrito</h2>
        <p style={{ margin: '10px 0', color: '#666' }}>
          Items: <strong>{carrito.length}</strong>
        </p>

        {/* Lista resumida de lo que hay en el carrito */}
        <ul style={{ paddingLeft: '20px', marginBottom: '20px' }}>
          {carrito.map((item, index) => (
            // Usamos el index porque el mismo producto se puede repetir varias veces
            <li key={index} style={{ marginBottom: '5px', fontSize: '14px' }}>
              {item.titulo} - ${item.precio}
            </li>
          ))}
        </ul>

        <hr />
        
        <h3 style={{ marginTop: '15px' }}>Total: ${precioTotal.toFixed(2)}</h3>
        
        {/* Este botón nos servirá para la futura pasarela de pagos */}
        <button style={{
          width: '100%',
          background: '#10b981', // Verde éxito
          color: 'white',
          border: 'none',
          padding: '12px',
          borderRadius: '6px',
          marginTop: '15px',
          fontWeight: 'bold',
          cursor: 'pointer'
        }}>
          Proceder al pago
        </button>
      </div>

    </div>
  );
  
   
}

export default App