import { useUser } from '../context/UserContext';
import ProfileForm from '../components/ProfileForm';

function Profile() {
    const { user } = useUser();

    return (
        <div className="profile-container">
            {user ? (
                <div className="profile-header">
                    <h1 className="profile-title">Профиль</h1>
                    <p className="profile-info">Никнейм: {user.nickname}</p>
                    <p className="profile-info">Очки: {user.points}</p>
                </div>
            ) : (
                <div className="profile-header">
                    <h1 className="profile-title">Создать профиль</h1>
                </div>
            )}
            <ProfileForm />
        </div>
    );
}

export default Profile;