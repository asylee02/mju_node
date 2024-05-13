// 수업참여 0430 - 이상연 60211684


const express =require('express');
const path = require('path');

const router = express.Router();

router.get('/', (req,res)=>{
    res.redirect('/login')
});

router.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname, '../public/upload.html'))
})

module.exports = router;
