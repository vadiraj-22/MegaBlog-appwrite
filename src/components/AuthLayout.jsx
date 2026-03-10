import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Protected({children, authentication = true}) {
    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector(state => state.auth.status)

    useEffect(() => {
        // Wait a moment for App.jsx to finish checking auth status
        const checkAuth = () => {
            // If page requires authentication but user is not logged in
            if (authentication && authStatus === false) {
                navigate("/login")
            } 
            // If page is for non-authenticated users (login/signup) but user is logged in
            else if (!authentication && authStatus === true) {
                navigate("/")
            }
            setLoader(false)
        }

        checkAuth()
    }, [authStatus, authentication])

    return loader ? <h1>Loading...</h1> : <>{children}</>
}
