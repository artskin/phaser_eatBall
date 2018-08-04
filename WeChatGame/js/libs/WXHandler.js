

var WXHandler = {
    //获取自己的游戏数据
    getUserCloudStorage:function(){
        let openDataContext = wx.getOpenDataContext()
        openDataContext.postMessage({
        type: 1,
        })
    },
    //获取好友的游戏数据
    getFriendCloudStorage:function(){
        let openDataContext = wx.getOpenDataContext()
        console.log(openDataContext);
        openDataContext.postMessage({
        type: 2
        })
    },
    ////获取群成员的游戏数据
    getGroupCloudStorage:function(ticket){
        let openDataContext = wx.getOpenDataContext()
        openDataContext.postMessage({
        type: 3,
        ticket:ticket
        })
    },
    //上传自己的游戏数据
    setUserCloudStorage:function(score){
        console.log(score)
        wx.setUserCloudStorage({
            KVDataList:[{key:"score",value:score.toString()}],
            success:function(data){
              console.log("success:",data);
            },
            fail:function(error){
              console.log("error:",error)
            },
            complete:function(data){
              console.log("complete:",data)
            }
          });
    },
    showRankList:function(game){
        let openDataContext = wx.getOpenDataContext()
        let sCanvas = openDataContext.canvas;
        var drawRank = game.add.sprite(80, 400, new PIXI.Texture(new PIXI.BaseTexture(sCanvas)));
        drawRank.width = 280;
        drawRank.height = 380;
    }
};
module.exports = WXHandler;