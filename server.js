// Getting required libaries
const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
app.use(express.json());

// Serve HTML to user
app.use(express.static('public'));

// Where we will store our users
const users = [];

// Get info from users
app.get('/users', (req, res) => {
    res.json(users);
})

// Login logic
app.post('/users/login', async (req, res) => {
    const user = users.find(user => user.name === req.body.name)
    if (user == null) {
        return res.status(400).send("User not found")
    }
    try {
       if(await bcrypt.compare(req.body.password, user.password)) {
        res.status(201).send('Success')
       } else {
        res.status(401).send('Not allowed');
       }
    } catch {
        res.status(401).send();
    }
})

// Registration logic
app.post('/users', async (req, res) => {
    try {
        const salted = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(req.body.password, salted)
        const user = { name: req.body.name, password: hashedPassword }
        users.push(user);
        res.status(201).send();
    } catch {
        res.status(401).send();
    }
})

// Listen on port 5500
app.listen(5501, () => {
    console.log("I'm working!")
});
