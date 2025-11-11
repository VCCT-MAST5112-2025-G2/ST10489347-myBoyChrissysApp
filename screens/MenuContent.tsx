import React,{createContext,useState,ReactNode, Children } from "react"

type courseType = "Starter" | "Main" | "Dessert";

interface MenuItem {
    id: string;
    course:CourseType;
    name: string 
    description: string;
    price: number;
}

interface MenuContextProps {
    menuItems: MenuItem[];
    setMenuItems: React.Dispatch<React.SetStateAction<MenuItem[]>>;
}
 export const MenuContext = createContext<MenuContextProps>({
    menuItems: [],
    setMenuItems: () => {},
 });

 export const MenuProvider = ({ children}: {children: ReactNode }) => {
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
return(
    <MenuContext.Provider value={{ menuItems, setMenuItems }}>
        {children}
    </MenuContext.Provider>
 );
};

