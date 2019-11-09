const express = require('express');
const Action = require('./data/helpers/actionModel.js');
const Project = require('./data/helpers/projectModel.js');
const router = express.Router();

// WORKS
// get() project
router.get('/', (req, res) => {
  Project.get()
    .then(proj => {
      res.status(200).json(proj);
    })
    .catch(err => {
      res.status(500).json({ message: 'could not fetch project data' });
    });
});

// WORKS
// get() project by id
router.get('/:id', (req, res) => {
  const id = req.params.id;
  console.log(req.params);

  Project.get(id)
    .then(proj => {
      res.status(200).json(proj);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'could not fetch project data by id' });
    });
});

// WORKS
// insert() / post new project
router.post('/', (req, res) => {
  const newProj = req.body;
  const { name, description } = req.body;

  if (!name || !description) {
    res
      .status(400)
      .json({ message: 'please provide name and description for the project' });
  } else {
    Project.insert(newProj)
      .then(proj => {
        res.status(200).json(proj);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ message: 'unable to save new project' });
      });
  }
});

// WORKS
// put / update() project
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const { name, description } = req.body;

  Project.update(id, body)
    .then(proj => {
      res.status(200).json(proj);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'could not update post' });
    });
});

// WORKS
// remove() / delete project
router.delete('/:id', (req, res) => {
  const id = req.params.id;

  Project.remove(id)
    .then(deletedProj => {
      res.status(204).end();
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'could not delete project' });
    });
});

// get() action

// get() action by id

// insert() / post new action, when adding an action, make sure the project_id belongs to an existing project. if you try to add an action with an id of 3 and there is no project with that id, the database will return an error

// put / update() action

// remove() / delete action

module.exports = router;
