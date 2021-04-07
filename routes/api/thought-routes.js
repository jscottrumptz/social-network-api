const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtById,
    createThought,
    deleteThought,
    updateThought,
    addReaction,
    removeReaction
} = require('../../controllers/thought-controller');

// /api/thoughts/
router
    .route('/')
    .get(getAllThoughts)
    .post(createThought);

// /api/thoughts/<thoughtId>
router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .post(addReaction)
    .delete(deleteThought);

// /api/thoughts/<thoughtId>/<reactionId>
router.route('/:id/:reactionId')
    .delete(removeReaction);

module.exports = router;