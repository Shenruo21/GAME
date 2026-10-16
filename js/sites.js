
window.VG = window.VG || {};
VG.sites = {};



function garble(t, amt) {
  const POOL = '龘靐齉爩鱻麤龗灪龖厵爨癵驫麣纞虋讟钃鸜麷鞻韽顟顠饙騳騱饐黐黮黯黶黷黢黟黠黥黦黧黩黪';
  let h = 0;
  for (let i = 0; i < t.length; i++) h = (h * 31 + t.charCodeAt(i)) >>> 0;
  return t.split('').map(ch => {
    if (ch === ' ' || ch === '\n') return ch;
    h = (h * 1103515245 + 12345) >>> 0;
    return ((h % 100) < amt * 100) ? POOL[h % POOL.length] : ch;
  }).join('');
}

VG.sites['desk'] = {
  render(s) {
    s = s || VG.state;
    
    const brk = !!s.deskBroken;
    const L = (t, amt) => brk ? garble(t, amt == null ? 0.55 : amt) : t;
    const act = (a) => brk ? 'desk-dead' : a;
    return `
<div class="desk${brk ? ' broken' : ''}">
  <div class="desk-icons">
    <div class="desk-icon" data-act="${act('go')}" data-route="portal"
         title="${L('Internet Explorer', 0.4)}">
      <span class="ico">${VG.illus.deskIcon('ie')}</span>
      <span class="lbl">${L('Internet')}<br>${L('Explorer', 0.35)}</span>
    </div>

    <!-- 她自己给自己主页做的快捷方式 -->
    <div class="desk-icon" data-act="${act('go')}" data-route="xiaoyu"
         title="${L('小雨的家.url', 0.4)}">
      <span class="ico">${VG.illus.deskIcon('home')}</span>
      <span class="lbl">${L('小雨的家', 0.34)}</span>
    </div>

    <div class="desk-icon" data-act="${act('mydocs')}" title="${L('我的文档', 0.4)}">
      <span class="ico">${VG.illus.deskIcon('docs')}</span>
      <span class="lbl">${L('我的文档', 0.4)}</span>
    </div>

    <div class="desk-icon" data-act="${act('recycle')}" title="${L('回收站', 0.4)}">
      <span class="ico">${VG.illus.deskIcon('bin')}</span>
      <span class="lbl">${L('回收站', 0.34)}</span>
    </div>

    ${  ''}
    ${s.mazeOnDesk ? `
    <div class="desk-icon desk-exe" data-act="${act('maze-open')}"
         title="${VG.data.maze.name}.${VG.data.maze.ext}">
      <span class="ico">${VG.illus.deskIcon('exe')}</span>
      <span class="lbl">${L(VG.data.maze.name)}<br>.${VG.data.maze.ext}</span>
    </div>` : ''}

    ${  ''}
    ${  ''}
    ${  ''}
    ${s.rebornOnDesk ? `
    <div class="desk-icon desk-reborn" data-act="${act('reborn-open')}"
         title="${L(VG.data.reborn.name, 0.4)}">
      <span class="ico">${VG.illus.deskIcon('reborn')}</span>
      <span class="lbl">${L(VG.data.reborn.name, 0.4)}</span>
    </div>` : ''}

    ${s.crackOnDesk ? `
    <div class="desk-icon desk-crack" data-act="${act('crack-open')}"
         title="${L((VG.data.crack ? VG.data.crack.name : '') + '.exe', 0.4)}">
      <span class="ico">${VG.illus.deskIcon('crack')}</span>
      <span class="lbl">${L(VG.data.crack ? VG.data.crack.name : '')}<br>.exe</span>
    </div>` : ''}

    ${s.mysteryOnDesk ? `
    <div class="desk-icon desk-video" data-act="${act('mystery-open')}"
         title="${VG.data.mystery.name}.${VG.data.mystery.ext}">
      <span class="ico">${VG.illus.videoFileIcon()}</span>
      <span class="lbl">${L(VG.data.mystery.name)}<br>.${VG.data.mystery.ext}</span>
    </div>` : ''}

    ${s.sawTruth ? `
    <div class="desk-icon desk-secret" data-act="${act('secret-open')}"
         title="${L(VG.data.secretFolder.name, 0.4)}">
      <span class="ico">${VG.illus.deskIcon(s.secretUnlocked ? 'docs' : 'secret')}</span>
      <span class="lbl">${L(VG.data.secretFolder.name, 0.4)}</span>
    </div>` : ''}
  </div>

  <div class="desk-taskbar">
    <div class="task-start">⊞ ${L('开始', 0.5)}</div>
    <div class="task-sep"></div>
    <div class="task-sep"></div>
    <div class="task-clock" id="desk-clock">${brk ? '--:--' : '下午 11:47'}</div>
  </div>
</div>`;
  },
  after() {
    const c = document.getElementById('desk-clock');
    if (c && !VG.state.deskBroken) c.textContent = '下午 11:47';
    deskBrokenTick();
  }
};


let deskBrokenTimer = 0;
function deskBrokenTick() {
  if (!VG.state.deskBroken) { clearTimeout(deskBrokenTimer); deskBrokenTimer = 0; return; }
  if (deskBrokenTimer) return;
  deskBrokenTimer = setTimeout(() => {
    deskBrokenTimer = 0;
    if (!VG.state.deskBroken) return;
    if (document.getElementById('desk-crash')) return;
    const d = document.createElement('div');
    d.id = 'desk-crash';
    d.className = 'desk-crash';
    d.innerHTML = `
      <div class="dc-win">
        <div class="dc-title"><span>系 统</span></div>
        <div class="dc-body">
          <div class="dc-row">
            <div class="dc-ico">✕</div>
            <div class="dc-txt">
              <b>应用程序发生异常，即将关闭。</b><br>
              错误代码：<span class="dc-code">0x0000008E</span><br>
              如果问题仍然存在，请重新启动计算机。
            </div>
          </div>
          <div class="dc-btns">
            <button class="btn98" data-act="desk-reboot">重新启动</button>
          </div>
        </div>
      </div>`;
    document.body.appendChild(d);
    try { VG.audio.errorDing(); } catch (e) {}
  }, 11000);
}


function esc(v) {
  return String(v == null ? '' : v)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}


function b88(btn) {  return `<a class="b88" data-act="b88" data-route="${btn.route}" data-label="${btn.label}"
     style="background:${btn.bg};color:${btn.fg}">${btn.label}</a>`;
}
function b88row(list) {
  return `<div class="b88row">${(list || VG.data.buttons).map(b88).join('')}</div>`;
}


function bbsHead(s) {
  const who = s.loggedIn
    ? `欢迎您，<b>${s.user.name}</b> [<a data-act="logout">退出</a>]`
    : `欢迎您，游客 [<a data-act="open-login">登录</a>] [<a data-act="open-reg">注册</a>]`;
  return `
  <div class="bbs-head">
    <div class="bbs-brand">
      <img class="bbs-logo" src="assets/school-logo.png" alt="柳河二中校徽">
      <div class="bbs-brand-txt">
        <b>柳河二中 · 校园论坛</b>
        <span>LIUHE NO.2 MIDDLE SCHOOL　·　始建于 1956</span>
      </div>
    </div>
    <span class="who">${who}</span>
  </div>`;
}


VG.sites['portal'] = {
  render(s) {
    const P = VG.data.portal;
    const q = s.lastSearch || '';
    const hits = q ? searchHits(q) : null;

    
    let results = '';
    if (q) {
      const rows = hits.length
        ? hits.map(h => `
          <div class="pt-hit">
            <div class="t">${h.route
              ? `<a data-act="go" data-route="${h.route}">${esc(h.t)}</a>`
              : `<a data-act="dead-link" data-host="${esc(h.u || '')}">${esc(h.t)}</a>`}</div>
            <div class="u">${esc(h.u || '')}${h.dead ? '　<span style="color:#a00">（该页无法显示）</span>' : ''}</div>
            <div class="d">${esc(h.d || '')}</div>
          </div>`).join('')
        : `<div class="pt-none">
             没有找到和「<b>${esc(q)}</b>」相关的中文网页。<br>
             <span style="color:#888">建议：检查关键词是否正确，或换一个词试试。</span>
           </div>`;

      results = `
      <div class="pt-results">
        <div class="pt-resbar">
          搜索「<b>${esc(q)}</b>」　共找到 <b>${hits.length ? hits.length * 137 : 0}</b> 个结果　
          用时 0.${(q.length * 7 + 13) % 90 + 10} 秒
          <a data-act="pt-clear" style="float:right">返回首页</a>
        </div>
        ${rows}
        ${hits.length ? '' : `<div class="pt-hit" style="color:#888">
          <div class="t" style="color:#888">您是不是要找：<a data-act="pt-search" data-q="槐桥">槐桥</a></div>
        </div>`}
      </div>`;
    }

    
    const cats = P.cats.map(c => `
      <div class="pt-cat${c.local ? ' local' : ''}">
        <h3>${esc(c.h)}</h3>
        <ul>${c.items.map(it => `<li>${
          it.route
            ? `<a data-act="go" data-route="${it.route}" class="${it.hot ? 'hot' : ''}">${esc(it.t)}</a>`
            : `<a data-act="dead-link" data-host="${esc(it.t)}" class="dead">${esc(it.t)}</a>`
        }</li>`).join('')}</ul>
      </div>`).join('');

    
    const hist = P.history.map((h, i) => `
      <li class="${i === 0 ? 'recent' : ''}">
        ${h.route
          ? `<a data-act="go" data-route="${h.route}">${esc(h.q)}</a>`
          : `<a data-act="pt-search" data-q="${esc(h.q)}">${esc(h.q)}</a>`}
        <span class="at">${esc(h.at)}</span>
      </li>`).join('');

    return `
<div class="pt">
  <div class="pt-top">
    <div class="pt-brand">
      <div class="pt-logo">中原导航</div>
      <div class="pt-slogan">${esc(P.slogan)}</div>
    </div>
    <div class="pt-searchbox">
      <input id="pt-q" value="${esc(q)}" maxlength="40" autocomplete="off"
             placeholder="请输入关键词">
      <button class="pt-go" data-act="pt-search">搜 索</button>
    </div>
    <div class="pt-hot">
      热门搜索：
      <a data-act="pt-search" data-q="摩斯电码">摩斯电码</a>
      <a data-act="pt-search" data-q="花瓶姑娘">花瓶姑娘</a>
      <a data-act="pt-search" data-q="河灯节">河灯节</a>
      <a data-act="pt-search" data-q="槐桥">槐桥</a>
    </div>
  </div>

  <div class="pt-body">
    <div class="pt-main">
      ${results}
      <div class="pt-cats">${cats}</div>
    </div>

    <div class="pt-side">
      <div class="pt-panel">
        <h3>搜 索 历 史</h3>
        <ul class="pt-hist">${hist}</ul>
      </div>
      <div class="pt-panel">
        <h3>上 网 小 贴 士</h3>
        <div class="pt-tip">
          · 本机使用 56K 调制解调器，请耐心等待<br>
          · 晚上 12 点后机房断电，请提前保存<br>
          · 遇到打不开的网站，多刷新几次<br>
          · 本站已收录 3,847 个中文网站
        </div>
      </div>
      <div class="pt-panel">
        <h3>本 站 公 告</h3>
        <div class="pt-tip">
          本站由「新纪元网吧」设为默认首页。<br>
          如有网站需要收录，请到吧台登记。
        </div>
      </div>

      <!-- ★ 本站吉祥物。放在侧栏最下面那块空白里。 -->
      <div class="pt-mascot">
        <div class="pt-mascot-bub">找不着北？<br>左边那几栏随便点。</div>
        ${VG.illus.rabbit('pt-rabbit')}
        <div class="pt-mascot-tag">本 站 吉 祥 物</div>
      </div>

      ${  ''}
      ${VG.ads.slot('portal-side', 'portal', { flash: true, w: 250 })}
    </div>
  </div>

  <div class="pt-foot">
    <span>中原导航 · 上网从这里开始</span>
    <span>本站不存储任何用户信息　|　最后更新 2001-11-04</span>
  </div>
</div>`;
  },
  after() {
    const el = document.getElementById('pt-q');
    if (!el) return;
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') { e.preventDefault(); VG.actions['pt-search'](el); }
    });
    
    if (!VG.state.lastSearch) el.focus();
  }
};


function searchHits(q) {
  const s = String(q).toLowerCase();
  for (const ent of (VG.data.searchIndex || [])) {
    if (ent.k.some(k => s.indexOf(k.toLowerCase()) >= 0)) return ent.r;
  }
  return [];
}


VG.sites['morse'] = {
  render() {
    return `
<div class="ms">
  <div class="ms-top">
    <div class="ms-logo">发烧友之家</div>
    <div class="ms-sub">BG6QKX · 河南槐桥 · 短波 · 矿石机 · 老唱机</div>
  </div>
  <div class="ms-crumb">
    <a data-act="go" data-route="radio">首页</a> &gt;
    <a data-act="toast" data-msg="技术资料目录。里面只有这一篇。">技术资料</a> &gt;
    摩斯电码入门
  </div>

  <div class="ms-wrap">
    <h1>摩斯电码入门</h1>
    <div class="ms-meta">整理：BG6QKX　·　1999 年 6 月　·　阅读 1,204 次</div>

    <div class="ms-body">
      <p>摩斯电码（Morse Code）用两种信号组成：<b>点（·）</b>和<b>划（—）</b>。
         一个划的长度等于三个点。字母之间空一个点的长度，单词之间空三个点。</p>

      <p>我们玩短波的最开始都得背这个。背下来之后，听见滴滴答答就知道对面在说什么了。
         <span class="hl">下面这张表贴在墙上，抄一遍基本就记住了。</span></p>

      <div class="ms-chart">
        <img src="assets/morse-chart.png" alt="摩斯电码对照表"
             onerror="this.parentNode.innerHTML='&lt;div class=ms-imgfail&gt;（图片加载失败）&lt;/div&gt;'">
        <div class="cap">摩斯电码对照表　·　字母 A–Z 与数字 0–9</div>
      </div>

      <p><b>几个最常用的：</b></p>
      <table class="ms-table">
        <tr><th>缩写</th><th>电码</th><th>意思</th></tr>
        <tr><td>SOS</td><td class="code">···　———　···</td><td>求救</td></tr>
        <tr><td>CQ</td><td class="code">—·—·　——·—</td><td>呼叫任何电台</td></tr>
        <tr><td>DE</td><td class="code">—··　·</td><td>「这里是……」</td></tr>
        <tr><td>K</td><td class="code">—·—</td><td>请回答</td></tr>
        <tr><td>73</td><td class="code">··———　···——</td><td>致敬，再见</td></tr>
      </table>

      <p class="ms-note">
        ※ 记不住也没关系。真要用的时候，一个一个对着上面那张表查就行。<br>
        ※ 本站资料随便转载，注明出处即可。
      </p>
    </div>

    <div class="ms-foot">
      <a data-act="go" data-route="radio">← 返回发烧友之家首页</a>
      　|　
      <a data-act="toast" data-msg="BG6QKX：我的信箱在首页底下。">联系站长</a>
    </div>
  </div>
</div>`;
  }
};


VG.sites['xunle'] = {
  render() {
    const M = VG.data.mail;
    return `
<div class="xl">
  <div class="xl-top">
    <div class="xl-logo">${VG.illus.siteMark('mail')}巡乐<span>邮箱</span></div>
    <div class="xl-slogan">${esc(M.slogan)}</div>
  </div>
  <div class="xl-body">
    <div class="xl-login">
      <h3>用 户 登 录</h3>
      <div class="xl-row">
        <label>用户名</label>
        <input id="xl-user" value="${esc(M.user)}" readonly>
        <span class="xl-at">@${esc(M.domain)}</span>
      </div>
      <div class="xl-row">
        <label>密　码</label>
        <input id="xl-pass" type="password" maxlength="20" autocomplete="off">
      </div>
      <div class="xl-row xl-remember">
        <label></label>
        <span><input type="checkbox" checked disabled> 记住用户名</span>
      </div>
      <div class="xl-btns">
        <button class="btn98" data-act="xl-login">登 录</button>
      </div>
      <div class="xl-err" id="xl-err"></div>
    </div>
    <div class="xl-side">
      <div class="xl-notice">
        <b>公 告</b><br>
        · 本站免费邮箱空间由 2M 升级至 5M<br>
        · 请勿使用简单密码<br>
        · 长期不登录的账号将被停用
      </div>
      <div class="xl-side-links">
        <a data-act="toast" data-msg="系统提示：请联系管理员。">忘记密码？</a><br>
        <a data-act="toast" data-msg="注册功能暂时关闭。">注册新邮箱</a><br>
        <a data-act="toast" data-msg="巡乐邮箱 · 2000 年 3 月开站。">关于本站</a>
      </div>
      ${VG.ads.slot('mail-side', 'xunle', { w: 208 })}
  </div>
  <div class="xl-foot">
    巡乐邮箱　·　本邮件系统由 巡乐网络 提供　·　2000-2001
  </div>
</div>`;
  },
  after() {
    const el = document.getElementById('xl-pass');
    if (!el) return;
    el.focus();
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') { e.preventDefault(); VG.actions['xl-login'](); }
    });
  }
};


VG.sites['mailbox'] = {
  render(s) {
    const M = VG.data.mail;
    const folder = s.mailFolder || 'inbox';
    const list = M.mails.filter(m => m.folder === folder);
    const open = s.mailOpen ? M.mails.find(m => m.id === s.mailOpen) : null;

    const counts = {
      inbox: M.mails.filter(m => m.folder === 'inbox').length,
      sent: M.mails.filter(m => m.folder === 'sent').length,
      draft: M.mails.filter(m => m.folder === 'draft').length
    };
    const nav = [
      ['inbox', '收件箱'], ['sent', '发件箱'], ['draft', '草稿箱']
    ].map(([k, n]) =>
      `<a class="${k === folder ? 'on' : ''}" data-act="xl-folder" data-f="${k}">
        ${n} <b>(${counts[k]})</b></a>`).join('')
      
      + `<a class="xl-secret${folder === 'secret' ? ' on' : ''}"
            data-act="xl-folder" data-f="secret">
           ${s.secretMailOpen ? '私密邮箱' : '私密邮箱 🔒'}
         </a>`;

    
    if (folder === 'secret') {
      return `
<div class="xl">
  ${mailHead(M, folder, nav)}
  <div class="xl-body">
    ${s.secretMailOpen ? secretMailOpenHtml() : secretLockHtml(s)}
  </div>
  ${mailFoot()}
</div>`;
    }

    
    if (open) {
      const who = open.folder === 'sent' || open.folder === 'draft'
        ? '收件人' : '发件人';
      const whoVal = open.folder === 'inbox'
        ? `${esc(open.fromName)} &lt;${esc(open.from)}&gt;`
        : `${esc(open.toName || '')} &lt;${esc(open.to || '')}&gt;`;
      const fields = [
        [who, whoVal],
        ['主　题', esc(open.subject)],
        ['时　间', esc(open.date)]
      ];
      if (open.folder === 'inbox') fields.splice(1, 0,
        ['收件人', '&lt;' + esc(open.to) + '&gt;']);

      return `
<div class="xl">
  ${mailHead(M, folder, nav)}
  <div class="xl-body">
    <div class="xl-read">
      <div class="xl-readbar">
        <a data-act="xl-back">← 返回${folderName(folder)}</a>
        <span class="xl-readbar-r">${esc(open.date)}</span>
      </div>
      <div class="xl-fields">
        ${fields.map(([k, v]) =>
          `<div class="xl-field"><span class="k">${k}</span><span class="v">${v}</span></div>`
        ).join('')}
      </div>
      <div class="xl-text">${mailBody(open)}</div>
    </div>
  </div>
  ${mailFoot()}
</div>`;
    }

    
    const rows = list.length ? list.map(m => {
      const read = (s.mailRead || []).indexOf(m.id) >= 0;
      const now = open && open.id === m.id;
      const other = m.folder === 'inbox'
        ? esc(m.fromName) : esc(m.toName || m.to || '（没有填收件人）');
      return `<tr class="${read ? '' : 'unread'} ${now ? 'now' : ''}"
                  data-act="xl-open" data-id="${m.id}">
        <td class="who">${other}</td>
        <td class="subj">${esc(m.subject)}</td>
        <td class="dt">${esc(m.date)}${read ? '' : '<span class="dot">●</span>'}</td>
      </tr>`;
    }).join('') : `<tr><td colspan="3" class="none">这个文件夹是空的。</td></tr>`;

    return `
<div class="xl">
  ${mailHead(M, folder, nav)}
  <div class="xl-body">
    <div class="xl-list">
      <table class="xl-table">
        <tr><th class="who">${folder === 'inbox' ? '发件人' : '收件人'}</th>
            <th class="subj">主题</th><th class="dt">日期</th></tr>
        ${rows}
      </table>
      ${  ''}
      <div class="xl-adwrap">${VG.ads.slot('mail-list', 'mailbox', { flash: true, w: 440 })}</div>
    </div>
  </div>
  ${mailFoot()}
</div>`;
  }
};


function mailBody(m) {
  let html = esc(m.body);
  if (m.link) {
    const a = `<a class="xl-link" data-act="go" data-route="${m.link.route}">${esc(m.link.url)}</a>`;
    html = html.replace('{{LINK}}', a);
  }
  return html;
}


function secretLockHtml(s) {
  const M = VG.data.secretMail;
  const pick = s.secretPick || [];
  const slots = [0, 1, 2, 3].map(i => {
    const k = pick[i];
    return `<div class="lk-slot${k ? ' filled' : ''}${i === pick.length ? ' next' : ''}"
                 data-act="sm-slot" data-i="${i}">
      ${k ? VG.illus.lockIcon(k) : '<span class="lk-q">?</span>'}
    </div>`;
  }).join('');

  const pad = M.symbols.map(([k, name]) =>
    `<button class="lk-btn" data-act="sm-pick" data-k="${k}" title="${esc(name)}">
      ${VG.illus.lockIcon(k)}<span>${esc(name)}</span>
    </button>`).join('');

  return `
<div class="lk">
  <div class="lk-head">
    <div class="lk-lock">🔒</div>
    <div class="lk-t">这 一 栏 加 了 锁</div>
    <div class="lk-s">依次点出四个图案才能打开。<br>
      <span class="lk-dim">顺序不对会自己清空，重来就行。</span></div>
  </div>
  <div class="lk-slots" id="lk-slots">${slots}</div>
  <div class="lk-label">可 选 图 案</div>
  <div class="lk-pad">${pad}</div>
  <div class="lk-foot">
    <button class="btn98" data-act="sm-reset">重 来</button>
    <span class="lk-count">已选 ${pick.length} / 4</span>
  </div>
</div>`;
}


function secretMailOpenHtml() {
  const M = VG.data.secretMail;
  const list = VG.data.secretMails || [];
  const openId = VG.state.smOpen;

  
  if (openId) {
    const m = list.find(x => x.id === openId);
    if (m) {
      return `
<div class="xl-list">
  <div class="sm-read">
    <div class="sm-read-bar">
      <a data-act="sm-back">← 返回</a>
      <span class="sm-read-sub">${esc(m.subj || '（无主题）')}</span>
    </div>
    <div class="sm-read-hd">
      <div><b>发件人：</b>${esc(m.from)}${m.addr ? ' &lt;' + esc(m.addr) + '&gt;' : ''}</div>
      <div><b>时　间：</b>${esc(m.tm)}</div>
      <div><b>收件人：</b>xiaoyu0427@xunle.com</div>
    </div>
    <div class="sm-read-body">
      ${m.body.map(l => l ? `<p>${esc(l)}</p>` : '<p>&nbsp;</p>').join('')}
      ${m.link ? `<p class="sm-link-p">
        <a class="sm-link" data-act="sm-badlink" data-href="${esc(m.link.href)}"
           title="${esc(m.link.href)}">${esc(m.link.text)}</a>
      </p>` : ''}
    </div>
    <div class="sm-read-ft">${esc(M.tip)}</div>
  </div>
</div>`;
    }
  }

  
  const rows = list.map(m => `
    <tr data-dbl="sm-open" data-selectable data-mid="${m.id}" class="${VG.state.smRead && VG.state.smRead[m.id] ? '' : 'unread'}">
      <td class="who">${esc(m.from)}</td>
      <td class="subj">${esc(m.subj || '（无主题）')}${m.link ? ' <span class="sm-clip">📎</span>' : ''}</td>
      <td class="dt">${esc(m.tm)}</td>
    </tr>`).join('');

  return `
<div class="xl-list">
  <div class="sm-open">
    <div class="sm-open-t">🔓 ${esc(M.title)}</div>
    <div class="sm-open-e">共 ${list.length} 封。这一栏只有我一个人看。</div>
  </div>
  <table class="xl-table">
    <tr><th class="who">发件人</th><th class="subj">主题</th><th class="dt">日期</th></tr>
    ${rows}
  </table>
  <div class="sm-open-tip2">双击主题打开</div>
</div>`;
}

function folderName(k) {
  return { inbox: '收件箱', sent: '发件箱', draft: '草稿箱' }[k] || '收件箱';
}

function mailHead(M, folder, nav) {
  return `
  <div class="xl-top">
    <div class="xl-logo">巡乐<span>邮箱</span></div>
    <div class="xl-userbar">
      <b>${esc(M.owner.name)}</b>　${esc(M.owner.addr)}
      <a data-act="xl-logout">[ 退出 ]</a>
    </div>
  </div>
  <div class="xl-nav">${nav}
    <a data-act="toast" data-msg="通讯录是空的。">通讯录</a>
    <a data-act="toast" data-msg="设置暂时打不开。">设置</a>
  </div>`;
}

function mailFoot() {
  return `
  <div class="xl-foot">
    空间 5M　·　已用 0.3M　·　本邮件系统由 巡乐网络 提供
  </div>`;
}


VG.actions['xl-login'] = () => {
  const M = VG.data.mail;
  const el = document.getElementById('xl-pass');
  const err = document.getElementById('xl-err');
  const u = ((document.getElementById('xl-user') || {}).value || '').trim().toLowerCase();
  const v = ((el && el.value) || '').trim().toLowerCase();

  if (u !== M.user.toLowerCase()) {
    if (err) err.textContent = '用户名不存在。';
    VG.audio.errorDing(); return;
  }
  if (v !== M.pass.toLowerCase()) {
    if (err) err.textContent = '密码不正确。';
    VG.audio.errorDing();
    if (el) { el.value = ''; el.focus(); }
    return;
  }
  VG.state.mailLoggedIn = true;
  VG.state.mailFolder = 'inbox';
  VG.state.mailOpen = '';
  VG.save();
  VG.audio.chime();
  VG.engine.replace('mailbox');
};


VG.actions['sm-pick'] = (el) => {
  const k = el.getAttribute('data-k');
  const M = VG.data.secretMail;
  let pick = (VG.state.secretPick || []).slice();
  if (pick.length >= 4) pick = [];          
  pick.push(k);
  VG.state.secretPick = pick;
  VG.audio.click();

  if (pick.length < 4) { VG.engine.replace('mailbox'); return; }

  if (pick.join() === M.order.join()) {
    VG.state.secretMailOpen = true;
    VG.state.secretPick = [];
    VG.save();
    VG.audio.chime();
    setTimeout(() => VG.engine.replace('mailbox'), 220);
    return;
  }
  
  VG.state.secretPick = [];
  VG.audio.errorDing();
  VG.engine.replace('mailbox');
  const box = document.getElementById('lk-slots');
  if (box) {
    box.classList.add('shake');
    setTimeout(() => box.classList.remove('shake'), 480);
  }
};


