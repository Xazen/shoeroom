import "core-js/stable";
import "regenerator-runtime/runtime";
import express from "express";
import bodyParser from "body-parser";
import user from "./routes/user";
import InitiateMongoServer from "./config/db";

InitiateMongoServer();

const app = express();

// PORT
const PORT = process.env.PORT || 8080;

// Middleware
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.json({ message: "API Working!" });
});

app.use("/user", user);

app.listen(PORT, () => {
    console.log(`Server Started at PORT ${PORT}`);
});