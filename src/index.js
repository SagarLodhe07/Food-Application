const express = require("express");
const serverConfig = require("./Config/serverConfig");
const connectDB = require("./Config/dbConfig");
const userRouter = require("./Routes/userRoute");
const cartRouter = require("./Routes/cartRoute");
const authRouter = require("./Routes/authRoute");
const cookieParser = require("cookie-parser");
const uploader = require("./middleware/multer");
const cloudinary = require("./Config/cloudnaryConfig");
const fs = require("fs/promises");
const productRouter = require("./Routes/productRoutes");
const orderRouter = require("./Routes/orderRoute");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin:serverConfig.FRONTEND_URL,
    // origin:'*',
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

/**Routing middleware */
app.use("/users", userRouter);
app.use("/carts", cartRouter);
app.use("/auth", authRouter);
app.use("/product", productRouter);
app.use("/orders", orderRouter);

app.get("/ping", (req, res) => {
  console.log(req.body);
  console.log(req.cookies);
  return res.json({
    message: "PONG",
  });
});

app.post("/photo", uploader.single("incomingFile"), async (req, res) => {
  const result = await cloudinary.uploader.upload(req.file.path);
  console.log("Result from cloud", result);
  await fs.unlink(req.file.path);

  // const newProduct = await Product.create({
  //   productName: "Margherita",
  //   // productImage: result.secure_url,
  //   price: 15,
  //   category:'non-veg',
  //   inStock: true,
  //   descripition: "cheese Pizza",
  // });
  // // console.log("New Product Details", newProduct);
  // return res.json({
  //   message: "Photo Uploaded",
  // });
});

app.listen(serverConfig.PORT, async () => {
  await connectDB();
  console.log(`Server started To Port ${serverConfig.PORT}`);
});
