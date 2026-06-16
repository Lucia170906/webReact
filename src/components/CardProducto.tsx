//Definimos que necesita este conmponente para existir

interface ProductoProps{
    titulo : string, 
    precio : number, 
    imagen : string,
    alAniadir : () => void; //esta funcion no devule nada 
}

//creamos e componente y le exigimos que cupla con los Props 
function Producto ({titulo , precio, imagen,  alAniadir} : ProductoProps){
    return(
      <div style={{ 
      background: 'white', 
      borderRadius: '12px', // Bordes más redondeados
      overflow: 'hidden', // Evita que la imagen se salga de las esquinas redondeadas
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      display: 'flex',
      flexDirection: 'column',
      height: '100%' // Para que todas las tarjetas midan lo mismo
    }}>
      
      {/* SECCIÓN DE LA IMAGEN */}
      <img 
        src={imagen} 
        alt={titulo} 
        style={{
          width: '100%',
          height: '200px',
          objectFit: 'cover' // Hace que la imagen encaje perfecto sin deformarse
        }}
      />

      {/* SECCIÓN DE LA INFORMACIÓN */}
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <h3 style={{ fontSize: '16px', marginBottom: '10px', color: '#333' }}>{titulo}</h3>
        
        {/* El flexGrow empuja el precio y el botón hacia abajo para que queden alineados */}
        <div style={{ flexGrow: 1 }}></div> 
        
        <p style={{ fontWeight: 'bold', fontSize: '20px', color: '#10b981', margin: '15px 0' }}>
          {precio} €
        </p>
        
        <button 
          onClick={alAniadir}
          style={{
            background: '#0070f3',
            color: 'white',
            border: 'none',
            padding: '12px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold',
            width: '100%',
            transition: 'background 0.3s'
          }}
        >
          Añadir al carrito
        </button>
      </div>
    </div>
    );
}

export default Producto;
