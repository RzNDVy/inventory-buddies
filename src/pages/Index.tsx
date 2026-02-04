import React, { useState } from 'react';
import { useInventory } from '@/hooks/useInventory';
import { InventoryItem } from '@/types/inventory';
import Header from '@/components/layout/Header';
import BottomNav from '@/components/layout/BottomNav';
import FloatingActionButton from '@/components/layout/FloatingActionButton';
import FloatingBackground from '@/components/inventory/FloatingBackground';
import SearchFilter from '@/components/inventory/SearchFilter';
import InventoryCard from '@/components/inventory/InventoryCard';
import InventoryForm from '@/components/inventory/InventoryForm';
import { FlowerDecor, StarDecor, HeartDecor } from '@/components/icons/KawaiiIcons';
import { Package, TrendingUp, AlertTriangle } from 'lucide-react';

const Index = () => {
  const [activeTab, setActiveTab] = useState('inventory');
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);

  const {
    items,
    allItems,
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
  } = useInventory();

  const handleAddItem = (data: Omit<InventoryItem, 'id' | 'nomorBarang' | 'createdAt' | 'updatedAt'>) => {
    addItem(data);
    setShowForm(false);
  };

  const handleEditItem = (data: Omit<InventoryItem, 'id' | 'nomorBarang' | 'createdAt' | 'updatedAt'>) => {
    if (editingItem) {
      updateItem(editingItem.id, data);
      setEditingItem(null);
      setShowForm(false);
    }
  };

  const handleOpenEdit = (item: InventoryItem) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingItem(null);
  };

  // Calculate stats
  const totalItems = allItems.length;
  const totalQuantity = allItems.reduce((acc, item) => acc + item.jumlah, 0);
  const missingItems = allItems.filter(item => item.status === 'Hilang').length;
  const damagedItems = allItems.filter(item => item.kondisi !== 'Baik').length;

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <FloatingBackground />
      
      <div className="relative z-10 pb-32">
        <Header totalItems={totalItems} />
        
        <main className="max-w-6xl mx-auto px-4">
          {/* Stats cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="card-kawaii p-4 relative overflow-hidden">
              <div className="absolute top-2 right-2 opacity-50">
                <StarDecor size={20} />
              </div>
              <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center mb-2">
                <Package className="w-5 h-5 text-primary" />
              </div>
              <p className="text-2xl font-bold text-foreground">{totalItems}</p>
              <p className="text-xs text-muted-foreground">Jenis Barang</p>
            </div>

            <div className="card-kawaii p-4 relative overflow-hidden">
              <div className="absolute top-2 right-2 opacity-50">
                <FlowerDecor size={20} />
              </div>
              <div className="w-10 h-10 bg-secondary/40 rounded-xl flex items-center justify-center mb-2">
                <TrendingUp className="w-5 h-5 text-secondary-foreground" />
              </div>
              <p className="text-2xl font-bold text-foreground">{totalQuantity}</p>
              <p className="text-xs text-muted-foreground">Total Unit</p>
            </div>

            <div className="card-kawaii p-4 relative overflow-hidden">
              <div className="absolute top-2 right-2 opacity-50">
                <HeartDecor size={20} />
              </div>
              <div className="w-10 h-10 bg-danger/20 rounded-xl flex items-center justify-center mb-2">
                <AlertTriangle className="w-5 h-5 text-danger-foreground" />
              </div>
              <p className="text-2xl font-bold text-foreground">{missingItems}</p>
              <p className="text-xs text-muted-foreground">Barang Hilang</p>
            </div>

            <div className="card-kawaii p-4 relative overflow-hidden">
              <div className="absolute top-2 right-2 opacity-50">
                <StarDecor size={20} />
              </div>
              <div className="w-10 h-10 bg-warning/40 rounded-xl flex items-center justify-center mb-2">
                <AlertTriangle className="w-5 h-5 text-warning-foreground" />
              </div>
              <p className="text-2xl font-bold text-foreground">{damagedItems}</p>
              <p className="text-xs text-muted-foreground">Perlu Perbaikan</p>
            </div>
          </div>

          {/* Search & Filter */}
          <SearchFilter
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            categoryFilter={categoryFilter}
            onCategoryChange={setCategoryFilter}
            statusFilter={statusFilter}
            onStatusChange={setStatusFilter}
          />

          {/* Inventory grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.length > 0 ? (
              items.map(item => (
                <InventoryCard
                  key={item.id}
                  item={item}
                  onEdit={handleOpenEdit}
                  onDelete={deleteItem}
                />
              ))
            ) : (
              <div className="col-span-full card-kawaii p-12 text-center">
                <div className="w-20 h-20 bg-muted/50 rounded-3xl flex items-center justify-center mx-auto mb-4">
                  <Package className="w-10 h-10 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Tidak ada barang ditemukan</h3>
                <p className="text-muted-foreground">Coba ubah filter atau tambah barang baru</p>
              </div>
            )}
          </div>
        </main>
      </div>

      <FloatingActionButton onClick={() => setShowForm(true)} />
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />

      {showForm && (
        <InventoryForm
          item={editingItem}
          nextItemNumber={getNextItemNumber()}
          onSubmit={editingItem ? handleEditItem : handleAddItem}
          onClose={handleCloseForm}
        />
      )}
    </div>
  );
};

export default Index;
