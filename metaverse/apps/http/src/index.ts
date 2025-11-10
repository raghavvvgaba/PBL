import express from "express";
import { router } from "./routes/v1";

const app = express();
app.use(express.json())

app.use("/api/v1", router)

const port = parseInt(process.env.HTTP_PORT || '3000');
app.listen(port, () => {
  console.log(`🚀 HTTP Server running on http://localhost:${port}`);
  console.log(`📊 API available at http://localhost:${port}/api/v1`);
  console.log(`🔑 JWT Password configured: ${!!process.env.JWT_PASSWORD}`);
});
