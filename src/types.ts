//Creamos una interfaz para saber como debe ser un productio en nuestra bbdd
/*interface ProductoEstructura {
  id : number, 
  titulo : string, 
  descripcion : string, 
  precio : number;
}*/
// interface para el producto de la api de mercadona 
export interface ProductoMercadona{
  id : string;
  display_name : string;
  thumbnail : string;
  price_instructions : {
    unit_price : string; // la api devuelve el precio como string
  };
}

export interface ProductoCarrito extends ProductoMercadona{
  cantidad : number; //Hereda de producto mercadona y le añadimos la propiedad de cantidad
}