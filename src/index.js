require("dotenv").config();
const express = require("express");
const config = require("./config/app.config");
const errHandlerMiddleware = require("./middlewares/errHandler.middleware");
const apiRoute = require("./routes/index");

const app = express();

app.use(express.json());

app.use('/api/v1', apiRoute);
app.use('/public', express.static('public'));
app.use(errHandlerMiddleware);

app.listen(config.PORT, () => {
    console.log(`App listening on port http://localhost:${config.PORT}`);
});
