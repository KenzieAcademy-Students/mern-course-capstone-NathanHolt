import express from "express";
import { User } from "../models";
import bcrypt from "bcryptjs";
import keys from '../config/keys'
import jwt from 'jsonwebtoken'
const router = express.Router();

router.router("/").get((req, res, next) => {
  res.send("this is the signin endpoint");
});

router.post("/signup", async (req, res) => {
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

router.post("/signin",async(req,res)=>{
const {username,password}=req.body
if (!username || !password) {
  return res.status(422).json({ error: 'missing username or password' })
}

const user = await User.findOne({ username: username })
const passwordCorrect =
  user === null ? false : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: 'invalid username or password',
    })
  }

  

  const token = jwt.sign(userForToken, keys.jwt.secret)
  res
    .status(200)
    .send({ token, username, uid: user.id, email:user.email})
})

module.exports = router;
