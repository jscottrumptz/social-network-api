const { User } = require('../models');

const userController = {
    // get all users
    getAllUser(req, res) {
        User.find({})
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .populate({
            path: 'friends',
            select: '-__v'
        })
        .select('-__v')
        // sort in DESC order by the _id value.
        .sort({ _id: -1 })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    // get one user by id
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
        .populate({
            path: 'comments',
            select: '-__v'
        })
        .populate({
            path: 'friends',
            select: '-__v'
        })
        .select('-__v')
        .then(dbUserData => {
        // If no user is found, send 404
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
        }
        res.json(dbUserData);
        })
        .catch(err => {
        console.log(err);
        res.status(400).json(err);
        });
    },

    // create user
    // instead of req.body, body has been destructured
    createUser({ body }, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err));
    },

    // update user by id
    updateUser({ params, body }, res) {
        // With this .findOneAndUpdate() method, Mongoose finds a single document we want to update, 
        // then updates it and returns the updated document. If we don't set that third parameter, 
        // { new: true }, it will return the original document. By setting the parameter to true, 
        // we're instructing Mongoose to return the new version of the document.

        // There are also Mongoose and MongoDB methods called .updateOne() and .updateMany(), 
        // which update documents without returning them.
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true  })
        // Mongoose only executes the validators automatically when we actually create new data. 
        // This means that a user can create a user, but then update that user with totally 
        // different data and not have it validated.
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
        res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },

    // delete user
    deleteUser({ params }, res) {
        // we use the Mongoose .findOneAndDelete() method, which will find the 
        // document to be returned and also delete it from the database. Like with updating, we 
        // could alternatively use .deleteOne() or .deleteMany(), but we're using the 
        // .findOneAndDelete() method because it provides a little more data.
        User.findOneAndDelete({ _id: params.id })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },

    addFriend({ params }, res) {
        User.findOneAndUpdate(
          { _id: params.id },
          // use $addToSet to block duplicates instead of $push
          { $push: {friends: params.friendId } },
          { new: true }
        )
          .then(dbUserData => {
            if (!dbUserData) {
              res.status(404).json({ message: 'No user found with this id!' });
              return;
            }
            res.json(dbUserData);
          })
          .catch(err => res.json(err));
    },

    removeFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.id },
            // Here, we're using the MongoDB $pull operator to remove the specific friend from the friends 
            // array where the friendId matches the value of params.friendId passed in from the route.
            { $pull:  {friends: params.friendId } },
            { new: true }
            )
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.json(err));
    }
};

module.exports = userController;