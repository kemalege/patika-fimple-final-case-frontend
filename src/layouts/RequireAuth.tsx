import { Navigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectUserToken } from "../features/auth/authSlice"
import HomeLayout from "./HomeLayout"

const RequireAuth = () => {
    const userToken = useSelector(selectUserToken)
    // const location = useLocation()
    
    return (
        userToken
            ? <HomeLayout />
            : <Navigate to="/admin"  replace />
    )
}
export default RequireAuth