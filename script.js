// ===== Navbar Scroll & Hamburger =====
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => navbar.classList.toggle('scrolled', window.scrollY > 50));
hamburger.addEventListener('click', () => { hamburger.classList.toggle('active'); navLinks.classList.toggle('open'); });
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { hamburger.classList.remove('active'); navLinks.classList.remove('open'); }));

// ===== Search Tabs =====
const searchTabs = document.querySelectorAll('.search-tab');
let currentMode = 'flight';
searchTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    searchTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    currentMode = tab.dataset.mode;
  });
});

// ===== Select Mode from Travel Cards =====
function selectMode(mode) {
  currentMode = mode;
  searchTabs.forEach(t => { t.classList.toggle('active', t.dataset.mode === mode); });
  document.getElementById('search').scrollIntoView({ behavior: 'smooth' });
}

// ===== Toast =====
function showToast(msg, type = 'error') {
  const toast = document.createElement('div');
  toast.textContent = msg;
  Object.assign(toast.style, {
    position:'fixed', bottom:'30px', left:'50%', transform:'translateX(-50%) translateY(20px)',
    background: type==='success' ? 'linear-gradient(135deg,#06d6a0,#38bdf8)' : 'linear-gradient(135deg,#e17055,#d63031)',
    color:'#fff', padding:'16px 32px', borderRadius:'14px', fontSize:'.95rem',
    fontFamily:'Inter,sans-serif', zIndex:'9999', opacity:'0', transition:'all .4s',
    boxShadow:'0 8px 30px rgba(0,0,0,0.4)', fontWeight:'500', maxWidth:'90vw', textAlign:'center'
  });
  document.body.appendChild(toast);
  requestAnimationFrame(() => { toast.style.opacity='1'; toast.style.transform='translateX(-50%) translateY(0)'; });
  setTimeout(() => { toast.style.opacity='0'; setTimeout(() => toast.remove(), 400); }, 3000);
}

// ===== Distance Data =====
const distances = {
  'Delhi-Mumbai':1400,'Delhi-Bangalore':2150,'Delhi-Chennai':2180,'Delhi-Kolkata':1500,
  'Delhi-Hyderabad':1550,'Delhi-Pune':1450,'Delhi-Jaipur':280,'Delhi-Goa':1850,
  'Delhi-Ahmedabad':940,'Delhi-Lucknow':550,'Delhi-Kochi':2600,
  'Mumbai-Bangalore':980,'Mumbai-Chennai':1340,'Mumbai-Kolkata':2050,'Mumbai-Hyderabad':710,
  'Mumbai-Pune':150,'Mumbai-Jaipur':1150,'Mumbai-Goa':580,'Mumbai-Ahmedabad':530,
  'Mumbai-Lucknow':1350,'Mumbai-Kochi':1310,
  'Bangalore-Chennai':350,'Bangalore-Kolkata':1870,'Bangalore-Hyderabad':570,
  'Bangalore-Pune':840,'Bangalore-Jaipur':1900,'Bangalore-Goa':560,'Bangalore-Kochi':530,
  'Chennai-Kolkata':1660,'Chennai-Hyderabad':630,'Chennai-Pune':1170,'Chennai-Jaipur':2000,'Chennai-Goa':880,'Chennai-Kochi':680,
  'Kolkata-Hyderabad':1490,'Kolkata-Pune':1880,'Kolkata-Jaipur':1500,'Kolkata-Goa':1870,
  'Hyderabad-Pune':560,'Hyderabad-Jaipur':1360,'Hyderabad-Goa':600,'Hyderabad-Kochi':930,
  'Pune-Jaipur':1200,'Pune-Goa':450,'Jaipur-Goa':1500,'Ahmedabad-Goa':1050,
  'Lucknow-Kolkata':1000,'Lucknow-Jaipur':580,'Kochi-Goa':700
};
function getDistance(a, b) { return distances[`${a}-${b}`] || distances[`${b}-${a}`] || Math.floor(Math.random()*800+400); }

