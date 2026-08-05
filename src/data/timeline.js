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
  { year: '1947', id: 'independence', mood: 'midnight' },
  { year: '1965', id: 'wars', mood: 'solemn' },
  { year: '1990', id: 'achievements', mood: 'dawn' },
  { year: '2025', id: 'current', mood: 'green' },
  { year: '2050', id: 'future', mood: 'neon' },
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
