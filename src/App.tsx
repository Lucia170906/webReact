import { useState, useEffect } from "react"
import Producto from "./components/CardProducto"; //Importamos el componente 

//Creamos una interfaz para saber como debe ser un productio en nuestra bbdd
/*interface ProductoEstructura {
  id : number, 
  titulo : string, 
  descripcion : string, 
  precio : number;
}*/
// interface para el producto de la api de mercadona 
interface ProductoMercadona{
  id : string;
  display_name : string;
  price_instructions : {
    unit_price : string; // la api devuelve el precio como string
  };
}
function App(){
  //Creamos el estado usando TypeScript
  //Creamo la lista vacía porque aun no e ha "hecho" lapeticion en la api
  const [listaProductos, setListaProductos] = useState<ProductoMercadona[]>([]);
  //Nuevo estado para mostrar un mensaje mientras se cargan lso datos ç
  const [cargando, setCargando] = useState<boolean>(true);
  //Lista de productos seleccionados 
  const [carrito, setCarrito] = useState<ProductoMercadona[]>([]);


  

  
  //Función para añadir el producto completo al carrito 
  
  
  useEffect(() => {
    //simulamos una peticion a una api que tarda 2 seg en esponder
      //creamos una función asincorna para poder usar await 

      const obtenerProductos = async () => {
        try{
          //1. Hacemos la llamada al servidorde mercadona
          const respuesta = await fetch ('https://tienda.mercadona.es/api/categories/112/');

          //2. Convertimos la respuesta en un json
          const datos = await respuesta.json();

          //3. Mercadona guarda los productos dentro de datos.categories[0].products
          //Cortamos la lista para solo guardarnos los primero 20, usamos .slice
          const primeros20 = datos.categories[0].products.slice(0, 20);

          //Guardamos esos 20 en nuestro estado 
          setListaProductos(primeros20); //guardamos los productos en el estado
          setCargando(false) // quitamos el mensaje 
 

        }catch(error){
          console.error("Hubo un erro al conectar con mercadona", error);
          setCargando(false);
        }
      };

      obtenerProductos();

    
  }, []) //Las llaves vacías hacen que solo se ejecute una vez al cargar la página

  const aniadirAlCarrito = (productoElejido : ProductoMercadona) =>{
    // cogemos lo que habia en el carrito y le sumamos el nuevo producto 
    setCarrito([...carrito, productoElejido]);
  };

  //Calculamos el precio el precio sumando el precio total de cada elementos del carrito 
  const precioTotal = carrito.reduce((acumulador, prod) => {
    const precioNumero = parseFloat(prod.price_instructions.unit_price);
    return acumulador + precioNumero;
  }, 0)



  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto', display: 'flex', gap: '40px' }}>
      
      {/* SECCIÓN DE PRODUCTOS (Izquierda) */}
      <div style={{ flex: 2 }}>
        <h1>🛒 Mi Tienda Full Stack</h1>
        <p>¡Bienvenido al inicio de tu e-commerce!</p>

        {/* Si esta cargando muestra el texo, sino muestra los productos */}


        {cargando ? (
          <h2 style={{ marginTop: '40px', color: '#666' }}> Cargando productos...</h2>
        ): (
          listaProductos.map((prod) => (
            <Producto 
              key={prod.id}
              titulo={prod.display_name}
              precio={parseFloat(prod.price_instructions.unit_price)}
              alAniadir={() => aniadirAlCarrito(prod)} 
            />
          ))
        )}
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
              {item.display_name} - ${parseFloat(item.price_instructions.unit_price)}
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