// next-intl runtime config (must exist in the runtime image)
export default async function getRequestConfig({requestLocale}) {
  const locale = (await requestLocale) || 'ko';
  const locales = ['ko', 'en'];

  if (!locales.includes(locale)) {
    throw new Error(`Unsupported locale: ${locale}`);
  }

  return {
    locale,
    messages: (await import(`./src/messages/${locale}.json`, {assert: {type: 'json'}})).default
  };
}
