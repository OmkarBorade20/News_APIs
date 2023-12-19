const axios=require('axios');


module.exports.genericHttpCalls=async function (options)
{
    try{
       let data=await axios(options)
       return data;
    }catch(e){
        console.log("::::::  Error in genericHttpCalls Function :::::::: :",e)
        return {
            "message":"Error in calling Api",
            "data":JSON.stringify(e)
        };
    
    }
}