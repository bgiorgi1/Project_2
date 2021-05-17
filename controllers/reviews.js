const express=require('express');
const router=express.Router();
const db = require('../models') //bring in database

router.get('/', async (req,res) => {
    //grab all reviews from database
    const fetchReviews=await db.review.findall()
    res.render('reviews/index', {review: fetchReviews});
    })

router.get('/new', (req,res) =>{
    res.render('reviews/new');
  })
  
  router.post('/', async (req, res) => {
    const{title, description}=req.body;
    console.log(title, description);
  
    const newReview = await db.reviews.create({title, description});
    console.log(newReview);
    res.redirect('/reviews')
  
  })

module.exports=router;