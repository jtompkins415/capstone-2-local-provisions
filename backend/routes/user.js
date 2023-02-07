"use strict"

const express = require('express');
const router = new express.Router();
const {ensureAdmin, ensureCorrectUserOrAdmin} = require('../middleware/auth');
const User = require('../models/user');
const {BadRequestError} = require('../expressError');
const jsonschema = require('jsonschema')



 /** GET: Get all users
  * 
  * Returns {users: [{username, firstName, lastName, email, isAdmin}, {...}]}
  * 
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

/** POST: Add new user
 * 
 * Not a registraion endpoint. Allow admin to add user to DB
 * 
 * Returns {user: {username, firstName, lastName, email, isAdmin}} 
 * permissions: Admin
*/

router.post('/:username', ensureAdmin, async (req, res, next) => {
  try{
    const validator = jsonschema.validate(req.body, userUpdateSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }


    const {username, password, firstName, lastName, email, isAdmin} = req.body
    const result = await User.register(username, password, firstName, lastName, email, isAdmin);
    
    return res.status(201).json(result.rows[0]);
  }catch(err) {
    return next(err);
  }
})

/** GET: Get information on a single user
 * 
 * Returns {user: {username, firstName, lastName, email }}
 * 
 * permissions: Admin or Same user
 */

router.get('/:username', ensureCorrectUserOrAdmin, async (req, res, next) => {
  try {
    const {username} = req.params;
    const result = await User.get(username);

    return res.status(200).json(result.rows[0]);
  } catch (err) {
    return next(err);
  }
});

/** PATCH: Update user information 
 * 
 *
 * 
 * Data can include:
 *  {firstName, lastName, password, email. isAdmin}
 * 
 * Returns {user: {username, firstName, lastName, email, isAdmin}}
 * 
 * Permissions: Admin or Same user
*/

router.patch('/:username', ensureCorrectUserOrAdmin, async (req, res, next) => {
  try {
    const validator = jsonschema.validate(req.body, userUpdateSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const {username} = req.params

    const result = await User.update(username, req.body)
    return res.status(204).json({result});
  } catch (err) {
    return next(err)
  }
})

/** DELETE: Delete user
 * 
 * Permissions: Admin or Same user
 */

router.delete('/:username', ensureCorrectUserOrAdmin, async (req, res, next) => {
  try {
    const {username} = req.params
    await User.remove(username)
    return res.status(204).json({deleted: username})
  } catch (err) {
    return next(err)
  }
})