
import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import Dashboard from '../components/Dashboard';
import TransactionHistory from '../components/TransactionHistory';
import AddTransaction from '../components/AddTransaction';

type TabValue = 'dashboard' | 'transactions' | 'add';

const Index = () => {
  const [activeTab, setActiveTab] = useState<TabValue>('dashboard');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'transactions':
        return <TransactionHistory />;
      case 'add':
        return <AddTransaction />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-finance-background">
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="container mx-auto py-6">
        {renderTabContent()}
      </div>
      <footer className="py-6 text-center text-gray-500 text-sm">
        <p>© 2025 Personal Finance Tracker | Keep Track of Your Money</p>
      </footer>
    </div>
  );
};

export default Index;
