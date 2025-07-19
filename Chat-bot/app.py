import os
import hashlib
from functools import lru_cache
from flask import Flask, render_template, request, jsonify
from dotenv import load_dotenv
import google.generativeai as genai
from flask_cors import CORS
# Load environment variables from .env file
load_dotenv()
API_KEY = os.getenv('API_KEY')

app = Flask(__name__)
CORS(app)


# Configure the Generative AI API
try:
    genai.configure(api_key=API_KEY)
    # Use the specified model
    model_name = 'gemini-1.5-flash'
    print(f"Using model: {model_name}")
    model = genai.GenerativeModel(model_name)
    
except Exception as e:
    print(f"Error initializing model: {str(e)}")
    # Fallback to listing available models if there's an error
    try:
        print("Available models:", [m.name for m in genai.list_models()])
    except:
        print("Could not list models - check your API key and internet connection")
    raise


@app.route('/')
def index():
    # Initial greeting message
    return render_template('index.html', initial_message="Hello! I'm your PetPulse Hub assistant. How can I help you today?")


# Initialize a simple in-memory cache
response_cache = {}

def get_cache_key(message: str) -> str:
    """Generate a consistent cache key for similar messages"""
    # Normalize the message by lowercasing and removing extra whitespace
    normalized = ' '.join(message.lower().split())
    # Create a hash of the normalized message for consistent key generation
    return hashlib.md5(normalized.encode()).hexdigest()

def get_cached_response(message: str) -> tuple:
    """Get response from cache if exists, return (response, is_cached)"""
    cache_key = get_cache_key(message)
    return response_cache.get(cache_key), cache_key in response_cache

@app.route('/chat', methods=['POST']) 
def chat():
    try:
        if 'message' not in request.json:
            return jsonify({'error': 'No message provided'}), 400
        
        user_message = request.json['message']
        message_hash = get_cache_key(user_message)
        
        # Check cache first
        cached_response, is_cached = get_cached_response(user_message)
        if is_cached:
            # If we have a cached response, use it
            if 'history' not in request.json or not request.json['history']:
                # If it's a new conversation, create history with just the response
                history = [
                    {"role": "model", "parts": ["I understand I'm here to help with PetPulse Hub. How can I assist you today?"]}
                ]
            else:
                # Otherwise use the provided history
                history = request.json['history']
                
            return jsonify({
                'response': cached_response,
                'history': request.json.get('history', []),
                'cached': True
            })
        
        # System prompt to guide the AI's responses
        system_prompt = """
        You are a helpful assistant for PetPulse Hub, a comprehensive pet care application. 
        Your role is to assist users with information about the application's features and functionality.
        
        Key features to highlight:
        - Pet health tracking and monitoring
        - Veterinary appointment scheduling
        - Pet profile management
        - Medication and vaccination reminders
        - Pet community and social features
        - E-commerce for pet products
        
        Be friendly, informative, and professional. If you don't know an answer, 
        politely say you're not sure but can help with other questions about PetPulse Hub.
        """
        
        # Initialize chat with system prompt if it's the first message
        if 'history' not in request.json or not request.json['history']:
            chat = model.start_chat(history=[{"role": "user", "parts": [system_prompt]}, 
                                    {"role": "model", "parts": ["I understand I'm here to help with PetPulse Hub. How can I assist you today?"]}])
            # Convert history to a serializable format
            serialized_history = [
                {"role": "user", "parts": [system_prompt]},
                {"role": "model", "parts": ["I understand I'm here to help with PetPulse Hub. How can I assist you today?"]}
            ]
        else:
            # Use the provided history
            chat = model.start_chat(history=request.json['history'])
            serialized_history = request.json['history']
        
        # Get response from the model
        response = chat.send_message(user_message)
        
        # Add the latest exchange to the history
        serialized_history.extend([
            {"role": "user", "parts": [user_message]},
            {"role": "model", "parts": [response.text]}
        ])
        
        # Cache the response
        response_cache[get_cache_key(user_message)] = response.text
        
        # Return response and updated history
        return jsonify({
            'response': response.text,
            'history': serialized_history,
            'cached': False
        })
        
    except Exception as e:
        print(f"Error in chat endpoint: {str(e)}")
        return jsonify({
            'error': 'Failed to process your message',
            'details': str(e)
        }), 500


if __name__ == '__main__':
    app.run(debug=True)
