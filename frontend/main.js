const API_BASE = (window.API_BASE_URL || 'http://localhost:8000').replace(/\\/$/,''); // Allows override via injected var

const els = {
  list: document.getElementById('animalList'),
  details: document.getElementById('details'),
  search: document.getElementById('searchInput'),
  species: document.getElementById('speciesInput'),
  apply: document.getElementById('applyBtn'),
  status: document.getElementById('status')
};

function setStatus(msg, isError=false){
  els.status.textContent = msg || '';
  els.status.style.color = isError ? 'var(--error)' : '#6b7280';
}

// PUBLIC_INTERFACE
async function fetchAnimals({q, species} = {}){
  /** Fetch animals from backend with optional filters. */
  const params = new URLSearchParams();
  if(q) params.set('q', q);
  if(species) params.set('species', species);
  const url = params.toString() ? `${API_BASE}/animals?${params}` : `${API_BASE}/animals`;
  const res = await fetch(url);
  if(!res.ok){
    throw new Error(`Failed to fetch animals: ${res.status}`);
  }
  return await res.json();
}

// PUBLIC_INTERFACE
async function fetchAnimal(id){
  /** Fetch animal details by id. */
  const res = await fetch(`${API_BASE}/animals/${encodeURIComponent(id)}`);
  if(!res.ok){
    throw new Error('Animal not found');
  }
  return await res.json();
}

function renderList(items){
  els.list.innerHTML = '';
  if(!items.length){
    els.list.innerHTML = '<li class="animal-item">No animals found</li>';
    return;
  }
  for(const a of items){
    const li = document.createElement('li');
    li.className = 'animal-item';
    li.innerHTML = `
      <div>
        <div><strong>${a.name}</strong> (${a.id})</div>
        <div class="meta">${a.species} • ${a.status || 'unknown'} • Last @ ${a.last_seen_lat.toFixed(4)}, ${a.last_seen_lng.toFixed(4)}</div>
      </div>
      <button class="btn" data-id="${a.id}">View</button>
    `;
    li.querySelector('button').addEventListener('click', async () => {
      try{
        setStatus('Loading details...');
        const details = await fetchAnimal(a.id);
        renderDetails(details);
        setStatus('');
      }catch(err){
        console.error(err);
        setStatus('Failed to load details', true);
      }
    });
    els.list.appendChild(li);
  }
}

function renderDetails(a){
  els.details.innerHTML = `
    <div><strong>${a.name}</strong> (${a.id})</div>
    <div>${a.species}</div>
    <div>Last seen: ${a.last_seen_ts}</div>
    <div>Location: ${a.last_seen_lat.toFixed(5)}, ${a.last_seen_lng.toFixed(5)}</div>
    <div>Status: ${a.status || 'unknown'}</div>
  `;
}

async function loadInitial(){
  try{
    setStatus('Loading animals...');
    const list = await fetchAnimals();
    renderList(list);
    setStatus('');
  }catch(err){
    console.error(err);
    setStatus('Failed to load animals. Is the backend running at ' + API_BASE + '?', true);
  }
}

els.apply.addEventListener('click', async () => {
  try{
    setStatus('Applying filters...');
    const list = await fetchAnimals({ q: els.search.value.trim(), species: els.species.value.trim() });
    renderList(list);
    setStatus('');
  }catch(err){
    console.error(err);
    setStatus('Failed to apply filters', true);
  }
});

document.addEventListener('DOMContentLoaded', loadInitial);
