//  고급웹프로그래밍 과제#3 이상연 60211684
const express = require('express')
const morgan = require('morgan')
const path = require('path')
const session = require('express-session')
const departRouter = require('./routes/depart')

const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const fs = require('fs')

dotenv.config() // .env 파일의 환경 변수 설정
const { PORT, COOKIE_SECRET } = process.env
const app = express()

app.set('port', PORT || 3000) // 포트 설정
app.set('views', path.join(__dirname, 'views')) // 뷰 폴더 설정
app.set('view engine', 'ejs') // 뷰 엔진 설정

// 미들웨어 설정
app.use(morgan('dev')) // 요청 로깅 미들웨어
app.use(express.static(path.join(__dirname, 'public'))) // 정적 파일 제공
app.use(express.json()) // JSON 요청 파싱
app.use(express.urlencoded({ extended: false })) // URL-encoded 요청 파싱
app.use(cookieParser(COOKIE_SECRET))

// 라우터 설정
app.use('/depart', departRouter)

// 404 에러 처리 미들웨어
app.use((req, res, next) => {
  res.status(404).send(`${req.method} ${req.path} is NOT FOUND`)
})

// 서버 에러 처리 미들웨어
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).send('Something broke!')
})

app.get('/', (req, res) => {
  res.redirect('/depart')
})

// 서버 시작
app.listen(app.get('port'), () => {
  console.log(`http://localhost:${app.get('port')}/depart 대기중`)
})
