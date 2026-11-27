import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { X } from 'lucide-react'

const DISMISS_KEY = 'fsa.offer.dismissed'

export default function SpecialOfferBanner() {
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(true)

  useEffect(() => {
    let already = false
    try {
      already = sessionStorage.getItem(DISMISS_KEY) === '1'
    } catch {
      // Private browsing, or storage blocked. Show the offer; forget the choice.
    }
    if (already) return
    setDismissed(false)
    const t = setTimeout(() => setVisible(true), 200)
    return () => clearTimeout(t)
  }, [])

  if (dismissed) return null

  const close = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setVisible(false)
    try {
      sessionStorage.setItem(DISMISS_KEY, '1')
    } catch {
      // Nothing to do — the banner still closes for this view.
    }
    setTimeout(() => setDismissed(true), 200)
  }

  return (
    <aside
      aria-label="CPL ground classes"
      className={[
        'mx-3 mt-4 max-w-[calc(100vw-1.5rem)] transition-all duration-300',
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
        'lg:ml-auto lg:mr-3 lg:w-[19rem]',
      ].join(' ')}
    >
      <div className="relative overflow-hidden rounded-xl border-2 border-amber-400 bg-[#12210f] shadow-2xl lg:rounded-l-xl lg:rounded-r-none lg:border-r-0">
        <button
          type="button"
          onClick={close}
          aria-label="Dismiss this offer"
          className="absolute right-1 top-1 z-10 grid h-11 w-11 place-items-center rounded-full text-lg font-bold text-[#12210f] transition-colors hover:bg-black/10 lg:text-white/70 lg:hover:bg-white/10"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>

        <Link to="/contact" className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300">
          <div className="flex items-center gap-3 bg-gradient-to-r from-amber-400 to-amber-500 px-4 py-2.5 pr-12">
            <span className="shrink-0 rounded-md border-2 border-amber-400 bg-[#12210f] px-2 py-1 text-center text-[10px] font-black uppercase leading-tight tracking-wide text-amber-400">
              CPL
              <br />
              Classes
            </span>
            <span className="text-[13px] font-black uppercase leading-tight tracking-tight text-[#12210f]">
              CPL ground classes
            </span>
          </div>

          <div className="flex items-baseline justify-between gap-3 px-4 py-3 lg:block lg:text-center">
            <span className="block text-3xl font-black leading-none text-amber-400 lg:text-4xl">
              Ask about classes
            </span>
            <span className="block text-[11px] leading-snug text-white/60 lg:mt-2">
              Ground classes only; aircraft flying training is separate.
            </span>
          </div>
        </Link>
      </div>
    </aside>
  )
}
