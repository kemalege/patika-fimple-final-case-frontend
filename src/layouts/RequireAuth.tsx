import { useLocation, Navigate, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectUserToken } from "../features/auth/authSlice"

const RequireAuth = () => {
    const userToken = useSelector(selectUserToken)
    const location = useLocation()
    
    return (
        userToken
            ? <Outlet />
            : <Navigate to="/admin" state={{ from: location }} replace />
    )
}
export default RequireAuth