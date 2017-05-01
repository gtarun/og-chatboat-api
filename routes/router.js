const router = require('express').Router();
const messenger = require('../controller/messenger');
const cors = require('cors');
const bodyparser = require('body-parser');

router.use(bodyparser.json());

//router.use(cors());

router.get('/messenger/userwebhook', messenger.webhookVerify);
router.post('/messenger/userwebhook', messenger.webhookPost);
router.post('/messenger/pageinfo', messenger.pageInfo);

module.exports = router;