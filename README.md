# Q-Menu

Q-Menu is a digital menu platform for restaurants and cafés. Customers can browse a restaurant's menu online, while merchants manage menu content, restaurant settings, and QR menu presentation from a dashboard.

> This README covers the user-facing frontend and the project structure that supports it. The application uses Next.js server routes and actions to connect the interface to its data and services.

## Key Features

### Customer-Facing Experience

- Browse a restaurant's public menu at `/menu/[slug]`.
- Switch between Arabic and English, with the layout adapting between RTL and LTR.
- Browse menu categories, search dishes by name, and view item details and prices.
- Add items to a cart, adjust quantities, and review totals in Syrian pounds and, when enabled by the restaurant, US dollars.
- Keep the cart in the browser between visits using local storage.
- Use a responsive interface designed for mobile and desktop screens.

### Merchant Dashboard

- Create an account, verify an email address, sign in, and use password recovery screens.
- Complete restaurant onboarding and manage restaurant information.
- View an overview of menu counts, availability, exchange rates, and subscription status.
- Create, edit, sort, filter, and remove menu categories and items, including item availability.
- Configure and preview the public menu's QR code, including its color, logo, and caption.
- Manage restaurant and currency settings, account security, and subscription checkout.

## Tech Stack

- **Framework:** Next.js 16 App Router
- **UI library:** React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4, with shadcn/ui and Radix UI components
- **Animation:** Framer Motion
- **Forms and validation:** React Hook Form, Zod, and `@hookform/resolvers`
- **Icons and notifications:** Lucide React and Sonner
- **QR menus:** `qr-code-styling`
- **Application integrations:** Better Auth, Prisma, and PostgreSQL; Cloudinary for image uploads; Resend and Nodemailer for email; Upstash QStash for scheduled tasks

## Project Architecture

There is no `src/` directory in this repository. The Next.js application and its source folders are located at the project root:

```text
.
├── actions/                  # Server actions used by forms and dashboard screens
├── app/                      # App Router routes, layouts, and global styles
│   ├── (Auth)/                # Sign-in, sign-up, and email verification
│   ├── (onboarding)/          # Restaurant onboarding
│   ├── (password)/            # Password recovery and reset
│   ├── (root)/                # Public landing page
│   ├── (terms&policy)/        # Privacy and terms pages
│   ├── api/                   # Authentication and subscription API routes
│   ├── dashboard/             # Merchant dashboard pages
│   ├── menu/[slug]/           # Public restaurant menu
│   └── subscription/          # Subscription checkout
├── components/
│   ├── dashboard/             # Dashboard, menu management, QR, and settings UI
│   ├── forms/                 # Authentication and onboarding forms
│   ├── Layouts/               # Shared site header and footer
│   ├── menu/                  # Public menu, categories, items, and cart UI
│   ├── Sections/              # Landing-page sections
│   └── ui/                    # Reusable interface primitives
├── constants/                 # Shared constants
├── data/                      # Static and dashboard configuration data
├── generated/prisma/          # Generated Prisma client
├── lib/                       # Auth, queries, validation, utilities, and integrations
├── middleware/                # Request proxy
├── prisma/                    # Prisma schema and database migrations
└── public/                    # Static assets
```

## Getting Started

### Prerequisites

- Node.js 20.9 or later
- npm
- A PostgreSQL database and credentials for the integrations you plan to use

### Installation

Clone the repository and install its dependencies:

```bash
git clone https://github.com/HussamMAhmad/Qmenu.git
cd Qmenu
npm install
```

### Environment Variables

Create a `.env.local` file in the project root. The following variables are read by the application; provide valid values for the features and integrations you enable:

```dotenv
DATABASE_URL=
NEXT_PUBLIC_BASE_URL=http://localhost:3000
BETTER_AUTH_URL=http://localhost:3000

# Authentication, email, uploads, and scheduled tasks
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
RESEND_API_KEY=
NODE_MAILER_USER=
NODE_MAILER_PASS=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
QSTASH_TOKEN=

# Subscription/payment integration
TSA_API_KEY=
MY_SHAM_ADDRESS=
```

Keep credentials private and do not commit `.env.local`. Set the public and authentication URLs to your deployed application's origin outside local development. Some integrations require their corresponding credentials to be configured before their features can be used.

### Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The production build command is `npm run build`.

## Author

- **Name:** Hussam Ahmad
- **Role:** Full-Stack Software Engineer
- **Location:** Tartus, Syria
- **GitHub:** [HussamMAhmad](https://github.com/HussamMAhmad)
