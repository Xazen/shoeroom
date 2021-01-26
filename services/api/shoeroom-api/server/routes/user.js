import express from "express";
import bcrypt from "bcryptjs";
import { check, validationResult } from "express-validator";
import User from "../model/User";
import jwt from "jsonwebtoken";

const router = express.Router();
/**
 * @method - POST
 * @param - /signup
 * @description - User SignUp
 */
router.post(
    "/signup",
    [
        check("username", "Please enter a valid username.").not().isEmpty(),
        check("email", "Please enter a valid email.").isEmail(),
        check("password", "Please enter a valid password.").isLength({
            min: 6
        })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        const {
            username,
            email,
            password
        } = req.body;
        try {
            let user = await User.findOne({ email });
            if (user) {
                return res.status(400).json({
                    msg: "User already exists."
                });
            }

            user = new User({
                username, email, password
            });

            let salt = await bcrypt.genSalt();
            user.password = await bcrypt.hash(password, salt);

            await user.save();

            const payload = {
                user: {
                    id: user.id
                }
            };

            jwt.sign(
                payload,
                "randomString",
                {
                    expiresIn: 10000
                },
                (err, token) => {
                    if (err) throw err;
                    res.status(200).json({
                        token
                    });
                }
            );
        } catch (e) {
            console.log(e.message);
            res.status(500).send("Error in Saving");
        }
    });

/**
 * @method - POST
 * @param - /login
 * @description - User Login
 */
router.post(
    "/login",
    [
        check("email", "Please enter a valid username.").isEmail(),
        check("password", "Please enter a valid password").isLength({
            min: 6
        })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        const {
            email,
            password
        } = req.body;
        try {
            let user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({
                   message: "User does not exist"
                });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({
                   message: "Password incorrect"
                });
            }

            const payload = {
                user: {
                    id: user.id
                }
            };

            jwt.sign(
              payload,
              "secret",
                {
                    expiresIn: 3600
                },
                (err,  token) => {
                  if (err) throw err;
                  res.status(200).json({
                      token
                  });
                }
            );
        } catch (e){
            console.log(e);
            res.status(500).json({
                message: "Sever error"
            });
        }
    });

export default router;