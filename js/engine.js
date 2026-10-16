
window.VG = window.VG || {};


VG.state = {
  route: 'desk',
  booted: false,
  user: { name: '', email: '' },
  registered: false,
  loggedIn: false,
  solved: {},
  visitedCount: {},
  diaryRead: 0,
  guestbookRead: 0,
  
  sawTruth: false,        
  secretUnlocked: false,  
  xiaoyuUnlocked: false,  
  lastSearch: '',         
  
  bloomed: [],
  
  mailLoggedIn: false,
  mailFolder: 'inbox',    
  mailRead: [],           
  mailOpen: '',           
  guoAdminLoggedIn: false, 
  
  guoScared: false,
  
  birdBest: 0,
  
  mazeOnDesk: false,       
  musicOn: false,          
                           
  secretMailOpen: false,   
  smOpen: null,            
  seenBadLink: false,      
  seeStep: 0,              
  seeDone: false,          
  crackOnDesk: false,      
  mazeCracked: false,      
  rebornOnDesk: false,
  rebornDone: false,       
  rebornUser: null,        
  newsOpen: null,
  nlPanel: null,            
  nlName: null,             
  nlRegistered: false,          
  smRead: {},              
  deskBroken: false,       
  secretPick: [],          
  
  mysteryDone: false,      
  mysteryOnDesk: false,    
  myMessages: [],         
  videoWatched: false,
  mirrorSeen: false,
  startedAt: Date.now()
};


VG.stateDefaults = JSON.parse(JSON.stringify(VG.state));

VG.save = function () {
  try {
    const s = { ...VG.state };
    delete s.route;
    localStorage.setItem('vase-girl-save', JSON.stringify(s));
  } catch (e) {  }
};

VG.resetState = function () {
  try {
    Object.keys(VG.state).forEach((k) => { delete VG.state[k]; });
    Object.assign(VG.state, JSON.parse(JSON.stringify(VG.stateDefaults)));
  } catch (e) {  }
};
VG.load = function () {
  try {
    const raw = localStorage.getItem('vase-girl-save');
    if (raw) Object.assign(VG.state, JSON.parse(raw));
  } catch (e) {  }
};


VG.routes = {
  'desk':         { url: 'C:\\',                                             title: '我的电脑' },
  
  'portal':       { url: 'http://www.zy114.com/',                            title: '中原导航 —— 上网从这里开始' },
  'morse':        { url: 'http://www.radiodiy.com.cn/morse.htm',             title: '摩斯电码入门 - 发烧友之家' },
  'games':        { url: 'http://www.2349.com/',                            title: '2349小游戏 —— 免费在线小游戏大全' },
  'bird':         { url: 'http://www.2349.com/game/bird.htm',               title: '飞翔的小鸟 - 2349小游戏' },
  
  'see':          { url: 'http://www.hq-info.com.cn/~see/see.htm',        title: '无所不知的花瓶姑娘' },
  'newlife':      { url: 'http://www.newlife.org.cn/',                       title: '新生 · NEW LIFE' },
  'newlife-reg':  { url: 'http://www.newlife.org.cn/join.html',                       title: '注册账号 - 新生' },
  'news':         { url: 'http://www.liuhe-wb.com.cn/',                     title: '柳河晚报 电子版' },
  'class98':      { url: 'http://go.163.com/~liuhe9803/',                   title: '柳河二中 98 级 3 班 同学录' },
  'park':         { url: 'http://www.hqpark.cn/',                            title: '槐桥镇人民公园' },
  'market':       { url: 'http://www.xinmin-market.com/',                    title: '新民农贸市场' },
  'culture':      { url: 'http://www.hqwhz.com/',                            title: '槐桥镇文化站' },
  'guo999':       { url: 'http://go.163.com/~guo999/',                       title: '★郭记大篷车★ 流动演出 · 全国巡演' },
  'guo999-admin': { url: 'http://go.163.com/~guo999/admin/',                 title: '管理后台 - 郭记大篷车' },
  'xunle':        { url: 'http://mail.xunle.com/',                           title: '巡乐邮箱 —— 免费电子邮箱' },
  'mailbox':      { url: 'http://mail.xunle.com/inbox.asp',                  title: '收件箱 - 巡乐邮箱' },
  'hq-info':      { url: 'http://www.hq-info.com.cn/',                       title: '槐桥信息港' },
  'bbs':          { url: 'http://bbs.hq-info.com.cn/',                       title: '柳河二中校园论坛' },
  'bbs-thread-1': { url: 'http://bbs.hq-info.com.cn/bbs?tid=47&page=1',      title: '有没有人知道镇上来那个马戏团 - 柳河二中校园论坛' },
  'bbs-thread-2': { url: 'http://bbs.hq-info.com.cn/bbs?tid=47&page=2',      title: '(此页不对外显示) - 柳河二中校园论坛' },
  'bbs-user':     { url: 'http://bbs.hq-info.com.cn/user.php?uid=47',        title: '用户资料 - 小雨0427 - 柳河二中校园论坛' },
  'tieba':        { url: 'http://tieba.badu.com/f?kw=%E6%84%A7%E6%A1%A5',     title: '槐桥吧_八度贴吧' },
  'tieba-post':   { url: 'http://tieba.badu.com/p/4727180427',                title: '【图片】镇上那个花瓶姑娘到底是真的假的_槐桥吧_八度贴吧' },
  'radio':        { url: 'http://www.radiodiy.com.cn/',                      title: '发烧友之家 —— 短波 · 矿石机 · 老唱机' },
  'xiaoyu':       { url: 'http://home.chinaren.com/xiaoyu427/',              title: '小雨的家' },
  'xiaoyu-in':    { url: 'http://home.chinaren.com/xiaoyu427/',              title: '★☆★ 欢迎来到 小雨 的家 ★☆★' },
  'archive':      { url: 'http://hq-info.com.cn/bbs/427',                    title: '427' },
  '404':          { url: '',                                                 title: '无法找到该页' }
};


