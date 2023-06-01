const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
// Load User model
const User = require("../../models/User");
// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
    // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
  User.findOne({ email: req.body.email }).then(user => {
      if (user) {
        return res.status(400).json({ email: "Email already exists" });
      } else {
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          type: req.body.type
        });
  // Hash password before saving in database
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          });
        });
      }
    });
  });

router.post("/users", (req, res) => {
    // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
  User.findOne({ email: req.body.email }).then(user => {
      if (user) {
        return res.status(400).json({ email: "Email already exists" });
      } else {
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          type: req.body.type
        });
  // Hash password before saving in database
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          });
        });
      }
    });
  });

router.get('/users', async (req, res) => {
    const limit = parseInt(req.query._limit);
    const skip = parseInt(req.query._start);
  
    const [user, count] = await Promise.all([
      User.find().limit(limit).skip(skip),
      User.countDocuments()
    ]);
  
    const rangeStart = skip;
    const rangeEnd = Math.min(skip + limit - 1, count - 1);
    const contentRange = `news ${rangeStart}-${rangeEnd}/${count}`;
  
    res.set('Content-Range', contentRange);
    res.json(user);
  });

router.delete("/users/:id", (req, res) => {
  const userId = req.params.id;

  // // Check if user ID meets the condition
  // if (userId === localStorage.getItem('currentId')) {
  //   return res.status(403).json({ error: "Deletion not allowed for this user" });
  // }


  User.findByIdAndRemove(userId)
    .then(() => {
      // Handle the successful deletion of the user
      res.json({ success: true });
    })
    .catch(err => {
      // Handle any errors that occur during the deletion process
      res.status(500).json({ error: "Failed to delete user" });
    });
});
// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
    // Form validation
  const { errors, isValid } = validateLoginInput(req.body);
  // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const email = req.body.email;
    const password = req.body.password;

    
  // Find user by email
    User.findOne({ email }).then(user => {
      // Check if user exists
      if (!user && email !== 'admin@admin.com') {
        return res.status(404).json({ emailnotfound: "Email not found" });
      }
  // Check password
      if(user) {
        bcrypt.compare(password, user.password).then(isMatch => {
          if (isMatch) {
            // User matched
            // Create JWT Payload
            const payload = {
              id: user.id,
              name: user.name
            };
    // Sign token
            jwt.sign(
              payload,
              keys.secretOrKey,
              {
                expiresIn: 86400 // 1 year in seconds
              },
              (err, token) => {
                res.json({
                  success: true,
                  id: user.id,
                  token: "Bearer " + token + user.type.slice(0,2)
                });             
              }
            );
          } else {
            return res
              .status(400)
              .json({ passwordincorrect: "Password incorrect" });
          }
        });
      } else if (email === 'admin@admin.com' && password === 'admin123') {
          bcrypt.compare(password, '$2a$10$EZhuo4aGRVJus8lyQd/Ia.JBUdZ/BT8uNMSWo02ZzDaTGIRI3c7IG').then(isMatch => {
            if (isMatch) {
              // User matched
              // Create JWT Payload
              const payload = {
                id: 1,
                name: 'admin'
              };
              // Sign token
              jwt.sign(
                payload,
                keys.secretOrKey,
                {
                  expiresIn: 86400 // 1 year in seconds
                },
                (err, token) => {
                  res.json({
                    success: true,
                    id: '1',
                    token: "Bearer " + token + 'ad'
                  });             
                }
              );
            } else {
              return res
                .status(400)
                .json({ passwordincorrect: "Password incorrect" });
            }
          });
      } else {
        return res
        .status(400)
        .json ({passwordincorrect: 'Not registered user'})
      }
    });
  });

module.exports = router;