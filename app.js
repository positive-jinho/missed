import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import passport from "passport";
import mongoose from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo";
import routes from "./routes";
import { localsMiddleware } from "./middlewares";
import globalRouter from "./routers/globalRouter";
import photoRouter from "./routers/photoRouter";
import userRouter from "./routers/userRouter";

import "./passport";
import apiRouter from "./routers/apiRouter";

const app = express();

const CookieStore = MongoStore(session);

app.set("view engine", "pug");
app.use("/static", express.static("static"));
app.use("/uploads", express.static("uploads"));

app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: false,
    store: new CookieStore({ mongooseConnection: mongoose.connection })
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(localsMiddleware);

app.use(routes.home, globalRouter);
app.use(routes.photo, photoRouter);
app.use(routes.user, userRouter);
app.use(routes.api, apiRouter);

export default app;
