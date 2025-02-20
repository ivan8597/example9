import { FC, useState } from 'react';
import styles from './Translator.module.scss';

interface TranslatorProps {
  text: string;
}

export const Translator: FC<TranslatorProps> = ({ text }) => {
  const [translated, setTranslated] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleTranslate = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://api.translate.com/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          source: 'ru',
          target: 'zh'
        })
      });
      const data = await response.json();
      setTranslated(data.translated_text);
    } catch (error) {
      console.error('Translation error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.translator}>
      <button 
        onClick={handleTranslate}
        disabled={isLoading}
        className={styles.translateBtn}
      >
        {isLoading ? '翻译中...' : '翻译'}
      </button>
      {translated && (
        <div className={styles.translatedText}>
          {translated}
        </div>
      )}
    </div>
  );
}; 