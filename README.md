

## KaiMap Architecture

- **Backend**: Node.js (Express) API server
  - Provides endpoints for food price data
  - Handles caching and database queries
- **Database**: PostgreSQL
  - Stores cleaned food price data
  - Supports geolocation queries
- **Frontend**: React + Tailwind
  - Displays dashboards, charts, and maps
  - Fetches data from backend
- **Data Pipeline (ETL)**: Node.js script
  - Fetches Stats NZ / MBIE food price data
  - Cleans and normalizes data
  - Inserts into PostgreSQL
