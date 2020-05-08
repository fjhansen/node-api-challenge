const express = require('express')
const thisDb = require('../helpers/actionModel')
const actionDb = require('../helpers/projectModel')

const router = express.Router();

router.get('/', (req, res) => {
  thisDb.get()
  .then(actions => {
    res.status(200).json({actions})
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({error: 'Error getting the actions'})
  })
})

// middleware
function validateAction(req, res, next) {
  const theAction = req.body
  if(theAction.project_id && theAction.notes) {
      next()
    } else {
      res.status(400).json({message: 'missing project_id and or notes'})
  }
}

function validateId(req, res, next) {
  const id = req.params.id
  thisDb.get(id)
  .then(id => {
    if (id) {
      next()
    } else {
      res.status(400).json({
        error: 'invalid ID'
      })
    }
  })
  .catch(error => {
    console.log(error)
    res.status(500).json({
      error: 'Could not validate ID'
    })
  })
}


module.exports = router;