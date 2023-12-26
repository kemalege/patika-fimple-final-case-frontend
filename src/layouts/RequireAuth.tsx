import { Navigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectUserToken } from "../features/auth/authSlice"
import AdminLayout from "./AdminLayout"

const RequireAuth = () => {
    const userToken = useSelector(selectUserToken)
    // const location = useLocation()
    
    return (
        userToken
            ? <AdminLayout />
            : <Navigate to="/admin" replace />
    )
}
export default RequireAuth