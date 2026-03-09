import {redirect} from 'next/navigation';
import {defaultLocale} from '@/i18n/routing';

// Some deployments (e.g. Next standalone behind ingress) can fail to run middleware.
// Make the root route robust by redirecting to the default locale.
export default function RootPage() {
  redirect(`/${defaultLocale}`);
}
