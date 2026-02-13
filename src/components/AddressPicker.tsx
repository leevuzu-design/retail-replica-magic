import { useState, useEffect, useMemo } from 'react';
import { X, Search, ChevronRight, ArrowLeft } from 'lucide-react';

interface Province {
  code: number;
  name: string;
  districts: District[];
}

interface District {
  code: number;
  name: string;
  province_code: number;
  wards: Ward[];
}

interface Ward {
  code: number;
  name: string;
  district_code: number;
}

type Step = 'province' | 'district' | 'ward';

interface AddressPickerProps {
  open: boolean;
  onClose: () => void;
  onSelect: (province: string, district: string, ward: string) => void;
  initialProvince?: string;
  initialDistrict?: string;
}

const stepTitle: Record<Step, string> = {
  province: 'Chọn Tỉnh / Thành phố',
  district: 'Chọn Quận / Huyện',
  ward: 'Chọn Phường / Xã',
};

const AddressPicker = ({ open, onClose, onSelect, initialProvince, initialDistrict }: AddressPickerProps) => {
  const [step, setStep] = useState<Step>('province');
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');

  const [selectedProvince, setSelectedProvince] = useState<Province | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<District | null>(null);

  useEffect(() => {
    if (open) {
      setStep('province');
      setSearch('');
      setSelectedProvince(null);
      setSelectedDistrict(null);
      if (provinces.length === 0) {
        setLoading(true);
        fetch('https://provinces.open-api.vn/api/v1/?depth=3')
          .then(r => r.json())
          .then((data: Province[]) => {
            setProvinces(data);
            setLoading(false);
          })
          .catch(() => setLoading(false));
      }
    }
  }, [open]);

  const currentItems = useMemo(() => {
    let items: { code: number; name: string }[] = [];
    if (step === 'province') items = provinces;
    else if (step === 'district' && selectedProvince) items = selectedProvince.districts;
    else if (step === 'ward' && selectedDistrict) items = selectedDistrict.wards;

    if (search.trim()) {
      const q = search.toLowerCase();
      items = items.filter(i => i.name.toLowerCase().includes(q));
    }
    return items;
  }, [step, provinces, selectedProvince, selectedDistrict, search]);

  const handleSelect = (item: { code: number; name: string }) => {
    if (step === 'province') {
      const prov = provinces.find(p => p.code === item.code)!;
      setSelectedProvince(prov);
      setStep('district');
      setSearch('');
    } else if (step === 'district') {
      const dist = selectedProvince!.districts.find(d => d.code === item.code)!;
      setSelectedDistrict(dist);
      setStep('ward');
      setSearch('');
    } else if (step === 'ward') {
      onSelect(selectedProvince!.name, selectedDistrict!.name, item.name);
      onClose();
    }
  };

  const handleBack = () => {
    if (step === 'ward') {
      setStep('district');
      setSelectedDistrict(null);
    } else if (step === 'district') {
      setStep('province');
      setSelectedProvince(null);
    } else {
      onClose();
    }
    setSearch('');
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-background rounded-xl w-full max-w-md shadow-xl flex flex-col max-h-[80vh]" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border shrink-0">
          <button onClick={handleBack} className="text-muted-foreground hover:text-foreground p-1">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="font-semibold text-sm">{stepTitle[step]}</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="px-4 py-3 border-b border-border shrink-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder={`Tìm kiếm ${stepTitle[step].replace('Chọn ', '')}`}
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full h-10 pl-9 pr-3 rounded-lg border border-border bg-muted/30 text-sm focus:outline-none focus:border-primary transition-colors"
            />
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto min-h-0">
          {loading ? (
            <div className="flex items-center justify-center py-12 text-muted-foreground text-sm">
              Đang tải dữ liệu...
            </div>
          ) : currentItems.length === 0 ? (
            <div className="flex items-center justify-center py-12 text-muted-foreground text-sm">
              Không tìm thấy kết quả
            </div>
          ) : (
            <div>
              {currentItems.map(item => (
                <button
                  key={item.code}
                  onClick={() => handleSelect(item)}
                  className="w-full flex items-center justify-between px-4 py-3 text-sm hover:bg-muted/50 transition-colors text-left"
                >
                  <span>{item.name}</span>
                  <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddressPicker;