// ===== Operator Data =====
const operators = {
  flight: [
    { name:'IndiGo', code:'6E', rating:4.5, amenities:['Wi-Fi','Snacks','USB Charging'] },
    { name:'Air India', code:'AI', rating:4.3, amenities:['Meals','Entertainment','Blanket'] },
    { name:'Vistara', code:'UK', rating:4.7, amenities:['Meals','Wi-Fi','Premium Seats'] },
    { name:'SpiceJet', code:'SG', rating:4.1, amenities:['Snacks','Priority Boarding'] },
    { name:'Go First', code:'G8', rating:4.0, amenities:['Snacks','Extra Legroom'] },
    { name:'AirAsia India', code:'I5', rating:4.2, amenities:['Snacks','USB Charging','Hot Meals'] }
  ],
  train: [
    { name:'Rajdhani Express', code:'RAJ', rating:4.6, amenities:['AC','Meals','Bedding'] },
    { name:'Shatabdi Express', code:'SHTB', rating:4.5, amenities:['AC','Meals','Chair Car'] },
    { name:'Duronto Express', code:'DUR', rating:4.4, amenities:['AC','Non-Stop','Meals'] },
    { name:'Garib Rath', code:'GR', rating:4.0, amenities:['AC 3-Tier','Budget'] },
    { name:'Vande Bharat', code:'VB', rating:4.8, amenities:['Semi-High Speed','AC','Meals'] },
    { name:'Humsafar Express', code:'HMF', rating:4.3, amenities:['AC 3-Tier','Charging','Clean'] }
  ],
  bus: [
    { name:'VRL Travels', code:'VRL', rating:4.4, amenities:['AC Sleeper','Blanket','Water'] },
    { name:'SRS Travels', code:'SRS', rating:4.2, amenities:['AC','Push-back Seats'] },
    { name:'Orange Travels', code:'OT', rating:4.3, amenities:['Volvo AC','Charging'] },
    { name:'Neeta Travels', code:'NT', rating:4.1, amenities:['AC Sleeper','Wi-Fi'] },
    { name:'Paulo Travels', code:'PT', rating:4.5, amenities:['Luxury AC','Blanket','Snacks'] },
    { name:'KPN Travels', code:'KPN', rating:4.0, amenities:['Multi-Axle','AC','Sleeper'] }
  ],
  cab: [
    { name:'Ola Outstation', code:'OLA', rating:4.4, amenities:['AC','GPS Tracked','Driver'] },
    { name:'Uber Intercity', code:'UBER', rating:4.5, amenities:['AC','Real-time Track','UPI'] },
    { name:'Savaari Car', code:'SAV', rating:4.3, amenities:['Sedan','AC','Experienced Driver'] },
    { name:'Zoomcar Self-Drive', code:'ZC', rating:4.2, amenities:['Self Drive','Insurance','Fuel'] },
    { name:'Meru Cabs', code:'MERU', rating:4.1, amenities:['AC','Professional Driver','Clean'] }
  ]
};

const modeIcons = { flight:'fa-plane', train:'fa-train', bus:'fa-bus', cab:'fa-car' };
const modeNames = { flight:'Flights', train:'Trains', bus:'Buses', cab:'Cabs' };
const modeEmoji = { flight:'✈️', train:'🚆', bus:'🚌', cab:'🚕' };

const rates = {
  flight: { base:1800, perKm:3.5, tax:0.12 },
  train:  { base:150,  perKm:0.8, tax:0.05 },
  bus:    { base:100,  perKm:1.2, tax:0.05 },
  cab:    { base:300,  perKm:12,  tax:0.05 }
};

