const express = require('express');
const router = express.Router();
const user = require('../models/user_model');

router.get('/',
    function (request, response) {
        user.getAll(function (err, dbResult) {
            if (err) {
                response.json(err);
            } else {
                console.log(dbResult.rows);
                response.json(dbResult.rows);
            }
        })
    });

router.get('/:id?',
    function (request, response) {
        user.getById(request.params.id, function (err, dbResult) {
            if (err) {
                response.json(err);
            } else {
                console.log(dbResult.rows[0]);
                response.json(dbResult.rows[0]);
            }
        })
    });

router.post('/',
    function (request, response) {
        user.add(request.body, function (err, dbResult) {
            if (err) {
                response.json(err);
            } else {
                console.log(dbResult);
                response.json(dbResult.rowCount);
            }
        });
    });


router.delete('/:id',
    function (request, response) {
        user.delete(request.params.id, function (err, dbResult) {
            if (err) {
                response.json(err);
            } else {
                response.json(dbResult.rowCount);
            }
        });
    });


router.put('/:id',
    function (request, response) {
        user.update(request.params.id, request.body, function (err, dbResult) {
            if (err) {
                response.json(err);
            } else {
                console.log(dbResult);
                response.json(dbResult.rowCount);
            }
        });
    });

module.exports = router;

