import express from "express";
import productosRoutes from "./routes/productos.routes.js";
import cors from "cors";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/", productosRoutes);

app.use((req, res, next) => {
  res.status(404).json({
    message: "endpoint not found",
  });
});

app.listen(3000);
console.log("Server running on port 3000");
