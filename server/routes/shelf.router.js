const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * Get all of the items on the shelf
 */
router.get('/', (req, res) => {
    console.log('GET all route');
    if (req.isAuthenticated()) {
        let queryText = `SELECT * FROM "item"`;
        pool.query(queryText)
        .then((result) => {
            res.send(result.rows);
        }).catch((error) => {
            console.log('error on item GET: ', error);
            res.sendStatus(500);
        })
    } else {
        res.sendStatus(403);
    }
});

/**
 * Add an item for the logged in user to the shelf
 */
router.post('/', (req, res) => {
    console.log('POST route');
    if (req.isAuthenticated()) {
        let queryText = `INSERT INTO "item" ("description", "image_url", "person_id")
                        VALUES ($1, $2, $3)`;
        pool.queryText(queryText, [req.body.description, req.body.image_url, req.user.id])
            .then((result) => {
                res.sendStatus(201);
            })
            .catch((error) => {
                res.sendStatus(500);
                console.log('error on POST: ', error)
            })
    } else {
        res.sendStatus(403);
    }
});


/**
 * Delete an item if it's something the logged in user added
 */
router.delete('/', (req, res) => {
    console.log('DELETE item route');
    if (req.isAuthenticated() && req.query.person_id == req.user.id) {
        let queryText = `DELETE FROM "item" WHERE "id" = $1`;
        pool.query(queryText, [req.query.id])
            .then((result) => {
                res.sendStatus(200)
            })
            .catch((error) => {
                console.log('error on DELETE: ', error)
                res.sendStatus(500);
            })
    } else {
        res.sendStatus(403);
    }
});


/**
 * Update an item if it's something the logged in user added
 */
router.put('/:id', (req, res) => {
    console.log('PUT item route');
    if (req.isAuthenticated() && req.params.id === req.user.id) {
        let queryText = `UPDATE "item" SET "description" = $1, "image_url" = $2
                        WHERE "id" = $3`;
        pool.queryText(queryText, [req.params.description, req.params.image_url, req.user.id])
        .then((result) => {
            res.sendStatus(200)
        })
        .catch((error) => {
            console.log('error on PUT: ', error)
            res.sendStatus(500);
        })
    } else {
        res.sendStatus(403);
    }

});


/**
 * Return all users along with the total number of items 
 * they have added to the shelf
 */
router.get('/count', (req, res) => {
    console.log('GET all users w/ total items');
    if(req.isAuthenticated()) {
        let queryText = `SELECT "person"."username", "person"."id", count("item"."person_id") as "count"
                        FROM "item"
                        RIGHT JOIN "person" ON "item"."person_id" = "person"."id"
                        GROUP BY "person"."username", "person"."id"
                        ORDER BY count DESC`;
        pool.query(queryText)
        .then((result) => {
            res.send(result.rows);
        })
        .catch((error) => {
            console.log('error on GET COUNT: ', error);
            res.sendStatus(500);
        })
    } else {
        res.sendStatus(403);
    }
});


/**
 * Return a specific item by id
 */
router.get('/:id', (req, res) => {
    console.log('GET item by id');
    if(req.isAuthenticated()) {
        let queryText = `SELECT * FROM "item" WHERE "id" = $1`;
        pool.query(queryText, [req.params.id])
        .then((result) => {
            res.send(result.rows);
        })
        .catch((error) => {
            console.log('error with GET by id: ', error);
            res.sendStatus(500);
        })
    } else {
        res.sendStatus(403);
    }
});

module.exports = router;