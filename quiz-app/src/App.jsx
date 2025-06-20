import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Quiz from './pages/Quiz';
import Scanner from './pages/Scanner';
import Rating from './pages/Rating';
import Prizes from './pages/Prizes';
import CreateQuiz from './pages/CreateQuiz';

function App() {
    console.log('App.jsx: Rendering routes');
    return (
        <UserProvider>
            <BrowserRouter>
                <div className="app-container">
                    <main className="main-content">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/quiz/:id" element={<Quiz />} />
                            <Route path="/scanner" element={<Scanner />} />
                            <Route path="/rating" element={<Rating />} />
                            <Route path="/prizes" element={<Prizes />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/create-quiz" element={<CreateQuiz />} />
                        </Routes>
                    </main>
                    <Navbar />
                </div>
            </BrowserRouter>
        </UserProvider>
    );
}


export default App;