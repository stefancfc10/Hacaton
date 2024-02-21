import { createContext, useState } from "react";

interface ContextData {
    totalCost: number;
    savedTotalCost: number;
    getTotalCost: (price: number) => void;
    saveTotalCost: (price: number) => void;
}

interface IGetTotalCostContext {
    children: React.ReactNode;
}

export const GetTotalCostContext = createContext({} as ContextData);

export const GetTotalCostProvider = ({ children }: IGetTotalCostContext) => {
    const [totalCost, setTotalCost] = useState(0);
    const [savedTotalCost, setSaveTotalCost] = useState(0);

    const getTotalCost = (price: number) => {
        setTotalCost(price);
    }

    const saveTotalCost = (price: number) => {
        console.log(price);
        setSaveTotalCost(price);
    }

    return (
        <GetTotalCostContext.Provider value={{ totalCost, savedTotalCost, getTotalCost, saveTotalCost }}>
            {children}
        </GetTotalCostContext.Provider>
    )
}