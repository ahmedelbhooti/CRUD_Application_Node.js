const userDB = require('../models/model');

//create new user and save
exports.create = (req, res) => {
    //validate request
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty." });
        return;
    }

    //new user
    const user = new userDB({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status,
    });

    //save new user in database
    user.save(user)
        .then(data => {
            // res.send(data)
            res.redirect("/");
        })
        .catch(err => res.status(500)
            .send({ message: err.message || "Something went wrong." }));

};

//return all users and return user with id
exports.find = (req, res) => {
    if (req.query.id) {
        const id = req.query.id;
        userDB.findById(id)
            .then(data => {
                if (!data) {
                    res.status(404).send({ message: "User not found." });
                }
                res.send(data);
            })
            .catch(err => res.status(500).send({ message: err.message || "Something went wrong." }))

    }
    else {
        userDB.find()
            .then(user => { res.send(user) })
            .catch(err => res.status(500).send({ message: err.message || "Something went wrong." }));
    }

};

//Update user data
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({ message: "Content can not be empty" });

    }
    const id = req.params.id;
    userDB.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot update user with ${id}. Maybe user not found!` });
            }
            else {
                res.send(data);
            }
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Something went wrong" })
        })
}


//Delete user
exports.delete = (req, res) => {
    const id = req.params.id;
    userDB.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot delete this user with ${id}. Maybe not found` })
            }
            else {
                res.send({
                    message: "User was delete successfully"
                })
            }

        })
        .catch(err => res.status(500).send({ message: err.message || "Something went wrong" }));
};