// ===== Generate Random Time =====
function randomTime() {
  const h = String(Math.floor(Math.random()*24)).padStart(2,'0');
  const m = ['00','15','30','45'][Math.floor(Math.random()*4)];
  return `${h}:${m}`;
}
function addDuration(startTime, minutes) {
  const [h,m] = startTime.split(':').map(Number);
  const total = h*60 + m + minutes;
  return `${String(Math.floor(total/60)%24).padStart(2,'0')}:${String(total%60).padStart(2,'0')}`;
}
function formatDuration(mins) {
  const h = Math.floor(mins/60);
  const m = mins%60;
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

// ===== Generate Search Results =====
function generateResults(from, to, mode) {
  const dist = getDistance(from, to);
  const r = rates[mode];
  const ops = operators[mode];
  const results = [];

  const durationRanges = {
    flight: [90, 180],
    train: [360, 1200],
    bus: [420, 1440],
    cab: [300, 1080]
  };

  for (let i = 0; i < ops.length; i++) {
    const op = ops[i];
    const priceVariation = 0.7 + Math.random() * 0.7;
    const baseFare = (r.base + dist * r.perKm) * priceVariation;
    const tax = baseFare * r.tax;
    const totalPrice = Math.round(baseFare + tax);

    const [minDur, maxDur] = durationRanges[mode];
    const duration = Math.round(minDur + (dist / 2000) * (maxDur - minDur) + (Math.random() * 60 - 30));
    const depTime = randomTime();
    const arrTime = addDuration(depTime, duration);

    const seatsLeft = Math.floor(Math.random() * 15) + 1;

    results.push({
      operator: op.name,
      code: op.code,
      rating: op.rating,
      amenities: op.amenities,
      price: totalPrice,
      departure: depTime,
      arrival: arrTime,
      duration: formatDuration(duration),
      seatsLeft,
      mode,
      from, to, dist
    });
  }

  return results.sort((a, b) => a.price - b.price);
}

// ===== Render Results =====
function renderResults(results, from, to, mode) {
  const overlay = document.getElementById('resultsOverlay');
  const body = document.getElementById('resultsBody');
  const title = document.getElementById('resultsTitle');
  const filters = document.getElementById('resultsFilters');

  title.innerHTML = `<i class="fas ${modeIcons[mode]}"></i> ${modeNames[mode]}: ${from} → ${to} <span class="route-info">${results[0]?.dist || ''} km</span>`;

  filters.innerHTML = `
    <button class="filter-chip active" data-sort="price">💰 Cheapest</button>
    <button class="filter-chip" data-sort="duration">⏱️ Fastest</button>
    <button class="filter-chip" data-sort="departure">🕐 Earliest</button>
    <button class="filter-chip" data-sort="rating">⭐ Top Rated</button>
  `;

  // Show loading first
  body.innerHTML = '';
  for (let i = 0; i < 3; i++) {
    body.innerHTML += `<div class="loading-skeleton"><div class="skeleton-line thick w60"></div><div class="skeleton-line w80"></div><div class="skeleton-line w40"></div></div>`;
  }
  overlay.classList.add('show');
  document.body.style.overflow = 'hidden';

  // Then show results after delay
  setTimeout(() => {
    body.innerHTML = '';
    results.forEach((r, i) => {
      const card = document.createElement('div');
      card.className = 'result-card';
      card.style.animationDelay = `${i * 0.08}s`;
      card.innerHTML = `
        <div class="result-left">
          <div class="result-operator">
            <div class="op-icon ${mode}-icon">${modeEmoji[mode]}</div>
            <div>
              <div class="op-name">${r.operator}</div>
              <div class="op-type">${r.code} · ${r.duration}</div>
            </div>
          </div>
          <div class="result-details">
            <div class="result-detail"><span class="detail-label">Departure</span><span class="detail-value">${r.departure}</span></div>
            <div class="result-detail"><span class="detail-label">Arrival</span><span class="detail-value">${r.arrival}</span></div>
            <div class="result-detail"><span class="detail-label">Duration</span><span class="detail-value">${r.duration}</span></div>
            <div class="result-detail"><span class="detail-label">Seats Left</span><span class="detail-value" style="color:${r.seatsLeft<=5?'#ef4444':'var(--accent)'}">${r.seatsLeft}</span></div>
          </div>
          <div class="result-amenities">${r.amenities.map(a => `<span class="amenity">${a}</span>`).join('')}</div>
        </div>
        <div class="result-right">
          <div class="result-rating">⭐ ${r.rating}</div>
          <div class="result-price">₹${r.price.toLocaleString('en-IN')}</div>
          <div class="result-price-info">per person</div>
          <button class="result-book" onclick="bookTrip(this)" 
            data-operator="${r.operator}" data-code="${r.code}" data-price="${r.price}" 
            data-from="${r.from}" data-to="${r.to}" data-dep="${r.departure}" 
            data-arr="${r.arrival}" data-dur="${r.duration}" data-mode="${mode}">
            <i class="fas fa-bolt"></i> Book Now
          </button>
        </div>
      `;
      body.appendChild(card);
    });

    // Filter chip click handlers
    filters.querySelectorAll('.filter-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        filters.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        const sortBy = chip.dataset.sort;
        let sorted = [...results];
        if (sortBy === 'price') sorted.sort((a,b) => a.price - b.price);
        else if (sortBy === 'duration') sorted.sort((a,b) => a.duration.localeCompare(b.duration));
        else if (sortBy === 'departure') sorted.sort((a,b) => a.departure.localeCompare(b.departure));
        else if (sortBy === 'rating') sorted.sort((a,b) => b.rating - a.rating);
        body.innerHTML = '';
        sorted.forEach((r, i) => {
          const card = document.createElement('div');
          card.className = 'result-card';
          card.style.animationDelay = `${i * 0.08}s`;
          card.innerHTML = `
            <div class="result-left">
              <div class="result-operator">
                <div class="op-icon ${mode}-icon">${modeEmoji[mode]}</div>
                <div><div class="op-name">${r.operator}</div><div class="op-type">${r.code} · ${r.duration}</div></div>
              </div>
              <div class="result-details">
                <div class="result-detail"><span class="detail-label">Departure</span><span class="detail-value">${r.departure}</span></div>
                <div class="result-detail"><span class="detail-label">Arrival</span><span class="detail-value">${r.arrival}</span></div>
                <div class="result-detail"><span class="detail-label">Duration</span><span class="detail-value">${r.duration}</span></div>
                <div class="result-detail"><span class="detail-label">Seats Left</span><span class="detail-value" style="color:${r.seatsLeft<=5?'#ef4444':'var(--accent)'}">${r.seatsLeft}</span></div>
              </div>
              <div class="result-amenities">${r.amenities.map(a => `<span class="amenity">${a}</span>`).join('')}</div>
            </div>
            <div class="result-right">
              <div class="result-rating">⭐ ${r.rating}</div>
              <div class="result-price">₹${r.price.toLocaleString('en-IN')}</div>
              <div class="result-price-info">per person</div>
              <button class="result-book" onclick="bookTrip(this)"
                data-operator="${r.operator}" data-code="${r.code}" data-price="${r.price}"
                data-from="${r.from}" data-to="${r.to}" data-dep="${r.departure}"
                data-arr="${r.arrival}" data-dur="${r.duration}" data-mode="${mode}">
                <i class="fas fa-bolt"></i> Book Now
              </button>
            </div>
          `;
          body.appendChild(card);
        });
      });
    });
  }, 800);
}

