const express = require("express");
const router = express.Router();
const passport = require("../config/ppConfig");
const db = require("../models"); //bring in database
const methodOverride = require('method-override');
const isLoggedIn = require("../middleware/isLoggedIn");



router.get("/", isLoggedIn, (req, res) => {
  db.reviews
    .findAll()

    .then((resultReviews) => {
      // console.log("here is fav park");
      console.log(resultReviews);
      res.render("reviews/index", { resultReviews });
    });
});

router.get("/new", isLoggedIn, (req, res) => {
  res.render("reviews/new");
});

router.post("/", isLoggedIn, async (req, res) => {
  const { name, description } = req.body;
  console.log(name, description);

  const newReview = await db.reviews.create({ name, description, userId: req.user.id });
  console.log(newReview);
  res.redirect("/reviews");
});

router.delete("/:id", isLoggedIn, (req, res) => {
  db.reviews.destroy({
    where: { id: req.params.id },
  });
  res.redirect("/reviews");
});

//---------------------------------------------------
// trying to edit comment
router.put('/edit/:id', isLoggedIn, (req, res) => {
  db.reviews.update(
    {name: req.body.reviewName,
    description: req.body.reviewDescription},
    {
      where: { id: req.params.id }
    }
  )
  .then((updatedReview) => {
    console.log('success', updatedReview)
    res.redirect('/reviews')
  })
  .catch((err) => {
    console.log(err)
    res.render('main/404')
  })
})





module.exports = router;



