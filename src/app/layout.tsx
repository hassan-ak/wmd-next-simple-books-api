import './globals.css';

export const metadata = {
  title: 'Simple Book API',
  description: 'Simple Book API created using NEXT.JS and Neon',
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