// ===== Book Trip =====
function bookTrip(btn) {
  const d = btn.dataset;
  const modal = document.getElementById('bookingModal');
  const details = document.getElementById('bookingDetails');
  const date = document.getElementById('travelDate').value || new Date().toISOString().split('T')[0];
  const bookingId = 'VX' + Date.now().toString(36).toUpperCase().slice(-6);

  details.innerHTML = `
    <div class="bd-row"><span class="bd-label">Booking ID</span><span class="bd-value">${bookingId}</span></div>
    <div class="bd-row"><span class="bd-label">Mode</span><span class="bd-value">${modeEmoji[d.mode]} ${modeNames[d.mode]}</span></div>
    <div class="bd-row"><span class="bd-label">Operator</span><span class="bd-value">${d.operator} (${d.code})</span></div>
    <div class="bd-row"><span class="bd-label">Route</span><span class="bd-value">${d.from} → ${d.to}</span></div>
    <div class="bd-row"><span class="bd-label">Date</span><span class="bd-value">${date}</span></div>
    <div class="bd-row"><span class="bd-label">Departure</span><span class="bd-value">${d.dep}</span></div>
    <div class="bd-row"><span class="bd-label">Arrival</span><span class="bd-value">${d.arr}</span></div>
    <div class="bd-row"><span class="bd-label">Duration</span><span class="bd-value">${d.dur}</span></div>
    <div class="bd-row"><span class="bd-label">Total Fare</span><span class="bd-value" style="color:var(--accent);font-size:1.1rem">₹${parseInt(d.price).toLocaleString('en-IN')}</span></div>
  `;
  modal.classList.add('show');
}

