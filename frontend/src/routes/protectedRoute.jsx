import { Navigate } from "react-router-dom"

const ProtectedRoute = ({ children, roles }) => {
    const token = localStorage.getItem("token")
    const user = JSON.parse(localStorage.getItem("user"))
    console.log("ProtectedRoute check:", {
        token,
        role: user?.role,
        allowedRoles: roles,
    });
    if (!token) {
        return <Navigate to='/signin' />
    }

    if (roles && !roles.includes(user?.role)) {
        return <Navigate to='/signin' />
    }

    return children
}

export default ProtectedRoute;