import os
from flask import Flask, render_template, request, jsonify
from dotenv import load_dotenv
import google.generativeai as genai

# Load environment variables from .env file
load_dotenv()
API_KEY = os.getenv('API_KEY')

app = Flask(__name__)

# Configure the Generative AI API
genai.configure(api_key=API_KEY)
model = genai.GenerativeModel('gemini-pro')


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/chat', methods=['POST'])
def chat():
    user_message = request.json['message']
    chat = model.start_chat(history=[])
    response = chat.send_message(user_message)
    return jsonify({'response': response.text})


if __name__ == '__main__':
    app.run(debug=True)
