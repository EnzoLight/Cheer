import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children, requiredRole }) {
  const user = JSON.parse(localStorage.getItem('cheer_user') || 'null');

  if (!user) return <Navigate to="/" replace />;
  if (requiredRole && user.tipo !== requiredRole) return <Navigate to="/" replace />;

  return children;
}

export default ProtectedRoute;