VG.actions['sm-slot'] = (el) => {
  const i = parseInt(el.getAttribute('data-i'), 10);
  if (isNaN(i)) return;
  const pick = VG.state.secretPick || [];
  if (i >= pick.length) return;             
  VG.audio.click();
  VG.state.secretPick = pick.slice(0, i);
  VG.engine.replace('mailbox');
};

VG.actions['sm-reset'] = () => {
  VG.audio.click();
  VG.state.secretPick = [];
  VG.engine.replace('mailbox');
};

VG.actions['xl-logout'] = () => {
  VG.audio.click();
  VG.state.mailLoggedIn = false;
  VG.state.mailOpen = '';
  VG.engine.navigate('xunle');
};

VG.actions['xl-folder'] = (el) => {
  VG.audio.click();
  VG.state.mailFolder = el.getAttribute('data-f');
  VG.state.mailOpen = '';
  VG.engine.replace('mailbox');
};

VG.actions['xl-open'] = (el) => {
  VG.audio.click();
  const id = el.getAttribute('data-id');
  VG.state.mailOpen = id;
  VG.state.mailRead = VG.state.mailRead || [];
  if (VG.state.mailRead.indexOf(id) < 0) VG.state.mailRead.push(id);
  VG.save();
  VG.engine.replace('mailbox');
};

VG.actions['xl-back'] = () => {
  VG.audio.click();
  VG.state.mailOpen = '';
  VG.engine.replace('mailbox');
};




function townShell(o) {
  const nav = o.nav.map(([label, id], i) =>
    `<a class="${i === 0 ? 'on' : ''}" data-act="tw-tab" data-tab="${id}">${label}</a>`).join('');
  return `
<div class="tw tw-${o.key}">
  <div class="tw-top">
    <div class="tw-name">${VG.illus.siteMark(o.mark)}${o.title}</div>
    <div class="tw-sub">${o.sub}</div>
  </div>
  <div class="tw-nav">${nav}</div>
  <div class="tw-body" id="tw-body">${o.body}</div>
  <div class="tw-ad">${VG.ads.slot('town-' + o.key, o.key, { flash: o.key === 'market', w: 440 })}</div>
  <div class="tw-foot">
    ${o.foot}<br>
    本站由 槐桥镇 提供　·　建议使用 IE4.0 以上浏览器　·　800×600
  </div>
</div>`;
}


function townInfo(rows) {
  return `<table class="tw-info">${rows.map(([k, v]) =>
    `<tr><th>${k}</th><td>${v}</td></tr>`).join('')}</table>`;
}


function townNotices(rows) {
  return `<ul class="tw-notice">${rows.map(([d, t]) =>
    `<li><span class="d">${d}</span><span class="t">${t}</span></li>`).join('')}</ul>`;
}


function townPhoto(asset, cap) {
  return `<div class="tw-photo">
    ${VG.illus.slot(asset, '', 620)}
    <div class="tw-cap">${cap}</div>
  </div>`;
}


VG.sites['park'] = {
  render() {
    const P = VG.data.town.park;
    const tabs = {
      info: () => townInfo(P.info),
      spots: () => `<ul class="tw-spots">${P.spots.map(([n, d]) =>
        `<li><b>${n}</b><span>${d}</span></li>`).join('')}</ul>`,
      album: () => townPhoto('park_1999', P.guide),
      notice: () => townNotices(P.notices)
    };
    VG._twTabs = tabs;
    return townShell({
      key: 'park', mark: 'park', title: '槐 桥 镇 人 民 公 园', sub: '柳 河 南 岸　·　一 九 八 七 年 建 园',
      nav: [['公园简介', 'info'], ['景点介绍', 'spots'],
            ['园景相册', 'album'], ['活动公告', 'notice']],
      body: tabs.notice(),
      foot: '槐桥镇人民公园管理处　·　电话 4621（镇内）'
    });
  },
  after() {
    
    VG.actions['tw-tab'](document.querySelector('.tw-park .tw-nav a[data-tab="notice"]'));
  }
};


VG.sites['market'] = {
  render() {
    const M = VG.data.town.market;
    const tabs = {
      info: () => townInfo(M.info),
      price: () => `<table class="tw-price">
          <tr><th>品　名</th><th>规格</th><th>零售价（元）</th></tr>
          ${M.price.map(([n, u, p]) =>
            `<tr><td>${n}</td><td>${u}</td><td class="p">${p}</td></tr>`).join('')}
        </table>
        <div class="tw-tip">※ 本表为当日指导价，实际成交以摊位标价为准。</div>`,
      rent: () => `<div class="tw-prose">
          <p>本市场现有空余摊位 <b>7</b> 个，位于蔬菜区西侧。</p>
          <p>租赁办法：请携带身份证及复印件一份，到市场管理办公室办理。</p>
          <p>摊位费：蔬菜区 每月 45 元；肉禽区 每月 80 元；熟食区 暂不对外出租。</p>
          <p class="dim">（本页自 1999 年 11 月起未再更新）</p>
        </div>`,
      album: () => townPhoto('market', M.guide),
      notice: () => townNotices(M.notices)
    };
    VG._twTabs = tabs;
    return townShell({
      key: 'market', mark: 'market', title: '新 民 农 贸 市 场', sub: '槐 桥 镇 新 民 路 12 号　·　一 九 九 三 年 建 场',
      nav: [['市场简介', 'info'], ['今日菜价', 'price'], ['摊位招租', 'rent'],
            ['市场相册', 'album'], ['通知公告', 'notice']],
      body: tabs.notice(),
      foot: '新民农贸市场管理办公室　·　电话 4635（镇内）'
    });
  },
  after() {
    VG.actions['tw-tab'](document.querySelector('.tw-market .tw-nav a[data-tab="notice"]'));
  }
};


VG.sites['culture'] = {
  render() {
    const C = VG.data.town.culture;
    const tabs = {
      info: () => townInfo(C.info),
      archive: () => `
        ${townPhoto('clown', C.guide)}
        ${townNotices(C.archive)}`,
      notice: () => townNotices(C.notices),
      room: () => `<div class="tw-prose">
          <p><b>活动室</b>　2 间。棋牌室每日 13:00—17:00 开放；排练室需提前一周预约。</p>
          <p><b>图书室</b>　藏书 4,100 册，其中文学类 1,200 册、农技类 900 册。
             凭本站借书证借阅，每人限借两册，借期十四天。</p>
          <p class="dim">（本页自 2000 年 3 月起未再更新）</p>
        </div>`
    };
    VG._twTabs = tabs;
    return townShell({
      key: 'culture', mark: 'stage', title: '槐 桥 镇 文 化 站', sub: '繁 荣 群 众 文 化 生 活　·　一 九 八 四 年 建 站',
      nav: [['本站简介', 'info'], ['活动室 · 图书室', 'room'],
            ['文艺档案', 'archive'], ['通知公告', 'notice']],
      body: tabs.notice(),
      foot: '槐桥镇文化站　·　电话 4602（镇内）'
    });
  },
  after() {
    
    VG.actions['tw-tab'](document.querySelector('.tw-culture .tw-nav a[data-tab="archive"]'));
  }
};


VG.actions['tw-tab'] = (el) => {
  if (!el) return;
  const key = el.getAttribute('data-tab');
  const nav = el.parentNode;
  [...nav.children].forEach(a => a.classList.remove('on'));
  el.classList.add('on');
  const box = document.getElementById('tw-body');
  if (box && VG._twTabs && VG._twTabs[key]) {
    box.innerHTML = VG._twTabs[key]();
    VG.audio.click();
  }
};




