// SPDX-License-Identifier: Apache-2.0
// SPDX-FileCopyrightText: 2026 Stichting TARIDE (TARIDE Foundation)
// Docs search: loads the Pagefind UI and reports settled queries to Umami.
// Served as an external 'self' script so it runs under the strict CSP
// (script-src 'self' 'wasm-unsafe-eval' https://umami.taride.org) without
// needing 'unsafe-inline'.
(function () {
  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      var s = document.createElement('script');
      s.src = src;
      s.onload = function () { resolve(); };
      s.onerror = function () { reject(new Error('failed to load ' + src)); };
      document.head.appendChild(s);
    });
  }

  // Report each settled query to Umami: 1s after typing stops, min 3 chars,
  // de-duplicated. Aggregate only; no IP, no cookies.
  function trackQueries(el) {
    var input = el.querySelector('input');
    if (!input) return;
    var timer;
    var last = '';
    input.addEventListener('input', function () {
      clearTimeout(timer);
      timer = setTimeout(function () {
        var q = input.value.trim();
        if (q.length < 3 || q === last) return;
        last = q;
        if (window.umami) window.umami.track('docs-search', { query: q });
      }, 1000);
    });
  }

  async function init() {
    var el = document.getElementById('docs-search');
    if (!el) return;
    try {
      await loadScript('/pagefind/pagefind-ui.js');
      new window.PagefindUI({
        element: '#docs-search',
        showImages: false,
        showSubResults: true,
        resetStyles: false,
        translations: {
          placeholder: 'Search the specifications',
          zero_results: 'No matches for [SEARCH_TERM]',
          one_result: '1 document matches [SEARCH_TERM]',
          many_results: '[COUNT] documents match [SEARCH_TERM]',
        },
      });
      trackQueries(el);
    } catch (e) {
      el.hidden = true;
    }
  }

  document.addEventListener('keydown', function (e) {
    if (e.key !== '/') return;
    var a = document.activeElement;
    if (a && /^(input|textarea)$/i.test(a.tagName)) return;
    var input = document.querySelector('#docs-search input');
    if (input) {
      e.preventDefault();
      input.focus();
    }
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
