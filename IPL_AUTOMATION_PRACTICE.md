# IPL Automation Practice Playground

## Page Route

- Local/static route: `ipl-automation-practice.html`
- Preferred production URL: `/ipl-automation-practice.html`

## Main Features

- IPL-themed player search with loading, empty state, Enter submit and reset.
- Sortable and paginated player records table.
- Multi-select team cards using real checkbox inputs.
- Season results filtering, sorting and expandable details.
- Accessible player details modal with Escape, overlay close, focus trap and focus restore.
- Dynamic leaderboard tabs, autocomplete, report builder, date range validation, alerts, iframe, open Shadow DOM component, drag and drop, tooltips, CSV download, local file upload, multiple-tab practice, network-delay simulation, dynamic IDs, delayed elements, load-more feed, responsive comparison table, flip cards, quiz and localStorage favourites.
- API practice panel using static JSON fixture files.
- Unstable Locator Challenge and Flat vs Complex DOM sections for advanced locator strategy practice.

## Data File Location

- Main structured data: `data/ipl-records.json`
- Snapshot version: `1.0`
- Snapshot date: `2025-06-04`

## API Or Fixture Endpoints

This project is static, so API practice uses JSON fixtures:

- `GET /api/ipl/players.json`
- `GET /api/ipl/players/virat-kohli.json`
- `GET /api/ipl/teams.json`
- `GET /api/ipl/seasons.json`
- `GET /api/ipl/records.json`
- `GET /api/ipl/records-batting.json` for `records?type=batting`
- `GET /api/ipl/records-bowling.json` for `records?type=bowling`

Each response includes `success`, `data`, `count`, `timestamp` and `snapshotVersion`.

## Automation-Friendly Attributes

The page uses stable IDs, names, labels, roles, aria attributes and `data-testid` values such as:

- `player-search-input`
- `team-filter`
- `player-records-table`
- `player-table-page-size`
- `season-table`
- `player-details-modal`
- `scorecard-iframe`
- `load-more-records`
- `dynamic-match-card`
- `api-response`
- `stable-locator-button`

## Local Run Instructions

Serve the repository root with any static server. Example:

```powershell
python -m http.server 8000
```

Then open:

```text
http://localhost:8000/ipl-automation-practice.html
```

## Build Command

There is no package build pipeline in this static project. Validation is done by serving the static site and checking the page in a browser.

## Data Source Attribution

IPL statistics used for educational automation practice. Source: Wikipedia contributors. Data snapshot may not represent the latest live records.

Reference:

https://en.wikipedia.org/wiki/List_of_Indian_Premier_League_records_and_statistics

## Known Intentional Unstable Elements

The `Unstable Locator Challenge` section intentionally includes:

- A generated CSS class that changes on reload.
- Repeated visible text.
- A deeply nested button.
- Two visually similar cards.

Use role, label, accessible name or stable `data-testid` attributes for reliable automation.
