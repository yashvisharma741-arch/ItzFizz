import './globals.css';

export const metadata = {
  title: 'ITZFIZZ — Premium Scroll Animation',
  description: 'A scroll-driven automotive hero animation built with Next.js, GSAP ScrollTrigger, and Tailwind CSS.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
