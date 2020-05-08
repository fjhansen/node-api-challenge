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

router.get('/:id', validateId, (req, res) => {
  const id = req.params.id
  thisDb.get(id)
  .then(actionID => {
    res.status(200).json({actionID})
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({error: 'Error getting the action'})
  })
})

router.post('/', validateAction, (req, res) => {
  const bod = req.body
  thisDb.insert(bod)
  .then(action => {
    res.status(201).json({action})
  })
  .catch(error => {
    console.log(error)
    res.status(500).json({
      error: 'Error posting the actions'
    })
  })
})

router.put('/:id', [validateAction, validateId], (req, res) => {
  const id = req.params.id
  const bod = req.body

  thisDb.update(id, bod)
  .then(action => {
    res.status(201).json({action})
  })
  .catch(error => {
    console.error(error);
    res.status(500).json({
      message: 'Could not PUT action'
    })
  })
})

router.delete('/:id', validateId, (req, res) => {
  const id = req.params.id
  thisDb.remove(id)
  .then(action => {
    if (action) {
      res.status(200).json({ message: 'action deleted'})
    }
  })
  .catch(error => {
    console.error(error);
    res.status(500).json({ error: 'Action could not be deleted'})
  })
})

// custom middleware
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