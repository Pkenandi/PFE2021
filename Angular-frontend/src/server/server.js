const WebSocket = require('ws')
const wss = new WebSocket.Server({ port: 8081}, () => {
  console.log(" Server is running on port 8081 ");
});

wss.broadcast = (ws, data) =>{
  wss.clients.forEach((client) => {
    if(client !== ws && client .readyState === WebSocket.OPEN){
        client.send(data);
    }
  });
};

wss.on('connection', ws => {
  console.log(' User connected. Total connected users: ${wss.clients.size}');

  ws.on('message', message => {
    console.log(message + "\n\n");
    wss.on('close', ws => {
      console.log(' User disconnected. Total users : ${wss.clients.size}');
    });

    ws.on('error', error => {
      console.log(' Users error. Total user connected : ${wss.clients.size}');
    });
  });

});
