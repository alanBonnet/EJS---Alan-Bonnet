const router = require("express").Router();

const {
    getUsers,
    postUser,
    putUser,
    deleteUser
} = require("../controllers/users.controllers");

router.get("/user", getUsers);

router.post("/user", postUser);

router.put("/user/", putUser);

router.delete("/user", deleteUser);

module.exports = router;