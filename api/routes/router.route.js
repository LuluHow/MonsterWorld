const express = require('express');
const MonsterService = require(__dirname + "/../services/monster.service");

const router = express.Router();
router.use(express.json());

router.get('/monsters', async function(req, res) {
    try {
        var monsters = await MonsterService.getMonsters();
        res.send(monsters);
    } catch (e) {
        res.status(500).json({
            message: "Server Error"
        });
    }

});

router.post('/signup', async function(req, res) {
    const { login, password, role } = req.body;
    try {
        var monster = await MonsterService.createMonster({
            login: login,
            password: password,
            role: role
        });
        res.send(monster);
    } catch (e) {
        res.status(500).json({
            message: "Server Error"
        });
    }
});

router.post('/login', async function(req, res) {
    const { login, password } = req.body;
    try {
        MonsterService.getMonster(login, true).then(async function (monster) {
            if (!monster) {
                return res.status(403).json({
                    message: "monster Not Exist"
                });
            }

            const { password, ...responseMonster } = monster._doc;
            const isMatch = password === monster.password;

            if (!isMatch) {
                return res.status(403).json({
                    message: "Incorrect Password !"
                });
            }

            return res.status(200).send(responseMonster);
        });
    } catch (e) {
        res.status(500).json({
            message: "Server Error"
        });
    }
});

router.put('/update', async function(req, res) {
    const { id, role, friends } = req.body;
    try {
        var monster = await MonsterService.updateMonster(id, role, friends);
        monster.role = role;
        monster.friends = friends;
        res.send(monster);
    } catch (e) {
        res.status(500).json({
            message: "Server Error"
        });
    }
});

router.get("/test", async function(req, res) {
    res.send("ok");
});

module.exports = router;