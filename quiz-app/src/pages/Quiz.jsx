import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getQuizById } from '../services/supabase';
import { useUser } from '../context/UserContext';

function Quiz() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, updatePoints } = useUser();
    const [quiz, setQuiz] = useState(null);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);
    const [isQuizFinished, setIsQuizFinished] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log('Quiz.jsx: Fetching quiz with ID:', id);
        async function fetchQuiz() {
            try {
                const data = await getQuizById(id);
                console.log('Quiz.jsx: Fetched quiz:', data);
                if (!data || !data.questions || data.questions.length === 0) {
                    throw new Error('Квиз не содержит вопросов');
                }
                setQuiz(data);
                setLoading(false);
            } catch (err) {
                console.error('Quiz.jsx: Error fetching quiz:', err.message);
                setError(err.message || 'Не удалось загрузить квиз.');
                setLoading(false);
            }
        }
        fetchQuiz();
    }, [id]);

    const handleOptionClick = (index) => {
        if (selectedOption !== null) return;
        console.log('Quiz.jsx: Selected option:', index, 'Correct:', quiz.questions[currentQuestion].correct);
        setSelectedOption(index);
        const correct = index === quiz.questions[currentQuestion].correct;
        setIsCorrect(correct);
        if (correct) {
            setScore(prevScore => prevScore + 1);
        }
        setTimeout(() => {
            console.log('Quiz.jsx: Current question:', currentQuestion, 'Total questions:', quiz.questions.length);
            if (currentQuestion < quiz.questions.length - 1) {
                console.log('Quiz.jsx: Moving to next question');
                setCurrentQuestion(prevQuestion => prevQuestion + 1);
                setSelectedOption(null);
                setIsCorrect(null);
            } else {
                console.log('Quiz.jsx: Quiz completed, score:', score + (correct ? 1 : 0));
                setIsQuizFinished(true);
                if (user) {
                    const finalScore = score + (correct ? 1 : 0);
                    updatePoints(user.points + finalScore);
                    console.log('Quiz.jsx: Updated points:', finalScore);
                }
            }
        }, 1000);
    };

    const handleRestart = () => {
        console.log('Quiz.jsx: Navigating back to home');
        navigate('/');
    };

    console.log('Quiz.jsx: Render state:', { loading, error, quiz, currentQuestion, score, selectedOption, isCorrect, isQuizFinished });

    if (loading) {
        return <div className="quiz-container"><p className="home-loading">Загрузка...</p></div>;
    }

    if (error) {
        return <div className="quiz-container"><p className="home-error">{error}</p></div>;
    }

    if (!quiz) {
        return <div className="quiz-container"><p className="home-error">Квиз не найден.</p></div>;
    }

    return (
        <div className="quiz-container">
            <div className="quiz-header">
                <h1 className="quiz-header-title">{quiz.title}</h1>
                {quiz.image_url && <img src={quiz.image_url} alt={quiz.title} className="quiz-header-image" />}
            </div>
            {!isQuizFinished ? (
                <div className="quiz-question">
                    <p className="quiz-question-text">{quiz.questions[currentQuestion].question}</p>
                    {quiz.questions[currentQuestion].options.map((option, index) => (
                        <button
                            key={index}
                            className={`quiz-option 
                ${selectedOption === index ? 'selected' : ''} 
                ${selectedOption !== null && index === quiz.questions[currentQuestion].correct ? 'correct' : ''} 
                ${selectedOption === index && isCorrect === false ? 'incorrect' : ''}`}
                            onClick={() => handleOptionClick(index)}
                            disabled={selectedOption !== null}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            ) : (
                <div className="quiz-result">
                    <h2 className="quiz-result-title">Результат</h2>
                    <p className="quiz-result-text">
                        Вы ответили правильно на {score} из {quiz.questions.length} вопросов!
                    </p>
                    <button className="quiz-result-button" onClick={handleRestart}>
                        Вернуться к квизам
                    </button>
                </div>
            )}
        </div>
    );
}

export default Quiz;