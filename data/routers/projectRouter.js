const express = require('express')
const thisDb = require('../helpers/projectModel')
const actionDb = require('../helpers/actionModel')

const router = express.Router();


router.post('/', validateProject, (req, res) => {
  const bod = req.body
  thisDb.insert(bod)
  .then(the => {
    res.status(201).json({the})
  })
  .catch(error => {
    console.log(error)
    res.status(500).json({
      error: 'Error posting the Projects'
    })
  })
})

router.get('/', validateId, (req, res) => {
  const id = req.params.id
  thisDb.get(id)
  .then(projects => {
    res.status(200).json({projects})
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({error: 'Error getting the projects'})
  })
})

router.get('/:id', validateId, (req, res) => {
  const id = req.params.id
  thisDb.get(id)
  .then(projectID => {
    res.status(200).json({projectID})
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({error: 'Error getting the project'})
  })
})

router.put('/:id', [validateProject, validateId], (req, res) => {
  const id = req.params.id
  const bod = req.body

  thisDb.update(id, bod)
  .then(project => {
    res.status(201).json({project})
  })
  .catch(error => {
    console.error(error);
    res.status(500).json({
      message: 'Could not PUT project'
    })
  })
})

router.delete('/:id', validateId, (req, res) => {
  const id = req.params.id
  thisDb.remove(id)
  .then(project => {
    if (project) {
      res.status(200).json({
        message: 'project deleted'
      })
      .catch(error => {
        console.error(error);
        res.status(500).json({error: 'project could not be deleted'})
      })
    }
  })
})

// custom middleware
function validateProject(req, res, next) {
  const theProject = req.body
  if(theProject.name && theProject.description) {
      next()
    } else {
      res.status(400).json({message: 'missing name and or description'})
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