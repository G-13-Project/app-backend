const {DocPost} = require('../models/docPost');
const express = require('express');
const router = express.Router();

// create doctor post
router.post('/post', async(req, res) => {
    let docPost = new DocPost({
        header: req.body.header,
        content: req.body.content,
        image: req.body.image
    })

    docPost.save().then((createPost => {
        res.status(201).json(createPost)
    })).catch((err) => {
        res.status(500).json({
            error: err,
            success: false
        })
    })
})

// get post
router.get(`/get`, async (req, res) => {
    const postList = await DocPost.find();

    if(!postList) {
        res.status(500).json({success: false});
    }
    res.send(postList);
});

module.exports = router;