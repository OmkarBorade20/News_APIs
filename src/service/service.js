const  {ObjectId}  = require('mongodb');
const mongorepo=require('../repository/mongodb/mongorepo')
const httpRequest=require('../utility/httpCall')


module.exports.fetchNews=async function (req)
{
    let input=req.body;
    let api_key=process.env.APIKEY 

    const today = new Date();
    // Get current month
    const month = today.getMonth();
    // Set today's date back to previous month
    today.setMonth(month - 1);
    let lastmonth=today.toISOString().split('T')[0];


    let options={
        "method":"GET",
        "url":`https://newsapi.org/v2/everything?q=${input.Topic}&from=${lastmonth}&sortBy=publishedAt&apiKey=${api_key}`
    }
    let news=await httpRequest.genericHttpCalls(options);

    req.res.message=`News Fetched For: ${input.Topic}, Articles Found :${news.data.totalResults}`
    req.res.data=news?.data?.articles;
    return req;
}

module.exports.saveNews=async function (req)
{
    let input=req.body;
    let api_key=process.env.APIKEY 

    const today = new Date();
    // Get current month
    const month = today.getMonth();
    // Set today's date back to previous month
    today.setMonth(month - 1);
    let lastmonth=today.toISOString().split('T')[0];


    let options={
        "method":"GET",
        "url":`https://newsapi.org/v2/everything?q=${input.Topic}&from=${lastmonth}&sortBy=publishedAt&apiKey=${api_key}`
    }
    let news=await httpRequest.genericHttpCalls(options);

    //only save when articles are found.
    let save;
    if (news?.data?.articles.length!=0)
    {
        let data=news.data.articles.map(obj=>({ ...obj, category: input.Topic}))
        save=await mongorepo.insertMany("News_dump",data)
    }

    req.res.message=`News saved For: ${input.Topic}, Articles saved :${news.data.totalResults}`
    req.res.data=save;
    return req;
}

module.exports.filterNews=async function (req)
{
    let input=req.body;
    let sort=input.sort=="ASC" || input.sort=="asc" || input.sort=="Asc"?1:-1;

    let data=await mongorepo.findQueryandSort({"collection":"News_dump","query":{"category":input.category},"sortquery":{"publishedAt":sort}})
    req.res.message=`News saved Fetched From DB For Topic: ${input.Topic}, Articles saved :${data.length}`
    req.res.data=data;
    return req;
}

module.exports.findAllNews=async function (req)
{
    let data=await mongorepo.find("News_dump")
    req.res.message=`All Data Found, Articles: ${data.length}.`
    req.res.data=data;
    return req;
}

module.exports.updateArticle=async function (req)
{
    let input=req.body;
    let filter={
        "_id":new ObjectId(input.id)
    }
    let update=await mongorepo.update({"collection":"News_dump","filter":filter,"data":input.data})

    req.res.message=`Article Update.`
    req.res.data=update;
    return req;
}

module.exports.deleteArticle=async function (req)
{
    let input=req.body;
    let objectids=input.ids.map((e)=>{
        return  new ObjectId(e)
      })
    let filter={
        "_id":{$in:objectids}
    }
    let data=await mongorepo.deleteMany({"collection":"News_dump",filter})
    req.res.message=`All Articles Deleted.`
    req.res.data=data;
    return req;
}




