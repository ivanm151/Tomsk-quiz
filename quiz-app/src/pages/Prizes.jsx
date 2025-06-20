import { useState } from 'react';

function Prizes() {
    // Хардкодированные призы
    const prizes = [
        {
            title: 'Скидка в музей 10%',
            description: 'Получите скидку 10% на посещение любого музея в Томске.',
            points_cost: 100,
        },
        {
            title: 'Набор стикеров ВКонтакте на выбор',
            description: 'Выберите любой набор стикеров для ВКонтакте из доступных.',
            points_cost: 200,
        },
    ];

    const [loading] = useState(false); // Заглушка для состояния загрузки

    return (
        <div className="prizes-container">
            <style>{`
        .prizes-container {
          max-width: 320px;
          margin: 0 auto;
          padding: 16px 8px;
          min-height: calc(100vh - 56px); /* Учитываем футер */
          background-color: #f3f4f6;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .prizes-title {
          font-size: 18px;
          font-weight: bold;
          color: #1f2937;
          margin-bottom: 12px;
          text-align: center;
        }
        .prize-card {
          width: 280px;
          background-color: #ffffff;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          padding: 12px;
          margin-bottom: 12px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .prize-info {
          flex: 1;
        }
        .prize-title {
          font-size: 16px;
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 4px;
        }
        .prize-description {
          font-size: 14px;
          color: #4b5563;
          line-height: 1.4;
        }
        .prize-cost {
          font-size: 14px;
          font-weight: 500;
          color: #3b82f6;
          text-align: right;
        }
        .prizes-loading,
        .prizes-empty {
          font-size: 14px;
          color: #4b5563;
          text-align: center;
          margin-top: 16px;
        }
      `}</style>
            <h1 className="prizes-title">Призы</h1>
            {loading ? (
                <p className="prizes-loading">Загрузка...</p>
            ) : prizes.length === 0 ? (
                <p className="prizes-empty">Призы отсутствуют.</p>
            ) : (
                <div className="prizes-list">
                    {prizes.map((prize, index) => (
                        <div key={index} className="prize-card">
                            <div className="prize-info">
                                <h2 className="prize-title">{prize.title}</h2>
                                <p className="prize-description">{prize.description}</p>
                            </div>
                            <span className="prize-cost">{prize.points_cost} очков</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Prizes;