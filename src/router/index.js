const express=require('express')
const router=express.Router()
const RespHandler=require('../utility/resHandler')
const errorHandler=require('../utility/errorHandler')
const controller=require('../controller/contorller')



router.post('/fetchNews',controller.fetchNews)
router.post('/saveNews',controller.saveNews)
router.post('/filterNews',controller.filterNews)
router.get('/findAllNews',controller.findAllNews)
router.put('/updateArticle',controller.updateArticle)
router.delete('/deleteArticles',controller.deleteArticle)


router.use(RespHandler)
router.use(errorHandler)
module.exports=router;