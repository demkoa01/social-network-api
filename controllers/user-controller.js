const { User } = require('../models');
const { db } = require('../models/User');

const userController = {
    // get all users
    getAllUsers (req, res) {
        User.find({})
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .select('-__v')
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // get single user by id
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .populate({
                path: 'friends',
                select: '-__v'
            })
            .select('-__v')
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(400).json({ message: 'No user found with this ID!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // create a new user
    createUser({ body }, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    },

    // update user by id
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(400).json({ message: 'No users found with this ID!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },

    // delete user by id
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(400).json({ message: 'No users found with this ID!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },

    // add a friend for user
    addFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId},
            { $addToSet: { friends: params.friendId } },
            { new: true }
        )
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(400).json({ message: 'No users found with this user ID!' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },

    // remove a friend from user
    deleteFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: params.friendId } },
            { new: true }
        )
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    }
}

module.exports = userController;