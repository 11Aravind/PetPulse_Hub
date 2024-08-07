const chatHistory = document.getElementById('chat-history');
const userInput = document.getElementById('user-message');
const sendButton = document.getElementById('send-button');
const chatbotContainer = document.getElementById('chatbot-container');
const toggleButton = document.getElementById('toggle-chatbot');

toggleButton.addEventListener('click', function() {
    if (chatbotContainer.style.display === 'none') {
        chatbotContainer.style.display = 'block';
    } else {
        chatbotContainer.style.display = 'none';
    }
});

sendButton.addEventListener('click', function() {
    const userMessage = userInput.value.trim();
    if (userMessage!== '') {
        fetch('/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: userMessage })
        })
       .then(response => response.json())
       .then(data => {
            addChatMessage('bot', data.response);
            userInput.value = '';
        });
    }
});

userInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        sendButton.click();
    }
});

function addChatMessage(type, message) {
    const chatMessage = document.createElement('div');
    chatMessage.className = `chat-message ${type}-message`;
    chatMessage.textContent = message;
    chatHistory.appendChild(chatMessage);
    chatHistory.scrollTop = chatHistory.scrollHeight;
}