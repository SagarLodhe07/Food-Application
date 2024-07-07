const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First is Require"],
      trim: true,
      lowercase: true,
      maxlength: [10, " First name must be less than 10 character"],
      minlength: [3, "first name must be or equal to atleast 3 character long"],
    },
    lastName: {
      type: String,
      required: [true, "last is Require"],
      trim: true,
      lowercase: true,
      maxlength: [10, " last name must be less than 10 character"],
      minlength: [3, "last name must be  or equal to atleast 3 character long"],
    },
    mobileNumber: {
      type: String,
      required: [true, "Mobile Number is required"],
      unique: [true, "Phone number is already in Use"],
      trim: true,
      minlength: [10, "Phone number should be length 10"],
      maxlength: [10, "Phone number should be length 10"],
    },
    email: {
      type: String,
      trim: true,
      unique: [true, "email in already in use"],
      required: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "password should be provided"],
      minlength: [6, "password length minimum 6 charcter"],
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default:"USER"
    },
    address:{
      type:String
    }
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
  const hashedPassaword = await bcrypt.hash(this.password, 10);
  this.password = hashedPassaword;
  console.log(this);
});
const User = mongoose.model("User", userSchema);
module.exports = User;
