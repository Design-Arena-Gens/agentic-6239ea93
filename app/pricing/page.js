import Link from 'next/link';

const plans = [
  { name: 'Free', price: '$0', features: ['Unlimited local generations', '5 styles', 'Download PNG'] },
  { name: 'Pro', price: '$9/mo', features: ['HD export', 'Custom presets', 'Priority updates'] },
  { name: 'Studio', price: '$29/mo', features: ['Brand kits', 'Batch processing', 'Premium support'] },
];

export default function PricingPage() {
  return (
    <div className="py-10">
      <h1 className="text-3xl font-semibold text-center">Pricing</h1>
      <p className="text-white/70 text-center mt-2">Start free. Upgrade when ready.</p>
      <div className="mt-10 grid md:grid-cols-3 gap-6">
        {plans.map((p, i) => (
          <div key={p.name} className={`rounded-xl border border-white/10 p-6 bg-white/5 ${i===1? 'ring-2 ring-brand-500' : ''}`}>
            <h3 className="text-xl font-semibold">{p.name}</h3>
            <div className="text-3xl mt-2">{p.price}</div>
            <ul className="mt-4 space-y-2 text-white/80">
              {p.features.map((f) => (
                <li key={f} className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-brand-500" />{f}</li>
              ))}
            </ul>
            <Link href="/generate" className="mt-6 inline-flex px-4 py-2 rounded-md bg-brand-500 hover:bg-brand-600">Get Started</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
