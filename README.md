# 🛒 বাজার দর (BazarDor)

A modern, responsive web application built to provide real-time updates on daily market prices of essential commodities in Bangladesh. Stay informed about the prices of rice, pulses, oil, vegetables, fish, meat, and spices with detailed insights, average rates, and daily price fluctuation trends.

## 🚀 Live Demo
**[https://bazardor-phi.vercel.app/](https://bazardor-phi.vercel.app/)**

## 📖 Short Description
BazarDor is a comprehensive commodity price tracking platform. It allows users to quickly view today's market rates, filter items by category, and observe daily price changes (increases/decreases). With a secure authentication system, logged-in users can access detailed market-wise price breakdowns and manage their personalized profiles seamlessly.

## 🛠️ Technologies Used
- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS & HeroUI
- **Authentication:** BetterAuth
- **Language:** TypeScript
- **Deployment:** Vercel / Netlify

## ✨ 5 Key Features

1. **Real-time Price Ticker & Market Overview:** 
   An intuitive infinite scrolling marquee and categorized homepage sections ("আজ দাম বেড়েছে", "আজ দাম কমেছে") displaying today's prices with percentage changes (▲/▼) for quick market updates.

2. **Smart Sorting System (Challenge C1):**
   Filter products by specific categories and precisely sort items by price (Low to High / High to Low) that correctly parses and calculates Bengali numerical values.

3. **Detailed Market Insights (Protected Route):**
   Authenticated users can access a comprehensive summary for individual products, including the lowest, highest, and average prices across different regional markets.

4. **Secure Authentication & Profile Update (Challenge C3):**
   Robust authentication system supporting Email/Password and Social Logins (Google/GitHub) via BetterAuth. Users can also securely update their display name and profile picture from the `/profile/update` route.

5. **Responsive Design & UX Optimization:**
   A fully responsive layout tailored for Mobile, Tablet, and Desktop. Features polished loading skeletons, toast notifications for protected routes, and friendly empty states (404) for missing data.
