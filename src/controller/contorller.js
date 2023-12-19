const service=require('../service/service')

module.exports.fetchNews=async function (req,res,next)
{
    try{
        await service.fetchNews(req)
        next()
    }catch(e){
        console.log("::::::  Error in fetchNews Controller :::::::: :",e)
        next(e)
    }
}

module.exports.saveNews=async function (req,res,next)
{
    try{
        await service.saveNews(req)
        next()
    }catch(e){
        console.log("::::::  Error in saveNews Controller :::::::: :",e)
        next(e)
    }
}

module.exports.filterNews=async function (req,res,next)
{
    try{
        await service.filterNews(req)
        next()
    }catch(e){
        console.log("::::::  Error in filterNews Controller :::::::: :",e)
        next(e)
    }
}

module.exports.findAllNews=async function (req,res,next)
{
    try{
        await service.findAllNews(req)
        next()
    }catch(e){
        console.log("::::::  Error in findAllNews Controller :::::::: :",e)
        next(e)
    }
}

module.exports.updateArticle=async function (req,res,next)
{
    try{
        await service.updateArticle(req)
        next()
    }catch(e){
        console.log("::::::  Error in updateArticle Controller :::::::: :",e)
        next(e)
    }
}

module.exports.deleteArticle=async function (req,res,next)
{
    try{
        await service.deleteArticle(req)
        next()
    }catch(e){
        console.log("::::::  Error in deleteArticle Controller :::::::: :",e)
        next(e)
    }
}

