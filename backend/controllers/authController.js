const User = require("../models/User");
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

exports.registerUser = async (req, res) => {
  const { fullName, email,phone, password, profileImageUrl } = req.body;

 
  if (!fullName || !email || !phone || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email já em uso." });
    }

    
    const user = await User.create({
      fullName,
      email: email.toLowerCase(),
      phone,
      password,
      profileImageUrl,
    });

    res.status(201).json({
      id: user._id,
      user,
      token: generateToken(user._id),
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Erro para registrar o usuário.", error: err.message });
  }
};


exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  const emailLowerCase = email.toLowerCase();
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }
  try {
    
    const user = await User.findOne({email:emailLowerCase});
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ message: "Email ou senha errada." });
    }

    res.status(200).json({
      id: user._id,
      user,
      token: generateToken(user._id),
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Erro no login do usuário.", error: err.message });
  }
};


exports.getUserInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro no usuário." });
  }
};
