const express = require("express");
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT || 5050;

const { postgrator } = require("./lib/db");
const usersRouter = require("./routes/users")
const petsRouter = require("./routes/pets")
const adminRouter = require("./routes/admin");

const app = express();
app.use(express.json());
app.use(cors());
//mkdir uploads if not exists
app.use("/uploads", express.static("uploads"));

app.use("/users", usersRouter);
app.use("/pets", petsRouter)
app.use("/admin", adminRouter)


postgrator.migrate().then(result => {
    console.log(result)
    app.listen(PORT, () => {
        console.log(`Listening at http://localhost:${PORT}`);
    });
}).catch(err => console.error(err))