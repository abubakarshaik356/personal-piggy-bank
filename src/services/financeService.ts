
import { useState, useEffect } from 'react';

export type Transaction = {
  id: string;
  date: string;
  amount: number;
  category: string;
  description: string;
  type: 'income' | 'expense';
};

export type Category = {
  id: string;
  name: string;
  type: 'income' | 'expense';
  color: string;
};

// Initial categories
const defaultCategories: Category[] = [
  { id: '1', name: 'Salary', type: 'income', color: '#38b000' },
  { id: '2', name: 'Freelance', type: 'income', color: '#80ed99' },
  { id: '3', name: 'Investment', type: 'income', color: '#157f1f' },
  { id: '4', name: 'Gift', type: 'income', color: '#0077b6' },
  { id: '5', name: 'Housing', type: 'expense', color: '#e5383b' },
  { id: '6', name: 'Food', type: 'expense', color: '#e76f51' },
  { id: '7', name: 'Transportation', type: 'expense', color: '#f4a261' },
  { id: '8', name: 'Entertainment', type: 'expense', color: '#e9c46a' },
  { id: '9', name: 'Utilities', type: 'expense', color: '#2a9d8f' },
  { id: '10', name: 'Healthcare', type: 'expense', color: '#264653' },
];

// Sample data
const sampleTransactions: Transaction[] = [
  {
    id: '1',
    date: '2025-04-10',
    amount: 3000,
    category: 'Salary',
    description: 'Monthly salary',
    type: 'income',
  },
  {
    id: '2',
    date: '2025-04-12',
    amount: 50,
    category: 'Food',
    description: 'Grocery shopping',
    type: 'expense',
  },
  {
    id: '3',
    date: '2025-04-15',
    amount: 100,
    category: 'Entertainment',
    description: 'Movie tickets',
    type: 'expense',
  },
  {
    id: '4',
    date: '2025-04-16',
    amount: 500,
    category: 'Freelance',
    description: 'Design project',
    type: 'income',
  },
  {
    id: '5',
    date: '2025-04-17',
    amount: 200,
    category: 'Housing',
    description: 'Electricity bill',
    type: 'expense',
  }
];

export const useFinanceData = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    // Load data from localStorage or use sample data
    const storedTransactions = localStorage.getItem('transactions');
    const storedCategories = localStorage.getItem('categories');
    
    if (storedTransactions) {
      setTransactions(JSON.parse(storedTransactions));
    } else {
      setTransactions(sampleTransactions);
    }
    
    if (storedCategories) {
      setCategories(JSON.parse(storedCategories));
    } else {
      setCategories(defaultCategories);
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (transactions.length > 0) {
      localStorage.setItem('transactions', JSON.stringify(transactions));
    }
    if (categories.length > 0) {
      localStorage.setItem('categories', JSON.stringify(categories));
    }
  }, [transactions, categories]);

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction = { 
      ...transaction, 
      id: Date.now().toString() 
    };
    setTransactions([...transactions, newTransaction]);
  };

  const deleteTransaction = (id: string) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  const addCategory = (category: Omit<Category, 'id'>) => {
    const newCategory = {
      ...category,
      id: Date.now().toString()
    };
    setCategories([...categories, newCategory]);
  };

  const deleteCategory = (id: string) => {
    setCategories(categories.filter(c => c.id !== id));
  };

  const getBalance = () => {
    return transactions.reduce((total, transaction) => {
      if (transaction.type === 'income') {
        return total + transaction.amount;
      } else {
        return total - transaction.amount;
      }
    }, 0);
  };

  const getTotalIncome = () => {
    return transactions
      .filter(t => t.type === 'income')
      .reduce((total, t) => total + t.amount, 0);
  };

  const getTotalExpense = () => {
    return transactions
      .filter(t => t.type === 'expense')
      .reduce((total, t) => total + t.amount, 0);
  };

  const getCategoryTotals = (type: 'income' | 'expense') => {
    const categoryTotals: Record<string, number> = {};

    transactions
      .filter(t => t.type === type)
      .forEach(transaction => {
        if (!categoryTotals[transaction.category]) {
          categoryTotals[transaction.category] = 0;
        }
        categoryTotals[transaction.category] += transaction.amount;
      });

    return categoryTotals;
  };

  const getCategoryColor = (categoryName: string) => {
    const category = categories.find(c => c.name === categoryName);
    return category ? category.color : '#cccccc';
  };

  return {
    transactions,
    categories,
    addTransaction,
    deleteTransaction,
    addCategory,
    deleteCategory,
    getBalance,
    getTotalIncome,
    getTotalExpense,
    getCategoryTotals,
    getCategoryColor
  };
};
