import { useState, useCallback } from 'react';
import { InventoryItem, Category } from '@/types/inventory';

// Generate unique ID: EM/MM/YYYY/XXX
const generateItemId = (existingItems: InventoryItem[]): string => {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const year = now.getFullYear();
  const prefix = `EM/${month}/${year}/`;
  
  // Find existing items with same prefix
  const sameMonthItems = existingItems.filter(item => 
    item.nomorBarang.startsWith(prefix)
  );
  
  // Get next sequence number
  const nextSeq = sameMonthItems.length + 1;
  const seqStr = String(nextSeq).padStart(3, '0');
  
  return `${prefix}${seqStr}`;
};

// Initial sample data
const initialItems: InventoryItem[] = [
  {
    id: '1',
    nomorBarang: 'EM/02/2026/001',
    namaBarang: 'Laptop ASUS VivoBook',
    kategori: 'Elektronik',
    subKategori: 'Laptop',
    jumlah: 5,
    satuan: 'Unit',
    kondisi: 'Baik',
    status: 'Ada',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    nomorBarang: 'EM/02/2026/002',
    namaBarang: 'Mouse Logitech M331',
    kategori: 'Elektronik',
    subKategori: 'Mouse',
    jumlah: 20,
    satuan: 'Pcs',
    kondisi: 'Baik',
    status: 'Ada',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    nomorBarang: 'EM/02/2026/003',
    namaBarang: 'Piring Keramik Putih',
    kategori: 'Alat Makan',
    subKategori: 'Piring',
    jumlah: 50,
    satuan: 'Pcs',
    kondisi: 'Baik',
    status: 'Ada',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '4',
    nomorBarang: 'EM/02/2026/004',
    namaBarang: 'Bolpoin Pilot',
    kategori: 'Alat Tulis',
    subKategori: 'Bolpoin',
    jumlah: 100,
    satuan: 'Pcs',
    kondisi: 'Baik',
    status: 'Ada',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '5',
    nomorBarang: 'EM/02/2026/005',
    namaBarang: 'Sendok Stainless Steel',
    kategori: 'Alat Makan',
    subKategori: 'Sendok',
    jumlah: 30,
    satuan: 'Pcs',
    kondisi: 'Rusak Ringan',
    status: 'Ada',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '6',
    nomorBarang: 'EM/01/2026/001',
    namaBarang: 'Keyboard Mechanical',
    kategori: 'Elektronik',
    subKategori: 'Keyboard',
    jumlah: 2,
    satuan: 'Pcs',
    kondisi: 'Rusak Berat',
    status: 'Hilang',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const useInventory = () => {
  const [items, setItems] = useState<InventoryItem[]>(initialItems);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<Category | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'Ada' | 'Hilang'>('all');

  const addItem = useCallback((item: Omit<InventoryItem, 'id' | 'nomorBarang' | 'createdAt' | 'updatedAt'>) => {
    const newItem: InventoryItem = {
      ...item,
      id: Date.now().toString(),
      nomorBarang: generateItemId(items),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setItems(prev => [...prev, newItem]);
    return newItem;
  }, [items]);

  const updateItem = useCallback((id: string, updates: Partial<InventoryItem>) => {
    setItems(prev => prev.map(item => 
      item.id === id 
        ? { ...item, ...updates, updatedAt: new Date() }
        : item
    ));
  }, []);

  const deleteItem = useCallback((id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  }, []);

  const getNextItemNumber = useCallback(() => {
    return generateItemId(items);
  }, [items]);

  const filteredItems = items.filter(item => {
    const matchesSearch = item.namaBarang.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.nomorBarang.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || item.kategori === categoryFilter;
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return {
    items: filteredItems,
    allItems: items,
    searchQuery,
    setSearchQuery,
    categoryFilter,
    setCategoryFilter,
    statusFilter,
    setStatusFilter,
    addItem,
    updateItem,
    deleteItem,
    getNextItemNumber,
  };
};
