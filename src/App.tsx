import React, { useEffect, useState } from 'react';
import './App.css'; // Khali dili CSS file banva

interface CatData {
  id: string;
  name: string;
  image: string;
  description?: string;
  temperament?: string;
}

const RandomCatViewer: React.FC = () => {
  const [cat, setCat] = useState<CatData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const fetchCat = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await fetch('https://api.freeapi.app/api/v1/public/cats/cat/random');
      if (!response.ok) throw new Error('Cat fetch failed');
      const result = await response.json();
      setCat(result?.data ?? null);
    } catch (err) {
      setError('Failed to fetch cat information, please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCat();
  }, []);

  return (
    <div className="container">
      <div className="card">
        <h1 className="title">Random Cat Viewer</h1>

        {error && <div className="error-badge">{error}</div>}

        {loading ? (
          <div className="loader-container">
            <div className="spinner"></div>
            <p>Fetching kitty...</p>
          </div>
        ) : cat ? (
          <div className="content">
            <div className="image-wrapper">
              <img src={cat.image} alt={cat.name} className="cat-image" />
            </div>

            <div className="info">
              <h2 className="cat-name">Name: {cat.name}</h2>
              {cat.temperament && (
                <p className="temperament">
                  <strong>Traits:</strong> {cat.temperament}
                </p>
              )}
              {cat.description && <p className="description">{cat.description}</p>}
            </div>
          </div>
        ) : (
          <p className="no-data">No cat found..</p>
        )}

        <div className="actions">
          <button className="btn-primary" onClick={fetchCat} disabled={loading}>
            {loading ? 'Searching...' : 'Get Random Cat'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RandomCatViewer;