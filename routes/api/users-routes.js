const router = require('express').Router();

const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/user-controller');

// route for /api/user
router
    .route('/')
    .get(getAllUsers)
    .post(createUser)

// route for /api/user/:id
router
    .route('/:id')
    .get(getUserById)
    .delete(deleteUser)
    .put(updateUser)

// route for /api/user/:userId/friends/:friendId
router
    .route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(deleteFriend)

module.exports = router;
