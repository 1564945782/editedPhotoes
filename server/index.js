const express=require('express');
var multer = require('multer');
global.bodyParser = require('body-parser');
global.mysql = require('mysql');

const app=express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//数据库连接
global.conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '0801410',
    port: 3306,
    database: 'today_news'
});
conn.connect();

// 用于文件上传
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '_' +
            Math.random().toString().substring(2, 8) + '.' +
            file.originalname.split('.').pop())
    }
})

var upload = multer({ storage: storage })
// 音乐
app.use('/music',require('./routers/music'))
// 用于上传
// app.use('/file', require('./routers/file'))
app.post('/upload', upload.array('file'), function (req, res) {
    console.log(req.files)
	var addre=req.files[0].destination+req.files[0].filename;
	let sql1 = 'select * from imgSrc WHERE id=1';
		conn.query(sql1, (err, result) => {
		console.log(result[0].address);
		res.json({ r: addre,data:result[0]});
	});
    //res.json({ r:addre})
})
app.get('/imgSrc',(req,res)=>{
	console.log(req.query);
	console.log(JSON.parse(req.query.x));
	let x=JSON.parse(req.query.x);
	let sql = 'select * from imgSrc WHERE id=1';
            conn.query(sql, (err, result) => {
                console.log(result[0].address);
				let result0=JSON.parse(result[0].address);
				console.log(typeof result0.data);
				let obj=result0.data;
				console.log(obj);
				obj.push(x);
				console.log(obj);
				result0.data=obj;
				console.log(result0);
				console.log(JSON.stringify(result0));
				let sql1 = 'UPDATE imgSrc SET address=? WHERE id=1';
					conn.query(sql1, JSON.stringify(result0),(err, result) => {
					console.log(result);
					res.json({ r: 'ok',data:JSON.stringify(result0) });
				});
            });
			//res.json({ r: 'ok'});
	
})
//设置静态资源
app.use("/uploads",express.static("uploads"))
app.listen(3000,function(){
    console.log("服务器启动")
})