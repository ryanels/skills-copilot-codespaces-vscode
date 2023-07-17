// Create web server

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var uuid = require('uuid');

var storage = require('../storage.js');

router.get('/', function(req, res) {
    var comments = storage.getAll();
    res.status(200).json({
        message: 'Success',
        status: 200,
        comments: comments
    });
});

router.get('/:id', function(req, res) {
    var id = req.params.id;
    var comment = storage.get(id);
    if (comment) {
        res.status(200).json({
            message: 'Success',
            status: 200,
            comment: comment
        });
    } else {
        res.status(404).json({
            message: 'Comment not found',
            status: 404
        });
    }
});

router.post('/', jsonParser, function(req, res) {
    var requiredFields = ['author', 'content'];
    for (var i = 0; i < requiredFields.length; i++) {
        var field = requiredFields[i];
        if (!(field in req.body)) {
            res.status(400).json({
                message: 'Missing field: ' + field,
                status: 400
            });
            return;
        }
    }
    var comment = {
        id: uuid.v4(),