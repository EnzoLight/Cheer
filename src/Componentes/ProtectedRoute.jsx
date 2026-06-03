import { Navigate } from 'react-router-dom';
import useAuth from '../Contextos/useAuth';

function ProtectedRoute({ children, requiredRole }) {
  const { authenticated, status, profile } = useAuth();

  if (status === 'loading') return null;

  if (!authenticated) return <Navigate to="/" replace />;

  const userType = profile?.tipo || null;
  if (requiredRole && userType !== requiredRole) return <Navigate to="/" replace />;

  return children;
}

export default ProtectedRoute;