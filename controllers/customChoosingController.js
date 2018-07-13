'use strict'

exports.renderMain =  (req,res) => {
  //console.log("in the swController.renderMain")
  res.render('customChoosing',{
    user:req.user
  })
}
