import { Navigate } from "react-router-dom"

const PrivateRoute = ({user, children}) => {
  return (
    user ? children : <Navigate to ="/login" />
  )
}

//user 값이 있으면 todo페이지 : redirect to /login

export default PrivateRoute