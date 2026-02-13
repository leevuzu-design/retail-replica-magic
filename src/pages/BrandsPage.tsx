import PageLayout from '@/components/PageLayout';
import { Search } from 'lucide-react';
import { useState } from 'react';

const brandList = [
  { name: 'Vutru', products: 450, letter: 'V' },
  { name: 'Lustre', products: 120, letter: 'L' },
  { name: 'Beauté', products: 85, letter: 'B' },
  { name: 'SunShield', products: 65, letter: 'S' },
  { name: 'Élégance', products: 40, letter: 'E' },
  { name: 'Glow Lab', products: 95, letter: 'G' },
  { name: 'LashPro', products: 55, letter: 'L' },
  { name: 'Halio', products: 210, letter: 'H' },
  { name: 'Cocoon', products: 180, letter: 'C' },
  { name: "L'Oreal", products: 320, letter: 'L' },
  { name: 'Innisfree', products: 275, letter: 'I' },
  { name: 'The Ordinary', products: 150, letter: 'T' },
  { name: 'Klairs', products: 88, letter: 'K' },
  { name: 'Anessa', products: 45, letter: 'A' },
  { name: 'Bioderma', products: 110, letter: 'B' },
  { name: 'Cetaphil', products: 70, letter: 'C' },
];

const BrandsPage = () => {
  const [search, setSearch] = useState('');
  const filtered = brandList.filter(b => b.name.toLowerCase().includes(search.toLowerCase()));
  const letters = [...new Set(filtered.map(b => b.letter))].sort();

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Thương Hiệu</h1>

        {/* Search */}
        <div className="relative max-w-md mb-8">
          <input
            type="text"
            placeholder="Tìm thương hiệu..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-11 pl-4 pr-10 rounded-lg border border-border bg-card text-sm focus:outline-none focus:border-primary transition-colors"
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        </div>

        {/* Letters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(l => (
            <button
              key={l}
              className={`w-9 h-9 rounded-lg text-sm font-semibold transition-colors ${
                letters.includes(l)
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-muted-foreground'
              }`}
            >
              {l}
            </button>
          ))}
        </div>

        {/* Brand Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filtered.map((brand) => (
            <a
              key={brand.name}
              href="#"
              className="bg-card border border-border rounded-lg p-4 hover:border-primary hover:shadow-md transition-all group"
            >
              <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center mb-3 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <span className="text-lg font-bold">{brand.letter}</span>
              </div>
              <h3 className="font-semibold text-sm group-hover:text-primary transition-colors">{brand.name}</h3>
              <p className="text-xs text-muted-foreground mt-1">{brand.products} sản phẩm</p>
            </a>
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default BrandsPage;
