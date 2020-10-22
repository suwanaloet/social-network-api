const router = require('express').Router();

const { getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    removeThought,
    addReaction,
    removeReaction
} = require('../../controllers/thought-controller');

// /api/thoughts get and post
router
    .route('/')
    .get(getAllThoughts)
    .post(createThought)

// /api/thoughts/:thoughtId
router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(removeThought)

// /api/thoughts/:thoughtId/reactions -routes for reactions
router
    .route('/:thoughtId/reactions')
    .post(addReaction)

router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(removeReaction);

module.exports = router;