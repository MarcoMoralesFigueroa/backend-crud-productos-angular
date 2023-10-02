import { pool } from "../db.js";

export const crearProducto = async (req, res) => {
  const { nombre, categoria, ubicacion, precio } = req.body;
  try {
    const [rows] = await pool.query(
      "INSERT INTO productos (nombre, categoria, ubicacion, precio) VALUES(?, ?, ?, ?)",
      [nombre, categoria, ubicacion, precio]
    );
    res.send({
      id: rows.insertId,
      nombre,
      categoria,
      ubicacion,
      precio,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Algo salio mal",
    });
  }
};

export const obtenerProductos = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM productos");
    res.json(rows);
    console.log(rows);
  } catch (error) {
    return res.status(500).json({
      message: "Algo salio mal",
    });
  }
};

export const obtenerProducto = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM productos WHERE id = ?", [
      req.params.id,
    ]);

    if (rows.length <= 0) {
      return res.status(404).json({
        message: "Producto no encontrado",
      });
    }

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({
      message: "Algo salio mal",
    });
  }
};

export const actualizarProducto = async (req, res) => {
  const { id } = req.params;
  const { nombre, categoria, ubicacion, precio } = req.body;

  try {
    const [result] = await pool.query(
      "UPDATE productos SET nombre = ?, categoria = ?, ubicacion = ?, precio = ? WHERE id = ?",
      [nombre, categoria, ubicacion, precio, id]
    );

    console.log(result);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Producto no encontrado",
      });
    }

    const [rows] = await pool.query("SELECT * FROM productos WHERE id = ?", [
      id,
    ]);

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({
      message: "Algo salio mal",
    });
  }
};

export const eliminarProducto = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM productos WHERE id = ?", [
      req.params.id,
    ]);

    if (result.affectedRows <= 0) {
      return res.status(404).json({
        message: "Producto no encontrado",
      });
    }
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({
      message: "Algo salio mal",
    });
  }
};
