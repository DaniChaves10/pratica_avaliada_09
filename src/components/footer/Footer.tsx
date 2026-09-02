import { useContext } from 'react';
import {
  GithubLogoIcon,
  InstagramLogoIcon,
  LinkedinLogoIcon
} from '@phosphor-icons/react';

import { AuthContext } from '../../contexts/AuthContext';

function Footer() {

  const { usuario } = useContext(AuthContext);

  if (usuario.token === '') {
    return null;
  }

  return (
    <div className="flex justify-center w-full px-2 text-white bg-slate-800 py-4 mt-auto">

      <div className="container flex flex-col items-center gap-2">

        <p className="text-base font-bold text-center md:text-xl">
          Loja de Games Daniel Chaves | Copyright: 2026
        </p>

        <p className="text-sm text-center md:text-lg">
          Acesse minhas redes sociais
        </p>

        <div className="flex flex-wrap justify-center gap-2">

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/daniel-araujo10/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="flex items-center hover:opacity-70 transition-opacity"
          >
            <span className="flex items-center justify-center w-10 h-10">
              <LinkedinLogoIcon size={28} weight="bold" />
            </span>
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/DaniChaves10"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="flex items-center hover:opacity-70 transition-opacity"
          >
            <span className="flex items-center justify-center w-10 h-10">
              <GithubLogoIcon size={28} weight="bold" />
            </span>
          </a>

          {/* Instagram */}
          <a
            href="COLOQUE-SEU-INSTAGRAM-AQUI"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="flex items-center hover:opacity-70 transition-opacity"
          >
            <span className="flex items-center justify-center w-10 h-10">
              <InstagramLogoIcon size={28} weight="bold" />
            </span>
          </a>

        </div>

      </div>

    </div>
  );
}

export default Footer;