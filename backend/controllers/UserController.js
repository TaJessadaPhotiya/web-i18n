const db = require("../models/UserModel");

exports.getAllUsers = async (req, res) => {
  const users = await db.User.findAll({
    include: { model: db.Profile, as: "profile" },
  });
  res.json(users);
};

exports.getUserById = async (req, res) => {
  const user = await db.User.findByPk(req.params.id, {
    include: { model: db.Profile, as: "profile" },
  });
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
};

exports.createUser = async (req, res) => {
  try {
    const { name, email, profile } = req.body;

    const newUser = await db.User.create(
      { name, email, profile },
      {
        include: { model: db.Profile, as: "profile" },
      }
    );

    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateUser = async (req, res) => {
  const { name, email, profile } = req.body;
  const user = await db.User.findByPk(req.params.id, {
    include: { model: db.Profile, as: "profile" },
  });

  if (!user) return res.status(404).json({ error: "User not found" });

  await user.update({ name, email });
  if (user.profile) {
    await user.profile.update({ bio: profile.bio });
  }

  res.json(user);
};

exports.deleteUser = async (req, res) => {
  const user = await db.User.findByPk(req.params.id, {
    include: { model: db.Profile, as: "profile" },
  });

  if (!user) return res.status(404).json({ error: "User not found" });

  await user.profile.destroy();
  await user.destroy();

  res.json({ message: "User deleted successfully" });
};
