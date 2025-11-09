export default function Footer() {
  return (
    <footer className="border-t border-white/10 mt-16">
      <div className="container mx-auto px-4 md:px-8 py-10 text-sm text-white/60">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p>? {new Date().getFullYear()} Artistly Clone. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="https://vercel.com" target="_blank" rel="noreferrer" className="hover:text-white">Powered by Vercel</a>
            <a href="/pricing" className="hover:text-white">Pricing</a>
            <a href="/generate" className="hover:text-white">Generate</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
