require('dotenv/config')
const express = require("express");
const cors = require('cors');
const { router } = require('./routes')
const { notFoundMiddleware, errorMiddleware } = require("./middlewares");

const app = express();

app.use(cors())
app.use(express.json());
app.use('/', router)

app.use(errorMiddleware);
app.use(notFoundMiddleware);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
