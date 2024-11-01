import express, { Express } from "express";
import dotenv from "dotenv";
import routes from "./routes";

dotenv.config();

const cors = require("cors");
const app: Express = express();
const port = process.env.PORT || 3001;

app.use(cors());

routes(app);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
