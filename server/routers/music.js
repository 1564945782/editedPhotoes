// 组件音乐用到的数据
let router = require('express').Router();
// 引入数据库
const db = require('../js/db.js');
// 模糊查询，需要传一个searchname参数,搜索
router.get('/', function (req, res){
    if (req.query.searchname){
        var searchname = "%" + req.query.searchname + "%"
        var sql = "select * from music where music_name like ? or singer_name like ?"
        var data = [searchname, searchname]
        db.base(sql, data, function (result) {
            console.log(result.length)
            if (result.length) {
                res.json({ r: "ok", list: result })
            } else {
                res.json({ r: "error" })
            }
        })
    }else{
        res.json({ r: "error" })

    }
   
    // res.json({r:"ok"})
})
router.get('/sing',function(reeq,res){
    var sql = "select * from music where music_id = ?"
    var data=req.query.music_id
    db.base(sql,data,function(result){
        if (result.length){
            // res.json({
            //     r:"ok",
            //     list:result.list
            // })
        }
    })
})
module.exports=router;