function miniIcon(kind) {
  const box = (inner) =>
    `<svg class="gi" viewBox="0 0 16 16" width="34" height="34"
      shape-rendering="crispEdges" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;
  switch (kind) {
    case 'bird':
      return box(`<rect x="2" y="6" width="11" height="5" fill="#f0c020"/>
        <rect x="3" y="5" width="8" height="1" fill="#f0c020"/>
        <rect x="10" y="7" width="4" height="3" fill="#e08010"/>
        <rect x="12" y="5" width="2" height="2" fill="#fff"/>
        <rect x="13" y="5" width="1" height="1" fill="#000"/>
        <rect x="14" y="7" width="2" height="2" fill="#e05010"/>
        <rect x="4" y="11" width="6" height="2" fill="#c06010"/>`);
    case 'ball':
      return box(`<rect x="5" y="2" width="6" height="2" fill="#e05050"/>
        <rect x="3" y="4" width="10" height="8" fill="#e05050"/>
        <rect x="5" y="12" width="6" height="2" fill="#e05050"/>
        <rect x="5" y="5" width="3" height="3" fill="#fff"/>
        <rect x="4" y="3" width="3" height="2" fill="#a02020"/>`);
    case 'block':
      return box(`<rect x="2" y="2" width="6" height="6" fill="#40a0e0"/>
        <rect x="8" y="2" width="6" height="6" fill="#e0c020"/>
        <rect x="2" y="8" width="6" height="6" fill="#e08040"/>
        <rect x="8" y="8" width="6" height="6" fill="#60c060"/>
        <rect x="2" y="2" width="6" height="1" fill="#fff" opacity=".5"/>`);
    case 'snake':
      return box(`<rect x="2" y="4" width="3" height="3" fill="#40c040"/>
        <rect x="4" y="4" width="3" height="3" fill="#40c040"/>
        <rect x="6" y="6" width="3" height="3" fill="#40c040"/>
        <rect x="8" y="6" width="3" height="3" fill="#40c040"/>
        <rect x="10" y="8" width="3" height="3" fill="#40c040"/>
        <rect x="3" y="5" width="1" height="1" fill="#000"/>
        <rect x="12" y="10" width="2" height="2" fill="#e05050"/>`);
    case 'mine':
      return box(`<rect x="6" y="2" width="4" height="12" fill="#555"/>
        <rect x="2" y="6" width="12" height="4" fill="#555"/>
        <rect x="4" y="4" width="8" height="8" fill="#333"/>
        <rect x="6" y="5" width="2" height="2" fill="#fff"/>
        <rect x="7" y="1" width="2" height="2" fill="#c03030"/>`);
    case 'card':
      return box(`<rect x="2" y="2" width="8" height="12" fill="#fff" stroke="#333"/>
        <rect x="6" y="4" width="8" height="11" fill="#fff" stroke="#333"/>
        <rect x="8" y="6" width="3" height="4" fill="#c03030"/>
        <rect x="3" y="4" width="3" height="3" fill="#333"/>`);
    case 'gem':
      return box(`<rect x="5" y="2" width="6" height="3" fill="#40d0d0"/>
        <rect x="3" y="5" width="10" height="4" fill="#30b0b0"/>
        <rect x="5" y="9" width="6" height="3" fill="#209090"/>
        <rect x="7" y="12" width="2" height="2" fill="#187878"/>
        <rect x="5" y="3" width="2" height="2" fill="#c0ffff"/>`);
    default: 
      return box(`<rect x="3" y="6" width="9" height="6" fill="#607040"/>
        <rect x="5" y="4" width="6" height="2" fill="#607040"/>
        <rect x="11" y="7" width="4" height="2" fill="#404830"/>
        <rect x="2" y="12" width="11" height="2" fill="#303820"/>
        <rect x="6" y="2" width="2" height="2" fill="#e05050"/>`);
  }
}


VG.sites['games'] = {
  render() {
    const B = VG.data.bird;
    const tiles = VG.data.gameList.map(([id, name, icon, live]) => `
      <div class="gtile${live ? ' live' : ' dead'}"
           ${live ? 'data-act="go" data-route="bird"'
                  : 'data-act="toast" data-msg="该游戏已下架。"'}>
        <div class="gthumb">${miniIcon(icon)}</div>
        <div class="gname">${esc(name)}</div>
        ${live ? '<div class="glive">可 玩</div>' : ''}
      </div>`).join('');

    return `
<div class="g2">
  <div class="g2-top">
    <div class="g2-logo">2349<span>小游戏</span></div>
    <div class="g2-slogan">
      免 费 在 线 小 游 戏 大 全　·　无 需 注 册　·　点 开 就 玩
    </div>
    <div class="g2-count">共 ${VG.data.gameList.length} 款　·　今日更新 0 款</div>
  </div>

  <div class="g2-marquee"><span>
    ★ 本站所有游戏均为免费，请勿用于商业用途 ★
    本站不提供下载，游戏版权归原作者所有 ★
    如果你的游戏打不开，请多刷新几次，或换个时间段再来 ★
    本站由 2349 网络 制作维护，2001 ★
  </span></div>

  <div class="g2-body">
    <div class="g2-grid">${tiles}</div>
    ${VG.ads.slot('games-foot', 'games', { flash: true, w: 440 })}
    <div class="g2-foot">
      本站收录 ${VG.data.gameList.length} 款小游戏　·　
      点游戏图标即可开始　·　建议使用 IE4.0 以上浏览器
    </div>
  </div>
</div>`;
  }
};


VG.sites['bird'] = {
  render(s) {
    const B = VG.data.bird;
    const best = s.birdBest || 0;
    return `
<div class="fb">
  <div class="fb-head">
    <span class="fb-logo">2349小游戏</span>
    <span class="fb-crumb">　&gt;　休闲　&gt;　飞翔的小鸟</span>
    <span class="fb-best">我的最好成绩：<b id="fb-best">${best}</b></span>
  </div>

  <div class="fb-wrap">
    <div class="fb-stage">
      <canvas id="fb-canvas" width="180" height="260"></canvas>

      <!-- 开始 / 结束 用的浮层 -->
      <div class="fb-layer" id="fb-layer">
        <div class="fb-card">
          <div class="fb-title">飞 翔 的 小 鸟</div>
          <div class="fb-prize">${esc(B.slogan)}</div>
          <div class="fb-how">
            点一下小鸟就往上飞一下<br>
            躲开上下的绿色管道
          </div>
          <button class="fb-btn" data-act="fb-start">开 始 游 戏</button>
          <button class="fb-btn ghost" data-act="fb-board">排 行 榜</button>
        </div>
      </div>
    </div>

    <div class="fb-side">
      <div class="fb-panel">
        <h3>排 行 榜</h3>
        <div class="fb-board-mini" id="fb-board-mini">
          ${boardRows(s, true)}
        </div>
        <button class="fb-btn small" data-act="fb-board">查看完整榜单</button>
      </div>

      ${  ''}
      ${VG.ads.slot('bird-side', 'bird', { flash: true, w: 248 })}
      <div class="fb-panel">
        <h3>玩 法</h3>
        <div class="fb-help">
          · 点一下小鸟就拍一下翅膀<br>
          · 每穿过一根管道得 1 分<br>
          · 碰到管道或地面就算结束<br>
          · 空格键也可以飞
        </div>
      </div>
    </div>
  </div>

</div>`;
  },
  after() { fbInit(); },
  leave() { fbStop(); }
};


function boardRows(s, compact) {
  const B = VG.data.bird;
  const rows = B.board.slice();
  const mine = s.birdBest || 0;
  const unlocked = mine >= 9;
  let list = rows;
  let rank = -1;
  if (unlocked) {
    list = [['你（游客0427）', mine, '刚刚']].concat(rows);
    rank = 0;
  } else if (mine > 0) {
    
    list = rows.concat([['你（游客0427）', mine, '刚刚']]);
  }
  return list.map(([name, sc, tm], i) => `
    <div class="fb-row${i === rank ? ' me' : ''}">
      <span class="r">${i + 1}</span>
      <span class="n">${esc(name)}</span>
      <span class="s">${sc}</span>
      ${compact ? '' : `<span class="t">${esc(tm)}</span>`}
    </div>`).join('');
}


let fbRaf = 0, fbState = null;

function fbStop() {
  if (fbRaf) cancelAnimationFrame(fbRaf);
  fbRaf = 0;
  fbState = null;
  const cv = document.getElementById('fb-canvas');
  if (cv) cv.onpointerdown = null;
  document.removeEventListener('keydown', fbKey);
}


function fbKey(e) {
  if (e.code !== 'Space' && e.key !== ' ' && e.key !== 'Spacebar') return;
  if (!document.getElementById('fb-canvas')) return;   
  e.preventDefault();
  if (!fbState || !VG._fb) return;
  if (fbState.phase === 'play') {
    if (VG._fb.flap) VG._fb.flap();
  } else {
    
    if (VG._fb.start) VG._fb.start();
  }
}

function fbInit() {
  fbStop();
  const cv = document.getElementById('fb-canvas');
  if (!cv) return;
  const ctx = cv.getContext('2d');
  ctx.imageSmoothingEnabled = false;

  const W = cv.width, H = cv.height;
  const GROUND = 34;               
  const FLOOR = H - GROUND;

  fbState = {
    phase: 'ready',                
    y: H / 2 - 20, vy: 0,
    bird: { x: 46, w: 15, h: 11 },
    pipes: [],
    score: 0,
    tick: 0,
    glitched: false,
    wing: 0,
    over: false
  };

  
  const G = 0.20, FLAP = -3.6, SPEED = 1.05, GAP = 104, SPACING = 118, PW = 26;


  function addPipe() {
    const top = 26 + Math.random() * (FLOOR - GAP - 52);
    fbState.pipes.push({ x: W + 10, top: top, scored: false });
  }

  function step() {
    const S = fbState;
    S.tick++;
    if (S.phase === 'play') {
      S.vy += G;
      S.y += S.vy;
      S.wing += 1;
      
      if (S.y - S.bird.h / 2 < 0) { S.y = S.bird.h / 2; S.vy = 0; }

      
      const last = S.pipes[S.pipes.length - 1];
      if (!last || last.x < W - SPACING) addPipe();
      for (const p of S.pipes) p.x -= SPEED;
      while (S.pipes.length && S.pipes[0].x + PW < -4) S.pipes.shift();

      
      const bx = S.bird.x, bw = S.bird.w;
      for (const p of S.pipes) {
        if (!p.scored && p.x + PW < bx) {
          p.scored = true;
          S.score++;
          fbScore(S.score);
          
          if (S.score === 9 && !S.glitched) {
            S.glitched = true;
            fbGlitch();
          }
        }
      }

      
      const by = S.y - S.bird.h / 2, bh = S.bird.h;
      let hit = (S.y + bh / 2 > FLOOR);
      for (const p of S.pipes) {
        if (bx + bw > p.x && bx < p.x + PW) {
          if (by < p.top || S.y + bh / 2 > p.top + GAP) { hit = true; break; }
        }
      }
      if (hit && !S.over) fbDie();
    }
  }

  function draw() {
    const S = fbState;
    
    ctx.fillStyle = '#7ec8e8';
    ctx.fillRect(0, 0, W, FLOOR);
    
    ctx.fillStyle = '#d8f0ff';
    for (let i = 0; i < 4; i++) {
      const cx = ((i * 62) - (S.tick * 0.22) % (W + 80) + W + 80) % (W + 80) - 40;
      ctx.fillRect(Math.round(cx), 24 + i * 30, 26, 7);
      ctx.fillRect(Math.round(cx) + 7, 18 + i * 30, 12, 7);
    }
    
    for (const p of S.pipes) {
      const x = Math.round(p.x);
      ctx.fillStyle = '#3a8a2a';
      ctx.fillRect(x, 0, PW, p.top);
      ctx.fillRect(x, p.top + GAP, PW, FLOOR - p.top - GAP);
      ctx.fillStyle = '#58c040';
      ctx.fillRect(x + 3, 0, PW - 9, p.top);
      ctx.fillRect(x + 3, p.top + GAP, PW - 9, FLOOR - p.top - GAP);
      
      ctx.fillStyle = '#3a8a2a';
      ctx.fillRect(x - 3, p.top - 11, PW + 6, 11);
      ctx.fillRect(x - 3, p.top + GAP, PW + 6, 11);
      ctx.fillStyle = '#58c040';
      ctx.fillRect(x, p.top - 8, PW - 6, 8);
      ctx.fillRect(x, p.top + GAP + 3, PW - 6, 8);
    }
    
    ctx.fillStyle = '#c8b070';
    ctx.fillRect(0, FLOOR, W, GROUND);
    ctx.fillStyle = '#a89050';
    for (let i = 0; i < W; i += 12) {
      const off = Math.round((S.tick * SPEED) % 12);
      ctx.fillRect(i - off, FLOOR + 3, 6, 3);
    }
    ctx.fillStyle = '#8a7438';
    ctx.fillRect(0, FLOOR, W, 3);

    
    const bx = S.bird.x, by = Math.round(S.y - S.bird.h / 2);
    const wingUp = Math.floor(S.wing / 5) % 2 === 0;
    ctx.fillStyle = '#f5c518';
    ctx.fillRect(bx, by + 2, 13, 7);
    ctx.fillRect(bx + 2, by, 9, 2);
    ctx.fillRect(bx + 2, by + 9, 7, 2);
    
    ctx.fillStyle = '#e09010';
    if (wingUp) ctx.fillRect(bx + 1, by - 2, 8, 4);
    else ctx.fillRect(bx + 1, by + 6, 8, 4);
    
    ctx.fillStyle = '#fff'; ctx.fillRect(bx + 9, by + 1, 3, 3);
    ctx.fillStyle = '#000'; ctx.fillRect(bx + 10, by + 2, 1, 1);
    ctx.fillStyle = '#e05010'; ctx.fillRect(bx + 13, by + 4, 3, 3);

    
    if (S.phase !== 'ready') {
      ctx.fillStyle = '#000';
      const txt = String(S.score);
      for (let i = 0; i < txt.length; i++) {
        ctx.fillRect(W / 2 - txt.length * 6 + i * 12 + 1, 17, 10, 14);
      }
      ctx.fillStyle = '#fff';
      for (let i = 0; i < txt.length; i++) {
        ctx.fillRect(W / 2 - txt.length * 6 + i * 12, 16, 10, 14);
      }
      ctx.fillStyle = '#000';
      ctx.font = 'bold 12px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(txt, W / 2, 27);
    }
  }

  
  const STEP = 1000 / 60;
  let last = 0, acc = 0;

  function loop(t) {
    if (!document.body.contains(cv)) { fbStop(); return; }
    if (!last) last = t;
    let dt = t - last;
    last = t;
    if (dt > 200) dt = 200;        
    acc += dt;
    let guard = 0;
    while (acc >= STEP && guard++ < 6) { step(); acc -= STEP; }
    draw();
    fbRaf = requestAnimationFrame(loop);
  }

  
  function fbDie() {
    const S = fbState;
    S.over = true;
    S.phase = 'dead';
    VG.audio.errorDing();
    if (S.score > (VG.state.birdBest || 0)) {
      VG.state.birdBest = S.score;
      VG.save();
    }
    const el = document.getElementById('fb-best');
    if (el) el.textContent = VG.state.birdBest || 0;
    const mini = document.getElementById('fb-board-mini');
    if (mini) mini.innerHTML = boardRows(VG.state, true);
    fbLayer(false, S.score);
  }

  
  function fbGlitch() {
    VG.horror.sysGlitch(720);
    try {
      VG.audio.init(); VG.audio.resume();
      VG.audio.glitchReverse();
      VG.audio.reverseTone(0.4);
    } catch (e) {}
  }

  
  function fbStart() {
    if (!fbState) return;
    fbState.phase = 'play';
    fbState.y = H / 2 - 20; fbState.vy = 0;
    fbState.pipes = []; fbState.score = 0;
    fbState.glitched = false; fbState.over = false;
    fbState.tick = 0;
    fbLayer(true);
    fbFlap();
  }
  function fbFlap() {
    if (!fbState) return;
    if (fbState.phase === 'play') {
      fbState.vy = FLAP;
      VG.audio.tone(660, 0.05, 0.06, 'square');
    }
  }

  
  function fbLayer(hide, score) {
    const el = document.getElementById('fb-layer');
    if (!el) return;
    if (hide === true) { el.classList.add('hidden'); return; }
    const S = fbState;
    const mine = S ? S.score : 0;
    el.classList.remove('hidden');
    el.innerHTML = `
      <div class="fb-card">
        <div class="fb-title">游 戏 结 束</div>
        <div class="fb-result">你 得 了 <b>${mine}</b> 分</div>
        ${mine >= 9
          ? '<div class="fb-win">★ 你超过了历史最高分 8 分 ★<br>点「排行榜」领取神秘礼包</div>'
          : '<div class="fb-lose">还没有超过 8 分，再试一次</div>'}
        <button class="fb-btn" data-act="fb-start">再 玩 一 次</button>
        <button class="fb-btn ghost" data-act="fb-board">排 行 榜</button>
      </div>`;
  }

  
  cv.onpointerdown = (e) => {
    e.preventDefault();
    if (fbState && fbState.phase === 'play') fbFlap();
  };
  document.addEventListener('keydown', fbKey);

  VG._fb = { start: fbStart, layer: fbLayer, boardRows: boardRows, flap: fbFlap };
  
  fbRaf = requestAnimationFrame(loop);
}


function fbScore(n) {
  
  if (n > (VG.state.birdBest || 0)) {
    VG.state.birdBest = n;
    const el = document.getElementById('fb-best');
    if (el) el.textContent = n;
  }
}


VG.actions['fb-start'] = () => {
  VG.audio.click();
  if (VG._fb) VG._fb.start();
};
VG.actions['fb-board'] = () => {
  VG.audio.click();
  const s = VG.state;
  const mine = s.birdBest || 0;
  const unlocked = mine >= 9;
  VG.ui.dialog({
    title: '排 行 榜 - 飞翔的小鸟',
    width: 420,
    body: `
      <div class="fbb">
        <div class="fbb-head">
          <span class="r">名次</span><span class="n">玩家</span>
          <span class="s">分数</span><span class="t">日期</span>
        </div>
        ${boardRows(s)}
        ${unlocked ? `
        <div class="fbb-gift">
          <div class="fbb-gift-t">你已经是第 1 名了</div>
          <button class="fb-btn" data-act="fb-gift">领 取 礼 包</button>
        </div>` : `
        <div class="fbb-tip">第一名可以获得神秘礼包。目前最高分 8 分。</div>`}
      </div>`,
    buttons: ['关闭']
  });
};


VG.actions['fb-gift'] = () => {
  VG.audio.chime();
  const M = VG.data.maze;
  const ov = document.getElementById('overlay');
  ov.innerHTML = `
    <div class="dl-dlg gift-dlg">
      <div class="dl-title">
        <span>神 秘 礼 包</span>
        <button class="tb-btn close" data-dlg-close>×</button>
      </div>
      <div class="gift-body">
        <img class="gift-ico" src="assets/gift.png" alt="">
        <div class="gift-win">恭喜你成为本游戏第 1 名</div>
        <div class="gift-file">
          ${VG.illus.deskIcon('exe')}
          <div class="gift-file-r">
            <a data-act="maze-download">${esc(M.name)}.${esc(M.ext)}</a>
            <div class="gift-file-m">${esc(M.size)}　·　来自 ${esc(M.from)}</div>
          </div>
        </div>
      </div>
      <div class="gift-foot">2349 小游戏　·　2001</div>
      <div class="dl-btns"><button class="btn98" data-dlg-close>关 闭</button></div>
    </div>`;
  ov.classList.remove('hidden');
  ov.onclick = (e) => {
    if (e.target === ov || e.target.hasAttribute('data-dlg-close')) {
      ov.classList.add('hidden'); ov.innerHTML = '';
    }
  };
};


VG.actions['maze-download'] = () => {
  const M = VG.data.maze;
  VG.audio.click();
  const ov = document.getElementById('overlay');
  ov.classList.add('hidden'); ov.innerHTML = '';
  showDownloadDialog(M, () => {
    VG.state.mazeOnDesk = true;
    VG.save();
    VG.ui.toast('文件已保存到「桌面」。', 3000);
    if (VG.engine.currentRoute() === 'desk') VG.engine.replace('desk');
  });
};



let mzRaf = 0, mzState = null;


function mzLevels(cracked) {
  const L = [];

  
  {
    const x0 = 70, x1 = 930, y0 = 70, gap = 120, rows = 5;
    const pts = [];
    for (let r = 0; r < rows; r++) {
      const y = y0 + r * gap;
      if (r % 2 === 0) { pts.push([x0, y]); pts.push([x1, y]); }
      else { pts.push([x1, y]); pts.push([x0, y]); }
    }
    L.push({ pts, w: 60, name: '第 1 关', hint: '沿着白线走，别碰到黑边。' });
  }

  
  if (cracked) {
    const x0 = 70, x1 = 930, y0 = 90, gap = 150, rows = 4;
    const pts = [];
    for (let r = 0; r < rows; r++) {
      const y = y0 + r * gap;
      if (r % 2 === 0) { pts.push([x0, y]); pts.push([x1, y]); }
      else { pts.push([x1, y]); pts.push([x0, y]); }
    }
    L.push({ pts, w: 66, name: '第 2 关', hint: '（已破译）慢慢走就行。' });
  } else {
    const x0 = 40, x1 = 960, y0 = 46, gap = 46, rows = 12, amp = 15;
    const pts = [];
    for (let r = 0; r < rows; r++) {
      const y = y0 + r * gap;
      const N = 64;
      const row = [];
      for (let i = 0; i <= N; i++) {
        const t = i / N;
        row.push([x0 + t * (x1 - x0),
                  y + Math.sin(t * Math.PI * 2 * 4) * amp
                    + Math.sin(t * Math.PI * 2 * 11) * 2.2]);
      }
      if (r % 2 === 0) pts.push(...row);
      else pts.push(...row.slice().reverse());
    }
    L.push({ pts, w: 6, safe: 1.2, armR: 18,
             name: '第 2 关', hint: '线很细。非常细。' });
  }

  return L;
}


function mzSegDist(px, py, ax, ay, bx, by) {
  const dx = bx - ax, dy = by - ay;
  const L2 = dx * dx + dy * dy;
  let t = L2 ? ((px - ax) * dx + (py - ay) * dy) / L2 : 0;
  t = t < 0 ? 0 : (t > 1 ? 1 : t);
  const cx = ax + t * dx, cy = ay + t * dy;
  return Math.hypot(px - cx, py - cy);
}


function mzDistToPath(pts, px, py) {
  let best = Infinity;
  for (let i = 0; i < pts.length - 1; i++) {
    const d = mzSegDist(px, py, pts[i][0], pts[i][1], pts[i + 1][0], pts[i + 1][1]);
    if (d < best) best = d;
  }
  return best;
}


function mzCheckPath(pts, width, safeOverride, farEnough) {
  
  const safe = (safeOverride != null && safeOverride > 0)
    ? safeOverride : Math.max(1, width / 2 - 4);
  const FE = farEnough || safe * 6;
  const S = [];
  const STEP = 4;
  let acc = 0;
  for (let i = 0; i < pts.length - 1; i++) {
    const [ax, ay] = pts[i], [bx, by] = pts[i + 1];
    const len = Math.hypot(bx - ax, by - ay);
    const n = Math.max(1, Math.ceil(len / STEP));
    for (let k = 0; k < n; k++) {
      const t = k / n;
      S.push({ x: ax + (bx - ax) * t, y: ay + (by - ay) * t, s: acc + len * t });
    }
    acc += len;
  }
  S.push({ x: pts[pts.length - 1][0], y: pts[pts.length - 1][1], s: acc });

  const bad = [];
  for (let i = 0; i < S.length; i++) {
    for (let j = i + 1; j < S.length; j++) {
      const dAlong = S[j].s - S[i].s;
      if (dAlong < FE) continue;              
      const d = Math.hypot(S[j].x - S[i].x, S[j].y - S[i].y);
      if (d < safe * 2) {
        bad.push({
          a: [Math.round(S[i].x), Math.round(S[i].y)],
          b: [Math.round(S[j].x), Math.round(S[j].y)],
          gap: Math.round(d), need: Math.round(safe * 2)
        });
        if (bad.length >= 8) return bad;
      }
    }
  }
  return bad;
}

function mzStop() {
  if (mzRaf) cancelAnimationFrame(mzRaf);
  mzRaf = 0;
  mzState = null;
}

function mzOpen() {
  const M = VG.data.maze;
  
  let host = document.getElementById('mz-full');
  if (!host) {
    host = document.createElement('div');
    host.id = 'mz-full';
    host.className = 'mz-full';
    document.body.appendChild(host);
  }
  host.innerHTML = `
    <canvas id="mz-canvas"></canvas>
    <div class="mz-top">
      <span class="mz-top-t">${esc(M.name)}.${esc(M.ext)}</span>
      <button class="mz-x" data-act="mz-quit">×</button>
    </div>
    <div class="mz-hud">
      <span>当前</span><b id="mz-lv">第 1 关</b>
      <span>失误</span><b id="mz-fail">0</b>
      <button class="mz-hudbtn" data-act="mz-restart">重来本关</button>
      <button class="mz-hudbtn" data-act="mz-quit">退出</button>
    </div>
    <div class="mz-tip" id="mz-tip"></div>
    <div class="mz-layer hidden" id="mz-layer"></div>`;
  host.classList.remove('hidden');
  mzInit();
}

function mzQuit() {
  mzStop();
  const h = document.getElementById('mz-full');
  if (h) { h.classList.add('hidden'); h.innerHTML = ''; }
}

function mzInit() {
  mzStop();
  const cv = document.getElementById('mz-canvas');
  if (!cv) return;
  const ctx = cv.getContext('2d');
  const M = VG.data.maze;
  const LEVELS = mzLevels(!!(VG.state && VG.state.mazeCracked));

  mzState = {
    lv: 0, fails: 0, over: true, armed: false,
    x: -9999, y: -9999, scale: 1, ox: 0, oy: 0
  };

  let L, pts, W, OFFX, OFFY, SC;   
  let safe;                        
  let armR;                        

  function fit() {
    const dpr = window.devicePixelRatio || 1;
    const w = window.innerWidth, h = window.innerHeight;
    cv.width = Math.round(w * dpr);
    cv.height = Math.round(h * dpr);
    cv.style.width = w + 'px';
    cv.style.height = h + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    
    const PAD = 40;
    SC = Math.min((w - PAD * 2) / 1000, (h - PAD * 2) / 620);
    OFFX = (w - 1000 * SC) / 2;
    OFFY = (h - 620 * SC) / 2;
    
    safe = (L.safe != null ? L.safe : (L.w / 2 - 4)) * SC;
    armR = (L.armR != null ? L.armR : (L.w / 2 - 4)) * SC;
    mzState.scale = SC; mzState.ox = OFFX; mzState.oy = OFFY;
  }

  function toScreen(p) { return [OFFX + p[0] * SC, OFFY + p[1] * SC]; }

  function setup() {
    L = LEVELS[mzState.lv];
    pts = L.pts;
    fit();
    mzState.armed = false;
    mzState.over = true;
    const lv = document.getElementById('mz-lv');
    if (lv) lv.textContent = L.name;
    const fl = document.getElementById('mz-fail');
    if (fl) fl.textContent = mzState.fails;
    tip(mzState.lv === 0
      ? { t: M.name, s: M.intro.join('<br>'), b: '开 始' }
      : { t: L.name, s: L.hint, b: '开 始' });
    draw();
  }

  function tip(o) {
    const el = document.getElementById('mz-layer');
    if (!el) return;
    if (!o) { el.classList.add('hidden'); el.innerHTML = ''; return; }
    el.classList.remove('hidden');
    el.innerHTML = `<div class="mz-card">
      <div class="mz-title">${o.t}</div>
      <div class="mz-sub">${o.s}</div>
      <button class="mz-go" data-act="mz-go">${o.b}</button>
    </div>`;
  }

  function hud(msg, cold) {
    const el = document.getElementById('mz-tip');
    if (!el) return;
    el.textContent = msg || '';
    el.classList.toggle('cold', !!cold);
  }

  
  function draw() {
    const w = window.innerWidth, h = window.innerHeight;
    ctx.fillStyle = '#101318';
    ctx.fillRect(0, 0, w, h);
    if (!pts) return;

    
    const lw = L.w * SC;
    const path = () => {
      ctx.beginPath();
      const p0 = toScreen(pts[0]);
      ctx.moveTo(p0[0], p0[1]);
      for (let i = 1; i < pts.length; i++) {
        const p = toScreen(pts[i]);
        ctx.lineTo(p[0], p[1]);
      }
    };
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#000';
    ctx.lineWidth = lw;
    path(); ctx.stroke();
    ctx.strokeStyle = '#f2f5f8';
    ctx.lineWidth = Math.max(1, lw - 8 * SC);   
    path(); ctx.stroke();

    
    const S = toScreen(pts[0]), E = toScreen(pts[pts.length - 1]);
    const dot = (p, col, r) => {
      ctx.fillStyle = col;
      ctx.beginPath(); ctx.arc(p[0], p[1], r, 0, 6.2832); ctx.fill();
      ctx.strokeStyle = 'rgba(0,0,0,.5)'; ctx.lineWidth = 2; ctx.stroke();
    };
    dot(S, mzState.armed ? '#3a9a5a' : '#1a8a3a', Math.max(11, safe * 0.9));
    dot(E, '#c0392b', Math.max(11, safe * 0.9));
    if (!mzState.armed) {
      
      const ph = (Date.now() % 1200) / 1200;
      ctx.strokeStyle = 'rgba(90,220,140,' + (0.85 - ph * 0.85) + ')';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(S[0], S[1], Math.max(12, safe) + ph * 26, 0, 6.2832);
      ctx.stroke();
    }

    
    if (mzState.x > -9000) {
      ctx.strokeStyle = mzState.armed ? '#1a5c8a' : '#8a94a4';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(mzState.x, mzState.y, 4, 0, 6.2832);
      ctx.moveTo(mzState.x - 11, mzState.y); ctx.lineTo(mzState.x - 6, mzState.y);
      ctx.moveTo(mzState.x + 6, mzState.y); ctx.lineTo(mzState.x + 11, mzState.y);
      ctx.moveTo(mzState.x, mzState.y - 11); ctx.lineTo(mzState.x, mzState.y - 6);
      ctx.moveTo(mzState.x, mzState.y + 6); ctx.lineTo(mzState.x, mzState.y + 11);
      ctx.stroke();
    }
  }

  function loop() {
    const cv2 = document.getElementById('mz-canvas');
    if (!cv2 || !document.body.contains(cv2)) { mzStop(); return; }
    draw();
    mzRaf = requestAnimationFrame(loop);
  }

  
  function toVirtual(e) {
    
    const r = cv.getBoundingClientRect();
    return [e.clientX - r.left, e.clientY - r.top];
  }

  function fail() {
    if (mzState.over) return;
    mzState.over = true;
    mzState.fails++;
    VG.audio.errorDing();
    const fl = document.getElementById('mz-fail');
    if (fl) fl.textContent = mzState.fails;
    tip({ t: '碰 到 边 了', s: '从头来。', b: '重 试' });
  }

  function win() {
    if (mzState.over) return;
    mzState.over = true;
    VG.audio.chime();
    if (mzState.lv === 0) {
      tip({ t: M.pass1, s: '下一关会难很多。', b: '进 入 第 2 关' });
      mzState.next = 1;
    } else {
      
      VG.state.mazeOnDesk = false;
      VG.state.mazeCracked = false;
      VG.state.rebornOnDesk = true;
      VG.save();
      tip({ t: M.pass2, s: '你赢了。', b: '再 玩 一 次' });
      mzState.next = 0;
      setTimeout(() => {
        mzQuit();
        VG.engine.render('desk');
        VG.horror.sysGlitch(420);
        VG.ui.toast('「鼠标迷宫」已卸载。', 2600);
      }, 2600);
    }
  }

  
  
  function onLine(px, py) {
    const vx = (px - OFFX) / SC, vy = (py - OFFY) / SC;
    return mzDistToPath(pts, vx, vy) * SC <= safe;
  }

  cv.onmousemove = (e) => {
    const [px, py] = toVirtual(e);
    const lastX = mzState.x, lastY = mzState.y;
    mzState.x = px; mzState.y = py;
    if (!pts) return;
    const S = toScreen(pts[0]);
    const dStart = Math.hypot(px - S[0], py - S[1]);

    if (!mzState.armed) {
      if (mzState.over) return;                 
      if (dStart <= armR) {                     
        mzState.armed = true;
        hud('');
      }
      return;
    }
    if (mzState.over) return;

    
    const moved = Math.hypot(px - lastX, py - lastY);
    const steps = Math.max(1, Math.ceil(moved / 3));
    const E = toScreen(pts[pts.length - 1]);
    for (let i = 1; i <= steps; i++) {
      const t = i / steps;
      const x = lastX + (px - lastX) * t;
      const y = lastY + (py - lastY) * t;
      if (!onLine(x, y)) { fail(); return; }
      if (Math.hypot(x - E[0], y - E[1]) <= safe) { win(); return; }
    }
  };
  cv.onmouseleave = () => {
    if (mzState && mzState.armed && !mzState.over) fail();
  };

  VG._mz = {
    go: () => {
      if (!mzState.over) return;
      if (mzState.next !== undefined) {
        mzState.lv = mzState.next;
        mzState.next = undefined;
      }
      setup();
      mzState.over = false;
      mzState.armed = false;
      tip(null);
      hud('把鼠标移到绿点上开始');
    },
    restart: () => {
      if (!mzState) return;
      mzState.next = undefined;
      setup();
      mzState.armed = false;
      tip(null);
      hud('把鼠标移到绿点上开始');
    },
    
    state: () => mzState,
    levels: () => LEVELS,
    dist: (vx, vy) => mzDistToPath(pts, vx, vy),
    safeR: () => safe,
    toScreen
  };

  window.onresize = () => { if (mzState) { fit(); } };

  setup();
  mzRaf = requestAnimationFrame(loop);
}

VG.actions['maze-open'] = () => { VG.audio.click(); mzOpen(); };
VG.actions['mz-go'] = () => { VG.audio.click(); if (VG._mz) VG._mz.go(); };
VG.actions['mz-restart'] = () => { VG.audio.click(); if (VG._mz) VG._mz.restart(); };
VG.actions['mz-quit'] = () => { VG.audio.click(); mzQuit(); };


VG._mzLevels = mzLevels;
VG._mzCheckPath = mzCheckPath;
VG._mzDistToPath = mzDistToPath;


VG.sites['guo999'] = {
  
  render(s) {
    const scared = !!s.guoScared;
    const gentle = VG.horror.isGentle && VG.horror.isGentle();

    
    const program = (scared
      ? [['一', '开场锣鼓'], ['二', '吞　剑'], ['三', '花瓶姑娘', true], ['四', '……']]
      : [['一', '开场锣鼓'], ['二', '吞　剑'], ['三', '花瓶姑娘', true], ['四', '谢　幕']]
    ).map(([n, t, star]) => `
      <li><b>${n}、</b>${t}${star ? '<span class="g9-star">★</span>' : ''}</li>`).join('');

    
    const rosterRows = scared
      ? [['1', '郭永贵', '班主'], ['2', '郭世萍', '鼓手'], ['3', '康建国', '乐师'],
         ['4', '柳素芬', '厨娘'], ['5', '王长顺', '杂役'], ['6', '周小雨', '？？'],
         ['7', '■■■', '台柱']]
      : [['1', '郭永贵', '班主'], ['2', '郭世萍', '鼓手'], ['3', '康建国', '乐师'],
         ['4', '柳素芬', '厨娘'], ['5', '王长顺', '杂役'], ['6', '周小雨', '报幕']];
    const roster = rosterRows.map(([n, name, role]) =>
      `<li${name === '■■■' ? ' class="blank"' : ''}>
        <span class="n">${n}</span>${name}
        <span class="r">${role}</span></li>`).join('');

    
    const routeRows = scared
      ? [['1999.07.02', '驻马店'], ['1999.07.19', '漯河'], ['1999.08.01', '周口'],
         ['1999.08.07', '商丘'], ['1999.08.14', '槐　桥　镇', true]]
      : [['1999.07.02', '驻马店'], ['1999.07.19', '漯河'], ['1999.08.01', '周口'],
         ['1999.08.07', '商丘'], ['1999.08.14', '槐　桥　镇'],
         ['1999.08.28', '明　港'], ['1999.09.10', '罗　山']];
    const route = routeRows.map(([d, p, last]) =>
      `<li class="${last ? 'last' : ''}"><span class="d">${d}</span>
        <span class="p">${p}</span></li>`).join('');

    
    const contact = scared
      ? `走到哪儿算哪儿<br><span class="sm">不收信　·　不接电话　·　不问来路</span>`
      : `本镇东街 42 号（临时场地）<br>
         <span class="sm">电话：镇内 4713　·　演出期间每日 9:00—21:00 有人</span>`;

    return `
<div class="g9 ${scared ? 'scared' : 'normal'}${gentle ? ' gentle' : ''}" id="g9">
  ${  ''}
  ${VG.illus.festoon(22)}
  ${VG.illus.bunting(16)}
  <div class="g9-scan"></div>
  <div class="g9-rgb"></div>
  <div class="g9-roll"></div>
  <i class="g9-tear t1"></i><i class="g9-tear t2"></i><i class="g9-tear t3"></i>
  <i class="g9-tear t4"></i><i class="g9-tear t5"></i><i class="g9-tear t6"></i>
  <div class="g9-burst"></div>
  <div class="g9-face" id="g9-face"></div>

  <!-- 那只眼睛：只在"掉 san"之后才出现（CSS 控制） -->
  <div class="g9-eye" id="g9-eye"><img src="assets/eye.png" alt=""></div>

  <a class="g9-login" data-act="g9-login">［ 管 理 登 录 ］</a>

  <div class="g9-wrap" id="g9-wrap">
    <div class="g9-head">
      <div class="g9-title" data-t>${VG.illus.siteMark('tent')}★ 郭 记 大 篷 车 ★</div>
      <div class="g9-sub" data-t>流 动 演 出　·　全 国 巡 演　·　一 九 九 九</div>
      <div class="g9-rule"></div>
    </div>

    <div class="g9-photo">
      ${VG.illus.slot('circus_tent', '', 520)}
      <div class="g9-cap" data-t>本班演出场地　·　摄于本镇东侧空地　·　1999 年 8 月</div>
    </div>

    <div class="g9-cols">
      <div class="g9-box">
        <h3>节 目 单</h3>
        <ul class="g9-prog" data-t>${program}</ul>
        <div class="g9-note" data-t>※ 每场约九十分钟，中途不休息</div>
      </div>

      <div class="g9-box">
        <h3>全 体 演 职 人 员</h3>
        <ul class="g9-roster" data-t>${roster}</ul>
        <div class="g9-note" data-t>※ 班主：郭永贵</div>
      </div>
    </div>

    <div class="g9-box">
      <h3>巡 演 路 线</h3>
      <ul class="g9-route" data-t>${route}</ul>
      <div class="g9-note" data-t>${scared
        ? '※ 槐桥镇为本次巡演最后一站，此后未再出车'
        : '※ 以上为已定行程，后续场次陆续公布'}</div>
    </div>

    <div class="g9-cols">
      <div class="g9-box">
        <h3>票 价</h3>
        <div class="g9-price" data-t>
          五　块<br>
          <span class="sm">小孩半价　·　一米二以下免票</span>
        </div>
        ${  ''}
        ${scared ? `
        <div class="g9-swatch" data-t>
          <span class="k">入 场 券 色 标</span>
          <i style="background:#c62828"></i><i style="background:#c62828"></i><i
             style="background:#1565c0"></i><i style="background:#2e7d32"></i>
        </div>` : ''}
      </div>
      <div class="g9-box">
        <h3>联 系 我 们</h3>
        <div class="g9-contact" data-t>${contact}</div>
      </div>
    </div>

    <div class="g9-foot">
      <div data-t>本页由 郭记大篷车 制作　·　一99九年　·　感谢 网易 提供免费空间</div>
      <div class="g9-count" id="g9-count" data-t>你是第 00000 位访客</div>
    </div>
  </div>

  <!-- ★ 班里的丑角。
       正常版：站在右下角一颠一颠，底下写着「本站吉祥物 · 点我」。
       掉 san 版：位置开始乱飘，边上泛红光。 -->
  <div class="g9-clown" id="g9-clown" data-act="g9-clown">
    <img src="assets/clown_cut.png" alt="">
  </div>

  <div class="g9-whisper" id="g9-whisper"></div>
</div>`;
  },

  after() {
    const root = document.getElementById('g9');
    if (!root) return;
    const scared = !!VG.state.guoScared;
    const gentle = VG.horror.isGentle && VG.horror.isGentle();

    
    if (!scared) {
      const ts = VG._g9Timers = VG._g9Timers || [];
      let cn = 178;
      ts.push(setInterval(() => {
        if (!document.body.contains(root)) return;
        const c = document.getElementById('g9-count');
        if (!c) return;
        if (Math.random() < 0.3) cn += 1;
        c.textContent = '你是第 ' + String(cn).padStart(5, '0') + ' 位访客';
      }, 4000));
      return;
    }

    
    document.body.classList.add('g9-mode');

    
    VG.horror.circusTune();

    const timers = VG._g9Timers = VG._g9Timers || [];
    const every = (ms, fn) => { timers.push(setInterval(fn, ms)); };
    const later = (ms, fn) => { timers.push(setTimeout(fn, ms)); };

    
    const GARBAGE = '▓▒░█◣◢◤◥※●○✕＿\u0000\u001f\u00a4\u2020\u00a7';
    const NORMAL = '郭记大篷车花瓶姑娘一九九巡演站槐桥镇永贵世萍康建柳素芬王长顺周小雨';
    
    {
      every(190, () => {
        if (!document.body.contains(root)) return;
        const els = root.querySelectorAll('[data-t]');
        if (!els.length) return;
        const el = els[Math.floor(Math.random() * els.length)];
        
        const tn = [];
        (function walk(n) {
          for (const c of n.childNodes) {
            if (c.nodeType === 3 && c.nodeValue.trim()) tn.push(c);
            else if (c.nodeType === 1) walk(c);
          }
        })(el);
        if (!tn.length) return;
        const node = tn[Math.floor(Math.random() * tn.length)];
        if (node.__orig === undefined) node.__orig = node.nodeValue;
        const src = node.__orig;
        
        const whole = Math.random() < 0.18;
        const k = whole ? src.length
                        : 1 + Math.floor(Math.random() * Math.max(2, Math.ceil(src.length / 2)));
        const chars = src.split('');
        for (let i = 0; i < k; i++) {
          const p = whole ? i : Math.floor(Math.random() * chars.length);
          if (!chars[p] || !chars[p].trim()) continue;
          chars[p] = Math.random() < 0.55
            ? GARBAGE[Math.floor(Math.random() * GARBAGE.length)]
            : NORMAL[Math.floor(Math.random() * NORMAL.length)];
        }
        node.nodeValue = chars.join('');
        setTimeout(() => { try { node.nodeValue = src; } catch (e) {} },
          120 + Math.random() * 280);
      });

      
      every(2100, () => {
        if (!document.body.contains(root)) return;
        root.classList.add('burst');
        const wrap = document.getElementById('g9-wrap');
        if (wrap) {
          const dx = (Math.random() - 0.5) * 14;
          const sk = (Math.random() - 0.5) * 1.2;
          wrap.style.transform = `translateX(${dx}px) skewX(${sk}deg)`;
        }
        if (Math.random() < 0.22) root.classList.add('invert');
        setTimeout(() => {
          root.classList.remove('burst');
          setTimeout(() => root.classList.remove('invert'), 70);
          const w = document.getElementById('g9-wrap');
          if (w) w.style.transform = '';
        }, 190 + Math.random() * 180);
      });

      
      const eye = document.getElementById('g9-eye');
      if (eye) {
        let on = false;
        const jump = () => {
          if (!document.body.contains(root)) return;
          
          eye.classList.remove('on');
          later(160, () => {
            if (!document.body.contains(root)) return;
            eye.style.left = (4 + Math.random() * 84) + '%';
            eye.style.top = (6 + Math.random() * 76) + '%';
            const sc = 0.42 + Math.random() * 0.85;
            const rot = (Math.random() - 0.5) * 18;
            eye.style.transform =
              `translate(-50%,-50%) scale(${sc.toFixed(2)}) rotate(${rot.toFixed(1)}deg)`;
            on = true;
            later(80, () => { if (document.body.contains(root)) eye.classList.add('on'); });
            later(700 + Math.random() * 1500, jump);
          });
        };
        later(500, jump);
      }

      
      const LINE4 = ['散　场', '你 别 走', '还 有 一 个', '她 自 己 不 说',
                     '■■■', '四、你还坐在那儿', '四、她已经上来了'];
      let li4 = 0;
      every(1900, () => {
        if (!document.body.contains(root)) return;
        const li = root.querySelector('.g9-prog li:last-child');
        if (li) li.innerHTML = '<b>四、</b>' + LINE4[li4++ % LINE4.length];
      });

      
      const clown = document.getElementById('g9-clown');
      if (clown) {
        const hop = () => {
          if (!document.body.contains(root)) return;
          clown.style.left = (6 + Math.random() * 78) + '%';
          clown.style.top = (10 + Math.random() * 74) + '%';
          clown.style.right = 'auto';
          later(1200 + Math.random() * 2200, hop);
        };
        later(2600, hop);
      }

      
      every(4600, () => {
        if (!document.body.contains(root)) return;
        if (Math.random() < 0.4) return;           
        const f = document.getElementById('g9-face');
        if (!f) return;
        f.classList.add('on');
        setTimeout(() => f.classList.remove('on'), 260);
      });

      
      every(9000, () => {
        if (!document.body.contains(root)) return;
        root.classList.add('jolt');
        setTimeout(() => root.classList.remove('jolt'), 120);
      });
    }

    
    const WHISPER = [
      [18000, '你还在看。'],
      [45000, '她也看了很久。'],
      [80000, '回家吧。']
    ];
    const wEl = document.getElementById('g9-whisper');
    WHISPER.forEach(([ms, text]) => {
      timers.push(setTimeout(() => {
        if (!document.body.contains(root) || !wEl) return;
        wEl.textContent = text;
        wEl.classList.add('on');
        setTimeout(() => wEl.classList.remove('on'), 5200);
      }, ms));
    });

    
    let n = 0;
    every(1700, () => {
      if (!document.body.contains(root)) return;
      const c = document.getElementById('g9-count');
      if (!c) return;
      n += Math.floor(Math.random() * 9) - 2;    
      if (n < 0) n = 0;
      if (n > 4700) n = 47;                       
      c.textContent = '你是第 ' + String(n).padStart(5, '0') + ' 位访客';
    });
  },

  
  leave() {
    VG.horror.circusTuneStop();
    (VG._g9Timers || []).forEach(t => { clearInterval(t); clearTimeout(t); });
    VG._g9Timers = [];
    document.body.classList.remove('g9-mode');
    const w = document.getElementById('g9-whisper');
    if (w) w.classList.remove('on');
  }
};




function rcIsMystery(R) {
  const B = VG.data.mystery.bands;
  return R && R.b1 === B.b1 && R.b2 === B.b2 && R.b3 === B.b3 && R.b4 === B.b4;
}


VG.horror.sysGlitch = function (ms) {
  const dur = ms || 760;
  const el = document.getElementById('sys-glitch');
  if (!el) return;
  el.classList.add('on');
  document.body.classList.add('sys-glitching');

  
  try {
    VG.audio.init(); VG.audio.resume();
    VG.audio.glitchStutter();
    VG.audio.reverseTone(0.55);
    setTimeout(() => { try { VG.audio.bang(0.5); } catch (e) {} }, 190);
  } catch (e) {}

  
  const shakes = [];
  for (let i = 0; i < 6; i++) {
    shakes.push(setTimeout(() => {
      const shell = document.getElementById('shell');
      if (!shell) return;
      shell.style.transform =
        'translateX(' + ((Math.random() - 0.5) * 22).toFixed(0) + 'px)';
    }, 40 + i * (dur / 8)));
  }
  setTimeout(() => {
    const shell = document.getElementById('shell');
    if (shell) shell.style.transform = '';
  }, dur);
  setTimeout(() => {
    el.classList.remove('on');
    document.body.classList.remove('sys-glitching');
    shakes.forEach(clearTimeout);
  }, dur);
};



VG.horror.badLink = function () {
  const D = (VG.data.secretMail && VG.data.secretMail.badPage) || {};
  const base = D.line || '这个页面上什么都没有。';
  const RED = D.red || '你看了不该看的东西';

  try { VG.audio.init(); VG.audio.resume(); } catch (e) {}

  
  const ov = document.getElementById('overlay');
  if (ov) { ov.classList.add('hidden'); ov.innerHTML = ''; }

  let host = document.getElementById('badlink');
  if (!host) {
    host = document.createElement('div');
    host.id = 'badlink';
    document.body.appendChild(host);
  }
  host.className = 'badlink';
  host.innerHTML = `
    <div class="bl-doc" id="bl-doc">
      <div class="bl-title">${esc(D.title || '')}</div>
      <div class="bl-line" id="bl-line">${esc(base)}</div>
    </div>
    <div class="bl-red" id="bl-red"></div>
    <div class="bl-tear" id="bl-tear"></div>`;

  const timers = [];
  const T = (fn, ms) => timers.push(setTimeout(fn, ms));

  function cleanup() {
    timers.forEach(clearTimeout);
    timers.length = 0;
    if (host) { host.className = 'badlink hidden'; host.innerHTML = ''; }
    document.body.classList.remove('bad-scene');
  }

  document.body.classList.add('bad-scene');
  try { VG.audio.glitchHit(); } catch (e) {}
  
  try { VG.musStopAll(); } catch (e) {}

  
  T(function decay() {
    let amt = 0;
    const step = setInterval(() => {
      amt = Math.min(0.92, amt + 0.075);
      const el = document.getElementById('bl-line');
      if (!el) { clearInterval(step); return; }
      el.textContent = garble(base, amt);
      
      el.style.letterSpacing = (3 + amt * 14).toFixed(1) + 'px';
      if (amt >= 0.92) clearInterval(step);
    }, 120);
    timers.push(step);
    if (host) host.classList.add('decay');
    try { VG.audio.reverseTone(1.1); } catch (e) {}
  }, 1600);

  
  T(function flood() {
    const red = document.getElementById('bl-red');
    if (!red) return;
    let html = '';
    for (let i = 0; i < 13; i++) {
      const off = (Math.random() * 2 - 1) * 4;
      const sc = 0.86 + Math.random() * 0.3;
      const sk = (Math.random() * 2 - 1) * 1.6;
      html += `<div class="bl-rline" style="--off:${off.toFixed(1)}%;`
        + `--sc:${sc.toFixed(2)};--sk:${sk.toFixed(1)}deg;--d:${(i * 0.06).toFixed(2)}s">`
        + esc(RED) + '</div>';
    }
    red.innerHTML = html;
    red.classList.add('on');
    if (host) host.classList.add('flood');
    try {
      VG.audio.glitchTear();
      VG.audio.reverseTone(1.6);
      VG.audio.bang(0.4);
    } catch (e) {}
    
    const wob = setInterval(() => {
      const lines = document.querySelectorAll('.bl-rline');
      if (!lines.length) { clearInterval(wob); return; }
      lines.forEach((el, i) => {
        if (Math.random() < 0.25) el.textContent = garble(RED, 0.12 + Math.random() * 0.12);
        else el.textContent = RED;
      });
    }, 420);
    timers.push(wob);
  }, 4000);

  
  T(function heavy() {
    
    musLoad('glitch', 'assets/glitch-music.mp4', false, 0.62);
    musPlay('glitch');
    if (host) host.classList.add('glitch');
    try {
      VG.audio.glitchDrop();
      VG.audio.reverseTone(0.9);
    } catch (e) {}
    
    const slices = setInterval(() => {
      const t = document.getElementById('bl-tear');
      if (!t) { clearInterval(slices); return; }
      let g = [];
      for (let i = 0; i < 9; i++) {
        const w = 3 + Math.random() * 14;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        g.push(`linear-gradient(90deg, transparent ${x.toFixed(1)}%,`
          + ` rgba(255,0,40,.20) ${x.toFixed(1)}% ${(x + w).toFixed(1)}%,`
          + ` transparent ${(x + w).toFixed(1)}%) ${(Math.random() * 30 - 15).toFixed(0)}px ${y.toFixed(0)}%`
          + ` / 100% 4px no-repeat`);
      }
      t.style.background = g.join(',');
    }, 120);
    timers.push(slices);
  }, 5600);

  
  T(function forceQuit() {
    musStop('glitch');
    cleanup();
    VG.state.deskBroken = true;
    
    if (VG.engine && VG.engine.resetHistory) VG.engine.resetHistory();
    if (VG.engine && VG.engine.render) VG.engine.render('desk');
    try { VG.audio.bang(0.9); } catch (e) {}
    deskBrokenTick();
    
    const flash = document.createElement('div');
    flash.className = 'bad-slam';
    document.body.appendChild(flash);
    setTimeout(() => { if (flash.parentNode) flash.parentNode.removeChild(flash); }, 900);
  }, 8600);
};




