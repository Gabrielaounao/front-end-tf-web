const dotenv = require('dotenv');
const express = require('express');
const session = require('cookie-session');
const app = express();
dotenv.config();

const port = process.env.PORT || 8080;

const publicRouter = require("./routes/public.js");
const userRouter = require("./routes/user.js");
const adminRouter = require("./routes/admin.js");

app.use("/static", express.static(require("path").join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(session({
  name: 'session',
  keys: [process.env.SECRET, process.env.SECRET], 
  maxAge:  24 *  60 *  60 *  1000
}));

app.use(publicRouter);
app.use(userRouter);
app.use("/admin", adminRouter);

app.listen(port, () => {
    console.log(`${process.env.URL}`)
});
