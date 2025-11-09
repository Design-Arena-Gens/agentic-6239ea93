import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="py-16">
      <section className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-semibold leading-tight tracking-tight">
          Create stunning AI-style artwork
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-pink-400">in your browser</span>
        </h1>
        <p className="mt-6 text-white/70">
          Transform your photos into artistic styles like neon, watercolor, sketch and more. No signup required.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link href="/generate" className="px-6 py-3 rounded-md bg-brand-500 hover:bg-brand-600 transition-colors">Try free</Link>
          <Link href="/pricing" className="px-6 py-3 rounded-md bg-white/10 hover:bg-white/20 transition-colors">See pricing</Link>
        </div>
      </section>

      <section className="mt-16 grid md:grid-cols-3 gap-6">
        {[
          { title: 'Neon Glow', gradient: 'from-fuchsia-500 to-brand-500' },
          { title: 'Watercolor', gradient: 'from-sky-400 to-emerald-400' },
          { title: 'Sketch', gradient: 'from-zinc-500 to-zinc-700' },
        ].map((c, i) => (
          <div key={i} className="rounded-xl border border-white/10 p-6 bg-white/5">
            <div className={`h-40 rounded-lg bg-gradient-to-br ${c.gradient} mb-4`} />
            <h3 className="font-medium">{c.title}</h3>
            <p className="text-sm text-white/60 mt-2">Fast, beautiful, and fun styles.</p>
          </div>
        ))}
      </section>

      <section className="mt-20 text-center">
        <p className="text-white/80">Ready to turn your ideas into art?</p>
        <Link href="/generate" className="inline-flex mt-4 px-6 py-3 rounded-md bg-brand-500 hover:bg-brand-600">Launch Generator</Link>
      </section>
    </div>
  );
}
