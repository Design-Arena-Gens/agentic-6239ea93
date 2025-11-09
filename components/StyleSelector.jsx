"use client";

export default function StyleSelector({ value, onChange, intensity, onIntensity }) {
  const styles = [
    { id: 'neon', label: 'Neon Glow' },
    { id: 'watercolor', label: 'Watercolor' },
    { id: 'sketch', label: 'Sketch' },
    { id: 'glitch', label: 'Glitch' },
    { id: 'pop', label: 'Pop Art' },
  ];
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
        {styles.map((s) => (
          <button
            key={s.id}
            onClick={() => onChange(s.id)}
            className={`px-3 py-2 text-sm rounded-md border transition-colors ${value===s.id? 'border-brand-500 bg-brand-500/20' : 'border-white/10 hover:bg-white/10'}`}
          >
            {s.label}
          </button>
        ))}
      </div>
      <div>
        <label className="text-sm text-white/70">Intensity: {intensity}</label>
        <input type="range" min={1} max={10} value={intensity} onChange={(e)=>onIntensity(Number(e.target.value))} className="w-full" />
      </div>
    </div>
  );
}
