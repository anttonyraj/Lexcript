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
    <html lang="en" className="dark">
      <body className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-amber-500/20 selection:text-amber-200">
        {children}
      </body>
    </html>
  );
}
