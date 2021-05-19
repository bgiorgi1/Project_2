const express = require("express");
const router = express.Router();
const passport = require("../config/ppConfig");
const db = require("../models");

//getting park info
router.post("/", (req, res) => {
  const userData = req.user.get();
  console.log("here is user data")
  console.log(userData)
  const parkFav = {
    name: req.body.name,
    parkId: req.body.parkId,
    userId: userData.id,
  };
  //adding to favs
  db.favs.create(parkFav).then((createdFav) => {
    // console.log(createdFav)
    res.redirect("favs");
  });
});
//grabbing all favs in db and redirecting to favs page
router.get("/", (req, res) => {
  const userData = req.user.get();
  db.favs
    .findAll({
      where: {userId: userData.id}
    })

    .then((favPark) => {
      console.log("here is fav park");
      console.log(favPark);
      res.render("parkFavs/favs", { favPark });
    });
});

router.delete("/:id", (req, res) => {
  db.favs.destroy({
    where: { id: req.params.id },
  });
  res.redirect("/favs");
});


module.exports = router;
