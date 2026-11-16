# Matking backend: first checkpoint

This CommonJS Express backend provides one read-only dish list from MySQL.

## Files and request flow

- `server.js`: loads `.env`, starts Express on port 9000 by default, configures
  CORS for `http://localhost:8080` and `http://localhost:8081`, parses JSON,
  serves `/static`, and handles health checks, missing routes and errors.
- `config/database.js`: creates the `mysql2/promise` connection pool.
- `routes/dishRoutes.js`: sends `GET /api/dishes` to the controller.
- `controllers/dishController.js`: awaits the repository, converts non-null
  `dish_price` values to numbers, and returns a JSON array. Errors go to Express.
- `repositories/dishRepository.js`: selects the six existing columns from `dish`,
  ordered by `dish_id`, and returns the MySQL rows.
- `.env.example`: example settings without real credentials.
- `package.json`: uses `server.js` as its entry point and adds `npm start`.

Request flow:

```text
GET /api/dishes -> Express -> CORS / JSON middlewares -> dish router
-> controller -> repository -> MySQL pool -> Restaurant.dish
-> rows -> controller (numeric prices) -> JSON array response
```

There is no JSON fallback. A database failure returns HTTP 500 with a generic
JSON error; the terminal logs the underlying error code or message.

## Local setup (PowerShell)

From the repository root:

```powershell
cd webapp_serverside
npm.cmd ci
if (!(Test-Path .env)) { Copy-Item .env.example .env }
notepad .env
```

`npm.cmd ci` installs the dependencies already recorded in `package-lock.json`.
Skip it when those dependencies are already installed. Use `npm.cmd` on Windows
if PowerShell blocks `npm.ps1`; `npm` also works in terminals that allow it.
Copy the example only for the initial setup; keep any existing `.env` settings.

In `.env`, set `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD` and `DB_NAME` for
your local MySQL instance. The supplied SQL uses `DB_NAME=Restaurant` (including
the capital R). `PORT=9000` sets the Express port. The `.env` file is already
ignored by the root `.gitignore`. Do not put real credentials in `.env.example`.

Start your local MySQL service and make sure the configured user can connect
and has `SELECT` access to `Restaurant.dish`. To check it directly with the
MySQL command-line client (replace the username, host and port as needed):

```powershell
mysql -h 127.0.0.1 -P 3306 -u your_mysql_user -p Restaurant
```

Enter the password when prompted, then run:

```sql
SELECT dish_id, dish_type, dish_name, dish_price, dish_calories, dish_ingredients
FROM dish ORDER BY dish_id;
```

If `mysql` is not on PATH, use MySQL Workbench's SQL editor or the full path to
`mysql.exe` with PowerShell's `&` operator.

If the database has not been initialized, first review the existing
`Restaurant_Poisson_Sieux.sql` in the repository root. It creates `Restaurant`
and includes sample dishes. **It also contains `DROP TABLE` statements and
deletes existing table data.** Only on a local project database whose contents
you intend to replace, run it manually in MySQL Workbench or from a MySQL client
session with sufficient permissions:

```sql
SOURCE C:/Users/mathp/Documents/GitHub/S5_Adv_WeB_Projet/Restaurant_Poisson_Sieux.sql;
```

Adjust that path if your checkout is elsewhere. The backend never executes
this script or changes the schema.

Start Express from `webapp_serverside`:

```powershell
npm.cmd start
```

Stop it with Ctrl+C. Restart after changing `.env`.

## Browser and terminal checks

With the default Express port, open:

- `http://localhost:9000/api/health`: HTTP 200 and `{"status":"ok"}`. This
  checks Express only, not MySQL.
- `http://localhost:9000/api/dishes`: HTTP 200 and an array of actual MySQL rows
  when the database is configured. Prices are numbers, for example `8.5`.
- `http://localhost:9000/static/ping.txt`: HTTP 200 and the existing `PONG` file.

Or run these in another PowerShell terminal:

```powershell
Invoke-RestMethod http://localhost:9000/api/health
Invoke-RestMethod http://localhost:9000/api/dishes
Invoke-WebRequest http://localhost:9000/static/ping.txt -UseBasicParsing
```

An empty database table returns `[]`. A database error returns HTTP 500, never
fake data. Check the backend terminal: `ECONNREFUSED` usually means the MySQL
service or host/port is wrong; `ER_ACCESS_DENIED_ERROR` means the account or
password needs checking; `ER_BAD_DB_ERROR` means `Restaurant` is missing; and
`ER_NO_SUCH_TABLE` means `dish` is missing in the selected database.

The Vue frontend is unchanged and still uses its existing prototype data.
Connecting it to this API is outside this checkpoint.

## Verification results (16 November 2026)

- Installed the existing locked dependencies with `npm.cmd ci --no-audit
  --no-fund` because `node_modules` was absent; no dependency versions or
  lockfile contents were changed.
- `npm.cmd start` launched the backend on the default port 9000.
- `GET /api/health`: HTTP 200 with `{"status":"ok"}`.
- `GET /static/ping.txt`: HTTP 200; the body exactly matched the existing file.
- CORS: both frontend origins received the matching allow-origin header;
  `http://localhost:8082` did not. An allowed preflight returned HTTP 204.
- An unknown route returned HTTP 404 JSON. A malformed JSON body returned
  HTTP 400 JSON.
- `GET /api/dishes`: HTTP 500 with `{"error":"Internal server error."}`;
  MySQL returned `ER_ACCESS_DENIED_ERROR`. No `.env` or `DB_*` variables were
  configured. Express remained available after the failed database request.
- Isolated controller checks passed for price conversion (`"8.50"` to `8.5`),
  zero and null prices, an empty result, and propagation of repository errors.
  These checks used test doubles and do not prove a successful MySQL query.
- All five JavaScript files passed `node --check`; `git diff --check` passed.

**Remaining verification:** configure a real local MySQL account in `.env`,
confirm `Restaurant.dish` exists, restart the backend, and verify that
`GET /api/dishes` returns HTTP 200 with the actual database rows. A successful
database SELECT has not been verified in this environment.
