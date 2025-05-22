const users = require("../database/user-queries");

async function createUser(req, res) {
    const { name, email } = req.body;

    if (!name || !email) return res.status(400).send('Missing name or email');

    try {
        const [user] = await users.createUser(name, email);
        res.status(201).json(user);
    } catch(err) {
        console.error(err);
        res.status(500).send("Error creating user");
    }
}

async function searchUser(req, res) {
    const { email } = req.body;

    if (!email) return res.status(400).send("Missing email");

    try {
        const user = await users.findByEmail(email);
        res.status(200).json(user);
    } catch(err) {
        console.error(err);
        res.status(500).send("Error searching user");
    }
}

module.exports = { createUser, searchUser };