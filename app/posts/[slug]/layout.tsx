import React from 'react';
import Alert from '../../../components/alert';
import Link from 'next/link';

export default async function Layout({ children }) {
  return (
    <>
      <Alert preview={false} />
      <main>
        <div className="container mx-auto px-5">
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight mb-20 mt-8">
            <Link href="/" className="hover:underline">
              Blog
            </Link>
            .
          </h2>
          {children}
        </div>
      </main>
    </>
  );
}
