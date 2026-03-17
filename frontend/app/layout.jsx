import Navbar from './components/navbar';
import "./globals.css";



export const metadata = {
  title: "The Rotten Chats",
  description: "21+ private dating app with safety bot",
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body
        className="antialiased"
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
