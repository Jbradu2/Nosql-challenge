const { Thought } = require('../models');

const reactionController = {
  //createThoghtReaction
  createThoughtReaction: async (req, res) => {
    const thoughtId = req.params.thoughtId;
    const { reactionBody, username } = req.body;
    try {
      const thought = await Thought.findByIdAndUpdate(
        thoughtId,
        { $push: { reactions: { reactionBody, username } } },
        { new: true }
      );
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
      res.json(thought);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
//deleteThoughtReaction 

  deleteThoughtReaction: async (req, res) => {
    const thoughtId = req.params.thoughtId;
    const reactionId = req.params.reactionId;
    try {
      const thought = await Thought.findByIdAndUpdate(
        thoughtId,
        { $pull: { reactions: { reactionId } } },
        { new: true }
      );
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
      res.json(thought);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

module.exports = reactionController;
