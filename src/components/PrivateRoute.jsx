import { Route, Redirect } from 'react-router-dom'
import { useAuth } from '../contexts/auth'
function PrivateRoute(props) {
  const { signed } = useAuth()

  if (!signed)
    return <Redirect to="/login" />

  return (
    <Route {...props} />
  )
}

export default PrivateRoute
