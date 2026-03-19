const registerUser = (req, res) => {
  res.send("User Registered");
};

const loginUser = (req, res) => {
  res.send("User Logged In");
};

module.exports = { registerUser, loginUser };