// ===== Close Modals =====
document.getElementById('resultsClose').addEventListener('click', () => {
  document.getElementById('resultsOverlay').classList.remove('show');
  document.body.style.overflow = '';
});
document.getElementById('resultsOverlay').addEventListener('click', e => {
  if (e.target === e.currentTarget) {
    document.getElementById('resultsOverlay').classList.remove('show');
    document.body.style.overflow = '';
  }
});
document.getElementById('bookingClose').addEventListener('click', () => {
  document.getElementById('bookingModal').classList.remove('show');
  document.getElementById('resultsOverlay').classList.remove('show');
  document.body.style.overflow = '';
  showToast('Booking confirmed! Check your email for details.', 'success');
});
document.getElementById('bookingModal').addEventListener('click', e => {
  if (e.target === e.currentTarget) document.getElementById('bookingModal').classList.remove('show');
});

// ===== Search Button =====
document.getElementById('searchBtn').addEventListener('click', () => {
  const from = document.getElementById('fromCity').value;
  const to = document.getElementById('toCity').value;
  if (!from || !to) { showToast('Please select both origin and destination!'); return; }
  if (from === to) { showToast('Origin and destination cannot be the same!'); return; }
  const results = generateResults(from, to, currentMode);
  renderResults(results, from, to, currentMode);
});

// ===== Fare Calculator =====
document.getElementById('calcFareBtn').addEventListener('click', () => {
  const from = document.getElementById('fareFrom').value;
  const to = document.getElementById('fareTo').value;
  const mode = document.getElementById('fareMode').value;
  const passengers = parseInt(document.getElementById('farePassengers').value);
  if (!from || !to) { showToast('Please select both cities!'); return; }
  if (from === to) { showToast('Cities must be different!'); return; }
  const dist = getDistance(from, to);
  const r = rates[mode];
  const baseFare = r.base + dist * r.perKm;
  const tax = baseFare * r.tax;
  const perPerson = Math.round(baseFare + tax);
  const total = perPerson * passengers;
  document.getElementById('totalFare').textContent = '₹' + total.toLocaleString('en-IN');
  document.getElementById('fareBreakdown').innerHTML = `
    <div><span>Mode</span>${modeNames[mode]}</div>
    <div><span>Distance</span>${dist} km</div>
    <div><span>Base Fare</span>₹${Math.round(baseFare).toLocaleString('en-IN')}</div>
    <div><span>Tax</span>₹${Math.round(tax).toLocaleString('en-IN')}</div>
    <div><span>Per Person</span>₹${perPerson.toLocaleString('en-IN')}</div>
    <div><span>Passengers</span>${passengers}</div>
  `;
  const fareResult = document.getElementById('fareResult');
  fareResult.classList.remove('show');
  void fareResult.offsetWidth;
  fareResult.classList.add('show');
});

// ===== Scroll Reveal =====
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const siblings = entry.target.parentElement.querySelectorAll('.reveal');
      const idx = Array.from(siblings).indexOf(entry.target);
      entry.target.style.transitionDelay = idx * 0.1 + 's';
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
revealEls.forEach(el => observer.observe(el));

// ===== Set min date =====
const dateInput = document.getElementById('travelDate');
dateInput.setAttribute('min', new Date().toISOString().split('T')[0]);
dateInput.value = new Date().toISOString().split('T')[0];
