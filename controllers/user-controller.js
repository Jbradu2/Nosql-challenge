const { User } = require('../models');

const userController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getUserById: async (req, res) => {
    const userId = req.params.userId;
    try {
      const user = await User.findById(userId).populate('thoughts').populate('friends');
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  createUser: async (req, res) => {
    const { username, email } = req.body;
    try {
      const user = await User.create({ username, email });
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  updateUser: async (req, res) => {
    const userId = req.params.userId;
    const { username, email } = req.body;
    try {
      const user = await User.findByIdAndUpdate(userId, { username, email }, { new: true });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  deleteUser: async (req, res) => {
    const userId = req.params.userId;
    try {
      const user = await User.findByIdAndDelete(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      // BONUS: Remove user's associated thoughts
      // await Thought.deleteMany({ _id: { $in: user.thoughts } });
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  addFriend: async (req, res) => {
    const userId = req.params.userId;
    const friendId = req.params.friendId;
    try {
      const user = await User.findByIdAndUpdate(userId, { $addToSet: { friends: friendId } }, { new: true });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  removeFriend: async (req, res) => {
    const userId = req.params.userId;
    const friendId = req.params.friendId;
    try {
      const user = await User.findByIdAndUpdate(userId, { $pull: { friends: friendId } }, { new: true });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

module.exports = userController;