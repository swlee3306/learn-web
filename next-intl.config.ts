import type {GetRequestConfigParams} from 'next-intl/server';
import {locales} from './src/i18n/routing';

export default async function getRequestConfig({requestLocale}: GetRequestConfigParams) {
  const locale = (await requestLocale) || 'ko';
  if (!locales.includes(locale as (typeof locales)[number])) {
    throw new Error(`Unsupported locale: ${locale}`);
  }

  return {
    locale,
    messages: (await import(`./src/messages/${locale}.json`)).default
  };
}
