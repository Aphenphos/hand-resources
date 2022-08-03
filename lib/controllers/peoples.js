const { Router } = require('express');
const { People } = require('../models/People');

module.exports = Router()
  .get('/:id', async (req, res, next) => {
    try {
      const data = await People.getById(req.params.id);
      if (!data) {
        next();
      }
      res.json(data);
    } catch (e) {
      next(e);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const data = await People.getAll();
      res.json(data);
    } catch (e) {
      next(e);
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const data = await People.insert(req.body);
      res.json(data);
    } catch (e) {
      next(e);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const data = await People.updateById(req.params.id, req.body);
      res.json(data);
    } catch (e) {
      next(e);
    }
  })
  .delete('/:id', async (req, res, next) =>{
    try {
      const data = await People.delete(req.params.id);
      res.json(data);
    } catch (e) {
      next(e);
    }
  });
