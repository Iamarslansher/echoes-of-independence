/** Scroll-synced historical journey milestones */
export const timelineYears = [
  { year: '1857', id: 'before', label: 'War of Independence', mood: 'sepia' },
  { year: '1906', id: 'before', label: 'Muslim League', mood: 'sepia' },
  { year: '1930', id: 'before', label: "Iqbal's Vision", mood: 'sepia' },
  { year: '1940', id: 'movement', label: 'Lahore Resolution', mood: 'sepia' },
  { year: '1947', id: 'independence', label: 'Independence', mood: 'midnight' },
  { year: '1948', id: 'migration', label: 'Migration', mood: 'dawn' },
  { year: '1965', id: 'wars', label: '1965 War', mood: 'solemn' },
  { year: '1971', id: 'wars', label: '1971', mood: 'solemn' },
  { year: '1999', id: 'wars', label: 'Kargil', mood: 'solemn' },
  { year: 'Today', id: 'current', label: 'Digital Pakistan', mood: 'green' },
  { year: '2050', id: 'future', label: 'Future Horizon', mood: 'neon' },
]

export const timeMachineYears = [
  { year: '1857', id: 'before', mood: 'sepia', blurb: 'The War of Independence begins.' },
  { year: '1906', id: 'before', mood: 'sepia', blurb: 'The All-India Muslim League is founded.' },
  { year: '1930', id: 'before', mood: 'sepia', blurb: "Iqbal's Allahabad Address envisions a Muslim homeland." },
  { year: '1940', id: 'movement', mood: 'sepia', blurb: 'The Lahore Resolution is adopted.' },
  { year: '1947', id: 'independence', mood: 'midnight', blurb: 'Pakistan is born at midnight.' },
  { year: '1948', id: 'migration', mood: 'dawn', blurb: 'Millions cross new borders.' },
  { year: '1956', id: 'achievements', mood: 'dawn', blurb: "Pakistan's first constitution is adopted." },
  { year: '1965', id: 'wars', mood: 'solemn', blurb: 'The second war with India.' },
  { year: '1971', id: 'wars', mood: 'solemn', blurb: 'A profound turning point; East Pakistan becomes Bangladesh.' },
  { year: '1973', id: 'achievements', mood: 'dawn', blurb: 'A new consensus constitution is adopted.' },
  { year: '1998', id: 'achievements', mood: 'dawn', blurb: 'Pakistan tests nuclear capability at Chagai.' },
  { year: '2005', id: 'challenges', mood: 'solemn', blurb: 'A devastating earthquake tests national resilience.' },
  { year: '2010', id: 'challenges', mood: 'solemn', blurb: 'Catastrophic floods affect millions nationwide.' },
  { year: '2013', id: 'current', mood: 'green', blurb: "A civilian government completes a full term for the first time power transfers peacefully." },
  { year: '2020', id: 'current', mood: 'green', blurb: 'A digitally-connected generation begins reshaping the economy.' },
  { year: 'Today', id: 'current', mood: 'green', blurb: 'Digital Pakistan, in progress.' },
  { year: '2050', id: 'future', mood: 'neon', blurb: 'A future horizon still being written.' },
]

export const moodStyles = {
  night: 'radial-gradient(ellipse at 50% 0%, rgba(1,65,28,0.35), transparent 55%), #010b05',
  sepia: 'radial-gradient(ellipse at 40% 20%, rgba(139,90,43,0.28), transparent 50%), #120e08',
  midnight: 'radial-gradient(ellipse at 50% 30%, rgba(201,162,39,0.18), transparent 45%), #02040a',
  dawn: 'radial-gradient(ellipse at 70% 10%, rgba(201,162,39,0.22), transparent 50%), #0a120c',
  solemn: 'radial-gradient(ellipse at 50% 40%, rgba(80,90,70,0.2), transparent 55%), #050805',
  green: 'radial-gradient(ellipse at 50% 0%, rgba(29,185,84,0.28), transparent 50%), #021a0c',
  neon: 'radial-gradient(ellipse at 60% 80%, rgba(29,185,84,0.35), transparent 45%), radial-gradient(ellipse at 20% 20%, rgba(110,231,168,0.12), transparent 40%), #010b05',
  space: 'radial-gradient(ellipse at 50% 50%, rgba(20,40,80,0.35), transparent 55%), #010308',
}
