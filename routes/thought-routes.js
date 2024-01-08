const router = require('express').Router();
const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
} = require('../controllers/thought-controller');

router.get('/thoughts', getAllThoughts);
router.get('/thoughts/:thoughtId', getThoughtById);
router.post('/thoughts', createThought);
router.put('/thoughts/:thoughtId', updateThought);
router.delete('/thoughts/:thoughtId', deleteThought);

module.exports = router;
