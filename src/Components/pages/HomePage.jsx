import React, { useContext, useState } from 'react';
import Swal from 'sweetalert2';
import { CartContext } from './CartContext';
import BookModal from './BookModal';

import book_node from '../../assets/node-book.png';
import book_react from '../../assets/react-book.png';
import book_js from '../../assets/js-book.jpeg';
import book_cien from '../../assets/cien-anos.jpg';
import book_1984 from '../../assets/1984.jpg';
import book_cronica from '../../assets/cronica.jpg';
import book_principito from '../../assets/Principito.jpg';
import book_alquimista from '../../assets/alquimista.jpg';
import book_rayuela from '../../assets/sombra.jpg';
import book_orgullo from '../../assets/Orgullo.jpg';

const productosIniciales = [
  { id: 1, nombre: 'Libro de JavaScript', descripcion: 'Aprende JS fácil.', precio: 20, imagen: book_js },
  { id: 2, nombre: 'React para Principiantes', descripcion: 'React desde cero.', precio: 25, imagen: book_react },
  { id: 3, nombre: 'Node.js Avanzado', descripcion: 'Avanza en backend.', precio: 30, imagen: book_node },
  { id: 4, nombre: 'Cien Años de Soledad', descripcion: 'Gabriel García Márquez.', precio: 20, imagen: book_cien },
  { id: 5, nombre: '1984', descripcion: 'George Orwell.', precio: 25, imagen: book_1984 },
  { id: 6, nombre: 'Crónica de una muerte anunciada', descripcion: 'Gabriel García Márquez.', precio: 30, imagen: book_cronica },
  { id: 7, nombre: 'El Principito', descripcion: 'Antoine de Saint-Exupéry.', precio: 20, imagen: book_principito },
  { id: 8, nombre: 'El Alquimista', descripcion: 'Paulo Coelho.', precio: 25, imagen: book_alquimista },
  { id: 9, nombre: 'Rayuela', descripcion: 'Julio Cortázar.', precio: 30, imagen: book_rayuela },
  { id: 10, nombre: 'Orgullo y prejuicio', descripcion: 'Jane Austen.', precio: 30, imagen: book_orgullo },
];

const HomePage = () => {
  const { carrito, agregarAlCarrito } = useContext(CartContext);
  const [libroSeleccionado, setLibroSeleccionado] = useState(null);
  const [busqueda, setBusqueda] = useState('');

  const estaEnCarrito = (producto) => carrito.some((item) => item.id === producto.id);

  const manejarAgregar = (producto) => {
    if (estaEnCarrito(producto)) {
      Swal.fire('Ya agregado', 'Este producto ya está en el carrito', 'info');
      return;
    }

    Swal.fire({
      title: '¿Agregar al carrito?',
      text: producto.nombre,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, agregar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        agregarAlCarrito(producto);
        Swal.fire('Agregado', 'Producto agregado con éxito', 'success');
      }
    });
  };

  // Filtrar productos según el texto de búsqueda
  const productosFiltrados = productosIniciales.filter((producto) =>
    producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="home-page">
      <h2>Productos</h2>

      {/* Barra de búsqueda */}
      <div className="barra-busqueda">
        <input
          type="text"
          placeholder="Buscar libro..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      <div className="productos-lista">
        {productosFiltrados.map((producto) => (
          <div key={producto.id} className="producto">
            <img src={producto.imagen} alt={producto.nombre} />
            <h3>{producto.nombre}</h3>
            <p>{producto.descripcion}</p>
            <p>${producto.precio}</p>
            <button className="btn btn-azul" onClick={() => setLibroSeleccionado(producto)}>
              Ver detalles
            </button>
            <button className="btn btn-agregar" onClick={() => manejarAgregar(producto)}>
              Agregar al carrito
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      <BookModal libro={libroSeleccionado} onClose={() => setLibroSeleccionado(null)} />
    </div>
  );
};

export default HomePage;
