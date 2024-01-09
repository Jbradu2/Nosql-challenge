const { Thought } = require('../models');

const reactionController = {
  createReaction: async (req, res) => {
    const thoughtId = req.params.thoughtId;
    const newReaction = req.body;
    try {
      const updatedThought = await Thought.findByIdAndUpdate(
        thoughtId,
        { $push: { reactions: newReaction } },
        { new: true }
      );

      if (!updatedThought) {
        return res.status(404).json({ message: 'Thought not found' });
      }

      res.json(updatedThought);
    } catch (error) {
      console.error('Error creating reaction:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  deleteReaction: async (req, res) => {
    const { thoughtId, reactionId } = req.params;
    try {
      const updatedThought = await Thought.findByIdAndUpdate(
        thoughtId,
        { $pull: { reactions: { reactionId } } },
        { new: true }
      );

      if (!updatedThought) {
        return res.status(404).json({ message: 'Thought not found' });
      }

      res.json(updatedThought);
    } catch (error) {
      console.error('Error deleting reaction:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
};

module.exports = reactionController;

