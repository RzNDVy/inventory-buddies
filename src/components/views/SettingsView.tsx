import React from 'react';
import { Settings, User, Bell, Palette, Info, Shield, HelpCircle, Heart } from 'lucide-react';
import { FlowerDecor, StarDecor, HeartDecor, CloudDecor } from '@/components/icons/KawaiiIcons';
import { Switch } from '@/components/ui/switch';

const SettingsView: React.FC = () => {
  const settingsSections = [
    {
      title: 'Profil',
      icon: User,
      items: [
        { label: 'Nama Pengguna', value: 'Admin Inventaris', type: 'text' },
        { label: 'Email', value: 'admin@inventaris.com', type: 'text' },
      ]
    },
    {
      title: 'Notifikasi',
      icon: Bell,
      items: [
        { label: 'Notifikasi Barang Hilang', type: 'toggle', enabled: true },
        { label: 'Notifikasi Stok Rendah', type: 'toggle', enabled: false },
        { label: 'Pengingat Pengecekan', type: 'toggle', enabled: true },
      ]
    },
    {
      title: 'Tampilan',
      icon: Palette,
      items: [
        { label: 'Mode Gelap', type: 'toggle', enabled: false },
        { label: 'Animasi', type: 'toggle', enabled: true },
      ]
    },
  ];

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-muted rounded-2xl flex items-center justify-center">
          <Settings className="w-5 h-5 text-foreground" />
        </div>
        <h2 className="text-xl font-bold text-foreground">Pengaturan</h2>
        <div className="ml-auto">
          <CloudDecor size={24} className="animate-float" />
        </div>
      </div>

      {/* Profile Card */}
      <div className="card-kawaii p-6 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 relative overflow-hidden">
        <div className="absolute top-3 right-3 opacity-40">
          <StarDecor size={20} />
        </div>
        <div className="absolute bottom-3 right-8 opacity-30">
          <FlowerDecor size={24} />
        </div>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-primary/30 rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-foreground">Admin Inventaris</h3>
            <p className="text-sm text-muted-foreground">admin@inventaris.com</p>
            <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 bg-success/20 text-success-foreground text-xs font-medium rounded-full">
              <span className="w-1.5 h-1.5 bg-success-foreground rounded-full"></span>
              Aktif
            </span>
          </div>
        </div>
      </div>

      {/* Settings Sections */}
      <div className="space-y-4">
        {settingsSections.map((section, idx) => {
          const Icon = section.icon;
          return (
            <div key={idx} className="card-kawaii p-5">
              <div className="flex items-center gap-2 mb-4">
                <Icon className="w-5 h-5 text-primary" />
                <h3 className="font-bold text-foreground">{section.title}</h3>
              </div>
              <div className="space-y-4">
                {section.items.map((item, itemIdx) => (
                  <div key={itemIdx} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                    <span className="text-sm text-foreground">{item.label}</span>
                    {item.type === 'text' ? (
                      <span className="text-sm text-muted-foreground">{item.value}</span>
                    ) : (
                      <Switch defaultChecked={item.enabled} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* About Section */}
      <div className="card-kawaii p-5">
        <div className="flex items-center gap-2 mb-4">
          <Info className="w-5 h-5 text-accent" />
          <h3 className="font-bold text-foreground">Tentang Aplikasi</h3>
        </div>
        <div className="space-y-3 text-sm text-muted-foreground">
          <div className="flex items-center justify-between">
            <span>Versi</span>
            <span className="font-medium text-foreground">1.0.0</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Developer</span>
            <span className="font-medium text-foreground flex items-center gap-1">
              Made with <HeartDecor size={14} /> Love
            </span>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-2 gap-4">
        <button className="card-kawaii p-4 flex items-center gap-3 hover:scale-105 transition-transform text-left">
          <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center">
            <HelpCircle className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="font-semibold text-foreground text-sm">Bantuan</p>
            <p className="text-xs text-muted-foreground">Panduan & FAQ</p>
          </div>
        </button>
        <button className="card-kawaii p-4 flex items-center gap-3 hover:scale-105 transition-transform text-left">
          <div className="w-10 h-10 bg-secondary/40 rounded-xl flex items-center justify-center">
            <Shield className="w-5 h-5 text-secondary-foreground" />
          </div>
          <div>
            <p className="font-semibold text-foreground text-sm">Privasi</p>
            <p className="text-xs text-muted-foreground">Kebijakan & Syarat</p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default SettingsView;
