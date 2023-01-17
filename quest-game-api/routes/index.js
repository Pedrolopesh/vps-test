const express = require('express')
const router = express.Router()
const IndexController = require('../controllers/index')
const PlayerController = require('../controllers/PlayerController')
const QuestController = require('../controllers/QuestController')
const MatterController = require('../controllers/MatterController')
const PodiumController = require('../controllers/PodiumController')

router.get('/quest-game/', (req, res) => {
    res.send('Server is runing for quest game api')
    console.log('Server ok')
});


router.route('/quest-game/create/mathDefault/values').post(QuestController.createMathDefautValues)
router.route('/quest-game/create/natureDefault/values').post(QuestController.createNatueDefautValues)
router.route('/quest-game/create/humaneDefault/values').post(QuestController.createHumanDefautValues)

router.route('/quest-game/sever/status').get(IndexController.getSeverStatus)

router.route('/quest-game/player/create').post(PlayerController.createPlayer)
router.route('/quest-game/player/:id').get(PlayerController.getPlayerData)
router.route('/quest-game/player/request/confirm').post(PlayerController.requestConfirmPlayer)
router.route('/quest-game/player/confirm').post(PlayerController.confirmPlayerCode)

router.route('/quest-game/create/matter').post(MatterController.createMatter)
router.route('/quest-game/listAll/matter').get(MatterController.listMatter)

router.route('/quest-game/create/question').post(QuestController.createQuest)
router.route('/quest-game/listAll/question').get(QuestController.listQuest)
router.route('/quest-game/listByLevelAndLimit/question').post(QuestController.listQuestionsByLevelAndLimit)
router.route('/quest-game/listByLevel/question').post(QuestController.listQuestionsByLevel)
router.route('/quest-game/preview/answer/question').post(QuestController.previewAnswerQuestion)
router.route('/quest-game/answer/question').post(QuestController.answerQuestion)
router.route('/quest-game/answer/calculate').post(QuestController.answerAndCalculatePoints)

router.route('/quest-game/podium').get(PodiumController.createPodium)

module.exports = router