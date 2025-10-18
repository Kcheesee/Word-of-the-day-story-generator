import React, { useState, useEffect } from 'react';

interface WordStoryData {
  word: string;
  definition: string;
  story: string;
  generated_at: string;
}

const WordStoryWidget: React.FC = () => {
  const [data, setData] = useState<WordStoryData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const loadWordStory = async () => {
    setLoading(true);
    setError(false);

    try {
      const response = await fetch('https://rnadom-storytime-with-claude.onrender.com/api/word-story');

      if (!response.ok) {
        throw new Error('Failed to load word story');
      }

      const wordData = await response.json();
      setData(wordData);
    } catch (err) {
      console.error('Error loading word story:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWordStory();
  }, []);

  return (
    <div className="word-story-widget">
      <style jsx>{`
        .word-story-widget {
          max-width: 600px;
          margin: 20px auto;
          padding: 30px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 15px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
          color: white;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .widget-title {
          margin: 0 0 20px 0;
          font-size: 28px;
          text-align: center;
        }

        .word-display {
          background: rgba(255,255,255,0.2);
          padding: 15px;
          border-radius: 10px;
          margin-bottom: 15px;
        }

        .word-title {
          font-size: 32px;
          font-weight: bold;
          text-transform: capitalize;
          margin-bottom: 10px;
        }

        .word-definition {
          font-size: 16px;
          font-style: italic;
          opacity: 0.9;
        }

        .story-container {
          background: rgba(255,255,255,0.15);
          padding: 20px;
          border-radius: 10px;
          line-height: 1.6;
          font-size: 16px;
          white-space: pre-wrap;
        }

        .loading {
          text-align: center;
          font-size: 18px;
          padding: 40px;
        }

        .error {
          background: rgba(255,0,0,0.3);
          padding: 15px;
          border-radius: 10px;
          text-align: center;
        }

        .generated-time {
          text-align: center;
          font-size: 12px;
          margin-top: 15px;
          opacity: 0.7;
        }

        .refresh-btn {
          display: block;
          margin: 20px auto 0;
          padding: 10px 30px;
          background: rgba(255,255,255,0.3);
          border: 2px solid white;
          border-radius: 25px;
          color: white;
          font-size: 16px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .refresh-btn:hover {
          background: rgba(255,255,255,0.5);
          transform: scale(1.05);
        }

        .refresh-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .spinner {
          border: 3px solid rgba(255,255,255,0.3);
          border-top: 3px solid white;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          animation: spin 1s linear infinite;
          margin: 0 auto;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>

      <h2 className="widget-title">📚 Word of the Day Story</h2>

      {loading && (
        <div className="loading">
          <div className="spinner"></div>
          <p style={{ marginTop: '20px' }}>Loading today's word...</p>
          <p style={{ fontSize: '14px', opacity: '0.8' }}>
            (First load may take ~30 seconds as the API wakes up)
          </p>
        </div>
      )}

      {error && (
        <div className="error">
          <p>Oops! Couldn't load the story. The API might be starting up.</p>
          <button className="refresh-btn" onClick={loadWordStory}>
            🔄 Retry
          </button>
        </div>
      )}

      {!loading && !error && data && (
        <>
          <div className="word-display">
            <div className="word-title">{data.word}</div>
            <div className="word-definition">{data.definition}</div>
          </div>

          <div className="story-container">
            {data.story}
          </div>

          <div className="generated-time">
            Generated: {new Date(data.generated_at).toLocaleString()}
          </div>

          <button
            className="refresh-btn"
            onClick={loadWordStory}
            disabled={loading}
          >
            🔄 New Story
          </button>
        </>
      )}
    </div>
  );
};

export default WordStoryWidget;
