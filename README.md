# Book Management Dashboard

A modern React.js dashboard for managing books with CRUD operations, built with Material-UI and React Query.

## Features

- 📚 List books with pagination
- 🔍 Search by title or author
- 🏷️ Filter by genre and status
- ➕ Add new books
- ✏️ Edit existing books
- 🗑️ Delete books with confirmation
- 📱 Responsive design
- ⚡ Fast and efficient data fetching with React Query
- 🎨 Modern UI with Material-UI
- ✅ Form validation with react-hook-form and yup

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd book-management-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Update the API URL:
Open `src/services/api.ts` and replace `your-api-key` with your actual API key from [crudcrud.com](https://crudcrud.com).

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

## Technologies Used

- React.js
- TypeScript
- Material-UI
- React Query
- React Router
- React Hook Form
- Yup
- Axios
- Vite

## Project Structure

```
src/
  ├── components/     # Reusable components
  ├── pages/         # Page components
  ├── services/      # API services
  ├── App.tsx        # Main app component
  ├── main.tsx       # Entry point
  └── theme.ts       # Material-UI theme
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request 