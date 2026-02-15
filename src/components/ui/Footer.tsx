import { HiHeart } from 'react-icons/hi2'
import { version } from '../../../package.json'
import { FaGithub, FaLinkedin } from 'react-icons/fa6'

export const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full py-12 px-[4%] md:px-[12%] lg:px-[20%] mt-auto border-t border-white/5 bg-black/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        {/* LADO IZQUIERDO: Branding */}
        <div className="flex flex-col items-center md:items-start gap-1">
          <div className="flex flex-col items-baseline gap-2">
            <div className="flex flex-col-reverse items-center gap-2 md:flex-row md:items-baseline md:gap-1">
              <span className="font-rajdhani text-2xl font-bold tracking-tighter leading-5 text-white">
                POKÉNEX<span className="text-lime-300">PRO</span>
              </span>
              <span className="text-[12px] font-rajdhani font-medium text-lime-400/50 uppercase tracking-widest leading-none">
                v{version}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-zinc-500/62 text-[12px] font-inter leading-tight">
                By Marco Del Boccio
              </span>
            </div>
          </div>
          <p className="flex items-center gap-1 text-zinc-500 text-sm font-inter">
            © {currentYear} — Built with Next.js, PokéAPI &
            <HiHeart className="text-lime-300 text-[18px]" />
          </p>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com/codentide"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 text-zinc-400 hover:text-lime-300 transition-colors"
          >
            <FaGithub className="text-3xl group-hover:scale-110 transition-transform" />
          </a>
          <a
            href="https://linkedin.com/in/marco-del-boccio"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 text-zinc-400 hover:text-lime-300 transition-colors"
          >
            <FaLinkedin className="text-3xl group-hover:scale-110 transition-transform" />
          </a>
        </div>
      </div>
    </footer>
  )
}
