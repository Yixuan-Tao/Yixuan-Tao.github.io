import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';

export function LanguageSwitcher() {
  const { i18n, t } = useTranslation();
  const isEnglish = i18n.resolvedLanguage === 'en';

  const toggleLanguage = () => {
    const newLanguage = isEnglish ? 'zh' : 'en';
    void i18n.changeLanguage(newLanguage);
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleLanguage}
      className="ml-auto"
      aria-label={t('languageSwitcher.toggle')}
    >
      {isEnglish ? t('languageSwitcher.zh') : t('languageSwitcher.en')}
    </Button>
  );
}
