"use strict";

const express = require('express');
const router = new express.Router();
const {ensureAdmin, ensureCorrectUserOrAdmin} = require('../middleware/auth');
const POI = require('../models/POI');
const {
    BadRequestError,
    NotFoundError
} = require('../expressError');
const jsonschema = require('jsonschema');
const { json } = require('express');



/** ADMIN ONLY POI ROUTES */

/**GET: Get list of all Points of Interest
 * 
 * Returns {POIs: [{name, rating, type, url}, {...}] }
 * 
 */

router.get('/', ensureAdmin, async (req, res, next) => {
    try{
        const results = await POI.getAllPOI();
        return res.status(200).json({results})
    } catch (err) {
        return next(err);
    }
});

/**GET: Get POI by id
 * 
 * Returns {name, rating type, url}
 * 
 */

router.get('/:id', ensureAdmin, async (req, res, next) => {
    try {
        const {id} = req.params
        const results = await POI.getPOI(id)

        const poi = results.rows[0];

        return res.status(200).json({poi});
    } catch (err) {
        return next(err);
    }
});

/**POST: Add new POI
 * 
 *  Returns {poi: {name, rating, type, url}}
 * 
 */

router.post('/:id', ensureAdmin, async (req, res, next) => {
    try{
        const {id} = req.params;
        const {name, rating, type, url } = req.body
        const results = await POI.addNewPOI({name, rating, type, url});

        const newPOI = results.rows[0];

        return res.status(201).json({newPOI});
    }catch(err){
        return next(err);
    }
});

/** PATCH: Update POI
 * 
 * Can be a partial update
 * 
 * Data accepted:
 * {name, rating, type, url}
 * 
 * Returns {name, rating, type, url};
 * 
 */

router.patch('/:id', ensureAdmin, async (req, res, next) => {
    try{
        const validator = jsonschema.validate(req.body, poiUpdateSchema);
        if(!validator.valid) {
            const errs = validator.errors.map(err => err.stack);
            throw new BadRequestError(errs)
        }

        const {id} = req.params;

        const result = await POI.updatePOI(id, req.body);
        return res.status(204).json({result});
    } catch(err) {
        return next(err);
    }
});

/** DELETE: Delete user */

router.delete('/:id', ensureAdmin, async (req, res, next) => {
    try{
        const {id} = req.params;
        await POI.remove(id);
        return res.status(204).json({deleted: id})
    }catch (err) {
        return next(err)
    }
});



