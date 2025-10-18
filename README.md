# Word of the Day Story Generator 📚✨

An AI-powered application that fetches the word of the day from Wordnik and generates creative short stories featuring that word using Claude AI.

## Features

- 🔤 Fetches daily word from Wordnik API
- 📖 Retrieves word definitions automatically
- ✍️ Generates creative short stories (150 words) using Claude AI
- 🎨 Beautiful terminal output
- 🔄 Fresh content every day

## Example Output

```
=== Word of the Day Story Generator ===

Word: compellative
Definition: Denoting address: applied to grammatical forms.

Generating story...

=== Generated Story ===

[AI-generated creative story featuring the word]
```

## Installation

### Prerequisites
- Python 3.7+
- Wordnik API key (free at https://developer.wordnik.com/)
- Anthropic API key (for Claude AI)

### Setup

1. Clone this repository:
```bash
git clone https://github.com/Kcheesee/word-of-the-day-story-generator.git
cd word-of-the-day-story-generator
```

2. Install dependencies:
```bash
pip3 install requests anthropic
```

3. Set up your API keys:
```bash
cp config.example.py config.py
```

Then edit `config.py` and add your actual API keys:
```python
Wordnik_API_Key = "your_wordnik_api_key_here"
Anthropic_API_Key = "your_anthropic_api_key_here"
```

## Usage

Run the script:
```bash
python3 "Dictionary API"
```

The program will:
1. Fetch today's word of the day
2. Display the word and its definition
3. Generate a creative story featuring that word
4. Display the story in your terminal

## How It Works

1. **Word Fetching**: Uses the Wordnik API to retrieve the daily featured word and its definition
2. **Story Generation**: Sends the word to Claude AI (Anthropic) with a prompt to generate a creative, fun short story
3. **Display**: Presents the word, definition, and story in a formatted output

## API Integration

### Wordnik API
- Endpoint: `https://api.wordnik.com/v4/words.json/wordOfTheDay`
- Provides: Word of the day, definitions, etymology, and usage examples

### Anthropic Claude API
- Model: Claude Sonnet 4
- Generates creative, contextual short stories featuring the word

## Project Structure

```
word-of-the-day-story-generator/
├── Dictionary API          # Main application script
├── config.py              # API keys (not committed to git)
├── config.example.py      # Template for API configuration
├── .gitignore            # Git ignore file
└── README.md             # This file
```

## Future Enhancements

- [ ] Web API version for portfolio integration
- [ ] Save stories to a daily archive
- [ ] Support for multiple languages
- [ ] Email delivery of daily stories
- [ ] Social media sharing

## Security Note

⚠️ Never commit your `config.py` file with actual API keys to GitHub! The `.gitignore` file is configured to prevent this, but always double-check before pushing.

## Contributing

Feel free to open issues or submit pull requests if you'd like to add features or improvements!

## License

MIT License - feel free to use this project for learning or your own applications!

## Author

Built with curiosity and a love for words and AI!

---

*Powered by Wordnik and Claude AI*
