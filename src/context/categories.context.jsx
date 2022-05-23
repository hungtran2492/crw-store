import { createContext, useState, useEffect } from "react";
import { getCategoriesANdDocuments } from "../ultils/firebase/firebase.utils";
export const CategoriesContext = createContext({
    categoriesMap: {},
});
export const CategoriesProvider = ({ children }) => {
    const [categoriesMap, setcategoriesMap] = useState({});
    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesANdDocuments();

            setcategoriesMap(categoryMap);

        }
        getCategoriesMap();

    }, [])

    const value = { categoriesMap };
    return (
        <CategoriesContext.Provider value={value}> {children}</CategoriesContext.Provider>
    )
}