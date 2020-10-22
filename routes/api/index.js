const router = require('express').Router();
const userRoutes = require('./user-routes');
const thoughtRoutes = require('./thought-routes');

//for userroutes
router.use('/users', userRoutes);

//for thoughtroutes
router.use('/thoughts', thoughtRoutes);

module.exports = router;