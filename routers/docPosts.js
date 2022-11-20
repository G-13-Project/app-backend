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


// update post
router.put('/put/:id', async(req, res) => {
    const post = await DocPost.findByIdAndUpdate(
        req.params.id,
        {
            header: req.body.header,
            content: req.body.content,
            image: req.body.image
        },
        {new: true} // if not update, return old data after put request
    )
    if(!post){
        return res.status(404).send('The post cannot be created!');
    }

    res.send(post);
});


// delete post
router.delete('/delete/:id', (req, res) => {
    DocPost.findByIdAndRemove(req.params.id).then(async post => {
        if(post){
            return res.status(200).json({success: true, message: 'The Post was deleted!'})
        } else {
            return res.status(404).json({success: false, message: 'The Post is not funded!'})
        }
    }).catch(err => {
        return res.status(500).json({success: false, error: err})
    })
})


module.exports = router;