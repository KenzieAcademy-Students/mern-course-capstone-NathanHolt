import express from "express";
import { User } from "../models";
import bcrypt from "bcryptjs";

const router = express.Router();

router.router("/").get((req, res, next) => {
  res.send("this is the signin endpoint");
});

router.route("signup", async (req, res) => {
  const { username, password, email } = req.body;
  if (!password || !username || !email) {
    return res.status(422).json({ err: "Enter all" });
  }
  User.findOne({ username: username }).then((save) => {
    if (save) {
      return res.status(422).json({ err: "User alright here" });
    }

    bcrypt
      .hash(password, 12)
      .then((hashedpassword) => {
        const user = new User({
          username,
          passwordHash: hashedpassword,
          email,
        });

        user
          .save()
          .then((user) => {
            res.json({ message: "saved successfully" });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

module.exports = router;
