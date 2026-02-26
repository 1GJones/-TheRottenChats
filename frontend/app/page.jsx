
export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white">
        <h1 className="text-4xl font-bold">The Rotten Chats</h1>
        <p className="text-lg text-zinc-600 mb-8">21+ Private Dating App</p>
        <div className="flex gap-4">
          <a href="/support" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
            Support Bot
          </a>
        </div>
      </main>
    </div>
  );
}
