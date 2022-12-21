require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const helmet = require("helmet");
const xss = require("xss-clean");
const cors = require("cors");
const rateLimiter = require("express-rate-limit");
const auth = require("./middleware/authentication");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");

//
const connectDb = require("./db/connect");
// router
const authRouter = require("./routes/auth");
const jobsRouter = require("./routes/jobs");

// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.set("trust proxy", 1); //for huruko
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes //how long
    max: 100, // limit each IP to 100 requests per windowMs //how many
  })
);
app.use(express.json());
// extra packages

// routes
app.use(helmet());
app.use(cors());
app.use(xss());
app.get("/", (req, res) => {
  res.send("<h1>api docs</h1>< <a href='/api-use'>go to documentation</a>");
});

app.use("/api-use", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", auth, jobsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDb(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
