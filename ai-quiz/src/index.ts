import express from "express"
import http from "http"
import dotenv from "dotenv"
import cors from "cors"
import { startEurekaClient } from "./eurekaConnection"
import routes from "./routes"

dotenv.config()

export const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 4001

const app = express()
export const server = http.createServer(app)

// TODO remove in production
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
}))

app.use(express.json())

if (process.env.NODE_ENV !== "test") {
  startEurekaClient();
}

app.use("/", routes)

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`AI-Question service is listening on port ${PORT}`);
  });
}