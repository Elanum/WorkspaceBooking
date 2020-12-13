import express from 'express';

const router = express.Router();

router.get('/login', (req, res, next) => {
    res.status(200).json({
        message: 'Login Route works'
    })
})

export default router;