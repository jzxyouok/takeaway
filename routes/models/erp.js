var mysql,LIMIT,ejsExcel,fs;
    mysql = require('./db');
    LIMIT = 5;
    ejsExcel = require("./ejsExcel");
    fs = require("fs");

exports.sqldo = function (req, res) {
    var _sql = req.params.sql;
    if(_sql == "insertM"){insertM(req,res);}
    else if(_sql == "delM"){delM(req,res);}
    else if(_sql == "getOrd"){getOrd(req,res);}
    else if(_sql == "insertOrd"){insertOrd(req,res);}
    else if(_sql == "delOrd"){delOrd(req,res);}
    else if(_sql == "getPutIn"){getPutIn(req,res);}
    else if(_sql == "insertPutin"){insertPutin(req,res);}
    else if(_sql == "delPutin"){delPutin(req,res);}
    else if(_sql == "getStock"){getStock(req,res);}
    else if(_sql == "insertPutout"){insertPutout(req,res);}
    else if(_sql == "getPutout"){getPutout(req,res);}
    else if(_sql == "delPutout"){delPutout(req,res);}
    else if(_sql == "getPutInbyDay"){getPutInbyDay(req,res);}
    else if(_sql == "getPutoutbyDay"){getPutoutbyDay(req,res);}
    else if(_sql == "getPutInbyMonth"){getPutInbyMonth(req,res);}
    else if(_sql == "getPutoutbyMonth"){getPutoutbyMonth(req,res);}
    else if(_sql == "toExcelorderlist"){toExcelorderlist(req,res);}
    else if(_sql == "toExcelputin"){toExcelputin(req,res);}
    else if(_sql == "toExcelstock"){toExcelstock(req,res);}
    else if(_sql == "toExcelputout"){toExcelputout(req,res);}
    if(_sql == "insertC"){insertC(req,res);}
    else if(_sql == "delC"){delC(req,res);}
    else if(_sql == "toExcelputinM"){toExcelputinM(req,res);}
    else if(_sql == "toExcelputoutM"){toExcelputoutM(req,res);}
};

function setFileName(){
	var myDate = new Date();
    var y = myDate.getFullYear(); 
    var m = (((myDate.getMonth()+1)+"").length==1)?"0"+(myDate.getMonth()+1):(myDate.getMonth()+1);
    var d = myDate.getDate(); 
    var hh = myDate.getHours();
    var mm = myDate.getMinutes();
    var ss = myDate.getSeconds();
    return "~"+y+m+d+hh+mm+ss+".xlsx";
}

/*导出采购单*/
function toExcelorderlist(req, res){
    var k_category = req.param('k_category');
	var k_date = req.param('k_date');
	k_category = k_category == '所有'?'':k_category;
    //获得Excel模板的buffer对象
    var exlBuf = fs.readFileSync("./public/excelop/template/orderlist.xlsx");
    var excelname = setFileName();
    //数据源
    var sql1 = "select * from c_orderlist where category like '%"+k_category+"%' and date = '"+k_date+"' order by no desc";
	mysql.query(sql1 ,function(error,obj){
        if(error){console.log(error);return false;} 
        //用数据源(对象)data渲染Excel模板
        var obj_str = '[ [{"date": "'+k_date+'"}],';
        obj_str += JSON.stringify(obj) + "]";
        ejsExcel.renderExcelCb(exlBuf,  JSON.parse(obj_str), function(exlBuf2){
            fs.writeFileSync("./public/excelop/temp/"+excelname, exlBuf2);
            res.send(excelname);
        });
    });
}

/*导出入库单*/
function toExcelputin(req, res){
    var k_category = req.param('k_category');
	var k_date = req.param('k_date');
	var k_date_end = req.param('k_date_end');
	k_category = k_category == '所有'?'':k_category;
    //获得Excel模板的buffer对象
    var exlBuf = fs.readFileSync("./public/excelop/template/putin.xlsx");
    var excelname = setFileName();
    //数据源
    //var sql1 = "select * from c_putin where category like '%"+k_category+"%' and date = '"+k_date+"' order by id desc";
    var sql1 = "select * from c_putin where category = '"+k_category+"' and date >= '"+k_date+"' and date <= '"+k_date_end+"' order by id desc";
	if(k_category == ''){
		sql1 = "select * from c_putin where date >= '"+k_date+"' and date <= '"+k_date_end+"' order by id desc";
	}
	mysql.query(sql1 ,function(error,obj){
        if(error){console.log(error);return false;} 
        //用数据源(对象)data渲染Excel模板
        var obj_str = '[ [{"date": "'+k_date+"~"+k_date_end+'"}],';
        obj_str += JSON.stringify(obj) + "]";
        //console.log(obj_str);
        ejsExcel.renderExcelCb(exlBuf, JSON.parse(obj_str), function(exlBuf2){
            fs.writeFileSync("./public/excelop/temp/"+excelname, exlBuf2);
            res.send(excelname);
        });
    });
}

