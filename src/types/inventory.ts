export type Category = 'Elektronik' | 'Alat Makan' | 'Alat Tulis' | 'Non Elektronik Lainnya';

export type SubCategory = {
  'Elektronik': 'Laptop' | 'Mouse' | 'Keyboard';
  'Alat Makan': 'Sendok' | 'Garpu' | 'Gelas' | 'Piring';
  'Alat Tulis': 'Bolpoin' | 'Pensil' | 'Penghapus';
  'Non Elektronik Lainnya': string;
};

export type Unit = 'Pcs' | 'Set' | 'Box' | 'Buah' | 'Unit' | 'Lembar' | 'Pak';

export type Condition = 'Baik' | 'Rusak Ringan' | 'Rusak Berat';

export type Status = 'Ada' | 'Hilang';

export interface InventoryItem {
  id: string;
  nomorBarang: string;
  namaBarang: string;
  kategori: Category;
  subKategori: string;
  jumlah: number;
  satuan: Unit;
  kondisi: Condition;
  status: Status;
  createdAt: Date;
  updatedAt: Date;
}

export const CATEGORIES: Category[] = ['Elektronik', 'Alat Makan', 'Alat Tulis', 'Non Elektronik Lainnya'];

export const SUB_CATEGORIES: Record<Category, string[]> = {
  'Elektronik': ['Laptop', 'Mouse', 'Keyboard'],
  'Alat Makan': ['Sendok', 'Garpu', 'Gelas', 'Piring'],
  'Alat Tulis': ['Bolpoin', 'Pensil', 'Penghapus'],
  'Non Elektronik Lainnya': ['Lainnya'],
};

export const UNITS: Unit[] = ['Pcs', 'Set', 'Box', 'Buah', 'Unit', 'Lembar', 'Pak'];

export const CONDITIONS: Condition[] = ['Baik', 'Rusak Ringan', 'Rusak Berat'];

export const STATUSES: Status[] = ['Ada', 'Hilang'];
