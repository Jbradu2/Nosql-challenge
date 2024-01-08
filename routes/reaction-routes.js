const router = require('express').Router();
const {
  createThoughtReaction,
  deleteThoughtReaction,
} = require('../controllers/reaction-controller');

router.post('/thoughts/:thoughtId/reactions', createThoughtReaction);
router.delete('/thoughts/:thoughtId/reactions/:reactionId', deleteThoughtReaction);

module.exports = router;
