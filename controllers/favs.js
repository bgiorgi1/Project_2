const express = require('express');
const router = express.Router();
const passport = require('../config/ppConfig');
const db = require('../models');

//getting park info
router.post("/", (req, res) => {
    const parkFav = {
      name: req.body.name,
      parkId: req.body.parkId,
    };
    //adding to favs
    db.favs.create(parkFav).then((createdFav) => {
      // console.log(createdFav)
      res.redirect("favs");
    });
  });
  //grabbing all favs in db and redirecting to favs page
  router.get("/", (req, res) => {
    db.favs
      .findAll()
  
      .then((favPark) => {
        console.log("here is fav park")
        console.log(favPark)
        res.render("parkFavs/favs", { favPark });
      });
  });
  
  router.delete('/:id', (req,res) => {
    db.favs.destroy({
        where: {id: req.params.id}
    })
    res.redirect('/favs')
  })


//   router.delete('/favs/:idx', function(req, res){
//     const dinosaurs = fs.readFileSync('./favs.json');
//     const dinoData = JSON.parse(favs);
  
//     // remove the deleted dinosaur from the dinosaurs array
//     dinoData.splice(req.params.idx, 1)
  
//     // save the new dinosaurs to the data.json file
//     fs.writeFileSync('./favs.json', JSON.stringify(dinoData));
  
//     //redirect to the GET /dinosaurs route (index)
//     res.redirect('/favs');
//   });
  
  module.exports = router;
