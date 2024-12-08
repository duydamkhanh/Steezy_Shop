import { useReducer } from "react"
import categoryReducer, { initState } from "./reducer";
import CategoryContext from "./CategoryContext";


const CategoryProvider = ({ children }: any) => {

    const [state, dispatch] = useReducer<any>(categoryReducer, initState);

    return (
        <CategoryContext.Provider value={{ state, dispatch }}>
            {children}
        </CategoryContext.Provider>
    )
}

export default CategoryProvider