VG.sites['news'] = {
  render(s) {
    s = s || VG.state;
    const N = VG.data.news;
    const open = s.newsOpen;
    const F = VG.illus.slot;

    
    if (open) {
      const all = [N.lead].concat(N.posts);
      const a = all.find(x => x.id === open);
      if (a) {
        return `
<div class="lw">
  <div class="lw-mast"><span class="lw-mt">${esc(N.masthead)}</span>
    <span class="lw-py">${esc(N.pinyin)}</span></div>
  <div class="lw-issue">${esc(N.issue)}</div>
  <div class="lw-arc">
    <div class="lw-arc-cat">${esc(a.cat)}</div>
    <h2 class="lw-arc-t">${esc(a.title)}</h2>
    ${a.sub ? `<div class="lw-arc-sub">${esc(a.sub)}</div>` : ''}
    <div class="lw-arc-by">${esc(a.tm)}　·　${esc(a.by || '')}　·　
      <a data-act="news-back">返回目录</a></div>
    ${a.poster ? `<div class="lw-poster">${F('vase_poster', VG.illus.portraitPlaceholder(), 230)}
      <div class="lw-cap">（本团宣传单　张贴于镇集贸市场、柳河桥头等地）</div></div>` : ''}
    <div class="lw-arc-body">
      ${a.body.map(p => `<p>${p.replace(/\*\*(.+?)\*\*/g, '<b>$1</b>')}</p>`).join('')}
    </div>
    <div class="lw-arc-foot">—— 完 ——</div>
  </div>
  ${VG.ads.slot('news-arc', 'news', { w: 440 })}
  <div class="lw-foot">柳河晚报社　·　地址：槐桥镇府前街 12 号　·　电话：×××××××</div>
</div>`;
      }
    }

    const lead = N.lead;
    const posts = N.posts;
    const half = Math.ceil(posts.length / 2);
    const col = (list) => list.map(p => `
      <div class="lw-item" data-dbl="news-open" data-selectable data-nid="${p.id}">
        <a class="lw-item-t" data-act="news-open" data-nid="${p.id}">${esc(p.title)}</a>
        ${p.sub ? `<div class="lw-item-s">${esc(p.sub)}</div>` : ''}
        <div class="lw-item-m">${esc(p.cat)}　${esc(p.tm)}</div>
      </div>`).join('');

    return `
<div class="lw">
  <div class="lw-mast"><span class="lw-mt">${esc(N.masthead)}</span>
    <span class="lw-py">${esc(N.pinyin)}</span></div>
  <div class="lw-issue">${esc(N.issue)}</div>
  <div class="lw-weather">${esc(N.weather)}</div>

  <div class="lw-lead">
    <div class="lw-lead-l">
      <div class="lw-lead-cat">${esc(lead.cat)}</div>
      <h1 class="lw-lead-t"><a data-act="news-open" data-nid="${lead.id}">${esc(lead.title)}</a></h1>
      <div class="lw-lead-sub">${esc(lead.sub)}</div>
      <div class="lw-lead-by">${esc(lead.tm)}　·　${esc(lead.by)}</div>
      <div class="lw-lead-body">
        ${lead.body.slice(1, 4).map(p => `<p>${p.replace(/\*\*(.+?)\*\*/g, '<b>$1</b>')}</p>`).join('')}
        <p class="lw-more"><a data-act="news-open" data-nid="${lead.id}">▸ 阅读全文</a></p>
      </div>
    </div>
    <div class="lw-lead-r">
      ${F('vase_poster', VG.illus.portraitPlaceholder(), 210)}
      <div class="lw-cap">（本团宣传单　张贴于集贸市场、柳河桥头）</div>
    </div>
  </div>

  ${VG.ads.slot('news-mid', 'news', { w: 440 })}

  <div class="lw-sec">本 期 要 目</div>
  <div class="lw-cols">
    <div class="lw-col">${col(posts.slice(0, half))}</div>
    <div class="lw-col">${col(posts.slice(half))}</div>
  </div>

  <div class="lw-sec">简 讯</div>
  <div class="lw-briefs">
    ${N.briefs.map(b => `<div class="lw-br"><span class="lw-br-c">[${esc(b[0])}]</span>${esc(b[1])}</div>`).join('')}
  </div>

  <div class="lw-sec">分 类 广 告</div>
  <div class="lw-ads">
    ${N.ads.map(a => `<div class="lw-ad"><span class="lw-ad-t">${esc(a[0])}</span>${esc(a[1])}</div>`).join('')}
  </div>

  <div class="lw-foot">柳河晚报社　·　地址：槐桥镇府前街 12 号　·　电话：×××××××<br>
    本报为周报，每周一出刊。电子版由新纪元网吧代为制作。</div>
</div>`;
  }
};

VG.actions['news-open'] = (el) => {
  const id = el && el.getAttribute('data-nid');
  if (!id) return;
  VG.state.newsOpen = id;
  VG.audio.click();
  VG.engine.replace('news');
};
VG.actions['news-back'] = () => {
  VG.state.newsOpen = null;
  VG.audio.click();
  VG.engine.replace('news');
};


VG.sites['class98'] = {
  render(s) {
    s = s || VG.state;
    const C = VG.data.class98;
    return `
<div class="c98">
  <div class="c98-marq"><span>${esc(C.marquee)}</span></div>

  <div class="c98-head">
    <div class="c98-title">${esc(C.name)}</div>
    <div class="c98-sub">${esc(C.sub)}</div>
    <div class="c98-slogan">${esc(C.slogan)}</div>
  </div>

  <div class="c98-tbl">
    <div class="c98-h">★ 同 学 名 录 ★</div>
    <div class="c98-tip">（按座位排的，不是按成绩）</div>
    <table class="c98-roster">
      <tr><th>座号</th><th>姓名</th><th>近况</th><th>想说的话</th></tr>
      ${C.roster.map(r => `
        <tr${r[2] === '——' ? ' class="gone"' : ''}>
          <td class="n">${esc(r[0])}</td>
          <td class="nm">${esc(r[1])}</td>
          <td class="st">${esc(r[2])}</td>
          <td class="wl">${esc(r[3] || '')}</td>
        </tr>`).join('')}
    </table>
  </div>

  ${VG.ads.slot('c98-mid', 'class98', { w: 400 })}

  <div class="c98-tbl">
    <div class="c98-h">★ 全 班 合 影 ★</div>
    <div class="c98-pic">
      ${VG.illus.slot('class_photo', VG.illus.portraitPlaceholder(), 620)}
    </div>
    <div class="c98-cap">2000 年 6 月 · 毕业前一个月 · 操场东边那排杨树底下</div>
    <div class="c98-cap2">（当天来了三十一个人，有九个没来。）</div>
  </div>

  <div class="c98-tbl">
    <div class="c98-h">★ 任 课 老 师 ★</div>
    <table class="c98-teacher">
      ${C.teacher.map(t => `<tr><td class="s">${esc(t[0])}</td><td class="nm">${esc(t[1])}</td><td>${esc(t[2])}</td></tr>`).join('')}
    </table>
  </div>

  <div class="c98-tbl">
    <div class="c98-h">★ 班 级 日 志 ★</div>
    ${C.logs.map(l => `
      <div class="c98-log">
        <div class="c98-log-h"><span class="d">${esc(l.d)}</span>${esc(l.t)}</div>
        <div class="c98-log-b">${esc(l.b).split('\n').map(x => x ? `<p>${x}</p>` : '<p>&nbsp;</p>').join('')}</div>
      </div>`).join('')}
  </div>

  <div class="c98-tbl">
    <div class="c98-h">★ 留 言 本 ★</div>
    <div class="c98-guest">
      ${C.guest.map(g => `
        <div class="c98-g">
          <span class="w">${esc(g.who)}</span>
          <span class="t">${esc(g.tm)}</span>
          <div class="b">${esc(g.t).split('\n').map(x => x ? `<p>${x}</p>` : '').join('')}</div>
        </div>`).join('')}
    </div>
    <div class="c98-notice">（留言功能已关闭。本页自 2000 年 6 月起未再更新。）</div>
  </div>

  <div class="c98-foot">
    <div class="c98-hit">您是第 <b>${esc(C.hit)}</b> 位访问本站的同学</div>
    <div class="c98-since">${esc(C.since)}</div>
    <div class="c98-cr">本页由 98 级 3 班 班长 制作 · 感谢 新纪元网吧 提供空间</div>
    <div class="c98-b88">
      <span class="b">槐桥信息港</span><span class="b">新纪元网吧</span>
      <span class="b">柳河二中</span><span class="b">小雨的家</span>
    </div>
  </div>
</div>`;
  }
};


VG.sites['newlife'] = {
  render(s) {
    s = s || VG.state;
    const N = VG.data.newlife;
    const P = (t) => esc(t).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>');

    
    const paras = (ps) => ps.map(t => t === '' ? '<div class="nl-gap"></div>'
      : `<p>${P(t)}</p>`).join('');

    const secs = N.secs.map((sec, i) => {
      let inner = '';
      if (sec.ps) inner = paras(sec.ps);
      
      if (sec.founder) {
        inner = `<div class="nl-founder">
            ${VG.illus.slot('guo_shiping', VG.illus.portraitPlaceholder(), 260)}
            <div class="nl-fcap">郭世萍　·　摄于四十岁生日</div>
          </div>` + inner;
      }
      if (sec.qa) inner = sec.qa.map(q =>
        `<div class="nl-qa"><div class="nl-q">${esc(q[0])}</div>
         <div class="nl-a">${P(q[1])}</div></div>`).join('');
      if (sec.wit) inner = sec.wit.map(w =>
        `<div class="nl-wit"><div class="nl-who">${esc(w[0])}</div>
         <div class="nl-what">${esc(w[1])}</div></div>`).join('');
      return `<section class="nl-sec" id="nl-s${i}">
        <h2>${esc(sec.h)}</h2>${inner}</section>`;
    }).join('');

    
    const R = N.reg;
    let panel = '';
    if (s.nlPanel === 'reg') {
      panel = `<div class="nl-panel" id="nl-panel">
        <h3>${esc(R.title)}</h3>
        <div class="nl-phd">${esc(R.hd)}</div>
        <div class="nl-ptip">${esc(R.tip)}</div>
        <div class="nl-prow"><label>${esc(R.name)}</label>
          <input id="nl-name" type="text" autocomplete="off"></div>
        <div class="nl-prow"><label>${esc(R.pass)}</label>
          <input id="nl-pass" type="password" autocomplete="off"></div>
        <div class="nl-pmsg" id="nl-pmsg"></div>
        <button class="nl-pbtn" data-act="nl-submit">${esc(R.btn)}</button>
        <button class="nl-pcancel" data-act="nl-close">\u5173\u95ed</button>
      </div>`;
    } else if (s.nlPanel === 'done') {
      panel = `<div class="nl-panel nl-done" id="nl-panel">
        <div class="nl-dok">${esc(R.ok)}</div>
        <div class="nl-dsub">${esc(R.okSub)}</div>
        <div class="nl-dname">${esc(s.nlName || '')}</div>
        <div class="nl-dnote">${esc(R.okNote)}</div>
        <button class="nl-pcancel" data-act="nl-close">\u5173\u95ed</button>
      </div>`;
    }

    return `
<div class="nl">
  <div class="nl-sky"><div class="nl-sun"></div>
    <div class="nl-cloud c1"></div><div class="nl-cloud c2"></div>
    <div class="nl-cloud c3"></div></div>

  <header class="nl-top">
    <div class="nl-brand"><span class="nl-b1">${esc(N.brand)}</span>
      <span class="nl-b2">${esc(N.brandEn)}</span></div>
    <nav class="nl-nav">${N.nav.map(n => `<a>${esc(n)}</a>`).join('')}</nav>
    <button class="nl-reg" data-act="nl-reg">\u6ce8\u518c\u8d26\u53f7</button>
  </header>

  <div class="nl-hero">
    <h1>${esc(N.hero.h)}</h1>
    <p>${esc(N.hero.s)}</p>
    <div class="nl-slogan">${esc(N.slogan)}</div>
  </div>

  <div class="nl-body">${secs}</div>

  <footer class="nl-foot">
    ${N.foot.map((f, i) => `<div${i === 2 ? ' class="nl-f3"' : ''}>${esc(f)}</div>`).join('')}
  </footer>

  ${panel}
</div>`;
  }
};

VG.actions['nl-reg'] = () => {
  VG.audio.click();
  VG.state.nlPanel = 'reg';
  VG.state.nlName = null;
  VG.engine.replace('newlife');
  setTimeout(() => { const i = document.getElementById('nl-name');
    if (i) { try { i.focus(); } catch (e) {} } }, 120);
};
VG.actions['nl-close'] = () => {
  VG.audio.click();
  VG.state.nlPanel = null;
  VG.engine.replace('newlife');
};

VG.actions['nl-submit'] = () => {
  const N = VG.data.newlife, R = N.reg;
  const ni = document.getElementById('nl-name');
  const pi = document.getElementById('nl-pass');
  const m = document.getElementById('nl-pmsg');
  const nm = (ni && ni.value || '').trim();
  const pw = (pi && pi.value || '').trim();
  VG.audio.click();
  if (!nm || !pw) {
    if (m) { m.textContent = R.need; m.className = 'nl-pmsg bad'; }
    return;
  }
  const hit = N.taken.some(t => t.replace(/\s/g, '') === nm.replace(/\s/g, ''));
  if (hit) {
    if (m) { m.innerHTML = esc(R.taken) + '<br><span class="nl-t2">' + esc(R.taken2) + '</span>';
             m.className = 'nl-pmsg bad'; }
    try { VG.audio.staticNoise(0.16); } catch (e) {}
    return;
  }
  VG.state.nlName = nm;
  VG.state.nlPass = pw;          
  VG.state.nlPanel = 'done';
  VG.state.nlRegistered = true;
  VG.save();
  try { VG.audio.chime(); } catch (e) {}
  VG.engine.replace('newlife');
};



function hiddenDl(s) {
  
  if (!s || !s.seeDone) return '';
  return `<span class="gd-hidden" data-act="gd-crack"
     title="下载">▪ 下载</span>`;
}

VG.sites['see'] = {
  render(s) {
    s = s || VG.state;
    const G = VG.data.goddess;
    const step = s.seeStep || 0;          
    const all = G.q1.concat(G.q2);

    
    if (step >= 22) {
      return `
<div class="gd gd-join">
  ${VG.illus.festoon(18)}
  <div class="gd-join-t">${esc(G.join)}</div>
  <div class="gd-join-s">${esc(G.marquee)}</div>
  ${VG.illus.sparkles(26, 7)}

  <button class="gd-go gd-back" data-act="gd-home">${esc(G.back)}</button>
  ${hiddenDl(s)}
</div>`;
    }

    
    if (step === 21) {
      return `
<div class="gd">
  ${VG.illus.festoon(18)}
  <div class="gd-ask gd-ask-last">
    <div class="gd-ask-n">二 十 题 都 答 完 了</div>
    <div class="gd-ask-q">她一直在听。</div>
    <button class="gd-go" data-act="gd-next">${esc(G.submit)}</button>
  </div>
  ${VG.illus.sparkles(18, 3)}
</div>`;
    }

    
    if (step >= 1) {
      const i = step - 1;
      const dark = i >= 10;
      return `
<div class="gd${dark ? ' gd-dark' : ''}">
  ${VG.illus.festoon(18)}
  <div class="gd-ask">
    <div class="gd-ask-n">第 ${step} 题 / 共 20 题</div>
    <div class="gd-ask-q">${esc(all[i])}</div>
    <textarea class="gd-input" id="gd-input" rows="3"
      placeholder="${esc(G.placeholder)}"></textarea>
    <button class="gd-go" data-act="gd-next">${esc(step === 20 ? G.last : G.next)}</button>
    <div class="gd-dots">${all.map((_, k) =>
      `<i class="${k < step - 1 ? 'done' : (k === step - 1 ? 'now' : '')}"></i>`).join('')}</div>
  </div>
  ${VG.illus.sparkles(18, 3)}
</div>`;
    }

    
    return `
<div class="gd">
  ${VG.illus.festoon(18)}
  <div class="gd-title">${esc(G.title)}</div>
  <div class="gd-sub">${esc(G.sub)}</div>

  <div class="gd-stage">
    <div class="gd-frame">
      ${VG.illus.slot('goddess', VG.illus.portraitPlaceholder(), 300)}
    </div>
    <div class="gd-glow"></div>
  </div>

  <div class="gd-intro">${G.intro.map(l => l ? `<p>${esc(l)}</p>` : '<p>&nbsp;</p>').join('')}</div>
  <button class="gd-go" data-act="gd-start">${esc(s.seeDone ? G.again : G.btn)}</button>
  <div class="gd-marquee"><span>${esc(G.marquee)}</span></div>
  ${VG.illus.sparkles(22, 5)}
  ${  ''}
  ${hiddenDl(s)}
</div>`;
  },
  after(s) {
    const ta = document.getElementById('gd-input');
    if (ta) { try { ta.focus(); } catch (e) {} }
    
    musLoad('goddess', 'assets/goddess-music.mp4', true, 0.5);
    musPlay('goddess');
  },
  
  leave() { musStop('goddess'); }
};




VG.data.reborn = {
  name: '新生', ext: 'htm',
  title: '新 生',
  thanks: '感谢您的游玩',
  version: '本次 0.2 版本 Demo',
  end: '本次体验结束',
  again: '重 新 游 玩',
  tip: '☆ 故事还没讲完。',
  line: '瓶子是空的。'
};

VG.data.crack = {
  name: '迷宫破译器', ext: 'exe',
  size: '86 KB', from: '（来源不明）',
  title: '迷 宫 破 译 器',
  only: '鼠标迷宫',
  btn: '破 译',
  none: '无可破解的软件',
  ok: '已破译',
  done: '已经把「鼠标迷宫」破解了。'
};

VG.actions['gd-crack'] = () => {
  VG.audio.click();
  showDownloadDialog(VG.data.crack, () => {
    VG.state.crackOnDesk = true;
    VG.save();
    VG.ui.toast('文件已保存到「桌面」。', 3000);
  });
};



VG.data.rebornWorld = {
  head: '\u6b22 \u8fce \u60a8 \u52a0 \u5165 \u65b0 \u751f \u4e16 \u754c',
  sub: 'WELCOME TO THE NEW BIRTH',
  note: '\u8bf7\u586b\u5199\u60a8\u7684\u8eab\u4efd',
  
  user: '\u771f\u5b9e\u59d3\u540d',
  pass: '\u5bc6 \u7801',
  btn: '\u767b \u5f55',
  userPh: '',
  passPh: '',
  tip: '\u53ea\u6709\u5728\u5b98\u7f51\u6ce8\u518c\u8fc7\u7684\u4eba\u80fd\u767b\u8fdb\u6765\u3002',
  
  ok: '\u6b22\u8fce\u60a8\u3002',
  bad: '\u8d26\u53f7\u6216\u5bc6\u7801\u4e0d\u6b63\u786e\u3002',
  need: '\u8bf7\u628a\u4e24\u680f\u90fd\u586b\u4e0a\u3002',
  noname: '\u8fd9\u4e2a\u540d\u5b57\u4e0d\u5728\u540d\u518c\u4e0a\u3002',
  noname2: '\uff08\u8bf7\u5148\u5230\u5b98\u7f51\u6ce8\u518c\u3002\uff09'
};

VG.actions['reborn-open'] = () => {
  VG.audio.click();
  const R = VG.data.rebornWorld;
  let host = document.getElementById('rb-app');
  if (!host) {
    host = document.createElement('div');
    host.id = 'rb-app';
    document.body.appendChild(host);
  }
  
  
  
  
  const D = (n, cls, rot) =>
    `<img class="rba-d ${cls}" style="--rot:${rot || 0}deg" src="${n}" alt="">`;
  host.className = 'rb-app';
  host.innerHTML = `
    <div class="rba-deco">
      ${D('assets/ui/nb-buddha.png', 'd1', -3)}${D('assets/ui/nb-hand.png', 'd2', 4)}
      ${D('assets/ui/nb-shrine.png', 'd3', 2)}${D('assets/ui/nb-mask.png', 'd4', -4)}
      ${D('assets/ui/nb-window.png', 'd5', 3)}${D('assets/ui/nb-dialog.png', 'd6', -2)}
      ${D('assets/ui/nb-temple.png', 'd7', 3)}${D('assets/ui/nb-disc.png', 'd8', -6)}
      ${D('assets/ui/nb-tv.png', 'd9', -4)}${D('assets/ui/nb-tape.png', 'd10', 5)}
      ${D('assets/ui/nb-lotus.png', 'd11', -3)}${D('assets/ui/nb-panel.png', 'd12', 2)}
      ${D('assets/ui/nb-dvd.png', 'd13', -3)}${D('assets/ui/nb-fly.png', 'd14', 4)}
      ${D('assets/ui/nb-eye.png', 'd15', -2)}${D('assets/ui/nb-eye.png', 'd16', 3)}
      ${D('assets/ui/deco-star.png', 's1')}${D('assets/ui/deco-star.png', 's2')}
      ${D('assets/ui/deco-star.png', 's3')}${D('assets/ui/deco-star.png', 's4')}
      ${D('assets/ui/deco-star.png', 's5')}${D('assets/ui/deco-star.png', 's6')}
    </div>
    <!-- ★ 退出键。没有它这个页面就出不去了。 -->
    <button class="rba-exit" data-act="reborn-exit" title="退出">
      <span class="rba-exit-x">×</span><span class="rba-exit-t">退出</span>
    </button>
    <div class="rba-tear rba-tear-a"></div>
    <div class="rba-tear rba-tear-b"></div>
    <div class="rba-scan"></div>
    <div class="rba-core">
      <h1 class="rba-head">${esc(R.head)}</h1>
      <div class="rba-sub">${esc(R.sub)}</div>
      <div class="rba-box">
        <div class="rba-row">
          <label>${esc(R.user)}</label>
          <input id="rba-user" type="text" autocomplete="off" spellcheck="false">
        </div>
        <div class="rba-row">
          <label>${esc(R.pass)}</label>
          <input id="rba-pass" type="password" autocomplete="off">
        </div>
        <div class="rba-msg" id="rba-msg">${esc(R.note)}</div>
        <button class="rba-btn" data-act="reborn-login">${esc(R.btn)}</button>
        <div class="rba-tip">${esc(R.tip)}</div>
      </div>
    </div>`;
  try { VG.musStopAll(); } catch (e) {}
  try { VG.audio.chime(); } catch (e) {}
  const u = document.getElementById('rba-user');
  if (u) setTimeout(() => { try { u.focus(); } catch (e) {} }, 200);
};


