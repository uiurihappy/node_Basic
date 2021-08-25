const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser');

const config = require('./config/key');

const {User} = require('./models/User');

//옵션
//bodyParser가 client에서 오는 정보를 서버에서 분석해 가져오는것이다.

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

//application/json
app.use(bodyParser.json());


const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected....')) 
.catch(err =>console.log(err))



app.get('/', (req, res) => {
  res.send('Hello World! ')
})


//회원가입을 위한 route
app.post('/register', (req, res) => {
  
  //회원 가입할 때 필요한 정보들을 client에서 가져오면
  //그것들을 DB에 넣어준다.
  
  const user = new User(res.body)
  
  user.save((err, doc) => {
    if(err) return res.json({ success: false, err})
    return res.status(200).json({
      success: true
    })
  })
})



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})