/*导出月度入库单*/
function toExcelputinM(req, res){
    var k_category = req.param('k_category');
	var k_date = req.param('k_date');
	var k_name = req.param('k_name');
	var k_hasInvoice = req.param('k_hasInvoice');
	k_category = k_category == '所有'?'':k_category;
	k_name = k_name == '所有'?'':k_name;
	k_hasInvoice = k_hasInvoice == '所有'?'':k_hasInvoice;
    //获得Excel模板的buffer对象
    var exlBuf = fs.readFileSync("./public/excelop/template/putinm.xlsx");
    var excelname = setFileName();
    //数据源
    var sql1 = "select * from c_putin where category = '"+k_category+"' and name like '%"+k_name+"%' and hasInvoice like '%"+k_hasInvoice+"%' and date like '"+k_date+"%' order by id desc";
	if(k_category == ''){
		sql1 = "select * from c_putin where name like '%"+k_name+"%' and hasInvoice like '%"+k_hasInvoice+"%' and date like '"+k_date+"%' order by id desc";
	}
	mysql.query(sql1 ,function(error,obj){
        if(error){console.log(error);return false;} 
        //用数据源(对象)data渲染Excel模板
        var obj_str = '[ [{"date": "'+k_date+'"}],';
        obj_str += JSON.stringify(obj) + "]";
        //console.log(obj_str);
        ejsExcel.renderExcelCb(exlBuf, JSON.parse(obj_str), function(exlBuf2){
            fs.writeFileSync("./public/excelop/temp/"+excelname, exlBuf2);
            res.send(excelname);
        });
    });
}

/*导出库存单*/
function toExcelstock(req, res){
    var k_category = req.param('k_category');
	k_category = k_category == '所有'?'':k_category;
    //获得Excel模板的buffer对象
    var exlBuf = fs.readFileSync("./public/excelop/template/stock.xlsx");
    var excelname = setFileName();
    //数据源
    //var sql1 = "select * from stock where category like '%"+k_category+"%' and num > 0 order by id desc";
    var sql1 = "select * from c_stock where category = '"+k_category+"' and num > 0 order by no desc";
	if(k_category == ''){
		sql1 = "select * from c_stock where num > 0 order by no desc";
	}
	mysql.query(sql1 ,function(error,obj){
        if(error){console.log(error);return false;} 
        //用数据源(对象)data渲染Excel模板
        ejsExcel.renderExcelCb(exlBuf, obj, function(exlBuf2){
            fs.writeFileSync("./public/excelop/temp/"+excelname, exlBuf2);
            res.send(excelname);
        });
    });
}

/*导出出库单*/
function toExcelputout(req, res){
    var k_category = req.param('k_category');
    var k_date = req.param('k_date');
    var k_date_end = req.param('k_date_end');
	k_category = k_category == '所有'?'':k_category;
    //获得Excel模板的buffer对象
    var exlBuf = fs.readFileSync("./public/excelop/template/putout.xlsx");
    var excelname = setFileName();
    //数据源
    //var sql1 = "select * from putout where category like '%"+k_category+"%' and date = '"+k_date+"' order by id desc";
	var sql1 = "select * from c_putout where category = '"+k_category+"' and date >= '"+k_date+"' and date <= '"+k_date_end+"' order by id desc";
	if(k_category == ''){
		sql1 = "select * from c_putout where date >= '"+k_date+"' and date <= '"+k_date_end+"' order by id desc";
	}
	mysql.query(sql1 ,function(error,obj){
        if(error){console.log(error);return false;} 
        //用数据源(对象)data渲染Excel模板
        var obj_str = '[ [{"date": "'+k_date+"~"+k_date_end+'"}],';
        obj_str += JSON.stringify(obj) + "]";
        ejsExcel.renderExcelCb(exlBuf, JSON.parse(obj_str), function(exlBuf2){
            fs.writeFileSync("./public/excelop/temp/"+excelname, exlBuf2);
            res.send(excelname);
        });
    });
}

