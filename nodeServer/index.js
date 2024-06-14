// node server which will handle socket io connections,

const io = require('socket.io')(8000)   // initialize io

const users = {};

//yeh socket.io  jo server hai vo listen krega incoming events ko
//jaise hi connection aye is socket mai to ek arrow function run kr do
io.on('connection', socket => {
    // if any new user joins, let other users connected to the service know!
    socket.on('new-user-joined', name =>{
        // console.log("New user", name);
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    });

    //if someone send a message broadcast it to other people
    socket.on('send', message =>{
        socket.broadcast.emit('receive', {message: message, name: users[socket.id]})
    });

    //if someone leaves the chat  let other know
    socket.on('disconnect', message =>{
        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id];
    });
});