VG.actions['reborn-exit'] = () => {
  VG.audio.click();
  const h = document.getElementById('rb-app');
  if (h) { h.className = 'rb-app hidden'; h.innerHTML = ''; }
  VG.engine.render('desk');
};


VG.actions['reborn-login'] = () => {
  const R = VG.data.rebornWorld;
  const u = document.getElementById('rba-user');
  const p = document.getElementById('rba-pass');
  const m = document.getElementById('rba-msg');
  const nm = (u && u.value || '').trim();
  const pw = (p && p.value || '').trim();
  VG.audio.click();
  
  if (!nm || !pw) {
    if (m) { m.textContent = R.need; m.className = 'rba-msg bad'; }
    return;
  }
  if (!VG.state.nlRegistered) {
    if (m) { m.innerHTML = esc(R.noname) + '<br><span class="nl-t2">' + esc(R.noname2) + '</span>';
             m.className = 'rba-msg bad'; }
    try { VG.audio.glitchHit(); } catch (e) { try { VG.audio.staticNoise(0.14); } catch (e2) {} }
    return;
  }
  const same = (a, b) => String(a || '').replace(/\s/g, '') === String(b || '').replace(/\s/g, '');
  if (!same(nm, VG.state.nlName) || !same(pw, VG.state.nlPass)) {
    if (m) { m.textContent = R.bad; m.className = 'rba-msg bad'; }
    try { VG.audio.glitchHit(); } catch (e) {}
    return;
  }
  VG.state.rebornUser = nm;
  VG.state.rebornDone = true;
  VG.save();
  if (m) { m.textContent = R.ok; m.className = 'rba-msg ok'; }
  try { VG.horror.sysGlitch(360); } catch (e) {}
  
  setTimeout(() => {
    const h = document.getElementById('rb-app');
    if (h) { h.className = 'rb-app hidden'; h.innerHTML = ''; }
    VG.actions['reborn-open-end']();
  }, 1500);
};


VG.actions['reborn-open-end'] = () => {
  const R = VG.data.reborn;
  let host = document.getElementById('rb-end');
  if (!host) {
    host = document.createElement('div');
    host.id = 'rb-end';
    document.body.appendChild(host);
  }
  host.className = 'rb-end';
  host.innerHTML = `
    <div class="rb-card">
      <div class="rb-vase">${VG.illus.deskIcon('reborn')}</div>
      <div class="rb-t1">${esc(R.thanks)}</div>
      <div class="rb-t2">${esc(R.version)}</div>
      <div class="rb-rule"></div>
      <div class="rb-t3">${esc(R.end)}</div>
      <button class="rb-again" data-act="rb-again">${esc(R.again)}</button>
      <div class="rb-tip">${esc(R.tip)}</div>
    </div>`;
};


VG.actions['rb-again'] = () => {
  VG.audio.click();
  try { localStorage.removeItem('vase-girl-save'); } catch (e) {}
  try { VG.musStopAll(); } catch (e) {}
  location.reload();
};


const MUS = { goddess: null, glitch: null };

function musLoad(which, src, loop, vol) {
  if (MUS[which]) return MUS[which];
  try {
    const a = new Audio(src);
    a.preload = 'auto';
    a.loop = !!loop;
    a.volume = vol == null ? 0.5 : vol;
    MUS[which] = a;
    a.load();
  } catch (e) { MUS[which] = null; }
  return MUS[which];
}
function musStop(which) {
  const a = MUS[which];
  if (a) { try { a.pause(); a.currentTime = 0; } catch (e) {} }
}
function musPlay(which) {
  const a = MUS[which];
  if (!a) return;
  try {
    a.volume = 0.5;
    const p = a.play();
    if (p && p.catch) p.catch(() => {});   
  } catch (e) {}
}
VG.musStopAll = () => { musStop('goddess'); musStop('glitch'); };

VG.actions['crack-open'] = () => {
  VG.audio.click();
  const C = VG.data.crack;
  const has = !!VG.state.mazeOnDesk;
  const body = has
    ? (VG.state.mazeCracked
        ? `<div class="ck-none ok">${esc(C.done)}</div>`
        : `<div class="ck-list">
             <label class="ck-row">
               <input type="radio" name="ck" checked>
               <span>${esc(C.only)}</span>
             </label>
           </div>
           <div class="ck-tip">※ 只能破译这一个。其余的破不了。</div>`)
    : `<div class="ck-none">${esc(C.none)}</div>
       <div class="ck-tip">※ 桌面上没有可以破译的东西。</div>`;
  VG.ui.dialog({
    title: C.title,
    width: 360,
    body,
    buttons: has && !VG.state.mazeCracked ? [C.btn, '关闭'] : ['关闭'],
    onButton: (i) => {
      if (i !== 0 || !has || VG.state.mazeCracked) return;
      VG.state.mazeCracked = true;
      VG.save();
      try { VG.audio.chime(); } catch (e) {}
      VG.horror.sysGlitch(520);
      setTimeout(() => VG.ui.toast('已破译：鼠标迷宫', 2600), 300);
    }
  });
};


VG.actions['gd-start'] = () => {
  VG.audio.click();
  VG.state.seeStep = 1;   
  VG.engine.replace('see');
};

VG.actions['gd-home'] = () => {
  VG.audio.click();
  VG.state.seeStep = 0;
  VG.engine.replace('see');
};
VG.actions['gd-next'] = () => {
  VG.audio.click();
  const step = VG.state.seeStep || 0;
  
  VG.state.seeStep = step + 1;
  if (VG.state.seeStep >= 22) {
    
    VG.state.seeDone = true;
    VG.state.seeStep = 22;
    try { VG.audio.bang(0.5); } catch (e) {}
  }
  VG.engine.replace('see');
};


VG.actions['sm-open'] = (el) => {
  const id = el && el.getAttribute('data-mid');
  if (!id) return;
  VG.state.smOpen = id;
  if (!VG.state.smRead) VG.state.smRead = {};
  VG.state.smRead[id] = true;
  VG.audio.click();
  VG.engine.replace('mailbox');
};
VG.actions['sm-back'] = () => {
  VG.state.smOpen = null;
  VG.audio.click();
  VG.engine.replace('mailbox');
};
VG.actions['sm-badlink'] = () => {
  VG.audio.click();
  VG.state.smOpen = null;
  
  if (VG.state.seenBadLink) {
    if (!VG.state.seeStep) VG.state.seeStep = 0;
    VG.engine.navigate('see');
    return;
  }
  VG.state.seenBadLink = true;
  VG.horror.badLink();
};


VG.actions['desk-dead'] = () => {
  try { VG.audio.errorDing(); } catch (e) {}
};


VG.actions['desk-reboot'] = () => {
  const d = document.getElementById('desk-crash');
  if (d && d.parentNode) d.parentNode.removeChild(d);
  clearTimeout(deskBrokenTimer);
  deskBrokenTimer = 0;
  VG.state.deskBroken = false;
  VG.save();
  const host = document.getElementById('badlink');
  if (host) { host.className = 'badlink hidden'; host.innerHTML = ''; }
  document.body.classList.remove('bad-scene');
  VG.horror.sysGlitch(900);
  setTimeout(() => {
    if (VG.engine && VG.engine.render) VG.engine.render('desk');
  }, 500);
};


function showDownloadDialog(file, onDone) {
  
  const M = file || VG.data.mystery;
  const ov = document.getElementById('overlay');
  
  const sizeKB = (function () {
    const t = String(M.size == null ? '' : M.size);
    const v = parseFloat(t);
    if (!isFinite(v) || v <= 0) return 1940;
    return /KB/i.test(t) ? Math.round(v) : Math.round(v * 1024);
  })();
  const fmtKB = (kb) => kb >= 1024
    ? (kb / 1024).toFixed(2) + ' MB'
    : Math.round(kb) + ' KB';
  let pct = 0, last = Date.now(), stalled = false, t0 = Date.now(), stallMs = 0;

  ov.innerHTML = `
    <div class="dl-dlg">
      <div class="dl-title">
        <span>文件下载</span>
        <button class="tb-btn close" data-dlg-close>×</button>
      </div>
      <div class="dl-body">
        <div class="dl-file">
          <span class="dl-ico">${VG.illus.videoFileIcon()}</span>
          <span class="dl-name">${esc(M.name)}.${esc(M.ext)}</span>
        </div>
        <div class="dl-from">来自：${esc(M.from)}</div>

        <div class="dl-bar-wrap">
          <div class="dl-bar" id="dl-bar"></div>
          <div class="dl-pct" id="dl-pct">0%</div>
        </div>

        <div class="dl-stats">
          <span id="dl-got">已下载 0.00 MB / ${esc(M.size)}</span>
          <span id="dl-eta">剩余时间：计算中…</span>
        </div>

        <div class="dl-note" id="dl-note"></div>
      </div>
      <div class="dl-btns">
        <button class="btn98" id="dl-cancel">取 消</button>
      </div>
    </div>`;
  
  ov.classList.remove('hidden');

  const bar = document.getElementById('dl-bar');
  const pctEl = document.getElementById('dl-pct');
  const gotEl = document.getElementById('dl-got');
  const etaEl = document.getElementById('dl-eta');
  const noteEl = document.getElementById('dl-note');

  const stopped = { v: false };
  ov.onclick = (e) => {
    if (e.target === ov || e.target.hasAttribute('data-dlg-close')) {
      stopped.v = true;
      ov.classList.add('hidden'); ov.innerHTML = '';
    }
  };
  const cancel = document.getElementById('dl-cancel');
  if (cancel) cancel.onclick = () => {
    stopped.v = true;
    VG.audio.click();
    ov.classList.add('hidden'); ov.innerHTML = '';
    VG.ui.toast('下载已取消。', 2000);
  };

  function tick() {
    if (stopped.v) return;
    const now = Date.now();
    const dt = (now - last) / 1000; last = now;

    
    if (stalled) {
      stallMs += dt * 1000;
      if (Math.random() < 0.35) {
        stalled = false;
        noteEl.textContent = '';
      }
    } else {
      pct += dt * (14 + Math.random() * 26);
      if (Math.random() < 0.06) {
        stalled = true;
        noteEl.textContent = '正在等待服务器响应…';
      }
    }
    if (pct > 100) pct = 100;

    if (bar) bar.style.width = pct.toFixed(1) + '%';
    if (pctEl) pctEl.textContent = Math.floor(pct) + '%';
    if (gotEl) {
      gotEl.textContent = '已下载 ' + fmtKB(sizeKB * pct / 100)
        + ' / ' + fmtKB(sizeKB);
    }
    
    if (etaEl) {
      if (pct >= 100) {
        etaEl.textContent = '剩余时间：0 秒';
      } else {
        const used = (Date.now() - t0 - stallMs) / 1000;
        const speed = (pct > 1 && used > 0.3) ? pct / used : 18;
        etaEl.textContent = '剩余时间：约 '
          + Math.max(1, Math.ceil((100 - pct) / speed)) + ' 秒';
      }
    }

    if (pct >= 100) {
      if (noteEl) noteEl.textContent = '下载完成。';
      VG.audio.chime();
      setTimeout(() => {
        if (stopped.v) return;
        ov.classList.add('hidden'); ov.innerHTML = '';
        stopped.v = true;
        if (onDone) onDone();
      }, 700);
      return;
    }
    setTimeout(tick, 120 + Math.random() * 90);
  }
  setTimeout(tick, 260);
}


function runMysteryDownload() {
  const M = VG.data.mystery;
  VG.state.mysteryDone = true;
  VG.save();

  VG.horror.sysGlitch(820);

  
  setTimeout(() => {
    VG.ui.toast('浏览器正在从 ' + M.from + ' 下载文件…', 2600);
  }, 900);
  setTimeout(() => {
    showDownloadDialog(VG.data.mystery, () => {
      VG.state.mysteryOnDesk = true;
      VG.save();
      VG.horror.flash(0.35);
      VG.ui.toast('文件已保存到「桌面」。', 3000);
      
      if (VG.engine.currentRoute() === 'desk') VG.engine.replace('desk');
    });
  }, 1500);
}


function showVideoPlayer() {
  const M = VG.data.mystery;
  const ov = document.getElementById('overlay');
  ov.innerHTML = `
    <div class="vp-win">
      <div class="dl-title">
        <span>${esc(M.name)}.${esc(M.ext)} — Windows Media Player</span>
        <button class="tb-btn close" data-dlg-close>×</button>
      </div>
      <div class="vp-stage" id="vp-stage">
        <video class="vp-video" id="vp-video" src="${M.src}"
               controls playsinline preload="auto"></video>
        <div class="vp-broken" id="vp-broken">
          <div class="vp-broken-t">无法播放此文件</div>
          <div class="vp-broken-s">
            文件可能已损坏，或者播放器不支持该格式。<br>
            错误代码：0xC00D11B1
          </div>
        </div>
      </div>
      <div class="vp-bar">
        <span class="vp-name">${esc(M.name)}.${esc(M.ext)}</span>
        <span class="vp-meta">${esc(M.size)}　·　${esc(M.from)}</span>
      </div>
    </div>`;
  ov.classList.remove('hidden');

  ov.onclick = (e) => {
    if (e.target === ov || e.target.hasAttribute('data-dlg-close')) {
      const v = document.getElementById('vp-video');
      if (v) { try { v.pause(); } catch (err) {} }
      ov.classList.add('hidden'); ov.innerHTML = '';
    }
  };

  
  const v = document.getElementById('vp-video');
  const broken = document.getElementById('vp-broken');
  if (v) {
    const fail = () => {
      if (broken) broken.classList.add('on');
      try { v.style.display = 'none'; } catch (e) {}
    };
    v.addEventListener('error', fail);
    
    setTimeout(() => {
      if (v.readyState === 0 && v.networkState === 3) fail();
    }, 1600);
    
    const p = v.play();
    if (p && p.catch) p.catch(() => {});
  }
}


VG.actions['mystery-open'] = () => {
  VG.audio.click();
  showVideoPlayer();
};


VG.sites['guo999-admin'] = {
  render(s) {
    const A = VG.data.guoAdmin;
    const tour = A.tour.map(([d, p, st]) =>
      `<tr><td class="t">${d}</td><td>${p}</td><td>${st}</td></tr>`).join('');
    const roster = A.roster.map(([n, name, role, since]) =>
      `<tr><td class="n">${n}</td><td>${name}</td><td>${role}</td>
           <td class="t">${since}</td></tr>`).join('');

    return `
<div class="ga">
  <div class="ga-top">
    <div class="ga-logo">${VG.illus.siteMark('tent')}郭记大篷车　·　管理后台</div>
    <div class="ga-user">管理员：${esc(A.user)}
      <a data-act="ga-logout">［ 退出 ］</a></div>
  </div>
  <div class="ga-nav">
    <a class="on" data-act="toast" data-msg="你已经在总览了。">总　览</a>
    <a data-act="toast" data-msg="排期表只能改日期，改不了地点。">演出排期</a>
    <a data-act="toast" data-msg="名单是班主自己录的，只有他能改。">演员名单</a>
    <a data-act="toast" data-msg="账目 1999 年 8 月之后就没有了。">财　务</a>
    <a data-act="toast" data-msg="留言板是空的。">留　言</a>
  </div>

  <div class="ga-body">
    <div class="ga-cards">
      <div class="ga-card"><div class="k">总访问量</div><div class="v">47</div></div>
      <div class="ga-card"><div class="k">待处理留言</div><div class="v">0</div></div>
      <div class="ga-card"><div class="k">在册人员</div><div class="v">7</div></div>
      <div class="ga-card"><div class="k">最后登录</div>
        <div class="v sm">1999-08-14</div></div>
    </div>

    <div class="ga-box">
      <h3>演 出 排 期</h3>
      <table class="ga-table">
        <tr><th style="width:120px">日期</th><th>地点</th><th style="width:90px">结算</th></tr>
        ${tour}
      </table>
    </div>

    <div class="ga-box">
      <h3>演 员 名 单</h3>
      <table class="ga-table">
        <tr><th style="width:36px">#</th><th style="width:110px">姓名</th>
            <th>职务</th><th style="width:100px">入伙</th></tr>
        ${roster}
      </table>
      <div class="ga-note">
        ※ 第 6、7 条的"入伙"日期是空的 —— 有人手动清过。
      </div>
    </div>

    <div class="ga-box">
      <h3>系 统 日 志</h3>
      <div class="ga-log">
        <div><span class="t">1999-08-14 21:47</span>　本页最后一次被写入</div>
        <div><span class="t">1999-08-15 00:11</span>　（无记录）</div>
        <div><span class="t">——</span>　之后二十二年，没有登录记录</div>
      </div>
    </div>

    <div class="ga-warn">
      这个后台没有对外公开过。你是从哪儿进来的？
    </div>
  </div>
</div>`;
  },
  after() {
    document.body.classList.add('g9-mode');
  },
  leave() {
    document.body.classList.remove('g9-mode');
  }
};




VG.ads = (function () {
  
  function poolFor(route) {
    const all = VG.data.ads || [];
    const isGame = (route === 'games' || route === 'bird');
    const p = all.filter(a => (a.kind === 'game') === isGame);
    return p.length ? p : all;
  }

  
  function flashOn() { return VG.state.adFlash !== false; }

  
  function stopFlash() {
    VG.state.adFlash = false;
    VG.save();
    document.querySelectorAll('.adslot.flash').forEach(el => el.classList.remove('flash'));
    document.querySelectorAll('.adslot-off').forEach(el => { el.textContent = '（已关闭闪烁）'; });
    VG.ui.toast('已关闭广告闪烁动画。', 2400);
  }

  
  function slot(where, route, o) {
    o = o || {};
    const list = poolFor(route || VG.engine.currentRoute());
    if (!list.length) return '';
    
    const seed = (where || '').split('').reduce((a, c) => a + c.charCodeAt(0), 0);
    const ad = list[seed % list.length];
    const w = o.w || 220;
    const on = flashOn();
    return `
<div class="adslot${o.flash && on ? ' flash' : ''}" data-ad="${esc(ad.id)}" style="width:${w}px">
  <div class="adslot-hd"><span>广　告</span>
    ${o.flash ? `<a class="adslot-off" data-act="ad-flash-off">${on ? '关闭闪烁' : '（已关闭闪烁）'}</a>` : ''}
  </div>
  <div class="adslot-box">
    <img src="${ad.img}" alt="" data-act="ad-click" title="${esc(ad.title)}">
  </div>
  <div class="adslot-t">${esc(ad.title)}</div>
</div>`;
  }

  return { slot, stopFlash, flashOn, poolFor, pick: null };
})();



VG.actions['ad-click'] = () => {
  VG.audio.errorDing();
  VG.ui.toast('该链接已失效。', 1800);
};
VG.actions['ad-flash-off'] = () => {
  VG.audio.click();
  VG.ads.stopFlash();
};

VG.actions['tab-go'] = (el) => {
  const i = parseInt(el.getAttribute('data-i'), 10);
  if (isNaN(i) || i === VG.state.tabIdx) return;
  VG.audio.click();
  VG.engine.switchTab(i);
};
VG.actions['tab-close'] = (el) => {
  VG.audio.click();
  const i = parseInt(el.getAttribute('data-i'), 10);
  if (isNaN(i)) return;
  VG.engine.closeTab(i);
  VG.engine.renderTabs();
};


VG.actions['hq-post'] = (el) => {
  const P = (VG.data.hqPosts || {})[el.getAttribute('data-post')];
  if (!P) return;
  VG.audio.click();
  VG.ui.dialog({
    title: '槐桥信息港 · ' + P.tag,
    width: 560,
    body: `<div class="hq-article">
        <div class="a-tag">${esc(P.tag)}</div>
        <h2 class="a-title">${esc(P.title)}</h2>
        <div class="a-meta">${esc(P.meta)}</div>
        <div class="a-body">${esc(P.body)}</div>
        <div class="a-foot">—— 槐桥信息港　www.hq-info.com.cn</div>
      </div>`,
    buttons: ['关闭']
  });
};


VG.actions['g9-clown'] = () => {
  if (VG.state.guoScared) return;      
  VG.state.guoScared = true;
  VG.save();
  VG.horror.sysGlitch(900);
  setTimeout(() => VG.engine.replace('guo999'), 460);
};


VG.actions['g9-login'] = () => {
  VG.audio.click();
  VG.ui.dialog({
    title: '管理登录 - 郭记大篷车',
    width: 380,
    body: `<div style="line-height:2.1">
      <div style="color:#666;font-size:11.5px;margin-bottom:10px">
        本站后台不对访客开放。
      </div>
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
        <span style="flex:0 0 46px">账号</span>
        <input id="ga-user" maxlength="24" style="flex:1;font-family:var(--mono)">
      </div>
      <div style="display:flex;align-items:center;gap:8px">
        <span style="flex:0 0 46px">密码</span>
        <input id="ga-pass" type="password" maxlength="24" style="flex:1;font-family:var(--mono)">
      </div>
      <div id="ga-err" style="color:#a02020;font-size:11px;min-height:18px;margin-top:9px"></div>
    </div>`,
    buttons: ['登录', '取消'],
    onButton: (i) => {
      if (i === 1) return false;
      const A = VG.data.guoAdmin;
      const u = ((document.getElementById('ga-user') || {}).value || '').trim();
      const p = ((document.getElementById('ga-pass') || {}).value || '').trim();
      const err = document.getElementById('ga-err');
      if (u === A.user && p === A.pass) {
        VG.state.guoAdminLoggedIn = true;
        VG.save();
        VG.audio.chime();
        const ov = document.getElementById('overlay');
        ov.classList.add('hidden'); ov.innerHTML = '';
        setTimeout(() => VG.engine.navigate('guo999-admin'), 120);
        return false;
      }
      VG.audio.errorDing();
      if (err) err.textContent = u ? '账号或密码不正确。' : '请输入账号和密码。';
      return true;
    }
  });
  setTimeout(() => {
    const el = document.getElementById('ga-user');
    if (el) el.focus();
  }, 60);
};

VG.actions['ga-logout'] = () => {
  VG.audio.click();
  VG.state.guoAdminLoggedIn = false;
  VG.engine.navigate('guo999');
};


VG.sites['hq-info'] = {
  render(s) {
    const more = s.solved['p03-invite'] !== undefined;
    return `
<div class="hq">
  <div class="hq-top">
    <div class="hq-logo">槐桥信息港</div>
    <div class="hq-slogan">槐桥人自己的网上家园 · 始建于 1999 年 9 月 · 最佳浏览分辨率 800×600</div>
  </div>
  <div class="hq-marquee"><span>
    ★ 本站新开通「供求信息」栏目，免费发布，欢迎各位乡亲使用 ★
    关于近期有人反映本站打开慢的问题，是因为镇上电压不稳，不是本站的问题 ★
    本站自 2001 年 11 月起不再更新，谢谢大家这两年 —— 站长 老K ★
  </span></div>

  <!-- 友站链接按钮 -->
  <div class="hq-links">${b88row()}</div>

  <div class="hq-body">
    <!-- 左栏 -->
    <div class="hq-col left">
      <div class="hq-panel">
        <h3>寻人启事</h3>
        <div style="padding:8px 10px;line-height:2;font-size:11px">
          <div style="display:flex;justify-content:center;margin-bottom:6px">
            ${VG.illus.slot('guo_xiaoping', VG.illus.portraitPlaceholder(), 88)}
          </div>
          <div style="text-align:center;font-size:10px;color:#888;margin-bottom:6px">（家属提供）</div>
          郭小萍，女，15岁，槐桥镇柳河村人。<br>
          1999年8月14日晚离家未归。<br>
          走时穿红色棉袄，短发。<br>
          <span style="color:#888">有线索者请联系本站站长转交。</span><br>
          ${  ''}
          <span class="hq-ghost">※ 同期本镇另有一名女生去向不明，家属未报案。</span><br>
          <span style="color:#cc0000">（此启事已于 2001 年 11 月撤销）</span>
        </div>
      </div>

      <div class="hq-panel">
        <h3>本 站 原 创</h3>
        <div class="hq-posts">
          <a data-act="hq-post" data-post="lantern">
            <span class="tag">【网友来稿】</span>河灯节那晚，我在桥上
            <span class="pm">2001-11-02　阅读 1,204</span>
          </a>
          <a data-act="hq-post" data-post="circus">
            <span class="tag">【本站通讯】</span>大篷车走了
            <span class="pm">1999-08-16　阅读 3,871</span>
          </a>
          <div class="hq-posts-tip">※ 本站原创，转载请注明出处</div>
        </div>
      </div>

      <div class="hq-panel">
        <h3>本地新闻</h3>
        <div class="hq-news">
          ${VG.illus.slot('bridge_1999', VG.illus.bridgeDay(), 156)}
          <div style="text-align:center;font-size:10px;color:#888;margin-bottom:8px">
            柳河桥 · 摄于 2000 年 7 月
          </div>
          <div class="date">1999-08-01</div>柳河水位创十年新低
          <div class="date">1999-08-10</div>河灯节筹备工作开始
          <div class="date">1999-08-12</div>大篷车马戏团来镇演出
          <div class="date">2001-11-03</div>本站停止更新公告
        </div>
      </div>
    </div>

    <!-- 中栏 -->
    <div class="hq-col mid">
      <div class="hq-panel">
        <h3>本站公告</h3>
        <div class="hq-notice">
          <span class="nt">【本站公告】</span> 2001年11月3日 更新<br><br>
          1. 本站新开通「供求信息」栏目，免费发布，欢迎各位乡亲使用。<br>
          2. 关于近期有人反映本站打开慢的问题，是因为镇上电压不稳，不是本站的问题。请大家谅解。<br>
          3. 寻人启事一则（见左栏），有线索者请联系站长转交。<br>
          <div id="hq-more" style="${more ? '' : 'display:none'}">
            4. 本站与柳河二中校园论坛互开注册邀请码，方便各位同学：<b style="color:#0000ee">HQ2000</b><br>
            5. 站长信箱：laok@hq-info.com.cn（已停用）<br>
          </div>
          <div style="margin-top:8px">
            <a data-act="more-notice">${more ? '收起公告 ▲' : '更多公告 ▼'}</a>
          </div>
          <div style="margin-top:10px;color:#888">
            ※ 本站自 2001 年 11 月起不再更新。谢谢大家这两年。<br>
            <div style="text-align:right">—— 站长 老K</div>
          </div>
        </div>
      </div>

      <div class="hq-panel">
        <h3>本站推荐 ${VG.illus.newBadge()}</h3>
        <div class="hq-banner">
          ${VG.illus.slot('poster_guo999', VG.illus.poster(), 96)}
          <div class="bt">
            <b>郭记大篷车 · 流动演出</b><br>
            本站推荐 · 点图片可以看大图<br>
            <span style="color:#888">常年承接：庙会 开业 婚庆 白事</span><br>
            <a data-act="deadlink2">→ 查看该团巡演主页</a>
          </div>
        </div>
        <div class="hq-build">
          ${VG.illus.construction()} 本站部分栏目正在建设中，敬请期待...
        </div>
      </div>

      <div class="hq-panel">
        <h3>供求信息</h3>
        <div class="hq-news">
          · 出售旧青花瓷瓶一个，高47厘米，有意者面谈。<span class="date">（已过期）</span><br>
          · 求购 486 主机一台，价格面议。<span class="date">（已过期）</span><br>
          · 招工：镇上网吧招夜班网管，包吃住。<span class="date">（已过期）</span>
        </div>
      </div>
    </div>

    <!-- 右栏 -->
    <div class="hq-col right">
      <div class="hq-panel">
        <h3>友情链接</h3>
        <ul style="list-style:none;padding-left:10px">
          <li><a class="hq-dead" data-act="deadlink">柳河二中论坛</a></li>
          <li><a data-act="go" data-route="tieba">槐桥吧</a></li>
          <li><a data-act="go" data-route="radio">发烧友之家</a> ${VG.illus.newBadge()}</li>
          <li><a data-act="deadlink2">老郭大篷车</a></li>
          <li><a data-act="deadlink2">槐桥镇人民政府</a></li>
        </ul>
      </div>
      ${  ''}
      ${VG.ads.slot('hq-right', 'hq-info', { flash: true, w: 168 })}
      <div class="hq-panel">
        <h3>聊天室</h3>
        <div style="padding:8px 10px;line-height:2;font-size:11px;color:#666">
          槐桥茶座 · 在线 0 人<br>
          <span style="color:#999">（聊天室服务器已于2001年关闭）</span>
        </div>
      </div>
      <div class="hq-counter">
        <span class="cap">您是第</span>
        <span class="digits">00249</span>
        <span class="cap" style="margin-top:3px">位访客</span>
      </div>
    </div>
  </div>

  <div class="hq-footer">
    槐桥信息港 · 1999-2001 · 站长 老K<br>
    <span style="color:#999">本站由槐桥镇「新纪元网吧」友情提供服务器空间</span><br>
    <span class="ghost">老K 2001 她还在等</span>
  </div>

</div>`;
  }
};


