# Darrajati Management System

A comprehensive management system for a scooter rental business, built with Next.js 15, specialized for admin operations including fleet management, client tracking, rental processing, and financial oversight.

## 🚀 Features

- **Dashboard Overview**: Real-time analytics, recent activity, and key performance indicators.
- **Fleet Management**: Track scooter status (Available, Rented, Maintenance), maintenance records, and specifications.
- **Client Management**: Database of clients with rental history and document verification.
- **Rental Operations**: intricate rental processing with conflict detection, payment tracking, and contract generation.
- **Financials**: Expense tracking, revenue analysis, and financial reporting.
- **Localization**: Full support for English and French interfaces.
- **Responsive Design**: Optimized for desktop and mobile use.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Database**: PostgreSQL (via [Neon](https://neon.tech/))
- **Auth**: [NextAuth.js](https://next-auth.js.org/) (v5 Beta)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Charts**: [Recharts](https://recharts.org/)

## 🏁 Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database (or Neon project)

### Installation

1.  **Clone the repository**
    ```bash
    git clone <repository-url>
    cd Managment-System
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Environment Setup**
    Create a `.env.local` file in the root directory and add the following variables:
    ```env
    DATABASE_URL="postgresql://user:password@host/dbname?sslmode=require"
    AUTH_SECRET="your-32-char-secret"
    NEXT_PUBLIC_APP_URL="http://localhost:3000"
    ```

4.  **Database Migration**
    Run the migration scripts to set up your database schema (if applicable) or ensure your database is reachable.

5.  **Run the development server**
    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Project Structure

- `/app`: App Router pages and layouts.
- `/components`: Reusable UI components.
- `/lib`: Utility functions, database connections, and types.
- `/public`: Static assets (images, fonts).
- `/scripts`: Database seeding and maintenance scripts.
- `/types`: TypeScript type definitions.

## 📜 Scripts

- `npm run dev`: Starts the development server with Turbopack.
- `npm run build`: Builds the application for production.
- `npm run start`: Starts the production server.
- `npm run lint`: Runs ESLint checks.

## 🤝 Contributing

1.  Fork the project
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

Distributed under the MIT License.
