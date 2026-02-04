import React, { useState } from 'react';
import { useInventory } from '@/hooks/useInventory';
import { InventoryItem, Category, Status } from '@/types/inventory';
import Header from '@/components/layout/Header';
import BottomNav from '@/components/layout/BottomNav';
import FloatingActionButton from '@/components/layout/FloatingActionButton';
import FloatingBackground from '@/components/inventory/FloatingBackground';
import InventoryForm from '@/components/inventory/InventoryForm';
import DashboardView from '@/components/views/DashboardView';
import InventoryView from '@/components/views/InventoryView';
import StatisticsView from '@/components/views/StatisticsView';
import SettingsView from '@/components/views/SettingsView';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
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

  const totalItems = allItems.length;

  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView allItems={allItems} />;
      case 'inventory':
        return (
          <InventoryView
            items={items}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            categoryFilter={categoryFilter}
            onCategoryChange={setCategoryFilter}
            statusFilter={statusFilter}
            onStatusChange={setStatusFilter}
            onEdit={handleOpenEdit}
            onDelete={deleteItem}
          />
        );
      case 'stats':
        return <StatisticsView allItems={allItems} />;
      case 'settings':
        return <SettingsView />;
      default:
        return <DashboardView allItems={allItems} />;
    }
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <FloatingBackground />
      
      <div className="relative z-10 pb-32">
        <Header totalItems={totalItems} />
        
        <main className="max-w-6xl mx-auto px-4">
          {renderActiveView()}
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
