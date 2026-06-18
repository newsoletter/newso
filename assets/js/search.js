// 지난 뉴소레터 제목·본문 검색 (client-side, 정적 인덱스 search.json 사용)
const input = document.querySelector(".js-article-search-input");
const resultsContainer = document.querySelector(".js-search-results");
const paginatedList = document.querySelector(".js-paginated-list");
const pagination = document.querySelector(".js-pagination");

let index = null;
let loading = null;

function getSearchUrl() {
  return (input && input.dataset.searchUrl) || "/search.json";
}

async function loadIndex() {
  if (index) return index;
  if (loading) return loading;
  loading = fetch(getSearchUrl())
    .then((res) => {
      if (!res.ok) throw new Error("search index load failed: " + res.status);
      return res.json();
    })
    .then((data) => {
      index = data.map((item) => ({
        title: item.title || "",
        url: item.url || "",
        date: item.date || "",
        content: item.content || "",
        titleLower: (item.title || "").toLowerCase(),
        contentLower: (item.content || "").toLowerCase(),
      }));
      return index;
    });
  return loading;
}

function toggle(el, show) {
  if (el) el.style.display = show ? "" : "none";
}

function showDefaultView() {
  toggle(paginatedList, true);
  toggle(pagination, true);
  toggle(resultsContainer, false);
  if (resultsContainer) resultsContainer.replaceChildren();
}

function showSearchView() {
  toggle(paginatedList, false);
  toggle(pagination, false);
  toggle(resultsContainer, true);
}

// 매칭된 부분을 <mark>로 감싼 DocumentFragment 반환 (textContent 사용으로 XSS 방지)
function highlight(text, query) {
  const frag = document.createDocumentFragment();
  const lower = text.toLowerCase();
  let from = 0;
  let idx = lower.indexOf(query, from);
  while (idx !== -1) {
    frag.appendChild(document.createTextNode(text.slice(from, idx)));
    const mark = document.createElement("mark");
    mark.textContent = text.slice(idx, idx + query.length);
    frag.appendChild(mark);
    from = idx + query.length;
    idx = lower.indexOf(query, from);
  }
  frag.appendChild(document.createTextNode(text.slice(from)));
  return frag;
}

// 첫 매칭 위치 주변 본문 일부를 잘라 하이라이트한 미리보기 반환
function buildSnippet(content, query) {
  const frag = document.createDocumentFragment();
  const idx = content.toLowerCase().indexOf(query);
  if (idx === -1) return frag;
  const ctx = 50;
  const start = Math.max(0, idx - ctx);
  const end = Math.min(content.length, idx + query.length + ctx);
  if (start > 0) frag.appendChild(document.createTextNode("…"));
  frag.appendChild(highlight(content.slice(start, end), query));
  if (end < content.length) frag.appendChild(document.createTextNode("…"));
  return frag;
}

function render(rawQuery) {
  const query = rawQuery.toLowerCase();
  const matches = index.filter(
    (it) => it.titleLower.includes(query) || it.contentLower.includes(query)
  );

  resultsContainer.replaceChildren();

  const count = document.createElement("p");
  count.className = "search-result-count";
  count.textContent = "'" + rawQuery + "' 검색 결과 " + matches.length + "건";
  resultsContainer.appendChild(count);

  if (matches.length === 0) {
    const none = document.createElement("p");
    none.className = "search-no-result";
    none.textContent = "검색 결과가 없습니다.";
    resultsContainer.appendChild(none);
    return;
  }

  const grid = document.createElement("div");
  grid.className = "article-card-grid";

  matches.forEach((it) => {
    const link = document.createElement("a");
    link.href = it.url;

    const card = document.createElement("div");
    card.className = "article-item";

    const title = document.createElement("div");
    title.className = "article-title";
    title.appendChild(highlight(it.title, query));

    const date = document.createElement("div");
    date.className = "article-date";
    date.textContent = it.date;

    card.appendChild(title);
    card.appendChild(date);

    if (it.contentLower.includes(query)) {
      const snippet = document.createElement("div");
      snippet.className = "search-snippet";
      snippet.appendChild(buildSnippet(it.content, query));
      card.appendChild(snippet);
    }

    link.appendChild(card);
    grid.appendChild(link);
  });

  resultsContainer.appendChild(grid);
}

let debounce;
async function onInput() {
  const value = input.value.trim();
  if (!value) {
    showDefaultView();
    return;
  }
  try {
    await loadIndex();
  } catch (err) {
    console.error(err);
    return;
  }
  showSearchView();
  render(value);
}

if (input && resultsContainer) {
  input.addEventListener("input", () => {
    clearTimeout(debounce);
    debounce = setTimeout(onInput, 150);
  });
  // 첫 포커스 시 인덱스를 미리 받아두어 타이핑 시 지연을 줄임
  input.addEventListener(
    "focus",
    () => {
      loadIndex().catch(() => {});
    },
    { once: true }
  );
}
