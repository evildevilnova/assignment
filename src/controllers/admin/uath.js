const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const shortid = require('shortid');
const express = require('express');
const app = express();

exports.signup = (req, res) => {
    User.findOne({ phone: req.body.phone })
        .exec(async (error, data) => {
            if (data) return res.status(400).json({
                message: "Admin is already registered"
            });
            const {
                name,
                phone,
                password
            } = req.body;

            const hash_password = await bcrypt.hash(password, 10);
            const _user = new User({
                name,
                phone,
                hash_password,
                username: shortid.generate(),
                role: "team"
            });

            _user.save((error, data) => {
                if (error) {
                    return res.status(400).json({
                        message: "something went wrong"
                    });
                }

                if (data) {
                    return res.status(200).json({
                        message: "Team Ragistretion  is successful."
                    });
                }
            });
        })
}

exports.signin = async (req, res) => {
    try{
    await User.findOne({ phone: req.body.phone })
        .exec(async (error, user) => {
            if(user == null) return res.status(400).json({ message:"team is not exist", status:403 })
            
            if (user.authenticate(req.body.password) && user.role == "team" ) {
                try {
                    const admin = await bcrypt.compare(req.body.password, user.hash_password)
                    if (admin) {
                        const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
                        // res.cookie("token", token);
                        const { name, role, phone } = user;

                        // storing token in client browser
                        res.status(200).json({
                            token,
                            user: {
                                name, role, phone
                            }
                        });
                        console.log('ok')
                    } else {
                        res.status(400).json({
                            message: "invalid password"
                        });
                    }
                } catch (e) {
                    res.status(400).json({
                        message: "server error"
                    });
                }

            } else {
                return res.status(400).json({
                    message: "invalid user"
                })
            }


        });
    }catch(e){
        if(e){
            res.status(400).json({ message: "Invalid user"});
        }
    }
};

exports.signout = (req, res) => {
    res.clearCookie('token');
    res.status(200).json({
        message: 'Signout Successfully...',
        status:204
    })
}