/*导出月度出库单*/
function toExcelputoutM(req, res){
    var k_category = req.param('k_category');
	var k_date = req.param('k_date');
	var k_name = req.param('k_name');
	var k_hasInvoice = req.param('k_hasInvoice');
	k_category = k_category == '所有'?'':k_category;
	k_name = k_name == '所有'?'':k_name;
	k_hasInvoice = k_hasInvoice == '所有'?'':k_hasInvoice;
    //获得Excel模板的buffer对象
    var exlBuf = fs.readFileSync("./public/excelop/template/putoutm.xlsx");
    var excelname = setFileName();
    //数据源
    var sql1 = "select * from c_putout where category = '"+k_category+"' and name like '%"+k_name+"%' and date like '"+k_date+"%' order by id desc";
	if(k_category == ''){
		sql1 = "select * from c_putout where name like '%"+k_name+"%' and date like '"+k_date+"%' order by id desc";
	}
	mysql.query(sql1 ,function(error,obj){
        if(error){console.log(error);return false;} 
        //用数据源(对象)data渲染Excel模板
        var obj_str = '[ [{"date": "'+k_date+'"}],';
        obj_str += JSON.stringify(obj) + "]";
        ejsExcel.renderExcelCb(exlBuf, JSON.parse(obj_str), function(exlBuf2){
            fs.writeFileSync("./public/excelop/temp/"+excelname, exlBuf2);
            res.send(excelname);
        });
    });
}

function insertM(req, res) {
	var name = req.param('name');
	var cate_id = req.param('cate_id');
	var unit = req.param('unit');
	var sql1 = "insert into material (name,cate_id,unit) values ('"+name+"',"+cate_id+",'"+unit+"')";
	mysql.query(sql1 ,function(error,row){
	    if(error){console.log(error);return false;}
	    res.send('200');
	});
};

function insertC(req, res) {
	var name = req.param('name');
	var sql1 = "insert into category (name) values ('"+name+"')";
	mysql.query(sql1 ,function(error,row){
	    if(error){console.log(error);return false;}
	    res.send('200');
	});
};

function delC(req, res) {
	var id = req.param('id');
	var sql1 = "delete from category where id = "+ id;
	mysql.query(sql1 ,function(error,row){
	    if(error){console.log(error);return false;}
	    res.send('200');
	});
};

function insertOrd(req, res) {
	var name = req.param('name');
	var category = req.param('category');
	var date = req.param('date');
	var num = req.param('num');
	var sql1 = "insert into orderlist (name,category,date,num) values ('"+name+"','"+category+"','"+date+"','"+num+"')";
	mysql.query(sql1 ,function(error,row){
	    if(error){console.log(error);return false;}
	    res.send('200');
	});
};

function delM(req, res) {
	var id = req.param('id');
	var sql1 = "delete from material where id = "+ id;
	mysql.query(sql1 ,function(error,row){
	    if(error){console.log(error);return false;}
	    res.send('200');
	});
};

function getOrd(req, res) {
	var k_category = req.param('k_category');
	var k_date = req.param('k_date');
	k_category = k_category == '所有'?'':k_category;
	var sql1 = "select * from c_orderlist where category like '%"+k_category+"%' and date = '"+k_date+"' order by no desc";
	console.log(sql1);
	mysql.query(sql1 ,function(error,rows){
	    if(error){console.log(error);return false;}
	    res.json(rows);
	});
};

function delOrd(req, res) {
	var id = req.param('id');
	var sql1 = "delete from orderlist where id = "+ id;
	mysql.query(sql1 ,function(error,row){
	    if(error){console.log(error);return false;}
	    res.send('200');
	});
};

function getPutIn(req, res) {
	var k_category = req.param('k_category');
	var k_date = req.param('k_date');
	var k_date_end = req.param('k_date_end');
	k_category = k_category == '所有'?'':k_category;
	var sql1 = "select * from c_putin where category = '"+k_category+"' and date >= '"+k_date+"' and date <= '"+k_date_end+"' order by id desc";
	if(k_category == ''){
		sql1 = "select * from c_putin where date >= '"+k_date+"' and date <= '"+k_date_end+"' order by id desc";
	}
	console.log(sql1);
	mysql.query(sql1 ,function(error,rows){
	    if(error){console.log(error);return false;}
	    res.json(rows);
	});
};

function getPutInbyDay(req, res) {
	var k_category = req.param('k_category');
	var k_date = req.param('k_date');
	var k_name = req.param('k_name');
	var k_hasInvoice = req.param('k_hasInvoice');
	k_category = k_category == '所有'?'':k_category;
	k_name = k_name == '所有'?'':k_name;
	k_hasInvoice = k_hasInvoice == '所有'?'':k_hasInvoice;
	var sql1 = "select * from c_putin where category like '%"+k_category+"%' and name like '%"+k_name+"%' and hasInvoice like '%"+k_hasInvoice+"%' and date = '"+k_date+"' order by id desc";
	console.log(sql1);
	mysql.query(sql1 ,function(error,rows){
	    if(error){console.log(error);return false;}
	    res.json(rows);
	});
};

