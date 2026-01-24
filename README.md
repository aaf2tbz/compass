# COMPASS

**Construction Open Management Platform for Automated System Solutions**

COMPASS is an **open-source construction project management system** built with Next.js, designed as a **1:1 drop-in replacement for BuilderTrend** - without the bloat, recurring SaaS costs, or vendor lock-in.

## The Problem

Creating a new project at a construction company currently means:
- Manually generating project codes across multiple systems
- Filling out the same information in 3-4 different spreadsheets
- Setting up 50+ CSI folders manually (30+ minutes of clicking)
- Hoping nothing was missed or mis-typed

## The Solution

With COMPASS:
- **2-minute project creation** - Single form, everything auto-generated
- **Auto-provisioning** - Project code, folders, permissions, initial budget
- **Zero recurring costs** - Self-hosted, open-source
- **Full data ownership** - Your data, your infrastructure

## Features

- **Automated Project Setup** - Template-based creation with auto-generated numbering
- **Construction Lifecycle Management** - Status tracking from inquiry through completion
- **Dual Interfaces** - Separate dashboards for internal teams and clients
- **Budget Tracking** - CSI-based budget structure with version control
- **Schedule Management** - Gantt charts with dependencies and critical path
- **Change Order Workflow** - Major/minor change orders with approval routing
- **Contact Logging** - Manual and auto-detected client interactions
- **Document Management** - S3-compatible file storage with versioning

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript 5.x |
| UI | React 19, shadcn/ui, Tailwind CSS 4 |
| Database | PostgreSQL with Prisma ORM |
| Auth | WorkOS (SSO, directory sync) |
| Storage | S3-compatible (AWS S3 / MinIO) |
| Jobs | BullMQ + Redis |
| Email | Resend |

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm 9+
- PostgreSQL 15+
- Redis (for background jobs)

### Quick Start

```bash
# Clone the repository
git clone https://github.com/your-org/compass.git
cd compass

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your configuration

# Set up database
pnpm db:push
pnpm db:seed

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

### Environment Setup

Create a `.env.local` file with the following variables:

```bash
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/compass"

# Auth (WorkOS)
WORKOS_API_KEY="sk_..."
WORKOS_CLIENT_ID="client_..."
WORKOS_REDIRECT_URI="http://localhost:3000/api/auth/callback"

# Storage (S3-compatible)
S3_ENDPOINT="http://localhost:9000"
S3_ACCESS_KEY_ID="minioadmin"
S3_SECRET_ACCESS_KEY="minioadmin"
S3_BUCKET="compass-files"

# Email (Resend)
RESEND_API_KEY="re_..."

# Redis
REDIS_URL="redis://localhost:6379"
```

## Deployment

### Docker (Self-hosted)

```bash
# Build and start all services
docker compose up -d

# Run database migrations
docker compose exec app pnpm db:migrate
```

The Docker setup includes:
- Next.js application
- PostgreSQL database
- MinIO (S3-compatible storage)
- Redis (caching and job queues)

### Cloudflare Workers

COMPASS can be deployed to Cloudflare Workers for edge deployment:

```bash
# Build for Cloudflare
pnpm build:cf

# Deploy
pnpm deploy:cf
```

Uses Cloudflare D1, R2, and Queues for a fully serverless deployment.

## Documentation

- [Product Requirements (PRD)](../compass-roadmap/docs/PRD-v003-2026-01-17.md)
- [Architecture](../compass-roadmap/docs/architecture.md)
- [API Documentation](./docs/api.md)

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## License

COMPASS is open-source software licensed under the [AGPL-3.0 License](LICENSE).

## Support

- **Documentation**: [docs.compass-pm.dev](https://docs.compass-pm.dev)
- **Issues**: [GitHub Issues](https://github.com/your-org/compass/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-org/compass/discussions)

---

**COMPASS** - Breaking the monopolistic stranglehold of expensive SaaS platforms on the construction industry.
