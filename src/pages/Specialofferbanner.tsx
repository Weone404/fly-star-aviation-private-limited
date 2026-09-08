import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const DISMISS_KEY = 'fsa.offer.dismissed'

/**
 * The standing CPL offer.
 *
 * Rewritten after it was found floating over the blog: it was `position: fixed`
 * with a hard 320px width, no close button and no breakpoints, so on a reading
 * page it sat on top of the table of contents and there was no way to move it.
 * A promotion the reader cannot dismiss is not a promotion, it is an obstacle.
 *
 * What changed:
 *  - a real close button, and the dismissal is remembered for the session;
 *  - on phones and tablets it is a slim bar along the bottom instead of a card
 *    over the content, because there is no free column at that width;
 *  - the card is capped to the viewport rather than a fixed pixel width;
 *  - it never renders on blog or admin routes (App.tsx decides that).
 *
 * The figures are the business's own published price, which is the one kind of
 * number this site can state without an external source.
 */
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
      aria-label="Special offer"
      className={[
        'fixed z-40 transition-all duration-300',
        visible ? 'opacity-100 translate-y-0 lg:translate-x-0' : 'opacity-0 translate-y-4 lg:translate-y-0 lg:translate-x-8',
        // Phones and small tablets: a bar across the bottom, clear of the content.
        'inset-x-3 bottom-3 max-w-[calc(100vw-1.5rem)]',
        // Desktop: a card on the right edge, capped to the viewport height.
        'lg:inset-x-auto lg:bottom-auto lg:right-0 lg:top-32 lg:w-[19rem] lg:max-w-[calc(100vw-2rem)]',
      ].join(' ')}
    >
      <div className="relative overflow-hidden rounded-xl border-2 border-amber-400 bg-[#12210f] shadow-2xl lg:rounded-l-xl lg:rounded-r-none lg:border-r-0">
        <button
          type="button"
          onClick={close}
          aria-label="Dismiss this offer"
          className="absolute right-1 top-1 z-10 grid h-11 w-11 place-items-center rounded-full text-lg font-bold text-[#12210f] transition-colors hover:bg-black/10 lg:text-white/70 lg:hover:bg-white/10"
        >
          ×
        </button>

        <Link to="/contact" className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300">
          <div className="flex items-center gap-3 bg-gradient-to-r from-amber-400 to-amber-500 px-4 py-2.5 pr-12">
            <span className="shrink-0 rounded-md border-2 border-amber-400 bg-[#12210f] px-2 py-1 text-center text-[10px] font-black uppercase leading-tight tracking-wide text-amber-400">
              Special
              <br />
              Offer
            </span>
            <span className="text-[13px] font-black uppercase leading-tight tracking-tight text-[#12210f]">
              Complete CPL training
            </span>
          </div>

          <div className="flex items-baseline justify-between gap-3 px-4 py-3 lg:block lg:text-center">
            <span className="block text-3xl font-black leading-none text-amber-400 lg:text-4xl">$35,000</span>
            <span className="block text-[11px] leading-snug text-white/60 lg:mt-2">
              Approx. ₹29–32 Lakhs*
              <span className="hidden lg:block">*rupee range moves with the exchange rate</span>
            </span>
          </div>
        </Link>
      </div>
    </aside>
  )
}
