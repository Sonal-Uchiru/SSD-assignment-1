import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet, { noSniff } from "helmet";
import connectorDb from "./helpers/Dbconnector";
import * as dotenv from "dotenv";
import { expressjwt as jwt } from "express-jwt";
import morgan from "morgan";
import compression from "compression";
import swaggerUI from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import open from "open";
import csrf from "csrf";
import { optionsConfig } from "./utils/swagger/config/Options";

// Routers
import unprotectedRouter from "./routes/unprotected/Index";
import authenticationRouter from "./routes/authentication/Index";
import protectedRouter from "./routes/protected/Index";

const app = express();
dotenv.config({ path: "./config/.env" });

const dbConnectionString: string = process.env.DB_CONNECTION_STRING ?? "";
const serverPort: string = process.env.PORT ?? "";
const jwtSecret = process.env.JWT_SECRET ?? "";

app.use(
  helmet({
    xFrameOptions: { action: "sameorigin" }, // Anti-clickjacking Header
    xPoweredBy: false, //  Remove "X-Powered-By" header
    noSniff: true, // X-Content-Type-Options --> Avoids MIME sniffing
  })
);

app.use(express.json());

// Restrictive cross-domain access
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://velvety-truffle-19b644.netlify.app",
    ],
  })
);
app.use(
  compression({
    level: 6,
  })
);

// swagger configuration
const swaggerSpec = swaggerJSDoc(optionsConfig(serverPort));
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

// morgan used for logging
// app.use(morgan("dev"));
app.use(morgan<Request, Response>("dev"));

connectorDb(dbConnectionString);

// Unprotected Router
app.use("/", unprotectedRouter);
// Authentication Router
app.use("/", authenticationRouter);
// Protected Router
app.use(
  "/",
  jwt({ secret: jwtSecret, algorithms: ["HS256"] }),
  protectedRouter
);

// 404 response
app.use((error: any, res: Response, next: NextFunction) => {
  try {
    const status = error.status || 404;
    const message = error.message || "Resource or Url not found";
    return res.status(status).send({
      status,
      message,
    });
  } catch (error) {
    next(error);
  }
});

// 500 (Internal server error) response
app.use((error: any, res: Response, next: NextFunction) => {
  try {
    const status = error.status || 500;
    const message =
      error.message ||
      "There was an error while processing your request, please try again";
    return res.status(status).send({
      status,
      message,
    });
  } catch (error) {
    next(error);
  }
});

const port = serverPort || 8080;

app.listen(port, () => {
  console.log(`Application started on ${port}...`);
  console.log(`Swagger Url : http://localhost:${port}/api-docs`);
  // Open Swagger doc in browser
  // open(`http://localhost:${port}/api-docs`)
});

export default app;
