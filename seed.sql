-- Seed data for COMPASS
-- Run with: wrangler d1 execute compass-db --local --file=seed.sql

-- ─── Customers (from Customers324.csv) ───

INSERT OR IGNORE INTO customers (id, name, email, phone, created_at) VALUES
  ('cust-001', 'Greg Smith', NULL, NULL, '2023-07-27T08:00:00Z'),
  ('cust-002', 'Andrew and Karen Rodney', NULL, NULL, '2023-07-27T08:00:00Z'),
  ('cust-003', 'Sandra Coen', NULL, NULL, '2023-08-15T10:00:00Z'),
  ('cust-004', 'Keith & Jennifer Hinson', NULL, NULL, '2023-09-01T08:00:00Z'),
  ('cust-005', 'Gerald and Kristi Taylor', NULL, NULL, '2023-09-10T09:00:00Z'),
  ('cust-006', 'Travis and Tanis Loomis', NULL, NULL, '2023-10-01T08:00:00Z'),
  ('cust-007', 'James McGorry', NULL, NULL, '2023-10-15T10:00:00Z'),
  ('cust-008', 'Redline Pipeline', NULL, NULL, '2023-11-01T08:00:00Z'),
  ('cust-009', 'Justin Rapp', NULL, NULL, '2023-11-15T09:00:00Z'),
  ('cust-010', 'Matt B Willson', NULL, NULL, '2023-12-01T08:00:00Z'),
  ('cust-011', 'Izabela Bigley', NULL, NULL, '2024-01-10T08:00:00Z'),
  ('cust-012', 'Rob Montano', NULL, NULL, '2024-02-01T09:00:00Z'),
  ('cust-013', 'Robert Kelsey', NULL, NULL, '2024-03-01T08:00:00Z'),
  ('cust-014', 'Chris Auger', NULL, NULL, '2024-03-15T10:00:00Z'),
  ('cust-015', 'Joseph Clifford', NULL, NULL, '2024-04-01T08:00:00Z'),
  ('cust-016', 'Dan Maley', NULL, NULL, '2024-05-01T09:00:00Z'),
  ('cust-017', 'Russ Gehling', NULL, NULL, '2024-06-01T08:00:00Z'),
  ('cust-018', 'James (Jimmy) Lusero', NULL, NULL, '2024-07-01T10:00:00Z'),
  ('cust-019', 'Bach Builders LLC', NULL, NULL, '2024-08-01T08:00:00Z'),
  ('cust-020', 'Mark Myers', NULL, NULL, '2024-09-01T09:00:00Z'),
  ('cust-021', 'William M Rainey', NULL, NULL, '2024-01-15T08:00:00Z'),
  ('cust-022', 'Craig Chellis', NULL, NULL, '2024-02-20T09:00:00Z'),
  ('cust-023', 'Donald Henrich', NULL, NULL, '2024-03-10T08:00:00Z'),
  ('cust-024', 'Kelsey & Daniel Dougherty', NULL, NULL, '2024-04-05T10:00:00Z'),
  ('cust-025', 'German Nevarez', NULL, NULL, '2024-05-12T08:00:00Z'),
  ('cust-026', 'Eric Wammel', NULL, NULL, '2024-06-20T09:00:00Z'),
  ('cust-027', 'Troy & Wendy Reiter', NULL, NULL, '2024-07-15T08:00:00Z'),
  ('cust-028', 'Fish Builders', NULL, NULL, '2024-08-01T10:00:00Z'),
  ('cust-029', 'Nathan and Lisa Wood', NULL, NULL, '2024-09-10T08:00:00Z'),
  ('cust-030', 'Stephanie Wetherby', NULL, NULL, '2024-10-01T09:00:00Z'),
  ('cust-031', 'Terry Weatherford', NULL, NULL, '2024-11-01T08:00:00Z'),
  ('cust-032', 'Scott Edwards', NULL, NULL, '2024-12-01T10:00:00Z'),
  ('cust-033', 'Tom Backes', NULL, NULL, '2025-01-15T08:00:00Z'),
  ('cust-034', 'James Chaney', NULL, NULL, '2025-02-01T09:00:00Z'),
  ('cust-035', 'Michael Ziehler', NULL, NULL, '2025-03-10T08:00:00Z'),
  ('cust-036', 'Alec Korver', NULL, NULL, '2025-04-01T10:00:00Z'),
  ('cust-037', 'David & Debi Strom', NULL, NULL, '2025-05-01T08:00:00Z'),
  ('cust-038', 'Dyer Construction Co.', NULL, NULL, '2025-06-15T09:00:00Z'),
  ('cust-039', 'Paldamas Construction', NULL, NULL, '2025-07-01T08:00:00Z'),
  ('cust-040', 'Barton Supply', NULL, NULL, '2025-08-01T10:00:00Z');

-- ─── Vendors (from Vendors698.csv) ───

