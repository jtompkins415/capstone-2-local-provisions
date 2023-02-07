"use strict"

const express = require('express');
const router = new express.Router();
const {ensureAdmin} = require('../middleware/auth');
const User = require('../models/user');



 /** Get all users
  * permissions: admin only
  */

router.get('/', ensureAdmin, async (req, res, next) => {
    try{
      const users = await User.findAll();
      return res.json({users});
    }catch(err){
      return next(err);
    }
});

/** Register user
 * 
 * Returns {} 
 * permissions: none
*/

router.post('/:username', async (req, res, next) => {
  try{
    const {username, password, firstName, lastName, email, isAdmin} = req.body
    const result = await User.register(username, password, firstName, lastName, email, isAdmin);
    
    return res.status(201).json(result.rows[0]);
  }catch(err) {
    return next(err);
  }
})
