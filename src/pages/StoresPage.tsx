import PageLayout from '@/components/PageLayout';
import { MapPin, Phone, Clock, Navigation } from 'lucide-react';

const storeList = [
  { id: 1, name: 'Lixibox Quận 1', address: '123 Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP.HCM', phone: '028 1234 5678', hours: '9:00 - 21:00', status: 'open' },
  { id: 2, name: 'Lixibox Quận 3', address: '456 Võ Văn Tần, Phường 5, Quận 3, TP.HCM', phone: '028 2345 6789', hours: '9:00 - 21:00', status: 'open' },
  { id: 3, name: 'Lixibox Quận 7', address: '789 Nguyễn Thị Thập, Phường Tân Phú, Quận 7, TP.HCM', phone: '028 3456 7890', hours: '9:00 - 21:00', status: 'open' },
  { id: 4, name: 'Lixibox Hà Nội - Hoàn Kiếm', address: '12 Tràng Tiền, Quận Hoàn Kiếm, Hà Nội', phone: '024 1234 5678', hours: '9:00 - 21:00', status: 'open' },
  { id: 5, name: 'Lixibox Hà Nội - Cầu Giấy', address: '88 Trần Duy Hưng, Quận Cầu Giấy, Hà Nội', phone: '024 2345 6789', hours: '9:00 - 21:00', status: 'closed' },
  { id: 6, name: 'Lixibox Đà Nẵng', address: '55 Nguyễn Văn Linh, Quận Hải Châu, Đà Nẵng', phone: '0236 123 4567', hours: '9:00 - 21:00', status: 'open' },
];

const StoresPage = () => (
  <PageLayout>
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <MapPin className="w-7 h-7 text-primary" />
        <h1 className="text-2xl md:text-3xl font-bold">Hệ Thống Cửa Hàng</h1>
      </div>

      {/* Map placeholder */}
      <div className="bg-secondary rounded-xl h-64 mb-8 flex items-center justify-center">
        <div className="text-center text-muted-foreground">
          <Navigation className="w-10 h-10 mx-auto mb-2" />
          <p className="text-sm">Bản đồ hệ thống cửa hàng</p>
        </div>
      </div>

      {/* Store List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {storeList.map((store) => (
          <div key={store.id} className="bg-card border border-border rounded-lg p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-semibold">{store.name}</h3>
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                store.status === 'open' ? 'bg-green-100 text-green-700' : 'bg-secondary text-muted-foreground'
              }`}>
                {store.status === 'open' ? 'Đang mở' : 'Đã đóng'}
              </span>
            </div>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p className="flex items-start gap-2"><MapPin className="w-4 h-4 shrink-0 mt-0.5" />{store.address}</p>
              <p className="flex items-center gap-2"><Phone className="w-4 h-4" />{store.phone}</p>
              <p className="flex items-center gap-2"><Clock className="w-4 h-4" />{store.hours}</p>
            </div>
            <button className="mt-4 w-full bg-primary text-primary-foreground text-sm font-medium py-2.5 rounded-md hover:opacity-90 transition-opacity">
              Chỉ đường
            </button>
          </div>
        ))}
      </div>
    </div>
  </PageLayout>
);

export default StoresPage;
