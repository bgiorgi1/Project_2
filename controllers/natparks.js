// const express=require('express');
// const router=express.Router();
// const db = require('../models') //bring in database
// const axios = require('axios');


// // GET /pokemon - return a page with favorited Pokemon
// router.get('/', function(req, res) {
//     // TODO: Get all records from the DB and render to view
//     res.send('Render a page of favorites here');
//   router.get('/', (req, res) => {
//     db.pokemon.findAll()
//     .then(favPoke => {
//       res.render('pokemon', {favesList: favPoke})
//     })
//   });
  
  
//   // POST /pokemon - receive the name of a pokemon and add it to the database
//   router.post('/', function(req, res) {
//     // TODO: Get form data and add a new record to DB
//     res.send(req.body);
//   router.post('/', (req, res) => {
//     db.pokemon.create(req.body)
//     .then(newFav=>{
//       res.redirect('pokemon')
//   })
//   });
  
//   // router.get('/:id', (req,res) => {
//   //   db.pokemon
//   //   .findOne({
//   //     where: {id: req.params.id}
//   //   })
//   //   .then( foundPoke => {res.render('pokemon/show', {pokeID: foundPoke})})
  
//   // })
  
//   router.get('/:id', (req,res)=>{
//     let pokeID = req.params.id
//     db.pokemon.findOne({where: {
//       id: pokeID
//     }})
//     .then(foundPoke =>{
//       let pokeName = foundPoke.dataValues.name;
//       axios.get(`http://pokeapi.co/api/v2/pokemon/${pokeName}`)
//       .then(response =>{
//         let pokeData = response.data
//         let pokeMoves = pokeData.moves
//         let pokeTypes = pokeData.types
//         let pokeImg = pokeData.sprites.front_default
//         let pokeAbil = pokeData.abilities
//         res.render('pokemon/show', {poke: pokeData, moves: pokeMoves, types: pokeTypes, image: pokeImg, abil: pokeAbil})
//       })
//     })
//   })
  
//   module.exports = router;