VG.parseUrl = function (raw) {
  let s = String(raw || '').trim();
  if (!s || s === 'C:\\' || s === 'c:\\' || /^desktop$/i.test(s)) return 'desk';
  s = s.toLowerCase().replace(/^https?:\/\//, '').replace(/\/+$/, '').replace(/\\/g, '/');

  if (s.indexOf('hq-info.com.cn/bbs/427') >= 0) return 'archive';
  
  if (s.indexOf('radiodiy.com.cn/morse') >= 0 || /(^|\/)morse(\.htm)?$/.test(s)) return 'morse';
  if (s.indexOf('zy114') >= 0 || /(^|\/)portal$/.test(s) || /(^|\/)navi$/.test(s)) return 'portal';
  if (s.indexOf('2349') >= 0) return /bird/.test(s) ? 'bird' : 'games';
  if (s.indexOf('hqpark') >= 0) return 'park';
  if (s.indexOf('xinmin-market') >= 0) return 'market';
  if (s.indexOf('hqwhz') >= 0) return 'culture';
  if (s.indexOf('guo999') >= 0) return /admin/.test(s) ? 'guo999-admin' : 'guo999';
  if (/(^|\/)circus$/.test(s)) return 'guo999';
  if (s.indexOf('xunle.com') >= 0) return /inbox|mail\.asp|list\.asp/.test(s) ? 'mailbox' : 'xunle';
  if (s.indexOf('user.php') >= 0 || s.indexOf('uid=47') >= 0) return 'bbs-user';
  if (s.indexOf('tid=47') >= 0) return /page=2/.test(s) ? 'bbs-thread-2' : 'bbs-thread-1';
  if (/(^|\/)bbs$/.test(s) || s.indexOf('bbs.hq-info.com.cn') === 0) return 'bbs';
  if (s.indexOf('tieba.badu.com') === 0 || s.indexOf('tieba.baidu.com') === 0) {
    return /\/p\//.test(s) ? 'tieba-post' : 'tieba';
  }
  if (/(^|\/)tieba$/.test(s)) return 'tieba';
  if (s.indexOf('radiodiy') >= 0 || /(^|\/)radio$/.test(s)) return 'radio';
  if (s.indexOf('chinaren.com/xiaoyu') >= 0) return VG.state.solved['p09-password'] ? 'xiaoyu-in' : 'xiaoyu';
  if (s.indexOf('hq-info.com.cn') >= 0) return 'hq-info';
  return '404';
};


VG.ui = (function () {
  let toastTimer = null;

  function toast(text, ms) {
    const el = document.getElementById('toast');
    el.textContent = text;
    el.classList.remove('hidden');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.add('hidden'), ms || 2000);
  }

  function setStatus(text, zone) {
    document.getElementById('status').textContent = text;
    if (zone !== undefined) document.getElementById('status-zone').textContent = zone;
  }

  function setTitle(text) {
    document.getElementById('tb-text').textContent = text + ' - Microsoft Internet Explorer';
  }

  
  function dialog(opts) {
    const ov = document.getElementById('overlay');
    ov.innerHTML = `
      <div class="dlg" style="min-width:${opts.width || 340}px">
        <div class="dlg-titlebar"><span>${opts.title || 'Microsoft Internet Explorer'}</span>
          <button class="tb-btn close" data-dlg-close>×</button></div>
        <div class="dlg-body">${opts.body || ''}</div>
        <div class="dlg-btns">${(opts.buttons || ['确定']).map((b, i) =>
          `<button class="btn98" data-dlg-btn="${i}">${b}</button>`).join('')}</div>
      </div>`;
    ov.classList.remove('hidden');
    ov.onclick = (e) => {
      if (e.target === ov || e.target.hasAttribute('data-dlg-close')) {
        ov.classList.add('hidden'); ov.innerHTML = '';
        if (opts.onClose) opts.onClose();
      }
    };
    ov.querySelectorAll('[data-dlg-btn]').forEach(b => {
      b.onclick = () => {
        const i = +b.getAttribute('data-dlg-btn');
        const keep = opts.onButton && opts.onButton(i);
        if (!keep) { ov.classList.add('hidden'); ov.innerHTML = ''; }
      };
    });
    return ov;
  }

  
  function notepad(title, contentHtml, mono) {
    const ov = document.getElementById('overlay');
    ov.innerHTML = `
      <div class="dlg" style="width:640px">
        <div class="dlg-titlebar"><span>${title} - 记事本</span>
          <button class="tb-btn close" data-dlg-close>×</button></div>
        <div class="dlg-body">
          <div class="notepad" style="${mono ? '' : 'font-family:var(--kai);font-size:14px;line-height:2'}">${contentHtml}</div>
        </div>
        <div class="dlg-btns"><button class="btn98" data-dlg-close>关闭</button></div>
      </div>`;
    ov.classList.remove('hidden');
    ov.onclick = (e) => {
      if (e.target === ov || e.target.hasAttribute('data-dlg-close')) {
        ov.classList.add('hidden'); ov.innerHTML = '';
      }
    };
  }

  
  function zoom(html) {
    const ov = document.getElementById('overlay');
    ov.innerHTML = `<div style="max-width:94vw;max-height:94vh;overflow:auto;background:#000;padding:6px">${html}</div>`;
    ov.classList.remove('hidden');
    ov.onclick = () => { ov.classList.add('hidden'); ov.innerHTML = ''; };
  }

  
  function typeTextOverlay(text, ms) {
    const el = document.getElementById('scare');
    el.className = 'scare';
    el.style.background = '#0a0a0a';
    el.innerHTML = `<div style="font-family:var(--kai);font-size:22px;color:#ddd;letter-spacing:2px;text-align:center;padding:0 40px;line-height:2"></div>`;
    el.classList.remove('hidden');
    const box = el.firstElementChild;
    let i = 0;
    const t = setInterval(() => {
      box.textContent = text.slice(0, ++i);
      if (i >= text.length) clearInterval(t);
    }, 70);
    setTimeout(() => {
      el.classList.add('hidden'); el.innerHTML = '';
      el.style.background = '';
    }, ms || 2200);
  }

  return { toast, setStatus, setTitle, dialog, notepad, zoom, typeTextOverlay };
})();


