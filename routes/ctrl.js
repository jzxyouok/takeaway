module.exports = function (app, routes) {
    //front
    app.get('/',routes.checkuserLogin);
    app.get('/',routes.index);

    app.get('/option1',routes.checkuserLogin);
    app.get('/option1',routes.option1);

    app.get('/booking',routes.checkuserLogin);
    app.get('/booking',routes.booking_front);

    app.get('/option2',routes.checkuserLogin);
    app.get('/option2',routes.option2);

    app.get('/reg',routes.checkuserLogin);
    app.get('/reg',routes.reg);

    app.get('/bookingsuccess',routes.checkuserLogin);
    app.get('/bookingsuccess',routes.bookingsuccess);
    
    //wei xin
    app.get('/weixin/booking',routes.w_booking);
    app.get('/weixin/bookingsuccess',routes.w_bookingsuccess);
    app.get('/weixin/option',routes.w_option);
    app.get('/weixin/login',routes.w_login);
    app.get('/weixin/reg',routes.w_reg);
    app.get('/wechat',routes.wechat);
    app.get('/weixin/bookinglogin',routes.booking_w_login);
    app.get('/weixin/bookingreg',routes.booking_w_reg);
    app.get('/weixin/orderaddress',routes.w_orderaddress);
    app.get('/weixin/list',routes.w_list);
    app.post('/weixin/getAddressByAPI',routes.getAddressByAPI);

    //cms
    app.get('/cms/booking',routes.checkLogin);
    app.get('/cms/booking',routes.booking);

    app.get('/cms/option',routes.checkLogin);
    app.get('/cms/option',routes.option);

    app.get('/cms/immediate',routes.checkLogin);
    app.get('/cms/immediate',routes.immediate);

    app.get('/cms/400',routes.checkLogin);
    app.get('/cms/400',routes.r400);
    app.get('/cms/s400',routes.checkLogin);
    app.get('/cms/s400',routes.s400);
    app.post('/400/:sql',routes.r400do);

    app.get('/cms/customer',routes.checkLogin);
    app.get('/cms/customer',routes.customer);
    app.post('/customer/:sql',routes.customerdo);

    app.get('/cms/customer_left',routes.checkLogin);
    app.get('/cms/customer_left',routes.customer_left);

    app.get('/cms/booking_left',routes.checkLogin);
    app.get('/cms/booking_left',routes.booking_left);

    app.get('/cms/immediate_left',routes.checkLogin);
    app.get('/cms/immediate_left',routes.immediate_left);

    app.get('/cms/finance_d',routes.checkLogin);
    app.get('/cms/finance_d',routes.finance_d);
    app.post('/finance_d/:sql',routes.finance_ddo);

    app.get('/cms/finance_y',routes.checkLogin);
    app.get('/cms/finance_y',routes.finance_y);

    app.get('/cms/finance_m',routes.checkLogin);
    app.get('/cms/finance_m',routes.finance_m);

    app.get('/cms/finance_z',routes.checkLogin);
    app.get('/cms/finance_z',routes.finance_z);

    app.get('/cms/upload',routes.upload);
    app.get('/cms/uploadsuccess',routes.uploadsuccess);
    app.post('/cms/uploaddo',routes.uploaddo);

    app.get('/cms/address',routes.checkLogin);
    app.get('/cms/address',routes.address);
    app.post('/address/:sql',routes.addressdo);

    app.get('/cms/role',routes.checkLogin);
    app.get('/cms/role',routes.role);
    app.post('/role/:sql',routes.roledo);

    app.get('/cms/menu',routes.checkLogin);
    app.get('/cms/menu',routes.menu);
    app.post('/menu/:sql',routes.menudo);

    app.get('/cms',routes.login);
    app.get('/cms/login',routes.login);
    app.post('/cms/logindo',routes.logindo);

    //微信JSSDK测试
    app.get('/weixin_js',routes.weixin_js);
    app.post('/uploadimg',routes.uploadimg);
    app.get('/wechat',routes.wechat);
    app.post('/wechat',routes.wechatdo);
    app.get('/pay',routes.checkuserLogin);
    app.get('/pay',routes.pay);
    app.post('/pay',routes.paydo);
    //公众号支付test
    app.get('/jsapipay',routes.jsapipay);
    
    //erp
    app.get('/erp',routes.erp_index);
    app.get('/erp/material',routes.erp_material);
    app.get('/erp/category',routes.erp_category);
    app.post('/erp/:sql',routes.erpdo);
    app.get('/erp/putin',routes.erp_putin);
    app.get('/erp/stock',routes.erp_stock);
    app.get('/erp/putout',routes.erp_putout);
    app.get('/erp/byday',routes.erp_byday);
    app.get('/erp/bymonth',routes.erp_bymonth);

    app.post('/service/:sql',routes.servicedo);

    app.get('/service/runSQL',routes.runSQL);
}