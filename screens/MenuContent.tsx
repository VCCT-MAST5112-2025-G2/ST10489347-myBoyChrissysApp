// screens/MenuContent.tsx
import React, { createContext, useState, ReactNode } from "react";

// Course type
export type CourseType = "Starter" | "Main" | "Dessert";

// Menu item interface
export interface MenuItem {
  id: string;
  course: CourseType;
  name: string;
  description: string;
  price: number;
}

// Context interface
interface MenuContextType {
  menuItems: MenuItem[];
  setMenuItems: React.Dispatch<React.SetStateAction<MenuItem[]>>;
}

// Create context with default values
export const MenuContext = createContext<MenuContextType>({
  menuItems: [],
  setMenuItems: () => {},
});

// Provider component
interface MenuProviderProps {
  children: ReactNode;
}

export const MenuProvider: React.FC<MenuProviderProps> = ({ children }) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  return (
    <MenuContext.Provider value={{ menuItems, setMenuItems }}>
      {children}
    </MenuContext.Provider>
  );
};
