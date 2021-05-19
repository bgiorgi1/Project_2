const express = require("express");
const router = express.Router();
const passport = require("../config/ppConfig");
const db = require("../models"); //bring in database

// router.get("/", async (req, res) => {
//   //grab all reviews from database
//   const fetchReviews = await db.review.findall();
//   res.render("reviews/index", { review: fetchReviews });
// });

router.get("/", (req, res) => {
  db.reviews
    .findAll()

    .then((resultReviews) => {
      // console.log("here is fav park");
      console.log(resultReviews);
      res.render("reviews/index", { resultReviews });
    });
});

router.get("/new", (req, res) => {
  res.render("reviews/new");
});

router.post("/", async (req, res) => {
  const { name, description } = req.body;
  console.log(name, description);

  const newReview = await db.reviews.create({ name, description });
  console.log(newReview);
  res.redirect("/reviews");
});

router.delete("/:id", (req, res) => {
  db.reviews.destroy({
    where: { id: req.params.id },
  });
  res.redirect("/reviews");
});



module.exports = router;

// app.delete("/someResource/:id", async (req,res=>{
//   try{
//   const id = req.params.id
//   const foundResource = await db.resourceModel.destroy({where: {id})
//   if(foundResource){
//     console.log(foundResource)
//     res.redirect('/someResource')
//   }
//   }catch(err){
//     console.log(err)
//     res.redirect('/someResource/:id')
//   }
//   })

