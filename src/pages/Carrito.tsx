import type { ProductoCarrito, ProductoMercadona } from "../types";

interface CarritoProps{
    carrito : ProductoCarrito[];
    precioTotal: number;
    alAniadir : (producto : ProductoMercadona) => void;
    alRestar : (id:string) =>void;
    alEliminar : (id :string) => void;
}

function Carrito({carrito, precioTotal, alAniadir, alRestar, alEliminar} : CarritoProps){
    return (
    <div style={{ background: '#fff', padding: '30px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
      <h1>Detalles de tu Carrito</h1>
      
      {carrito.length === 0 ? (
        <p style={{ marginTop: '20px', fontSize: '18px' }}>Tu carrito está vacío. ¡Ve a comprar algo!</p>
      ) : (
        <div style={{ marginTop: '30px' }}>
          {carrito.map(item => (
            <div key={item.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px 0', borderBottom: '1px solid #eee' }}>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', flex: 2 }}>
                <img src={item.thumbnail} alt={item.display_name} style={{ width: '60px', height: '60px', borderRadius: '8px', objectFit: 'cover' }} />
                <h3 style={{ fontSize: '16px', margin: 0 }}>{item.display_name}</h3>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', flex: 1, justifyContent: 'center' }}>
                <button onClick={() => alRestar(item.id)} style={{ padding: '5px 15px', fontSize: '18px', cursor: 'pointer' }}>-</button>
                <span style={{ fontWeight: 'bold', fontSize: '18px' }}>{item.cantidad}</span>
                <button onClick={() => alAniadir(item)} style={{ padding: '5px 15px', fontSize: '18px', cursor: 'pointer' }}>+</button>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flex: 1, justifyContent: 'flex-end' }}>
                <p style={{ fontWeight: 'bold', fontSize: '18px', margin: 0 }}>
                  {(parseFloat(item.price_instructions.unit_price) * item.cantidad).toFixed(2)} €
                </p>
                <button onClick={() => alEliminar(item.id)} style={{ background: '#ef4444', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                  Eliminar
                </button>
              </div>
              
            </div>
          ))}

          <div style={{ marginTop: '40px', textAlign: 'right' }}>
            <h2>Total a pagar: {precioTotal.toFixed(2)} €</h2>
            <button style={{ background: '#10b981', color: 'white', border: 'none', padding: '15px 30px', fontSize: '18px', borderRadius: '6px', marginTop: '15px', fontWeight: 'bold', cursor: 'pointer' }}>
              Proceder al Pago Seguro
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Carrito;