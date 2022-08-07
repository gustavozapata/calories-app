const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const promisify = require("util").promisify;

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ status: "fail", message: "User not found" });
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (validPassword) {
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    return res.status(200).json({
      status: "success",
      data: {
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        isLogged: true,
        token,
      },
      message: "",
    });
  }

  return res.status(401).json({
    status: "fail",
    isLogged: false,
    message: "Incorrect email or password",
  });
};

exports.signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return res
      .status(400)
      .json({ status: "fail", message: "User already exists" });
  }

  const newUser = new User({
    name,
    email,
    password,
  });

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  newUser.password = hashedPassword;
  await newUser.save();

  const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET);

  return res.status(201).json({
    status: "success",
    data: {
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
      isLogged: true,
      token,
    },
    message: "",
  });
};

exports.protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      res
        .status(401)
        .json({ message: "You are not logged in. Please log in to get access" })
    );
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const currentUser = await User.findById(decoded._id);
  if (!currentUser)
    return next(
      res.status(401).json({
        status: "fail",
        message: "The user belonging to this token does not longer exist",
      })
    );

  req.user = currentUser;
  next();
};

exports.restrictTo = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).json({
        status: "fail",
        message: "You do not have permission to access this route",
      });
    }
    next();
  };
};
