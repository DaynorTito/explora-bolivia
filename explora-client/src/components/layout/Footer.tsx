import { Facebook, Twitter, Instagram, X} from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full bg-[#E8E8E8] text-gray-700">
      <div className="w-full max-w-[1920px] mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-3">Sobre Nosotros</h3>
            <p className="text-sm">
              Explora Bolivia es tu guía definitiva para descubrir los tesoros 
              ocultos y maravillas naturales de Bolivia. Encuentra los mejores 
              destinos y planifica tu próxima aventura con nosotros.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-3">Enlaces Útiles</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/destinations" className="hover:text-[#618725]">Destinos</Link></li>
              <li><Link href="/about" className="hover:text-[#618725]">Sobre Nosotros</Link></li>
              <li><Link href="/contact" className="hover:text-[#618725]">Contacto</Link></li>
              <li><Link href="/privacy" className="hover:text-[#618725]">Política de Privacidad</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-3">Síguenos</h3>
            <div className="flex gap-4">
              <a href="#" className="hover:text-[#618725] transition-colors">
                <Facebook size={24} />
              </a>
              <a href="#" className="hover:text-[#618725] transition-colors">
                <Twitter size={24} />
              </a>
              <a href="#" className="hover:text-[#618725] transition-colors">
                <Instagram size={24} />
              </a>
              <a href="#" className="hover:text-[#618725] transition-colors">
                <X size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-300 mt-8 pt-8 text-center text-sm">
          <p>© {new Date().getFullYear()} Explora Bolivia. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
