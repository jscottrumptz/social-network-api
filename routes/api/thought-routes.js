const router = require('express').Router();

// const {
//     getAllThoughts,
//     getThoughtById,
//     createThought,
//     deleteThought,
//     updateThought,
//     removeReaction
// } = require('../../controllers/thought-controller');

// // /api/thoughts/
// router
//     .route('/')
//     .get(getAllThoughts)

// // /api/thoughts/<userId>/
// router
//     .route('/:userId')
//     .post(createThought);

// // /api/thoughts/<userId>/<thoughtId>
// router
//     .route('/:userId/:thoughtId')
//     .get(getThoughtById)
//     .put(updateThought)
//     .delete(deleteThought);

// router.route('/:userId/:thoughtId/:reactionId')
//     .delete(removeReaction);

module.exports = router;