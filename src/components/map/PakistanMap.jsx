import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { provinces, provinceById } from '../../data/provinces'


const HIT_AREAS = [
  {
    id: 'balochistan',
    d: 'M547,385 L533,393 L519,393 L505,411 L490,414 L478,401 L460,404 L455,400 L445,413 L423,420 L430,433 L418,439 L402,441 L391,439 L390,434 L382,436 L364,457 L356,458 L350,480 L353,503 L348,513 L352,525 L283,549 L246,548 L229,558 L199,552 L134,558 L49,530 L74,559 L89,595 L104,611 L131,619 L142,631 L154,631 L154,694 L182,696 L175,734 L128,741 L124,751 L101,760 L88,821 L97,823 L96,833 L103,827 L113,827 L114,821 L128,824 L137,817 L193,821 L200,810 L258,821 L262,814 L316,812 L339,806 L347,796 L359,797 L366,804 L366,812 L376,820 L374,840 L388,831 L414,781 L414,767 L398,737 L397,687 L402,671 L414,653 L440,645 L473,616 L521,614 L531,595 L530,587 L541,574 L543,565 L534,556 L535,540 L550,527 L560,503 L555,502 L561,473 L571,464 L571,424 L559,427 L553,421 L554,397 Z',
  },
  {
    id: 'sindh',
    d: 'M533,614 L525,617 L473,619 L468,626 L451,637 L442,647 L429,653 L414,656 L402,677 L399,690 L400,733 L416,765 L416,785 L412,795 L403,805 L400,817 L394,823 L392,830 L372,844 L385,843 L401,848 L400,857 L407,869 L408,884 L411,891 L417,891 L418,897 L428,908 L443,906 L450,908 L451,913 L454,905 L460,900 L469,897 L486,897 L487,879 L535,878 L543,885 L559,885 L565,876 L582,870 L590,870 L591,878 L596,881 L601,881 L609,873 L618,871 L612,868 L612,857 L616,854 L614,847 L609,840 L605,825 L594,811 L594,793 L573,793 L562,778 L561,768 L566,758 L566,739 L563,737 L546,737 L528,725 L529,709 L533,698 L549,684 L559,671 L562,660 L567,654 L555,646 L547,623 L543,618 L536,617 Z',
  },
  {
    id: 'punjab',
    d: 'M755,254 L739,267 L744,272 L744,279 L739,287 L733,287 L730,280 L716,282 L716,275 L721,272 L714,259 L706,262 L700,254 L685,259 L685,269 L676,269 L671,276 L670,286 L663,295 L657,297 L656,314 L649,315 L645,307 L639,306 L641,320 L629,322 L624,327 L622,336 L625,347 L635,353 L635,361 L610,407 L606,431 L585,435 L581,442 L574,444 L573,465 L563,475 L563,482 L558,490 L558,515 L551,531 L537,542 L536,554 L545,563 L544,574 L533,587 L532,599 L523,610 L524,614 L535,612 L543,615 L549,621 L556,643 L568,652 L579,644 L589,644 L595,650 L598,661 L609,664 L627,655 L647,654 L662,649 L664,638 L678,624 L687,600 L722,579 L739,548 L746,523 L769,514 L779,505 L776,491 L785,483 L799,461 L817,448 L811,445 L811,434 L816,424 L811,410 L812,399 L829,385 L855,376 L858,370 L841,358 L822,358 L818,353 L820,333 L816,339 L801,337 L779,321 L762,315 L759,306 L761,283 Z',
  },
  {
    id: 'kpk',
    d: 'M882,69 L875,65 L863,67 L857,53 L821,45 L791,55 L789,60 L773,56 L704,60 L681,68 L680,73 L658,87 L650,86 L647,94 L625,114 L636,121 L643,132 L643,143 L649,147 L646,166 L650,176 L643,189 L620,209 L620,216 L614,217 L622,229 L620,250 L606,258 L592,259 L553,253 L551,258 L557,269 L569,277 L575,301 L558,314 L532,318 L531,331 L525,336 L527,346 L517,356 L520,389 L534,390 L539,384 L548,383 L551,396 L556,397 L555,419 L561,427 L574,426 L573,442 L585,432 L603,431 L612,395 L633,359 L633,354 L622,347 L622,325 L639,318 L639,305 L647,305 L653,315 L655,295 L662,293 L672,269 L683,268 L685,256 L701,251 L708,262 L718,260 L719,269 L726,270 L743,262 L747,255 L757,253 L763,281 L763,313 L800,331 L800,323 L782,310 L790,285 L780,278 L780,270 L797,255 L776,251 L776,245 L782,241 L779,234 L770,231 L770,225 L780,207 L806,200 L835,209 L852,209 L876,219 L885,217 L895,207 L931,202 L937,190 L952,185 L939,144 L925,133 L925,126 L904,131 L900,120 L889,114 L895,100 L893,85 Z',
  },
]

