const express = require('express');
const Action = require('./data/helpers/actionModel.js');
const Project = require('./data/helpers/projectModel.js');
const router = express.Router();

// WORKS
// get() project
router.get('/projects/', (req, res) => {
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
router.get('/projects/:id', (req, res) => {
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
router.post('/projects/', (req, res) => {
  const newProj = req.body;
  const { name, description } = req.body;

  if (!name || !description) {
    res
      .status(400)
      .json({ message: 'please provide name and description for the project' });
  } else {
    Project.insert(newProj)
      .then(proj => {
        res.status(201).json(proj);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ message: 'unable to save new project' });
      });
  }
});

// WORKS
// put / update() project
router.put('/projects/:id', (req, res) => {
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
router.delete('/projects/:id', (req, res) => {
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

// WORKS
// get() action
router.get('/projects/:id/actions/', (req, res) => {
  const id = req.params.id;

  Action.get()
    .then(act => {
      res.status(200).json(act);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'unable to fetch actions' });
    });
});

// WORKS
// get() action by id
router.get('/projects/:id/actions/:id', (req, res) => {
  const id = req.params.id;

  Action.get(id)
    .then(act => {
      res.status(200).json(act);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'unable to fetch actions' });
    });
});

// getting 500 error
// insert() / post new action, when adding an action, make sure the project_id belongs to an existing project. if you try to add an action with an id of 3 and there is no project with that id, the database will return an error
router.post('/projects/:id/actions/', (req, res) => {
  const project_id = req.params.id;
  const newAction = req.body;
  const { description, notes } = req.body;

  if (!project_id) {
    res.status(404).json({ message: 'project id not found' });
  }
  if (!description || !notes) {
    res
      .status(400)
      .json({ message: 'please provide description and notes for action' });
  } else {
    Action.insert(newAction)
      .then(action => {
        res.status(201).json(action);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ message: 'unable to add action' });
      });
  }
});

// WORKS
// put / update() action
router.put('/projects/:id/actions/:id', (req, res) => {
  const newAction = req.body;
  const id = req.params.id;

  Action.update(id, newAction)
    .then(act => {
      res.status(200).json(act);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'unable to update action' });
    });
});

// WORKS
// remove() / delete action
router.delete('/projects/:id/actions/:id', (req, res) => {
  const id = req.params.id;

  Action.remove(id)
    .then(deletedAction => {
      res.status(204).end();
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'could not delete action' });
    });
});

module.exports = router;