function getPutInbyMonth(req, res) {
	var k_category = req.param('k_category');
	var k_date = req.param('k_date');
	var k_name = req.param('k_name');
	var k_hasInvoice = req.param('k_hasInvoice');
	k_category = k_category == '所有'?'':k_category;
	k_name = k_name == '所有'?'':k_name;
	k_hasInvoice = k_hasInvoice == '所有'?'':k_hasInvoice;
	var sql1 = "select * from c_putin where category = '"+k_category+"' and name like '%"+k_name+"%' and hasInvoice like '%"+k_hasInvoice+"%' and date like '"+k_date+"%' order by id desc";
	if(k_category == ''){
		sql1 = "select * from c_putin where name like '%"+k_name+"%' and hasInvoice like '%"+k_hasInvoice+"%' and date like '"+k_date+"%' order by id desc";
	}
	console.log(sql1);
	mysql.query(sql1 ,function(error,rows){
	    if(error){console.log(error);return false;}
	    res.json(rows);
	});
};

function insertPutin(req, res) {
	var name = req.param('name');
	var category = req.param('category');
	var date = req.param('date');
	var num = Number(req.param('num'));
	var total = Number(req.param('total'));
	var hasInvoice = req.param('hasInvoice');
	//计算单价 = 总价/数量
	var unitPrice = total/num;
	unitPrice = Math.round(unitPrice*100)/100;
	//差价 = 总价 - 数量*单价
	var difference = total - num*unitPrice;
	var sql1 = "insert into putin (name,category,date,num,total,hasInvoice,unitPrice,difference) values ('"+name+"','"+category+"','"+date+"','"+num+"',"+total+",'"+hasInvoice+"',"+unitPrice+","+difference+")";
	mysql.query(sql1 ,function(error,row){
	    if(error){console.log(error);return false;}
	    //入库
	    //1.判断是否库存已存在
	    //var sql2 = "select * from stock where name = '"+name+"' and unitPrice = "+unitPrice+" and category = '"+category+"'";
	    var sql2 = "select * from stock where name = '"+name+"' and category = '"+category+"'"; 
	    mysql.query(sql2 ,function(error,row2){
	    	if(error){console.log(error);return false;}
	    	var sql3 = "";
	    	if(row2[0]){
	    		//库存存在，单价做加权平均
	    		var n_unitPrice = (row2[0].num*row2[0].unitPrice + num*unitPrice)/(row2[0].num+num);
	    		n_unitPrice = Math.round(n_unitPrice*100)/100;
	    		sql3 = "update stock set num = "+(row2[0].num+num)+",unitPrice = "+n_unitPrice+" where id = "+row2[0].id;
	    	}else{
	    		//库存不存在，新增
	    		sql3 = "insert into stock (name,unitPrice,num,category) values ('"+name+"',"+unitPrice+","+num+",'"+category+"')";
	    	}
	    	mysql.query(sql3 ,function(error,row3){
	    		if(error){console.log(error);return false;}
	    		res.send('200');
	    	});
	    });	
	});
};

function delPutin(req, res) {
	var id = req.param('id');
	var category = req.param('category');
	var unitPrice = req.param('unitPrice');
	var name = req.param('name');
	var num = req.param('num');
	//先判断库存数是不是小于删除的数量
	var sql0 = "select * from stock where name = '"+name+"' and category = '"+category+"'";
	mysql.query(sql0 ,function(error,row0){
	    if(error){console.log(error);return false;}
	    if(row0[0].num < num){
	    	res.send('300');
	    }else{
	    	var sql1 = "delete from putin where id = "+ id;
			mysql.query(sql1 ,function(error,row){
			    if(error){console.log(error);return false;}
			    //库存中删除相应的库存数,单价做加权平均
			    var n_unitPrice = (row0[0].num*row0[0].unitPrice - num*unitPrice)/(row0[0].num-num);
			    //console.log(row0[0].num);
			    //console.log(row0[0].unitPrice);
			    //console.log(num);
			    //console.log(unitPrice);
			    //console.log(n_unitPrice);
			    n_unitPrice = Math.round(n_unitPrice*100)/100;
			    var sql2 = "update stock set num = num-"+num+",unitPrice = '"+n_unitPrice+"' where name = '"+name+"' and category = '"+category+"'";
			    //console.log(sql2);
			    mysql.query(sql2 ,function(error,row2){
			    	if(error){console.log(error);return false;}
			    	res.send('200');
			    });
			});
	    }
	});    
};

