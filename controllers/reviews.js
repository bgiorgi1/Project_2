const express = require("express");
const router = express.Router();
const passport = require("../config/ppConfig");
const db = require("../models"); //bring in database
const methodOverride = require('method-override');
const isLoggedIn = require("../middleware/isLoggedIn");

// app.use(methodOverride('_method'));
// router.get("/", async (req, res) => {
//   //grab all reviews from database
//   const fetchReviews = await db.review.findall();
//   res.render("reviews/index", { review: fetchReviews });
// });

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

// router.get('/edit/:id', (req, res) => {
//   db.reviews.findOne({
//     where: { id: req.params.id }
//   })
//   .then((foundArticle) => {
//     db.reviews.findAll()
//     .then((authors) => {
//       res.render('articles/edit', {
//         article: foundArticle,
//         authors: authors
//       })
//     })
//     .catch((err) => {
//       console.log(err)
//       res.render('main/404')
//     })
//   })
//   .catch((err) => {
//     console.log('Error in /articles/edit/:id', err)
//     res.render('main/404')
//   })
// })




module.exports = router;



