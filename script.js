let Recording = false;
let audio = [];
let mediaRecorder;

function toggleRecording() {
    if (!Recording) {
      startRecording();
      document.getElementById('message-box').value = 'Recording...';
    } else {
      stopRecording();
      document.getElementById('message-box').value = 'Stop Recording...';
    }
  }
  

function startRecording() {
  navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {
      mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.ondataavailable = event => {
        audio.push(event.data);
      };
      mediaRecorder.start();
      Recording = true;
      document.getElementById('record-button').innerText = 'Stop 🛑';
    })
    .catch(err => {
      console.error('Error accessing microphone:', err);
    });
}

function stopRecording() {
  mediaRecorder.stop();
  Recording = false;
  document.getElementById('record-button').innerText = '🎙️';
}

function sendMessage() {
  if (audio.length === 0) {
    const message = document.getElementById('message-box').value;
    displayMessage(message, 'text');
  } else {
    const audioBlob = new Blob(audio, { type: 'audio/wav' });
    const audioURL = URL.createObjectURL(audioBlob);
    displayMessage(audioURL, 'audio');
    audio = []; 
  }
  document.getElementById('message-box').value = ''; 
}

function displayMessage(content, type) {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    
    if (type === 'text') {
      messageElement.className = 'chat-message right'; 
      messageElement.textContent = content;
    } else if (type === 'audio') {
      const audioElement = document.createElement('audio');
      audioElement.src = content;
      audioElement.controls = true;
      messageElement.className = 'voice-message right'; 
      messageElement.appendChild(audioElement);
    }
  
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
  }
  