import { useState, useEffect } from 'react';
import { getRatings } from '../services/supabase';

function Rating() {
    const [ratings, setRatings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchRatings() {
            try {
                console.log('Rating.jsx: Fetching ratings');
                const data = await getRatings();
                console.log('Rating.jsx: Fetched ratings:', data);
                setRatings(data);
                setLoading(false);
            } catch (err) {
                console.error('Rating.jsx: Error fetching ratings:', err.message);
                setError('Не удалось загрузить рейтинг.');
                setLoading(false);
            }
        }
        fetchRatings();
    }, []);

    return (
        <div className="rating-container">
            <style>{`
        .rating-container {
          max-width: 320px;
          margin: 0 auto;
          padding: 16px 8px;
          min-height: calc(100vh - 56px); /* Учитываем футер */
          background-color: #f3f4f6;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .rating-title {
          font-size: 18px;
          font-weight: bold;
          color: #1f2937;
          margin-bottom: 12px;
          text-align: center;
        }
        .rating-table {
          width: 100%;
          max-width: 280px;
          background-color: #ffffff;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }
        .rating-row {
          display: flex;
          justify-content: space-between;
          padding: 8px 12px;
          border-bottom: 1px solid #e5e7eb;
          font-size: 14px;
          color: #1f2937;
        }
        .rating-row.header {
          font-weight: 600;
          background-color: #f9fafb;
        }
        .rating-row.position-1 {
          background-color: #fef3c7;
          color: #b45309;
          font-weight: 500;
        }
        .rating-row.position-2 {
          background-color: #f3f4f6;
          color: #4b5563;
          font-weight: 500;
        }
        .rating-row.position-3 {
          background-color: #fef2f2;
          color: #dc2626;
          font-weight: 500;
        }
        .rating-cell {
          flex: 1;
          text-align: left;
        }
        .rating-cell.points {
          text-align: right;
        }
        .rating-loading,
        .rating-error,
        .rating-empty {
          font-size: 14px;
          color: #4b5563;
          text-align: center;
          margin-top: 16px;
        }
        .rating-error {
          color: #ef4444;
        }
      `}</style>
            <h1 className="rating-title">Рейтинг игроков</h1>
            {loading ? (
                <p className="rating-loading">Загрузка...</p>
            ) : error ? (
                <p className="rating-error">{error}</p>
            ) : ratings.length === 0 ? (
                <p className="rating-empty">Рейтинг пуст.</p>
            ) : (
                <div className="rating-table">
                    <div className="rating-row header">
                        <span className="rating-cell">Никнейм</span>
                        <span className="rating-cell points">Очки</span>
                    </div>
                    {ratings.map((user, index) => (
                        <div
                            key={index}
                            className={`rating-row ${index === 0 ? 'position-1' : index === 1 ? 'position-2' : index === 2 ? 'position-3' : ''}`}
                        >
                            <span className="rating-cell">{user.nickname}</span>
                            <span className="rating-cell points">{user.points}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Rating;