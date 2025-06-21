// Menú hamburguesa
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger?.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});

// Filtros de catálogo
const categoriaSelect = document.getElementById('categoria');
const subcategoriaSelect = document.getElementById('subcategoria');
const productos = document.querySelectorAll('.producto');

// Mapeo de subcategorías por categoría
const subcategoriasPorCategoria = {
  Animados: ['Rick y Morty', 'Phineas y Ferb', 'Dragon Ball'],
  Música: ['Beyonce', 'Maluma', 'Mora'],
  Frases: ['Motivacionales', 'Divertidas'],
  Fútbol: ['Messi', 'CR7', 'Mbappé'],
  Caricaturas: ['Bob Esponja', 'Tom y Jerry']
};

// Actualizar subcategorías dinámicamente
categoriaSelect?.addEventListener('change', () => {
  const categoria = categoriaSelect.value;
  const opciones = subcategoriasPorCategoria[categoria] || [];

  subcategoriaSelect.innerHTML = '<option value="todos">Todas las subcategorías</option>';
  opciones.forEach(sub => {
    const option = document.createElement('option');
    option.value = sub;
    option.textContent = sub;
    subcategoriaSelect.appendChild(option);
  });

  subcategoriaSelect.disabled = opciones.length === 0;
  filtrarProductos();
});

subcategoriaSelect?.addEventListener('change', filtrarProductos);

function filtrarProductos() {
  const categoria = categoriaSelect.value;
  const subcategoria = subcategoriaSelect.value;

  productos.forEach(producto => {
    const cat = producto.getAttribute('data-categoria');
    const subcat = producto.getAttribute('data-subcategoria');

    const coincideCategoria = categoria === 'todos' || cat === categoria;
    const coincideSubcategoria = subcategoria === 'todos' || subcat === subcategoria;

    producto.style.display = (coincideCategoria && coincideSubcategoria) ? 'block' : 'none';
  });
}

// Agregar al carrito
function actualizarContadorCarrito() {
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  const totalCantidad = carrito.reduce((sum, item) => sum + item.cantidad, 0);
  const contador = document.getElementById('contador-carrito');
  if (contador) {
    contador.textContent = totalCantidad;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  actualizarContadorCarrito();

  const botonesAgregar = document.querySelectorAll('.agregar-carrito');

  botonesAgregar.forEach(boton => {
    boton.addEventListener('click', () => {
      const producto = boton.closest('.producto');
      const nombre = producto.getAttribute('data-nombre');
      const precio = parseInt(producto.getAttribute('data-precio'));
      const imagen = producto.querySelector('img')?.src;

      let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

      const indexExistente = carrito.findIndex(item => item.nombre === nombre);

      if (indexExistente !== -1) {
        carrito[indexExistente].cantidad += 1;
      } else {
        carrito.push({ nombre, precio, imagen, cantidad: 1 });
      }

      localStorage.setItem('carrito', JSON.stringify(carrito));
      actualizarContadorCarrito();

      // Feedback visual
      boton.textContent = '✅ Agregado';
      setTimeout(() => {
        boton.textContent = 'Agregar al carrito';
      }, 1000);
    });
  });
});