function ProvincePopup({ province }) {
  return (
    <motion.aside
      key={province.id}
      initial={{ opacity: 0, y: 14, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.98 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="glass w-full rounded-3xl p-6 shadow-[0_0_40px_rgba(29,185,84,0.14)] md:p-7"
      role="status"
      aria-live="polite"
    >
      <p className="text-[10px] uppercase tracking-[0.35em] text-pk-mint">Province</p>
      <h4 className="display mt-2 text-3xl text-pk-cream">{province.name}</h4>

      <dl className="mt-5 grid grid-cols-2 gap-3">
        {[
          { label: 'Capital', value: province.capital },
          { label: 'Population', value: province.population },
          { label: 'Area', value: province.area },
        ].map((r) => (
          <div key={r.label} className="rounded-xl bg-white/[0.04] px-3 py-2.5">
            <dt className="text-[10px] uppercase tracking-wider text-pk-mist">{r.label}</dt>
            <dd className="mt-1 text-sm text-pk-cream">{r.value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-5 space-y-3 text-sm">
        <div>
          <p className="text-[10px] uppercase tracking-wider text-pk-mist">Major Cities</p>
          <p className="mt-1 text-pk-cream">{province.majorCities.join(' · ')}</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider text-pk-mist">Industries</p>
          <p className="mt-1 text-pk-cream">{province.industries.join(' · ')}</p>
        </div>
        <div className="border-t border-white/10 pt-3">
          <p className="text-[10px] uppercase tracking-wider text-pk-gold">Interesting Fact</p>
          <p className="mt-1 leading-relaxed text-pk-mist">{province.interestingFact}</p>
        </div>
      </div>
    </motion.aside>
  )
}

export default function PakistanMap() {
  const [activeId, setActiveId] = useState(null)
  const active = activeId ? provinceById[activeId] : null

  return (
    <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-start lg:gap-12">
      <div className="relative w-full max-w-md shrink-0">
        <div className="absolute inset-0 -z-10 rounded-full bg-[radial-gradient(circle,rgba(29,185,84,0.16),transparent_65%)] blur-2xl" />

        <div className="relative overflow-hidden rounded-2xl">
          <img
            src="/images/pakistan-map.png"
            alt="Map of Pakistan"
            className="block w-full select-none"
            draggable={false}
          />

          <svg
            viewBox="0 0 1000 959"
            className="absolute inset-0 h-full w-full"
            role="img"
            aria-label="Interactive provinces of Pakistan"
          >
            {HIT_AREAS.map((area) => {
              const isActive = activeId === area.id
              return (
                <motion.path
                  key={area.id}
                  d={area.d}
                  fill={isActive ? 'rgba(29,185,84,0.38)' : 'rgba(29,185,84,0)'}
                  stroke={isActive ? '#6ee7a8' : 'transparent'}
                  strokeWidth={isActive ? 2.5 : 0}
                  onMouseEnter={() => setActiveId(area.id)}
                  onMouseLeave={() => setActiveId(null)}
                  onFocus={() => setActiveId(area.id)}
                  onBlur={() => setActiveId(null)}
                  onClick={() => setActiveId(area.id)}
                  tabIndex={0}
                  role="button"
                  aria-label={provinceById[area.id].name}
                  style={{ cursor: 'pointer', outline: 'none' }}
                  animate={{
                    filter: isActive
                      ? 'drop-shadow(0 0 12px rgba(29,185,84,0.7))'
                      : 'drop-shadow(0 0 0 rgba(0,0,0,0))',
                  }}
                  transition={{ duration: 0.22 }}
                />
              )
            })}
          </svg>
        </div>

        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {provinces.map((p) => (
            <button
              key={p.id}
              type="button"
              data-cursor="hover"
              onMouseEnter={() => setActiveId(p.id)}
              onMouseLeave={() => setActiveId(null)}
              onFocus={() => setActiveId(p.id)}
              onBlur={() => setActiveId(null)}
              onClick={() => setActiveId(p.id)}
              className={`rounded-full px-3 py-1.5 text-[11px] transition-colors ${
                activeId === p.id
                  ? 'bg-pk-mint/20 text-pk-mint'
                  : 'bg-white/[0.04] text-pk-mist hover:text-pk-cream'
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      <div className="flex min-h-[260px] w-full flex-1 items-center">
        <AnimatePresence mode="wait">
          {active ? (
            <ProvincePopup province={active} />
          ) : (
            <motion.p
              key="hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="glass w-full rounded-3xl px-6 py-10 text-center text-sm text-pk-mist"
            >
              Hover a province on the map to explore its details.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
