
window.VG = window.VG || {};

VG.illus = (function () {
  let _n = 0;
  const u = (p) => p + '_' + (++_n);

  
  function assetFile(dir, key) {
    const p = `assets/${dir}/${key}.jpg`;
    const map = (typeof window !== 'undefined') && window.__ASSETS;
    return (map && map[p]) || p;
  }

  
  function grainDefs(id, freq, amt) {
    return `<filter id="${id}">
      <feTurbulence type="fractalNoise" baseFrequency="${freq || 0.85}" numOctaves="3" result="n"/>
      <feColorMatrix in="n" type="saturate" values="0" result="g"/>
      <feComponentTransfer in="g"><feFuncA type="linear" slope="${amt || 0.22}"/></feComponentTransfer>
      <feComposite operator="in" in2="SourceGraphic" result="gr"/>
      <feBlend in="SourceGraphic" in2="gr"/>
    </filter>`;
  }
  
  function softDefs(id, s) {
    return `<filter id="${id}"><feGaussianBlur stdDeviation="${s || 1.2}"/></filter>`;
  }

  
  function slot(key, svgHtml, width) {
    const w = width || 420;
    return `<div class="photoslot" data-act="zoom-slot" style="width:${w}px;max-width:100%">
      <img class="photoslot-img" src="${assetFile('photos', key)}" alt=""
           onerror="this.style.display='none';this.nextElementSibling.style.display='block'">
      <div class="photoslot-fallback" style="display:none">${svgHtml}</div>
    </div>`;
  }

  
  function portraitPlaceholder() {
    const id = u('pp');
    return `<svg class="art photo" viewBox="0 0 96 128" xmlns="http://www.w3.org/2000/svg">
      <defs>${grainDefs(id, 0.9, 0.2)}</defs>
      <g filter="url(#${id})">
        <rect width="96" height="128" fill="#b9b5a6"/>
        <rect width="96" height="54" fill="#a29e90"/>
        <circle cx="48" cy="56" r="23" fill="#918c7d"/>
        <path d="M16 128 q7 -44 32 -44 q25 0 32 44Z" fill="#7e7969"/>
        <path d="M25 54 q5 -28 23 -28 q18 0 23 28 q-9 -15 -23 -15 q-14 0 -23 15Z" fill="#2b2723"/>
        <ellipse cx="40" cy="58" rx="2.6" ry="1.8" fill="#26241f"/>
        <ellipse cx="56" cy="58" rx="2.6" ry="1.8" fill="#26241f"/>
        <path d="M42 70 q6 3 12 0" stroke="#8a4a44" stroke-width="1.6" fill="none"/>
      </g>
    </svg>`;
  }

  
  function deskIcon(kind) {
    const wrap = (inner) =>
      `<svg viewBox="0 0 32 32" width="32" height="32" class="di-svg">${inner}</svg>`;

    if (kind === 'ie') {
      return wrap(`
        <circle cx="16" cy="17" r="13" fill="#1e6fc4"/>
        <circle cx="16" cy="17" r="13" fill="none" stroke="#0b3f78" stroke-width="1"/>
        <ellipse cx="16" cy="17" rx="13" ry="5.4" fill="none" stroke="#9ecdf0" stroke-width="1"/>
        <ellipse cx="16" cy="17" rx="5.6" ry="13" fill="none" stroke="#9ecdf0" stroke-width="1"/>
        <text x="16" y="24" text-anchor="middle" font-size="18" font-style="italic"
              font-family="Times New Roman,serif" fill="#ffffff">e</text>`);
    }
    
    if (kind === 'exe') {
      return wrap(`
        <rect x="4" y="4" width="24" height="24" rx="3" fill="#d8dce4" stroke="#6a7280" stroke-width="1.4"/>
        <rect x="4" y="4" width="24" height="6" rx="3" fill="#2a6fb8"/>
        <rect x="7" y="13" width="18" height="12" fill="#f2f4f8" stroke="#8a94a4" stroke-width="1"/>
        <path d="M9 16 h7 M9 19 h9 M9 22 h5" stroke="#5a7fa8" stroke-width="1.4" stroke-linecap="round"/>
        <path d="M20 17 l4 3 l-4 3Z" fill="#c0392b"/>`);
    }
    
    if (kind === 'crack') {
      return wrap(`
        <rect x="4" y="4" width="24" height="24" rx="3" fill="#1c1c22" stroke="#6a7280" stroke-width="1.4"/>
        <rect x="4" y="4" width="24" height="6" rx="3" fill="#3a3a46"/>
        <path d="M9 15 l5 3 l-5 3Z" fill="#c0392b"/>
        <path d="M15 14 l3 5 l-3 5" stroke="#6ee0a0" stroke-width="1.4" fill="none"/>
        <circle cx="22" cy="12" r="1.4" fill="#e0503a"/>`);
    }
    
    if (kind === 'reborn') {
      return wrap(`
        <path d="M12 4 h8 v3 c0 2 -3 3 -3 6 c0 5 4 7 4 11 c0 3 -2 5 -5 5
                 h-4 c-3 0 -5 -2 -5 -5 c0 -4 4 -6 4 -11 c0 -3 -3 -4 -3 -6 V4Z"
              fill="#f0ece2" stroke="#8a8478" stroke-width="1.4"/>
        <path d="M12 4 h8 v2 h-8Z" fill="#d8d2c4" stroke="#8a8478" stroke-width="1.2"/>
        <path d="M11 4.6 q5 -2.6 10 0 q-5 1.8 -10 0Z" fill="#8a1410" opacity=".9"/>
        <path d="M11.4 6 q4.6 -1.4 9.2 0" stroke="#a81812" stroke-width="1.6"
              fill="none" stroke-linecap="round"/>
        <path d="M13 16 q2 2 4 0" stroke="#c8c0b0" stroke-width="1" fill="none"/>
        <circle cx="12.6" cy="26" r="1.1" fill="#a81812"/>
        <circle cx="19" cy="27" r="0.9" fill="#a81812"/>`);
    }
    if (kind === 'note') {
      return wrap(`
        <path d="M6 3 h14 l6 6 v20 H6Z" fill="#fdfdfa" stroke="#8a8a7a" stroke-width="1"/>
        <path d="M20 3 v6 h6" fill="#dcdcd0" stroke="#8a8a7a" stroke-width="1"/>
        <g stroke="#5a7fa8" stroke-width="1.3" stroke-linecap="round">
          <path d="M10 14 h12"/><path d="M10 18 h12"/><path d="M10 22 h8"/>
        </g>`);
    }
    if (kind === 'bin') {
      return wrap(`
        <path d="M9 9 h14 l-2 19 H11Z" fill="#c9c9c9" stroke="#5a5a5a" stroke-width="1"/>
        <ellipse cx="16" cy="9" rx="7" ry="2.6" fill="#dedede" stroke="#5a5a5a" stroke-width="1"/>
        <g stroke="#8a8a8a" stroke-width="1"><path d="M13 13 v12"/><path d="M19 13 v12"/></g>
        <path d="M13 5 h6" stroke="#5a5a5a" stroke-width="1.4"/>`);
    }
    if (kind === 'docs') {
      return wrap(`
        <path d="M3 7 h11 l2 3 h13 v19 H3Z" fill="#e8c66a" stroke="#9a7b28" stroke-width="1"/>
        <path d="M3 11 h26 v18 H3Z" fill="#f2d888" stroke="#9a7b28" stroke-width="1"/>
        <path d="M6 15 h20" stroke="#c9a94a" stroke-width="1"/>`);
    }
    
    if (kind === 'secret') {
      return wrap(`
        <path d="M3 7 h11 l2 3 h13 v19 H3Z" fill="#2a2226" stroke="#4a3a3e" stroke-width="1"/>
        <path d="M3 11 h26 v18 H3Z" fill="#3a2f34" stroke="#4a3a3e" stroke-width="1"/>
        <path d="M6 15 h20" stroke="#4a3a3e" stroke-width="1"/>
        <circle cx="25" cy="24" r="2.6" fill="#7a1418"/>
        <circle cx="25" cy="24" r="1.1" fill="#c8352f"/>`);
    }
    if (kind === 'locked') {
      return wrap(`
        <path d="M3 7 h11 l2 3 h13 v19 H3Z" fill="#3a2f34" stroke="#5a4a4e" stroke-width="1"/>
        <path d="M3 11 h26 v18 H3Z" fill="#4a3f44" stroke="#5a4a4e" stroke-width="1"/>
        <rect x="11" y="18" width="11" height="8" rx="1" fill="#c9a94a" stroke="#8a6a1a" stroke-width="1"/>
        <path d="M13.5 18 v-2.6 a3 3 0 0 1 6 0 V18" fill="none"
              stroke="#c9a94a" stroke-width="1.6"/>`);
    }
    
    return wrap(`
        <path d="M5 3 h15 l7 7 v19 H5Z" fill="#fdfdfa" stroke="#8a8a7a" stroke-width="1"/>
        <path d="M20 3 v7 h7" fill="#dcdcd0" stroke="#8a8a7a" stroke-width="1"/>
        <path d="M16 24 c-6 -4 -8 -7 -8 -10 a4.4 4.4 0 0 1 8 -2.4 a4.4 4.4 0 0 1 8 2.4
                 c0 3 -2 6 -8 10Z" fill="#e8548f" stroke="#a82f61" stroke-width="1"/>
        <path d="M8 8 h7" stroke="#b0b0a0" stroke-width="1.2"/>`);
  }

  
  function sticker(kind, fill, size) {
    const s = size || 34;
    const st = `stroke="${fill.stroke}" stroke-width="1.4" stroke-linejoin="round"`;
    let inner = '';
    if (kind === 'heart') {
      inner = `<path d="M24 43 C10 32 4 24 4 16.5 A11 11 0 0 1 24 9.5 A11 11 0 0 1 44 16.5
               C44 24 38 32 24 43Z" fill="${fill.face}" ${st}/>`;
    } else if (kind === 'star') {
      inner = `<path d="M24 3 L30.6 17.4 L46 19.2 L34.4 30.2 L37.4 45.5 L24 38.2
               L10.6 45.5 L13.6 30.2 L2 19.2 L17.4 17.4Z" fill="${fill.face}" ${st}/>`;
    } else if (kind === 'flower') {
      let petals = '';
      for (let i = 0; i < 5; i++) {
        const a = (i / 5) * Math.PI * 2 - Math.PI / 2;
        petals += `<ellipse cx="${(24 + Math.cos(a) * 11).toFixed(1)}"
                    cy="${(24 + Math.sin(a) * 11).toFixed(1)}" rx="8" ry="6.4"
                    fill="${fill.face}" ${st}/>`;
      }
      inner = petals + `<circle cx="24" cy="24" r="6" fill="${fill.core || '#fff3a8'}"/>`;
    } else if (kind === 'bow') {
      inner = `<path d="M22 22 L6 11 L6 33Z" fill="${fill.face}" ${st}/>
               <path d="M26 22 L42 11 L42 33Z" fill="${fill.face}" ${st}/>
               <circle cx="24" cy="22" r="6" fill="${fill.core || '#fff'}" ${st}/>`;
    } else { 
      inner = `<rect x="2" y="10" width="44" height="20" fill="${fill.face}"
                opacity=".78" transform="rotate(-9 24 20)"/>`;
    }
    return `<svg class="sticker" viewBox="0 0 48 48" width="${s}" height="${s}">${inner}</svg>`;
  }

  
  function hairclip() {
    const id = u('hc');
    return `<svg class="art item" viewBox="0 0 128 88" xmlns="http://www.w3.org/2000/svg">
      <defs>${grainDefs(id, 0.85, 0.12)}</defs>
      <g filter="url(#${id})">
        <rect width="128" height="88" fill="#f2eee6"/>
        <g transform="translate(64,44)">
          <path d="M0 0 C-14 -22 -44 -26 -46 -8 C-48 10 -20 10 0 0Z"
                fill="#ff9ecd" stroke="#e0548f" stroke-width="2" stroke-linejoin="round"/>
          <path d="M0 0 C14 -22 44 -26 46 -8 C48 10 20 10 0 0Z"
                fill="#ff9ecd" stroke="#e0548f" stroke-width="2" stroke-linejoin="round"/>
          <path d="M0 0 C-12 20 -36 26 -38 12 C-40 2 -18 2 0 0Z"
                fill="#ffb8db" stroke="#e0548f" stroke-width="2" stroke-linejoin="round"/>
          <path d="M0 0 C12 20 36 26 38 12 C40 2 18 2 0 0Z"
                fill="#ffb8db" stroke="#e0548f" stroke-width="2" stroke-linejoin="round"/>
          <ellipse cx="0" cy="0" rx="4.5" ry="15" fill="#ffd9ea"
                   stroke="#e0548f" stroke-width="1.6"/>
          <path d="M0 -14 q-7 -12 -15 -15 M0 -14 q7 -12 15 -15"
                stroke="#e0548f" stroke-width="1.8" fill="none" stroke-linecap="round"/>
          <circle cx="-19" cy="-9" r="3.2" fill="#fff" opacity=".75"/>
          <circle cx="19" cy="-9" r="3.2" fill="#fff" opacity=".75"/>
        </g>
      </g>
    </svg>`;
  }

  
  function fileIcon(kind) {
    const page = `<path d="M2 1 h8 l4 4 v10 H2Z" fill="#fdfdfa" stroke="#7a7a6a" stroke-width="1"/>
                  <path d="M10 1 v4 h4" fill="#dcdcd0" stroke="#7a7a6a" stroke-width="1"/>`;
    if (kind === 'txt') {
      return `<svg viewBox="0 0 16 16" width="16" height="16">${page}
        <g stroke="#5a7fa8" stroke-width="1"><path d="M4 8 h8"/><path d="M4 11 h8"/><path d="M4 13.5 h5"/></g></svg>`;
    }
    if (kind === 'bmp' || kind === 'img') {
      return `<svg viewBox="0 0 16 16" width="16" height="16">${page}
        <rect x="4" y="7" width="8" height="6" fill="#cfe6f5"/>
        <circle cx="6.4" cy="9" r="1.1" fill="#e8a33c"/>
        <path d="M4 13 l3 -3 l2 2 l2 -2 l1.6 3Z" fill="#6aa84f"/></svg>`;
    }
    
    if (kind === 'html') {
      return `<svg viewBox="0 0 16 16" width="16" height="16">${page}
        <rect x="4" y="7" width="8" height="6" rx=".8" fill="#e8f1fa" stroke="#7aa0c8" stroke-width=".7"/>
        <text x="8" y="12.2" text-anchor="middle" font-size="6.4" font-style="italic"
              font-family="Times New Roman,serif" fill="#1e6fc4">e</text></svg>`;
    }
    
    if (kind === 'lock') {
      return `<svg viewBox="0 0 16 16" width="16" height="16">${page}
        <rect x="4.6" y="9" width="6.8" height="5" rx=".6"
              fill="#c9a94a" stroke="#8a6a1a" stroke-width="1"/>
        <path d="M6.4 9 V7.4 a1.6 1.6 0 0 1 3.2 0 V9" fill="none"
              stroke="#8a6a1a" stroke-width="1.3"/>
        <circle cx="8" cy="11.4" r="1" fill="#5a4410"/></svg>`;
    }
    return `<svg viewBox="0 0 16 16" width="16" height="16">${page}
      <g stroke="#9a9a8a" stroke-width="1"><path d="M4 8 h8"/><path d="M4 11 h8"/></g></svg>`;
  }

  
  function videoFileIcon() {
    return `<svg viewBox="0 0 32 32" width="32" height="32" class="di-svg">
      <path d="M5 3 h15 l7 7 v19 H5Z" fill="#f4f2ec" stroke="#8a8a7a" stroke-width="1"/>
      <path d="M20 3 v7 h7" fill="#d8d4c8" stroke="#8a8a7a" stroke-width="1"/>
      <rect x="8" y="14" width="16" height="11" fill="#1a1a1e" stroke="#6a6a5a" stroke-width="1"/>
      <path d="M14 16.5 v6 l6 -3Z" fill="#e8e4d8"/>
      <g fill="#8a8a7a">
        <rect x="8" y="25.6" width="3" height="2"/><rect x="13" y="25.6" width="3" height="2"/>
        <rect x="18" y="25.6" width="3" height="2"/><rect x="23" y="25.6" width="1.6" height="2"/>
      </g>
      <rect x="8" y="11.6" width="16" height="2.4" fill="#c0392b" opacity=".8"/>
    </svg>`;
  }
  

  
  function rabbit(cls) {
    return `<img class="mascot ${cls || ''}" src="assets/mascot_rabbit.png" alt="">`;
  }

  
  function siteMark(kind) {
    const box = (inner, bg) =>
      `<svg class="smark" viewBox="0 0 24 24" width="22" height="22" xmlns="http://www.w3.org/2000/svg">
        ${bg ? `<rect x="1" y="1" width="22" height="22" rx="4" fill="${bg}"/>` : ''}
        ${inner}</svg>`;

    switch (kind) {
      
      case 'bridge':
        return box(`
          <path d="M2 17 h20" stroke="#1a4a7a" stroke-width="2" stroke-linecap="round"/>
          <path d="M4 17 a8 8 0 0 1 16 0" fill="none" stroke="#c9a227" stroke-width="2.4"/>
          <path d="M8 17 v-6 M16 17 v-6" stroke="#1a4a7a" stroke-width="1.4"/>
          <path d="M3 20 h18" stroke="#7aa8d0" stroke-width="1.6" stroke-linecap="round"/>`, '#dceaf5');

      
      case 'radio':
        return box(`
          <path d="M12 20 v-9" stroke="#2e7d32" stroke-width="2" stroke-linecap="round"/>
          <circle cx="12" cy="10" r="2.4" fill="#c0392b"/>
          <path d="M6 7 a8 8 0 0 1 12 0" fill="none" stroke="#2e7d32" stroke-width="1.6"/>
          <path d="M8.5 9 a5 5 0 0 1 7 0" fill="none" stroke="#7bbf6a" stroke-width="1.4"/>
          <path d="M6 21 h12" stroke="#2e7d32" stroke-width="2" stroke-linecap="round"/>`, '#e6f2e2');

      
      case 'mail':
        return box(`
          <rect x="3" y="7" width="18" height="12" rx="2" fill="#fff" stroke="#1b4a7d" stroke-width="1.6"/>
          <path d="M3 9 l9 6 l9-6" fill="none" stroke="#e0a020" stroke-width="1.8"/>`, '#dceaf5');

      
      case 'key':
        return box(`
          <rect x="3" y="16" width="18" height="3" rx="1.4" fill="#5a4a3a"/>
          <path d="M5 16 l10 -7" stroke="#8a7a5a" stroke-width="2.2" stroke-linecap="round"/>
          <circle cx="17" cy="9" r="3.2" fill="#c9a227" stroke="#7a5a10" stroke-width="1.2"/>
          <path d="M18 19 v2 M20 19 v1.4" stroke="#c9a227" stroke-width="1.6"/>`, '#f0ead8');

      
      case 'chat':
        return box(`
          <path d="M3 6 h11 a2 2 0 0 1 2 2 v5 a2 2 0 0 1 -2 2 h-6 l-4 3 v-3 h-1 a1 1 0 0 1 -1 -1 v-7 Z"
                fill="#fff" stroke="#1a4a7a" stroke-width="1.4"/>
          <path d="M13 10 h6 a2 2 0 0 1 2 2 v4 a2 2 0 0 1 -2 2 h-1 v2.4 l-3 -2.4 h-2
                   a2 2 0 0 1 -2 -2 v-4 a2 2 0 0 1 2 -2 Z"
                fill="#ffe08a" stroke="#8a6a10" stroke-width="1.4"/>`, '#dceaf5');

      
      case 'park':
        return box(`
          <path d="M6 20 v-4 M4 20 h4" stroke="#5a3a1a" stroke-width="1.6" stroke-linecap="round"/>
          <circle cx="6" cy="11" r="5" fill="#4a8a3a"/>
          <path d="M15 20 v-6" stroke="#5a3a1a" stroke-width="1.6"/>
          <path d="M12 14 h6 l-3 -3.4 Z" fill="#2f6b8a"/>
          <path d="M12 20 h6" stroke="#5a3a1a" stroke-width="1.6" stroke-linecap="round"/>`, '#e6f2e2');

      
      case 'market':
        return box(`
          <path d="M4 10 h16 l-2 9 a2 2 0 0 1 -2 1.6 H8 a2 2 0 0 1 -2 -1.6 Z"
                fill="#d8a860" stroke="#7a4a10" stroke-width="1.5"/>
          <path d="M8 10 a4 4 0 0 1 8 0" fill="none" stroke="#7a4a10" stroke-width="1.5"/>
          <path d="M11 13 v5 M14 13 v5" stroke="#7a4a10" stroke-width="1"/>`, '#f6e6d0');

      
      case 'stage':
        return box(`
          <rect x="3" y="13" width="18" height="8" rx="1.4" fill="#8a2a20" stroke="#5a1410" stroke-width="1.4"/>
          <path d="M12 13 v8" stroke="#5a1410" stroke-width="1.2"/>
          <path d="M3 4 h18 v4 a9 3 0 0 1 -18 0 Z" fill="#2f4a7a"/>
          <path d="M6 4 v5 M12 4 v6 M18 4 v5" stroke="#1a2a4a" stroke-width="1.3"/>`, '#e2e8f2');

      
      case 'archive':
        return box(`
          <rect x="3" y="8" width="18" height="12" rx="1.4" fill="#8a7a5a" stroke="#4a3a20" stroke-width="1.5"/>
          <rect x="3" y="11" width="18" height="1.6" fill="#4a3a20"/>
          <rect x="6" y="5" width="5" height="4" rx="1" fill="#c9a227" stroke="#7a5a10" stroke-width="1"/>
          <rect x="13" y="5" width="5" height="4" rx="1" fill="#c9a227" stroke="#7a5a10" stroke-width="1"/>`, '#efe6d2');

      
      case 'tent':
        return box(`
          <path d="M12 3 L22 20 H2 Z" fill="#c0392b" stroke="#7a1a10" stroke-width="1.5"/>
          <path d="M12 3 L12 20" stroke="#f0e0c0" stroke-width="1.2"/>
          <path d="M12 3 L17 20 M12 3 L7 20" stroke="#f0e0c0" stroke-width="1"/>
          <path d="M12 3 v-2" stroke="#7a1a10" stroke-width="1.4"/>
          <path d="M22 20 h-3 l-2 2 h-10 l-2 -2 H2" fill="#c9a227" stroke="none"/>`, '#f5e8d8');

      default:
        return box(`<circle cx="12" cy="12" r="7" fill="#c9a227" stroke="#7a5a10"
          stroke-width="1.5"/>`, '#efe6d2');
    }
  }

  
  function festoon(n) {
    let bulbs = '';
    for (let i = 0; i < n; i++) {
      const x = (i + 0.5) * (100 / n);
      const sag = Math.sin((i / (n - 1)) * Math.PI) * 13;   // 中间下垂
      bulbs += `<i class="fest-bulb" style="left:${x.toFixed(2)}%;top:${(16 + sag).toFixed(1)}%;
        animation-delay:${(i * 0.16).toFixed(2)}s"></i>`;
    }
    return `<div class="festoon"><svg class="fest-wire" viewBox="0 0 100 30"
      preserveAspectRatio="none"><path d="M0 16 Q50 ${16 + 26} 100 16"
      fill="none" stroke="#2a1a12" stroke-width="0.8"/></svg>${bulbs}</div>`;
  }

  
  function bunting(n) {
    let flags = '';
    const COL = ['#c0392b', '#e8c86a', '#2f6b8a', '#f0e0c0', '#2e7d32'];
    for (let i = 0; i < n; i++) {
      const x = (i + 0.5) * (100 / n);
      flags += `<i class="bunt-flag" style="left:${x.toFixed(2)}%;
        background:${COL[i % COL.length]};
        animation-delay:${(i % 6) * 0.22}s"></i>`;
    }
    return `<div class="bunting"><svg class="bunt-wire" viewBox="0 0 100 12"
      preserveAspectRatio="none"><path d="M0 2 Q50 12 100 2" fill="none"
      stroke="#3a2a1a" stroke-width="0.7"/></svg>${flags}</div>`;
  }

  
  function sparkles(n, seed) {
    const CH = ['♥', '★', '✿', '♪', '❀', '☆'];
    let s = seed || 7;
    const rnd = () => (s = (s * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff;
    let out = '';
    for (let i = 0; i < n; i++) {
      const ch = CH[Math.floor(rnd() * CH.length)];
      out += `<i class="spk" style="left:${(rnd() * 96 + 2).toFixed(1)}%;
        font-size:${(10 + rnd() * 12).toFixed(0)}px;
        animation-duration:${(8 + rnd() * 8).toFixed(1)}s;
        animation-delay:${(-rnd() * 12).toFixed(1)}s;
        opacity:${(0.35 + rnd() * 0.45).toFixed(2)}">${ch}</i>`;
    }
    return `<div class="sparkles" aria-hidden="true">${out}</div>`;
  }

  
  function lockIcon(kind) {
    const box = (inner) =>
      `<svg class="lk-ico" viewBox="0 0 24 24" width="100%" height="100%"
        xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;
    switch (kind) {
      case 'strawberry':
        return box(`
          <path d="M12 5 c5 0 8 3 8 7 c0 5 -5 9 -8 10 c-3 -1 -8 -5 -8 -10 c0 -4 3 -7 8 -7Z"
                fill="#e0322e" stroke="#8a1410" stroke-width="1"/>
          <path d="M12 5 l-4 -3 h8Z" fill="#3a8a2a" stroke="#256018" stroke-width="1"/>
          <path d="M12 5 v-3" stroke="#256018" stroke-width="1.4"/>
          <g fill="#ffe8b0">
            <circle cx="9" cy="10" r="1"/><circle cx="15" cy="10" r="1"/>
            <circle cx="12" cy="13" r="1"/><circle cx="8.5" cy="14.5" r="1"/>
            <circle cx="15.5" cy="14.5" r="1"/><circle cx="12" cy="17.5" r="1"/>
          </g>
          <path d="M9.5 8.5 a2 2 0 0 1 2 -1" stroke="#ff9a90" stroke-width="1.2"
                fill="none" stroke-linecap="round"/>`);
      case 'rabbit':
        return box(`
          <ellipse cx="8.5" cy="7" rx="2.6" ry="6" fill="#f6f2ee" stroke="#8a7a70" stroke-width="1"/>
          <ellipse cx="15.5" cy="7" rx="2.6" ry="6" fill="#f6f2ee" stroke="#8a7a70" stroke-width="1"/>
          <ellipse cx="8.5" cy="7.5" rx="1.2" ry="3.6" fill="#f0a0b0"/>
          <ellipse cx="15.5" cy="7.5" rx="1.2" ry="3.6" fill="#f0a0b0"/>
          <circle cx="12" cy="15.5" r="6" fill="#f6f2ee" stroke="#8a7a70" stroke-width="1"/>
          <circle cx="9.6" cy="14" r="1.1" fill="#2a2a2a"/>
          <circle cx="14.4" cy="14" r="1.1" fill="#2a2a2a"/>
          <path d="M12 16.6 l-1.2 1 h2.4Z" fill="#e07080"/>
          <path d="M8.6 17.6 q3.4 2.4 6.8 0" stroke="#b09080" stroke-width="1" fill="none"/>`);
      case 'apple':
        return box(`
          <path d="M12 6 c-1 -2 -4 -3 -6 -1 c-2.6 2.6 -1.6 9 1.6 12.4
                   c1.6 1.6 3 1 4.4 1 c1.4 0 2.8 0.6 4.4 -1
                   c3.2 -3.4 4.2 -9.8 1.6 -12.4 c-2 -2 -5 -1 -6 1Z"
                fill="#d92b28" stroke="#8a1410" stroke-width="1"/>
          <path d="M12 6 v-3" stroke="#6a4a1a" stroke-width="1.6" stroke-linecap="round"/>
          <path d="M12 4 q4 -2.4 5.4 0.4 q-3.4 1.6 -5.4 -0.4Z"
                fill="#3a8a2a" stroke="#256018" stroke-width="0.8"/>
          <path d="M8.4 9 a2.4 2.4 0 0 1 2.2 -1.6" stroke="#ff9a90" stroke-width="1.3"
                fill="none" stroke-linecap="round"/>`);
      case 'dog':
        return box(`
          <ellipse cx="6" cy="11" rx="2.6" ry="5" fill="#a8703a" stroke="#6a4018" stroke-width="1"/>
          <ellipse cx="18" cy="11" rx="2.6" ry="5" fill="#a8703a" stroke="#6a4018" stroke-width="1"/>
          <circle cx="12" cy="12" r="6.2" fill="#d8a86a" stroke="#6a4018" stroke-width="1"/>
          <circle cx="9.6" cy="11" r="1.2" fill="#2a2018"/>
          <circle cx="14.4" cy="11" r="1.2" fill="#2a2018"/>
          <ellipse cx="12" cy="15.4" rx="3" ry="2.2" fill="#f0dcc0"/>
          <ellipse cx="12" cy="14.4" rx="1.5" ry="1.1" fill="#2a2018"/>
          <path d="M12 15.6 v1.6" stroke="#6a4018" stroke-width="1"/>
          <path d="M9 18.6 h6" stroke="#c0392b" stroke-width="1.6" stroke-linecap="round"/>`);
      case 'star':
        return box(`
          <path d="M12 2.6 l2.9 6.1 l6.7 0.9 l-4.9 4.6 l1.2 6.6 l-5.9 -3.2
                   l-5.9 3.2 l1.2 -6.6 l-4.9 -4.6 l6.7 -0.9Z"
                fill="#f5c518" stroke="#a8760a" stroke-width="1.1" stroke-linejoin="round"/>
          <path d="M12 6 l1.6 3.4 l3.7 0.5 l-2.7 2.6 l0.7 3.6 l-3.3 -1.8"
                fill="#ffe98a" opacity=".7"/>`);
      case 'rainbow':
        return box(`
          <path d="M2.4 19 a9.6 9.6 0 0 1 19.2 0" fill="none"
                stroke="#e0322e" stroke-width="2.6" stroke-linecap="round"/>
          <path d="M4.8 19 a7.2 7.2 0 0 1 14.4 0" fill="none"
                stroke="#f5a018" stroke-width="2.6" stroke-linecap="round"/>
          <path d="M7.2 19 a4.8 4.8 0 0 1 9.6 0" fill="none"
                stroke="#f5d018" stroke-width="2.6" stroke-linecap="round"/>
          <path d="M9.6 19 a2.4 2.4 0 0 1 4.8 0" fill="none"
                stroke="#3a9ad0" stroke-width="2.6" stroke-linecap="round"/>
          <ellipse cx="4.6" cy="19.4" rx="2.2" ry="1.5" fill="#f0f4f8" stroke="#c0ccd8" stroke-width=".8"/>
          <ellipse cx="19.4" cy="19.4" rx="2.2" ry="1.5" fill="#f0f4f8" stroke="#c0ccd8" stroke-width=".8"/>`);
      default: 
        return box(`
          <g fill="#f06aa8" stroke="#b03068" stroke-width="0.9">
            <ellipse cx="12" cy="6.6" rx="3.2" ry="3.8"/>
            <ellipse cx="17.1" cy="10.3" rx="3.2" ry="3.8" transform="rotate(72 17.1 10.3)"/>
            <ellipse cx="15.2" cy="16.3" rx="3.2" ry="3.8" transform="rotate(144 15.2 16.3)"/>
            <ellipse cx="8.8" cy="16.3" rx="3.2" ry="3.8" transform="rotate(216 8.8 16.3)"/>
            <ellipse cx="6.9" cy="10.3" rx="3.2" ry="3.8" transform="rotate(288 6.9 10.3)"/>
          </g>
          <circle cx="12" cy="11.6" r="2.6" fill="#f5d018" stroke="#a8760a" stroke-width="0.9"/>
          <circle cx="12" cy="11.6" r="1.1" fill="#fff3b0"/>`);
    }
  }

  
  function flower(bloomed, hue) {
    const p1 = `hsl(${hue},72%,80%)`, p2 = `hsl(${hue},68%,66%)`;
    const core = `hsl(${(hue + 40) % 360},85%,72%)`;
    if (!bloomed) {
      
      return `<svg viewBox="0 0 40 40" width="40" height="40">
        <path d="M20 34 V22" stroke="#5a8a4a" stroke-width="2" stroke-linecap="round"/>
        <path d="M20 26 q-7 -2 -8 -7 q6 0 8 5Z" fill="#5a8a4a"/>
        <path d="M20 28 q7 -2 8 -7 q-6 0 -8 5Z" fill="#4a7a3a"/>
        <path d="M20 8 q6 5 5 12 q-1 6 -5 8 q-4 -2 -5 -8 q-1 -7 5 -12Z"
              fill="${p2}" stroke="${p1}" stroke-width="1"/>
        <path d="M20 8 q3 6 3 12 q0 6 -3 8" fill="none"
              stroke="${p1}" stroke-width="1" opacity=".8"/>
      </svg>`;
    }
    
    let petals = '';
    for (let i = 0; i < 5; i++) {
      petals += `<ellipse cx="20" cy="11" rx="5.4" ry="8.4" fill="${p2}"
        stroke="${p1}" stroke-width="1"
        transform="rotate(${i * 72} 20 20)"/>`;
    }
    return `<svg viewBox="0 0 40 40" width="40" height="40">
      <path d="M20 34 V21" stroke="#5a8a4a" stroke-width="2" stroke-linecap="round"/>
      <path d="M20 27 q-8 -2 -9 -8 q7 0 9 6Z" fill="#5a8a4a"/>
      ${petals}
      <circle cx="20" cy="20" r="4.2" fill="${core}"/>
      <circle cx="20" cy="20" r="1.6" fill="#fff" opacity=".7"/>
    </svg>`;
  }

  
  function stamp(text) {
    const id = u('st');
    return `<svg class="seal-svg" viewBox="0 0 72 72" width="72" height="72">
      <defs><filter id="${id}">
        <feTurbulence type="fractalNoise" baseFrequency="0.55" numOctaves="2" result="n"/>
        <feDisplacementMap in="SourceGraphic" in2="n" scale="0.9" xChannelSelector="R" yChannelSelector="G"/>
      </filter></defs>
      <g filter="url(#${id})">
        <rect x="4" y="4" width="64" height="64" rx="4" fill="none" stroke="#8b1a1a" stroke-width="4"/>
        <rect x="10" y="10" width="52" height="52" rx="2" fill="none" stroke="#8b1a1a" stroke-width=".8" opacity=".55"/>
        <text x="36" y="48" text-anchor="middle" font-size="34" font-family="KaiTi,楷体,STKaiti,serif"
              fill="#8b1a1a" font-weight="bold">${text}</text>
      </g>
    </svg>`;
  }

  
  function poster() {
    const id = u('po');
    return `<svg class="art" viewBox="0 0 240 340" xmlns="http://www.w3.org/2000/svg">
      <defs>${grainDefs(id, 0.9, 0.16)}</defs>
      <g filter="url(#${id})">
        <rect width="240" height="340" fill="#7d1414"/>
        <rect x="6" y="6" width="228" height="328" fill="none" stroke="#e8c04a" stroke-width="2"/>
        <rect x="11" y="11" width="218" height="318" fill="none" stroke="#e8c04a" stroke-width="1"/>

        <text x="120" y="42" text-anchor="middle" font-size="16" font-family="SimHei,黑体"
              fill="#e8c04a" letter-spacing="4">郭记大篷车</text>
        <text x="120" y="60" text-anchor="middle" font-size="8.5" fill="#f0dca0"
              letter-spacing="1">流 动 演 出 · 常 年 在 外 · 风 雨 无 阻</text>
        <path d="M24 70 H216" stroke="#e8c04a" stroke-width="1" opacity=".7"/>

        <!-- 花瓶与姑娘 -->
        <g transform="translate(120,196)">
          <ellipse cx="0" cy="74" rx="46" ry="10" fill="#3a0808" opacity=".7"/>
          <path d="M-30 70 Q-52 6 -24 -30 L24 -30 Q52 6 30 70 Z" fill="#356f8c" stroke="#a8d4e8" stroke-width="1.6"/>
          <g opacity=".6" fill="none" stroke="#e2f2fa" stroke-width="1.2">
            <path d="M-34 18 Q0 34 34 18"/><path d="M-30 42 Q0 56 30 42"/>
            <path d="M-16 -14 q8 -10 16 0 q8 -10 16 0"/>
          </g>
          <ellipse cx="0" cy="-30" rx="24" ry="7" fill="#1b3d4e" stroke="#a8d4e8" stroke-width="1.4"/>
          <path d="M-24 -30 q24 10 48 0 l4 8 q-28 12 -56 0Z" fill="#8f1e1e"/>
          <circle cx="0" cy="-58" r="19" fill="#e8d9c0"/>
          <path d="M-19 -60 q1 -22 19 -22 q18 0 19 22 q-6 -12 -19 -12 q-13 0 -19 12Z" fill="#171514"/>
          <ellipse cx="-6.5" cy="-58" rx="2.6" ry="1.7" fill="#1a1a1a"/>
          <ellipse cx="6.5" cy="-58" rx="2.6" ry="1.7" fill="#1a1a1a"/>
          <path d="M-5 -49 q5 3.5 10 0" stroke="#8a2b2b" stroke-width="1.5" fill="none"/>
        </g>

        <text x="120" y="292" text-anchor="middle" font-size="27" font-family="SimHei,黑体"
              fill="#ffd94a" letter-spacing="5">花瓶姑娘</text>
        <text x="120" y="310" text-anchor="middle" font-size="8.5" fill="#f0dca0"
              letter-spacing="1">真 人 真 事 · 不 看 后 悔 · 五 元 一 位</text>
        <text x="120" y="328" text-anchor="middle" font-size="7.5" fill="#c9a04a"
              letter-spacing=".5">常年承接：庙会 开业 婚庆 白事</text>
      </g>
    </svg>`;
  }

  
  function troupePhoto() {
    const g = u('tp'), b = u('tb');
    const person = (x, y, h, c) => `
      <circle cx="${x}" cy="${y}" r="${h * 0.17}" fill="${c}"/>
      <path d="M${x - h * 0.17} ${y + h * 0.15} q${h * 0.17} ${-h * 0.06} ${h * 0.34} 0
               l${h * 0.05} ${h * 0.52} l${-h * 0.44} 0 Z" fill="${c}"/>`;
    let front = '';
    [62, 108, 154, 200, 246, 292, 338].forEach((x, i) => {
      front += person(x, 152 + (i % 2) * 7, 62, i === 3 ? '#4b463a' : '#585143');
    });
    return `<svg class="art photo" viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg">
      <defs>${grainDefs(g, 0.95, 0.24)}${softDefs(b, 0.5)}</defs>
      <g filter="url(#${g})">
        <rect width="400" height="240" fill="#c6c0a8"/>
        <rect width="400" height="118" fill="#a9a992"/>
        <!-- 大篷车 -->
        <path d="M122 132 L200 58 L278 132 Z" fill="#69614e"/>
        <rect x="122" y="130" width="156" height="62" fill="#776e56"/>
        <rect x="186" y="152" width="30" height="40" fill="#39342a"/>
        <rect x="132" y="112" width="136" height="13" fill="#8c2f24" opacity=".85"/>
        <text x="200" y="122" text-anchor="middle" font-size="8" fill="#f2dca0"
              font-family="SimHei,黑体">郭记大篷车</text>
        <!-- 旗 -->
        <path d="M96 60 L96 132" stroke="#4a4436" stroke-width="2"/>
        <path d="M96 62 L132 72 L96 84 Z" fill="#a83226"/>

        <g filter="url(#${b})">
          <!-- 化妆镜 -->
          <rect x="16" y="82" width="70" height="118" fill="#8d9488" stroke="#4a4a3e" stroke-width="3"/>
          <rect x="20" y="86" width="62" height="110" fill="#bfc5b8" opacity=".9"/>
          ${person(52, 152, 62, '#514c3f')}
          <text x="22" y="79" font-size="7" fill="#3a352a" font-family="monospace">MIRROR</text>
          <!-- 镜面的裂痕 -->
          <path d="M20 120 L60 160 L34 190" stroke="#7d8478" stroke-width=".8" fill="none" opacity=".7"/>
          <!-- 前排七人 -->
          ${front}
        </g>
        <rect y="200" width="400" height="40" fill="#8d8873"/>
        <text x="304" y="232" font-size="8" fill="#57513f" font-family="monospace">1999-08-12</text>
      </g>
    </svg>`;
  }

  
  function vaseProduct() {
    const id = u('vp'), b = u('vb');
    return `<svg class="art item" viewBox="0 0 220 220" xmlns="http://www.w3.org/2000/svg">
      <defs>${grainDefs(id, 0.8, 0.14)}${softDefs(b, 0.4)}</defs>
      <g filter="url(#${id})">
        <rect width="220" height="220" fill="#d8d4c8"/>
        <rect y="168" width="220" height="52" fill="#b8b2a2"/>
        <g filter="url(#${b})">
          <ellipse cx="110" cy="172" rx="46" ry="9" fill="#8e8878" opacity=".7"/>
          <path d="M82 168 Q58 96 88 62 L132 62 Q162 96 138 168 Z" fill="#3d6f88" stroke="#a9cede" stroke-width="1.6"/>
          <g opacity=".6" fill="none" stroke="#e4f2fa" stroke-width="1.3">
            <path d="M76 110 Q110 128 144 110"/>
            <path d="M80 134 Q110 150 140 134"/>
            <path d="M96 78 q14 -14 28 0 q-14 8 -28 0"/>
          </g>
          <ellipse cx="110" cy="62" rx="24" ry="7" fill="#254a5c" stroke="#a9cede" stroke-width="1.4"/>
          <!-- 底款 -->
          <text x="110" y="158" text-anchor="middle" font-size="7" fill="#bcd8e6"
                font-family="KaiTi,楷体,serif" opacity=".85">柳</text>
        </g>
        <text x="8" y="214" font-size="8" fill="#6a6455" font-family="monospace">item_19991104.jpg</text>
      </g>
    </svg>`;
  }

  
  function riverNight() {
    const g = u('rn');
    return `<svg class="art photo" viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
      <defs>${grainDefs(g, 0.9, 0.2)}</defs>
      <g filter="url(#${g})">
        <rect width="400" height="200" fill="#0a1016"/>
        <rect width="400" height="96" fill="#0e1720"/>
        <!-- 桥 -->
        <path d="M0 96 Q200 44 400 96 L400 108 L0 108 Z" fill="#070c11"/>
        <path d="M0 96 Q200 44 400 96" fill="none" stroke="#1d2a33" stroke-width="2"/>
        <!-- 岸边人影 -->
        <g fill="#050809">
          <ellipse cx="70" cy="104" rx="6" ry="9"/><rect x="65" y="110" width="10" height="22"/>
          <ellipse cx="110" cy="106" rx="6" ry="9"/><rect x="105" y="112" width="10" height="22"/>
          <ellipse cx="300" cy="105" rx="6" ry="9"/><rect x="295" y="111" width="10" height="22"/>
          <ellipse cx="338" cy="103" rx="6" ry="9"/><rect x="333" y="109" width="10" height="22"/>
        </g>
        <!-- 水面 -->
        <rect y="132" width="400" height="68" fill="#0b141b"/>
        <!-- 河灯 -->
        <g>
          <circle cx="96" cy="150" r="9" fill="#ffb300" opacity=".18"/>
          <circle cx="96" cy="150" r="3" fill="#ffc94d"/>
          <circle cx="170" cy="164" r="11" fill="#ff9e00" opacity=".16"/>
          <circle cx="170" cy="164" r="3.4" fill="#ffc94d"/>
          <circle cx="252" cy="152" r="9" fill="#ffb300" opacity=".18"/>
          <circle cx="252" cy="152" r="3" fill="#ffc94d"/>
          <circle cx="322" cy="170" r="12" fill="#ff8c00" opacity=".14"/>
          <circle cx="322" cy="170" r="3.4" fill="#ffc94d"/>
          <circle cx="212" cy="184" r="8" fill="#ffb300" opacity=".12"/>
          <circle cx="212" cy="184" r="2.6" fill="#ffb84d"/>
        </g>
        <!-- 倒影 -->
        <g opacity=".28">
          <rect x="94" y="152" width="4" height="26" fill="#ffb300"/>
          <rect x="168" y="166" width="4" height="24" fill="#ffb300"/>
          <rect x="250" y="154" width="4" height="26" fill="#ffb300"/>
          <rect x="320" y="172" width="4" height="22" fill="#ffb300"/>
        </g>
        <text x="8" y="192" font-size="8" fill="#5a6a74" font-family="monospace">hen deng jie 1999-08-14</text>
      </g>
    </svg>`;
  }

  
  function bridgeDay() {
    const g = u('bd');
    return `<svg class="art photo" viewBox="0 0 400 180" xmlns="http://www.w3.org/2000/svg">
      <defs>${grainDefs(g, 0.85, 0.22)}</defs>
      <g filter="url(#${g})">
        <rect width="400" height="180" fill="#cfc7ad"/>
        <rect width="400" height="86" fill="#b9b59c"/>
        <!-- 老槐 -->
        <path d="M42 118 L46 60 M46 60 q-22 -14 -30 -30 M46 60 q18 -16 30 -26 M46 60 q4 -26 -4 -36"
              stroke="#3b352a" stroke-width="4" fill="none" stroke-linecap="round"/>
        <ellipse cx="46" cy="42" rx="34" ry="20" fill="#4e5a3c" opacity=".85"/>
        <!-- 石桥 -->
        <path d="M96 118 Q200 74 304 118" stroke="#8e8878" stroke-width="3" fill="none"/>
        <path d="M96 118 Q200 74 304 118 L304 132 L96 132 Z" fill="#a29c8a"/>
        <g stroke="#8e8878" stroke-width="1.4">
          <path d="M124 112 v18"/><path d="M156 101 v28"/><path d="M200 92 v32"/>
          <path d="M244 99 v29"/><path d="M276 110 v19"/>
        </g>
        <!-- 水 -->
        <rect y="132" width="400" height="48" fill="#a8a894"/>
        <g stroke="#c2c2ae" stroke-width="1">
          <path d="M20 146 h60"/><path d="M120 156 h74"/><path d="M240 148 h66"/><path d="M320 162 h58"/>
        </g>
        <!-- 柳树 -->
        <path d="M352 120 L352 80" stroke="#4a4436" stroke-width="3"/>
        <g stroke="#7d8a55" stroke-width="1.6" fill="none">
          <path d="M352 82 q-16 10 -20 34"/><path d="M352 82 q14 12 16 36"/><path d="M352 82 q0 18 -2 34"/>
        </g>
        <text x="8" y="174" font-size="8" fill="#6a6455" font-family="monospace">liuhe bridge · 1999</text>
      </g>
    </svg>`;
  }

  
  function familyPhoto() {
    const g = u('fp');
    return `<svg class="art photo" viewBox="0 0 300 210" xmlns="http://www.w3.org/2000/svg">
      <defs>${grainDefs(g, 1.0, 0.26)}</defs>
      <g filter="url(#${g})">
        <rect width="300" height="210" fill="#b6b2a4"/>
        <rect x="0" y="140" width="300" height="70" fill="#a29e90"/>
        <!-- 大人 男 -->
        <circle cx="104" cy="76" r="22" fill="#8e8a7c"/>
        <path d="M78 140 q6 -44 26 -44 q20 0 26 44 Z" fill="#6f6b5e"/>
        <!-- 大人 女 -->
        <circle cx="196" cy="80" r="21" fill="#9a968a"/>
        <path d="M172 140 q5 -42 24 -42 q19 0 24 42 Z" fill="#7b776a"/>
        <!-- 孩子 -->
        <circle cx="150" cy="104" r="15" fill="#9d998c"/>
        <path d="M134 140 q4 -24 16 -24 q12 0 16 24 Z" fill="#807c6e"/>
        <!-- 红圈（后期手画） -->
        <circle cx="150" cy="104" r="24" fill="none" stroke="#a83226" stroke-width="2.2" opacity=".8"/>
        <text x="150" y="196" text-anchor="middle" font-size="9" fill="#5c574a"
              font-family="KaiTi,楷体,serif">郭永贵 · 妻 · 小女（1996年 摄）</text>
      </g>
    </svg>`;
  }

  
  const AVATAR_FILE = {
    girl:    'xiaoyu',    
    admin:   'user2',     
    man:     'user4',     
    radio:   'user3',     
    cat:     'default',   
    default: 'default'
  };

  function avatarSVG(kind) {
    let inner = '';
    if (kind === 'girl') {
      inner = `<rect width="48" height="48" fill="#1a2b3a"/>
        <circle cx="24" cy="22" r="10" fill="#e2d4bd"/>
        <path d="M14 22 q0 -15 10 -15 q10 0 10 15 q-3 -8 -10 -8 q-7 0 -10 8Z" fill="#191716"/>
        <ellipse cx="20.5" cy="22" rx="1.5" ry="1" fill="#222"/>
        <ellipse cx="27.5" cy="22" rx="1.5" ry="1" fill="#222"/>
        <path d="M20 27 q4 2.4 8 0" stroke="#8a3a3a" stroke-width="1" fill="none"/>
        <path d="M10 48 q4 -14 14 -14 q10 0 14 14Z" fill="#8c2b2b"/>`;
    } else if (kind === 'man') {
      inner = `<rect width="48" height="48" fill="#5a6b7a"/>
        <circle cx="24" cy="18" r="9.5" fill="#2f3a44"/>
        <path d="M10 48 q3 -18 14 -18 q11 0 14 18Z" fill="#2f3a44"/>
        <path d="M14 15 q10 -8 20 0" stroke="#2f3a44" stroke-width="3" fill="none"/>`;
    } else if (kind === 'radio') {
      inner = `<rect width="48" height="48" fill="#3a2c1c"/>
        <rect x="8" y="14" width="32" height="20" rx="2" fill="#c9b894"/>
        <g stroke="#6a5a3c" stroke-width="1">
          <path d="M10 20 h28"/><path d="M10 24 h28"/><path d="M10 28 h28"/>
        </g>
        <circle cx="24" cy="40" r="4" fill="#7a6440"/>
        <circle cx="38" cy="40" r="4" fill="#7a6440"/>`;
    } else if (kind === 'admin') {
      inner = `<rect width="48" height="48" fill="#dbe4ee"/>
        <circle cx="24" cy="19" r="9" fill="#3f4d5e"/>
        <path d="M11 48 q3 -16 13 -16 q10 0 13 16Z" fill="#3f4d5e"/>
        <rect x="6" y="4" width="36" height="8" rx="2" fill="#c0392b"/>
        <text x="24" y="11" text-anchor="middle" font-size="6.5" fill="#fff"
              font-family="SimHei,黑体">版主</text>`;
    } else { 
      inner = `<rect width="48" height="48" fill="#2b2b26"/>
        <ellipse cx="24" cy="28" rx="13" ry="11" fill="#8a8474"/>
        <path d="M13 20 l-2 -10 l9 6Z" fill="#8a8474"/>
        <path d="M35 20 l2 -10 l-9 6Z" fill="#8a8474"/>
        <ellipse cx="19" cy="26" rx="2" ry="2.6" fill="#20201c"/>
        <ellipse cx="29" cy="26" rx="2" ry="2.6" fill="#20201c"/>
        <path d="M24 31 l-2 2 h4Z" fill="#c98b8b"/>`;
    }
    return `<svg class="avatar" viewBox="0 0 48 48" width="48" height="48">${inner}</svg>`;
  }

  function avatar(kind) {
    const key = AVATAR_FILE[kind] || 'default';
    return `<span class="avatar-slot">
      <img class="avatar" src="${assetFile('avatars', key)}" alt=""
           onerror="this.style.display='none';this.nextElementSibling.style.display='block'">
      <span class="avatar-fb" style="display:none">${avatarSVG(kind)}</span>
    </span>`;
  }

  
  function waveform(seed, active) {
    let bars = '';
    let s = seed || 7;
    const rnd = () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
    for (let i = 0; i < 64; i++) {
      const h = 4 + rnd() * (active ? 46 : 26);
      bars += `<rect x="${i * 5}" y="${52 - h / 2}" width="2.4" height="${h}" fill="${
        active ? '#ffcc44' : '#4a7f5a'}"/>`;
    }
    return `<svg class="waveform" viewBox="0 0 320 56" preserveAspectRatio="none">${bars}</svg>`;
  }

  
  function construction() {
    return `<svg class="worker-svg" viewBox="0 0 40 40" width="34" height="34">
      <g>
        <circle cx="20" cy="11" r="5" fill="#e8c04a"/>
        <rect x="14" y="5" width="12" height="3" rx="1.5" fill="#8c2f24"/>
        <path d="M15 17 q5 -3 10 0 l2 12 h-14Z" fill="#2f5f8c"/>
        <path d="M25 19 l10 -8" stroke="#6b4a2a" stroke-width="2.4" stroke-linecap="round"/>
        <path d="M33 10 l4 -2" stroke="#9a9a9a" stroke-width="2.6" stroke-linecap="round"/>
        <path d="M15 29 v8 M25 29 v8" stroke="#2f2f2f" stroke-width="2.4" stroke-linecap="round"/>
        <animateTransform attributeName="transform" type="rotate"
          values="-6 20 30;6 20 30;-6 20 30" dur="0.7s" repeatCount="indefinite"/>
      </g>
    </svg>`;
  }

  
  function newBadge() {
    return `<span class="new-badge">NEW!</span>`;
  }

  
  function paperDoll() {
    return `<svg viewBox="0 0 24 36" width="24" height="36">
      <ellipse cx="12" cy="7" rx="6" ry="7" fill="#fbfbf6" stroke="#b9b9a8" stroke-width="1"/>
      <path d="M6 14 q6 -3 12 0 l5 20 h-22Z" fill="#fbfbf6" stroke="#b9b9a8" stroke-width="1"/>
      <circle cx="10" cy="6" r="1" fill="#b0b0a0"/><circle cx="14" cy="6" r="1" fill="#b0b0a0"/>
    </svg>`;
  }

  
  function bbsIcon() {
    return `<svg viewBox="0 0 16 16" width="14" height="14" style="vertical-align:-2px">
      <rect width="16" height="16" rx="2" fill="#336699"/>
      <path d="M4 5 h8 M4 8 h8 M4 11 h5" stroke="#fff" stroke-width="1.4" stroke-linecap="round"/>
    </svg>`;
  }

  
  function snowAmount() { return 1; }

  return {
    stamp, poster, troupePhoto, vaseProduct,
    riverNight, bridgeDay, familyPhoto, avatar, avatarSVG,
    waveform, construction, newBadge, paperDoll, bbsIcon, slot,
    portraitPlaceholder, deskIcon, sticker, hairclip, fileIcon, assetFile, u, flower, videoFileIcon,
    rabbit, siteMark, festoon, bunting, sparkles, lockIcon
  };
})();
