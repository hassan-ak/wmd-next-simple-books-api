import './globals.css';

export const metadata = {
  title: 'Simple Books API',
  description: 'Simple Books API using Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  );
}
