const router = require('express').Router();
const { deleteReaction } = require('../controllers/reaction-controller');

router.route('/:reactionId').delete(deleteReaction);

module.exports = router;
