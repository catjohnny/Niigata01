import React, { useState, useEffect } from 'react';
import { PRE_TRIP_CHECKLIST } from '../constants';
import { TodoItem, MemoItem } from '../types';

const ListsView: React.FC = () => {
  const [todos, setTodos] = useState<TodoItem[]>(PRE_TRIP_CHECKLIST);
  const [memos, setMemos] = useState<MemoItem[]>([]);
  const [memoInput, setMemoInput] = useState('');
  const [activeTab, setActiveTab] = useState<'todo' | 'memo'>('todo');

  useEffect(() => {
    const savedTodos = localStorage.getItem('niigata_todos');
    if (savedTodos) setTodos(JSON.parse(savedTodos));
    
    const savedMemos = localStorage.getItem('niigata_memos');
    if (savedMemos) setMemos(JSON.parse(savedMemos));
  }, []);

  useEffect(() => {
    localStorage.setItem('niigata_todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem('niigata_memos', JSON.stringify(memos));
  }, [memos]);

  const toggleTodo = (id: string) => {
    setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const addMemo = () => {
    if (!memoInput.trim()) return;
    const newMemo: MemoItem = {
      id: Date.now().toString(),
      content: memoInput,
      timestamp: Date.now()
    };
    setMemos([newMemo, ...memos]);
    setMemoInput('');
  };

  const deleteMemo = (id: string) => {
    setMemos(memos.filter(m => m.id !== id));
  };

  const renderContentWithLinks = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);
    return parts.map((part, i) => {
        if (part.match(urlRegex)) {
            return (
                <a key={i} href={part} target="_blank" rel="noreferrer" className="text-gold-400 underline break-all">
                    {part.length > 30 ? part.substring(0, 30) + '...' : part} <i className="fas fa-external-link-alt text-xs ml-1"></i>
                </a>
            );
        }
        return part;
    });
  };

  return (
    <div className="min-h-full bg-luxury-black p-4">
      <div className="flex border-b border-gray-800 mb-6">
        <button 
          onClick={() => setActiveTab('todo')}
          className={`flex-1 py-3 text-center font-serif transition-colors ${activeTab === 'todo' ? 'text-gold-400 border-b-2 border-gold-400' : 'text-gray-500'}`}
        >
          行前清單
        </button>
        <button 
          onClick={() => setActiveTab('memo')}
          className={`flex-1 py-3 text-center font-serif transition-colors ${activeTab === 'memo' ? 'text-gold-400 border-b-2 border-gold-400' : 'text-gray-500'}`}
        >
          備忘錄
        </button>
      </div>

      {activeTab === 'todo' ? (
        <div className="space-y-3">
          {todos.map(todo => (
            <div 
                key={todo.id} 
                onClick={() => toggleTodo(todo.id)}
                className={`flex items-center p-4 rounded-xl border transition-all cursor-pointer ${
                    todo.completed 
                    ? 'bg-luxury-black border-gray-800 opacity-50' 
                    : 'bg-luxury-charcoal border-gray-700'
                }`}
            >
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-4 transition-colors ${
                    todo.completed ? 'bg-gold-500 border-gold-500 text-black' : 'border-gray-500'
                }`}>
                    {todo.completed && <i className="fas fa-check text-xs"></i>}
                </div>
                <span className={`text-sm ${todo.completed ? 'line-through text-gray-500' : 'text-gray-200'}`}>
                    {todo.text}
                </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
            <div className="bg-luxury-charcoal p-3 rounded-xl border border-gray-700">
                <textarea 
                    value={memoInput}
                    onChange={(e) => setMemoInput(e.target.value)}
                    placeholder="輸入筆記或網址..."
                    className="w-full bg-transparent text-white outline-none min-h-[80px] resize-none placeholder-gray-600"
                />
                <div className="flex justify-end mt-2">
                    <button onClick={addMemo} className="bg-gold-600 text-black px-4 py-1.5 rounded text-sm font-bold">
                        新增
                    </button>
                </div>
            </div>
            
            <div className="space-y-3">
                {memos.map(memo => (
                    <div key={memo.id} className="bg-luxury-black border border-gray-800 p-4 rounded-xl relative group">
                        <button 
                            onClick={() => deleteMemo(memo.id)}
                            className="absolute top-2 right-2 text-gray-700 hover:text-red-500 p-2"
                        >
                            <i className="fas fa-times"></i>
                        </button>
                        <div className="text-gray-300 text-sm whitespace-pre-wrap pr-6">
                            {renderContentWithLinks(memo.content)}
                        </div>
                        <div className="text-[10px] text-gray-600 mt-2">
                            {new Date(memo.timestamp).toLocaleString()}
                        </div>
                    </div>
                ))}
                {memos.length === 0 && <div className="text-center text-gray-600 py-10">尚無筆記</div>}
            </div>
        </div>
      )}
    </div>
  );
};

export default ListsView;
