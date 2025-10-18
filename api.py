#!/usr/bin/env python3
"""
Word of the Day Story Generator - Web API
Flask API that serves word of the day with AI-generated stories
"""

from flask import Flask, jsonify
from flask_cors import CORS
import requests
import anthropic
import os
from datetime import datetime

# Try to import from config.py (for local development)
# Fall back to environment variables (for production)
try:
    from config import Wordnik_API_Key, Anthropic_API_Key
except ImportError:
    Wordnik_API_Key = os.environ.get('WORDNIK_API_KEY')
    Anthropic_API_Key = os.environ.get('ANTHROPIC_API_KEY')

# Create Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS so your portfolio can call this API


def get_word_of_the_day():
    """Fetches the word of the day from Wordnik API."""
    url = "https://api.wordnik.com/v4/words.json/wordOfTheDay"

    params = {
        "api_key": Wordnik_API_Key
    }

    try:
        response = requests.get(url, params=params)
        data = response.json()

        word = data.get("word", "No word found")

        if "definitions" in data and len(data["definitions"]) > 0:
            definition = data["definitions"][0]["text"]
        elif "note" in data:
            definition = data["note"]
        else:
            definition = "No definition available"

        return word, definition
    except Exception as e:
        return None, str(e)


def generate_story(word):
    """Generate a short story using Claude AI"""
    try:
        client = anthropic.Anthropic(api_key=Anthropic_API_Key)

        message = client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=1024,
            messages=[
                {"role": "user", "content": f"Write a short story (about 150 words) that features the word '{word}'. Make it creative and fun!"}
            ]
        )

        story = message.content[0].text
        return story
    except Exception as e:
        return f"Error generating story: {str(e)}"


@app.route('/')
def home():
    """Home endpoint with API info"""
    return jsonify({
        "message": "Word of the Day Story Generator API",
        "endpoints": {
            "/api/word-story": "Get today's word with AI-generated story"
        },
        "author": "Kcheesee"
    })


@app.route('/api/word-story')
def word_story():
    """Main API endpoint that returns word, definition, and story"""

    # Get word and definition
    word, definition = get_word_of_the_day()

    if not word:
        return jsonify({
            "error": "Failed to fetch word of the day",
            "details": definition
        }), 500

    # Generate story
    story = generate_story(word)

    # Return as JSON
    return jsonify({
        "word": word,
        "definition": definition,
        "story": story,
        "generated_at": datetime.now().isoformat()
    })


if __name__ == "__main__":
    # Run the Flask app
    app.run(debug=True, host='0.0.0.0', port=5000)
