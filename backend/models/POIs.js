"use strict";

const db = require("../db");
const {sqlForPartialUpdate} = require("../helpers/sql");
const {
    NotFoundError,
    BadRequestError
} = require('../expressError');

class POIs {
   
    /** Find all Points of Interest
     * 
     * Returns [{name, rating, type, url}, ...]
     */

    static async getAllPOI() {
        const results = await db.query(
            `SELECT name,
                rating, 
                type,
                url
            FROM POIs
            ORDER BY rating`
        );

        return results.rows;

    }

    /** Add new Point of Interest
     * 
     * Returns { name, rating, type, url }
     * 
     * Throw BadRequestError on duplicates
     */

    static async addNewPOI({name, rating, type, url}) {
        const duplicateCheck = await db.query(
            `SELECT name,
                rating,
                type,
                url
            FROM POIs
            WHERE name = $1`,
            [name],
        )

        if(!duplicateCheck.rows[0]){
            throw new BadRequestError(`Duplicate Location: ${name}`);
        }

        const result = await db.query(
            `INSERT INTO 
                POIs
                (name,
                 rating,
                 type,
                 url)
                VALUES ($1, $2, $3, $4)
                RETURNING name, rating, type, url`,
                [name,
                rating,
                type,
                url],
        );

        const poi = result.rows[0];

        return poi;
    };

    /** Given an ID, pull information for a Point of Interest
     * 
     * Returns { name, rating, type, url }
     * 
     * Throws NotFoundError if POI is not found
     */

    static async getPOI(id) {
        const poiRes = await db.query(
            `SELECT id,
                name,
                rating,
                type,
                url
            FROM POIs
            WHERE id = $1`,
            [id],
        );

        const poi = poiRes.rows[0];

        if(!poi) throw new NotFoundError(`NO POI: ${poi.name}`);

        return poi;
    }

    /** Update information for a Point of Interest
     * 
     * Partial Update - Doesn't require all data to update
     * 
     * Data can include:
     * { name, rating, type, url }
     * 
     * Returns  { name, rating, type, url}
     * 
     * Throws NotFoundError if POI is not found
     */

    static async updatePOI(id, data) {
        
        const {setCols, values} = sqlForPartialUpdate(
            data,
            {
                name: 'name',
                rating: 'rating',
                type: 'type',
                url: 'url'
            });
            
        const poiVarId = "$" + (values.length + 1)
        
        const querySql = await db.query(
            `UPDATE POIs
             SET ${setCols}
             WHERE id = ${poiVarId}
             RETURNING name,
                rating,
                type,
                url
        `);

        

        if (!results) throw new NotFoundError(`POI: ${id} not found`);

        return results;
    }; 

    static async remove(id) {
        const 
    }
}

module.exports = POIs;