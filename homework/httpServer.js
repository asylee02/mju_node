//고급웹프로그래밍 과제#1 60211684 이상연
const http = require('http');
const url = require('url');
const fs = require('fs').promises;
const flights = require('./flights')

const hostname = '127.0.0.1';
const port = 8080;

const server = http.createServer(async (req, res) => {
    const parsedUrl = url.parse(req.url, true); // URL을 파싱
    if (req.method === 'GET') { // GET요청 시,
        if (req.url === '/') {
            const data = await fs.readFile('./index.html');
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(data);
        }
         else if (req.url === '/flight') {
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(JSON.stringify(flights));
        }
         else if (parsedUrl.pathname === '/flights') { //req.url 로 뽑으면 /flights?to="~~" 로 뽑힘
            const to = parsedUrl.query.to; // query 중에 to인 애를 찾음
            const data =flights.filter((item)=>{
               return item.to===to
            })
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(JSON.stringify(data));
        }
         else{ // 에러 처리
            res.writeHead(404, {'Content-Type': 'text/plain; charset=utf-8'});
            res.end(`${req.url} NOT FOUND`)
         }
    }
    else if (req.method==='POST'){ // POST 요청 시,
        if(req.url='/flight'){
            
            req.on('data',(data)=>{
                const id = Number(flights[flights.length-1].id)+1 // ID 는 현재 flights.js의 마지막 ID에 +1 해서 ID 추가
                const {airline, to, gate} = JSON.parse(data)
                const newFlight={ 
                    id : id,
                    airline: airline,
                    to : to,
                    gate : gate
                };
                res.writeHead(201,{
                    'Content-Type' : 'application/json; charset=utf-8'
                })
                return res.end(JSON.stringify(newFlight))

            })
        }
        else{ // 에러처리
            res.writeHead(404, {'Content-Type': 'text/plain; charset=utf-8'});
            res.end(`${req.url} NOT FOUND`)
         }
    }
    else if (req.method==='PUT'){ // PUT 요청 시,
        if(req.url.startsWith('/flight')){
            const id = parsedUrl.pathname.split('/')[2]

            req.on('data',(data)=>{
                const {airline, to, gate} = JSON.parse(data)
                let updateFlight;
                const datas = flights.map((item)=>{
                    if(item.id === id){
                        updateFlight = {
                            id: id,
                            airline : airline,
                            to : to,
                            gate: gate
                        }
                        return updateFlight
                    }
                    else{
                        return item
                    }
                })
                console.log('2')
                res.writeHead(200,{
                    'Content-Type': 'application/json; charset=utf-8'
                });
                return res.end(JSON.stringify(updateFlight))
            })
        }
        else{
            res.writeHead(404, {'Content-Type': 'text/plain; charset=utf-8'});
            res.end(`${req.url} NOT FOUND`)
         }
    }
    else if (req.method==='DELETE'){ // DELETE 요청 시,
        if(req.url.startsWith('/flight')){
            const id = parsedUrl.pathname.split('/')[2] // 두번쨰 param 뽑기
            
            const datas = flights.filter((item)=>{ 
                return item.id !== id  // id가 다른 애들만 filter로 처리 => id 같은 애는 걸러짐
            });
            console.log(datas)
            res.statusCode = 204;
            return res.end(JSON.stringify(datas));
        }
        else{ //에러처리
            res.writeHead(404, {'Content-Type': 'text/plain; charset=utf-8'});
            res.end(`${req.url} NOT FOUND`)
         }
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
