const {ResPost} = require('../models/resPost');
const express = require('express');
const router = express.Router();
const multer = require('multer');

// upload file type extentions
const FILE_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
}

// upload images
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const isValid = FILE_TYPE_MAP[file.mimetype];  
      let uploadError = new Error('Invalid image type');

      if(isValid){
        uploadError = null;
      }
      // update folder path
      cb(null, 'E:/NDT/Sem_3/Project I/BackEnd/app-backend/public/uploads/res')
    },
    filename: function (req, file, cb) {
      
      const fileName = file.originalname.split(' ').join('-');
      const extension = FILE_TYPE_MAP[file.mimetype];
      cb(null, `${fileName}-${Date.now()}.${extension}`);
    }
  })
  
  const uploadOptions = multer({ storage: storage })

// create doctor post
router.post('/post', uploadOptions.single('image'), async(req, res) => {
    
     // image file name
     const fileName = req.file.filename;
     const basePath = `${req.protocol}://${req.get('host')}/public/uploads/res`;
     console.log('Base Path: ', basePath);

    let resPost = new ResPost({
        header: req.body.header,
        content: req.body.content,
        image: `${basePath}${fileName}`
    })

    resPost.save().then((createPost => {
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
    const postList = await ResPost.find();

    if(!postList) {
        res.status(500).json({success: false});
    }
    res.send(postList);
});


// update post
router.put('/put/:id', async(req, res) => {
    const post = await ResPost.findByIdAndUpdate(
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
    ResPost.findByIdAndRemove(req.params.id).then(async post => {
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