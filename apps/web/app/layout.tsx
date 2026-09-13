import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Lexcript — Privilege-Safe Conversation Intelligence for US Law Firms',
  description:
    'Every conversation on the record, every minute on the invoice, nothing leaked. Privilege-safe legal transcripts and billable time capture.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const stored = localStorage.getItem('lexcript_theme');
                if (stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-[#fbfaf6] dark:bg-[#080d1a] text-slate-900 dark:text-slate-100 antialiased selection:bg-amber-500/20 selection:text-amber-800 dark:selection:text-amber-200 transition-colors duration-200">
        {children}
      </body>
    </html>
  );
}
