// 'use strict';
// exports.main_handler = async (event, context) => {
    const axios = require("axios")
    const headers = {
        "cookie":"你的cookie",
        "hots":"act.10010.com",
        "Origin": "https://img.client.10010.com",
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148         unicom{version:iphone_c@8.0200}{systemVersion:dis}{yw_code:}",
        "Referer": "https://img.client.10010.com/SigininApp/index.html"
    }

//签到
async   function signin(){
    var sign = {
        method: "post",
        url: "https://act.10010.com/SigninApp/signin/daySign",
        headers : headers
    };
    await  axios(sign).then((res)=>{
        if(res.data.msg == "ok"){
            console.log("签到成功")
        }else{
            console.log(res.data.msg)
        }
    })
}





//观看广告
async  function finishVideo(){
    var finish = {
        method: "post",
        url: "https://act.10010.com/SigninApp/doTask/finishVideo",
        headers : headers
    };
    await    axios(finish).then((res)=>{
        if(res.data.msg == "ok"){
            console.log("广告观看成功")
        }else{
            console.log("今日已观看过广告")
        }
    })
}

//领取流量

async   function getPrize(){
    var prize = {
        method: "post",
        url: "https://act.10010.com/SigninApp/doTask/getPrize",
        headers : headers
    };
    await      axios(prize).then((res)=>{
        if(res.data.data.statusDesc =="领取失败"){
            console.log("您已经领过了")
        }else{
            console.log(res.data.data.statusDesc)
        }

    })

}

//激活流量


async   function getPrizes(){
    var query = {
        method: "post",
        url: "http://m.client.10010.com/myPrizeForActivity/mygiftbag.htm",
        headers : headers,
        data : "typeScreenCondition=2&category=FFLOWPACKET&pageSign=1"
    }
    await     axios(query).then((res)=>{
        var html = res.data
        var reg = /(?<=onclick="toDetailPage).*(?=;">)/
        var prizeId = JSON.parse(html.match(reg)[0].replace("(","[").replace(")","]").replace(/'/g,'"'))
        var activeCode = prizeId[0]
        var prizeRecordID = prizeId[1]
        var activation = {
            method: "post",
            url: "http://m.client.10010.com/myPrizeForActivity/myPrize/activationFlowPackages.htm",
            headers : headers,
            data : "activeCode="+activeCode+"&prizeRecordID="+prizeRecordID+"&activeName=%E5%81%9A%E4%BB%BB%E5%8A%A1%E9%A2%86%E5%A5%96%E5%93%81"
        };
        var activation2 = {
            method: "post",
            url: "http://m.client.10010.com/myPrizeForActivity/queryPrizeDetails.htm",
            headers : headers,
            data:{
                "clicksource":"1",
                "pageSign":"1",
                "callbackUrl":"",
                "typeScreenCondition":""}

        };
        axios(activation).then((resf)=>{
            console.log(resf.data)
            if(resf.data.status == "200"){
                console.log("激活成功,如果没有下发短信，请打开掌上营业厅，点击我的，右上角我的礼包，手动进行激活")
                axios(activation2).then((ress)=>{
                    // console.log(ress.data)
                })
            }

        })

    })
}

    await   signin()
    await   finishVideo()
    await    getPrize()
    await    getPrizes()