VG.sites['bbs'] = {
  render(s) {
    return `
<div class="bbs">
  ${bbsHead(s)}
  <div class="bbs-nav">
    <a data-act="toast" data-msg="该版块已关闭。">校园动态</a>
    <a data-act="toast" data-msg="该版块已关闭。">学习交流</a>
    <a data-act="toast" data-msg="只有这里还留着。">灌水专区</a>
    <a data-act="toast" data-msg="该版块已关闭。">二手市场</a>
    <a data-act="toast" data-msg="版主 admin 最后登录：2001-11-05">站务管理</a>
  </div>

  <div class="bbs-wrap">
    <table class="bbs-table">
      <tr><th>标题</th><th class="au">作者</th><th class="num">点击</th><th class="num">回复</th><th class="tm">最后回复</th></tr>
      <tr><td><span class="bbs-sticky">【公告】</span>论坛规则（必读）</td>
          <td class="au">admin</td><td class="num">412</td><td class="num">3</td><td class="tm">2000-03-02</td></tr>
      <tr><td><a data-act="open-thread">有没有人知道镇上来那个马戏团</a></td>
          <td class="au"><a data-act="go" data-route="bbs-user">小雨0427</a></td><td class="num">1,847</td><td class="num">12</td><td class="tm">2001-11-04</td></tr>
      <tr><td><span class="bbs-dead">任贤齐新歌好好听~~~~</span></td>
          <td class="au"><a data-act="go" data-route="bbs-user">小雨0427</a></td><td class="num">56</td><td class="num">4</td><td class="tm">2000-04-03</td></tr>
      <tr><td><span class="bbs-dead">【转帖】花瓶姑娘是骗人的！有图有真相</span></td>
          <td class="au">路过的人</td><td class="num">93</td><td class="num">7</td><td class="tm">2003-06-11</td></tr>
      <tr><td><span class="bbs-dead">谁知道柳河桥底下有什么</span></td>
          <td class="au">匿名</td><td class="num">11</td><td class="num">0</td><td class="tm">2001-11-04</td></tr>
    </table>
    <div class="bbs-hint">
      ※ 提示：本论坛共 1 页，共 5 个主题。新用户请先注册。<br>
      ※ 本论坛程序：雷傲 LB5000 汉化版 · 服务器由「新纪元网吧」提供
    </div>
  </div>
  ${VG.ads.slot('bbs-main', 'bbs', { flash: true, w: 440 })}
  <div class="bbs-foot">柳河二中校园论坛 · 1999-2001</div>

</div>`;
  }
};


VG.sites['bbs-thread-1'] = {
  render(s) {
    if (!s.loggedIn) {
      return `
<div class="bbs">
  ${bbsHead(s)}
  <div class="login-box">
    <h3>您没有权限查看该主题，请先登录</h3>
    <div class="row"><label>用户名</label><input id="lg-name" value="${s.user.name || ''}" placeholder="请输入用户名"></div>
    <div class="row"><label>密码</label><input id="lg-pass" type="password" placeholder="请输入密码"></div>
    <div class="err" id="lg-err"></div>
    <div class="go">
      <button class="btn98" data-act="do-login">登录</button>
      <button class="btn98" data-act="open-reg" style="margin-left:8px">注册新用户</button>
    </div>
    <div class="bbs-hint" style="margin:14px 24px 0">
      ※ 本论坛不对外开放，注册需要站内邀请码。<br>
      ※ 邀请码在站长那边，不在这里。
    </div>
  </div>
</div>`;
    }

    return `
<div class="bbs">
  ${bbsHead(s)}
  <div class="bbs-nav">
    <a data-act="go" data-route="bbs">◀ 返回主题列表</a>
    <a data-act="toast" data-msg="您没有权限执行该操作。">收藏该主题</a>
  </div>

  <div class="post">
    <div class="post-title">有没有人知道镇上来那个马戏团　<span style="color:#888;font-size:11px">tid=47　page=1/2</span></div>

    <div class="floor">
      <div class="fl-info"><div class="name"><a data-act="go" data-route="bbs-user">小雨0427</a></div>等级：新手上路<br>帖数：23<br>注册：2000-03-02</div>
      <div class="fl-body">今天镇上来了个大篷车
里面有个花瓶姑娘 你们去看过没有
我爸说那是骗人的 但是我觉得是真的
她一直在看我<div class="fl-no">第 1 楼　1999-08-10 20:14</div></div>
    </div>

    <div class="floor">
      <div class="fl-info"><div class="name">路过的人</div>等级：新手上路<br>帖数：4</div>
      <div class="fl-body">那都是镜子做的 电视上都演过
把两面镜子拼成直角 人站后面 只露个头
你花那五块钱不如买冰棍<div class="fl-no">第 2 楼　1999-08-10 21:37</div></div>
    </div>

    <div class="floor">
      <div class="fl-info"><div class="name">老猫</div>等级：论坛游民<br>帖数：118</div>
      <div class="fl-body">我进去看过
那个班主不让碰瓶子
瓶子底下是封死的 用红布缠了好几圈
谁家骗人骗到这份上<div class="fl-no">第 3 楼　1999-08-11 09:02</div></div>
    </div>

    <div class="floor">
      <div class="fl-info"><div class="name"><a data-act="go" data-route="bbs-user">小雨0427</a></div>等级：新手上路<br>帖数：23</div>
      <div class="fl-body">我明天还去
我爸说带我去<div class="fl-no">第 4 楼　1999-08-11 19:45</div></div>
    </div>

    <div class="floor">
      <div class="fl-info"><div class="name">admin</div>等级：版主<br>帖数：87</div>
      <div class="fl-body">楼上几个少说两句
那团人在镇上待到河灯节就走
别惹事<div class="fl-no">第 5 楼　1999-08-11 22:10</div></div>
    </div>

    <div class="floor gap">第 6 楼、第 7 楼 已被删除　—— 2001-11-05 由 admin 操作</div>

    <div class="floor">
      <div class="fl-info"><div class="name">admin</div>等级：版主<br>帖数：87</div>
      <div class="fl-body">张哥从网吧机器上拷过来一段录像
你们自己看吧 别外传
<a data-act="open-video">📎 录像2_19990814.rm</a>　<span style="color:#888">(4.7 MB)</span>
<div style="color:#888;margin-top:6px">※ 好几个说打不开。我这边也是。</div>
<div class="fl-no">第 8 楼　2001-11-04 04:27</div></div>
    </div>
  </div>
  <div class="bbs-foot">共 1 页 · 当前显示 1/2 页（第 2 页不对外显示）</div>

</div>`;
  }
};


VG.sites['bbs-thread-2'] = {
  render(s) {
    if (!s.loggedIn) return `<div class="bbs">${bbsHead(s)}<div class="login-box"><h3>您没有权限查看该主题</h3></div></div>`;
    return `
<div class="bbs">
  ${bbsHead(s)}
  <div class="bbs-nav"><a data-act="go" data-route="bbs-thread-1">◀ 返回第 1 页</a></div>

  <div class="post" style="border-color:#cc0000">
    <div class="post-title" style="background:#ffe0e0">（此页不对外显示）　<span style="color:#888;font-size:11px">tid=47　page=2/2</span></div>

    <div class="floor deleted">
      <div class="fl-info"><div class="name"><a data-act="go" data-route="bbs-user">小雨0427</a></div>等级：新手上路<br>帖数：23</div>
      <div class="fl-body">今天我爸带我去看了那个花瓶
她唱了一段 好像是评剧 我听不懂
但是我出来的时候她叫住我了
她说她认识我

我问我爸 我爸说别瞎说<div class="fl-no">第 6 楼　1999-08-11 23:47</div></div>
    </div>

    <div class="floor deleted">
      <div class="fl-info"><div class="name"><a data-act="go" data-route="bbs-user">小雨0427</a></div>等级：新手上路<br>帖数：23</div>
      <div class="fl-body">拍了一张照片 有点糊
后面那面镜子里面好像站着个人
我数了三遍 前面站了七个
镜子里是八个

<div style="margin:6px 0">
  ${VG.illus.slot('troupe_1999', VG.illus.troupePhoto(), 280)}
</div>
<span style="color:#888;font-size:11px">文件名：heying_最后修改_20011027.jpg</span>

我的家：<a data-act="go" data-route="xiaoyu">home.chinaren.com/xiaoyu427</a><div class="fl-no">第 7 楼　1999-08-12 00:03</div></div>
    </div>
  </div>
  <div class="bbs-foot">第 2 页 / 共 2 页</div>
</div>`;
  }
};


VG.sites['bbs-user'] = {
  render(s) {
    return `
<div class="bbs">
  ${bbsHead(s)}
  <div class="bbs-nav"><a data-act="go" data-route="bbs">◀ 返回主题列表</a></div>

  <div class="login-box" style="width:470px;margin-top:22px">
    <h3>用户资料</h3>
    <div style="display:flex;gap:14px;padding:0 20px;align-items:flex-start">
      ${VG.illus.avatar('girl')}
      <div style="line-height:2.1;font-size:12px">
        <b style="font-size:14px;color:#0000ee">小雨0427</b><br>
        等级：新手上路　帖数：23<br>
        注册：2000-03-02<br>
        来自：槐桥镇柳河村<br>
        最后登录：<span style="color:#cc0000">2001-11-04 04:27</span>
      </div>
    </div>
    <div style="margin:14px 20px 0;padding:10px 12px;background:#fffdf0;border:1px solid #ddd;line-height:2.2">
      <b>个人主页：</b><a data-act="go" data-route="xiaoyu">home.chinaren.com/xiaoyu427</a><br>
      <b>OICQ：</b>472718<br>
      <b>签名：</b>我的家 → 点进去看看 ^_^
    </div>
    <div class="bbs-hint" style="margin:14px 20px 18px">
      ※ 该用户自 2001 年 11 月 4 日起再未登录。<br>
      ※ 她的主页还在，但设了口令，进不去。
    </div>
  </div>
  <div class="bbs-foot">柳河二中校园论坛 · 1999-2001</div>
</div>`;
  }
};


VG.sites['xiaoyu'] = {
  render(s) {
    
    
    
    
    
    
    return `
<div class="xy">
  <div class="xy-title"><span>★☆★ 小雨 的 家 ★☆★</span></div>
  <div class="xy-sub">～ 欢迎光临 请随便看看 ～</div>
  <div class="xy-lock">
    请输入口令<br><br>
    <input id="xy-pass" maxlength="4" inputmode="numeric" placeholder="＿＿＿＿">
    <div class="err" id="xy-err"></div>
    <button class="btn98" data-act="xy-unlock" style="margin-top:10px">进 入</button>
  </div>
  <div class="xy-count">你是第 00184 位来访者</div>
</div>`;
  }
};


VG.sites['xiaoyu-in'] = {
  render(s) {
    const reversed = !!s.solved['p10-reverse'];
    const showArchive = reversed;

    let diary = '';
    const last = VG.data.diaryBase.length - 1;
    VG.data.diaryBase.forEach((d, i) => {
      diary += `<span class="d">${d[0]}</span>${d[1].replace(/\n/g, '<br>')}`;
      
      if (i === last && s.diaryRead >= 2) {
        diary += `<br><span class="todo">${VG.data.diaryExtra}</span>`;
      }
    });

    
    let guest = '';
    if (s.guestbookRead === 0 && !(s.myMessages || []).length) {
      guest = `<div class="empty">${VG.data.guestEmpty}</div>`;
    } else {
      if (s.guestbookRead > 0) {
        guest = `<div class="g"><span class="who">${esc(s.user.name || '游客')}</span>
          <span class="tm">2001-11-04 04:27</span><br>
          ${s.guestbookRead === 1 ? '你来了' : '你上次也来过'}</div>`;
        if (s.guestbookRead >= 3) {
          for (let i = 0; i < 5; i++) {
            guest += `<div class="g"><span class="who">${esc(s.user.name || '游客')}</span>
              <span class="tm">2011-11-04 04:27</span><br>你上次也来过</div>`;
          }
        }
      }
      
      (s.myMessages || []).forEach(m => {
        guest += `<div class="g mine"><span class="who">${esc(m.name)}</span>
          <span class="tm">2001-11-04 04:27</span><br>${esc(m.text)}</div>`;
      });
      
      if ((s.myMessages || []).length) {
        guest += `<div class="g hers"><span class="who">小雨</span>
          <span class="tm">2001-11-04 04:27</span><br>谢谢</div>`;
      }
    }

    
    const guestForm = `
      <div class="xy-guest-form">
        <div class="gf-row">
          <label>昵称</label>
          <input id="g-name" maxlength="16" value="${esc(s.user.name || '游客')}">
        </div>
        <div class="gf-row">
          <label>内容</label>
          <textarea id="g-text" maxlength="120" rows="3"
            placeholder="说点什么……"></textarea>
        </div>
        <div class="gf-foot">
          <span class="gf-tip">※ 留言会立刻出现在上面</span>
          <button class="btn98" data-act="guest-post">提交留言</button>
        </div>
      </div>`;

    
    const baseCount = s.guestbookRead === 0 ? 0
                    : s.guestbookRead === 1 ? 1
                    : s.guestbookRead === 2 ? 2 : 47;
    const mine = (s.myMessages || []).length;
    const guestCount = baseCount + mine + (mine ? 1 : 0);

    return `
<div class="xy">
  ${VG.illus.sparkles(20, 427)}
  <div class="xy-title">
    <i class="xy-h l">♥</i><i class="xy-h r">♥</i>
    <span>★☆★ 欢迎来到 小雨 的家 ★☆★</span>
  </div>
  <div class="xy-sub">
    <i class="xy-star">✿</i>
    ～ 本站正在建设中 ～ 请用 IE5.0 以上浏览器 800*600 浏览 ～
    <i class="xy-star">✿</i>
  </div>
  <div class="xy-marquee">
    <span>♥ 欢迎光临 ♥ 本站是个人的小站，做得不好请多包涵 ♥
      留言本在下面，写点什么我都会看 ♥ 谢谢每一个来过的人 ♥</span>
  </div>

  <div class="xy-layout">
    <div class="xy-nav">
      <div class="box">
        <h4>我 的 导 航</h4>
        <a data-act="read-diary">我的日记</a><br>
        <a data-act="toast" data-msg="相册服务器已关闭。（5 张照片，1 张损坏）">我的相册</a><br>
        <a data-act="toast" data-msg="任贤齐。《心太软》。1996。">我的偶像</a><br>
        <a data-act="guest-book">留言本</a><br>
        <a data-act="toast" data-msg="邮件系统已停用。">给我写信</a>
        ${showArchive ? '<br><a data-act="go" data-route="archive" style="color:#ff0">427</a>' : ''}
      </div>
      <div class="box">
        <h4>来 访 人 数</h4>
        <div style="color:#0f0;font-family:var(--mono)">00184</div>
        <div style="color:#5aa;font-size:11px;margin-top:6px">（从 2000 年 3 月开始算）</div>
      </div>
      <div class="box" style="border-color:#0f0">
        <h4 style="color:#0f0;border-color:#0f0">安 全 提 示</h4>
        <div style="font-size:11px;color:#8fa;line-height:1.9">
          本站没有病毒<br>本站不收集您的信息<br>本站只有我一个人
        </div>
      </div>
      <div class="box xy-cute">
        <h4>我 的 小 收 藏</h4>
        <div class="xy-cute-row">
          <i>♥</i><i>★</i><i>✿</i><i>♪</i><i>☆</i><i>❀</i>
        </div>
        <div class="xy-cute-tip">（攒够 100 个就换一个新版面）</div>
      </div>
      <div class="box xy-since">
        <h4>开 站 至 今</h4>
        <div class="xy-since-n" id="xy-days">00611</div>
        <div class="xy-cute-tip">天</div>
      </div>
    </div>

    <div class="xy-main">
      <div class="xy-diary">${diary}</div>

      <div class="xy-photo" style="margin-top:14px;border:1px solid #0ff;background:rgba(0,20,30,.65);padding:10px 12px">
        <div style="color:#0ff;font-size:11px;font-family:var(--mono);margin-bottom:6px">
          我的相册 &gt; 河灯节_1999.jpg
        </div>
        <div style="margin-top:6px">
          ${VG.illus.slot('river_19990814', VG.illus.riverNight(), 420)}
        </div>
        <div style="font-size:11px;color:#5aa;margin-top:6px;line-height:1.9">
          1999 年 8 月 14 日　柳河　河灯节<br>
          <span style="color:#f0f">这张不是我拍的。我那天没去。</span>
        </div>
      </div>

      <div class="winamp">
        <div class="wa-top">
          <span style="color:#0ff">WINAMP</span>
          <span class="wa-lcd" id="wa-lcd">小雨.mid　[00:00]　循环</span>
          <button class="wa-btn" data-act="wa-toggle" id="wa-play">▶</button>
          <button class="wa-btn" data-act="wa-reverse" title="倒带">⏪</button>
        </div>
        <div class="wa-sub" id="wa-sub">　</div>
      </div>

      <div class="xy-guest">
        <h4>留 言 本　（${guestCount} 条留言）</h4>
        ${guest}
        ${guestForm}
      </div>

      <div class="xy-links" style="margin-top:14px;border:1px dashed #0ff;padding:8px 10px">
        <div style="color:#ff0;font-size:11px;margin-bottom:6px">友 情 链 接</div>
        ${b88row([
          { label: '槐桥信息港', route: 'hq-info', bg: '#000080', fg: '#ffffff' },
          { label: '柳河二中论坛', route: 'bbs', bg: '#336699', fg: '#ffffff' },
          { label: '槐桥吧', route: 'tieba', bg: '#2f6ba8', fg: '#ffe45c' },
          { label: '发烧友之家', route: 'radio', bg: '#12402a', fg: '#7fe0a0' }
        ])}
      </div>
    </div>
  </div>

  <div class="xy-count">你是第 00184 位来访者　|　本站建于 2000 年 3 月 2 日</div>
</div>`;
  },
  after(s) {
    if (VG.audio.midiIsOn()) {
      const b = document.getElementById('wa-play');
      if (b) { b.textContent = '❚❚'; b.classList.add('active'); }
    }
  }
};


VG.sites['archive'] = {
  render(s) {
    
    const tail = s.sawTruth
      ? `<div class="frag" id="arc-frag">${VG.data.tailMarks}</div>`
      : '';

    return `
<div class="archive" id="arc">
  <div class="scan"></div>
  <div class="sweep"></div>
  <i class="tear t1"></i><i class="tear t2"></i><i class="tear t3"></i>
  <div class="inner">
    <p>是我。</p>
    <p>这些东西是我自己做的<br>
       我不太会用电脑 学了很久<br>
       我问过老K 他教我用这个做网页<br>
       他说放在网上就谁也删不掉了</p>
    <p>我记性越来越不好了<br>
       医生说是那个病<br>
       我怕忘掉</p>
    <p>所以我写下来</p>
    <p>你不要学我<br>
       不要把自己也放进去</p>

    <p class="right"><span class="seal">槐桥 柳河</span></p>

    <div class="names">
      <p>下面这些名字 我写不全了<br>只记得这些</p>
      <p><span class="num">1.</span> 郭永贵　　<span class="num">2.</span> 郭世萍　　<span class="num">3.</span> 康建国<br>
         <span class="num">4.</span> 柳素芬　　<span class="num">5.</span> 王长顺　　<span class="num">6.</span> 周小雨<br>
         <span class="num">7.</span> <span class="blank">■■■</span></p>
    </div>

    <div class="mirror">
      <p class="small">镜子在你手上。你要怎么转？</p>
      <input type="range" id="mirror" min="0" max="90" value="0">
      <span id="mirror-deg" style="font-family:var(--mono);margin-left:12px;color:#6b6660">0°</span>
      <div class="mtext" id="mirror-text">　</div>
    </div>

    <div class="arc-foot">
      本页最后修改：2021-08-14 04:27<br>
      访问计数：00001
    </div>
  </div>
  ${tail}
</div>`;
  },

  after() {
    const arc = document.getElementById('arc');
    const sl = document.getElementById('mirror');
    if (!sl || !arc) return;
    const txt = document.getElementById('mirror-text');
    const deg = document.getElementById('mirror-deg');
    let fired = false;
    let holdTimer = null;
    let glitchGap = 4200;          

    
    (function scheduleGlitch() {
      if (!document.body.contains(arc)) return;   
      setTimeout(() => {
        if (!document.body.contains(arc)) return;
        arc.classList.add('glitching');
        setTimeout(() => arc.classList.remove('glitching'), 80 + Math.random() * 90);
        scheduleGlitch();
      }, glitchGap + Math.random() * 1400);
    })();

    sl.addEventListener('input', () => {
      const v = +sl.value;
      deg.textContent = v + '°';
      VG.state.mirrorSeen = true;

      
      const dist = Math.abs(v - 45);
      glitchGap = dist <= 2 ? 900 : dist <= 8 ? 2000 : dist <= 20 ? 3200 : 4600;

      if (v <= 40) txt.textContent = '花瓶是空的。里面什么都没有。';
      else if (v <= 44) txt.textContent = '瓶里开始出现一个模糊的轮廓。';
      else if (v === 45) {
        txt.textContent = '瓶子里是一张脸。';
        
        if (!fired && !VG.state.sawTruth) {
          fired = true;
          VG.horror.finalScare(afterTheTruth);
        }
      } else if (v <= 90) {
        txt.textContent = '那张脸在转过来。';
        if (v > 70 && !holdTimer) {
          holdTimer = setTimeout(() => { if (+sl.value > 70) endingD(); }, 60000);
        }
      }
    });
  }
};


function afterTheTruth() {
  const el = document.getElementById('scare');
  el.className = 'scare';        
  el.innerHTML = '';
  el.classList.remove('hidden');

  VG.state.sawTruth = true;
  VG.save();

  setTimeout(() => {
    el.classList.add('hidden');
    VG.engine.replace('archive');           
    
    
    setTimeout(() => VG.ui.toast('（有什么东西变了。）', 3600), 1100);
  }, 1400);
}

function endingD() {
  const el = document.getElementById('scare');
  el.className = 'scare';
  el.style.background = '#050505';
  el.innerHTML = `<div style="font-family:var(--kai);font-size:22px;color:#bbb;letter-spacing:3px">她还在里面。但她还在。</div>`;
  el.classList.remove('hidden');
  setTimeout(() => { el.classList.add('hidden'); el.innerHTML = ''; el.style.background = ''; }, 6000);
}


VG.sites['404'] = {
  render(s) {
    const c = s.visitedCount['404'] || 1;
    const showBlog = s.solved['p04-deleted'] && c >= 2;

    if (showBlog) {
      return `
<div class="hq">
  <div class="hq-top" style="background:linear-gradient(180deg,#444,#666)">
    <div class="hq-logo" style="font-size:22px;text-shadow:none;color:#fff">我的考古笔记</div>
    <div class="hq-slogan">有些东西 你翻出来就放不回去了</div>
  </div>
  <div class="hq-body">
    <div class="hq-col mid" style="display:block;padding:0 20px">
      <div class="hq-panel"><h3>2011-10-27　04:27</h3>
        <div class="hq-news">找到一个老网站 好像是河南一个镇上的<br>
          里面有个女孩的日记 看得我心里发毛<br>
          她好像一直在等人来找她</div></div>
      <div class="hq-panel"><h3>2011-11-02　04:27</h3>
        <div class="hq-news">我把所有线索串起来了<br>
          那个瓶子不是骗术<br>
          是真的</div></div>
      <div class="hq-panel"><h3>2011-11-04　04:27</h3>
        <div class="hq-news">我把镜子转过去了。<br>
          她出来了。<br>
          但出来的是我。</div></div>
      <div class="hq-panel" style="border-color:#cc0000"><h3 style="background:#cc0000">（今天）　04:27</h3>
        <div class="hq-news">你比我快。</div></div>
    </div>
  </div>
</div>`;
    }

    const bad = VG.engine.lastBadUrl || 'about:blank';
    return `
<div class="p404">
  <h2>无法找到该页</h2>
  <p class="code">HTTP 404　找不到文件</p>
  <p>您要访问的网页 <b>${bad}</b> 可能已经被删除、更名，或者暂时不可用。</p>
  <p>请检查您输入的网址是否正确。</p>
  <p class="tip">如果您是通过链接到达这里的，那说明那个链接已经死掉很久了。</p>
  <p class="tip" style="margin-top:40px">
    <a data-act="go" data-route="hq-info">返回槐桥信息港</a>
  </p>
</div>`;
  }
};


