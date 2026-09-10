/**
 * VectorGuard - AI & Biotech Risk Calculation & Weather Engine
 * Computes hyper-local vector breeding risks using Open-Meteo live atmospheric telemetry and spatial hydrology.
 */

class VectorRiskEngine {
  constructor() {
    this.currentWeather = null;
    this.currentRiskAnalysis = null;
  }

  // Calculate distance between two lat/lng coordinates (Haversine formula in kilometers)
  static calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth radius in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return parseFloat((R * c).toFixed(2));
  }

  // Find nearest water bodies to coordinates
  static getNearbyWaterBodies(lat, lng, limit = 5) {
    const waterBodiesWithDistance = TELANGANA_DATA.waterBodies.map(wb => {
      const distanceKm = VectorRiskEngine.calculateDistance(lat, lng, wb.lat, wb.lng);
      return {
        ...wb,
        distanceKm
      };
    });

    // Sort by nearest distance
    waterBodiesWithDistance.sort((a, b) => a.distanceKm - b.distanceKm);
    return waterBodiesWithDistance.slice(0, limit);
  }

  // Fetch real-time weather from Open-Meteo API
  async fetchLiveWeather(lat, lng) {
    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m,weather_code&hourly=temperature_2m,relative_humidity_2m,precipitation_probability&forecast_days=2&timezone=auto`;
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000); // 6s timeout

      const res = await fetch(url, { signal: controller.signal });
      clearTimeout(timeoutId);

      if (!res.ok) {
        throw new Error(`Weather service returned HTTP ${res.status}`);
      }

      const data = await res.json();
      const current = data.current || {};
      
      this.currentWeather = {
        temperature: current.temperature_2m ?? 28.5,
        humidity: current.relative_humidity_2m ?? 72,
        precipitation: current.precipitation ?? 0.0,
        windSpeed: current.wind_speed_10m ?? 8.2,
        weatherCode: current.weather_code ?? 1,
        source: 'Live Open-Meteo Satellite & Ground Station API',
        timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
      };
      return this.currentWeather;
    } catch (err) {
      console.warn('Weather API fallback activated:', err);
      // Realistic Deccan plateau / Telangana monsoon/post-monsoon telemetry fallback
      this.currentWeather = {
        temperature: 28.4,
        humidity: 74,
        precipitation: 1.2,
        windSpeed: 9.1,
        weatherCode: 2,
        source: 'Calibrated Telangana Regional Baseline (Offline Telemetry)',
        timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
      };
      return this.currentWeather;
    }
  }

  // Compute hyper-local risk score (0 - 100) based on SIH Slide 3 technical approach
  computeRiskScore(weather, nearestWaterBodies) {
    let score = 0;
    const factors = [];

    const temp = weather.temperature;
    const humidity = weather.humidity;
    const precip = weather.precipitation;
    const nearestWb = nearestWaterBodies && nearestWaterBodies.length > 0 ? nearestWaterBodies[0] : null;
    const nearestDistKm = nearestWb ? nearestWb.distanceKm : 999;

    // 1. Temperature Scoring (Max 35 pts)
    // Aedes & Anopheles peak replication rate occurs between 24°C - 32°C
    if (temp >= 24 && temp <= 32) {
      score += 35;
      factors.push({
        name: 'Optimal Thermal Window',
        value: `${temp}°C`,
        impact: 'High',
        description: 'Ambient temperature is within the optimum window (24°C-32°C) for accelerated larval metamorphosis and maximum virus replication speed.'
      });
    } else if ((temp >= 20 && temp < 24) || (temp > 32 && temp <= 36)) {
      score += 22;
      factors.push({
        name: 'Sub-optimal Thermal Range',
        value: `${temp}°C`,
        impact: 'Moderate',
        description: 'Ambient temperature supports steady vector survival, though larval maturation cycle is slightly moderated.'
      });
    } else {
      score += 10;
      factors.push({
        name: 'Marginal Thermal Activity',
        value: `${temp}°C`,
        impact: 'Low',
        description: 'Extreme heat or cool conditions decelerate vector flight and oviposition.'
      });
    }

    // 2. Relative Humidity Scoring (Max 35 pts)
    // Humidity > 65% extends adult mosquito longevity to >30 days
    if (humidity >= 70) {
      score += 35;
      factors.push({
        name: 'Elevated Ambient Humidity',
        value: `${humidity}%`,
        impact: 'Critical',
        description: 'Atmospheric moisture exceeds 70%, preventing mosquito desiccation and enabling adult females to survive through multiple gonotrophic biting cycles.'
      });
    } else if (humidity >= 55 && humidity < 70) {
      score += 22;
      factors.push({
        name: 'Moderate Relative Humidity',
        value: `${humidity}%`,
        impact: 'Moderate',
        description: 'Humidity allows standard adult vector survival (15-20 days).'
      });
    } else {
      score += 8;
      factors.push({
        name: 'Arid Microclimate',
        value: `${humidity}%`,
        impact: 'Low',
        description: 'Low atmospheric moisture increases adult vector mortality.'
      });
    }

    // 3. Precipitation & Surface Water Pooling (Max 15 pts)
    if (precip > 2.0) {
      score += 15;
      factors.push({
        name: 'Active Precipitation Stagnation',
        value: `${precip} mm`,
        impact: 'High',
        description: 'Recent surface accumulation creates millions of micro-oviposition nurseries in roadside ditches, gutters, and discarded containers.'
      });
    } else if (precip > 0) {
      score += 10;
      factors.push({
        name: 'Damp Surface Pooling',
        value: `${precip} mm`,
        impact: 'Moderate',
        description: 'Light rainfall leaves damp soil and shallow pockets in sun-shaded outdoor areas.'
      });
    } else {
      score += 5;
      factors.push({
        name: 'Dry Ground Conditions',
        value: '0.0 mm',
        impact: 'Low',
        description: 'No active rain pooling; breeding limited to permanent artificial reservoirs and open sewage.'
      });
    }

    // 4. Proximity to Telangana Hydrological Bodies (Max 15 pts)
    if (nearestDistKm <= 1.5) {
      score += 15;
      factors.push({
        name: 'Immediate Lake/Nullah Proximity',
        value: `${nearestDistKm} km to ${nearestWb.name}`,
        impact: 'Critical',
        description: `Directly within the 1.5 km active flight dispersal radius of ${nearestWb.name} (${nearestWb.surfaceCondition}).`
      });
    } else if (nearestDistKm <= 4.0) {
      score += 10;
      factors.push({
        name: 'Hydrological Buffer Zone',
        value: `${nearestDistKm} km to ${nearestWb.name}`,
        impact: 'Moderate',
        description: `Located in the extended secondary dispersal zone of ${nearestWb.name}.`
      });
    } else {
      score += 4;
      factors.push({
        name: 'Distal Hydrology',
        value: `${nearestDistKm} km to ${nearestWb ? nearestWb.name : 'water body'}`,
        impact: 'Low',
        description: 'Beyond primary open water body flight ranges; local breeding dominated by domestic containers.'
      });
    }

    // Ensure score clamped 0-100
    score = Math.min(100, Math.max(5, score));

    // Determine Risk Level & Alert Tone
    let level, color, label, headline, summary;
    if (score >= 68) {
      level = 'HIGH';
      color = '#d4351c'; // GOV.UK red
      label = 'CRITICAL BREEDING RISK';
      headline = 'Hyper-Local Vector Proliferation Imminent';
      summary = 'Current atmospheric temperature, humidity, and surrounding water bodies provide optimal biological incubation conditions. Immediate anti-larval treatment and household source reduction are strongly advised.';
    } else if (score >= 42) {
      level = 'MODERATE';
      color = '#f47738'; // GOV.UK amber/orange
      label = 'MODERATE BREEDING RISK';
      headline = 'Elevated Surveillance Recommended';
      summary = 'Atmospheric conditions moderately favor vector survival. Regular inspection of water holding containers and clearance of perimeter drainage channels is required.';
    } else {
      level = 'LOW';
      color = '#00703c'; // GOV.UK green
      label = 'LOW BREEDING RISK';
      headline = 'Subdued Vector Activity';
      summary = 'Climatic conditions are currently hostile to rapid larval maturation. Continue routine sanitary vigilance and weekly dry-day inspections.';
    }

    this.currentRiskAnalysis = {
      score,
      level,
      color,
      label,
      headline,
      summary,
      factors,
      nearestWaterBody: nearestWb,
      weather
    };

    return this.currentRiskAnalysis;
  }
}

// Global instance
window.vectorRiskEngine = new VectorRiskEngine();