function getStock(req, res) {
	var k_category = req.param('k_category');
	var k_name = req.param('k_name');
	k_category = k_category == '所有'?'':k_category;
	k_name = k_name == '所有'?'':k_name;
	var sql1 = "select * from c_stock where category = '"+k_category+"' and name like '%"+k_name+"%' and num > 0 order by id desc";
	if(k_category == ''){
		sql1 = "select * from c_stock where name like '%"+k_name+"%' and num > 0 order by id desc";
	}
	console.log(sql1);
	mysql.query(sql1 ,function(error,rows){
	    if(error){console.log(error);return false;}
	    res.json(rows);
	});
};

function insertPutout(req, res) {
	var name = req.param('name');
	var category = req.param('category');
	var date = req.param('date');
	var num = Number(req.param('num'));
	var unitPrice = Number(req.param('unitPrice'));
	var id = req.param('id');
	var total = num*unitPrice;
	//插入出库记录
	var sql1 = "insert into putout (name,category,date,num,unitPrice,total) values ('"+name+"','"+category+"','"+date+"',"+num+","+unitPrice+","+total+")";
	mysql.query(sql1 ,function(error,row){
	    if(error){console.log(error);return false;}
	    //库存中扣除相应的库存数
	    var sql2 =  "update stock set num = num - "+num + " where id = " + id;
	    mysql.query(sql2 ,function(error,row2){
	    	if(error){console.log(error);return false;}
	    	res.send('200');
	    });
	});
};

function getPutout(req, res) {
	//var sql1 = "select * from putout where category like '%"+k_category+"%' and date = '"+k_date+"' order by id desc";
	var k_category = req.param('k_category');
	var k_date = req.param('k_date');
	var k_date_end = req.param('k_date_end');
	k_category = k_category == '所有'?'':k_category;
	var sql1 = "select * from c_putout where category = '"+k_category+"' and date >= '"+k_date+"' and date <= '"+k_date_end+"' order by id desc";
	if(k_category == ''){
		sql1 = "select * from c_putout where date >= '"+k_date+"' and date <= '"+k_date_end+"' order by id desc";
	}
	console.log(sql1);
	mysql.query(sql1 ,function(error,rows){
	    if(error){console.log(error);return false;}
	    res.json(rows);
	});
};

function getPutoutbyDay(req, res) {
	var k_category = req.param('k_category');
	var k_date = req.param('k_date');
	var k_name = req.param('k_name');
	k_category = k_category == '所有'?'':k_category;
	k_name = k_name == '所有'?'':k_name;
	var sql1 = "select * from putout where category like '%"+k_category+"%' and name like '%"+k_name+"%' and date = '"+k_date+"' order by id desc";
	console.log(sql1);
	mysql.query(sql1 ,function(error,rows){
	    if(error){console.log(error);return false;}
	    res.json(rows);
	});
};

function getPutoutbyMonth(req, res) {
	var k_category = req.param('k_category');
	var k_date = req.param('k_date');
	var k_name = req.param('k_name');
	var k_hasInvoice = req.param('k_hasInvoice');
	k_category = k_category == '所有'?'':k_category;
	k_name = k_name == '所有'?'':k_name;
	k_hasInvoice = k_hasInvoice == '所有'?'':k_hasInvoice;
	var sql1 = "select * from c_putout where category = '"+k_category+"' and name like '%"+k_name+"%' and date like '"+k_date+"%' order by id desc";
	if(k_category == ''){
		sql1 = "select * from c_putout where name like '%"+k_name+"%' and date like '"+k_date+"%' order by id desc";
	}
	console.log(sql1);
	mysql.query(sql1 ,function(error,rows){
	    if(error){console.log(error);return false;}
	    res.json(rows);
	});
};

function delPutout(req, res) {
	var id = req.param('id');
	var category = req.param('category');
	var unitPrice = req.param('unitPrice');
	var name = req.param('name');
	var num = req.param('num');
	var sql1 = "delete from putout where id = "+ id;
	mysql.query(sql1 ,function(error,row){
	    if(error){console.log(error);return false;}
	    //库存中增加相应的库存数
	    var sql2 = "update stock set num = num+"+num+" where name = '"+name+"' and unitPrice = "+unitPrice+" and category = '"+category+"'";
	    mysql.query(sql2 ,function(error,row2){
	    	if(error){console.log(error);return false;}
	    	res.send('200');
	    });
	});
};