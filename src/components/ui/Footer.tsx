import { FaGithub, FaLinkedin } from 'react-icons/fa6'

export const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full py-12 px-[4%] md:px-[12%] lg:px-[20%] mt-auto border-t border-white/5 bg-black/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        {/* LADO IZQUIERDO: Branding */}
        <div className="flex flex-col items-center md:items-start gap-1">
          <div className="flex items-baseline gap-2">
            <span className="font-rajdhani text-2xl font-bold tracking-tighter leading-5 text-white">
              POKÉNEX<span className="text-lime-300">PRO</span>
            </span>
            <span className="text-zinc-500/62 text-[12px] font-inter ">
              By Marco Del Boccio
            </span>
          </div>
          <p className="text-zinc-500 text-sm font-inter">
            © {currentYear} — Built with Next.js & PokéAPI
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
