const router = require('express').Router();
const { createReaction, deleteReaction } = require('../controllers/reaction-controller');

router.route('/:thoughtId').post(createReaction);
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;
