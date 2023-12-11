import { Route, Routes } from 'react-router-dom';

// Import individual contexts
import AuthProvider from './contexts/auth/AuthProvider';
import FlashProvider from './contexts/flash/FlashProvider';

// Import individual components
import Flash from './components/common/Flash';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import PrivateRoute from './components/common/PrivateRoute';

// Import individual pages
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import HomePage from './pages/tasks/HomePage';
import TodayPage from './pages/tasks/TodayPage';
import UpcomingPage from './pages/tasks/UpcomingPage';
import AddPage from './pages/tasks/AddPage';
import AssignPage from './pages/tasks/AssignPage';
import EditPage from './pages/tasks/EditPage';
import CategoriesPage from './pages/categories/CategoriesPage';
import AddCategoryPage from './pages/categories/AddCategoryPage';
import EditCategoryPage from './pages/categories/EditCategoryPage';
import CategoryTasksPage from './pages/tasks/CategoryTasksPage';
import NotFoundPage from './pages/error/NotFoundPage';

function App() {
  return (
    <FlashProvider>
      <AuthProvider>
        <Header />
        <Flash />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/" element={<PrivateRoute><HomePage /></PrivateRoute>} />
          <Route path="/today" element={<PrivateRoute><TodayPage /></PrivateRoute>} />
          <Route path="/upcoming" element={<PrivateRoute><UpcomingPage /></PrivateRoute>} />
          <Route path="/add" element={<PrivateRoute><AddPage /></PrivateRoute>} />
          <Route path="/assign" element={<PrivateRoute><AssignPage /></PrivateRoute>} />
          <Route path="/edit/:taskId" element={<PrivateRoute><EditPage /></PrivateRoute>} />
          <Route path="/categories" element={<PrivateRoute><CategoriesPage /></PrivateRoute>} />
          <Route path="/categories/add" element={<PrivateRoute><AddCategoryPage /></PrivateRoute>} />
          <Route path="/categories/edit/:categoryId" element={<PrivateRoute><EditCategoryPage /></PrivateRoute>} />
          <Route path="/categories/:categoryId/tasks" element={<PrivateRoute><CategoryTasksPage /></PrivateRoute>} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Footer />
      </AuthProvider>
    </FlashProvider>
  );
};

export default App;
