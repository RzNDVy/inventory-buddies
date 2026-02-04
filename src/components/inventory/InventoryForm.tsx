import React, { useState, useEffect } from 'react';
import { InventoryItem, CATEGORIES, SUB_CATEGORIES, UNITS, CONDITIONS, STATUSES, Category } from '@/types/inventory';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X, Sparkles, HelpCircle } from 'lucide-react';
import { StarDecor, HeartDecor, FlowerDecor } from '@/components/icons/KawaiiIcons';

interface InventoryFormProps {
  item?: InventoryItem | null;
  nextItemNumber: string;
  onSubmit: (data: Omit<InventoryItem, 'id' | 'nomorBarang' | 'createdAt' | 'updatedAt'>) => void;
  onClose: () => void;
}

const InventoryForm: React.FC<InventoryFormProps> = ({ item, nextItemNumber, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    namaBarang: '',
    kategori: '' as Category | '',
    subKategori: '',
    jumlah: 1,
    satuan: 'Pcs' as typeof UNITS[number],
    kondisi: 'Baik' as typeof CONDITIONS[number],
    status: 'Ada' as typeof STATUSES[number],
  });

  useEffect(() => {
    if (item) {
      setFormData({
        namaBarang: item.namaBarang,
        kategori: item.kategori,
        subKategori: item.subKategori,
        jumlah: item.jumlah,
        satuan: item.satuan,
        kondisi: item.kondisi,
        status: item.status,
      });
    }
  }, [item]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.kategori) return;
    onSubmit(formData as Omit<InventoryItem, 'id' | 'nomorBarang' | 'createdAt' | 'updatedAt'>);
  };

  const availableSubCategories = formData.kategori ? SUB_CATEGORIES[formData.kategori] : [];

  return (
    <div className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-3xl shadow-float max-w-lg w-full max-h-[90vh] overflow-y-auto relative">
        {/* Decorative elements */}
        <div className="absolute -top-4 -left-4 animate-float-slow">
          <StarDecor size={32} />
        </div>
        <div className="absolute -top-2 -right-6 animate-float">
          <HeartDecor size={28} />
        </div>
        <div className="absolute -bottom-3 left-10 animate-wiggle">
          <FlowerDecor size={36} />
        </div>

        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-kawaii-skyblue p-6 rounded-t-3xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-card/90 rounded-2xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-primary-foreground">
                  {item ? 'Edit Barang' : 'Tambah Barang Baru'}
                </h2>
                <p className="text-primary-foreground/80 text-sm">Isi data barang dengan lengkap</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="w-10 h-10 bg-card/20 hover:bg-card/40 rounded-xl flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5 text-primary-foreground" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Nomor Barang - Read only */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold">Nomor Barang (Otomatis)</Label>
            <Input 
              value={item?.nomorBarang || nextItemNumber} 
              disabled 
              className="bg-muted/50 rounded-xl border-2 border-dashed border-primary/30 font-mono text-center"
            />
          </div>

          {/* Nama Barang */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold">Nama Barang</Label>
            <Input 
              value={formData.namaBarang}
              onChange={(e) => setFormData(prev => ({ ...prev, namaBarang: e.target.value }))}
              placeholder="Contoh: Laptop ASUS VivoBook"
              className="rounded-xl border-2 focus:border-primary"
              required
            />
          </div>

          {/* Kategori */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold">Kategori</Label>
            <Select 
              value={formData.kategori} 
              onValueChange={(value: Category) => setFormData(prev => ({ ...prev, kategori: value, subKategori: '' }))}
            >
              <SelectTrigger className="rounded-xl border-2 focus:border-primary bg-card">
                <SelectValue placeholder="Pilih kategori" />
              </SelectTrigger>
              <SelectContent className="rounded-xl bg-card border-2 border-border z-[100]">
                {CATEGORIES.map(cat => (
                  <SelectItem key={cat} value={cat} className="rounded-lg">{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {/* Helper text */}
            <div className="flex items-start gap-2 bg-kawaii-cream/50 rounded-xl p-3 text-xs">
              <HelpCircle size={14} className="text-accent mt-0.5 flex-shrink-0" />
              <span className="text-muted-foreground">
                <strong>Tips:</strong> Barang konsumsi sebaiknya ke 'Alat Tulis/Makan', aset tetap ke 'Elektronik/Non Elektronik'.
              </span>
            </div>
          </div>

          {/* Sub Kategori - Cascading */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold">Sub Kategori</Label>
            <Select 
              value={formData.subKategori} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, subKategori: value }))}
              disabled={!formData.kategori}
            >
              <SelectTrigger className="rounded-xl border-2 focus:border-primary bg-card disabled:opacity-50">
                <SelectValue placeholder={formData.kategori ? "Pilih sub kategori" : "Pilih kategori dulu"} />
              </SelectTrigger>
              <SelectContent className="rounded-xl bg-card border-2 border-border z-[100]">
                {availableSubCategories.map(subCat => (
                  <SelectItem key={subCat} value={subCat} className="rounded-lg">{subCat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Jumlah & Satuan */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-semibold">Jumlah</Label>
              <Input 
                type="number"
                min={1}
                value={formData.jumlah}
                onChange={(e) => setFormData(prev => ({ ...prev, jumlah: parseInt(e.target.value) || 1 }))}
                className="rounded-xl border-2 focus:border-primary"
                required
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-semibold">Satuan</Label>
              <Select 
                value={formData.satuan} 
                onValueChange={(value: typeof UNITS[number]) => setFormData(prev => ({ ...prev, satuan: value }))}
              >
                <SelectTrigger className="rounded-xl border-2 focus:border-primary bg-card">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-xl bg-card border-2 border-border z-[100]">
                  {UNITS.map(unit => (
                    <SelectItem key={unit} value={unit} className="rounded-lg">{unit}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Kondisi & Status */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-semibold">Kondisi</Label>
              <Select 
                value={formData.kondisi} 
                onValueChange={(value: typeof CONDITIONS[number]) => setFormData(prev => ({ ...prev, kondisi: value }))}
              >
                <SelectTrigger className="rounded-xl border-2 focus:border-primary bg-card">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-xl bg-card border-2 border-border z-[100]">
                  {CONDITIONS.map(cond => (
                    <SelectItem key={cond} value={cond} className="rounded-lg">{cond}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-semibold">Status</Label>
              <Select 
                value={formData.status} 
                onValueChange={(value: typeof STATUSES[number]) => setFormData(prev => ({ ...prev, status: value }))}
              >
                <SelectTrigger className="rounded-xl border-2 focus:border-primary bg-card">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-xl bg-card border-2 border-border z-[100]">
                  {STATUSES.map(status => (
                    <SelectItem key={status} value={status} className="rounded-lg">{status}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Submit button */}
          <button 
            type="submit"
            className="w-full btn-kawaii bg-gradient-to-r from-primary to-kawaii-skyblue text-primary-foreground py-4 rounded-2xl font-bold text-lg mt-6 flex items-center justify-center gap-2"
          >
            <Sparkles size={20} />
            {item ? 'Simpan Perubahan' : 'Tambah Barang'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default InventoryForm;
