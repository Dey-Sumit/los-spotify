import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import routes from "./routes";

const PORT = 8000 || process.env.PORT;

const app = express();
app.use(cors());
app.use(routes);

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
