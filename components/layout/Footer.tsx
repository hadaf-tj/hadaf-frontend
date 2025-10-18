const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white mt-12">
      <div className="container mx-auto px-4 py-6 text-center text-sm">
        <p>
          &copy; {new Date().getFullYear()} Социальный Мост. Проект волонтеров.
        </p>
        <div className="mt-2 space-x-4">
          <a href="#" className="hover:text-blue-400 transition-colors">О нас</a>
          <a href="#" className="hover:text-blue-400 transition-colors">Контакты</a>
          <a 
            href="https://github.com/ВашаОрганизация/soc-homes-frontend-react" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
