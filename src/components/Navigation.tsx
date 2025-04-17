
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PiggyBank, BarChart3, PlusCircle, ClipboardList } from 'lucide-react';

type TabValue = 'dashboard' | 'transactions' | 'add';

interface NavigationProps {
  activeTab: TabValue;
  onTabChange: (value: TabValue) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="py-4 border-b sticky top-0 bg-white z-10">
      <div className="container mx-auto flex flex-col items-center">
        <div className="flex items-center space-x-2 mb-4">
          <PiggyBank className="h-8 w-8 text-finance-green" />
          <h1 className="text-2xl font-bold">Personal Finance Tracker</h1>
        </div>
        
        <Tabs value={activeTab} onValueChange={(v) => onTabChange(v as TabValue)} className="w-full max-w-md">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="dashboard" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span>Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="transactions" className="flex items-center space-x-2">
              <ClipboardList className="h-4 w-4" />
              <span>Transactions</span>
            </TabsTrigger>
            <TabsTrigger value="add" className="flex items-center space-x-2">
              <PlusCircle className="h-4 w-4" />
              <span>Add New</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
};

export default Navigation;
