import { HeartHandshake } from 'lucide-react';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#763f97] text-white mt-12">
      <div className="container mx-auto max-w-7xl px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Блок с логотипом - ИСПРАВЛЕНО: все элементы белые */}
          <div className="flex flex-col items-center md:items-start">
            <Link href="/" className="flex items-center gap-2 text-xl font-bold mb-2 text-white hover:text-white/80 transition-colors">
              <HeartHandshake className="text-white" />
              <span className="text-white">Пайванд</span>
            </Link>
            <p className="text-sm text-white/90">
              Платформа для прямой и прозрачной помощи социальным учреждениям.
            </p>
          </div>
          
          {/* Навигация - ИСПРАВЛЕНО: все ссылки белые */}
          <div>
            <h3 className="font-semibold mb-3 text-white">Навигация</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/institutions" className="text-white hover:text-white/80 transition-colors">Учреждения</Link></li>
              <li><Link href="/map" className="text-white hover:text-white/80 transition-colors">Карта</Link></li>
              <li><Link href="/about" className="text-white hover:text-white/80 transition-colors">О нас</Link></li>
              <li><Link href="/contacts" className="text-white hover:text-white/80 transition-colors">Контакты</Link></li>
            </ul>
          </div>
          
          {/* Контакты - ИСПРАВЛЕНО: все ссылки белые */}
          <div>
            <h3 className="font-semibold mb-3 text-white">Связаться с нами</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="mailto:info@payvand.tj" className="text-white hover:text-white/80 transition-colors">info@payvand.tj</a></li>
              <li><a href="https://github.com/social-housing" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white/80 transition-colors">GitHub</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-white/20 text-center text-sm text-white opacity-80">
          <p>&copy; {new Date().getFullYear()} Проект "Пайванд". Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;