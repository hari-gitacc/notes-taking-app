# Keep Notes - Personal Note Taking App

A modern, full-stack note-taking application built with Next.js 14, TypeScript, and MongoDB. Features a clean, intuitive interface with rich text editing capabilities, user authentication, and real-time note management.

## 🌐 Live Demo

**Live URL:** `[PLACEHOLDER - INSERT LIVE URL HERE]`

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Performance Optimizations](#performance-optimizations)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Design Decisions](#design-decisions)
- [Development Notes](#development-notes)
- [Contributing](#contributing)

## ✨ Features

### Core Functionality
- **User Authentication** - Secure sign up, sign in, and session management with NextAuth.js
- **Rich Text Editor** - Advanced note editing with React Quill formatting options
- **CRUD Operations** - Create, read, update, and delete notes with real-time updates
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **Personal Dashboard** - User account page with statistics and settings
- **About Page** - Information about the application and features

### User Experience
- **Intuitive UI** - Clean, modern interface inspired by Google Keep
- **Smooth Animations** - Framer Motion powered transitions and micro-interactions
- **Modal Interactions** - Seamless note editing experience with overlay modals
- **Dynamic Greetings** - Personalized welcome messages based on time and user
- **Loading States** - Clear indication of async operations
- **Empty States** - Helpful guidance when no notes exist

### Security & Performance
- **Protected Routes** - Authentication-based access control
- **Data Validation** - Server-side and client-side validation
- **Optimized Database Queries** - Efficient MongoDB operations with Mongoose
- **Code Splitting** - Improved initial load times with dynamic imports
- **Lazy Loading** - Component-level optimization for better performance
- **React Query Caching** - Smart data fetching and caching strategies
- **Memoization** - Optimized component re-renders

## 🛠 Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router and TypeScript
- **React Query (TanStack Query)** - Server state management and caching
- **Zustand** - Lightweight client state management
- **Framer Motion** - Smooth animations and transitions
- **React Quill** - Rich text editor with formatting capabilities
- **Axios** - HTTP client for API requests
- **Lucide React** - Modern icon library

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **NextAuth.js** - Complete authentication solution
- **MongoDB** - NoSQL database for data persistence
- **Mongoose** - MongoDB object modeling and validation
- **bcryptjs** - Secure password hashing

### Development Tools
- **TypeScript** - Type-safe development experience
- **ESLint** - Code linting and quality assurance
- **Custom CSS** - Hand-crafted styles (no UI libraries used)
- **Git** - Version control with descriptive commit messages

## ⚡ Performance Optimizations

### Code Splitting & Lazy Loading
```typescript
// Dynamic imports for heavy components
const ReactQuill = dynamic(() => import('react-quill'), { 
  ssr: false,
  loading: () => <div>Loading editor...</div>
});

// Lazy loading for modals
const NoteModal = lazy(() => import('@/components/NoteModal'));

// Route-based code splitting automatically handled by Next.js
```

### React Query Implementation
```typescript
// Efficient data fetching with caching
const { data: notes, isLoading, error, refetch } = useQuery({
  queryKey: ['notes', userId],
  queryFn: () => fetchUserNotes(userId),
  staleTime: 5 * 60 * 1000, // 5 minutes
  cacheTime: 10 * 60 * 1000, // 10 minutes
  refetchOnWindowFocus: false,
  retry: 3,
});

// Mutations for data updates
const createNoteMutation = useMutation({
  mutationFn: createNote,
  onSuccess: () => {
    queryClient.invalidateQueries(['notes']);
    toast.success('Note created successfully!');
  },
});
```

### Memoization Strategies
```typescript
// Component memoization
const MemoizedNoteCard = memo(NoteCard, (prevProps, nextProps) => {
  return prevProps.note._id === nextProps.note._id && 
         prevProps.note.updatedAt === nextProps.note.updatedAt;
});

// Value memoization
const filteredNotes = useMemo(() => 
  notes?.filter(note => 
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [], 
  [notes, searchTerm]
);

// Callback memoization
const handleNoteClick = useCallback((noteId: string) => {
  setSelectedNote(notes.find(note => note._id === noteId));
  setModalOpen(true);
}, [notes]);
```

### Additional Optimizations
- **Image Optimization** - Next.js automatic image optimization
- **Bundle Analysis** - Webpack bundle analyzer for size monitoring
- **Server-Side Rendering** - SEO-friendly page rendering
- **Static Generation** - Pre-rendered pages where applicable
- **API Response Caching** - Optimized database queries with indexing

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn
- MongoDB (local installation or MongoDB Atlas account)
- Git for version control

### Installation

1. **Clone the repository**
```bash
git clone [your-repository-url]
cd keep-notes
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```

4. **Configure your environment variables** (see [Environment Variables](#environment-variables))

5. **Start MongoDB**
```bash
# For local MongoDB installation:
# Windows: net start MongoDB
# macOS: brew services start mongodb/brew/mongodb-community  
# Linux: sudo systemctl start mongod

# Or use MongoDB Atlas cloud database
```

6. **Run the development server**
```bash
npm run dev
# or
yarn dev
```

7. **Open your browser**
Navigate to `http://localhost:3000`

## 🔐 Environment Variables

Create a `.env.local` file in the root directory:

```env
# Database Configuration
MONGODB_URI=mongodb://localhost:27017/notesapp
# For MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/notesapp

# Authentication Configuration
NEXTAUTH_SECRET=your-super-secret-key-minimum-32-characters-long
NEXTAUTH_URL=http://localhost:3000

# Production Configuration (when deploying)
# NEXTAUTH_URL=https://your-domain.com
```

### Environment Variable Descriptions

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `MONGODB_URI` | MongoDB connection string | ✅ | `mongodb://localhost:27017/notesapp` |
| `NEXTAUTH_SECRET` | Secret key for JWT token signing | ✅ | `generate-with-openssl-rand-base64-32` |
| `NEXTAUTH_URL` | Base URL of your application | ✅ | `http://localhost:3000` |

## 📁 Project Structure

```
keep-notes/
├── src/
│   ├── app/                    # Next.js 14 App Router
│   │   ├── api/               # API routes
│   │   │   ├── auth/          # NextAuth.js endpoints
│   │   │   │   └── [...nextauth]/
│   │   │   ├── notes/         # Notes CRUD operations
│   │   │   │   ├── route.ts
│   │   │   │   └── [id]/
│   │   │   └── register/      # User registration endpoint
│   │   ├── about/             # About page
│   │   ├── account/           # User account management
│   │   ├── login/             # Authentication pages
│   │   ├── register/          # User registration page
│   │   ├── globals.css        # Global styles (custom CSS)
│   │   ├── layout.tsx         # Root layout with providers
│   │   ├── page.tsx           # Home page (notes dashboard)
│   │   └── providers.tsx      # React Query & Auth providers
│   ├── components/            # Reusable UI components
│   │   ├── Header.tsx         # Navigation header
│   │   ├── NoteCard.tsx       # Individual note display
│   │   ├── NoteModal.tsx      # Note creation/editing modal
│   │   └── RichTextEditor.tsx # React Quill wrapper
│   ├── hooks/                 # Custom React hooks
│   │   ├── useNotes.ts        # Notes data fetching
│   │   └── useAuth.ts         # Authentication hooks
│   ├── lib/                   # Utility libraries
│   │   ├── auth.ts           # NextAuth configuration
│   │   ├── mongodb.ts        # Database connection
│   │   └── utils.ts          # Helper functions
│   ├── models/               # Database schemas
│   │   ├── Note.ts           # Note Mongoose model
│   │   └── User.ts           # User Mongoose model
│   ├── store/                # State management
│   │   └── noteStore.ts      # Zustand store configuration
│   └── types/                # TypeScript definitions
│       └── index.ts          # Global type definitions
├── public/                   # Static assets
├── .env.example             # Environment variables template
├── .env.local              # Environment variables (gitignored)
├── .gitignore             # Git ignore configuration
├── next.config.js         # Next.js configuration
├── package.json          # Dependencies and scripts
├── README.md            # Project documentation
└── tailwind.config.ts   # Tailwind CSS configuration
```

## 🔌 API Endpoints

### Authentication Endpoints
```http
POST /api/auth/[...nextauth]    # NextAuth.js dynamic routes
  ├── /api/auth/signin         # Sign in page
  ├── /api/auth/signout        # Sign out
  ├── /api/auth/session        # Get session
  └── /api/auth/csrf           # CSRF token

POST /api/register              # User registration
```

### Notes Management API
```http
GET    /api/notes              # Fetch all user notes
POST   /api/notes              # Create new note
PUT    /api/notes/[id]         # Update specific note
DELETE /api/notes/[id]         # Delete specific note
```

### Request/Response Examples

**POST /api/register**
```json
// Request
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "securePassword123"
}

// Response
{
  "message": "User created successfully",
  "userId": "64f5a1b2c3d4e5f6a7b8c9d1"
}
```

**GET /api/notes**
```json
// Response
[
  {
    "_id": "64f5a1b2c3d4e5f6a7b8c9d0",
    "title": "Meeting Notes",
    "content": "<p>Discussed project <strong>roadmap</strong> for Q1</p>",
    "userId": "64f5a1b2c3d4e5f6a7b8c9d1",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T15:45:00.000Z"
  }
]
```

## 🎨 Design Decisions

### UI/UX Architecture
- **Color Scheme**: Teal header (#7dd3d3) with warm beige background (#f5f2e8)
- **Typography**: Inter font family for clean, modern readability
- **Layout**: Card-based design with Google Keep inspiration
- **Animations**: Subtle Framer Motion transitions for enhanced UX
- **Responsive**: Mobile-first approach with CSS Grid and Flexbox

### Technical Architecture
- **State Management**: Hybrid approach using Zustand for client state and React Query for server state
- **Styling**: Custom CSS without external UI libraries for full design control
- **Authentication**: JWT-based sessions with NextAuth.js for security
- **Database**: MongoDB with Mongoose for flexible document storage
- **API Design**: RESTful endpoints following OpenAPI standards

### Performance Considerations
- **Code Splitting**: Route-based automatic splitting plus manual component splitting
- **Caching Strategy**: React Query for API caching, browser caching for static assets
- **Bundle Optimization**: Tree shaking and dynamic imports for smaller bundles
- **Database Indexing**: Optimized queries with proper MongoDB indexing

## 💻 Development Notes

### AI-Assisted Development
This project was developed with assistance from AI tools including:
- **Code Generation**: AI helped generate boilerplate code, component structures, and API endpoints
- **Best Practices**: AI guidance on React patterns, TypeScript implementation, and performance optimizations
- **Documentation**: AI assistance in creating comprehensive documentation and comments
- **Problem Solving**: AI support for debugging and implementing complex features

**Important**: While AI tools were used for code generation and guidance, all code was reviewed, customized, and tested to ensure it meets the project requirements and follows best practices.

### Development Workflow
```bash
# Development commands
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript checker

# Recommended commit workflow
git add .
git commit -m "feat: add user authentication with NextAuth"
git push origin main
```

### Code Quality Standards
- **TypeScript**: Strict mode enabled for type safety
- **ESLint**: Configured for React and Next.js best practices
- **Component Structure**: Functional components with proper prop typing
- **API Validation**: Input validation on both client and server sides
- **Error Handling**: Comprehensive error boundaries and try-catch blocks

## 🚀 Deployment

### Vercel Deployment (Recommended)
1. **Connect to Vercel**
```bash
npm install -g vercel
vercel login
vercel --prod
```

2. **Environment Variables**
Add all environment variables in Vercel dashboard:
- `MONGODB_URI`
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL`

### Alternative Deployment Platforms
- **Netlify**: Configure build command and environment variables
- **Railway**: Connect GitHub repo and set environment variables
- **Digital Ocean App Platform**: Deploy with app spec configuration

### Database Setup for Production
- **MongoDB Atlas**: Recommended for production deployment
- **Connection String**: Use production MongoDB URI
- **Database Indexing**: Ensure proper indexes for performance

## 📊 Features Implemented

✅ **Core Features**
- User authentication (sign up, sign in, logout)
- CRUD operations for notes
- Rich text editor with formatting
- Responsive design for all devices
- User dashboard with personal greeting

✅ **Performance Optimizations**
- Code splitting with dynamic imports
- Lazy loading for heavy components
- React Query for efficient data fetching
- Memoization for optimized re-renders
- Bundle optimization and tree shaking

✅ **User Experience**
- Smooth animations with Framer Motion
- Modal-based note editing
- Loading states and error handling
- Empty states with helpful guidance
- SEO optimization with proper meta tags

✅ **Security & Validation**
- Protected routes with authentication
- Input validation and sanitization
- Secure password hashing
- CSRF protection with NextAuth.js

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'feat: add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Commit Convention
- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation updates
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Test additions
- `chore:` Maintenance tasks

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js Team** for the amazing React framework
- **MongoDB** for the flexible database solution
- **NextAuth.js** for comprehensive authentication
- **React Query Team** for excellent data fetching
- **Framer Motion** for beautiful animations
- **AI Development Tools** for code generation assistance and guidance

---

**Built with ❤️ using Next.js, TypeScript, and modern web technologies**