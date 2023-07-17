const { Thought, User } = require("../models");

module.exports = {
  // Gets all thoughts from the database
  async getAllThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.status(200).json(thoughts);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // Gets a single thought from the database based on ID
  async getThoughtById(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.id });
      if (!thought) {
        return res.status(404).json({ message: "No thought with that ID" });
      }

      res.status(200).json(thought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // Creates a new thought and associates it with a user
  async createThought(req, res) {
    try {
      const newThought = await Thought.create(req.body);
      await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { thoughts: newThought._id } },
        { new: true }
      );
      res.status(200).json(newThought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // Updates a thought from the database
  async updateThought(req, res) {
    try {
      const updateThought = await Thought.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!updateThought) {
        return res.status(404).json({ message: "No thought with this id!" });
      }

      res.status(200).json(updateThought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // Deletes a thought from the database
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndRemove({ _id: req.params.id });

      if (!thought) {
        return res.status(404).json({ message: "No thought with this id!" });
      }

      await User.findOneAndUpdate(
        { thoughts: req.params.id },
        { $pull: { thoughts: req.params.id } },
        { new: true }
      );

      res.status(200).json({ message: "Thought successfully deleted!" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
