//Cài đặt express.js
const express=require('express');
const app=express();
const port=3000;

//cài đặt thư viện hổ trợ các phương thức put delete patch
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

//thư viện đường dẫn
const path=require('path');

//Thư viện để console.log khi chạy
const morgan = require('morgan');
app.use(morgan('dev'));

//Sử dụng SortMiddleWare để sắp xếp
const sortMiddleware=require('./app/middlewares/SortMiddleware');
app.use(sortMiddleware);

//cài đặt template-engine
var exphbs  = require('express-handlebars');
app.engine('hbs', exphbs({
        extname:'.hbs',
        helpers:{ 
            sum:(a,b)=>a+b,
            sortable:(name,sort)=>{
                var sortType=name===sort.column?sort.type:'default'
                const icons={
                    default:'oi oi-elevator',
                    desc:'oi oi-sort-descending',
                    asc:'oi oi-sort-ascending'
                }
                const types={
                    default:'asc',
                    desc:'asc',
                    asc:'desc',
                }

                const icon=icons[sortType];
                const type=types[sortType];
                return `<a href="?_sort&column=${name}&type=${type}"><span class="${icon}"></span></a>`;
            }
        }
    })
);
app.set('view engine', 'hbs');
//set path views
app.set('views',path.join(__dirname,'resources','views'))

//cấu hình file public
app.use(express.static(path.join(__dirname,'public')));

//Kết nối cơ sở dữ liệu
const db=require('./config/db');
db.connect();

//use body on POST
app.use(express.urlencoded({ extended: true }));

//sử dụng json
app.use(express.json());

//Sử dụng router
//config route init
const route=require('./routes')
route(app);

//sử dụng chức năng đăng nhập
var cookieParser = require('cookie-parser');
var cookieSession=require('cookie-session');
const session = require('express-session')
const passport = require('passport')
const flash = require('connect-flash')
/* Khai báo để sử dụng kịch bản passport */
require('./config/passport/index');
app.use(cookieParser('secretString'));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());


//   app.use(function(req, res, next){
//     res.locals.message = req.flash();
//     next();




app.use(session({
    secret: 'adsa897adsa98bs',
    resave: false,
    saveUninitialized: false,
  }))

app.listen(port,()=>{
    console.log(`Example app listening at http://localhost:${port}`);
});