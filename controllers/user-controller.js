const { User } = require('../models');


const userController = {
    //get all users
    getAllUsers(req, res) {
        User.find({})
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .select('-__v')
            .sort({ _id: -1 })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err)
            });
    },
    //get by id
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .select('-__v')
            .populate('thoughts')
            .populate('friends')
            .then(dbUserData => {
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
    //post new user
    createUser({ body }, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(400).json(err));
    },
    //put update user by id
    updateUser({ params, body }, res) {
        User.findOneAndUpdate(
            { _id: params.id }, body, { new: true, runValidators: true })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },
    //delete remove user by id
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json(
                        { message: 'No user found with this id!' }
                    )
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },
    //post to add friend to user
    addFriend({ params }, res) {
        //get one and update fails, use update many instead, passes 200 OK 
        User.updateMany(
            { _id: params.userId },
            { $addToSet: { friends: params.friendId } },
            { new: true }
        )
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json(
                        { message: 'No user found with this id!' }
                    )
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },
    //delete to remove friend from user
    removeFriend({ params }, res) {
        //again get one fails
        User.updateMany(
            { _id: params.userId },
            { $pull: { friends: params.friendId } },
            { new: true }
        )
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json(
                        { message: 'No user found with this id!' }
                    )
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },
};

module.exports = userController;
