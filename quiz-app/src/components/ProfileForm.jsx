import { useState } from 'react';
import { useUser } from '../context/UserContext';

function ProfileForm() {
    const { initializeUser, user } = useUser();
    const [nickname, setNickname] = useState(user?.nickname || '');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!nickname.trim()) {
            setError('Никнейм не может быть пустым');
            return;
        }
        setLoading(true);
        try {
            await initializeUser(nickname.trim());
            setError(null);
        } catch (err) {
            setError('Ошибка при создании профиля. Попробуйте другой никнейм.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="profile-form">
            <h2 className="profile-title">{user ? 'Ваш профиль' : 'Создать профиль'}</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="nickname" className="form-label">
                    Никнейм
                </label>
                <input
                    id="nickname"
                    type="text"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    className="form-input"
                    placeholder="Введите ваш никнейм"
                    disabled={loading}
                />
                {error && <p className="form-error">{error}</p>}
                <button type="submit" className="form-button" disabled={loading}>
                    {loading ? 'Сохранение...' : user ? 'Обновить' : 'Создать'}
                </button>
            </form>
        </div>
    );
}

export default ProfileForm;