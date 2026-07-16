(function () {
  'use strict';

  var root = document.getElementById('ipl-playground-root');
  if (!root) return;

  var state = {
    data: null,
    playerResults: [],
    playerLoadingTimer: null,
    tableSort: { key: 'runs', direction: 'desc' },
    page: 1,
    pageSize: 5,
    selectedTeams: new Set(),
    seasonOpen: null,
    modalIndex: 0,
    lastFocus: null,
    leaderboardTab: 'runs',
    suggestIndex: -1,
    networkBusy: false,
    delayedTimer: null,
    feedCount: 6,
    feedAutoLoads: 0,
    favourites: new Set(JSON.parse(localStorage.getItem('testnovaIplFavourites') || '[]')),
    quizIndex: 0,
    quizAnswers: {}
  };

  var leaderboardTabs = [
    ['runs', 'Most Runs'], ['wickets', 'Most Wickets'], ['highest', 'Highest Individual Score'],
    ['sixes', 'Most Sixes'], ['bowling', 'Best Bowling Figures'], ['catches', 'Most Catches']
  ];

  var practiceSections = [
    ['player-search-section', 'Player Search', searchHtml, true],
    ['records-table-section', 'Sortable Player Records Table', tableHtml, true],
    ['team-filter-section', 'Team Filtering', function () { return '<div id="team-filter-root"></div>'; }, true],
    ['season-results-section', 'Season Results Table', seasonHtml, true],
    ['leaderboard-section', 'Dynamic Leaderboard', function () { return '<div id="leaderboard-root"></div>'; }],
    ['autosuggest-section', 'Dropdown and Auto-suggest', autosuggestHtml],
    ['report-builder-section', 'Build Your IPL Report', reportHtml],
    ['date-picker-section', 'Find Matches by Date', datesHtml],
    ['alerts-section', 'Alerts and Confirmation', alertsHtml],
    ['iframe-section', 'Iframe Scorecard', iframeHtml],
    ['shadow-dom-section', 'Shadow DOM Player Card', function () { return '<div class="shadow-host-wrap"><ipl-record-card data-testid="shadow-host-card"></ipl-record-card></div>'; }],
    ['drag-drop-section', 'Build Your Playing XI', dragHtml, true],
    ['tooltip-section', 'Hover and Tooltip', tooltipHtml],
    ['download-section', 'File Download', downloadHtml],
    ['upload-section', 'File Upload', uploadHtml],
    ['windows-section', 'Multiple Windows', windowsHtml],
    ['network-section', 'Network Delay Simulation', networkHtml],
    ['dynamic-element-section', 'Dynamic Element', dynamicHtml],
    ['hidden-delay-section', 'Hidden and Delayed Elements', hiddenHtml],
    ['feed-section', 'Infinite Scroll / Load More', feedHtml, true],
    ['comparison-section', 'Responsive Table', comparisonHtml, true],
    ['flip-card-section', 'Flip Card', flipHtml, true],
    ['quiz-section', 'Quiz', function () { return '<div id="quiz-root"></div>'; }],
    ['favourites-section', 'Saved Favourites', favouritesHtml, true],
    ['api-practice-section', 'API Practice', apiHtml, true],
    ['unstable-locator-section', 'Unstable Locator Challenge', unstableHtml],
    ['dom-comparison-section', 'Flat vs Complex DOM', domCompareHtml]
  ];

  var challenges = [
    ['Beginner','Search for a player and verify the result.','The requested player appears in the results.','Player Search','Use the player search input and assert visible text plus result count.'],
    ['Beginner','Sort players by runs in descending order.','Runs are ordered from highest to lowest.','Sortable Player Records Table','Click the Runs header until it announces descending.'],
    ['Intermediate','Verify that all displayed runs exceed the selected minimum.','Every visible result satisfies the filter.','Player Search','Extract numeric text from result cards after the loading state disappears.'],
    ['Beginner','Select three teams and validate the selected count.','Selected count equals 3.','Team Filtering','Use checkbox labels or data-testid values, not visual initials only.'],
    ['Intermediate','Open and close the player modal using Escape.','Focus returns to the View Details button.','Modal Player Details','Save the trigger locator and assert modal hidden after Escape.'],
    ['Intermediate','Validate season-table pagination.','Page status and rows update correctly.','Sortable Player Records Table','Change page size and compare visible row count.'],
    ['Intermediate','Select an autocomplete result using the keyboard.','The input value matches the selected suggestion.','Dropdown and Auto-suggest','Use ArrowDown and Enter after suggestions become visible.'],
    ['Intermediate','Download and verify the CSV file.','Filename and first row match expectations.','File Download','Wait for the download event and read file contents.'],
    ['Beginner','Upload a valid JSON playing XI.','Success message shows selected file name.','File Upload','Use a small fixture file with .json extension.'],
    ['Advanced','Handle the historical scorecard iframe.','Nested scorecard details become visible.','Iframe Scorecard','Switch to the frame by title or data-testid.'],
    ['Advanced','Interact with the Shadow DOM record card.','Reveal button exposes details.','Shadow DOM Player Card','Pierce open shadow root with framework-supported selectors.'],
    ['Advanced','Build a playing XI using drag and drop.','Selected count updates and duplicates are blocked.','Drag and Drop','Prefer the accessible Add buttons when drag simulation is brittle.'],
    ['Intermediate','Wait for delayed statistics without using a hard wait.','Success state appears after the simulated delay.','Network Delay Simulation','Wait for role/status text or button enabled state.'],
    ['Advanced','Verify localStorage favourites after page reload.','Favourite state persists after reload.','Saved Favourites','Read UI state after reload, not only localStorage.'],
    ['Intermediate','Validate one local API response.','Response contains success, count and snapshotVersion.','API Practice','Assert the JSON contract and status display.'],
    ['Beginner','Test invalid date-range validation.','From-after-to error is visible.','Date Picker','Set both date inputs before clicking search.'],
    ['Intermediate','Switch to the newly opened record tab.','New tab has correct title and internal URL.','Multiple Windows','Wait for the popup and verify URL contains record profile.'],
    ['Beginner','Check tooltip text using hover.','Tooltip explanation appears.','Hover and Tooltip','Keyboard focus can be used as an accessible alternative.'],
    ['Advanced','Verify there are no duplicate infinite-scroll records.','Visible record identifiers are unique.','Infinite Scroll / Load More','Collect stable data-testid rows after each load.'],
    ['Intermediate','Complete and validate quiz scoring.','Score and explanations are shown.','Quiz','Answer every step before submitting.'],
    ['Intermediate','Compare two teams.','Comparison metrics render or no-data state appears.','Responsive Table','Use the same assertions on desktop and mobile views.'],
    ['Advanced','Use a stable locator in the unstable-locator section.','The stable button is clicked despite unstable neighbors.','Unstable Locator Challenge','Prefer role/name or data-testid over generated class names.'],
    ['Beginner','Cancel a delayed record before it appears.','Delayed result remains absent.','Hidden and Delayed Elements','Click cancel while the pending status is visible.'],
    ['Intermediate','Simulate a network failure and retry.','Error state appears, then retry succeeds after disabling error mode.','Network Delay Simulation','Assert disabled button state while request is in progress.'],
    ['Advanced','Verify responsive behaviour using mobile viewport.','Mobile comparison cards are visible without horizontal overflow.','Responsive Table','Set viewport before navigating and check document width.']
  ];

  function escapeHtml(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, function (char) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char];
    });
  }

  function delay(ms) { return new Promise(function (resolve) { setTimeout(resolve, ms); }); }
  function byId(id) { return document.getElementById(id); }
  function formatRoute() { return window.location.origin + window.location.pathname; }
  function saveFavs() { localStorage.setItem('testnovaIplFavourites', JSON.stringify(Array.from(state.favourites))); }

  function section(id, title, body, wide) {
    return '<article class="glass-card ipl-card' + (wide ? ' ipl-card--wide' : '') + '" id="' + id + '" data-testid="' + id + '">' +
      '<h3>' + title + '</h3>' + body + '</article>';
  }

  async function init() {
    var response = await fetch('data/ipl-records.json');
    state.data = await response.json();
    state.playerResults = state.data.players.slice();
    renderShell();
    bindStaticEvents();
    renderAll();
    defineShadowCard();
  }

  function renderShell() {
    root.innerHTML = '<div class="ipl-grid">' + practiceSections.map(function (item) {
      return section(item[0], item[1], item[2](), item[3]);
    }).join('') + '</div>';
    renderTopicNav();
  }

  function renderTopicNav() {
    var nav = byId('ipl-topic-nav');
    if (!nav) return;
    nav.innerHTML = practiceSections.map(function (item) {
      return '<a href="#' + item[0] + '" data-ipl-topic-link="' + item[0] + '"><strong>' + escapeHtml(item[1]) + '</strong></a>';
    }).join('');
    nav.querySelectorAll('[data-ipl-topic-link]').forEach(function (link) {
      link.addEventListener('click', function (event) {
        event.preventDefault();
        var target = byId(this.getAttribute('data-ipl-topic-link'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        nav.querySelectorAll('a').forEach(function (a) { a.classList.remove('active'); });
        this.classList.add('active');
      });
    });
  }

  function searchHtml() {
    return '<form id="player-search-form" class="form-grid" data-testid="player-search-form">' +
      field('Player name', '<input id="player-name" name="playerName" placeholder="Example: Virat, Dhoni, Gayle" data-testid="player-search-input" aria-label="Player name" autocomplete="off">') +
      field('Team', '<select id="team-filter" name="team" data-testid="team-filter" aria-label="Team filter"><option value="">Any team</option></select>') +
      field('Player role', '<select id="role-filter" name="role" data-testid="role-filter" aria-label="Player role"><option value="">Any role</option><option value="Batter">Batter</option><option value="Bowler">Bowler</option><option value="All-rounder">All-rounder</option><option value="Wicketkeeper">Wicketkeeper / WK</option></select>') +
      field('Nationality', '<input id="nationality-filter" name="nationality" placeholder="Example: India, Australia" data-testid="nationality-filter" aria-label="Nationality">') +
      field('Minimum runs', '<input id="min-runs" name="minRuns" type="number" min="0" data-testid="minimum-runs-input" aria-label="Minimum runs">') +
      field('Minimum wickets', '<input id="min-wickets" name="minWickets" type="number" min="0" data-testid="minimum-wickets-input" aria-label="Minimum wickets">') +
      '<div class="button-row"><button class="primary-btn" type="submit" id="search-players" data-testid="search-players">Search</button><button class="secondary-btn" type="button" id="clear-player-filters" data-testid="clear-player-filters">Clear Filters</button></div>' +
      '</form><div id="player-search-status" role="status" aria-live="polite"></div><div id="player-results" class="feed-list" data-testid="player-search-results"></div>';
  }

  function field(label, control) {
    var id = (control.match(/id="([^"]+)"/) || [,''])[1];
    return '<div class="field"><label for="' + id + '">' + label + '</label>' + control + '</div>';
  }

  function tableHtml() {
    return '<div class="pagination-bar"><label for="page-size">Rows per page</label><select id="page-size" data-testid="player-table-page-size" aria-label="Player table page size"><option>5</option><option>10</option><option>20</option></select><span id="table-page-status" class="page-status" data-testid="player-table-page-status"></span></div><div class="table-wrap"><table class="ipl-table" id="player-records-table" data-testid="player-records-table"><thead id="player-table-head"></thead><tbody id="player-table-body"></tbody></table></div><div class="pagination-bar"><button class="secondary-btn" type="button" id="prev-page" data-testid="player-table-prev">Previous</button><button class="secondary-btn" type="button" id="next-page" data-testid="player-table-next">Next</button></div>';
  }

  function seasonHtml() {
    return '<div class="form-grid">' + field('From season', '<input id="season-from" type="number" value="2008" min="2008" max="2026" data-testid="season-from">') + field('To season', '<input id="season-to" type="number" value="2026" min="2008" max="2026" data-testid="season-to">') + field('Winner or runner-up', '<input id="season-search" data-testid="season-search" aria-label="Search winner or runner-up">') + '</div><div class="button-row"><button class="secondary-btn" type="button" id="season-sort" data-testid="season-sort" aria-label="Sort season results">Newest to Oldest</button></div><div class="table-wrap"><table class="ipl-table" data-testid="season-table"><thead><tr><th>Season</th><th>Winner</th><th>Runner-up</th><th>Final venue</th><th>Winning margin</th><th>Player of the season</th><th>Details</th></tr></thead><tbody id="season-table-body"></tbody></table></div>';
  }

  function autosuggestHtml() {
    return '<div class="autosuggest field"><label for="global-autosuggest">Search player, team or season</label><input id="global-autosuggest" placeholder="Search player, team or season" autocomplete="off" role="combobox" aria-expanded="false" aria-controls="suggestions-list" data-testid="global-autosuggest"><div id="suggestions-list" class="suggestions-list" role="listbox" hidden data-testid="autosuggest-list"></div></div><p id="autosuggest-status" class="status-text" role="status"></p>';
  }

  function reportHtml() {
    return '<form id="report-form" data-testid="report-form"><div class="choice-grid">' + ['Batting records','Bowling records','Team records','Season results','Fielding records'].map(function (x, i) { return '<label class="choice-label"><input type="checkbox" name="reportSections" value="' + x + '" ' + (i < 3 ? 'checked' : '') + ' data-testid="report-checkbox-' + x.toLowerCase().replaceAll(' ', '-') + '"> ' + x + '</label>'; }).join('') + '</div><div class="choice-grid" role="radiogroup" aria-label="Report type">' + ['Summary report','Detailed report','Comparison report'].map(function (x, i) { return '<label class="choice-label"><input type="radio" name="reportType" value="' + x + '" ' + (i === 0 ? 'checked' : '') + ' data-testid="report-radio-' + i + '"> ' + x + '</label>'; }).join('') + '</div><div class="button-row"><button class="primary-btn" type="submit" data-testid="generate-report">Build IPL Report</button><button class="secondary-btn" type="button" id="clear-report" data-testid="clear-report">Clear Report</button></div></form><div id="report-output" data-testid="report-output" role="status"></div>';
  }

  function datesHtml() {
    return '<div class="form-grid">' + field('From date', '<input id="from-date" type="date" required data-testid="from-date">') + field('To date', '<input id="to-date" type="date" required data-testid="to-date">') + '<div class="button-row"><button class="compact-btn" type="button" data-preset="opening" data-testid="preset-opening-week">Opening Week</button><button class="compact-btn" type="button" data-preset="playoffs" data-testid="preset-playoff-period">Playoff Period</button><button class="compact-btn" type="button" data-preset="final" data-testid="preset-final-week">Final Week</button></div></div><div class="button-row"><button class="primary-btn" type="button" id="find-matches" data-testid="find-matches">Find Matches</button></div><div id="date-results" role="status" data-testid="date-results"></div>';
  }

  function alertsHtml() {
    return '<div class="button-row"><button class="primary-btn" type="button" id="show-record-alert" data-testid="show-record-alert">Show Record Alert</button><button class="secondary-btn" type="button" id="reset-leaderboard" data-testid="reset-leaderboard">Reset Leaderboard</button><button class="compact-btn" type="button" id="delete-saved-report" data-testid="delete-saved-report">Delete Saved Report</button></div><p id="alert-status" class="status-text" role="status" data-testid="alert-status">Use these buttons to practice alert, confirmation and toast handling.</p>';
  }

  function iframeHtml() {
    return '<div class="iframe-shell"><iframe src="ipl-scorecard-frame.html" title="IPL historical scorecard practice frame" data-testid="scorecard-iframe"></iframe></div>';
  }

  function dragHtml() {
    return '<p id="xi-count" class="selected-count" data-testid="playing-xi-count">Selected players: 0 / 11</p><div class="drag-layout"><div><h4>Player pool</h4><p class="status-text">Add 11 players, then choose a captain. At least one wicketkeeper is mandatory.</p><div class="player-pool" id="player-pool" data-testid="player-pool"></div></div><div><h4>Playing XI</h4><div class="playing-xi" id="playing-xi" data-testid="playing-xi" aria-label="Selected Playing XI"></div></div></div><div class="button-row"><button class="primary-btn" type="button" id="submit-xi" data-testid="submit-playing-xi">Submit Playing XI</button><button class="secondary-btn" type="button" id="reset-xi" data-testid="reset-playing-xi">Reset Team</button><span id="xi-message" class="status-text" role="status" data-testid="playing-xi-message"></span></div>';
  }

  function tooltipHtml() {
    return '<div class="tooltip-wrap">' + [
      ['Orange Cap','Awarded to the season leading run scorer.'],
      ['Purple Cap','Awarded to the season leading wicket taker.'],
      ['Most Valuable Player','Recognises all-round season impact.'],
      ['Fair Play Award','Recognises team conduct across a season.']
    ].map(function (item, i) { return '<button class="record-badge" type="button" data-testid="record-badge-' + i + '">' + item[0] + '<span role="tooltip">' + item[1] + '</span></button>'; }).join('') + '</div>';
  }

  function downloadHtml() {
    return '<a class="primary-btn" href="testnova-ipl-records.csv" download="testnova-ipl-records.csv" id="download-csv" data-testid="download-ipl-records-csv">Download IPL Records CSV</a>';
  }

  function uploadHtml() {
    return '<div class="upload-zone"><h4>Upload Your Playing XI</h4><p>Accepts .json and .csv up to 1 MB. Processed only in the browser.</p><input id="playing-xi-upload" type="file" accept=".json,.csv" data-testid="playing-xi-upload" aria-label="Upload Your Playing XI"><p><a class="secondary-btn" href="sample-playing-xi.json" download data-testid="download-sample-playing-xi">Download sample file</a></p><p id="upload-status" role="status" data-testid="upload-status"></p></div>';
  }

  function windowsHtml() {
    return '<button class="primary-btn" type="button" id="open-record-profile" data-testid="open-record-profile">Open Full Record Profile</button>';
  }

  function networkHtml() {
    return '<label class="choice-label"><input type="checkbox" id="simulate-error" data-testid="simulate-network-error"> Simulate Network Error</label><div class="button-row"><button class="primary-btn" type="button" id="load-stats" data-testid="load-detailed-statistics">Load Detailed Statistics</button><button class="secondary-btn" type="button" id="retry-stats" data-testid="retry-statistics" hidden>Retry</button></div><div id="network-status" role="status" data-testid="network-status"></div>';
  }

  function dynamicHtml() {
    return '<button class="primary-btn" type="button" id="generate-match-id" data-testid="generate-match-identifier">Generate Match Identifier</button><div id="match-id-output" data-testid="match-identifier-output"></div>';
  }

  function hiddenHtml() {
    return '<div class="button-row"><button class="primary-btn" type="button" id="reveal-record" data-testid="reveal-record">Reveal Record</button><button class="secondary-btn" type="button" id="show-delayed" data-testid="show-record-after-delay">Show Record After Delay</button><button class="compact-btn" type="button" id="cancel-delayed" data-testid="cancel-delayed-record">Cancel</button></div><p id="hidden-record" hidden data-testid="hidden-record">Hidden record: Gujarat Titans won the title in their debut season and reached the final again in 2023 and 2026.</p><p id="delayed-record" hidden data-testid="delayed-record">Delayed record: Royal Challengers Bengaluru won back-to-back titles in 2025 and 2026.</p><p id="delay-status" role="status"></p>';
  }

  function feedHtml() {
    return '<div id="records-feed" class="feed-list" data-testid="records-feed"></div><div class="button-row"><button class="primary-btn" type="button" id="load-more-records" data-testid="load-more-records">Load More</button><span id="feed-status" role="status" class="status-text"></span></div>';
  }

  function comparisonHtml() {
    return '<div class="form-grid">' + field('Select Team A', '<select id="compare-team-a" data-testid="compare-team-a"></select>') + field('Select Team B', '<select id="compare-team-b" data-testid="compare-team-b"></select>') + '<div class="button-row"><button class="primary-btn" type="button" id="compare-teams" data-testid="compare-teams">Compare Teams</button></div></div><div id="comparison-output" data-testid="comparison-output"></div>';
  }

  function flipHtml() {
    return '<div class="flip-grid">' + state.data.records.slice(0, 4).map(function (record, i) {
      return '<button class="flip-card" type="button" data-testid="flip-card-' + i + '" aria-pressed="false"><span class="flip-inner"><span class="flip-face"><strong>' + escapeHtml(record.recordType) + ' record</strong><span>' + escapeHtml(record.playerOrTeam) + '</span></span><span class="flip-face flip-back"><strong>' + escapeHtml(record.value) + '</strong><span>' + escapeHtml(record.season) + '</span><span>' + escapeHtml(record.description) + '</span></span></span></button>';
    }).join('') + '</div>';
  }

  function favouritesHtml() {
    return '<div class="button-row"><label class="choice-label"><input type="checkbox" id="show-favs-only" data-testid="show-favourites-only"> Show Favourites Only</label><button class="secondary-btn" type="button" id="clear-favs" data-testid="clear-favourites">Clear Favourites</button><span id="fav-count" class="selected-count" data-testid="favourite-count"></span></div><div id="favourites-list" class="favourites-list" data-testid="favourites-list"></div>';
  }

  function apiHtml() {
    return '<div class="form-grid"><div class="field"><label for="api-endpoint">Endpoint</label><select id="api-endpoint" class="api-select" data-testid="api-endpoint"><option value="/api/ipl/players.json">GET /api/ipl/players</option><option value="/api/ipl/players/virat-kohli.json">GET /api/ipl/players/:id</option><option value="/api/ipl/teams.json">GET /api/ipl/teams</option><option value="/api/ipl/seasons.json">GET /api/ipl/seasons</option><option value="/api/ipl/records.json">GET /api/ipl/records</option><option value="/api/ipl/records-batting.json">GET /api/ipl/records?type=batting</option><option value="/api/ipl/records-bowling.json">GET /api/ipl/records?type=bowling</option></select></div><div class="api-meta"><label>Method</label><p>GET</p></div><div class="api-meta"><label>Expected status</label><p id="api-status" data-testid="api-expected-status">200</p></div></div><div class="button-row"><button class="primary-btn" type="button" id="try-api" data-testid="try-api-request">Try Request</button></div><pre class="api-response" id="api-response" data-testid="api-response">{}</pre><p class="status-text">Fixture paths use .json files because this project is static.</p>';
  }

  function unstableHtml() {
    var randomClass = 'generated-' + Math.random().toString(36).slice(2, 8);
    return '<div class="unstable-box ipl-card"><p><strong>Unstable Locator Challenge:</strong> This area intentionally contains brittle locator examples.</p><button class="compact-btn ' + randomClass + '" type="button" aria-label="Generated class button">Generated Class Button</button><p><span>Repeated Label</span> <span>Repeated Label</span></p><div class="nested-box"><div><div><div><button class="compact-btn" type="button" aria-label="Deep nested action">Deeply Nested Button</button></div></div></div></div><button class="primary-btn" type="button" data-testid="stable-locator-button">Stable Locator Button</button><div class="compare-cards"><article class="glass-card"><h4>Record Card</h4><p>Virat Kohli runs</p></article><article class="glass-card"><h4>Record Card</h4><p>Virat Kohli catches</p></article></div></div>';
  }

  function domCompareHtml() {
    return '<div class="compare-cards"><article class="glass-card" data-testid="simple-record-card"><h4>Simple accessible card</h4><p>Chris Gayle - 175* - 2013</p></article><article class="glass-card" data-testid="complex-record-card"><div><div><div><h4>Deeply nested complex card</h4><div><span>Chris Gayle</span><span> - </span><strong>175*</strong><span> - 2013</span></div></div></div></div></article></div>';
  }

  function renderAll() {
    populateSelects();
    renderPlayerResults();
    renderPlayerTable();
    renderTeams();
    renderSeasons();
    renderLeaderboard();
    renderDragPool();
    renderFeed();
    renderQuiz();
    renderFavourites();
    byId('base-url-output').textContent = formatRoute();
  }

  function populateSelects() {
    ['team-filter','compare-team-a','compare-team-b'].forEach(function (id) {
      var select = byId(id);
      if (!select || select.dataset.ready) return;
      var prefix = id === 'team-filter' ? '<option value="">Any team</option>' : '<option value="">Choose team</option>';
      select.innerHTML = prefix + state.data.teams.map(function (t) { return '<option value="' + escapeHtml(t.name) + '">' + escapeHtml(t.name) + '</option>'; }).join('');
      select.dataset.ready = 'true';
    });
  }

  function bindStaticEvents() {
    byId('start-practising').addEventListener('click', function () { byId('player-search-section').scrollIntoView({ behavior: 'smooth' }); });
    byId('view-challenges').addEventListener('click', function () { byId('automation-challenges').scrollIntoView({ behavior: 'smooth' }); });
    byId('player-search-form').addEventListener('submit', function (event) { event.preventDefault(); runPlayerSearch(); });
    byId('clear-player-filters').addEventListener('click', clearPlayerFilters);
    byId('page-size').addEventListener('change', function (e) { state.pageSize = Number(e.target.value); state.page = 1; renderPlayerTable(); });
    byId('prev-page').addEventListener('click', function () { state.page = Math.max(1, state.page - 1); renderPlayerTable(); });
    byId('next-page').addEventListener('click', function () { state.page += 1; renderPlayerTable(); });
    ['season-from','season-to','season-search'].forEach(function (id) { byId(id).addEventListener('input', renderSeasons); });
    byId('season-sort').addEventListener('click', function () { this.dataset.oldest = this.dataset.oldest === 'true' ? 'false' : 'true'; this.textContent = this.dataset.oldest === 'true' ? 'Oldest to Newest' : 'Newest to Oldest'; renderSeasons(); });
    byId('global-autosuggest').addEventListener('input', renderSuggestions);
    byId('global-autosuggest').addEventListener('keydown', handleSuggestKeys);
    document.addEventListener('click', function (event) { if (!event.target.closest('.autosuggest')) closeSuggestions(); });
    byId('report-form').addEventListener('submit', renderReport);
    byId('clear-report').addEventListener('click', function () { byId('report-form').reset(); byId('report-output').innerHTML = ''; });
    document.querySelectorAll('[data-preset]').forEach(function (btn) { btn.addEventListener('click', applyPreset); });
    byId('find-matches').addEventListener('click', findMatches);
    byId('show-record-alert').addEventListener('click', function () { alert('Record alert: Chris Gayle scored 175* in 2013.'); byId('alert-status').textContent = 'Alert accepted for the 175* batting record.'; });
    byId('reset-leaderboard').addEventListener('click', function () { if (confirm('Reset leaderboard tab to Most Runs?')) { state.leaderboardTab = 'runs'; renderLeaderboard(); byId('alert-status').textContent = 'Confirmation accepted. Leaderboard reset to Most Runs.'; } else { byId('alert-status').textContent = 'Confirmation cancelled. Leaderboard was not changed.'; } });
    byId('delete-saved-report').addEventListener('click', function () { showToast('Saved report deleted for practice.'); byId('alert-status').textContent = 'Toast shown for saved report deletion.'; });
    byId('submit-xi').addEventListener('click', validatePlayingXi);
    byId('reset-xi').addEventListener('click', resetXi);
    byId('playing-xi').addEventListener('dragover', function (e) { e.preventDefault(); });
    byId('playing-xi').addEventListener('drop', handleDrop);
    byId('playing-xi-upload').addEventListener('change', validateUpload);
    byId('open-record-profile').addEventListener('click', function () { window.open('ipl-record-profile.html', '_blank', 'noopener'); });
    byId('load-stats').addEventListener('click', loadStats);
    byId('retry-stats').addEventListener('click', loadStats);
    byId('generate-match-id').addEventListener('click', generateMatchIdentifier);
    byId('reveal-record').addEventListener('click', function () { byId('hidden-record').hidden = false; });
    byId('show-delayed').addEventListener('click', showDelayedRecord);
    byId('cancel-delayed').addEventListener('click', cancelDelayed);
    byId('load-more-records').addEventListener('click', loadMoreFeed);
    window.addEventListener('scroll', maybeAutoLoadFeed, { passive: true });
    byId('compare-teams').addEventListener('click', renderComparison);
    document.querySelectorAll('.flip-card').forEach(function (card) { card.addEventListener('click', flipCard); card.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); flipCard.call(card); } }); });
    byId('clear-favs').addEventListener('click', function () { state.favourites.clear(); saveFavs(); renderFavourites(); });
    byId('show-favs-only').addEventListener('change', renderFavourites);
    byId('try-api').addEventListener('click', tryApi);
    byId('copy-base-url').addEventListener('click', copyBaseUrl);
    renderChallenges();
  }

  async function runPlayerSearch() {
    clearTimeout(state.playerLoadingTimer);
    var status = byId('player-search-status');
    status.innerHTML = '<span class="loading-spinner" data-testid="player-search-loading">Searching records...</span>';
    await delay(700 + Math.floor(Math.random() * 501));
    var name = normalizeSearch(byId('player-name').value);
    var team = byId('team-filter').value;
    var role = normalizeRole(byId('role-filter').value);
    var nationality = normalizeSearch(byId('nationality-filter').value);
    var minRuns = Number(byId('min-runs').value || 0);
    var minWickets = Number(byId('min-wickets').value || 0);
    state.playerResults = state.data.players.filter(function (p) {
      return (!name || normalizeSearch([p.name, p.team, p.teamCode, p.role, (p.aliases || []).join(' ')].join(' ')).includes(name)) && (!team || p.team === team) && (!role || normalizeRole(p.role) === role) && (!nationality || normalizeSearch(p.nationality).includes(nationality)) && p.runs >= minRuns && p.wickets >= minWickets;
    });
    status.innerHTML = '<p class="result-count" data-testid="player-result-count">' + state.playerResults.length + ' result(s)</p>';
    renderPlayerResults();
  }

  function normalizeSearch(value) {
    return String(value || '').toLowerCase().replace(/bengaluru/g, 'bangalore').replace(/ghilcrist|gilcrist|gillchrist/g, 'gilchrist').replace(/royal challengers/g, 'rcb royal challengers').replace(/\s+/g, ' ').trim();
  }

  function normalizeRole(value) {
    var role = normalizeSearch(value).replace(/wiket/g, 'wicket').replace(/keeper/g, 'keeper').replace(/\bwk\b/g, 'wicketkeeper').replace(/wicket keeper/g, 'wicketkeeper');
    if (role.indexOf('wicketkeeper') !== -1) return 'wicketkeeper';
    if (role.indexOf('all-rounder') !== -1 || role.indexOf('all rounder') !== -1) return 'all-rounder';
    if (role.indexOf('batter') !== -1 || role.indexOf('batsman') !== -1) return 'batter';
    if (role.indexOf('bowler') !== -1) return 'bowler';
    return role;
  }

  function clearPlayerFilters() {
    byId('player-search-form').reset();
    state.playerResults = state.data.players.slice();
    byId('player-search-status').innerHTML = '<p class="result-count" data-testid="player-result-count">' + state.playerResults.length + ' result(s)</p>';
    renderPlayerResults();
  }

  function renderPlayerResults() {
    var box = byId('player-results');
    if (!state.playerResults.length) { box.innerHTML = '<p class="error-text" data-testid="no-player-found">No player found</p>'; return; }
    box.innerHTML = state.playerResults.slice(0, 8).map(function (p) {
      return '<article class="feed-item" data-testid="player-result-' + p.id + '"><strong>' + escapeHtml(p.name) + '</strong><span>' + escapeHtml(p.teamCode) + ' | ' + escapeHtml(p.role) + ' | Runs ' + p.runs + ' | Wickets ' + p.wickets + '</span></article>';
    }).join('');
  }

  function renderPlayerTable() {
    var columns = [['rank','Rank'],['name','Player'],['teamCode','Team'],['matches','Matches'],['runs','Runs'],['highestScore','Highest Score'],['average','Average'],['strikeRate','Strike Rate'],['centuries','Centuries'],['fifties','Fifties']];
    byId('player-table-head').innerHTML = '<tr>' + columns.map(function (c) {
      var numeric = ['rank','matches','runs','average','strikeRate','centuries','fifties'].indexOf(c[0]) !== -1;
      return '<th>' + (numeric ? '<button class="sortable-header" type="button" data-sort="' + c[0] + '" data-testid="sort-' + c[0] + '">' + c[1] + (state.tableSort.key === c[0] ? ' ' + (state.tableSort.direction === 'asc' ? '↑' : '↓') : '') + '</button>' : c[1]) + '</th>';
    }).join('') + '<th>Action</th></tr>';
    byId('player-table-head').querySelectorAll('[data-sort]').forEach(function (button) { button.addEventListener('click', sortTable); });
    var sorted = state.data.players.slice().sort(function (a, b) {
      var diff = Number(a[state.tableSort.key]) - Number(b[state.tableSort.key]);
      return state.tableSort.direction === 'asc' ? diff : -diff;
    });
    var pages = Math.max(1, Math.ceil(sorted.length / state.pageSize));
    state.page = Math.min(state.page, pages);
    var start = (state.page - 1) * state.pageSize;
    byId('player-table-body').innerHTML = sorted.slice(start, start + state.pageSize).map(function (p, i) {
      return '<tr data-testid="player-table-row-' + p.id + '"><td>' + p.rank + '</td><td>' + escapeHtml(p.name) + '</td><td>' + p.teamCode + '</td><td>' + p.matches + '</td><td>' + p.runs + '</td><td>' + p.highestScore + '</td><td>' + p.average + '</td><td>' + p.strikeRate + '</td><td>' + p.centuries + '</td><td>' + p.fifties + '</td><td><button class="compact-btn" type="button" data-player-index="' + state.data.players.findIndex(function (x) { return x.id === p.id; }) + '" data-testid="view-player-details-' + p.id + '">View Details</button></td></tr>';
    }).join('');
    byId('player-table-body').querySelectorAll('[data-player-index]').forEach(function (btn) { btn.addEventListener('click', function () { openPlayerModal(Number(this.dataset.playerIndex), this); }); });
    byId('table-page-status').textContent = 'Page ' + state.page + ' of ' + pages + ' | ' + sorted.length + ' total results';
    byId('prev-page').disabled = state.page === 1;
    byId('next-page').disabled = state.page === pages;
  }

  function sortTable() {
    var key = this.dataset.sort;
    state.tableSort.direction = state.tableSort.key === key && state.tableSort.direction === 'desc' ? 'asc' : 'desc';
    state.tableSort.key = key;
    renderPlayerTable();
  }

  function renderTeams() {
    byId('team-filter-root').innerHTML = '<p class="selected-count" data-testid="selected-team-count">Selected teams: ' + state.selectedTeams.size + '</p><div class="button-row"><button class="primary-btn" type="button" id="apply-team-check" data-testid="apply-team-check">Apply Team Check</button><button class="secondary-btn" type="button" id="select-all-teams" data-testid="select-all-teams">Select All</button><button class="secondary-btn" type="button" id="clear-all-teams" data-testid="clear-all-teams">Clear All</button></div><p id="team-check-status" class="status-text" role="status" data-testid="team-check-status"></p><div class="team-grid">' + state.data.teams.map(function (t) {
      var checked = state.selectedTeams.has(t.id);
      return '<label class="team-card' + (checked ? ' is-selected' : '') + '" data-testid="team-card-' + t.id + '"><input type="checkbox" name="teams" value="' + t.id + '" ' + (checked ? 'checked' : '') + ' aria-label="Select ' + escapeHtml(t.name) + '"><span class="team-code">' + t.code + '</span><span><strong>' + escapeHtml(t.name) + '</strong><br><small>' + t.titles + ' title(s) | Seasons ' + escapeHtml(t.seasonsPlayed) + '</small></span></label>';
    }).join('') + '</div>';
    byId('team-filter-root').querySelectorAll('input[name="teams"]').forEach(function (cb) { cb.addEventListener('change', function () { this.checked ? state.selectedTeams.add(this.value) : state.selectedTeams.delete(this.value); renderTeams(); }); });
    byId('apply-team-check').addEventListener('click', function () { byId('team-check-status').textContent = state.selectedTeams.size ? state.selectedTeams.size + ' team checkbox selection(s) applied.' : 'Select at least one team before applying.'; });
    byId('select-all-teams').addEventListener('click', function () { state.data.teams.forEach(function (t) { state.selectedTeams.add(t.id); }); renderTeams(); });
    byId('clear-all-teams').addEventListener('click', function () { state.selectedTeams.clear(); renderTeams(); });
  }

  function renderSeasons() {
    var from = Number(byId('season-from').value || 2008);
    var to = Number(byId('season-to').value || 2026);
    var query = byId('season-search').value.toLowerCase();
    var oldest = byId('season-sort').dataset.oldest === 'true';
    var rows = state.data.seasons.filter(function (s) { return s.season >= from && s.season <= to && (!query || (s.winner + ' ' + s.runnerUp).toLowerCase().includes(query)); }).sort(function (a, b) { return oldest ? a.season - b.season : b.season - a.season; });
    byId('season-table-body').innerHTML = rows.map(function (s) {
      var open = state.seasonOpen === s.season;
      return '<tr data-testid="season-row-' + s.season + '"><td>' + s.season + '</td><td>' + escapeHtml(s.winner) + '</td><td>' + escapeHtml(s.runnerUp) + '</td><td>' + escapeHtml(s.venue) + '</td><td>' + escapeHtml(s.margin) + '</td><td>' + escapeHtml(s.playerOfSeason) + '</td><td><button class="compact-btn" type="button" data-season="' + s.season + '" aria-expanded="' + open + '" data-testid="season-details-' + s.season + '">Details</button></td></tr>' + (open ? '<tr class="details-row" data-testid="season-details-row-' + s.season + '"><td colspan="7">' + escapeHtml(s.summary) + '</td></tr>' : '');
    }).join('');
    byId('season-table-body').querySelectorAll('[data-season]').forEach(function (btn) { btn.addEventListener('click', function () { state.seasonOpen = state.seasonOpen === Number(this.dataset.season) ? null : Number(this.dataset.season); renderSeasons(); }); });
  }

  function renderLeaderboard() {
    var rootEl = byId('leaderboard-root');
    rootEl.innerHTML = '<div class="tab-list" role="tablist" aria-label="Leaderboard categories">' + leaderboardTabs.map(function (t) { return '<button class="compact-btn tab-button" role="tab" type="button" aria-selected="' + (state.leaderboardTab === t[0]) + '" data-tab="' + t[0] + '" data-testid="leaderboard-tab-' + t[0] + '">' + t[1] + '</button>'; }).join('') + '</div><div id="leaderboard-content" data-testid="leaderboard-content"><div class="skeleton" data-testid="leaderboard-skeleton"></div></div>';
    rootEl.querySelectorAll('[data-tab]').forEach(function (btn) { btn.addEventListener('click', function () { state.leaderboardTab = this.dataset.tab; renderLeaderboard(); }); });
    delay(350).then(function () {
      var items = getLeaderboardItems();
      byId('leaderboard-content').innerHTML = '<div class="leaderboard-list">' + items.map(function (x, i) { return '<div class="leaderboard-item" data-testid="leaderboard-row-' + i + '"><strong>' + escapeHtml(x.name) + '</strong><span>' + escapeHtml(x.value) + '</span></div>'; }).join('') + '</div>';
    });
  }

  function getLeaderboardItems() {
    if (state.leaderboardTab === 'highest') return state.data.players.slice().sort(function (a,b) { return parseInt(b.highestScore) - parseInt(a.highestScore); }).slice(0,5).map(function (p) { return { name: p.name, value: p.highestScore }; });
    if (state.leaderboardTab === 'bowling') return state.data.records.filter(function (r) { return r.recordType === 'bowling' && r.value.includes('/'); }).slice(0,5).map(function (r) { return { name: r.playerOrTeam, value: r.value }; });
    var key = state.leaderboardTab;
    return state.data.players.slice().sort(function (a,b) { return b[key] - a[key]; }).slice(0,5).map(function (p) { return { name: p.name, value: String(p[key]) }; });
  }

  function renderSuggestions() {
    var input = byId('global-autosuggest');
    var list = byId('suggestions-list');
    var q = input.value.trim().toLowerCase();
    state.suggestIndex = -1;
    if (q.length < 2) { closeSuggestions(); return; }
    var items = [];
    state.data.players.forEach(function (p) { if (normalizeSearch([p.name, (p.aliases || []).join(' ')].join(' ')).includes(normalizeSearch(q))) items.push({ type: 'player', label: p.name }); });
    state.data.teams.forEach(function (t) { if (t.name.toLowerCase().includes(q) || t.code.toLowerCase().includes(q)) items.push({ type: 'team', label: t.name }); });
    state.data.seasons.forEach(function (s) { if (String(s.season).includes(q)) items.push({ type: 'season', label: String(s.season) + ' - ' + s.winner }); });
    list.hidden = false;
    input.setAttribute('aria-expanded', 'true');
    list.innerHTML = items.slice(0, 8).map(function (item, i) {
      var safe = escapeHtml(item.label).replace(new RegExp('(' + q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'ig'), '<mark>$1</mark>');
      return '<div class="suggestion-option" role="option" tabindex="-1" data-index="' + i + '" data-value="' + escapeHtml(item.label) + '" aria-selected="false" data-testid="suggestion-' + i + '"><span>' + item.type + '</span><strong>' + safe + '</strong></div>';
    }).join('') || '<div class="suggestion-option">No suggestions</div>';
    list.querySelectorAll('[data-value]').forEach(function (option) { option.addEventListener('click', function () { selectSuggestion(this.dataset.value); }); });
  }

  function handleSuggestKeys(event) {
    var list = byId('suggestions-list');
    var options = Array.from(list.querySelectorAll('[data-value]'));
    if (event.key === 'Escape') closeSuggestions();
    if (!options.length || list.hidden) return;
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      state.suggestIndex = event.key === 'ArrowDown' ? Math.min(options.length - 1, state.suggestIndex + 1) : Math.max(0, state.suggestIndex - 1);
      options.forEach(function (o, i) { o.setAttribute('aria-selected', String(i === state.suggestIndex)); });
    }
    if (event.key === 'Enter' && state.suggestIndex >= 0) { event.preventDefault(); selectSuggestion(options[state.suggestIndex].dataset.value); }
  }

  function selectSuggestion(value) { byId('global-autosuggest').value = value; byId('autosuggest-status').textContent = 'Selected ' + value; closeSuggestions(); }
  function closeSuggestions() { byId('suggestions-list').hidden = true; byId('global-autosuggest').setAttribute('aria-expanded', 'false'); }

  function renderReport(event) {
    event.preventDefault();
    var sections = Array.from(document.querySelectorAll('input[name="reportSections"]:checked')).map(function (x) { return x.value; });
    var type = document.querySelector('input[name="reportType"]:checked').value;
    if (!sections.length) {
      byId('report-output').innerHTML = '<p class="error-text">Select at least one section before building the IPL report.</p>';
      return;
    }
    var recordRows = [];
    if (sections.indexOf('Batting records') !== -1) recordRows = recordRows.concat(state.data.records.filter(function (r) { return r.recordType === 'batting'; }).slice(0, 4));
    if (sections.indexOf('Bowling records') !== -1) recordRows = recordRows.concat(state.data.records.filter(function (r) { return r.recordType === 'bowling'; }).slice(0, 4));
    if (sections.indexOf('Team records') !== -1) recordRows = recordRows.concat(state.data.records.filter(function (r) { return r.recordType === 'team'; }).slice(0, 4));
    if (sections.indexOf('Fielding records') !== -1) recordRows = recordRows.concat(state.data.records.filter(function (r) { return r.recordType === 'fielding'; }).slice(0, 4));
    var seasonRows = sections.indexOf('Season results') !== -1 ? state.data.seasons.slice(-5).reverse() : [];
    byId('report-output').innerHTML =
      '<article class="report-panel" data-testid="generated-report-card"><h4>' + escapeHtml(type) + '</h4><p>Included sections: ' + escapeHtml(sections.join(', ')) + '</p>' +
      (recordRows.length ? '<div class="table-wrap"><table class="ipl-table report-table" data-testid="report-record-table"><thead><tr><th>Type</th><th>Player / Team</th><th>Value</th><th>Season</th></tr></thead><tbody>' + recordRows.map(function (r) { return '<tr><td>' + escapeHtml(r.recordType) + '</td><td>' + escapeHtml(r.playerOrTeam) + '</td><td>' + escapeHtml(r.value) + '</td><td>' + escapeHtml(r.season) + '</td></tr>'; }).join('') + '</tbody></table></div>' : '') +
      (seasonRows.length ? '<div class="report-list" data-testid="report-season-list">' + seasonRows.map(function (s) { return '<div class="leaderboard-item"><strong>' + s.season + ' - ' + escapeHtml(s.winner) + '</strong><span>Runner-up: ' + escapeHtml(s.runnerUp) + ' | ' + escapeHtml(s.margin) + '</span></div>'; }).join('') + '</div>' : '') +
      '</article>';
  }

  function applyPreset() {
    var presets = { opening: ['2026-03-21','2026-03-28'], playoffs: ['2026-05-27','2026-05-31'], final: ['2026-05-31','2026-05-31'] };
    byId('from-date').value = presets[this.dataset.preset][0];
    byId('to-date').value = presets[this.dataset.preset][1];
  }

  function findMatches() {
    var from = byId('from-date').value;
    var to = byId('to-date').value;
    var out = byId('date-results');
    if (!from || !to) { out.innerHTML = '<p class="error-text">From date and To date are required.</p>'; return; }
    if (from > to) { out.innerHTML = '<p class="error-text">From date cannot be after To date.</p>'; return; }
    var matches = state.data.matches.filter(function (m) { return m.date >= from && m.date <= to; });
    out.innerHTML = matches.length ? matches.map(function (m) { return '<div class="match-row" data-testid="match-date-result"><strong>' + m.date + '</strong><span>' + escapeHtml(m.teamA + ' vs ' + m.teamB + ' - ' + m.result) + '</span></div>'; }).join('') : '<p class="error-text">No matches exist in the selected range.</p>';
  }

  function openPlayerModal(index, trigger) {
    state.modalIndex = index;
    state.lastFocus = trigger || document.activeElement;
    updateModal();
    var modal = byId('player-detail-modal');
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    byId('player-modal-close').focus();
    document.addEventListener('keydown', modalKeyHandler);
    byId('player-modal-close').onclick = closePlayerModal;
    document.querySelector('.ipl-modal__overlay').onclick = closePlayerModal;
    byId('previous-player').onclick = function () { state.modalIndex = (state.modalIndex - 1 + state.data.players.length) % state.data.players.length; updateModal(); };
    byId('next-player').onclick = function () { state.modalIndex = (state.modalIndex + 1) % state.data.players.length; updateModal(); };
  }

  function updateModal() {
    var p = state.data.players[state.modalIndex];
    byId('player-modal-title').textContent = p.name;
    byId('player-modal-body').innerHTML = '<p><strong>Team:</strong> ' + escapeHtml(p.team) + '</p><p><strong>Role:</strong> ' + p.role + '</p><p><strong>Matches:</strong> ' + p.matches + ' | <strong>Runs:</strong> ' + p.runs + ' | <strong>Wickets:</strong> ' + p.wickets + '</p><p><strong>Major records:</strong> ' + escapeHtml(p.records.join(', ')) + '</p><p>' + escapeHtml(p.description) + '</p>';
  }

  function modalKeyHandler(event) {
    if (event.key === 'Escape') closePlayerModal();
    if (event.key === 'Tab') {
      var modal = byId('player-detail-modal');
      var focusables = Array.from(modal.querySelectorAll('button,[href],input,select,textarea,[tabindex]:not([tabindex="-1"])')).filter(function (x) { return !x.disabled; });
      var first = focusables[0], last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  }

  function closePlayerModal() {
    var modal = byId('player-detail-modal');
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', modalKeyHandler);
    if (state.lastFocus) state.lastFocus.focus();
  }

  function defineShadowCard() {
    if (customElements.get('ipl-record-card')) return;
    customElements.define('ipl-record-card', class extends HTMLElement {
      connectedCallback() {
        var root = this.attachShadow({ mode: 'open' });
        root.innerHTML = '<style>:host{display:block}.card{border:1px solid rgba(56,189,248,.45);border-radius:14px;padding:1rem;background:#0f172a;color:#f8fafc}button{min-height:40px;border-radius:10px;border:1px solid #38bdf8;background:#082f49;color:#e0f2fe;padding:.5rem .75rem}</style><article class="card" data-testid="shadow-player-card"><h4>Virat Kohli</h4><p>Record title: Most career runs</p><p>Record value: 8661 runs</p><button type="button" id="shadow-reveal" aria-expanded="false">Reveal Details</button><p id="shadow-details" hidden>Open Shadow DOM practice detail.</p></article>';
        root.getElementById('shadow-reveal').addEventListener('click', function () {
          var d = root.getElementById('shadow-details');
          d.hidden = !d.hidden;
          this.setAttribute('aria-expanded', String(!d.hidden));
        });
      }
    });
  }

  function renderDragPool() {
    var chosen = new Set(Array.from(byId('playing-xi').querySelectorAll('[data-player-id]')).map(function (x) { return x.dataset.playerId; }));
    byId('player-pool').innerHTML = state.data.players.map(function (p) {
      return '<div class="draggable-player" draggable="true" data-player-id="' + p.id + '" data-player-name="' + escapeHtml(p.name) + '" data-testid="drag-player-' + p.id + '"><span><strong>' + escapeHtml(p.name) + '</strong><small>' + escapeHtml(p.teamCode + ' | ' + p.role) + '</small></span><button class="compact-btn" type="button" data-add-player="' + p.id + '" ' + (chosen.has(p.id) ? 'disabled' : '') + '>Add</button></div>';
    }).join('');
    byId('player-pool').querySelectorAll('.draggable-player').forEach(function (el) { el.addEventListener('dragstart', function (e) { e.dataTransfer.setData('text/plain', this.dataset.playerId); }); });
    byId('player-pool').querySelectorAll('[data-add-player]').forEach(function (btn) { btn.addEventListener('click', function () { addPlayerToXi(this.dataset.addPlayer); }); });
    updateXiCount();
  }

  function handleDrop(event) { event.preventDefault(); addPlayerToXi(event.dataTransfer.getData('text/plain')); }
  function addPlayerToXi(id) {
    var area = byId('playing-xi');
    if (area.querySelector('[data-player-id="' + id + '"]')) { byId('xi-message').textContent = 'Duplicate players are prevented.'; return; }
    if (area.querySelectorAll('[data-player-id]').length >= 11) { byId('xi-message').textContent = 'Maximum 11 players allowed.'; return; }
    var p = state.data.players.find(function (x) { return x.id === id; });
    area.insertAdjacentHTML('beforeend', '<div class="draggable-player selected-xi-player" data-player-id="' + p.id + '" data-player-role="' + escapeHtml(p.role) + '" data-testid="selected-xi-player-' + p.id + '"><span><strong>' + escapeHtml(p.name) + '</strong><small>' + escapeHtml(p.teamCode + ' | ' + p.role) + '</small></span><label class="captain-choice"><input type="radio" name="xiCaptain" value="' + p.id + '" data-testid="captain-' + p.id + '"> Captain</label><button class="compact-btn" type="button" aria-label="Remove ' + escapeHtml(p.name) + '">Remove</button></div>');
    area.lastElementChild.querySelector('button').addEventListener('click', function () { this.closest('[data-player-id]').remove(); renderDragPool(); });
    byId('xi-message').textContent = '';
    renderDragPool();
  }
  function resetXi() { byId('playing-xi').innerHTML = ''; byId('xi-message').textContent = ''; renderDragPool(); }
  function updateXiCount() { byId('xi-count').textContent = 'Selected players: ' + byId('playing-xi').querySelectorAll('[data-player-id]').length + ' / 11'; }

  function validatePlayingXi() {
    var selected = Array.from(byId('playing-xi').querySelectorAll('[data-player-id]'));
    var captain = byId('playing-xi').querySelector('input[name="xiCaptain"]:checked');
    var hasWicketkeeper = selected.some(function (row) { return normalizeRole(row.dataset.playerRole) === 'wicketkeeper'; });
    var hasBowler = selected.some(function (row) { return normalizeRole(row.dataset.playerRole) === 'bowler'; });
    var errors = [];
    if (selected.length !== 11) errors.push('Select exactly 11 players.');
    if (!captain) errors.push('Select one captain.');
    if (!hasWicketkeeper) errors.push('Select at least one wicketkeeper.');
    if (!hasBowler) errors.push('Select at least one bowler.');
    if (errors.length) {
      byId('xi-message').innerHTML = '<span class="error-text">' + errors.map(escapeHtml).join(' ') + '</span>';
      return;
    }
    var captainName = state.data.players.find(function (p) { return p.id === captain.value; }).name;
    byId('xi-message').innerHTML = '<span class="success-text" data-testid="playing-xi-success">Playing XI submitted. Captain: ' + escapeHtml(captainName) + '. Wicketkeeper requirement passed.</span>';
  }

  function validateUpload() {
    var file = this.files[0];
    var status = byId('upload-status');
    if (!file) { status.textContent = ''; return; }
    if (!/\.(json|csv)$/i.test(file.name)) { status.innerHTML = '<span class="error-text">Only .json and .csv files are accepted.</span>'; return; }
    if (file.size > 1024 * 1024) { status.innerHTML = '<span class="error-text">File must be 1 MB or smaller.</span>'; return; }
    status.innerHTML = '<span class="success-text">Selected file: ' + escapeHtml(file.name) + '. Validation passed.</span>';
  }

  async function loadStats() {
    if (state.networkBusy) return;
    state.networkBusy = true;
    byId('load-stats').disabled = true;
    byId('retry-stats').hidden = true;
    byId('network-status').innerHTML = '<span class="loading-spinner">Loading detailed statistics...</span>';
    await delay(1000 + Math.floor(Math.random() * 2001));
    if (byId('simulate-error').checked) {
      byId('network-status').innerHTML = '<p class="error-text">Intentional network error mode is enabled.</p>';
      byId('retry-stats').hidden = false;
    } else {
      byId('network-status').innerHTML = '<p class="success-text" data-testid="network-success">Detailed statistics loaded successfully.</p>';
    }
    state.networkBusy = false;
    byId('load-stats').disabled = false;
  }

  function generateMatchIdentifier() {
    var id = 'match-card-' + Date.now();
    byId('match-id-output').innerHTML = '<article class="leaderboard-item" id="' + id + '" data-testid="dynamic-match-card"><strong>TN-IPL-' + Math.floor(Math.random() * 90000 + 10000) + '</strong><span>' + new Date().toISOString() + '</span><button class="compact-btn" type="button" id="regenerate-match-id" data-testid="regenerate-match-identifier">Regenerate</button></article>';
    byId('regenerate-match-id').addEventListener('click', generateMatchIdentifier);
  }

  function showDelayedRecord() {
    cancelDelayed();
    byId('delay-status').textContent = 'Delayed record pending...';
    state.delayedTimer = setTimeout(function () { byId('delayed-record').hidden = false; byId('delay-status').textContent = 'Delayed record visible.'; state.delayedTimer = null; }, 2000);
  }
  function cancelDelayed() { if (state.delayedTimer) clearTimeout(state.delayedTimer); state.delayedTimer = null; byId('delayed-record').hidden = true; byId('delay-status').textContent = 'Delayed record cancelled.'; }

  function renderFeed() {
    var records = state.data.records.slice(0, state.feedCount);
    byId('records-feed').innerHTML = records.map(function (r, i) { return '<article class="feed-item" data-testid="feed-record-' + i + '"><strong>' + escapeHtml(r.playerOrTeam) + '</strong><span>' + escapeHtml(r.recordType + ' | ' + r.value + ' | ' + r.season) + '</span></article>'; }).join('');
    var done = state.feedCount >= state.data.records.length;
    byId('load-more-records').disabled = done;
    byId('feed-status').textContent = done ? 'All records loaded' : records.length + ' records loaded';
  }
  function loadMoreFeed() { state.feedCount = Math.min(state.data.records.length, state.feedCount + 6); renderFeed(); }
  function maybeAutoLoadFeed() { if (state.feedAutoLoads >= 3 || state.feedCount < 18) return; if (window.innerHeight + window.scrollY > document.body.offsetHeight - 500) { state.feedAutoLoads += 1; loadMoreFeed(); } }

  function renderComparison() {
    var a = byId('compare-team-a').value, b = byId('compare-team-b').value;
    var row = state.data.headToHead.find(function (x) { return (x.teamA === a && x.teamB === b) || (x.teamA === b && x.teamB === a); });
    if (!a || !b || a === b) { byId('comparison-output').innerHTML = '<p class="error-text">Choose two different teams.</p>'; return; }
    if (!row) { byId('comparison-output').innerHTML = '<p class="error-text">No comparison data available for this pair.</p>'; return; }
    var winsA = row.teamA === a ? row.winsA : row.winsB;
    var winsB = row.teamA === a ? row.winsB : row.winsA;
    byId('comparison-output').innerHTML = '<div class="table-wrap desktop-comparison"><table class="ipl-table" data-testid="head-to-head-table"><thead><tr><th>Matches</th><th>Wins by Team A</th><th>Wins by Team B</th><th>No results</th><th>Highest total</th><th>Lowest total</th></tr></thead><tbody><tr><td>' + row.matches + '</td><td>' + winsA + '</td><td>' + winsB + '</td><td>' + row.noResults + '</td><td>' + row.highestTotal + '</td><td>' + row.lowestTotal + '</td></tr></tbody></table></div><div class="mobile-comparison-cards" data-testid="head-to-head-mobile-cards"><article class="leaderboard-item"><strong>Matches</strong><span>' + row.matches + '</span></article><article class="leaderboard-item"><strong>Wins by Team A</strong><span>' + winsA + '</span></article><article class="leaderboard-item"><strong>Wins by Team B</strong><span>' + winsB + '</span></article><article class="leaderboard-item"><strong>No results</strong><span>' + row.noResults + '</span></article><article class="leaderboard-item"><strong>Highest total</strong><span>' + row.highestTotal + '</span></article><article class="leaderboard-item"><strong>Lowest total</strong><span>' + row.lowestTotal + '</span></article></div>';
  }

  function flipCard() {
    var flipped = !this.classList.contains('is-flipped');
    this.classList.toggle('is-flipped', flipped);
    this.setAttribute('aria-pressed', String(flipped));
  }

  function renderQuiz() {
    var quiz = [
      { type: 'single', q: 'Who won the 2026 IPL in this dataset?', options: ['Royal Challengers Bengaluru','Gujarat Titans','Kolkata Knight Riders'], answer: ['Royal Challengers Bengaluru'], why: 'The 2026 season row lists Bengaluru as winner over Gujarat Titans.' },
      { type: 'multi', q: 'Select teams with five titles in this dataset.', options: ['Chennai Super Kings','Mumbai Indians','Kolkata Knight Riders'], answer: ['Chennai Super Kings','Mumbai Indians'], why: 'CSK and MI are listed with five titles.' },
      { type: 'true', q: 'Gujarat Titans have one title and three final appearances in this dataset.', options: ['True','False'], answer: ['True'], why: 'Gujarat won in 2022 and finished runner-up in 2023 and 2026.' },
      { type: 'single', q: 'Which player has the 175* batting record?', options: ['Chris Gayle','Virat Kohli','AB de Villiers'], answer: ['Chris Gayle'], why: 'The batting records include Chris Gayle 175*.' },
      { type: 'multi', q: 'Select record types available in the local dataset.', options: ['batting','bowling','fielding'], answer: ['batting','bowling','fielding'], why: 'All three record types are present.' }
    ];
    var q = quiz[state.quizIndex];
    byId('quiz-root').innerHTML = '<p data-testid="quiz-progress">Question ' + (state.quizIndex + 1) + ' of ' + quiz.length + '</p><h4>' + escapeHtml(q.q) + '</h4><form id="quiz-form" class="quiz-options">' + q.options.map(function (o) { var type = q.type === 'multi' ? 'checkbox' : 'radio'; var checked = (state.quizAnswers[state.quizIndex] || []).indexOf(o) !== -1; return '<label class="choice-label"><input type="' + type + '" name="quizOption" value="' + escapeHtml(o) + '" ' + (checked ? 'checked' : '') + ' data-testid="quiz-option"> ' + escapeHtml(o) + '</label>'; }).join('') + '</form><div class="button-row"><button class="secondary-btn" type="button" id="quiz-prev" data-testid="quiz-prev">Previous</button><button class="secondary-btn" type="button" id="quiz-next" data-testid="quiz-next">Next</button><button class="primary-btn" type="button" id="quiz-submit" data-testid="quiz-submit">Submit Quiz</button><button class="compact-btn" type="button" id="quiz-restart" data-testid="quiz-restart">Restart Quiz</button></div><div id="quiz-result" data-testid="quiz-result"></div>';
    byId('quiz-form').addEventListener('change', saveQuizAnswer);
    byId('quiz-prev').disabled = state.quizIndex === 0;
    byId('quiz-next').disabled = state.quizIndex === quiz.length - 1;
    byId('quiz-prev').onclick = function () { saveQuizAnswer(); state.quizIndex -= 1; renderQuiz(); };
    byId('quiz-next').onclick = function () { saveQuizAnswer(); state.quizIndex += 1; renderQuiz(); };
    byId('quiz-restart').onclick = function () { state.quizIndex = 0; state.quizAnswers = {}; renderQuiz(); };
    byId('quiz-submit').onclick = function () { saveQuizAnswer(); var score = quiz.reduce(function (sum, item, i) { var ans = (state.quizAnswers[i] || []).slice().sort().join('|'); return sum + (ans === item.answer.slice().sort().join('|') ? 1 : 0); }, 0); byId('quiz-result').innerHTML = '<p class="success-text">Score: ' + score + ' / ' + quiz.length + '</p>' + quiz.map(function (item, i) { return '<p><strong>Q' + (i + 1) + ':</strong> ' + escapeHtml(item.why) + '</p>'; }).join(''); };
    function saveQuizAnswer() { state.quizAnswers[state.quizIndex] = Array.from(document.querySelectorAll('input[name="quizOption"]:checked')).map(function (x) { return x.value; }); }
  }

  function renderFavourites() {
    var only = byId('show-favs-only') && byId('show-favs-only').checked;
    var items = state.data.players.concat(state.data.teams.map(function (t) { return { id: 'team-' + t.id, name: t.name, team: 'Team record', role: t.titles + ' titles' }; }));
    if (only) items = items.filter(function (x) { return state.favourites.has(x.id); });
    byId('fav-count').textContent = 'Favourite count: ' + state.favourites.size;
    byId('favourites-list').innerHTML = items.map(function (x) {
      var fav = state.favourites.has(x.id);
      return '<div class="favourite-row" data-testid="favourite-row-' + x.id + '"><strong>' + escapeHtml(x.name) + '</strong><span>' + escapeHtml((x.team || '') + ' | ' + (x.role || '')) + '</span><button class="compact-btn" type="button" data-fav-id="' + x.id + '" aria-pressed="' + fav + '" data-testid="favourite-toggle-' + x.id + '">' + (fav ? 'Unfavourite' : 'Favourite') + '</button></div>';
    }).join('') || '<p>No favourites found.</p>';
    byId('favourites-list').querySelectorAll('[data-fav-id]').forEach(function (btn) { btn.addEventListener('click', function () { state.favourites.has(this.dataset.favId) ? state.favourites.delete(this.dataset.favId) : state.favourites.add(this.dataset.favId); saveFavs(); renderFavourites(); }); });
  }

  async function tryApi() {
    var path = byId('api-endpoint').value;
    var response = await fetch(path);
    var json = await response.json();
    byId('api-status').textContent = response.status;
    byId('api-response').textContent = JSON.stringify(json, null, 2);
  }

  async function copyBaseUrl() {
    var url = formatRoute();
    byId('base-url-output').textContent = url;
    try { await navigator.clipboard.writeText(url); byId('copy-url-status').textContent = 'Base URL copied.'; }
    catch (error) { byId('copy-url-status').textContent = 'Copy failed. URL is shown above.'; }
  }

  function showToast(text) {
    var toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = text;
    document.getElementById('toast-region').appendChild(toast);
    setTimeout(function () { toast.remove(); }, 2600);
  }

  function renderChallenges() {
    byId('challenge-grid').innerHTML = challenges.map(function (c, i) {
      return '<article class="glass-card challenge-card" data-testid="challenge-card-' + (i + 1) + '"><span class="difficulty">' + c[0] + '</span><h3>Challenge ' + (i + 1) + '</h3><p><strong>Task:</strong> ' + escapeHtml(c[1]) + '</p><p><strong>Expected outcome:</strong> ' + escapeHtml(c[2]) + '</p><p><strong>Section:</strong> ' + escapeHtml(c[3]) + '</p><button class="compact-btn" type="button" aria-expanded="false" data-testid="challenge-hint-' + (i + 1) + '">Expand solution hint</button><p hidden>' + escapeHtml(c[4]) + '</p></article>';
    }).join('');
    byId('challenge-grid').querySelectorAll('button').forEach(function (btn) { btn.addEventListener('click', function () { var p = this.nextElementSibling; p.hidden = !p.hidden; this.setAttribute('aria-expanded', String(!p.hidden)); }); });
  }

  init().catch(function (error) {
    root.innerHTML = '<p class="error-text">Unable to load IPL practice data.</p>';
    console.error(error);
  });
})();
