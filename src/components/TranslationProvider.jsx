// @ts-ignore;
import React from 'react';

// @ts-ignore;
import { I18nProvider } from '@/lib/i18n';
export function TranslationProvider({
  children
}) {
  return <I18nProvider>
      {children}
    </I18nProvider>;
}
export default TranslationProvider;