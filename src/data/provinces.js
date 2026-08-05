/** Custom province data for the interactive Pakistan map (4 provinces). */
export const provinces = [
  {
    id: 'punjab',
    name: 'Punjab',
    capital: 'Lahore',
    population: '127 Million',
    area: '205,344 km²',
    majorCities: ['Lahore', 'Faisalabad', 'Rawalpindi', 'Multan'],
    industries: ['Agriculture', 'Textiles', 'Manufacturing', 'IT'],
    interestingFact: "Punjab is Pakistan's most populous province.",
  },
  {
    id: 'sindh',
    name: 'Sindh',
    capital: 'Karachi',
    population: '55.7 Million',
    area: '140,914 km²',
    majorCities: ['Karachi', 'Hyderabad', 'Sukkur', 'Larkana'],
    industries: ['Ports & Trade', 'Finance', 'Textiles', 'Energy'],
    interestingFact: 'Sindh is home to Karachi — Pakistan’s largest city and main seaport.',
  },
  {
    id: 'kpk',
    name: 'Khyber Pakhtunkhwa',
    capital: 'Peshawar',
    population: '40.9 Million',
    area: '101,741 km²',
    majorCities: ['Peshawar', 'Mardan', 'Abbottabad', 'Swat'],
    industries: ['Tourism', 'Agriculture', 'Mining', 'IT'],
    interestingFact: 'Khyber Pakhtunkhwa is the historic gateway to Central Asia through the Khyber Pass.',
  },
  {
    id: 'balochistan',
    name: 'Balochistan',
    capital: 'Quetta',
    population: '14.9 Million',
    area: '347,190 km²',
    majorCities: ['Quetta', 'Gwadar', 'Turbat', 'Khuzdar'],
    industries: ['Mining', 'Energy', 'Fisheries', 'Port Logistics'],
    interestingFact: 'Balochistan is Pakistan’s largest province by area and home to Gwadar Port.',
  },
]

export const provinceById = Object.fromEntries(provinces.map((p) => [p.id, p]))
