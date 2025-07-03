// server.js
const io = require('socket.io')(3000, { cors: { origin: '*' } });
const express = require('express');
const app = express();
app.use(express.json());

io.on('connection', socket => {
  socket.on('join-room', ({ roomId }) => {
    console.log('Socket joined room:', roomId);
    socket.join(roomId);
    socket.to(roomId).emit('peer-joined');
  });

  socket.on('offer', (data) => {
    console.log('Offer for room:', data.roomId);
    socket.broadcast.to(data.roomId).emit('offer', data);
  });

  socket.on('answer', (data) => {
    console.log('Answer for room:', data.roomId);
    socket.broadcast.to(data.roomId).emit('answer', data);
  });

  socket.on('ice-candidate', (data) => {
    console.log('ICE candidate for room:', data.roomId);
    socket.broadcast.to(data.roomId).emit('ice-candidate', data);
  });

  socket.on('hangup', (data) => {
    console.log('Hangup for room:', data.roomId);
    socket.broadcast.to(data.roomId).emit('hangup');
  });

  socket.on('register-doctor', ({ doctorUsername }) => {
    socket.join(`doctor-${doctorUsername}`);
    console.log(`Doctor ${doctorUsername} joined room doctor-${doctorUsername}`);
  });

  socket.on('register-patient', ({ patientUsername }) => {
    socket.join(`patient-${patientUsername}`);
    console.log(`Patient ${patientUsername} joined room patient-${patientUsername}`);
  });
});

app.post('/notify-doctor', (req, res) => {
  const { doctorUsername, patientUsername, date, time } = req.body;
  io.to(`doctor-${doctorUsername}`).emit('appointmentBooked', { patientUsername, date, time });
  res.sendStatus(200);
});

app.post('/notify-patient', (req, res) => {
  const { patientUsername, doctorUsername, date, time } = req.body;
  io.to(`patient-${patientUsername}`).emit('prescriptionWritten', { doctorUsername, date, time });
  res.sendStatus(200);
});

app.listen(4000, () => console.log('Express server for notifications running on 4000'));

console.log('Socket.IO server is running on port 3000');

