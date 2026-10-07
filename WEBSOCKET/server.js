import http from 'node:http'
import fs from 'node:fs/promises'
import {WebSocketServer} from 'ws'
import path from 'path'



const PORT =process.env.PORT ?? 8000;

const httpServer =http.createServer(async function(req ,res) {
    const indexFile =await fs.readFile(path.resolve('./index.html'), 'utf-8')
    res.setHeader('Content-Type', 'text/html')
    return res.end(indexFile)

});

const wsServer =new WebSocketServer({server:httpServer});

wsServer.on('connection', (websocket) =>{
    console.log(`Websocket Connection....`)

    websocket.on('message',(data) =>{
        console.log(`webSocket Messsage Recv.`, data.toString());
        websocket.send('pong.. hello ji from server ')

    })
})

httpServer.listen(PORT, () =>{
    console.log(`server is running on http://localhost:${PORT}`);
});