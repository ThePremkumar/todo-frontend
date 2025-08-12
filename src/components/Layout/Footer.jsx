import React from 'react';

export const Footer = () => {
  return (
    <footer className="bg-light py-3 mt-auto">
      <div className="container">
        <p className="text-center small text-secondary mb-0">
          Mr PK &copy; {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
};
