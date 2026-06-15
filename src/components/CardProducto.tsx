//Definimos que necesita este conmponente para existir

interface ProductoProps{
    titulo : string, 
    descripcion : string,
    precio : number, 
    alAniadir : () => void; //esta funcion no devule nada 
}

//creamos e componente y le exigimos que cupla con los Props 
function Producto ({titulo , descripcion, precio, alAniadir} : ProductoProps){
    return(
        <div style={{ 
      background: 'white', 
      padding: '20px', 
      borderRadius: '8px', 
      marginTop: '20px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
    }}>
      <h3>🚀 {titulo}</h3>
      <p>{descripcion}</p>
      <p style={{ fontWeight: 'bold', margin: '10px 0' }}>Precio: ${precio}</p>
      
      <button 
        onClick={alAniadir}
        style={{
          background: '#0070f3',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
        >
        Añadir al carrito
      </button>
    </div>
    );
}

export default Producto;