INSERT OR IGNORE INTO vendors (id, name, category, email, phone, address, created_at) VALUES
  ('vend-001', '1st Priority Home Improvements LLC', 'Subcontractor', '1stpriorityhomeimprovement@gmail.com', NULL, '2928 Main St. Apt 101, Colorado Springs, CO 80907', '2023-07-16T20:26:00Z'),
  ('vend-002', 'Advantage Tile Work Inc.', 'Subcontractor', NULL, NULL, NULL, '2023-07-16T20:26:00Z'),
  ('vend-003', 'Apex Radon', 'Subcontractor', NULL, NULL, NULL, '2023-07-16T20:26:00Z'),
  ('vend-004', 'Christensen Construction Co. Inc.', 'Subcontractor', NULL, NULL, NULL, '2023-07-16T20:26:00Z'),
  ('vend-005', 'Kilgore Companies dba Peak Ready Mix', 'Subcontractor', NULL, NULL, NULL, '2023-07-16T20:26:00Z'),
  ('vend-006', 'Smelker Concrete Pumping Inc.', 'Subcontractor', NULL, NULL, NULL, '2023-07-16T20:26:00Z'),
  ('vend-007', 'Simpson Strong-Tie Co Inc', 'Subcontractor', NULL, NULL, NULL, '2023-07-16T20:26:00Z'),
  ('vend-008', 'Florissant ACE Hardware', 'Supplier', NULL, NULL, NULL, '2023-07-16T20:26:00Z'),
  ('vend-009', 'A-Mark Stamp/Budget Sign', 'Supplier', NULL, NULL, NULL, '2023-07-16T20:26:00Z'),
  ('vend-010', 'Aggregate Ind dba Transit Mix Concrete Co.', 'Supplier', NULL, NULL, NULL, '2023-07-16T20:26:00Z'),
  ('vend-011', 'Airlite Plastics Co.', 'Supplier', NULL, NULL, NULL, '2023-07-16T20:26:00Z'),
  ('vend-012', 'Apex Waste - Teller County', 'Supplier', NULL, NULL, NULL, '2023-07-16T20:26:00Z'),
  ('vend-013', 'Digital River', 'Supplier', NULL, NULL, NULL, '2023-07-16T20:26:00Z'),
  ('vend-014', 'Divide Feed', 'Supplier', NULL, NULL, NULL, '2023-07-16T20:26:00Z'),
  ('vend-015', 'Hardrick Enterprises', 'Supplier', NULL, NULL, NULL, '2023-07-16T20:26:00Z'),
  ('vend-016', 'MacArthur Co.', 'Supplier', NULL, NULL, NULL, '2023-07-16T20:26:00Z'),
  ('vend-017', 'Colorado Geoscience & Design', 'Subcontractor', NULL, NULL, NULL, '2023-07-16T20:26:00Z'),
  ('vend-018', 'Hamacher Well Works', 'Subcontractor', NULL, NULL, NULL, '2023-07-16T20:26:00Z'),
  ('vend-019', 'H2Air of Colorado', 'Subcontractor', NULL, NULL, NULL, '2023-07-16T20:26:00Z'),
  ('vend-020', 'TK Concrete Lifting', 'Subcontractor', NULL, NULL, NULL, '2023-07-16T20:26:00Z'),
  ('vend-021', 'Mule Creek Gravel', 'Supplier', NULL, NULL, NULL, '2023-07-16T20:26:00Z'),
  ('vend-022', 'BURNCO Colorado', 'Supplier', NULL, NULL, NULL, '2023-07-16T20:26:00Z'),
  ('vend-023', 'Agate Services', 'Subcontractor', NULL, NULL, NULL, '2023-07-16T20:26:00Z'),
  ('vend-024', 'JDM Consulting', 'Subcontractor', NULL, NULL, NULL, '2023-07-16T20:26:00Z'),
  ('vend-025', 'Teds Plumbing', 'Subcontractor', NULL, NULL, NULL, '2023-07-16T20:26:00Z');

-- ─── Projects (realistic HPS projects using customer names) ───

INSERT OR IGNORE INTO projects (id, name, status, address, client_name, project_manager, created_at) VALUES
  ('proj-o-001', 'O-001-5678-Williams', 'ACTIVE', '5678 Pine Ridge Dr, Woodland Park, CO', 'Matt B Willson', 'Daniel M Vogel', '2025-07-10T08:00:00Z'),
  ('proj-o-002', 'O-002-9012-Chen', 'ACTIVE', '9012 Elk Creek Rd, Divide, CO', 'Sandra Coen', 'Daniel M Vogel', '2025-09-20T09:00:00Z'),
  ('proj-o-003', 'O-003-3456-Taylor', 'OPEN', '3456 Mountain View Ln, Florissant, CO', 'Gerald and Kristi Taylor', 'Wesley Jones', '2025-11-05T10:00:00Z'),
  ('proj-o-004', 'O-004-7890-Hinson', 'ACTIVE', '7890 Sunset Trail, Cripple Creek, CO', 'Keith & Jennifer Hinson', 'Daniel M Vogel', '2025-12-01T08:00:00Z'),
  ('proj-o-005', 'O-005-2345-Loomis', 'OPEN', '2345 Aspen Grove Way, Woodland Park, CO', 'Travis and Tanis Loomis', 'Wesley Jones', '2026-01-10T09:00:00Z'),
  ('proj-n-001', 'N-001-1234-Johnson', 'ACTIVE', '1234 Gold Camp Rd, Colorado Springs, CO', 'James McGorry', 'Daniel M Vogel', '2025-08-15T09:00:00Z'),
  ('proj-n-002', 'N-002-5600-Martinez', 'COMPLETE', '5600 Ute Pass Ave, Cascade, CO', 'Justin Rapp', 'Wesley Jones', '2025-03-01T08:00:00Z'),
  ('proj-n-003', 'N-003-8800-Kelsey', 'ACTIVE', '8800 Rampart Range Rd, Woodland Park, CO', 'Robert Kelsey', 'Daniel M Vogel', '2025-10-15T10:00:00Z'),
  ('proj-n-004', 'N-004-4200-Auger', 'OPEN', '4200 Teller County Rd, Florissant, CO', 'Chris Auger', 'Wesley Jones', '2026-01-05T08:00:00Z'),
  ('proj-n-005', 'N-005-6100-Clifford', 'ACTIVE', '6100 High Park Rd, Cripple Creek, CO', 'Joseph Clifford', 'Daniel M Vogel', '2025-11-20T09:00:00Z');
