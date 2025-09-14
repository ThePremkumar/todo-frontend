import React, { useState } from 'react';
import { Header } from './components/Layout/Header';
import { Footer } from './components/Layout/Footer';
import { LoginForm } from './components/Auth/LoginForm';
import { RegisterForm } from './components/Auth/RegisterForm';
import { TaskDashboard } from './components/Tasks/TaskDashboard';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { TaskProvider } from './contexts/TaskContext';

const AppContent = () => {
  const { currentUser } = useAuth();
  const [showRegister, setShowRegister] = useState(false);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="flex-grow-1 container py-5 d-flex justify-content-center align-items-start">
        {currentUser ? (
          <TaskProvider>
            <TaskDashboard />
          </TaskProvider>
        ) : (
          <div className="row justify-content-center">
            <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 w-100">
              <div className="bg-white p-4 p-md-5 rounded-3 shadow ">
                {showRegister ? (
                  <>
                    <RegisterForm />
                    <p className="mt-3 text-center text-muted small">
                      Already have an account?{' '}
                      <button
                        onClick={() => setShowRegister(false)}
                        className="btn btn-link p-0 align-baseline"
                        style={{ color: '#0d6efd' }}
                      >
                        Log in
                      </button>
                    </p>
                  </>
                ) : (
                  <>
                    <LoginForm />
                    <p className="mt-3 text-center text-muted small">
                      Don&apos;t have an account?{' '}
                      <button
                        onClick={() => setShowRegister(true)}
                        className="btn btn-link p-0 align-baseline"
                        style={{ color: '#0d6efd' }}
                      >
                        Register
                      </button>
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
