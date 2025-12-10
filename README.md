# Servidor REST de Productos (Trabajo en Equipo)

Este proyecto implementa un servidor REST funcional con Express que permite gestionar productos en memoria (crear, listar, actualizar y eliminar).

## Endpoints principales

- `GET /productos`  
  Devuelve la lista de productos.  
  **Código:** 200 OK.

- `POST /productos`  
  Crea un producto nuevo.  
  - Body JSON: `{ "nombre": "string", "precio": number, "stock": number }`  
  - Si el `nombre` está vacío se responde con **400 Bad Request**.  
  **Código:** 201 Created en caso exitoso.

- `PUT /productos/:id`  
  Actualiza un producto existente según su `id`.  
  **Códigos:**  
  - 200 OK si se actualiza.  
  - 400 Bad Request si el nombre está vacío.  
  - 404 Not Found si el producto no existe.

- `DELETE /productos/:id`  
  Elimina un producto según su `id`.  
  **Códigos:**  
  - 200 OK si se elimina.  
  - 404 Not Found si el producto no existe.

- Rutas de ejemplo para parámetros:
  - `GET /ejemplo/params/:categoria/:id` → usa `req.params`  
  - `GET /ejemplo/query?pagina=1&orden=asc` → usa `req.query`  
  - `POST /ejemplo/body` → usa `req.body` (JSON)

- Ruta para error simulado:
  - `GET /productos/error` → responde **500 Internal Server Error**.

---

## Rangos de códigos HTTP

- **1xx – Informativos:** la petición fue recibida y se está procesando.
- **2xx – Éxito:** la operación se realizó correctamente (ej: 200, 201).
- **3xx – Redirecciones:** el recurso cambió de ubicación o requiere otra acción.
- **4xx – Errores del cliente:** problema en la petición (datos inválidos, recurso no existe, etc.).
- **5xx – Errores del servidor:** fallo al procesar una petición válida (ej: 500).

---

## Preguntas del ejercicio

### 1. ¿En qué casos se utiliza cada tipo de petición HTTP?

- **GET:** cuando solo queremos consultar o leer información.
- **POST:** cuando queremos crear un nuevo recurso.
- **PUT:** cuando actualizamos un recurso existente (normalmente de forma completa o casi completa).
- **DELETE:** cuando eliminamos un recurso existente.

---

### 2. ¿Cómo debe estructurarse un endpoint según la operación?

- Usar sustantivos en plural para los recursos: `/productos`, `/usuarios`, etc.
- Usar la ruta base para la colección:  
  - `GET /productos` (listar)  
  - `POST /productos` (crear)
- Usar parámetros de ruta para un recurso específico:  
  - `GET /productos/:id`  
  - `PUT /productos/:id`  
  - `DELETE /productos/:id`
- Devolver siempre un JSON estructurado con:
  - `estado` (ok, error, creado, etc.)
  - `mensaje` descriptivo
  - `data` con el recurso o la lista cuando corresponda.

---

### 3. ¿Cuál fue el mayor reto en la creación de este servidor?

> Como equipo, el mayor reto fue coordinar la estructura de las rutas y elegir los códigos HTTP correctos según cada caso (creación, validación, recurso no encontrado o error interno). También fue importante entender cómo usar `req.params`, `req.query` y `req.body` para procesar correctamente los datos que llegan en cada tipo de petición.