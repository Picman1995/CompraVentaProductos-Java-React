import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 w-full">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Unigran. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
