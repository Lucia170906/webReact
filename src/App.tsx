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
  const [contadorCarrito, setContadorCarrito] = useState<number>(0);

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
  //Creamos la funcion que aumentará el número del carrito
  const aniadirAlCarrito = () =>{
    setContadorCarrito(contadorCarrito+1);
  };

  

  return (
    <div style={{ padding: '40px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>🛒 Mi Tienda Full Stack</h1>
      <p>¡Bienvenido al inicio de tu e-commerce!</p>

      {/*Renderizamos la litsa de fira dinamica usando .map*/}
      {listaProductos.map((prod) => (
        <Producto
          key = {prod.id} //Requisito obligatorio de React
          titulo={prod.titulo}
          descripcion={prod.descripcion}
          precio={prod.precio}
          alAniadir={aniadirAlCarrito}
        />

      ))}

      {/* Sección del Carrito */}
      <div style={{ marginTop: '30px', fontSize: '18px', fontWeight: 'bold' }}>
        <span>Productos en el carrito: {contadorCarrito} 🛍️</span>
      </div>
    </div>
  );
  
   
}

export default App