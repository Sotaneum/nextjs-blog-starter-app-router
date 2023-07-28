'use client'; // Error components must be Client Components

import ErrorPage from 'next/error';

export default function Error() {
  return <ErrorPage statusCode={404} />;
}
