# 🚌 Old Skool Tours

> **Groovy tours with a retro vibe!** Step back in time with our rad 80s-themed tour bus experiences.

## ✨ Features

### 🎯 Skool Tours (Signature Experiences)
1. **🍺 Brew Skool** - Craft brewery adventure
2. **🥾 Hike Skool** - Scenic mountain trails  
3. **🏈 Sport Skool** - Game day party bus
4. **🎭 Culture Skool** - Historic city tour
5. **🧺 Picnic Skool** - Sunset picnic experience
6. **🍕 Foodie Skool (Pizza Edition)** - Ultimate pizza tour
7. **🌮 Foodie Skool (Taco Edition)** - Taco crawl adventure

### 🎨 Retro 80s Design
- **Neon Gradient Fonts** - Permanent Marker handwriting with glowing effects
- **Vibrant Colors** - Lime yellow (#CCFF00), retro orange (#FF6B35), hot pink
- **Miami Vice Aesthetic** - That classic 80s vibe throughout

### Technical Features
- 📱 **PWA** - Installable, offline-ready mobile app
- 💳 **Stripe Integration** - Secure payments for tours and merch
- 🎫 **QR Ticketing** - Digital tickets with QR codes
- 📊 **Admin Dashboard** - Manage bookings, tickets, and orders
- 🛒 **E-commerce** - Full merch store with cart
- 📧 **Contact Forms** - Customer inquiries
- 🌐 **Responsive Design** - Looks rad on all devices

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Database**: Supabase (PostgreSQL)
- **Payments**: Stripe Checkout
- **PWA**: Service Worker + Web App Manifest

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account
- Stripe account

### Environment Variables

Create a `.env` file:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

For Supabase Edge Functions, set these secrets:
```bash
supabase secrets set STRIPE_SECRET_KEY=sk_live_xxx
```

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Database Schema

### Tables
- `tours` - Tour listings
- `bookings` - Tour reservations
- `tickets` - QR tickets for bookings
- `customers` - Customer information
- `merch_products` - Merchandise catalog
- `merch_orders` - Merch purchases
- `contact_messages` - Contact form submissions
- `newsletter_subscribers` - Email list

## Stripe Integration

### Tour Bookings
1. Customer selects tour, date, and guests
2. Fills in contact details
3. Redirected to Stripe Checkout
4. On success, booking confirmed + ticket generated

### Merch Purchases
- **Online**: Add to cart → Stripe Checkout
- **Onboard**: Scan QR code → Stripe Payment Link (Apple Pay/Google Pay)

## PWA Features

### Installation
- iOS: Tap Share → Add to Home Screen
- Android: Install prompt appears automatically

### Offline Support
- Cached pages and assets
- Offline fallback page
- Tickets accessible offline

## Admin Dashboard

Access via the settings icon in the header.

Features:
- View all bookings
- Scan/validate tickets
- Manage merch orders
- Read contact messages
- Export data to CSV

## Deployment

### Vercel (Recommended)
```bash
npm run build
vercel deploy
```

### Environment Setup
1. Add environment variables in Vercel dashboard
2. Deploy Supabase Edge Functions
3. Configure Stripe webhooks

## Project Structure

```
src/
├── components/
│   ├── pages/          # Page components
│   ├── Header.tsx      # Navigation
│   ├── Footer.tsx      # Footer with newsletter
│   ├── CartDrawer.tsx  # Shopping cart
│   ├── BookingModal.tsx # Tour booking flow
│   └── ...
├── store/
│   └── useStore.ts     # Zustand state management
├── types/
│   └── index.ts        # TypeScript interfaces
├── lib/
│   ├── supabase.ts     # Supabase client
│   ├── stripe.ts       # Stripe helpers
│   └── qrcode.ts       # QR code generation
└── index.css           # Tailwind + custom styles
```

## Color Palette

- **Cream**: #F5F3E7
- **Black**: #0A0A0A
- **Forest Green**: #1B4332
- **Neon Lime**: #CCFF00
- **Hot Pink**: #FF006E

## License

MIT License - See LICENSE file for details.

## Support

For questions or issues, contact hello@oldskool.tours
