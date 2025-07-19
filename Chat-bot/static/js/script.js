const chatHistory = document.getElementById('chat-history');
const userInput = document.getElementById('user-message');
const sendButton = document.getElementById('send-button');
const chatbotContainer = document.getElementById('chatbot-container');
const toggleButton = document.getElementById('toggle-chatbot');

// Chat history to maintain conversation context
let chatHistoryData = [];

// Initialize chat with greeting if available
const urlParams = new URLSearchParams(window.location.search);
const initialMessage = urlParams.get('initial_message');
if (initialMessage) {
    addChatMessage('bot', initialMessage);
}

toggleButton.addEventListener('click', function() {
    if (chatbotContainer.style.display === 'none' || !chatbotContainer.style.display) {
        chatbotContainer.style.display = 'block';
    } else {
        chatbotContainer.style.display = 'none';
    }
});

sendButton.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        sendMessage();
    }
});

function sendMessage() {
    const userMessage = userInput.value.trim();
    if (userMessage === '') return;

    // Add user message to chat
    addChatMessage('user', userMessage);
    userInput.value = '';
    userInput.disabled = true;
    sendButton.disabled = true;

    // Show typing indicator
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'chat-message bot-message typing-indicator';
    typingIndicator.innerHTML = `
        <div class="message-avatar">
            <i class="fas fa-robot"></i>
        </div>
        <div class="typing-dots">
            <span></span>
            <span></span>
            <span></span>
        </div>
    `;
    chatHistory.appendChild(typingIndicator);
    chatHistory.scrollTop = chatHistory.scrollHeight;
    
    // Prepare chat history for the API
    const messages = chatHistoryData.map(msg => ({
        role: msg.type === 'user' ? 'user' : 'model',
        parts: [{ text: msg.message }]
    }));

    // Send message to backend
    fetch('/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({ 
            message: userMessage,
            history: messages
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // Remove typing indicator
        chatHistory.removeChild(typingIndicator);
        
        // Add bot's response
        addChatMessage('bot', data.response);
        
        // Update chat history with the latest response
        chatHistoryData.push(
            { type: 'user', message: userMessage },
            { type: 'bot', message: data.response }
        );
    })
    .catch(error => {
        console.error('Error:', error);
        chatHistory.removeChild(typingIndicator);
        addChatMessage('bot', 'Sorry, I encountered an error. Please try again.');
    })
    .finally(() => {
        userInput.disabled = false;
        sendButton.disabled = false;
        userInput.focus();
    });
}

function addChatMessage(type, message) {
    // Create message container
    const chatMessage = document.createElement('div');
    chatMessage.className = `chat-message ${type}-message`;
    
    // Create avatar
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.innerHTML = type === 'user' ? '<i class="fas fa-user"></i>' : '<i class="fas fa-robot"></i>';
    
    // Create message content container
    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    
    // Add message text or typing indicator
    if (message === '...') {
        messageContent.innerHTML = `
            <div class="typing-dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
        `;
    } else {
        messageContent.textContent = message;
    }
    
    // Add timestamp
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const timestampElement = document.createElement('div');
    timestampElement.className = 'message-timestamp';
    timestampElement.textContent = timestamp;
    
    // Assemble message
    chatMessage.appendChild(avatar);
    chatMessage.appendChild(messageContent);
    chatMessage.appendChild(timestampElement);
    
    // Add to chat history
    chatHistory.appendChild(chatMessage);
    chatHistory.scrollTop = chatHistory.scrollHeight;
    
    // Add to chat history data if it's a user message or a bot response (not typing indicator)
    if (message !== '...') {
        chatHistoryData.push({ type, message });
    }
    
    return chatMessage;
}