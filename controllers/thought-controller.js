const { Thought, User } = require('../models');

const thoughtController = {
  getAllThoughts: async (req, res) => {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getThoughtById: async (req, res) => {
    const thoughtId = req.params.thoughtId;
    try {
      const thought = await Thought.findById(thoughtId).populate('reactions');
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
      res.json(thought);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  createThought: async (req, res) => {
    const { thoughtText, username, userId } = req.body;
    try {
      const thought = await Thought.create({ thoughtText, username });
      // Update user's thoughts array
      await User.findByIdAndUpdate(userId, { $push: { thoughts: thought._id } });
      res.json(thought);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  updateThought: async (req, res) => {
    const thoughtId = req.params.thoughtId;
    const { thoughtText } = req.body;
    try {
      const thought = await Thought.findByIdAndUpdate(thoughtId, { thoughtText }, { new: true });
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
      res.json(thought);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  deleteThought: async (req, res) => {
    const thoughtId = req.params.thoughtId;
    try {
      const thought = await Thought.findByIdAndDelete(thoughtId);
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
      // Remove thought from user's thoughts array
      await User.updateMany({}, { $pull: { thoughts: thought._id } });
      res.json({ message: 'Thought deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  addReaction: async (req, res) => {
    const thoughtId = req.params.thoughtId;
    const newReaction = req.body;
    try {
      // Add the reaction to the thought
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
      console.error('Error adding reaction:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
};

module.exports = thoughtController;
