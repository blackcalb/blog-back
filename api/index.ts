import express, { Express } from "express";
import dotenv from "dotenv";
import routes from "./routes";
import bodyParser from "body-parser";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3001;

routes(app);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
