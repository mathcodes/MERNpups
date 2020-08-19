const router = require('express').Router();
const puppiesCtrl = require('../../controllers/puppies');

router.get('/', checkAuth, puppiesCtrl.index);
router.get('/:id', checkAuth, puppiesCtrl.show);
router.post('/', checkAuth, puppiesCtrl.create);
router.put('/:id', checkAuth, puppiesCtrl.update);
router.delete('/:id', checkAuth, puppiesCtrl.delete);

function checkAuth(req, res, next) {
    if (req.user) return next();
    return res.status(401).json({msg: 'Not Authorized'});
  }

module.exports = router;