VG.engine = (function () {
  const vp = () => document.getElementById('viewport');
  
  let history = [], hi = -1;
  let navigating = false;
  let _lastKey = '';        

  function currentRoute() { return hi >= 0 ? history[hi] : 'desk'; }

  

  
  function siteOf(route) {
    if (route === 'mailbox' || route === 'xunle') return 'xunle';
    if (/^bbs/.test(route)) return 'bbs';
    if (/^tieba/.test(route)) return 'tieba';
    if (/^xiaoyu/.test(route)) return 'xiaoyu';
    if (/^guo999/.test(route)) return 'guo999';
    
    if (route === 'games' || route === 'bird') return 'games';
    return route;
  }

  
  const SHORT = {
    desk: '桌面', portal: '中原导航', 'hq-info': '槐桥信息港',
    bbs: '柳河二中论坛', 'bbs-thread-1': '论坛帖子', 'bbs-thread-2': '论坛帖子',
    'bbs-user': '用户资料', tieba: '槐桥吧', 'tieba-post': '贴吧帖子',
    radio: '发烧友之家', morse: '摩斯电码', xunle: '巡乐邮箱',
    mailbox: '巡乐邮箱', xiaoyu: '小雨的家', 'xiaoyu-in': '小雨的家',
    archive: '427', park: '人民公园', market: '新民农贸市场',
    culture: '镇文化站', guo999: '郭记大篷车', 'guo999-admin': '大篷车后台',
    games: '2349小游戏', bird: '飞翔的小鸟', see: '无所不知的花瓶姑娘', newlife: '新生', news: '柳河晚报', class98: '98级3班',
    '404': '无法显示该页'
  };
  function shortName(route) {
    if (SHORT[route]) return SHORT[route];
    const t = (VG.routes[route] || {}).title || route;
    return (t.split(/——|-{2,}|·/)[0] || route).trim().slice(0, 12);
  }
  function escTab(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function tabs() {
    if (!VG.state.tabs || !VG.state.tabs.length) {
      VG.state.tabs = [{ hist: [], hi: -1 }];
      VG.state.tabIdx = 0;
    }
    if (!(VG.state.tabIdx >= 0) || VG.state.tabIdx >= VG.state.tabs.length) {
      VG.state.tabIdx = 0;
    }
    return VG.state.tabs;
  }
  function curTab() { return tabs()[VG.state.tabIdx]; }
  
  function syncTab() { const t = curTab(); t.hist = history.slice(); t.hi = hi; }
  
  function pullTab() { const t = curTab(); history = t.hist.slice(); hi = t.hi; }
  function tabRoute(t) { return (t && t.hi >= 0) ? t.hist[t.hi] : null; }

  function findTabSite(site) {
    const ts = tabs();
    for (let i = 0; i < ts.length; i++) {
      const r = tabRoute(ts[i]);
      if (r && siteOf(r) === site) return i;
    }
    return -1;
  }

  function renderTabs() {
    const bar = document.getElementById('tabbar');
    if (!bar) return;
    const ts = tabs();
    
    if (!ts.some(t => t.hi >= 0)) { bar.innerHTML = ''; bar.classList.add('hidden'); return; }
    bar.classList.remove('hidden');
    bar.innerHTML = ts.map((t, i) => {
      const r = tabRoute(t);
      if (!r) return '';
      const title = (VG.routes[r] || {}).title || r;
      
      const pinned = i === 0;
      return '<div class="tab' + (i === VG.state.tabIdx ? ' on' : '')
        + '" data-act="tab-go" data-i="' + i + '" title="' + escTab(title) + '">'
        + '<span class="tab-t">' + escTab(shortName(r)) + '</span>'
        + (pinned ? '' : '<span class="tab-x" data-act="tab-close" data-i="' + i + '">×</span>')
        + '</div>';
    }).join('');
  }

  
  function switchTab(i) {
    const ts = tabs();
    if (!(i >= 0) || i >= ts.length || i === VG.state.tabIdx) return;
    syncTab();
    VG.state.tabIdx = i;
    pullTab();
    const r = currentRoute();
    if (r !== 'desk') render(r);
    renderTabs();
    updateNavButtons();
  }

  
  function closeTab(i) {
    const ts = tabs();
    if (!(i >= 0) || i >= ts.length || i === 0) return;   
    const wasActive = (i === VG.state.tabIdx);
    if (wasActive) syncTab();
    ts.splice(i, 1);
    if (VG.state.tabIdx > i) VG.state.tabIdx--;
    else if (VG.state.tabIdx >= ts.length) VG.state.tabIdx = ts.length - 1;
    if (wasActive) {
      pullTab();
      const r = currentRoute();
      if (r !== 'desk') render(r);
      updateNavButtons();
    }
    renderTabs();
  }

  
  function fakeLoad(route, cb) {
    const box = vp();
    const slow = /^(bbs|xiaoyu)/.test(route);
    const total = slow ? 620 : 380;
    box.innerHTML = `<div class="loading">
        <div>正在打开网页 ${VG.routes[route] ? VG.routes[route].url : ''}...</div>
        <div class="bar"><i id="ldbar"></i></div>
      </div>`;
    VG.ui.setStatus('正在打开网页...', 'Internet');
    const bar = document.getElementById('ldbar');
    let p = 0;
    const t0 = performance.now();
    (function tick() {
      const k = Math.min(1, (performance.now() - t0) / total);
      p = Math.floor(k * 100);
      if (bar) bar.style.width = p + '%';
      if (k < 1) requestAnimationFrame(tick);
      else { VG.ui.setStatus('完成', 'Internet'); cb(); }
    })();
  }

  
  function normalize(route) {
    
    if (route === 'xiaoyu' && VG.state.xiaoyuUnlocked) return 'xiaoyu-in';
    
    if (route === 'guo999-admin' && !VG.state.guoAdminLoggedIn) return 'guo999';
    
    if (route === 'xunle' && VG.state.mailLoggedIn) return 'mailbox';
    return route;
  }

  
  function showSurface(route) {
    const deskMode = (route === 'desk');
    const d = document.getElementById('desk-screen');
    const s = document.getElementById('shell');
    if (d) d.classList.toggle('hidden', !deskMode);
    if (s) s.classList.toggle('hidden', deskMode);
  }

  function render(route) {
    route = normalize(route);
    const r = VG.routes[route] || VG.routes['404'];
    const key = VG.sites[route] ? route : '404';

    
    if (_lastKey && _lastKey !== key && VG.sites[_lastKey]
        && typeof VG.sites[_lastKey].leave === 'function') {
      try { VG.sites[_lastKey].leave(); } catch (e) {  }
    }
    _lastKey = key;

    VG.state.visitedCount[key] = (VG.state.visitedCount[key] || 0) + 1;
    VG.save();

    showSurface(key);



    if (key === 'desk') {
      
      const d = document.getElementById('desk-screen');
      if (d) {
        d.innerHTML = VG.sites['desk'].render(VG.state);
        if (VG.sites['desk'].after) VG.sites['desk'].after(VG.state);
      }
      VG.ui.setStatus('', '我的电脑');
      updateNavButtons();
      return;
    }

    document.getElementById('addr').value = VG.routes[key] ? VG.routes[key].url : '';
    VG.ui.setTitle(r.title);

    vp().innerHTML = `<div class="page">${VG.sites[key].render(VG.state)}</div>`;
    vp().scrollTop = 0;
    if (VG.sites[key].after) VG.sites[key].after(VG.state);
    updateNavButtons();
  }

  function navigate(route, opts) {
    if (navigating) return;
    opts = opts || {};
    route = normalize(route);
    if (!VG.routes[route]) route = '404';
    if (route === '404') {
      
      VG.engine.lastBadUrl = document.getElementById('addr').value;
    }
    
    if (!opts.inPlace) {
      const site = siteOf(route);
      const found = findTabSite(site);
      if (found >= 0 && found !== VG.state.tabIdx) {
        
        syncTab();
        VG.state.tabIdx = found;
        pullTab();
        if (hi < 0) { history = []; hi = -1; }
      } else if (found < 0 && hi >= 0 && siteOf(currentRoute()) !== site) {
        
        syncTab();
        tabs().push({ hist: [], hi: -1 });
        VG.state.tabIdx = tabs().length - 1;
        history = []; hi = -1;
      }
    }

    navigating = true;
    fakeLoad(route, () => {
      if (hi < 0) {
        history = [];                      
      } else {
        history = history.slice(0, hi + 1); 
      }
      history.push(route); hi = history.length - 1;
      
      try {
        render(route);
      } catch (e) {
        if (window.console) console.error('[VG] 渲染 ' + route + ' 出错：', e);
      } finally {
        navigating = false;
        syncTab();
        renderTabs();
      }
      if (opts.then) opts.then();
    });
  }

  function replace(route) {
    route = normalize(route);
    if (hi < 0) { history = [route]; hi = 0; }
    else { history[hi] = route; }
    render(route);
    syncTab();
    renderTabs();
  }

  function go(delta) {
    const n = hi + delta;
    if (n < 0 || n >= history.length) return;
    hi = n;
    render(history[hi]);
    syncTab();
    renderTabs();
  }

  function updateNavButtons() {
    const b = document.getElementById('btn-back');
    const f = document.getElementById('btn-fwd');
    
    if (b) b.disabled = hi <= 0;
    if (f) f.disabled = hi >= history.length - 1;
  }

  
  function resetHistory() {
    history = []; hi = -1;
    
    VG.state.tabs = [{ hist: [], hi: -1 }];
    VG.state.tabIdx = 0;
    renderTabs();
  }

  return {
    navigate, replace, go, render, currentRoute, updateNavButtons,
    normalize, showSurface, resetHistory,
    renderTabs, switchTab, closeTab, siteOf, shortName,
    get history() { return history; }, get hidx() { return hi; },
    lastBadUrl: ''
  };
})();


VG.actions = {};


(function () {
  const menu = document.getElementById('ctxmenu');
  let ctxSource = null;

  function hide() { menu.classList.add('hidden'); }

  function show(x, y, items) {
    menu.innerHTML = items.map(it =>
      it.sep ? '<div class="sep"></div>'
             : `<div class="ci ${it.disabled ? 'disabled' : ''}" data-i="${it.i}">${it.label}</div>`
    ).join('');
    menu.classList.remove('hidden');
    const w = menu.offsetWidth, h = menu.offsetHeight;
    menu.style.left = Math.min(x, innerWidth - w - 6) + 'px';
    menu.style.top = Math.min(y, innerHeight - h - 6) + 'px';
    menu.querySelectorAll('.ci:not(.disabled)').forEach(el => {
      el.onclick = () => {
        const it = items.find(a => a.i === +el.getAttribute('data-i'));
        hide();
        if (it && it.run) it.run();
      };
    });
  }

  VG.ctxmenu = { show, hide };

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    ctxSource = e.target;
    const route = VG.engine.currentRoute();
    const hasSrc = !!VG.data.sources[route];
    show(e.clientX, e.clientY, [
      { i: 0, label: '后退', disabled: VG.engine.hidx <= 0, run: () => VG.engine.go(-1) },
      { i: 1, label: '前进', disabled: VG.engine.hidx >= VG.engine.history.length - 1, run: () => VG.engine.go(1) },
      { sep: true },
      { i: 2, label: '刷新', run: () => VG.engine.replace(VG.engine.currentRoute()) },
      { i: 3, label: '查看源代码', run: () => {
          const src = VG.data.sources[route];
          VG.ui.notepad(VG.routes[route].url || route,
            src || '<span class="cm">&lt;!-- 这一页没有留下什么 --&gt;</span>', true);
        } },
      { i: 4, label: '另存为...', run: () => VG.ui.dialog({
          title: '另存为', body: '无法保存该网页。<br><br>磁盘空间不足或网络连接已断开。' }) },
      { sep: true },
      { i: 5, label: '属性', run: () => {
          const c = VG.state.visitedCount[route] || 1;
          VG.ui.dialog({
            title: '属性',
            body: `<b>地址：</b>${VG.routes[route].url}<br>
                   <b>标题：</b>${VG.routes[route].title}<br>
                   <b>你访问过这一页：</b>${c} 次<br>
                   <b>最后修改：</b>${route === 'archive' ? '2021-08-14 04:27' : '2001-11-03 23:47'}`
          });
        } }
    ]);
  });

  document.addEventListener('click', hide);
  document.addEventListener('scroll', hide, true);
})();



