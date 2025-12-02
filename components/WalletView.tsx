import React, { useState, useEffect, useRef } from 'react';
import { ExpenseItem } from '../types';

const WalletView: React.FC = () => {
  const [rate, setRate] = useState(0.22);
  const [calcInput, setCalcInput] = useState('');
  const [calcResult, setCalcResult] = useState<number | null>(null);
  
  const [expenses, setExpenses] = useState<ExpenseItem[]>([]);
  const [newExpenseName, setNewExpenseName] = useState('');
  const [newExpenseAmount, setNewExpenseAmount] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem('niigata_expenses');
    if (saved) {
      try {
        setExpenses(JSON.parse(saved));
      } catch (e) { console.error("Failed to load expenses"); }
    }
    
    const savedRate = localStorage.getItem('niigata_rate');
    if (savedRate) setRate(parseFloat(savedRate));
  }, []);

  useEffect(() => {
    localStorage.setItem('niigata_expenses', JSON.stringify(expenses));
  }, [expenses]);

  const handleRateChange = (val: string) => {
    const num = parseFloat(val);
    if (!isNaN(num)) {
      setRate(num);
      localStorage.setItem('niigata_rate', val);
    }
  };

  const handleCalc = () => {
    try {
      if (!/^[0-9+\-*/.() ]+$/.test(calcInput)) return;
      // eslint-disable-next-line no-new-func
      const result = new Function('return ' + calcInput)();
      setCalcResult(result);
    } catch (e) {
      setCalcResult(null);
    }
  };

  const compressImage = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 600;
          const scaleSize = MAX_WIDTH / img.width;
          canvas.width = MAX_WIDTH;
          canvas.height = img.height * scaleSize;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            resolve(canvas.toDataURL('image/jpeg', 0.5));
          } else {
            resolve('');
          }
        };
      };
    });
  };

  const addExpense = async () => {
    if (!newExpenseName || !newExpenseAmount) return;

    let imageBase64: string | undefined = undefined;

    if (fileInputRef.current && fileInputRef.current.files && fileInputRef.current.files[0]) {
      imageBase64 = await compressImage(fileInputRef.current.files[0]);
    }

    const newExp: ExpenseItem = {
      id: Date.now().toString(),
      description: newExpenseName,
      amountJPY: parseFloat(newExpenseAmount),
      date: Date.now(),
      receiptImageBase64: imageBase64
    };

    setExpenses([newExp, ...expenses]);
    setNewExpenseName('');
    setNewExpenseAmount('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const deleteExpense = (id: string) => {
    if(window.confirm('確定刪除此紀錄？')) {
        setExpenses(expenses.filter(e => e.id !== id));
    }
  };

  const totalJPY = expenses.reduce((acc, curr) => acc + curr.amountJPY, 0);

  return (
    <div className="p-4 bg-luxury-black min-h-full space-y-6">
      
      <div className="bg-luxury-charcoal p-5 rounded-2xl border border-gold-500/20 shadow-lg">
        <h3 className="text-gold-400 font-serif mb-3">匯率換算</h3>
        <div className="flex items-center space-x-2 mb-3">
          <span className="text-xs text-gray-500">匯率 (日幣換台幣):</span>
          <input 
            type="number" 
            value={rate}
            onChange={(e) => handleRateChange(e.target.value)}
            className="bg-luxury-black border border-gray-700 rounded px-2 py-1 w-20 text-right text-gold-100"
            step="0.001"
          />
        </div>
        
        <div className="flex gap-2">
            <input 
                type="text" 
                placeholder="例如 500+200*3" 
                value={calcInput}
                onChange={(e) => setCalcInput(e.target.value)}
                className="flex-1 bg-luxury-black border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-600 font-mono text-lg"
            />
            <button 
                onClick={handleCalc}
                className="bg-gold-500 text-black px-4 rounded-lg font-bold"
            >
                =
            </button>
        </div>

        {calcResult !== null && (
            <div className="mt-3 flex justify-between items-center border-t border-gray-700 pt-3">
                <div className="text-gray-400">日幣總額: <span className="text-white font-bold">{Math.round(calcResult).toLocaleString()}</span></div>
                <div className="text-gold-400 text-xl font-bold">NT$ {Math.round(calcResult * rate).toLocaleString()}</div>
            </div>
        )}
      </div>

      <div className="bg-luxury-charcoal p-5 rounded-2xl border border-gray-800">
        <h3 className="text-white font-serif mb-4">新增記帳</h3>
        <div className="space-y-3">
            <input 
                type="text" 
                placeholder="品項名稱" 
                value={newExpenseName}
                onChange={(e) => setNewExpenseName(e.target.value)}
                className="w-full bg-luxury-black border border-gray-700 rounded p-3 text-white"
            />
            <div className="flex gap-2">
                <input 
                    type="number" 
                    placeholder="日幣金額" 
                    value={newExpenseAmount}
                    onChange={(e) => setNewExpenseAmount(e.target.value)}
                    className="flex-1 bg-luxury-black border border-gray-700 rounded p-3 text-white"
                />
                <label className="flex items-center justify-center bg-gray-800 w-12 rounded border border-gray-700 cursor-pointer hover:bg-gray-700">
                    <i className="fas fa-camera text-gold-400"></i>
                    <input 
                        type="file" 
                        ref={fileInputRef} 
                        accept="image/*" 
                        className="hidden"
                        onChange={() => alert('照片已選擇')}
                    />
                </label>
            </div>
            <button 
                onClick={addExpense}
                className="w-full bg-gold-600 hover:bg-gold-500 text-black font-bold py-3 rounded transition-colors"
            >
                儲存
            </button>
        </div>
      </div>

      <div className="pb-8">
        <div className="flex justify-between items-end mb-2 px-2">
            <h3 className="text-xl font-serif text-white">記帳紀錄</h3>
            <span className="text-xs text-gold-400">總計: NT$ {(totalJPY * rate).toLocaleString()}</span>
        </div>
        
        <div className="space-y-3">
            {expenses.length === 0 && <p className="text-center text-gray-600 py-4">目前沒有紀錄</p>}
            {expenses.map((exp) => (
                <div key={exp.id} className="bg-luxury-charcoal p-4 rounded-xl border border-gray-800 flex justify-between items-center group">
                    <div className="flex items-center gap-3">
                        {exp.receiptImageBase64 ? (
                            <img src={exp.receiptImageBase64} alt="Receipt" className="w-10 h-10 rounded object-cover border border-gray-600" />
                        ) : (
                            <div className="w-10 h-10 rounded bg-gray-800 flex items-center justify-center">
                                <i className="fas fa-receipt text-gray-600"></i>
                            </div>
                        )}
                        <div>
                            <div className="text-white font-medium">{exp.description}</div>
                            <div className="text-xs text-gray-500">{new Date(exp.date).toLocaleDateString()}</div>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-gold-100 font-bold">¥{exp.amountJPY.toLocaleString()}</div>
                        <div className="text-xs text-gray-500">NT$ {Math.round(exp.amountJPY * rate).toLocaleString()}</div>
                    </div>
                    <button 
                        onClick={() => deleteExpense(exp.id)}
                        className="ml-3 text-gray-600 hover:text-red-500"
                    >
                        <i className="fas fa-trash-alt"></i>
                    </button>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default WalletView;
