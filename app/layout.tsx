import '../styles/index.css';
import Meta from '../components/meta';
import Footer from '../components/footer';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Meta />
        <div className="min-h-screen">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
