import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';

interface ViewedContextType {
  viewedIds: number[];
  addViewed: (id: number) => void;
}

const ViewedContext = createContext<ViewedContextType | null>(null);

const STORAGE_KEY = 'vutru_viewed';
const MAX_VIEWED = 20;

export const ViewedProvider = ({ children }: { children: ReactNode }) => {
  const [viewedIds, setViewedIds] = useState<number[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    } catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(viewedIds));
  }, [viewedIds]);

  const addViewed = useCallback((id: number) => {
    setViewedIds((prev) => {
      const filtered = prev.filter((i) => i !== id);
      return [id, ...filtered].slice(0, MAX_VIEWED);
    });
  }, []);

  return (
    <ViewedContext.Provider value={{ viewedIds, addViewed }}>
      {children}
    </ViewedContext.Provider>
  );
};

export const useViewedProducts = () => {
  const ctx = useContext(ViewedContext);
  if (!ctx) throw new Error('useViewedProducts must be used within ViewedProvider');
  return ctx;
};
