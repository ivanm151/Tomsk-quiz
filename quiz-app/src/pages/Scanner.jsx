import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Html5QrcodeScanner } from 'html5-qrcode';

function Scanner() {
    const navigate = useNavigate();
    const scannerRef = useRef(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Инициализация сканера
        const scanner = new Html5QrcodeScanner(
            'qr-reader',
            {
                fps: 10,
                qrbox: { width: 250, height: 350 },
                aspectRatio: 1.0,
            },
            false
        );

        // Обработчик успешного сканирования
        const onScanSuccess = (decodedText) => {
            console.log('Scanner.jsx: Scanned QR code:', decodedText);
            try {
                const url = new URL(decodedText);
                // Проверяем, что URL соответствует квизу (например, содержит /quiz/)
                if (url.pathname.includes('/quiz/')) {
                    const path = url.pathname + url.search + url.hash;
                    console.log('Scanner.jsx: Navigating to:', path);
                    scanner.clear();
                    navigate(path);
                } else {
                    setError('QR-код не содержит ссылку на квиз.');
                }
            } catch (err) {
                console.error('Scanner.jsx: Invalid URL:', err);
                setError('Неверный QR-код. Пожалуйста, попробуйте другой.');
            }
        };

        // Обработчик ошибок
        const onScanFailure = (err) => {
            // Игнорируем частые ошибки (например, пока камера ищет QR-код)
            if (err !== 'NotFoundException' && err !== 'NotSupportedException') {
                console.warn('Scanner.jsx: Scan error:', err);
            }
        };

        // Запуск сканера
        scanner.render(onScanSuccess, onScanFailure);

        // Очистка при размонтировании
        return () => {
            scanner.clear().catch((err) => {
                console.error('Scanner.jsx: Error clearing scanner:', err);
            });
        };
    }, [navigate]);

    return (
        <div className="scanner-container">
            <style>{`
        .scanner-container {
          max-width: 320px;
          margin: 0 auto;
          padding: 16px 8px;
          display: flex;
          flex-direction: column;
          align-items: center;
          min-height: calc(100vh - 56px); /* Учитываем футер */
          background-color: #f3f4f6;
        }
        .scanner-title {
          font-size: 18px;
          font-weight: bold;
          color: #1f2937;
          margin-bottom: 12px;
          text-align: center;
        }
        #qr-reader {
          width: 280px;
          height: 280px;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          background-color: #ffffff;
        }
        .scanner-error {
          font-size: 14px;
          color: #ef4444;
          text-align: center;
          margin-top: 12px;
          max-width: 280px;
        }
      `}</style>
            <h1 className="scanner-title">Сканер QR-кода</h1>
            <div id="qr-reader" ref={scannerRef}></div>
            {error && <p className="scanner-error">{error}</p>}
        </div>
    );
}

export default Scanner;