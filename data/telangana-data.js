/**
 * VectorGuard - Telangana Regional GIS, Municipal & Vector Science Dataset
 * Smart India Hackathon 2026 | Problem Statement ID: SIH26200
 * Team: VectorGuard
 */

const TELANGANA_DATA = {
  // Key Water Bodies in Telangana (Lakes, Cheruvus, Tanks, River corridors)
  waterBodies: [
    {
      id: 'wb-hussain-sagar',
      name: 'Hussain Sagar Lake',
      region: 'Central Hyderabad (Khairatabad/Secunderabad)',
      lat: 17.4239,
      lng: 78.4738,
      type: 'Urban Natural Lake / Catchment Basin',
      areaSqKm: 5.7,
      surfaceCondition: 'Peripheral Stagnation & Hyacinth Growth',
      vectorBreedingRisk: 'High',
      primaryThreatVectors: ['Culex quinquefasciatus (Filariasis)', 'Aedes aegypti (Dengue)'],
      recommendedBiotechAction: 'Bti (Bacillus thuringiensis israelensis) liquid biological formulation spraying along shoreline inlet canals; drone-assisted larvicide delivery over hyacinth clusters.',
      physicalRemediation: 'Mechanical clearing of floating weed mats, clearing inlet nullah obstructions, installing aerator fountains.',
      jurisdiction: 'GHMC Khairatabad & Secunderabad Zones / HMDA',
      contactPhone: '040-21111111'
    },
    {
      id: 'wb-durgam-cheruvu',
      name: 'Durgam Cheruvu (Secret Lake)',
      region: 'Hitec City / Madhapur (Serilingampally Zone)',
      lat: 17.4326,
      lng: 78.3888,
      type: 'Rock-bound Freshwater Lake',
      areaSqKm: 0.65,
      surfaceCondition: 'Treated Water Buffer with Stagnant Shoreline Inlets',
      vectorBreedingRisk: 'Moderate',
      primaryThreatVectors: ['Aedes aegypti (Dengue, Chikungunya)', 'Culex pipiens'],
      recommendedBiotechAction: 'Targeted release of Gambusia affinis (larvivorous fish) along perimeter bio-zones; Bti strain AM 65-52 granular application around storm culverts.',
      physicalRemediation: 'Perimeter reed bed trimming and storm-water filter maintenance.',
      jurisdiction: 'GHMC Serilingampally Zone / HMDA',
      contactPhone: '040-21111111'
    },
    {
      id: 'wb-osman-sagar',
      name: 'Osman Sagar (Gandipet)',
      region: 'West Hyderabad / Ranga Reddy',
      lat: 17.3789,
      lng: 78.2995,
      type: 'Major Drinking Water Reservoir',
      areaSqKm: 29.0,
      surfaceCondition: 'Clean Open Waters with Shaded Shoreline Pockets',
      vectorBreedingRisk: 'Low to Moderate',
      primaryThreatVectors: ['Anopheles culicifacies (Malaria)'],
      recommendedBiotechAction: 'Biological ecological surveillance; biological control with native fish stocks (Poecilia reticulata) near village perimeter intakes.',
      physicalRemediation: 'Shoreline vegetation de-weeding and silt monitoring.',
      jurisdiction: 'HMWSSB / Ranga Reddy Collectorate',
      contactPhone: '040-23431100'
    },
    {
      id: 'wb-himayat-sagar',
      name: 'Himayat Sagar',
      region: 'Rajendranagar / South Hyderabad',
      lat: 17.3184,
      lng: 78.3582,
      type: 'Drinking Water Reservoir / Catchment Basin',
      areaSqKm: 21.5,
      surfaceCondition: 'Seasonal Water Margins & Irrigation Outlets',
      vectorBreedingRisk: 'Moderate',
      primaryThreatVectors: ['Anopheles stephensi (Urban Malaria)', 'Culex'],
      recommendedBiotechAction: 'Larvivorous bio-controls in backwater irrigation distributaries; quarterly bio-larvicide spraying in seasonal pools.',
      physicalRemediation: 'Clearing stagnant check-dams and agricultural backflow ditches.',
      jurisdiction: 'HMWSSB / Rajendranagar Municipal Circle',
      contactPhone: '040-21111111'
    },
    {
      id: 'wb-saroornagar',
      name: 'Saroornagar Lake',
      region: 'LB Nagar / East Hyderabad',
      lat: 17.3551,
      lng: 78.5305,
      type: 'Urban Water Tank',
      areaSqKm: 1.0,
      surfaceCondition: 'Sewage Inflow Stagnation & Floating Debris',
      vectorBreedingRisk: 'High',
      primaryThreatVectors: ['Culex quinquefasciatus', 'Aedes aegypti'],
      recommendedBiotechAction: 'Immediate high-concentration Bacillus sphaericus (Bs) or Bti microbial larvicide application; eco-friendly biological enzyme water treatment.',
      physicalRemediation: 'Diverting untreated sewage entering through feeder nullahs, urgent floating aeration.',
      jurisdiction: 'GHMC LB Nagar Zone',
      contactPhone: '040-21111111'
    },
    {
      id: 'wb-mir-alam',
      name: 'Mir Alam Tank',
      region: 'Bahadurpura / Old City Hyderabad',
      lat: 17.3516,
      lng: 78.4418,
      type: 'Historic Masonry Multi-Arch Tank',
      areaSqKm: 1.6,
      surfaceCondition: 'Heavy Weed Overgrowth & Low Surface Movement',
      vectorBreedingRisk: 'High',
      primaryThreatVectors: ['Culex quinquefasciatus', 'Anopheles stephensi'],
      recommendedBiotechAction: 'Heavy biocontrol deployment: mass introduction of Gambusia fish fingerlings; bi-weekly Bti larvicide dusting along zoo-adjacent wetlands.',
      physicalRemediation: 'Manual and harvester removal of water hyacinth mats and bank cleaning.',
      jurisdiction: 'GHMC Charminar Zone',
      contactPhone: '040-21111111'
    },
    {
      id: 'wb-fox-sagar',
      name: 'Fox Sagar Lake (Jeedimetla)',
      region: 'Kukatpally / Medchal-Malkajgiri',
      lat: 17.5147,
      lng: 78.4725,
      type: 'Historic Water Body near Industrial Zone',
      areaSqKm: 2.0,
      surfaceCondition: 'Industrial Drainage Seepage & Perimeter Pools',
      vectorBreedingRisk: 'High',
      primaryThreatVectors: ['Culex species', 'Aedes aegypti'],
      recommendedBiotechAction: 'Targeted microbial larvicide (Bti WDG) applications along discharge channels; weekly anti-larval oil (MLO) application in non-potable puddles.',
      physicalRemediation: 'Enclosure fencing, clearing silt traps, desilting of downstream surplus weirs.',
      jurisdiction: 'GHMC Kukatpally Zone',
      contactPhone: '040-21111111'
    },
    {
      id: 'wb-kapra',
      name: 'Kapra Lake',
      region: 'Kushaiguda / Secunderabad East',
      lat: 17.4878,
      lng: 78.5638,
      type: 'Urban Fresh Water Wetland',
      areaSqKm: 0.45,
      surfaceCondition: 'Perimeter Reed Beds and Storm Drain Confluence',
      vectorBreedingRisk: 'Moderate',
      primaryThreatVectors: ['Aedes aegypti', 'Anopheles'],
      recommendedBiotechAction: 'Biological control utilizing indigenous fish varieties; Bti briquette placement in culverts and stormwater catch basins.',
      physicalRemediation: 'Clearing solid plastic waste trapped in perimeter storm mesh.',
      jurisdiction: 'GHMC Secunderabad Zone / Kapra Circle',
      contactPhone: '040-21111111'
    },
    {
      id: 'wb-musi-river',
      name: 'Musi River Urban Stretch',
      region: 'Hyderabad Urban Corridor (Afzal Gunj - Amberpet)',
      lat: 17.3753,
      lng: 78.4812,
      type: 'Urban River Channel & Stagnant Pools',
      areaSqKm: 12.0,
      surfaceCondition: 'Slow Velocity Flow, High Organic Stagnation Pools',
      vectorBreedingRisk: 'Critical / Very High',
      primaryThreatVectors: ['Culex quinquefasciatus (Filariasis & Encephalitis risk)', 'Aedes'],
      recommendedBiotechAction: 'Continuous drone-based Bti biological spraying; deployment of micro-larvicidal biological formulations into all sluggish eddies and back-channels.',
      physicalRemediation: 'Channel dredging, flushing of stagnant backwaters, clearing wild riverbank brush.',
      jurisdiction: 'Musi Riverfront Development Corporation (MRDCL) / GHMC',
      contactPhone: '040-21111111'
    },
    {
      id: 'wb-bhadrakali',
      name: 'Bhadrakali Lake',
      region: 'Warangal Urban',
      lat: 17.9863,
      lng: 79.5786,
      type: 'Historic Urban Reservoir & Geo-heritage Lake',
      areaSqKm: 2.2,
      surfaceCondition: 'Bund Stagnation & Temple Inflow Drainage',
      vectorBreedingRisk: 'Moderate',
      primaryThreatVectors: ['Aedes aegypti (Dengue)', 'Anopheles'],
      recommendedBiotechAction: 'Eco-friendly Gambusia affinis stocking near temple ghat bunds; weekly Bti micro-spray along marshy bird-sanctuary shallows.',
      physicalRemediation: 'Periodic bund weed clearing, municipal anti-larval team inspections.',
      jurisdiction: 'Greater Warangal Municipal Corporation (GWMC)',
      contactPhone: '1800-425-1980'
    },
    {
      id: 'wb-lower-manair',
      name: 'Lower Manair Dam (LMD Reservoir)',
      region: 'Karimnagar Outskirts',
      lat: 18.4116,
      lng: 79.1354,
      type: 'Large River Dam & Irrigation Reservoir',
      areaSqKm: 34.0,
      surfaceCondition: 'Expansive Shorelines with Canals & Sluice Pools',
      vectorBreedingRisk: 'Moderate',
      primaryThreatVectors: ['Anopheles culicifacies (Rural Malaria)'],
      recommendedBiotechAction: 'Canal sluice biological monitoring; seeding natural predatory aquatic fauna in sluggish secondary canal channels.',
      physicalRemediation: 'Weed clearing at canal regulators, preventing standing irrigation puddles.',
      jurisdiction: 'Karimnagar Municipal Corporation / Irrigation Dept',
      contactPhone: '0878-2244240'
    },
    {
      id: 'wb-alisagar',
      name: 'Alisagar Deer Park Lake',
      region: 'Nizamabad Rural',
      lat: 18.7239,
      lng: 78.0163,
      type: 'Forest Wetland & Irrigation Lake',
      areaSqKm: 1.8,
      surfaceCondition: 'Forested Margin Stagnation & Natural Marshes',
      vectorBreedingRisk: 'Low to Moderate',
      primaryThreatVectors: ['Anopheles species', 'Mansonia'],
      recommendedBiotechAction: 'Conservation-grade biological controls: preserve aquatic beetle and dragonfly nymph populations; zero chemical runoff policy.',
      physicalRemediation: 'Clearing excess fallen leaf litter dams in natural streams.',
      jurisdiction: 'Nizamabad Municipal Corporation / Forest Dept',
      contactPhone: '08462-220042'
    }
  ],

  // Preset Telangana Quick-Select Coordinates
  telanganaPresets: [
    { name: 'Hussain Sagar, Hyderabad', lat: 17.4239, lng: 78.4738, ward: 'Khairatabad Zone 10', district: 'Hyderabad' },
    { name: 'Durgam Cheruvu / Hitec City', lat: 17.4326, lng: 78.3888, ward: 'Serilingampally Zone 20', district: 'Hyderabad' },
    { name: 'Secunderabad Railway Station / Mettuguda', lat: 17.4399, lng: 78.5018, ward: 'Secunderabad Zone 28', district: 'Hyderabad' },
    { name: 'Charminar / Old City', lat: 17.3616, lng: 78.4747, ward: 'Charminar Zone 14', district: 'Hyderabad' },
    { name: 'Kukatpally Housing Board (KPHB)', lat: 17.4947, lng: 78.3996, ward: 'Kukatpally Zone 24', district: 'Medchal-Malkajgiri' },
    { name: 'LB Nagar / Saroornagar', lat: 17.3551, lng: 78.5305, ward: 'LB Nagar Zone 5', district: 'Ranga Reddy' },
    { name: 'Warangal (Bhadrakali)', lat: 17.9863, lng: 79.5786, ward: 'GWMC Ward 18', district: 'Warangal' },
    { name: 'Karimnagar Central', lat: 18.4386, lng: 79.1288, ward: 'KMC Ward 12', district: 'Karimnagar' },
    { name: 'Nizamabad Urban', lat: 18.6725, lng: 78.0941, ward: 'NMC Ward 7', district: 'Nizamabad' },
    { name: 'Khammam Fort & Wyra Basin', lat: 17.2473, lng: 80.1514, ward: 'KMC Ward 9', district: 'Khammam' }
  ],

  // Telangana Municipal & Grievance Portals
  grievancePortals: [
    {
      id: 'ghmc-portal',
      name: 'GHMC Citizen Grievance Portal',
      description: 'Official Greater Hyderabad Municipal Corporation complaint redressal system for vector control, sanitation, drainage & civic emergencies.',
      url: 'https://www.ghmc.gov.in/',
      helpline: '040-21111111',
      mobileApp: 'MyGHMC App (Android & iOS)',
      whatsappNumber: '918008888000',
      avgResolutionHours: '24 - 48 Hours',
      coverage: 'Greater Hyderabad Area (150 Municipal Wards)'
    },
    {
      id: 'prajavani-telangana',
      name: 'Telangana Prajavani Grievance Portal',
      description: 'Apex citizen engagement platform established by the Government of Telangana for district-level official redressal and monitoring.',
      url: 'https://prajavani.telangana.gov.in/',
      helpline: '1902 / 1100',
      mobileApp: 'Telangana Citizen Services',
      whatsappNumber: null,
      avgResolutionHours: '48 - 72 Hours',
      coverage: 'All 33 Districts of Telangana State'
    },
    {
      id: 'cdma-telangana',
      name: 'C&DMA Commissioner & Director of Municipal Administration',
      description: 'Direct citizen grievance portal covering all 142 Urban Local Bodies (ULBs) and Municipalities across Telangana.',
      url: 'https://cdma.cgg.gov.in/',
      helpline: '040-23302150',
      mobileApp: 'Puraseva Telangana App',
      whatsappNumber: null,
      avgResolutionHours: '24 - 72 Hours',
      coverage: 'All Telangana Municipalities & Corporations (Warangal, Karimnagar, Nizamabad, etc.)'
    },
    {
      id: 'health-helpline-104',
      name: 'Telangana Health & Medical Emergency Helpline (104)',
      description: 'Direct telephonic health advisory for high fever, suspected Dengue/Malaria symptoms, and vector containment dispatch.',
      url: 'https://chfw.telangana.gov.in/',
      helpline: '104',
      mobileApp: null,
      whatsappNumber: null,
      avgResolutionHours: 'Immediate Tele-Consultation',
      coverage: 'Statewide 24x7 Public Health Response'
    }
  ],

  // Grievance Issue Categories (Beyond Mosquitoes too)
  grievanceCategories: [
    {
      id: 'cat-mosquito-infestation',
      label: 'Mosquito Infestation & Larvae Stagnation',
      dept: 'Entomology & Vector Control Wing (GHMC/C&DMA)',
      sla: '24 Hours',
      defaultDescription: 'Severe mosquito breeding observed due to water accumulation and unmaintained open drainage. High risk of vector-borne illness transmission.'
    },
    {
      id: 'cat-open-drainage',
      label: 'Open Sewage Overflow & Blocked Storm Nullah',
      dept: 'Engineering & Drainage Department',
      sla: '24 Hours',
      defaultDescription: 'Overflowing storm drain / open sewer causing standing blackwater, foul odor, and acute vector breeding.'
    },
    {
      id: 'cat-waterlogging',
      label: 'Rainwater Waterlogging on Roads / Vacant Plots',
      dept: 'Disaster Response & Urban Maintenance',
      sla: '12 - 24 Hours',
      defaultDescription: 'Severe waterlogging persisting for over 48 hours in public road/vacant layout, creating ideal oviposition habitat for Aedes mosquitoes.'
    },
    {
      id: 'cat-garbage-dump',
      label: 'Unattended Garbage Dump & Plastic Accumulation',
      dept: 'Sanitation & Solid Waste Management',
      sla: '24 Hours',
      defaultDescription: 'Uncollected plastic containers, tires, and domestic waste accumulating water pockets and sheltering adult vector swarms.'
    },
    {
      id: 'cat-drinking-water',
      label: 'Drinking Water Pipeline Leakage & Puddle Stagnation',
      dept: 'Water Works (HMWSSB / Rural Water Supply)',
      sla: '12 Hours',
      defaultDescription: 'Continuous drinking water pipeline breach creating clean freshwater puddles ideal for Anopheles stephensi malaria breeding.'
    },
    {
      id: 'cat-civic-general',
      label: 'General Civic / Street Sanitation Failure',
      dept: 'Ward Administrative Office',
      sla: '48 Hours',
      defaultDescription: 'General municipal hygiene and sanitation failure requiring urgent municipal ward officer intervention.'
    }
  ],

  // Educational Knowledge Base Articles
  educationalArticles: [
    {
      id: 'article-vector-biology',
      title: 'Vector Biology: Distinguishing Aedes, Anopheles, and Culex Mosquitoes',
      category: 'Scientific Taxonomy & Epidemiology',
      readTime: '4 min read',
      publishedDate: '10 September 2026',
      author: 'VectorGuard Scientific Advisory Board',
      excerpt: 'Understanding the biological behavior, feeding windows, and aquatic breeding niches of the three primary disease-transmitting mosquito genera in India.',
      content: `
### The Triad of Urban Disease Vectors

Mosquitoes are not homogenous; across the Indian subcontinent and particularly within rapidly urbanizing states like Telangana, three distinct genera account for virtually all vector-borne disease transmission: **Aedes**, **Anopheles**, and **Culex**. Accurately diagnosing which vector is present is the critical first step in targeted environmental containment.

---

### 1. *Aedes aegypti* (The "Tiger" Mosquito)
- **Primary Pathogens Transmitted:** Dengue virus (DENV 1-4), Chikungunya alphavirus, Zika virus, Yellow Fever.
- **Distinguishing Anatomy:** Distinctive white lyre-shaped markings on the thorax and white bands on the tarsal leg segments.
- **Biting Behavior:** Exclusively diurnal (day-biting), with peak aggressive feeding windows occurring **2 to 3 hours after sunrise** and **2 hours prior to sunset**. They are anthropophilic, preferentially feeding on human lower limbs and ankles.
- **Breeding Micro-Habitat:** Clean, artificial, man-made containers. They oviposit eggs on the damp inner walls of discarded plastic cups, vehicle tires, flower pot trays, overhead tanks, and evaporative desert coolers. Their desiccation-resistant eggs can survive dry for over 9 months, hatching immediately when submerged in water.

---

### 2. *Anopheles stephensi* & *culicifacies* (Malaria Vectors)
- **Primary Pathogens Transmitted:** *Plasmodium falciparum* and *Plasmodium vivax* (Malaria parasites).
- **Distinguishing Anatomy:** When resting, the abdomen is held at an acute 45-degree angle to the resting surface, rather than parallel. Wings possess discrete dark and light scale clusters.
- **Biting Behavior:** Strictly nocturnal and crepuscular, feeding from dusk through the midnight hours.
- **Breeding Micro-Habitat:** *Anopheles stephensi* is uniquely adapted to urban environments, breeding in overhead masonry tanks, construction site curing water, fountains, and clean, oxygenated freshwater pools. In contrast, *Anopheles culicifacies* predominates in rural riverbeds, irrigation channels, and agricultural runoff.

---

### 3. *Culex quinquefasciatus* (Filariasis & Encephalitis Vector)
- **Primary Pathogens Transmitted:** *Wuchereria bancrofti* (Lymphatic Filariasis / Elephantiasis), Japanese Encephalitis virus, West Nile virus.
- **Distinguishing Anatomy:** Uniform brownish-grey body with blunt abdomen tip; rests parallel to the surface.
- **Biting Behavior:** High nocturnal activity inside homes, producing a high-pitched buzzing tone near human ears during sleep.
- **Breeding Micro-Habitat:** Heavily polluted, organically rich, stagnant water bodies—notably open sewage drains, septic tanks, cesspools, and sewage-polluted urban lake perimeters (such as parts of the Musi River and stagnant feeder nullahs).

---

### Key Takeaway for Citizens
If you are being bitten during morning office hours or late afternoon around your desk, look for stagnant fresh water in domestic containers (*Aedes*). If biting occurs late at night and originates from outdoor drainage or street ditches, it is almost certainly *Culex*.
      `,
      actionPoints: [
        'Inspect indoor plant saucers, feng shui plants, and AC condensation trays weekly for Aedes wrigglers.',
        'Cover overhead sintex tanks with airtight lids and fine brass wire-mesh (18-mesh) over overflow pipes.',
        'Apply biological larvicides or soap film to stagnant drain water to suffocate Culex egg rafts.'
      ]
    },
    {
      id: 'article-biotech-larvicides',
      title: 'Biotechnology in Vector Control: The Science Behind Bacillus thuringiensis israelensis (Bti)',
      category: 'Biotechnology & Microbial Pest Management',
      readTime: '5 min read',
      publishedDate: '10 September 2026',
      author: 'Biotech Division, VectorGuard',
      excerpt: 'How crystalline delta-endotoxin proteins from soil bacteria eliminate mosquito larvae with surgical precision without harming fish, pets, or human water supplies.',
      content: `
### Beyond Chemical Insecticides: The Biological Revolution

For decades, municipal vector control relied heavily on organophosphates (like Temephos, Malathion) and synthetic pyrethroids. While effective initially, extensive widespread application triggered two catastrophic unintended consequences: **physiological insecticide resistance** among mosquito strains and **environmental toxicity** toward non-target aquatic organisms (such as dragonflies, honeybees, and freshwater fish).

The modern gold standard recognized by the **World Health Organization (WHO)** and India's **National Vector Borne Disease Control Programme (NVBDCP)** is microbial biotechnology, centered upon **Bacillus thuringiensis subspecies israelensis (Bti)**.

---

### The Molecular Mechanism of Action

Bti is a naturally occurring gram-positive, spore-forming soil bacterium. During its sporulation phase, it biosynthesizes a parasporal crystalline inclusion body containing four major protoxin proteins: **Cry4Aa, Cry4Ba, Cry11Aa**, and **Cyt1Aa**.

1. **Selective Ingestion:** Mosquito and blackfly larvae are non-selective filter feeders. They actively ingest the suspended microscopic Bti protein crystals in water.
2. **Alkaline Activation:** Unlike humans and fish whose gastric systems are neutral to acidic, the larval midgut is uniquely **hyper-alkaline (pH > 9.0)**. This high pH dissolves the crystalline protoxins into active toxin peptides.
3. **Midgut Perforation:** Specific gut enzymes (proteases) cleave the proteins, allowing them to bind exclusively to specific receptor molecules found only on the microvillar membrane of mosquito midgut epithelial cells.
4. **Pore Formation & Lysis:** Cyt1Aa and Cry toxins assemble into transmembrane pores, causing rapid ion leakage, colloid-osmotic swelling, gut wall rupture, and complete larval mortality within **2 to 24 hours**.

---

### Why Bti is 100% Eco-Safe

- **Target Specificity:** Mammals, birds, adult insects, amphibians, and fish lack both the hyper-alkaline gut chemistry and the specific cell-surface receptors required for Bti binding. The crystals pass through human gastrointestinal tracts completely inert.
- **Zero Chemical Runoff:** Bti breaks down naturally under sunlight (photodegradation) within 48 to 72 hours, leaving no synthetic carcinogenic residues or heavy metal accumulation in lake sediments.
- **Overcoming Resistance:** Because Bti delivers four distinct toxin proteins that act synergistically, mosquitoes cannot easily develop resistance through single-gene mutations—making Bti formulations reliable year after year.

---

### Application in Telangana Urban Bodies
In urban water bodies like Hussain Sagar and Durgam Cheruvu, GHMC entomology teams deploy Bti in two primary physical formulations:
- **Liquid Concentrates (WDG/SC):** Applied via motorized knapsack sprayers or agricultural drones across expansive open water hyacinth mats.
- **Slow-Release Briquettes / Granules (Dunks):** Placed in storm drains, culverts, and ornamental fountains where they slowly release spores over a 30-day window, preventing larval emergence.
      `,
      actionPoints: [
        'Use WHO-certified Bti granules (0.5 to 1 g per 100 liters) in stagnant water tanks, ornamental ponds, and rooftop drains.',
        'Always apply Bti during the early 1st to 3rd larval instar stages for maximum 100% mortality.',
        'Do not mix Bti with high-chlorine water, as free chlorine degrades bacterial protein viability.'
      ]
    },
    {
      id: 'article-biological-control',
      title: 'Biological Larvivorous Control: Utilizing Gambusia and Guppy Populations in Urban Water Bodies',
      category: 'Ecological Engineering & Biocontrol',
      readTime: '4 min read',
      publishedDate: '10 September 2026',
      author: 'Ecological Health Wing, VectorGuard',
      excerpt: 'Deploying topminnows (Gambusia affinis) and guppies (Poecilia reticulata) as perpetual self-sustaining biological sentinels against mosquito breeding.',
      content: `
### Nature's Natural Predators: The Ecological Defense Grid

In large freshwater ecosystems such as lakes (*cheruvus*), agricultural village tanks, and unused open wells, repetitive spraying of chemical larvicides is economically unfeasible and ecologically destructive. Here, biological control via **larvivorous fish** provides a perpetual, self-sustaining barrier against vector outbreaks.

---

### 1. *Gambusia affinis* (The Western Mosquitofish)
- **Feeding Capacity:** A single adult female *Gambusia* can consume between **100 and 200 mosquito larvae and pupae every single day**.
- **Surface Feeding Adaptation:** *Gambusia* possess an upturned, superior mouth and flattened head anatomically engineered to feed on the surface film of water where mosquito larvae hang from their breathing siphons.
- **Tolerance & Hardiness:** They can survive in temperatures ranging from 5°C to 40°C and tolerate moderate salinity and turbidity.
- **Reproduction:** Viviparous (give birth to live young rather than laying eggs), multiplying rapidly within 4 to 6 weeks of release.

---

### 2. *Poecilia reticulata* (Guppy)
- **Organically Rich Water Specialist:** While *Gambusia* prefer cleaner surface waters, guppies demonstrate remarkable tolerance to polluted, stagnant water with low dissolved oxygen.
- **Ideal Deployment Sites:** Urban open drains, slow-moving sewage nullahs, construction sump pits, and perimeter trenches around Hyderabad and Secunderabad.

---

### Telangana State Hatchery Network
The Fisheries Department of Telangana, in coordination with the GHMC Urban Malaria Scheme, maintains specialized breeding hatcheries across Hyderabad (including Shanthi Nagar and Hussainsagar nurseries). Residents and resident welfare associations (RWAs) can obtain larvivorous fish batches free of charge for introduction into apartment basements, water harvesting pits, and community ponds.
      `,
      actionPoints: [
        'Stock open rainwater harvesting wells and residential sump tanks with 5 to 10 Gambusia fish per square meter.',
        'Never release non-native Gambusia into natural wild forest rivers or fragile native trout/minnow reserves.',
        'Ensure water surface is cleared of thick plastic blankets so fish can navigate freely to larvae.'
      ]
    },
    {
      id: 'article-sunday-dry-day',
      title: 'The Sunday Dry Day Protocol: Eliminating Indoor and Peridomestic Breeding Reservoirs',
      category: 'Community Hygiene & Citizen Action',
      readTime: '3 min read',
      publishedDate: '10 September 2026',
      author: 'Community Engagement Team, VectorGuard',
      excerpt: 'A step-by-step 15-minute weekly household routine to interrupt the 7-to-10 day aquatic life cycle of Dengue-carrying Aedes mosquitoes.',
      content: `
### Why One Day a Week Stops Dengue in Its Tracks

The life cycle of the *Aedes* mosquito—from egg deposition to larva, pupa, and adult flying insect—requires approximately **7 to 10 days** under warm Indian climatic conditions. 

If every citizen empties, cleans, and dries water-holding vessels just **once every 7 days (Sunday Dry Day)**, the biological cycle is irreversibly broken. Even if female mosquitoes lay eggs on Monday, the larvae will dehydrate and perish before they can reach adulthood.

---

### The 7-Point Sunday Inspection Checklist

1. **Evaporative Air Coolers:** Drain all water completely. Scrub the inner metal/plastic tray with detergent and a rough cloth to dislodge gelatinous *Aedes* egg rafts. Allow tray to dry in direct sunlight for 2 hours before refilling.
2. **Indoor Feng Shui Plants & Bamboo Vases:** Discard standing water completely. Wash plant stems and stones under running water; replace with fresh water weekly.
3. **Refrigerator Defrost Trays:** Inspect the hidden condensation tray behind or under the refrigerator. This warm, dark reservoir is one of Hyderabad's most common unaddressed indoor breeding sources.
4. **Flower Pot Drip Trays:** Empty water accumulated under potted plants on balconies. Alternatively, fill drip trays with coarse sand to absorb moisture without leaving standing puddles.
5. **Overhead Water Tanks & Sumps:** Ensure manhole covers are hermetically sealed with rubber gaskets. Check that vent pipes are capped with intact mosquito-proof wire mesh.
6. **Terraces & Balcony Sunshades:** Clear clogged rainwater outlet spouts. Discard coconut shells, cracked plastic mugs, disposable coffee cups, and unsealed paint cans.
7. **Used Vehicle Tires:** Tires stored in garage yards are notorious vector hotspots. Drill large drainage holes in the lowest tread point or store them completely under waterproof tarpaulins.
      `,
      actionPoints: [
        'Dedicate every Sunday morning from 9:00 AM to 9:30 AM to home container inspection.',
        'Remember: Scrubbing surfaces is essential because mosquito eggs cling firmly to vessel rims.',
        'Involve apartment Resident Welfare Associations (RWAs) to synchronize dry days across entire complexes.'
      ]
    },
    {
      id: 'article-telangana-protocol',
      title: 'Municipal Vector Management: Telangana Urban Malaria Scheme & Drone Surveillance',
      category: 'Public Health Infrastructure',
      readTime: '4 min read',
      publishedDate: '10 September 2026',
      author: 'GHMC Entomology Directorate & VectorGuard',
      excerpt: 'An inside look at how municipal entomologists, automated drone fleets, and GIS-mapped ward teams monitor and neutralize disease vectors across Telangana.',
      content: `
### The Municipal Defense Machinery: Behind the Scenes

Managing vector populations in a bustling metropolitan area of over 10 million people requires rigorous logistical coordination between entomologists, field spraying squads, and GIS tracking systems.

---

### 1. The Urban Malaria Scheme (UMS) Operations
In Telangana, the GHMC operates over 60 specialized vector control units staffed by trained field workers and entomological inspectors. Their operational protocol includes:
- **Anti-Larval Operations (ALO):** Conducted on a strict 7-day cyclical schedule covering every street, storm ditch, and construction site using hand compression sprayers.
- **Fogging Schedules:** Targeted thermal and ultra-low-volume (ULV) cold fogging using synthetic pyrethroids (cyphenothrin/deltamethrin) carried out during early dawn (5:30 AM – 7:30 AM) and evening dusk (6:00 PM – 8:00 PM) when adult mosquitoes are actively swarming.

---

### 2. High-Tech Drone Bio-Spraying Over Water Bodies
Major water bodies like Hussain Sagar, Mir Alam Tank, and Musi River banks feature dense, impenetrable mats of water hyacinth (*Eichhornia crassipes*). Manual spray teams in boats cannot penetrate the interior weed canopy.

To solve this, municipal teams utilize **heavy-payload agricultural octocopter drones** equipped with specialized downward-directed spray nozzles:
- Drones fly automated GPS-guided grid patterns at an altitude of 3 to 5 meters above the lake surface.
- They deliver precision micro-droplets of biological larvicide (Bti) directly into hidden pockets between hyacinth leaves, neutralizing *Culex* and *Aedes* larvae without putting human crews at risk.

---

### 3. Ward Level Surveillance & Hotspot Mapping
Whenever a hospital in Telangana reports a confirmed case of Dengue (NS1 antigen positive) or Malaria to the Integrated Disease Surveillance Programme (IDSP), the municipal entomology wing triggers an immediate **50-house radius containment cordon**:
- Door-to-door indoor residual spraying (IRS).
- Compulsory source reduction inspection within 100 meters of the patient's residence.
- Distribution of Bti packets and health education brochures to neighbors.
      `,
      actionPoints: [
        'Allow municipal entomology squads wearing official GHMC/C&DMA ID badges to inspect domestic water tanks.',
        'Report sudden clusters of high fever in your neighborhood immediately to the GHMC Control Room (040-21111111).',
        'Keep doors and windows closed for 15 minutes during municipal evening fogging runs.'
      ]
    },
    {
      id: 'article-climate-risk',
      title: 'Climate Modeling & Vector Shifts: Understanding Temperature and Humidity Breeding Windows',
      category: 'Meteorology & Predictive Health AI',
      readTime: '5 min read',
      publishedDate: '10 September 2026',
      author: 'AI Engineering Division, VectorGuard',
      excerpt: 'How real-time environmental variables—ambient temperature, dew point, relative humidity, and rainfall patterns—dynamically dictate vector transmission velocity.',
      content: `
### The Bio-Climatic Calculus of Mosquito Survival

Mosquitoes are poikilotherms (cold-blooded organisms); every phase of their physiological life cycle, metabolic rate, reproductive frequency, and viral incubation period is strictly governed by ambient environmental physics.

---

### 1. Ambient Temperature (°C)
- **The Ideal Window (24°C to 32°C):** Within this optimum thermal range, larval development from egg to adult is accelerated to as little as 6 days. Mosquitoes digest blood meals faster, forcing female adults to bite humans twice as frequently.
- **The Extrinsic Incubation Period (EIP):** For a mosquito to transmit Dengue virus, the ingested virus must replicate and disseminate from the mosquito gut to its salivary glands. At 30°C, this process takes approximately **7 days**. At cooler temperatures (<20°C), it slows to over 16 days—often exceeding the natural lifespan of the mosquito and preventing transmission.
- **Thermal Lethal Limits:** Ambient temperatures sustained above 40°C significantly increase adult mosquito mortality and dehydrate unprotected larval pools.

---

### 2. Relative Humidity (%)
- Mosquitoes lose body moisture rapidly due to their high surface-area-to-volume ratio. 
- When ambient humidity is **above 65% to 70%**, adult mosquitoes live up to **30 to 45 days**, giving them multiple opportunities to feed on human hosts and transmit pathogens across generations.
- In arid conditions (humidity < 40%), adult longevity collapses to less than 5 to 7 days, severely truncating outbreak cycles.

---

### 3. Rainfall Patterns & The "Post-Rain Paradox"
Intense deluge rains temporarily flush open storm drains and wash mosquito larvae away into swift currents. However, the critical danger window emerges **5 to 10 days after heavy rains cease**:
- Torrential storms leave thousands of micro-puddles, blocked terrace drains, and flooded construction sites.
- Clear skies combined with high residual humidity provide the ultimate breeding nursery, sparking exponential population spikes if preventative biocontrol is not administered promptly.
      `,
      actionPoints: [
        'Monitor local weather forecasts: when post-monsoon temperatures hover between 26°C-30°C with humidity >75%, initiate heightened household vigilance.',
        'Inspect all outdoor flat roof surfaces immediately 48 hours following any rainfall event.',
        'Use VectorGuard\'s real-time prediction engine to anticipate vector surges before symptoms appear.'
      ]
    }
  ],

  // Note from the Creators
  creatorsNote: {
    teamName: 'VectorGuard',
    hackathon: 'Smart India Hackathon 2026 (SIH 2026)',
    problemStatementId: 'SIH26200',
    problemStatementTitle: 'Location-Based AI & Biotech Risk Assessment for Vector-Borne Disease Control',
    theme: 'MedTech / BioTech / HealthTech',
    category: 'Software Platform with Biotech Integration',
    targetRegion: 'Telangana State & Nationwide Scalability',
    motto: 'predict, prevent, protect',
    subMotto: 'predict mosquito threats, protect yourself and your loved ones',
    leadStatement: 'Empowering communities and municipal health authorities through hyper-local environmental intelligence, biological larvicides, and seamless civic escalation.',
    paragraphs: [
      `Every year, vector-borne diseases such as Dengue, Malaria, and Chikungunya inflict immense physiological and economic suffering across Indian cities and rural districts. Historically, public health responses have been reactive: municipal fogging teams are dispatched only after hospital beds begin filling with critical fever patients, and citizen grievances languish in bureaucratic queues.`,
      `We created **VectorGuard** for **Smart India Hackathon 2026 (Problem Statement SIH26200)** to overturn this reactive paradigm into an anticipatory, hyper-local, and proactive shield. By harmonizing real-time atmospheric modeling (ambient temperature, humidity, and rainfall dynamics) with spatial waterbody GIS mapping, VectorGuard computes breeding vulnerability scores in real time down to the neighborhood level.`,
      `Crucially, we believe technology must bridge the gap between diagnosis and ground-level action. VectorGuard pairs instant risk assessment with safe, cutting-edge biotechnology recommendations—specifically eco-friendly *Bacillus thuringiensis israelensis* (Bti) microbial formulations and larvivorous biological controls—while providing citizens across Telangana direct, one-click access to official municipal grievance portals (GHMC, Prajavani, C&DMA).`,
      `Our mission is simple: **predict mosquito threats, protect yourself and your loved ones**. When citizens are informed and municipal workers are equipped with precise spatial data, we transform entire communities into resilient, disease-free zones.`
    ],
    missionValues: [
      {
        title: 'Precision Prediction',
        description: 'Using real-time atmospheric parameters and spatial hydrology to calculate micro-climate vector viability.'
      },
      {
        title: 'Biotech-First Prevention',
        description: 'Advocating non-toxic, targeted biological larvicides (Bti) and larvivorous predators over harmful chemical pesticides.'
      },
      {
        title: 'Direct Civic Empowerment',
        description: 'Eliminating red tape by connecting residents directly to Telangana ward officers, WhatsApp grievance desks, and official portals.'
      },
      {
        title: 'Community Science',
        description: 'Demystifying vector biology and municipal protocols so that every citizen becomes an active guardian of public health.'
      }
    ]
  }
};
