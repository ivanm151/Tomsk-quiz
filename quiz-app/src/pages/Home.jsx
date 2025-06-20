import { useState, useEffect } from 'react';
import { getQuizzes } from '../services/supabase';
import QuizCard from '../components/QuizCard';

function Home() {
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchQuizzes() {
            try {
                const data = await getQuizzes();
                console.log('Fetched quizzes:', data);
                setQuizzes(data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching quizzes:', err);
                setError('Не удалось загрузить квизы.');
                setLoading(false);
            }
        }
        fetchQuizzes();
    }, []);

    return (
        <div className="home-container">
            <h1 className="home-title">Квизы о Томске</h1>
            {loading ? (
                <p className="home-loading">Загрузка...</p>
            ) : error ? (
                <p className="home-error">{error}</p>
            ) : quizzes.length === 0 ? (
                <p className="home-empty">Квизы пока не добавлены</p>
            ) : (
                <div className="home-grid">
                    {quizzes.map((quiz) => (
                        <QuizCard key={quiz.id} quiz={quiz} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Home;