VG.sites['tieba'] = {
  render(s) {
    const rows = VG.data.tiebaList.map(it => `
      <tr>
        <td class="n">${it.n}</td>
        <td class="t">
          ${it.tag ? `<span class="tag${it.hot ? ' hot' : ''}">${it.tag}</span>` : ''}
          ${it.post
            ? `<a data-act="go" data-route="tieba-post">${it.t}</a>`
            : `<a data-act="toast" data-msg="该主题已被删除或需要登录。">${it.t}</a>`}
        </td>
        <td class="au">${it.au}</td>
        <td class="tm">${it.tm}</td>
      </tr>`).join('');

    return `
<div class="tieba">
  <div class="tb-top">
    <div class="tb-logo">八度<span>贴吧</span></div>
    <div class="tb-search"><input value="槐桥" readonly><button>八度一下</button></div>
    <div style="font-size:11.5px;color:#d5e6f5">
      ${s.user.name ? '欢迎你，' + s.user.name : '未登录'}
    </div>
  </div>
  <div class="tb-crumb">
    <a data-act="go" data-route="hq-info">槐桥信息港</a> &gt;
    <a data-act="toast" data-msg="八度贴吧首页。">贴吧</a> &gt;
    <b>槐桥吧</b>
  </div>

  <div class="tb-wrap">
    <div class="tb-card">
      <div class="tb-card-head">
        <div><span class="kw">槐桥吧</span>
          <span class="num">　关注 1,247　帖子 8,930</span></div>
        <div class="num">吧主：槐桥老猫　小吧主：admin</div>
      </div>
      <div class="tb-btns">
        <button class="tbbtn on">看贴</button>
        <button class="tbbtn" data-act="toast" data-msg="图片库已失效。">图片</button>
        <button class="tbbtn" data-act="toast" data-msg="精品区共 3 帖，均已删除。">精品</button>
        <button class="tbbtn" data-act="toast" data-msg="本吧群组已于 2012 年解散。">群组</button>
      </div>
      <table class="tb-list">
        <tr><th class="n">回复</th><th>主题</th><th class="au">作者</th><th class="tm">最后回复</th></tr>
        ${rows}
      </table>
    </div>
    ${VG.ads.slot('bbs-foot', 'bbs', { w: 440 })}
<div class="tb-foot">
      本吧创建于 2006-04-27　·　共有主题数 312 个，贴子数 8,930 篇，槐桥人 1,247 位
    </div>
  </div>

</div>`;
  }
};


VG.sites['tieba-post'] = {
  render(s) {
    const lzOnly = !!s.tiebaLzOnly;

    const imgOf = (k) => {
      if (k === 'town') {
        return `<div style="margin:6px 0">
          ${VG.illus.slot('town_2011', VG.illus.bridgeDay(), 420)}
        </div>`;
      }
      if (k === 'vase') {
        return `<div style="margin:6px 0">
          ${VG.illus.slot('vase_item', VG.illus.vaseProduct(), 220)}
        </div>`;
      }
      return '';
    };

    const renderFloor = (f) => `
      <div class="tb-floor ${f.lz ? 'lz' : ''}">
        <div class="side">
          ${VG.illus.avatar(f.lz ? 'man' : (f.au === 'admin' ? 'admin' : 'cat'))}
          <div class="nm">${f.au}</div>
          <div class="lv">${f.lz ? '吧友' : (f.au === 'admin' ? '吧务' : '吧友')}</div>
          <div class="meta">发帖：${f.lz ? 47 : Math.floor(f.no * 3 + 7)}<br>来自：槐桥镇</div>
        </div>
        <div class="main">
          <div class="txt">${f.txt}</div>
          ${imgOf(f.img)}
          ${f.sub && f.sub.length ? `<div class="tb-sub">${f.sub.map(r =>
            `<div class="r"><span class="who">${r.who}</span>：${r.txt}
             <span class="at">${r.at}</span></div>`).join('')}</div>` : ''}
          <div class="tm"><span>${f.tm}</span><span class="no">${f.no}楼</span></div>
        </div>
      </div>`;

    const floors = VG.data.tiebaFloors.filter(f => !lzOnly || f.lz);
    let body = '';
    if (lzOnly) {
      
      const f47 = VG.data.tiebaFloor47;
      body = renderFloor(VG.data.tiebaFloors[0])
           + renderFloor(VG.data.tiebaFloors[4])
           + `<div class="tb-gap">—— 中间 42 层被楼主自己删除了 ——</div>`
           + renderFloor(f47);
    } else {
      body = floors.map(renderFloor).join('')
           + `<div class="tb-gap">第 47 楼 已被系统删除　（提示：楼主自己发的内容，楼主还能看见）</div>`;
    }

    return `
<div class="tieba">
  <div class="tb-top">
    <div class="tb-logo">八度<span>贴吧</span></div>
    <div class="tb-search"><input value="花瓶姑娘" readonly><button>八度一下</button></div>
    <div style="font-size:11.5px;color:#d5e6f5">
      ${s.user.name ? '欢迎你，' + s.user.name : '未登录'}
    </div>
  </div>
  <div class="tb-crumb">
    <a data-act="go" data-route="hq-info">槐桥信息港</a> &gt;
    <a data-act="go" data-route="tieba">槐桥吧</a> &gt;
    <b>镇上那个花瓶姑娘到底是真的假的</b>
  </div>

  <div class="tb-wrap">
    <div class="tb-card">
      <div class="tb-card-head">
        <div><span class="kw">【图片】镇上那个花瓶姑娘到底是真的假的</span></div>
        <div class="num">浏览 34,102　回复 48</div>
      </div>
      <div class="tb-btns">
        <button class="tbbtn" data-act="tieba-lz">${lzOnly ? '✓ 只看楼主' : '只看楼主'}</button>
        <button class="tbbtn" data-act="toast" data-msg="收藏成功（其实没有）。">收藏</button>
        <button class="tbbtn" data-act="toast" data-msg="本吧禁止挖坟。">回复</button>
        <button class="tbbtn" data-act="toast" data-msg="该功能需要登录。">分享</button>
      </div>
      ${body}
    </div>
    <div class="tb-foot">
      上一页　<b>1</b>　2　3　…　5　下一页　·　尾页　·　共 5 页
    </div>
  </div>

</div>`;
  }
};


VG.sites['radio'] = {
  render(s) {
    const D = VG.data;
    const R = s.rc || { b1: 1, b2: 0, b3: 2, b4: 0 };   
    const rc = calcResistor(R, D.rcColors);
    const f0 = (s.wlFreq === undefined ? 7.050 : s.wlFreq);
    const wl = calcWave(f0, D.radioBands);

    
    const digitOpts = (sel) => D.rcColors.map(([n, v, c], i) =>
      `<option value="${i}" ${i === sel ? 'selected' : ''}>${n}</option>`).join('');
    const multOpts = (sel) => D.rcColors.map(([n, v, c], i) =>
      `<option value="${i}" ${i === sel ? 'selected' : ''}>${n}</option>`).join('')
      + `<option value="10" ${sel === 10 ? 'selected' : ''}>金 ×0.1</option>`
      + `<option value="11" ${sel === 11 ? 'selected' : ''}>银 ×0.01</option>`;
    const tolOpts = (sel) => [
      [0, '棕 ±1%'], [2, '红 ±2%'], [5, '绿 ±0.5%'],
      [10, '金 ±5%'], [11, '银 ±10%']
    ].map(([v, n]) => `<option value="${v}" ${v === sel ? 'selected' : ''}>${n}</option>`).join('');

    
    const bandFill = (i) => D.rcColors[i] ? D.rcColors[i][2]
      : (i === 10 ? '#c9a227' : '#b8b8b8');
    const resistor = `
      <svg class="rc-svg" viewBox="0 0 300 78" xmlns="http://www.w3.org/2000/svg">
        <line x1="0" y1="39" x2="62" y2="39" stroke="#9aa89a" stroke-width="3"/>
        <line x1="238" y1="39" x2="300" y2="39" stroke="#9aa89a" stroke-width="3"/>
        <rect x="62" y="17" width="176" height="44" rx="20"
              fill="#e8d6b0" stroke="#b8a680" stroke-width="1.5"/>
        <rect x="62" y="17" width="176" height="14" rx="7" fill="#f2e6c8" opacity=".65"/>
        <rect x="88"  y="17" width="15" height="44" fill="${bandFill(R.b1)}"/>
        <rect x="114" y="17" width="15" height="44" fill="${bandFill(R.b2)}"/>
        <rect x="140" y="17" width="15" height="44" fill="${bandFill(R.b3)}"/>
        <rect x="196" y="17" width="15" height="44" fill="${bandFill(R.b4)}"/>
        <rect x="76"  y="17" width="2"  height="44" fill="#000" opacity=".08"/>
      </svg>`;

    const log = D.radioLog.map(([t, txt]) => {
      const abn = /异常/.test(txt);
      return `<tr class="${abn ? 'abn' : ''}">
        <td class="t">${t}</td>
        <td>${txt.replace('异常', '<span class="tag">异常</span>')}</td>
      </tr>`;
    }).join('');

    const qTable = D.radioQ.map(([k, v]) =>
      `<tr><td>${k}</td><td>${v}</td></tr>`).join('');
    const pfTable = D.radioPrefix.map(([k, v]) =>
      `<tr><td>${k}</td><td>${v}</td></tr>`).join('');
    const abTable = D.radioAbbr.map(([k, v]) =>
      `<tr><td>${k}</td><td>${v}</td></tr>`).join('');

    return `
<div class="rs">
  <div class="rs-head">
    <div class="rs-head-top">
      <div>
        <div class="rs-logo">发烧友<b>之家</b></div>
        <div class="rs-slogan">BG6QKX · 河南槐桥 · 业余无线电工具与资料</div>
      </div>
      <div class="b88row">${b88row([
        { label: '槐桥信息港', route: 'hq-info', bg: '#12402a', fg: '#7fe0a0' },
        { label: '槐桥吧', route: 'tieba', bg: '#2f6ba8', fg: '#ffe45c' }
      ])}</div>
    </div>
    <div class="rs-tabs">
      <a class="on" data-act="toast" data-msg="你已经在首页了。">首 页</a>
      <a data-act="rs-jump" data-to="rs-tools">在线工具</a>
      <a data-act="rs-jump" data-to="rs-ref">资料速查</a>
      <a data-act="rs-jump" data-to="rs-log">收听日志</a>
      <a data-act="rs-jump" data-to="rs-about">关于本站</a>
    </div>
  </div>

  <div class="rs-body">

    <div class="rs-cols" id="rs-tools">
      <!-- ── 工具 1：电阻色环 ── -->
      <div class="rs-box rs-tool">
        <h3>电 阻 色 环 计 算 器 <span class="sub">四色环</span></h3>
        <div class="bd">
          ${resistor}
          <div class="rc-bands">
            <div class="rs-field"><span class="k">第 1 环</span>
              <select id="rc-b1" data-band="b1">${digitOpts(R.b1)}</select></div>
            <div class="rs-field"><span class="k">第 2 环</span>
              <select id="rc-b2" data-band="b2">${digitOpts(R.b2)}</select></div>
            <div class="rs-field"><span class="k">倍率环</span>
              <select id="rc-b3" data-band="b3">${multOpts(R.b3)}</select></div>
            <div class="rs-field"><span class="k">误差环</span>
              <select id="rc-b4" data-band="b4">${tolOpts(R.b4)}</select></div>
          </div>
          <div class="rs-lcd" style="margin-top:9px" id="rc-out">${rc}</div>
          <p class="note" style="margin-top:8px">
            ※ 第 1、2 环是有效数字，第 3 环是倍率，第 4 环是误差。<br>
            ※ 反过来用也行：手上有只电阻，看颜色读出阻值。
          </p>
        </div>
      </div>

      <!-- ── 工具 2：波长 / 天线 ── -->
      <div class="rs-box rs-tool">
        <h3>波 长 与 天 线 长 度 <span class="sub">λ = 300 / f</span></h3>
        <div class="bd">
          <div class="rs-field">
            <span class="k">频率</span>
            <input type="text" id="wl-f" value="${f0}" size="9">
            <span style="color:#5a6a5e">MHz</span>
            <button class="btn98" data-act="wl-calc">计 算</button>
          </div>
          <div class="rs-lcd" id="wl-out">
            <div class="rs-lcd-row"><span><span class="lbl">波长</span>λ</span>
              <span>${wl.lam} m</span></div>
            <div class="rs-lcd-row"><span><span class="lbl">半波振子</span>λ/2</span>
              <span>${wl.half} m</span></div>
            <div class="rs-lcd-row"><span><span class="lbl">四分之一波</span>λ/4</span>
              <span>${wl.quarter} m</span></div>
            <div class="rs-lcd-row"><span><span class="lbl">八分之五波</span>5λ/8</span>
              <span>${wl.five8} m</span></div>
            <div class="rs-lcd-row"><span><span class="lbl">计入缩短系数</span>×0.95</span>
              <span>${wl.short} m</span></div>
            <div class="rs-lcd-row"><span><span class="lbl">波段</span></span>
              <span>${wl.band}</span></div>
          </div>
          <p class="note" style="margin-top:8px">
            ※ 实际架天线还要算缩短系数（一般取 0.95 左右）和离地高度。<br>
            ※ 常用频点：7.050（40 米）　14.270（20 米）　21.400（15 米）
          </p>
        </div>
      </div>
    </div>

    <div class="rs-cols" id="rs-ref">
      <!-- ── 资料速查 ── -->
      <div class="rs-box">
        <h3>资 料 速 查</h3>
        <div class="bd">
          <ul class="rs-links">
            <li><a data-act="go" data-route="morse">▶ 摩斯电码对照表</a>
              <span class="d">—— 字母 A–Z 与数字 0–9，抄一遍就记住了</span></li>
            <li><a data-act="rs-jump" data-to="rs-q">Q 简语速查表</a>
              <span class="d">—— 通联时最常用的十几个</span></li>
            <li><a data-act="rs-jump" data-to="rs-pf">呼号前缀对照表</a>
              <span class="d">—— 听呼号就知道是哪个国家</span></li>
            <li><a data-act="rs-jump" data-to="rs-ab">常用英文缩写</a>
              <span class="d">—— 73、CQ、QTH 之类的</span></li>
          </ul>
          <p class="note" style="margin-top:9px">
            ※ 本站资料都是自己整理的，随便转载，注明出处即可。<br>
            ※ 有想补充的，按首页底下的地址写信给我。
          </p>
        </div>
      </div>

      <div class="rs-box" id="rs-q">
        <h3>Q 简 语 速 查</h3>
        <div class="bd"><table class="rs-mini">${qTable}</table></div>
      </div>
    </div>

    <!-- 第二行：两张短表并排，免得右栏拖太长、左下空一大片 -->
    <div class="rs-cols">
      <div class="rs-box" id="rs-pf">
        <h3>呼 号 前 缀</h3>
        <div class="bd"><table class="rs-mini">${pfTable}</table></div>
      </div>
      <div class="rs-box" id="rs-ab">
        <h3>常 用 缩 写</h3>
        <div class="bd"><table class="rs-mini">${abTable}</table></div>
      </div>
    </div>

    <!-- ── 敲击码对照表 ──
         和摩斯电码并列的一份资料。5×5 方阵，报一个字母就敲"行数 + 列数"。 -->
    <div class="rs-box" id="rs-tap">
      <h3>敲 击 码 对 照 表 <span class="sub">Tap Code · 五方格密码</span></h3>
      <div class="bd">
        <div class="tap-wrap">
          <table class="tap-grid">
            <tr><th></th>${[1, 2, 3, 4, 5].map(n => `<th>${n}</th>`).join('')}</tr>
            ${TAP_ROWS.map((row, i) => `<tr>
              <th>${i + 1}</th>
              ${row.map(ch => `<td>${ch}</td>`).join('')}
            </tr>`).join('')}
          </table>
          <div class="tap-txt">
            <p>把 25 个字母排进一个 5×5 的方阵，然后用"敲几下"来报字母。</p>
            <p>报一个字母，先敲<b>行数</b>，停一下，再敲<b>列数</b>。<br>
               比如 <b>S</b> 在第 4 行第 3 列，就敲 4 下、停、敲 3 下，记作
               <b class="code">43</b>。</p>
            <p>对方听声音就能记下来。战俘营里就靠这个传话 ——
               不用纸笔，隔着墙敲就行。</p>
            <p class="note">
              ※ I 和 J 共用一格，因为一共只有 25 格。<br>
              ※ 常听的一句：<b class="code">43 34 43</b>（S O S）
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- ── 收听日志 ──
         ★ v1.1 起删掉了录音回放。
           站长录到过东西，但那段磁带没了 —— 日志本身就是全部。 -->
    <div class="rs-box" id="rs-log">
      <h3>收 听 日 志 <span class="sub">本站所有记录均为本人实地接收</span></h3>
      <div class="bd">
        <table class="rs-table">
          <tr><th style="width:132px">时间</th><th>内容</th></tr>
          ${log}
        </table>
        <p class="note" style="margin-top:9px">
          ※ 1999 年 8 月那两条我自己也解释不了，就照实记下来了。<br>
          ※ 那年录的那盘磁带受潮了，现在放不出声音。
        </p>
      </div>
    </div>

    <!-- ── 关于本站 ── -->
    <div class="rs-box" id="rs-about">
      <h3>关 于 本 站</h3>
      <div class="bd">
        <div class="rs-about">
          ${VG.illus.avatar('radio')}
          <div class="txt">
            <p>槐桥镇人，1998 年开始玩短波，呼号 <b>BG6QKX</b>。
               白天在镇上修电器，晚上听机器。</p>
            <p>这台机器的中波部分是自己绕的线圈，不太好，凑合听。
               有想交换 QSL 卡片的，按首页底下的地址寄过来就行。</p>
            <p class="hi">1999 年 8 月 14 日那一晚，镇上停电。
               我用电池接着录，只录到 47 秒，磁带就受潮了。</p>
          </div>
        </div>
      </div>
    </div>

    ${VG.ads.slot('radio-foot', 'radio', { w: 440 })}
    <div class="rs-counter">你 是 第 0 0 8 1 2 位 访 客</div>
    <div class="rs-foot">
      发烧友之家 · 建于 1998 年 4 月 · 用 FrontPage 做的，见谅<br>
      本站不收集任何个人信息　|　最后更新 2001-11-04
    </div>
  </div>
</div>`;
  },

  after(s) {
    
    document.querySelectorAll('.rc-bands select').forEach(el => {
      el.addEventListener('change', () => VG.actions['rc-set'](el));
    });

    const wlBox = document.getElementById('wl-f');
    if (wlBox) {
      wlBox.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') { e.preventDefault(); VG.actions['wl-calc'](); }
      });
      if (VG.state._wlFocus) {
        wlBox.focus();
        try { wlBox.setSelectionRange(wlBox.value.length, wlBox.value.length); } catch (e) {}
        VG.state._wlFocus = false;
      }
    }
    
    if (VG.state._rcFocus) {
      const el = document.getElementById('rc-' + VG.state._rcFocus);
      if (el) el.focus();
      VG.state._rcFocus = '';
    }
  }
};


const TAP_ROWS = [
  ['A', 'B', 'C', 'D', 'E'],
  ['F', 'G', 'H', 'I', 'K'],
  ['L', 'M', 'N', 'O', 'P'],
  ['Q', 'R', 'S', 'T', 'U'],
  ['V', 'W', 'X', 'Y', 'Z']
];


function calcResistor(R, colors) {
  const d1 = R.b1 <= 9 ? R.b1 : 0;
  const d2 = R.b2 <= 9 ? R.b2 : 0;
  let mul;
  if (R.b3 === 10) mul = 0.1;
  else if (R.b3 === 11) mul = 0.01;
  else mul = Math.pow(10, R.b3 || 0);

  const ohm = (d1 * 10 + d2) * mul;
  const tolMap = { 0: '±1%', 2: '±2%', 5: '±0.5%', 10: '±5%', 11: '±10%' };
  const tol = tolMap[R.b4] || '±5%';

  let v, unit;
  if (ohm >= 1e6) { v = ohm / 1e6; unit = 'MΩ'; }
  else if (ohm >= 1e3) { v = ohm / 1e3; unit = 'kΩ'; }
  else { v = ohm; unit = 'Ω'; }
  const num = (Math.round(v * 1000) / 1000).toString();

  return `<div class="rs-lcd-row"><span><span class="lbl">阻值</span>R</span>
    <span>${num} ${unit} ${tol}</span></div>`;
}


function calcWave(f, bands) {
  f = parseFloat(f);
  if (!f || f <= 0) {
    return { lam: '—', half: '—', quarter: '—', five8: '—', short: '—', band: '—' };
  }
  const lam = 300 / f;
  const n = (x) => (Math.round(x * 100) / 100).toFixed(2);
  let band = '（不在常用业余波段内）';
  for (const [lo, hi, name] of (bands || [])) {
    if (f >= lo && f <= hi) { band = name + '波段'; break; }
  }
  return {
    lam: n(lam), half: n(lam / 2), quarter: n(lam / 4),
    five8: n(lam * 0.625), short: n(lam / 2 * 0.95), band: band
  };
}



VG.actions['go'] = (el) => {
  VG.audio.click();
  VG.engine.navigate(el.getAttribute('data-route'));
};

VG.actions['toast'] = (el) => VG.ui.toast(el.getAttribute('data-msg') || '（没有反应）', 1800);

VG.actions['note'] = () => {
  VG.audio.click();
  VG.ui.dialog({ title: '提示', body: '桌面上没有这个文件。' });
};

VG.actions['mydocs'] = () => {
  VG.audio.click();
  VG.ui.dialog({
    title: '我的文档',
    width: 400,
    body: `<div style="line-height:2.1;color:#666">（空）</div>`
  });
};




VG.actions['secret-open'] = () => {
  VG.audio.click();
  if (VG.state.secretUnlocked) { showSecretFolder(); return; }

  const F = VG.data.secretFolder;
  VG.ui.dialog({
    title: F.name,
    width: 400,
    body: `<div style="line-height:2.1">
      <b>${F.prompt}</b><br><br>
      <div style="display:flex;align-items:center;gap:10px">
        <span style="flex:0 0 auto">密码</span>
        <input id="sec-pw" maxlength="16" autocomplete="off" spellcheck="false"
               style="flex:1;font-family:var(--mono);letter-spacing:3px">
      </div>
      <div id="sec-err" style="color:#a02020;font-size:11px;min-height:18px;margin-top:10px"></div>
    </div>`,
    buttons: ['确定', '取消'],
    
    onButton: (i) => {
      if (i === 1) return false;
      const el = document.getElementById('sec-pw');
      const v = ((el && el.value) || '').trim().toUpperCase();
      if (v === F.pass) {
        VG.state.secretUnlocked = true;
        VG.save();
        VG.audio.chime();
        const ov = document.getElementById('overlay');
        ov.classList.add('hidden'); ov.innerHTML = '';
        setTimeout(showSecretFolder, 150);
        return false;
      }
      const err = document.getElementById('sec-err');
      if (err) err.textContent = v ? '密码不正确。' : '';
      VG.audio.errorDing();
      if (el) el.select();
      return true;
    }
  });
  
  setTimeout(() => {
    const el = document.getElementById('sec-pw');
    if (!el) return;
    el.focus();
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        const b = document.querySelector('#overlay [data-dlg-btn="0"]');
        if (b) b.click();
      }
    });
  }, 60);
};


function showMyWorld() {
  const W = VG.data.myWorld;
  const ov = document.getElementById('overlay');

  const blocks = W.blocks.map(b => {
    if (b.mail) {
      
      return `<div class="mw-block mw-mailbox">
        <h4>${b.h}</h4>
        <div class="mw-mail">
          <a data-act="go" data-route="xunle">${esc(W.email)}</a>
        </div>
      </div>`;
    }
    return `<div class="mw-block"><h4>${b.h}</h4>
      <div class="mw-txt">${esc(b.t)}</div></div>`;
  }).join('');

  const flowers = W.flowers.map((f, i) => {
    const on = (VG.state.bloomed || []).indexOf(i) >= 0;
    return `<button class="mw-flower${on ? ' on' : ''}" data-act="bloom" data-i="${i}"
      style="left:${f.x}%;top:${f.y}%" title="">${VG.illus.flower(on, f.hue)}</button>`;
  }).join('');

  const n = (VG.state.bloomed || []).length;
  const allOpen = n >= W.flowers.length;

  ov.innerHTML = `
    <div class="mw-screen">
      <div class="mw-win">
        <div class="dlg-titlebar">
          <span>我的小天地.htm - 图片查看器</span>
          <button class="tb-btn close" data-dlg-close>×</button>
        </div>
        <div class="mw-scroll">
          <div class="mw-page">
            ${flowers}
            <div class="mw-inner">
              <div class="mw-title">${W.title}</div>
              <div class="mw-sub">${W.sub}</div>
              <div class="mw-rule"></div>
              ${blocks}
              <div class="mw-note${allOpen ? ' on' : ''}" id="mw-note">
                <div class="mw-note-in">
                  <div class="mw-note-h">${W.noteTitle}</div>
                  <div class="mw-note-p">${esc(W.notePass)}</div>
                </div>
              </div>
              <div class="mw-counter">你是第 ${'00184'} 位来访者</div>
            </div>
          </div>
        </div>
        <div class="expbar">
          ${allOpen ? '5 / 5 朵花开了' : (n ? n + ' / 5 朵花开了' : '　')}
        </div>
        <div class="dlg-btns"><button class="btn98" data-dlg-close>关闭</button></div>
      </div>
    </div>`;
  ov.classList.remove('hidden');
  ov.onclick = (e) => {
    if (e.target === ov || e.target.hasAttribute('data-dlg-close')) {
      ov.classList.add('hidden'); ov.innerHTML = '';
    }
  };
}


VG.actions['bloom'] = (el) => {
  const i = parseInt(el.getAttribute('data-i'), 10);
  VG.state.bloomed = VG.state.bloomed || [];
  if (VG.state.bloomed.indexOf(i) >= 0) { VG.audio.click(); return; }  

  VG.state.bloomed.push(i);
  VG.save();
  VG.audio.chime();

  const all = VG.state.bloomed.length >= (VG.data.myWorld.flowers || []).length;
  
  el.classList.add('on');
  el.innerHTML = VG.illus.flower(true, VG.data.myWorld.flowers[i].hue);
  const bar = document.querySelector('.mw-screen .expbar');
  if (bar) bar.textContent = VG.state.bloomed.length + ' / 5 朵花开了';

  if (all) {
    const note = document.getElementById('mw-note');
    if (note) {
      note.classList.add('on');
      
      setTimeout(() => note.scrollIntoView({ behavior: 'smooth', block: 'center' }), 260);
    }
    setTimeout(() => VG.ui.toast('五朵都开了。', 2400), 500);
  }
};


function openSecretPage(f) {
  if (f.page === 'myWorld') showMyWorld();
}


function showSecretFolder() {
  const F = VG.data.secretFolder;
  const files = VG.data.secretFiles || [];
  const rows = files.map(f => {
    const locked = f.kind === 'locked' && !VG.state['unlocked_' + f.id];
    return `<tr data-dbl="secret-open-file" data-selectable data-file="${f.id}">
      <td class="ri">${VG.illus.fileIcon(locked ? 'lock' : (f.icon || 'img'))}</td>
      <td class="rn">${esc(f.name)}.${esc(f.ext || 'jpg')}</td>
      <td class="rf">${locked ? '已加密' : esc(f.type || 'JPEG 图像')}</td>
      <td class="rd">${esc(f.date || '')}</td>
      <td class="rs">${locked ? '——' : esc(f.size || '')}</td>
    </tr>`;
  }).join('');

  const ov = document.getElementById('overlay');
  ov.innerHTML = `
    <div class="dlg" style="width:560px">
      <div class="dlg-titlebar"><span>${F.name}</span>
        <button class="tb-btn close" data-dlg-close>×</button></div>
      <div class="menubar" style="flex:none">
        <span class="menu-item">文件(F)</span><span class="menu-item">编辑(E)</span>
        <span class="menu-item">查看(V)</span><span class="menu-item">帮助(H)</span>
      </div>
      <div class="explorer">
        <table class="rtable">
          <tr><th class="ri"></th><th class="rn">名称</th><th class="rf">类型</th>
              <th class="rd">修改日期</th><th class="rs">大小</th></tr>
          ${rows}
        </table>
      </div>
      <div class="expbar">${files.length} 个对象　·　双击文件名可以查看</div>
      <div class="dlg-btns"><button class="btn98" data-dlg-close>关闭</button></div>
    </div>`;
  ov.classList.remove('hidden');
  ov.onclick = (e) => {
    if (e.target === ov || e.target.hasAttribute('data-dlg-close')) {
      ov.classList.add('hidden'); ov.innerHTML = '';
    }
  };
}


