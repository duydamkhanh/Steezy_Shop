import { createContext } from "react";
import { TCategoty } from "../../common/types/category";

interface CategoryContextType {
    state: {
        categories: {
            docs: TCategoty[],
            hasNextPage: boolean,
            hasPrevPage: boolean,
            totalDocs: number,
            limit: number,
            totalPages: number,
            page: number
        }
    },
    dispatch: React.Dispatch<any>
}

const CategoryContext = createContext({} as CategoryContextType);

export default CategoryContext