let _scareAudioArmed = false;
document.addEventListener('click', function (e) {
  if (e.target.closest && e.target.closest('input[type=range]')) return; 
  VG.audio.init();
  VG.audio.resume();
  VG.audio.click();
  
  if (!_scareAudioArmed) { _scareAudioArmed = true; VG.horror.unlockScareAudio(); }
}, true);


document.addEventListener('click', function (e) {
  const el = e.target.closest('[data-act]');
  if (!el) return;

  
  if (el.tagName === 'A' && el.getAttribute('data-act') === 'go') e.preventDefault();

  const act = el.getAttribute('data-act');
  if (VG.actions[act]) { VG.actions[act](el, e); return; }
});


document.addEventListener('dblclick', function (e) {
  const el = e.target.closest('[data-dbl]');
  if (!el) return;
  const act = el.getAttribute('data-dbl');
  if (VG.actions[act]) VG.actions[act](el, e);
});


document.addEventListener('click', function (e) {
  const row = e.target.closest('[data-selectable]');
  document.querySelectorAll('[data-selectable].sel')
    .forEach(x => { if (x !== row) x.classList.remove('sel'); });
  if (row) row.classList.add('sel');
});


VG.boot = function () {
  const $ = (id) => document.getElementById(id);

  
VG.load();

  
  const sealEl = $('cover-seal');
  if (sealEl) sealEl.innerHTML = VG.illus.stamp('怪');

  
  (function paintAvatar() {
    const box = $('boot-avatar');
    const img = new Image();
    img.alt = '';
    img.title = '点一下可以看大图';
    img.onload = () => {
      box.innerHTML = '';
      box.appendChild(img);
      
      box.style.cursor = 'zoom-in';
      box.onclick = () => VG.ui.zoom(
        `<img class="zoomimg" src="assets/photos/xiaoyu_room.jpg" alt="">`);
    };
    img.onerror = () => { box.innerHTML = VG.illus.avatarSVG('girl'); };
    img.src = 'assets/photos/boot_avatar.jpg';
  })();

  (function paintStickers() {
    const band = $('boot-band');
    if (!band) return;
    const P = {
      a: { face: '#ff9ecd', stroke: '#e0548f' },
      b: { face: '#ffb8db', stroke: '#e0548f' },
      c: { face: '#f7a8d0', stroke: '#c94a86', core: '#fff6b0' },
      d: { face: '#ff8fc4', stroke: '#c94a86' },
      e: { face: '#ffd9ea', stroke: '#e0548f' }
    };
    const spots = [
      ['sk-1', 'heart', P.a, 40], ['sk-2', 'flower', P.c, 38],
      ['sk-3', 'star', P.b, 30], ['sk-4', 'heart', P.d, 46],
      ['sk-5', 'bow', P.e, 40], ['sk-6', 'star', P.a, 28],
      ['sk-7', 'flower', P.b, 30], ['sk-8', 'heart', P.b, 34],
      ['sk-tape-1', 'tape', P.e, 60], ['sk-tape-2', 'tape', P.e, 60]
    ];
    spots.forEach(([cls, kind, pal, size]) => {
      const d = document.createElement('div');
      d.className = cls;
      d.innerHTML = VG.illus.sticker(kind, pal, size);
      band.appendChild(d);
    });
  })();

  
  try {
    const raw = localStorage.getItem('vase-girl-save');
    if (raw) {
      const d = JSON.parse(raw);
      const solved = Object.keys(d.solved || {}).length;
      const visited = Object.keys(d.visitedCount || {}).length;
      
      if (solved > 0 || visited > 0 || d.booted) {
        $('btn-start-img').src = 'assets/ui/btn-continue.png';
        $('btn-start').setAttribute('aria-label', '继续上次');
        const a = document.createElement('div');
        a.style.cssText = 'text-align:center;margin:-6px 0 12px';
        a.innerHTML = '<a id="btn-wipe" style="color:#6a6258;font-size:11px;cursor:pointer;'
                    + 'text-decoration:underline">清空存档，从头开始</a>';
        $('btn-start').parentNode.insertBefore(a, $('btn-start').nextSibling);
        a.querySelector('#btn-wipe').onclick = (e) => {
          e.preventDefault();
          localStorage.removeItem('vase-girl-save');
          
          VG.resetState();
          $('btn-start-img').src = 'assets/ui/btn-start.png';
          $('btn-start').setAttribute('aria-label', '开始');
          a.remove();
        };
      }
    }
  } catch (e) {  }

  
  const bgm = document.getElementById('bgm');
  
  let masterVol = (parseInt(($('opt-vol') || {}).value, 10) || 45) / 100;
  
  const bgmVol = () => masterVol * 0.9 * (bgmScene === 'game' ? 0.62 : 1);
  function setMasterVol(v) {
    masterVol = Math.max(0, Math.min(1, Number(v) || 0));
    try { VG.audio.setVolume(masterVol); } catch (e) {}
    if (bgm && !bgmFade) bgm.volume = bgmVol();
  }
  VG.setMasterVol = setMasterVol;
  let bgmWant = false;      
  let bgmScene = 'cover';   
  let bgmForce = false;     
  let bgmFade = 0;
  let bgmStarting = false;

  function canPlay() {
    if (!bgmWant) return false;
    if (bgmScene === 'cover') return true;
    return bgmForce;        
  }

  function bgmPaint() {
    const chk = document.getElementById('opt-music');
    if (chk) chk.checked = bgmWant;
    
    const hint = document.getElementById('music-hint');
    if (hint) hint.classList.toggle('hidden', bgmWant);
  }

  function bgmStopFade() { if (bgmFade) { clearInterval(bgmFade); bgmFade = 0; } }

  function bgmTry() {
    if (!bgm || !canPlay()) return;
    
    if (bgmStarting) return;
    bgmStarting = true;
    const guard = setTimeout(() => { bgmStarting = false; }, 3000);
    bgmStopFade();
    bgm.volume = bgmVol();
    const p = bgm.play();
    const done = () => { clearTimeout(guard); bgmStarting = false; };
    if (p && p.catch) {
      p.then(() => {
        done();
        
        if (!canPlay()) { bgm.pause(); bgm.volume = bgmVol(); bgmPaint(); return; }
        bgmPaint();
      }).catch(() => {
        done();
        if (canPlay()) bgmPaint();     
      });
    } else { done(); bgmPaint(); }
  }

  function bgmFadeOut(ms) {
    if (!bgm) return;
    bgmStopFade();
    if (bgm.paused) { bgmPaint(); return; }
    const from = bgm.volume, t0 = Date.now();
    const dur = ms || 1400;
    bgmFade = setInterval(() => {
      const k = Math.min(1, (Date.now() - t0) / dur);
      bgm.volume = from * (1 - k);
      if (k >= 1) {
        bgmStopFade();
        bgm.pause();
        bgm.volume = bgmVol();
        bgmPaint();
      }
    }, 40);
  }

  
  function bgmEnterGame(ms) {
    if (bgmScene === 'game') return;
    bgmScene = 'game';
    bgmForce = false;
    if (bgm && !bgm.paused) {
      const target = bgmVol();
      const from = bgm.volume, t0 = Date.now();
      const dur = ms || 1200;
      bgmStopFade();
      bgmFade = setInterval(() => {
        const k = Math.min(1, (Date.now() - t0) / dur);
        bgm.volume = from + (target - from) * k;
        if (k >= 1) { bgmStopFade(); bgm.volume = bgmVol(); }
      }, 40);
    }
  }

  function bgmSet(on) {
    bgmWant = on;
    if (on && bgmScene === 'game') bgmForce = true;   
    bgmPaint();
    if (!on) {
      bgmForce = false;
      bgmStopFade();
      if (bgm) { bgm.pause(); bgm.volume = bgmVol(); }
    } else {
      bgmTry();
    }
  }

  if (bgm) {
    bgm.volume = bgmVol();
    bgm.addEventListener('playing', () => { bgmStarting = false; bgmPaint(); });
    
    bgm.addEventListener('canplay', () => { if (bgmWant && bgm.paused) bgmTry(); });
    VG.music = {
      el: bgm,
      want: () => bgmWant,
      playing: () => !!bgm && !bgm.paused,
      canPlay: canPlay,
      set: bgmSet,
      enterGame: bgmEnterGame,
      fadeOut: bgmFadeOut
    };
    bgmPaint();
  } else {
    VG.music = { want: () => false, playing: () => false,
                 canPlay: () => false, set: () => {},
                 enterGame: () => {}, fadeOut: () => {} };
  }

  const mu = document.getElementById('opt-music');
  if (mu) mu.onchange = function () { bgmSet(this.checked); };

  
  $('opt-vol').oninput = function () {
    $('vol-label').textContent = this.value + '%';
    setMasterVol(this.value / 100);
  };

  
  let gentleConfirmed = false;
  $('opt-gentle').onchange = function () {
    const box = this;
    if (!box.checked) { gentleConfirmed = false; return; }   
    box.checked = false;                                     
    VG.ui.dialog({
      title: '降低惊吓强度',
      width: 430,
      body: `<div style="line-height:2.1">
        <b>您确定要降低恐怖元素？</b><br><br>
        勾选之后体验感会下降许多，<b>不建议勾选</b>。<br><br>
        <span style="color:#666;font-size:11.5px">
        所有突发画面会被替换成等效的文字，剧情和谜题不受影响。<br>
        游戏内随时按 <b>Esc</b> 可以重新打开这个选项。</span>
      </div>`,
      buttons: ['仍然降低', '保持原样'],
      onButton: (i) => {
        if (i === 0) { box.checked = true; gentleConfirmed = true; }
        else { box.checked = false; gentleConfirmed = false; }
      }
    });
  };

  
  function showNotice() {
    const nEl = $('notice');
    if (!nEl) return;
    nEl.classList.remove('hidden');
    const close = () => {
      nEl.classList.add('hidden');
      VG.state.noticeSeen = true;
      VG.save();
      const bp = $('boot-pass');
      if (bp) { try { bp.focus(); } catch (e) {} }
    };
    const ok = $('notice-ok');
    const x = $('notice-x');
    if (ok) ok.onclick = () => { VG.audio.click(); close(); };
    if (x) x.onclick = () => { VG.audio.click(); close(); };
  }

  
  function showDisclaimer(done) {
    const d = $('disclaimer');
    if (!d) { done(); return; }
    d.classList.remove('hidden');
    const ok = $('disc-ok');
    const close = () => {
      d.classList.add('hidden');
      VG.state.disclaimerSeen = true;
      VG.save();
      done();
    };
    ok.onclick = () => { VG.audio.click(); close(); };
    $('disc-x').onclick = () => { VG.audio.click(); close(); };
  }

  $('btn-start').onclick = function () {
    
    if (!VG.state.disclaimerSeen) {
      if (VG.music && VG.music.enterGame) VG.music.enterGame(600);
      showDisclaimer(() => { $('btn-start').onclick(); });
      return;
    }

    
    if (VG.music && VG.music.enterGame) VG.music.enterGame(2200);
    VG.audio.init();
    VG.audio.resume();
    VG.audio.setVolume($('opt-vol').value / 100);
    VG.horror.setGentle($('opt-gentle').checked);
    
    VG.audio.dialup();
    const flash = document.createElement('div');
    flash.className = 'crt-on';
    document.body.appendChild(flash);

    
    VG.load();

    setTimeout(() => {
      $('cover').classList.add('hidden');
      
      $('boot').classList.remove('hidden');
      setTimeout(() => {
        const bp = $('boot-pass');
        if (bp) { bp.value = ''; try { bp.focus(); } catch (e) {} }
      }, 120);
      
      if (!VG.state.noticeSeen) showNotice();
    }, 300);
    setTimeout(() => flash.remove(), 1300);
  };

  
  const BOOT_PASS = 'pink';

  function tryBoot() {
    const input = $('boot-pass');
    const err = $('boot-err');
    const v = String(input.value || '').trim().toLowerCase();

    if (v === BOOT_PASS) {
      err.className = 'boot-err';
      err.textContent = '';
      VG.audio.chime();
      VG.state.booted = true;
      VG.save();

      const w = document.createElement('div');
      w.className = 'boot-welcome';
      w.textContent = '欢迎';
      $('boot').appendChild(w);
      setTimeout(() => {
        $('boot').classList.add('hidden');
        w.remove();
        enterDesktop();
      }, 1200);
      return;
    }

    VG.audio.errorDing();
    err.className = 'boot-err on';
    err.textContent = v ? '密码不正确。请再试一次。' : '请输入密码。';
    input.value = '';
    input.focus();
  }

  function enterDesktop() {
    
    $('cover').classList.add('hidden');
    $('boot').classList.add('hidden');
    
    VG.engine.resetHistory();
    
    VG.state.deskBroken = false;
    const _crash = document.getElementById('desk-crash');
    if (_crash && _crash.parentNode) _crash.parentNode.removeChild(_crash);

    
    VG.engine.render('desk');
  }

  $('boot-go').onclick = tryBoot;
  $('boot-pass').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') tryBoot();
  });
  $('boot-off').onclick = () => {
    const s = document.createElement('div');
    s.className = 'boot-shutdown';
    s.innerHTML = `<div><b>现在可以安全地关闭计算机了。</b>
      如果这是您第一次看到这个屏幕，<br>请按电源按钮重新启动。</div>`;
    $('boot').appendChild(s);
    VG.audio.errorDing(true);
    setTimeout(() => s.remove(), 4200);
  };

  
  $('addr').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      const raw = this.value;
      const r = VG.parseUrl(raw);
      VG.audio.click();
      if (r === '404') { VG.engine.navigate('404'); }
      else VG.engine.navigate(r);
    }
  });
  $('btn-go').onclick = () => {
    $('addr').dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
  };

  $('btn-back').onclick = () => { VG.audio.click(); VG.engine.go(-1); };
  $('btn-fwd').onclick = () => { VG.audio.click(); VG.engine.go(1); };
  $('btn-refresh').onclick = () => { VG.audio.click(); VG.engine.replace(VG.engine.currentRoute()); };
  
  $('btn-home').onclick = () => { VG.audio.click(); VG.engine.navigate('portal'); };
  $('btn-stop').onclick = () => { VG.audio.click(); VG.ui.setStatus('已停止', 'Internet'); };

  
  const closeWin = $('btn-close-win');
  if (closeWin) closeWin.onclick = () => { VG.audio.click(); enterDesktop(); };

  
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      const sc = document.getElementById('scare');
      if (sc && !sc.classList.contains('hidden')) { sc.classList.add('hidden'); sc.innerHTML = ''; return; }
      VG.ui.dialog({
        title: '设置',
        width: 380,
        body: `<label><input type="checkbox" id="set-gentle" ${VG.horror.isGentle() ? 'checked' : ''}> 降低惊吓强度（把突发画面换成文字）</label><br><br>
               <label><input type="checkbox" id="set-music" ${VG.music && VG.music.playing() ? 'checked' : ''}> 背景音乐</label><br><br>
               <label><input type="checkbox" id="set-adflash" ${VG.ads && VG.ads.flashOn() ? 'checked' : ''}> 广告栏位的闪烁动画</label><br><br>
               <div>音量 <input type="range" id="set-vol" min="0" max="100" value="${Math.round(VG.audio ? 45 : 45)}"></div><br>
               <div style="color:#666;font-size:11px;line-height:1.8">
                 本原型中的一切惊吓都可以关闭。<br>
                 没有任何内容会修改你的真实存档或系统设置。
               </div>`,
        buttons: ['关闭'],
        onButton: () => {
          VG.horror.setGentle(document.getElementById('set-gentle').checked);
        }
      });
      setTimeout(() => {
        const g = document.getElementById('set-gentle');
        if (g) g.onchange = () => VG.horror.setGentle(g.checked);
        const v = document.getElementById('set-vol');
        
        if (v) {
          v.value = Math.round(masterVol * 100);
          v.oninput = () => { setMasterVol(v.value / 100);
            if (VG.ui && VG.ui.toast) {} };
        }
        const mu = document.getElementById('set-music');
        if (mu) mu.onchange = () => { if (VG.music) VG.music.set(mu.checked); };
        
        const af = document.getElementById('set-adflash');
        if (af) af.onchange = () => {
          if (!af.checked) { if (VG.ads) VG.ads.stopFlash(); }
          else {
            VG.state.adFlash = true; VG.save();
            VG.engine.replace(VG.engine.currentRoute());
            VG.ui.toast('已打开广告闪烁动画。', 2000);
          }
        };
      }, 0);
    }
  });

  
  try {
    const q = new URLSearchParams(location.search);
    if (q.get('boot') === 'skip') VG.state.booted = true;
    if (q.get('opt') === 'gentle') {
      setTimeout(() => {
        const g = $('opt-gentle');
        g.checked = true;
        g.dispatchEvent(new Event('change'));
      }, 80);
    }
    if (q.get('autostart') === '1') {
      setTimeout(() => $('btn-start').click(), 60);
    }
  } catch (e) {  }
};
