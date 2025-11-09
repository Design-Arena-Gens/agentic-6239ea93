export const metadata = {
  title: 'Artistly Clone',
  description: 'Generate art styles in your browser',
};

import './globals.css';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-1 container mx-auto px-4 md:px-8">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
