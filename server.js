import express from "express";
import morgan from "morgan";
import { connect } from "mongoose";
import cors from "cors";
import fileUpload from "express-fileupload";
import Authrouter from "./routes/AuthRouter.js";
import UserRouter from "./routes/UserRouter.js";
import { AuthMiddleware } from "./middlewares/AuthMiddleware.js";

const app = express();

app.use(morgan("dev"));
app.use(cors({ origin: "*" }));
app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
  })
);

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

const port = process.env.PORT || 5000;

app.use("/", async (req,res) => {
	res.status(200).json({message: "SERVEUR OK"});
})

app.use("/api/auth", Authrouter);

app.use("/api/user", AuthMiddleware, UserRouter);

app.listen(port, () => {
  console.log(`Server started on ${port}`);
});

connect("mongodb://127.0.0.1:27017/api_association")
  .then(() => console.log("Mongodb connected"))
  .catch((err) => {
    console.log("Erreur de connection : " + err);
  });
