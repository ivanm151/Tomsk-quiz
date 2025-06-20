import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createQuiz, uploadQuizImage } from '../services/supabase';

function CreateQuiz() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1); // 1: title, 2: image, 3: questions
    const [title, setTitle] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState('');
    const [options, setOptions] = useState(['', '', '', '']);
    const [correctOption, setCorrectOption] = useState(0);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleTitleSubmit = (e) => {
        e.preventDefault();
        console.log('CreateQuiz.jsx: Submitting title:', title);
        if (!title.trim()) {
            setError('Введите название квиза.');
            return;
        }
        setError(null);
        setStep(2);
    };

    const handleImageSubmit = (e) => {
        e.preventDefault();
        console.log('CreateQuiz.jsx: Submitting image step, imageFile:', !!imageFile);
        setError(null);
        setStep(3);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        console.log('CreateQuiz.jsx: Image selected:', file?.name);
        if (file && !file.type.startsWith('image/')) {
            setError('Пожалуйста, выберите изображение.');
            return;
        }
        setImageFile(file);
        setError(null);
    };

    const handleQuestionSubmit = (e) => {
        e.preventDefault();
        console.log('CreateQuiz.jsx: Submitting question:', {
            currentQuestion,
            options,
            correctOption,
        });
        if (!currentQuestion.trim()) {
            setError('Введите вопрос.');
            return;
        }
        if (options.some(opt => !opt.trim())) {
            setError('Заполните все варианты ответа.');
            return;
        }
        setQuestions([...questions, {
            question: currentQuestion,
            options,
            correct: parseInt(correctOption),
        }]);
        setCurrentQuestion('');
        setOptions(['', '', '', '']);
        setCorrectOption(0);
        setError(null);
        console.log('CreateQuiz.jsx: Questions updated:', questions.length + 1);
    };

    const handleFinish = async () => {
        console.log('CreateQuiz.jsx: Starting finish process');
        if (questions.length === 0) {
            console.log('CreateQuiz.jsx: No questions added');
            setError('Добавьте хотя бы один вопрос.');
            return;
        }
        setLoading(true);
        try {
            console.log('CreateQuiz.jsx: Preparing quiz data:', { title, questions, imageFile: !!imageFile });
            if (imageFile) {
                console.log('CreateQuiz.jsx: Attempting to upload image');
                const imageUrl = await uploadQuizImage(imageFile);
                console.log('CreateQuiz.jsx: Image uploaded, URL:', imageUrl);
                // URL не сохраняем в базе, только в Storage
            }
            const quiz = await createQuiz(title, questions);
            console.log('CreateQuiz.jsx: Quiz created successfully:', quiz);
            navigate('/');
        } catch (err) {
            console.error('CreateQuiz.jsx: Detailed error:', {
                message: err.message,
                details: err.details || 'No details',
                hint: err.hint || 'No hint',
                code: err.code || 'No code',
            });
            setError('Не удалось создать квиз: ' + err.message);
        } finally {
            setLoading(false);
            console.log('CreateQuiz.jsx: Finish process completed, loading:', false);
        }
    };

    return (
        <div className="create-quiz-container">
            <style>{`
        .create-quiz-container {
          max-width: 320px;
          margin: 0 auto;
          padding: 16px 8px;
          min-height: calc(100vh - 56px); /* Учитываем футер */
          background-color: #f3f4f6;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .create-quiz-title {
          font-size: 18px;
          font-weight: bold;
          color: #1f2937;
          margin-bottom: 12px;
          text-align: center;
        }
        .create-quiz-form {
          width: 280px;
          background-color: #ffffff;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          padding: 16px;
        }
        .create-quiz-label {
          font-size: 14px;
          font-weight: 500;
          color: #1f2937;
          margin-bottom: 4px;
          display: block;
        }
        .create-quiz-input,
        .create-quiz-select {
          width: 100%;
          padding: 8px;
          font-size: 14px;
          border: 1px solid #e5e7eb;
          border-radius: 4px;
          margin-bottom: 12px;
          box-sizing: border-box;
        }
        .create-quiz-input:focus,
        .create-quiz-select:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
        }
        .create-quiz-button {
          width: 100%;
          padding: 8px;
          font-size: 14px;
          font-weight: 500;
          color: #ffffff;
          background-color: #3b82f6;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          margin-bottom: 8px;
        }
        .create-quiz-button:hover {
          background-color: #2563eb;
        }
        .create-quiz-button:disabled {
          background-color: #93c5fd;
          cursor: not-allowed;
        }
        .create-quiz-error {
          font-size: 12px;
          color: #ef4444;
          margin-bottom: 12px;
          text-align: center;
        }
        .create-quiz-skip {
          font-size: 14px;
          color: #3b82f6;
          text-align: center;
          cursor: pointer;
          margin-top: 8px;
        }
        .create-quiz-skip:hover {
          text-decoration: underline;
        }
        .create-quiz-question-count {
          font-size: 14px;
          color: #4b5563;
          margin-bottom: 12px;
          text-align: center;
        }
      `}</style>
            <h1 className="create-quiz-title">Создать квиз</h1>
            <div className="create-quiz-form">
                {step === 1 && (
                    <>
                        <label className="create-quiz-label">Название квиза</label>
                        <input
                            type="text"
                            className="create-quiz-input"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Введите название"
                        />
                        {error && <p className="create-quiz-error">{error}</p>}
                        <button
                            className="create-quiz-button"
                            onClick={handleTitleSubmit}
                            disabled={loading}
                        >
                            Далее
                        </button>
                    </>
                )}
                {step === 2 && (
                    <>
                        <label className="create-quiz-label">Загрузить фото (опционально)</label>
                        <input
                            type="file"
                            className="create-quiz-input"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                        {error && <p className="create-quiz-error">{error}</p>}
                        <button
                            className="create-quiz-button"
                            onClick={handleImageSubmit}
                            disabled={loading}
                        >
                            Далее
                        </button>
                        <p className="create-quiz-skip" onClick={handleImageSubmit}>
                            Пропустить
                        </p>
                    </>
                )}
                {step === 3 && (
                    <>
                        <p className="create-quiz-question-count">
                            Вопросов добавлено: {questions.length}
                        </p>
                        <label className="create-quiz-label">Вопрос</label>
                        <input
                            type="text"
                            className="create-quiz-input"
                            value={currentQuestion}
                            onChange={(e) => setCurrentQuestion(e.target.value)}
                            placeholder="Введите вопрос"
                        />
                        {options.map((option, index) => (
                            <div key={index}>
                                <label className="create-quiz-label">Вариант {index + 1}</label>
                                <input
                                    type="text"
                                    className="create-quiz-input"
                                    value={option}
                                    onChange={(e) => {
                                        const newOptions = [...options];
                                        newOptions[index] = e.target.value;
                                        setOptions(newOptions);
                                    }}
                                    placeholder={`Вариант ${index + 1}`}
                                />
                            </div>
                        ))}
                        <label className="create-quiz-label">Правильный ответ</label>
                        <select
                            className="create-quiz-select"
                            value={correctOption}
                            onChange={(e) => setCorrectOption(e.target.value)}
                        >
                            {options.map((_, index) => (
                                <option key={index} value={index}>
                                    Вариант {index + 1}
                                </option>
                            ))}
                        </select>
                        {error && <p className="create-quiz-error">{error}</p>}
                        <button
                            className="create-quiz-button"
                            onClick={handleQuestionSubmit}
                            disabled={loading}
                        >
                            Добавить вопрос
                        </button>
                        {questions.length > 0 && (
                            <button
                                className="create-quiz-button"
                                onClick={handleFinish}
                                disabled={loading}
                            >
                                Завершить и сохранить
                            </button>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default CreateQuiz;