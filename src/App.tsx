import { useState, useEffect } from "react";
import {Routes, Route, Link} from "react-router-dom";
//Importamos las paginas 
import Inicio from "./pages/Inicio";
import Carrito from "./pages/Carrito";
import Tienda from "./pages/Tienda";

//importamos los interface 
import  type {ProductoMercadona, ProductoCarrito}  from "./types";





function App(){
  //Creamos el estado usando TypeScript
  //Creamo la lista vacía porque aun no e ha "hecho" lapeticion en la api
  const [listaProductos, setListaProductos] = useState<ProductoMercadona[]>([]);
  //Nuevo estado para mostrar un mensaje mientras se cargan lso datos ç
  const [cargando, setCargando] = useState<boolean>(true);
  //Lista de productos seleccionados 
  const [carrito, setCarrito] = useState<ProductoCarrito[]>(() =>{
    //intentamos buscar algun carrito en el disco duro 
    const carritoGuardado = localStorage.getItem("carrito");
    //si existe lo transformamos a typescript
    //si no existe devolvemos una lista vacia
    return carritoGuardado  ? JSON.parse(carritoGuardado) : [];
  });


  

  
  //Función para añadir el producto completo al carrito 
  
  
  useEffect(() => {
    //simulamos una peticion a una api que tarda 2 seg en esponder
      //creamos una función asincorna para poder usar await 

      const obtenerProductos = async () => {
        try{
          //1. Hacemos la llamada al servidorde mercadona
          const respuesta = await fetch ('https://tienda.mercadona.es/api/categories/120/');

          //2. Convertimos la respuesta en un json
          const datos = await respuesta.json();

          //3. Mercadona guarda los productos dentro de datos.categories[0].products
          //Cortamos la lista para solo guardarnos los primero 20, usamos .slice
          const primeros20 = datos.categories.flatMap(
            (subCategoria : {products :ProductoMercadona[]}) => subCategoria.products
          );
          //.slice(0, 20)

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

  useEffect(() => {
    //Cada vez que la variabler carrito cambie de valor la guardamis 
    //Convertimos la lista en texto con JSON.stringify
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito] // para que el sensor se active cuando carrito cambie
  );

  const aniadirAlCarrito = (productoElejido : ProductoMercadona) =>{
   //1. Comprobamos si el producto ya esta en el carrito 
   const productoExistente = carrito.find((item) => item.id === productoElejido.id);

   if(productoExistente){
    //2. Si ya existe recorremos el carrito y le sumamos 1 a la cantidad
    setCarrito(
      carrito.map((item) =>
      item.id === productoElejido.id
      ? {...item, cantidad  : item.cantidad +1 } // moificamos solo este 
      : item //los demas los dejamos igual
      )
    )
   }else{
      //3. Si no existe lo metemos al final 
      //y le inyectamos la "propiedad : 1"
      setCarrito([...carrito, {...productoElejido, cantidad : 1}]);
   }
  };

  //Función para restar un prodicto 
  const restarDelCarrito = (idProducto : string) => {
    const producto = carrito.find((item) => item.id === idProducto);

    if(producto && producto.cantidad > 1){
      //Si hay más de 1 le restamos 1 a la cantidad
      setCarrito(
        carrito.map((item) =>
        item.id === idProducto
          ? {...item, cantidad : item.cantidad -1}
          : item
        )
      )
    }else{
      //si la cantidad es 1 lo eliminamos
      eliminarDelCarrito(idProducto);
    }
  };

  //Funcion para borrar un carrito del producto 
  const eliminarDelCarrito = (idProducto : string) =>{
    //Filtramos el carrito dehando pasar solo los que NO sean el producto a borrar 
    setCarrito(carrito.filter((item) => item.id !==idProducto));
  }

  //Calculamos el precio el precio sumando el precio total de cada elementos del carrito 
  const precioTotal = carrito.reduce((acumulador, prod) => {
    const precioNumero = parseFloat(prod.price_instructions.unit_price);
    return acumulador + (precioNumero * prod.cantidad);
  }, 0)

  //Calculamos el total de productos en el carrito 
  const totalItems = carrito.reduce((acumulador, item) => acumulador + item.cantidad, 0)



 return (
    <div style={{ backgroundColor: '#f4f4f9', minHeight: '100vh' }}>
      
      {/* 1. BARRA DE NAVEGACIÓN (Siempre visible) */}
      <nav style={{ 
        background: '#fff', 
        padding: '20px 40px', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
      }}>
        
        <Link to="/" style={{ textDecoration: 'none', color: '#333', fontSize: '24px', fontWeight: 'bold' }}>
          🛒 Tienda FullStack
        </Link>
        <Link to="/tienda" style={{ textDecoration: 'none', color: '#666', fontSize: '18px' }}>
            Catálogo
          </Link>

        <Link to="/carrito" style={{ textDecoration: 'none' }}>
          <div style={{ background: '#10b981', color: 'white', padding: '10px 20px', borderRadius: '20px', fontWeight: 'bold' }}>
            Ir al Carrito ({totalItems})
          </div>
        </Link>
      </nav>

      {/* 2. EL CONTENEDOR DE PÁGINAS */}
      <main style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
        <Routes>

          {/* --PÁGINA INICIO 1: EL INICIO (Landing Page) --- */}
         <Route path="/" element={<Inicio />}/>
          
          {/* --- PÁGINA TIENDA: EL ESCAPARATE --- */}
         <Route path="/tienda" element={
          <Tienda
          cargando = {cargando}
          listaProductos={listaProductos}
          alAniadir={aniadirAlCarrito}
          />
         }
         />

          {/* --- PÁGINA SECUNDARIA: EL CARRITO --- */}
         <Route path="/carrito" element={
          <Carrito
          carrito={carrito}
          precioTotal={precioTotal}
          alAniadir={aniadirAlCarrito}
          alRestar={restarDelCarrito}
          alEliminar={eliminarDelCarrito}
          />
         }
         />


        </Routes>
      </main>
    </div>
  );
  
   
}

export default App