VG.actions['secret-open-file'] = (row) => {
  const f = (VG.data.secretFiles || []).find(x => x.id === row.getAttribute('data-file'));
  if (!f) return;
  VG.audio.click();
  if (f.kind === 'locked' && !VG.state['unlocked_' + f.id]) { showPhotoLock(f); return; }
  if (f.page) { openSecretPage(f); return; }        
  showPhotoViewer(f);
};


function showPhotoViewer(f) {
  const ov = document.getElementById('overlay');
  ov.innerHTML = `
    <div class="dlg" style="width:640px">
      <div class="dlg-titlebar"><span>${esc(f.name)}.jpg - 图片查看器</span>
        <button class="tb-btn close" data-dlg-close>×</button></div>
      <div class="pv-body">
        <img class="pv-img" src="${VG.illus.assetFile('photos', f.asset)}" alt=""
             onerror="this.style.display='none';
                      this.nextElementSibling.style.display='block'">
        <div class="pv-fail" style="display:none">（图片读不出来了。）</div>
      </div>
      <div class="expbar">${esc(f.name)}.jpg　·　${esc(f.size || '')}　·　${esc(f.date || '')}</div>
      <div class="dlg-btns">
        <button class="btn98" data-dlg-close>关闭</button>
      </div>
    </div>`;
  ov.classList.remove('hidden');
  ov.onclick = (e) => {
    if (e.target === ov || e.target.hasAttribute('data-dlg-close')) {
      ov.classList.add('hidden'); ov.innerHTML = '';
    }
  };
}


function showPhotoLock(f) {
  const KEYS = [
    'QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM'
  ];
  const pad = KEYS.map(row =>
    `<div class="kb-row">${row.split('').map(c =>
      `<button class="kb-key" data-act="kb-key" data-ch="${c}">${c}</button>`).join('')}</div>`
  ).join('');

  const ov = document.getElementById('overlay');
  ov.innerHTML = `
    <div class="dlg" style="width:452px">
      <div class="dlg-titlebar"><span>${esc(f.name)}.${esc(f.ext || 'jpg')}</span>
        <button class="tb-btn close" data-dlg-close>×</button></div>
      <div class="lk-body">
        <div class="lk-head">
          <div class="lk-icon">🔒</div>
          <div>
            <b>这个文件已加密。</b><br>
            <span class="lk-sub">请输入英文密码。（点下面的键盘）</span>
          </div>
        </div>
        <input class="lk-input" id="lk-input" readonly value=""
               placeholder="${'＿'.repeat(8)}">
        <div class="kb" id="lk-pad">${pad}</div>
        <div class="lk-btns">
          <button class="btn98" data-act="kb-del">← 退格</button>
          <button class="btn98" data-act="kb-clear">清 除</button>
          <button class="btn98" data-act="kb-enter">确 定</button>
        </div>
        <div class="lk-err" id="lk-err"></div>
      </div>
    </div>`;
  ov.classList.remove('hidden');
  ov.onclick = (e) => {
    if (e.target === ov || e.target.hasAttribute('data-dlg-close')) {
      ov.classList.add('hidden'); ov.innerHTML = '';
    }
  };
  VG.state._lockId = f.id;
}


VG.actions['kb-key'] = (el) => {
  VG.audio.click();
  const inp = document.getElementById('lk-input');
  if (!inp || inp.value.length >= 16) return;
  inp.value += el.getAttribute('data-ch');
  const err = document.getElementById('lk-err');
  if (err) err.textContent = '';
};
VG.actions['kb-del'] = () => {
  VG.audio.click();
  const inp = document.getElementById('lk-input');
  if (inp) inp.value = inp.value.slice(0, -1);
};
VG.actions['kb-clear'] = () => {
  VG.audio.click();
  const inp = document.getElementById('lk-input');
  if (inp) inp.value = '';
  const err = document.getElementById('lk-err');
  if (err) err.textContent = '';
};
VG.actions['kb-enter'] = () => {
  const inp = document.getElementById('lk-input');
  const err = document.getElementById('lk-err');
  const f = (VG.data.secretFiles || []).find(x => x.id === VG.state._lockId);
  if (!inp || !f) return;
  const v = inp.value.trim().toUpperCase();
  if (!v) { if (err) err.textContent = '请先输入密码。'; return; }

  if (v === String(f.pass).toUpperCase()) {
    VG.state['unlocked_' + f.id] = true;
    VG.save();
    VG.audio.chime();
    const ov = document.getElementById('overlay');
    ov.classList.add('hidden'); ov.innerHTML = '';
    setTimeout(() => {
      
      if (f.page) openSecretPage(f);
      else if (f.asset) showPhotoViewer(f);
      else {
        VG.ui.dialog({
          title: esc(f.name) + '.' + esc(f.ext || 'jpg'),
          width: 380,
          body: `<div style="padding:36px 0;text-align:center;color:#666">
                   ${esc(VG.data.secretFolder.empty)}</div>`
        });
      }
    }, 160);
    return;
  }
  VG.audio.errorDing();
  if (err) err.textContent = '密码不正确。';
  inp.value = '';
};


VG.actions['recycle'] = () => {
  VG.audio.click();
  const files = VG.data.recycleFiles;
  
  const rows = files.map(f => `
    <tr data-dbl="recycle-open" data-selectable data-file="${f.id}">
      <td class="ri">${VG.illus.fileIcon(f.icon)}</td>
      <td class="rn">${f.name}</td>
      <td class="rf">${f.from}</td>
      <td class="rd">${f.del}</td>
      <td class="rs">${f.size}</td>
    </tr>`).join('');

  const ov = document.getElementById('overlay');
  ov.innerHTML = `
    <div class="dlg" style="width:600px">
      <div class="dlg-titlebar"><span>回收站</span>
        <button class="tb-btn close" data-dlg-close>×</button></div>
      <div class="menubar" style="flex:none">
        <span class="menu-item">文件(F)</span><span class="menu-item">编辑(E)</span>
        <span class="menu-item">查看(V)</span><span class="menu-item">帮助(H)</span>
      </div>
      <div class="explorer">
        <table class="rtable">
          <tr><th class="ri"></th><th class="rn">名称</th><th class="rf">原位置</th>
              <th class="rd">删除日期</th><th class="rs">大小</th></tr>
          ${rows}
        </table>
      </div>
      <div class="expbar">${files.length} 个对象　·　双击文件名可以查看</div>
      <div class="dlg-btns">
        <button class="btn98" data-act="recycle-restore">还原此项目</button>
        <button class="btn98" data-act="recycle-empty">清空回收站</button>
        <button class="btn98" data-dlg-close>关闭</button>
      </div>
    </div>`;
  ov.classList.remove('hidden');
  ov.onclick = (e) => {
    if (e.target === ov || e.target.hasAttribute('data-dlg-close')) {
      ov.classList.add('hidden'); ov.innerHTML = '';
    }
  };
};


VG.actions['recycle-open'] = (row) => {
  const id = row.getAttribute('data-file');
  const f = VG.data.recycleFiles.find(x => x.id === id);
  if (!f) return;
  VG.audio.click();

  if (f.kind === 'none') {
    VG.ui.notepad(f.name, '<span style="color:#888">（系统文件，无法以文本方式打开。）</span>', true);
    return;
  }
  if (f.kind === 'image') {
    VG.state.readClip = true;
    VG.save();
    const ov = document.getElementById('overlay');
    ov.innerHTML = `
      <div class="dlg" style="width:520px">
        <div class="dlg-titlebar"><span>${f.name} - 图片查看器</span>
          <button class="tb-btn close" data-dlg-close>×</button></div>
        <div class="dlg-body" style="background:#3a3a3a">
          <div style="display:flex;justify-content:center">
            ${VG.illus.slot('hairclip', VG.illus.hairclip(), 320)}
          </div>
          <div style="color:#bbb;font-size:11px;line-height:2;margin-top:12px;white-space:pre-wrap">${
            VG.data.clipText.replace(/&/g, '&amp;').replace(/</g, '&lt;')}</div>
        </div>
        <div class="dlg-btns"><button class="btn98" data-dlg-close>关闭</button></div>
      </div>`;
    ov.classList.remove('hidden');
    ov.onclick = (e) => {
      if (e.target === ov || e.target.hasAttribute('data-dlg-close')) {
        ov.classList.add('hidden'); ov.innerHTML = '';
      }
    };
    return;
  }

  
  VG.state.readDiary = true;
  VG.save();
  const ov = document.getElementById('overlay');
  ov.innerHTML = `
    <div class="dlg" style="width:560px">
      <div class="dlg-titlebar"><span>${f.name} - 记事本</span>
        <button class="tb-btn close" data-dlg-close>×</button></div>
      <div class="dlg-body">
        <div class="notepad" style="font-family:var(--kai);font-size:14.5px;line-height:1.95;
             white-space:pre-wrap;max-height:none">${
          VG.data.diary.replace(/&/g, '&amp;').replace(/</g, '&lt;')}</div>
      </div>
      <div class="dlg-btns">
        <button class="btn98" data-act="diary-close">关闭</button>
      </div>
    </div>`;
  ov.classList.remove('hidden');
  ov.onclick = (e) => {
    if (e.target === ov || e.target.hasAttribute('data-dlg-close')) {
      ov.classList.add('hidden'); ov.innerHTML = '';
    }
  };
};

VG.actions['diary-close'] = () => {
  const ov = document.getElementById('overlay');
  ov.classList.add('hidden'); ov.innerHTML = '';
  
  VG.ui.toast('（你把这一页看完了。）', 2200);
};

VG.actions['recycle-restore'] = () => VG.ui.toast('没有选定要还原的项目。', 1800);

VG.actions['recycle-empty'] = () => {
  VG.audio.errorDing();
  VG.ui.dialog({
    title: '确认删除',
    body: '确实要删除这 3 个项目吗？<br><br>'
        + '<span style="color:#666">（你按了"否"。有些东西删掉就真的没有了。）</span>',
    buttons: ['是', '否']
  });
};

VG.actions['deadlink'] = () => {
  VG.audio.errorDing();
  VG.ui.dialog({
    title: 'Microsoft Internet Explorer',
    body: '无法打开 Internet 站点 <b>http://bbs.hq-info.com.cn/</b>。<br><br>'
        + '该站点可能暂时不可用，或者您的网络连接有问题。<br><br>'
        + '<span style="color:#666;font-size:11px">如果您是管理员，请检查服务器设置。</span>'
  });
};

VG.actions['deadlink2'] = () => {
  VG.audio.errorDing();
  VG.ui.dialog({ title: 'Microsoft Internet Explorer',
    body: '无法打开 Internet 站点。该链接已失效。' });
};


VG.actions['b88'] = (el) => {
  const r = el.getAttribute('data-route');
  const label = el.getAttribute('data-label');
  if (String(r).indexOf('dead-') === 0) {
    VG.audio.errorDing();
    VG.ui.dialog({
      title: 'Microsoft Internet Explorer',
      body: `无法打开 Internet 站点 <b>${label}</b>。<br><br>该链接已失效。`
    });
  } else {
    VG.audio.click();
    VG.engine.navigate(r);
  }
};


VG.actions['pt-search'] = (el) => {
  VG.audio.click();
  const box = document.getElementById('pt-q');
  const q = (el && el.getAttribute('data-q')) || (box && box.value) || '';
  const s = String(q).trim();
  if (!s) { VG.ui.toast('请输入关键词。', 1600); return; }
  if (box) box.value = s;
  VG.state.lastSearch = s;
  VG.engine.replace('portal');
  VG.ui.setStatus('搜索完成', 'Internet');
};

VG.actions['pt-clear'] = () => {
  VG.audio.click();
  VG.state.lastSearch = '';
  VG.engine.replace('portal');
};


VG.actions['dead-link'] = (el) => {
  VG.audio.errorDing();
  const host = el.getAttribute('data-host') || el.textContent || '';
  VG.ui.dialog({
    title: 'Microsoft Internet Explorer',
    body: `无法打开 Internet 站点 <b>${esc(host)}</b>。<br><br>
           该网站可能已关闭，或本机网络暂时不通。<br>
           <span style="color:#666">请稍后再试，或换一个网站。</span>`
  });
};


VG.actions['zoom-slot'] = (el) => {
  VG.audio.click();
  const html = el.innerHTML;
  VG.ui.zoom(`<div style="width:min(92vw,860px);max-height:92vh;overflow:auto">${html}</div>`);
};


VG.actions['tieba-lz'] = () => {
  VG.audio.click();
  const was = !!VG.state.tiebaLzOnly;
  VG.state.tiebaLzOnly = !was;
  if (!was) {
    if (!VG.state.solved['p22-tieba-47']) {
      VG.state.solved['p22-tieba-47'] = true;
      setTimeout(() => VG.ui.toast('第 47 楼出现了。', 2600), 400);
      setTimeout(() => VG.audio.errorDing(true), 900);
    }
  }
  VG.save();
  VG.engine.replace('tieba-post');
};


VG.actions['rc-set'] = (el) => {
  VG.audio.click();
  const band = el.getAttribute('data-band');
  VG.state.rc = VG.state.rc || { b1: 1, b2: 0, b3: 2, b4: 0 };
  VG.state.rc[band] = parseInt(el.value, 10) || 0;
  VG.state._rcFocus = band;          
  VG.state._wlFocus = false;
  VG.engine.replace('radio');

  
  if (!VG.state.mysteryDone && rcIsMystery(VG.state.rc)) {
    setTimeout(runMysteryDownload, 320);
  }
};


VG.actions['wl-calc'] = () => {
  VG.audio.click();
  const box = document.getElementById('wl-f');
  const v = parseFloat((box && box.value) || '');
  if (!v || v <= 0) {
    VG.ui.toast('请输入一个大于 0 的频率（MHz）。', 2200);
    VG.audio.errorDing();
    
    
    if (box) {
      box.value = (VG.state.wlFreq === undefined ? 7.050 : VG.state.wlFreq);
      box.select();
    }
    return;
  }
  VG.state.wlFreq = Math.round(v * 10000) / 10000;
  VG.state._wlFocus = true;
  VG.engine.replace('radio');
};


VG.actions['rs-jump'] = (el) => {
  VG.audio.click();
  const t = document.getElementById(el.getAttribute('data-to'));
  if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

VG.actions['more-notice'] = (el) => {
  VG.audio.click();
  const box = document.getElementById('hq-more');
  if (!box) return;
  const open = box.style.display !== 'none';
  box.style.display = open ? 'none' : 'block';
  el.textContent = open ? '更多公告 ▼' : '收起公告 ▲';
  if (!open) VG.state.solved['p03-invite'] = true;
  VG.save();
};


VG.actions['open-reg'] = () => {
  VG.audio.click();
  VG.ui.dialog({
    title: '新用户注册',
    width: 380,
    body: `<div style="line-height:2.2">
      <div>用户名 <input id="rg-name" style="width:150px;margin-left:8px"></div>
      <div>密　码 <input id="rg-pass" type="password" style="width:150px;margin-left:8px"></div>
      <div>邀请码 <input id="rg-code" style="width:150px;margin-left:8px" placeholder="站内邀请码"></div>
      <div style="color:#888;font-size:11px;margin-top:8px">※ 本站不对外开放，没有邀请码无法注册。</div>
      <div id="rg-err" style="color:#cc0000;font-size:11px;min-height:18px"></div>
    </div>`,
    buttons: ['提交注册', '取消'],
    onButton: (i) => {
      if (i === 1) return false;
      const name = (document.getElementById('rg-name').value || '').trim();
      const pass = document.getElementById('rg-pass').value || '';
      const code = (document.getElementById('rg-code').value || '').trim().toUpperCase();
      const err = document.getElementById('rg-err');

      if (code !== 'HQ2000') {
        err.textContent = '邀请码不正确。';
        VG.audio.errorDing();
        return true;
      }
      if (!name) { err.textContent = '用户名不能为空。'; return true; }
      if (!pass) { err.textContent = '密码不能为空。'; return true; }

      VG.state.user.name = name;
      VG.state.user.pass = pass;
      VG.state.registered = true;
      VG.state.solved['p03-invite'] = true;
      VG.state.solved['p01-counter'] = true;
      VG.save();
      VG.audio.chime();
      VG.ui.toast('注册成功，请登录。', 1800);
      return false;
    }
  });
};

VG.actions['open-login'] = () => {
  VG.engine.replace('bbs-thread-1');
};

VG.actions['do-login'] = () => {
  const n = (document.getElementById('lg-name').value || '').trim();
  const p = document.getElementById('lg-pass').value || '';
  const err = document.getElementById('lg-err');

  if (!VG.state.registered) {
    err.textContent = '该用户名不存在。请先注册。';
    VG.audio.errorDing();
    return;
  }
  if (n !== VG.state.user.name || p !== VG.state.user.pass) {
    err.textContent = '用户名或密码不正确。';
    VG.audio.errorDing();
    return;
  }
  VG.state.loggedIn = true; VG.save();
  VG.audio.chime();
  VG.engine.replace('bbs-thread-1');
};

VG.actions['logout'] = () => { VG.state.loggedIn = false; VG.save(); VG.engine.replace('bbs'); };

VG.actions['open-thread'] = () => {
  VG.state.visitedCount['bbs-thread-1'] = (VG.state.visitedCount['bbs-thread-1'] || 0);
  VG.engine.navigate('bbs-thread-1');
};


VG.actions['xy-unlock'] = () => {
  const v = (document.getElementById('xy-pass').value || '').trim();
  const err = document.getElementById('xy-err');
  if (v === '0427') {
    VG.state.solved['p09-password'] = true;
    VG.state.solved['p01-counter'] = true;
    
    VG.state.xiaoyuUnlocked = true;
    VG.save();
    VG.audio.chime();
    VG.engine.replace('xiaoyu-in');
  } else {
    err.textContent = '口令不正确。';
    VG.audio.errorDing();
    document.getElementById('xy-pass').value = '';
  }
};

VG.actions['read-diary'] = () => {
  VG.audio.click();
  VG.state.diaryRead = (VG.state.diaryRead || 0) + 1;
  VG.save();
  VG.engine.replace('xiaoyu-in');
};


VG.actions['guest-book'] = () => {
  VG.audio.click();
  VG.state.guestbookRead = (VG.state.guestbookRead || 0) + 1;
  VG.save();
  VG.engine.replace('xiaoyu-in');

  if (VG.state.guestbookRead === 1) {
    VG.ui.toast('留言本里出现了一条新留言。', 2600);
    VG.audio.errorDing(true);
  } else if (VG.state.guestbookRead === 2) {
    VG.audio.errorDing(true);
  }
};


VG.actions['guest-post'] = () => {
  const nameEl = document.getElementById('g-name');
  const textEl = document.getElementById('g-text');
  if (!textEl) return;
  const text = (textEl.value || '').trim();
  const name = ((nameEl && nameEl.value) || '').trim() || '游客';

  if (!text) {
    VG.ui.toast('还没写内容。', 1800);
    VG.audio.errorDing();
    textEl.focus();
    return;
  }

  VG.state.myMessages = VG.state.myMessages || [];
  VG.state.myMessages.push({ name, text });
  VG.save();

  VG.audio.chime();
  VG.engine.replace('xiaoyu-in');
  
  VG.ui.toast('留言提交成功。', 1500);
  setTimeout(() => {
    if (VG.engine.currentRoute() === 'xiaoyu-in') {
      VG.ui.toast('（留言已保存。）', 2200);
    }
  }, 1700);
};


VG.actions['wa-toggle'] = (el) => {
  VG.audio.init(); VG.audio.resume();
  const lcd = document.getElementById('wa-lcd');
  const sub = document.getElementById('wa-sub');
  if (VG.audio.midiIsOn()) {
    VG.audio.midiStop();
    el.textContent = '▶'; el.classList.remove('active');
    if (lcd) lcd.textContent = '小雨.mid　[暂停]　循环';
  } else {
    VG.audio.midiStart();
    el.textContent = '❚❚'; el.classList.add('active');
    if (lcd) lcd.textContent = '小雨.mid　[00:00]　循环';
    if (sub) { sub.className = 'wa-sub'; sub.textContent = '正在播放：小雨.mid'; }
  }
};

VG.actions['wa-reverse'] = (el) => {
  VG.audio.init(); VG.audio.resume();
  const lcd = document.getElementById('wa-lcd');
  const sub = document.getElementById('wa-sub');
  VG.audio.midiStop();
  VG.audio.reverseTone();

  const play = document.getElementById('wa-play');
  if (play) { play.textContent = '▶'; play.classList.remove('active'); }
  if (lcd) lcd.textContent = '小雨.mid　[◀◀ 倒放]　';

  VG.state.solved['p10-reverse'] = true;
  VG.save();

  const msg = '……别 把 镜 子 转 过 去';
  let i = 0;
  if (sub) { sub.className = 'wa-sub rev'; sub.textContent = ''; }
  const t = setInterval(() => {
    if (!sub) return;
    sub.textContent = msg.slice(0, ++i);
    if (i >= msg.length) {
      clearInterval(t);
      setTimeout(() => VG.engine.replace('xiaoyu-in'), 1200);
    }
  }, 140);
};


VG.actions['open-video'] = () => {
  VG.audio.river(2.5);

  const body = `
    <div class="rp" style="width:100%;margin:0">
      <div class="rp-screen" style="height:180px">
        <div class="noise"></div>
        <div style="position:absolute;inset:0;display:flex;align-items:center;
                    justify-content:center;flex-direction:column;gap:8px">
          <div style="font-size:26px;color:#8a8a7a">⚠</div>
          <div style="color:#c8c8b8;font-size:12px">无法播放该文件</div>
        </div>
      </div>
      <div style="padding:10px 12px 12px;line-height:2.1;font-size:12px">
        <b>文件：</b>录像2_19990814.rm<br>
        <b>大小：</b>4.7 MB　　<b>类型：</b>RealMedia<br>
        <b>错误：</b><span style="color:#a02020" id="rp-err">文件头已丢失，无法修复。</span>
      </div>
      <div class="rp-ctrl" style="padding:0 12px 12px">
        <button class="btn98" id="rp-fix" style="padding:2px 12px">尝试修复</button>
        <span style="margin-left:8px;color:#777;font-size:11px">RealPlayer 8.0 Basic</span>
      </div>
    </div>`;

  VG.ui.dialog({
    title: 'RealPlayer - 录像2_19990814.rm',
    width: 460, body, buttons: ['关闭']
  });

  const fix = document.getElementById('rp-fix');
  const err = document.getElementById('rp-err');
  if (fix) fix.onclick = function () {
    this.disabled = true;
    this.textContent = '正在修复…';
    err.textContent = '正在扫描数据块…';
    setTimeout(() => {
      err.textContent = '文件头已丢失，无法修复。';
      this.textContent = '修复失败';
      VG.audio.errorDing();
    }, 1800);
  };
};


VG.playTape47 = () => {
  VG.audio.river(4);

  const body = `
    <div class="rp">
      <div class="rp-screen" id="rp-screen">
        <div class="noise"></div>
        <div class="scene" id="rp-scene">
          <div class="river"></div>
          <div class="lamp" style="left:22%;bottom:26%"></div>
          <div class="lamp" style="left:38%;bottom:31%"></div>
          <div class="lamp" style="left:57%;bottom:24%"></div>
          <div class="lamp" style="left:71%;bottom:29%"></div>
          <span style="position:relative;z-index:2">河南·槐桥　柳河　1999-08-14　夜</span>
        </div>
      </div>
      <div class="rp-bar" id="rp-bar"><i id="rp-fill"></i></div>
      <div class="rp-info">
        <span id="rp-time">00:00 / 00:46</span>
        <span>RealPlayer 8.0 Basic</span>
      </div>
      <div class="rp-ctrl">
        <button class="btn98" id="rp-play" style="padding:2px 10px">▶ 播放</button>
        <span style="margin-left:8px;color:#666">拖动进度条可以快进</span>
      </div>
    </div>`;

  VG.ui.dialog({ title: 'RealPlayer - 录像2_19990814.rm', width: 460, body, buttons: ['关闭'] });

  const bar = document.getElementById('rp-bar');
  const fill = document.getElementById('rp-fill');
  const time = document.getElementById('rp-time');
  const scene = document.getElementById('rp-scene');
  let cur = 0, playing = false, fired = false, timer = null;

  function setT(t) {
    cur = Math.max(0, Math.min(47, t));
    fill.style.width = ((cur / 47) * 100) + '%';
    const show = Math.min(46, Math.floor(cur));
    time.textContent = '00:' + String(show).padStart(2, '0') + ' / 00:46';
    if (cur >= 47) trigger47();
  }

  function seekFromEvent(e) {
    const r = bar.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width));
    setT(ratio * 47);
  }

  bar.onclick = seekFromEvent;
  document.getElementById('rp-play').onclick = function () {
    playing = !playing;
    this.textContent = playing ? '❚❚ 暂停' : '▶ 播放';
    if (playing) {
      clearInterval(timer);
      timer = setInterval(() => {
        if (cur >= 46) { 
          clearInterval(timer); playing = false;
          document.getElementById('rp-play').textContent = '▶ 播放';
          scene.style.opacity = '.45';
          return;
        }
        setT(cur + 0.5);
      }, 90);
    } else clearInterval(timer);
  };

  function trigger47() {
    if (fired) return;
    fired = true;
    clearInterval(timer);
    VG.state.videoWatched = true;
    VG.state.solved['p16-47'] = true;
    VG.save();

    
    const screen = document.getElementById('rp-screen');
    screen.innerHTML = '<div style="position:absolute;inset:0;background:#050505"></div>';
    time.textContent = '00:47 / 00:46';
    VG.audio.midiStop();

    setTimeout(() => {
      
      if (VG.horror.isGentle()) {
        VG.horror.flash({ gentleText: '录像到这里就没有了。' });
      } else {
        VG.horror.flash({});
      }
      setTimeout(() => {
        
        screen.innerHTML = `<div style="position:absolute;inset:0;background:#0b0d10;display:flex;align-items:center;justify-content:center">
            <svg width="120" height="180" viewBox="0 0 120 180">
              <ellipse cx="60" cy="150" rx="34" ry="12" fill="#1a1f24"/>
              <path d="M42 148 Q30 100 46 78 L74 78 Q90 100 78 148 Z" fill="#3f5a63"/>
              <ellipse cx="60" cy="76" rx="16" ry="7" fill="#22323a"/>
              <circle cx="60" cy="52" r="20" fill="#5b5a52"/>
              <ellipse cx="52" cy="48" rx="3.4" ry="2.2" fill="#0a0c0b"/>
              <ellipse cx="68" cy="48" rx="3.4" ry="2.2" fill="#0a0c0b"/>
              <path d="M52 62 Q60 66 68 62" stroke="#141414" stroke-width="2" fill="none"/>
            </svg>
          </div>`;
        time.textContent = '00:47 / 00:47';
        VG.ui.toast('录像的最后一帧。', 2600);
      }, 400);
    }, 3000);  
  }
};