'use strict'
const axios = require('axios');
exports.renderMain =  (req,res) => {
  //console.log("in the swController.renderMain")
  res.render('menu',{
    user:req.user
  })
}

exports.attachFilms = (req,res,next) => {
  console.log("in attachFilms")
  //axios.get('http://swapi.co/api/films')
  axios.get('http://pokeapi.co/api/v2/berry')
    .then(response => {
      console.log(JSON.stringify(response.data,null,1));
      res.locals.data = response.data
      next()
    })
    .catch(error => {
      console.log('BIG ERROR in attachFilms');
    });
}
