import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { HomeIcon, QrCodeIcon, TrophyIcon, GiftIcon, UserIcon, PlusCircleIcon } from '@heroicons/react/24/solid';

function App() {
    return (
        <BrowserRouter>
            <div className="flex flex-col h-screen">
                {/* Main content */}
                <div className="flex-1 overflow-y-auto">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/quiz/:id" element={<Quiz />} />
                        <Route path="/scanner" element={<Scanner />} />
                        <Route path="/rating" element={<Rating />} />
                        <Route path="/prizes" element={<Prizes />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/create-quiz" element={<CreateQuiz />} />
                    </Routes>
                </div>

                {/* Bottom Navigation */}
                <nav className="fixed bottom-0 w-full bg-white shadow-t">
                    <div className="flex justify-around py-2">
                        <Link to="/" className="flex flex-col items-center">
                            <HomeIcon className="h-6 w-6 text-gray-600" />
                            <span className="text-xs">Квизы</span>
                        </Link>
                        <Link to="/scanner" className="flex flex-col items-center">
                            <QrCodeIcon className="h-6 w-6 text-gray-600" />
                            <span className="text-xs">Сканер</span>
                        </Link>
                        <Link to="/rating" className="flex flex-col items-center">
                            <TrophyIcon className="h-6 w-6 text-gray-600" />
                            <span className="text-xs">Рейтинг</span>
                        </Link>
                        <Link to="/prizes" className="flex flex-col items-center">
                            <GiftIcon className="h-6 w-6 text-gray-600" />
                            <span className="text-xs">Призы</span>
                        </Link>
                        <Link to="/profile" className="flex flex-col items-center">
                            <UserIcon className="h-6 w-6 text-gray-600" />
                            <span className="text-xs">Профиль</span>
                        </Link>
                        <Link to="/create-quiz" className="flex flex-col items-center">
                            <PlusCircleIcon className="h-6 w-6 text-gray-600" />
                            <span className="text-xs">Создать</span>
                        </Link>
                    </div>
                </nav>
            </div>
        </BrowserRouter>
    );
}

// Placeholder components
function Home() {
    return <div className="p-4"><h1 className="text-2xl">Список квизов</h1></div>;
}
function Quiz() {
    return <div className="p-4"><h1 className="text-2xl">Квиз</h1></div>;
}
function Scanner() {
    return <div className="p-4"><h1 className="text-2xl">Сканер QR</h1></div>;
}
function Rating() {
    return <div className="p-4"><h1 className="text-2xl">Рейтинг</h1></div>;
}
function Prizes() {
    return <div className="p-4"><h1 className="text-2xl">Призы</h1></div>;
}
function Profile() {
    return <div className="p-4"><h1 className="text-2xl">Профиль</h1></div>;
}
function CreateQuiz() {
    return <div className="p-4"><h1 className="text-2xl">Создать квиз</h1></div>;
}

export default App;