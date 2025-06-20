import { Link } from 'react-router-dom';

function QuizCard({ quiz }) {
    return (
        <Link to={`/quiz/${quiz.id}`} className="quiz-card">
            {quiz.image_url ? (
                <img src={quiz.image_url} alt={quiz.title} className="quiz-image" />
            ) : (
                <div className="quiz-placeholder">Нет изображения</div>
            )}
            <div className="quiz-title">{quiz.title}</div>
        </Link>
    );
}

export default QuizCard;