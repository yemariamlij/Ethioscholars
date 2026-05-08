import Script from 'next/script';
import './globals.css';

export const metadata = {
  title: 'Ethio Scholars Online Academy',
  description: 'Master Ethiopian Grades 7-12 online with live classes, recorded lessons, and AI-powered exam preparation.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
        <link
          rel="stylesheet"
          href="https://unpkg.com/aos@2.3.1/dist/aos.css"
        />
      </head>
      <body>
        {children}
        <Script id="tailwind-config" strategy="beforeInteractive">
          {`tailwind.config = { theme: { extend: { colors: { 'ethio-green': '#1E824C', 'ethio-yellow': '#FAD201', 'ethio-red': '#EF2B2B', 'ethio-dark': '#0C3B2E', 'ethio-gold': '#D4AF37' }, animation: { 'fade-in': 'fadeIn 0.5s ease-in', 'slide-up': 'slideUp 0.3s ease-out', 'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite', 'float': 'float 3s ease-in-out infinite', 'glow': 'glow 2s ease-in-out infinite', 'spin-slow': 'spin 8s linear infinite' } } } };`}
        </Script>
        <Script src="https://cdn.tailwindcss.com" strategy="beforeInteractive" />
      </body>
    </html>
  );
}
