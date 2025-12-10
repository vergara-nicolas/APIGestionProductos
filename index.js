// index.js
const express = require('express');
const app = express();
const PORT = 3000;

// Middleware para procesar JSON en el body
app.use(express.json());

// "Base de datos" en memoria
let productos = [
  { id: 1, nombre: 'Teclado', precio: 25000, stock: 10 },
  { id: 2, nombre: 'Mouse', precio: 15000, stock: 20 }
];

// Función para generar IDs incrementales
const getNextId = () => {
  if (productos.length === 0) return 1;
  return productos[productos.length - 1].id + 1;
};

/* ============================
   PARTE 2: RUTAS PRINCIPALES
   ============================ */

// GET /productos → lista de productos (200)
app.get('/productos', (req, res) => {
  res.status(200).json({
    estado: 'ok',
    mensaje: 'Listado de productos',
    data: productos
  });
});

// POST /productos → crea un producto (201 o 400)
app.post('/productos', (req, res) => {
  const { nombre, precio, stock } = req.body;

  // Validación requerida por la consigna
  if (!nombre || nombre.trim() === '') {
    return res.status(400).json({
      estado: 'error',
      mensaje: 'El nombre del producto es obligatorio'
    });
  }

  const nuevoProducto = {
    id: getNextId(),
    nombre,
    precio: precio ?? 0,
    stock: stock ?? 0
  };

  productos.push(nuevoProducto);

  res.status(201).json({
    estado: 'creado',
    mensaje: 'Producto creado correctamente',
    data: nuevoProducto
  });
});

// PUT /productos/:id → actualiza un producto (200, 400 o 404)
app.put('/productos/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, precio, stock } = req.body;

  const index = productos.findIndex(p => p.id === parseInt(id));

  if (index === -1) {
    return res.status(404).json({
      estado: 'no-encontrado',
      mensaje: `No existe producto con id ${id}`
    });
  }

  if (nombre !== undefined && nombre.trim() === '') {
    return res.status(400).json({
      estado: 'error',
      mensaje: 'El nombre del producto no puede estar vacío'
    });
  }

  productos[index] = {
    ...productos[index],
    ...(nombre !== undefined && { nombre }),
    ...(precio !== undefined && { precio }),
    ...(stock !== undefined && { stock })
  };

  res.status(200).json({
    estado: 'ok',
    mensaje: `Producto con id ${id} actualizado`,
    data: productos[index]
  });
});

// DELETE /productos/:id → elimina un producto (200 o 404)
app.delete('/productos/:id', (req, res) => {
  const { id } = req.params;

  const index = productos.findIndex(p => p.id === parseInt(id));

  if (index === -1) {
    return res.status(404).json({
      estado: 'no-encontrado',
      mensaje: `No existe producto con id ${id}`
    });
  }

  const eliminado = productos.splice(index, 1)[0];

  res.status(200).json({
    estado: 'ok',
    mensaje: `Producto con id ${id} eliminado`,
    data: eliminado
  });
});

/* =================================
   PARTE 3: PARÁMETROS Y PROCESO
   ================================= */

// Parámetros por URL (req.params)
app.get('/ejemplo/params/:categoria/:id', (req, res) => {
  res.status(200).json({
    origen: 'params',
    params: req.params
  });
});

// Parámetros por query string (req.query)
app.get('/ejemplo/query', (req, res) => {
  res.status(200).json({
    origen: 'query',
    query: req.query
  });
});

// Parámetros por body (req.body)
app.post('/ejemplo/body', (req, res) => {
  res.status(200).json({
    origen: 'body',
    body: req.body
  });
});

/* ===========================
   PARTE 4: CÓDIGOS DE RESPUESTA
   =========================== */

// Simular error 500 controlado
app.get('/productos/error', (req, res) => {
  try {
    throw new Error('Error interno simulado');
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      estado: 'error',
      mensaje: 'Ocurrió un error interno en el servidor'
    });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor REST escuchando en http://localhost:${PORT}`);
});
