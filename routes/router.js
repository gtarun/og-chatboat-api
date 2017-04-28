const router = require('express').Router();
const messenger = require('../controller/messenger');
const main = require('../controller/base');

router.get('/', main.index);
router.get('/messenger/userwebhook', messenger.webhookVerify);
router.post('/messenger/userwebhook', messenger.webhookPost);
router.post('/messenger/pageinfo', messenger.pageInfo);

module.exports = router;