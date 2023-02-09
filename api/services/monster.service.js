const Monster = require('../Models/monster.schema');
const mongoose = require("mongoose");

const MonsterService = function() {};

// Create
MonsterService.prototype.createMonster = async (req, res) => {
  const monster = new Monster({
    login: req.login,
    password: req.password,
    role: req.role
  });

  await monster.save();
  return monster;
};

// Read
MonsterService.prototype.getMonsters = async (req, res) => {
  return await Monster.find().select(["-password", "-friends"]);
};

MonsterService.prototype.getMonster = async (login, res) => {
  return await Monster.findOne({ login: login });
};

// Update
MonsterService.prototype.updateMonster = async (id, role, friends, res) => {
  return await Monster.findByIdAndUpdate(id,{ role: role, friends });
};

// Delete
MonsterService.prototype.deleteMonster = (req, res) => {
  Monster.findByIdAndDelete(req.params.id, (err, result) => {
    if (err) return res.status(500).send(err);
    if (!result) return res.status(404).send("Monster not found");
    res.status(200).send("Monster deleted");
  });
};

module.exports = new MonsterService();