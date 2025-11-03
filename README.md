# 🎬 Netflix Clone - Expo (React Native)

A full-featured Netflix clone built with React Native, Expo, and integrated with a Laravel backend API.

## 🌟 Features

### ✅ Authentication System (Fully Implemented)
- ✅ **User Registration** - Create new accounts with email/password
- ✅ **User Login** - Secure authentication with JWT tokens
- ✅ **User Logout** - Clear sessions and tokens
- ✅ **Persistent Sessions** - Auto-login on app restart
- ✅ **Profile Management** - View and edit user profile
- ✅ **Account Settings** - Update name, email, and password
- ✅ **Protected Routes** - Authentication guards for secure screens
- ✅ **Cross-Platform Storage** - Works on iOS, Android, and Web

### 🎥 Movie Features (Coming Soon)
- Browse movies and TV shows from TMDB API
- Search functionality
- My List management
- Movie details and trailers
- Personalized recommendations

### 🎨 UI/UX Features
- Netflix-inspired design with dark theme
- Responsive header with user menu
- Smooth navigation with Expo Router
- Loading states and error handling
- NativeWind (Tailwind CSS) styling

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (Mac) / Android Emulator / Expo Go app

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd netflix-clone-expo
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Backend API**
   
   The app uses a centralized environment configuration system. The backend API URL is configured in `app.json`:
   ```json
   "extra": {
     "BACKEND_API_URL": "https://netflix-clone-production-4f77.up.railway.app/api"
   }
   ```
   
   See [ENV_CONFIGURATION.md](./ENV_CONFIGURATION.md) for detailed configuration instructions.

4. **Start the app**
   ```bash
   npx expo start
   ```

5. **Run on your device**
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go app on your phone

## 📱 Available Screens

### Public Screens
- **Home** (`/`) - Landing page with call-to-action
- **Login** (`/LoginScreen`) - User authentication
- **Register** (`/RegisterScreen`) - New user registration

### Protected Screens (Require Authentication)
- **Profile** (`/screens/ProfileScreen`) - View user information
- **Account Settings** (`/screens/AccountScreen`) - Edit profile and change password
- **Movies** (`/screens/MoviesScreen`) - Browse movies
- **TV Shows** (`/screens/TVShowsScreen`) - Browse TV shows
- **My List** (`/screens/MyListScreen`) - User's saved content
- **Search** (`/screens/SearchScreen`) - Search movies and shows

## 🏗️ Project Structure

```
app/
├── _layout.tsx                 # Root layout with navigation
├── index.tsx                   # Entry point with auth initialization
├── HomeScreen.tsx              # Main landing/home screen
├── LoginScreen.tsx             # Login screen
├── RegisterScreen.tsx          # Registration screen
├── components/
│   ├── NetflixHeader.tsx      # Header with logo and user menu
│   └── ui/                    # Reusable UI components
├── screens/
│   ├── AccountScreen.tsx      # Account settings screen
│   ├── ProfileScreen.tsx      # User profile screen
│   ├── MoviesScreen.tsx       # Movies browse screen
│   ├── TVShowsScreen.tsx      # TV shows screen
│   ├── MyListScreen.tsx       # User's saved list
│   └── SearchScreen.tsx       # Search functionality
├── services/
│   └── api/
│       ├── tmdb.jsx           # TMDB API integration
│       └── user.js            # User API calls
├── stores/
│   └── authStore.js           # Zustand auth state management
├── hooks/
│   └── useAuthGuard.ts        # Authentication protection hook
└── utils/
    ├── cn.ts                   # Class name utilities
    └── crossStorage.js         # Cross-platform storage solution
```

## 🔐 Backend API Integration

The app is fully integrated with the Laravel backend API:

**Base URL**: `https://netflix-clone-production-4f77.up.railway.app/api`

### API Endpoints Used:

- `POST /register` - Create new user account
- `POST /login` - Authenticate user
- `POST /logout` - End user session
- `GET /user` - Get current user data
- `PUT /userUpdate` - Update user profile

### Authentication Flow:

1. User enters credentials
2. App sends request to backend
3. Backend returns JWT token and user data
4. Token stored in AsyncStorage (mobile) or localStorage (web)
5. Token sent with all authenticated requests
6. Auto-refresh user data on app start

## 🛠️ Technologies Used

- **React Native** - Mobile framework
- **Expo** - Development platform
- **Expo Router** - File-based navigation
- **TypeScript** - Type safety
- **Zustand** - State management
- **NativeWind** - Tailwind CSS for React Native
- **AsyncStorage** - Persistent storage
- **Axios** - HTTP client
- **TMDB API** - Movie database

## 🔧 Configuration

### Environment Variables
The app uses a centralized configuration system (`app/config/env.js`) that works across all platforms.

**Backend API URL:**
Edit `app.json` to change the backend URL:
```json
"extra": {
  "BACKEND_API_URL": "your-backend-url-here"
}
```

**TMDB API:**
Configure in `app.json` or use environment variables:
```json
"extra": {
  "TMDB_API_KEY": "your-tmdb-api-key"
}
```

For detailed configuration instructions, see [ENV_CONFIGURATION.md](./ENV_CONFIGURATION.md)

## 📝 Development Notes

### Cross-Platform Storage
The app uses a custom `crossStorage` utility that:
- Uses AsyncStorage on iOS/Android
- Uses localStorage on Web
- Provides consistent API across platforms

### Authentication State
Authentication is managed with Zustand store:
- Persists user data across app restarts
- Handles token storage and retrieval
- Provides hooks for easy access

### Error Handling
All API calls include proper error handling:
- Network errors
- Server errors
- Validation errors
- Token expiration

## 🎯 Recent Improvements

### ✅ Fixed Issues
1. ✅ Backend API URL properly configured
2. ✅ Fixed localStorage issue in user.js (now uses crossStorage)
3. ✅ Header shows user info when authenticated
4. ✅ Added authentication guards for protected routes
5. ✅ Implemented Profile and Account screens
6. ✅ Added loading state on app initialization
7. ✅ Enhanced error handling across all API calls
8. ✅ TypeScript errors resolved

### 🆕 New Features
1. ✅ Complete user profile management
2. ✅ Account settings with password change
3. ✅ Persistent authentication sessions
4. ✅ User menu in header
5. ✅ Auth guard hook for route protection
6. ✅ Welcome screen for authenticated users
7. ✅ Quick links navigation

## 🔜 Coming Soon

- [ ] Movie browsing with TMDB integration
- [ ] Movie details modal
- [ ] Video player integration
- [ ] My List functionality
- [ ] Search with filters
- [ ] User ratings and reviews
- [ ] Social features (share, recommendations)
- [ ] Push notifications
- [ ] Offline mode

## 🧪 Testing

```bash
# Run linting
npm run lint

# Check for errors
npx expo doctor
```

## 📦 Building for Production

### Android
```bash
npx expo build:android
```

### iOS
```bash
npx expo build:ios
```

### Web
```bash
npm run web
```

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

This project is for educational purposes.

## 🙏 Acknowledgments

- [Expo](https://expo.dev)
- [React Native](https://reactnative.dev)
- [TMDB](https://www.themoviedb.org)
- [Netflix](https://netflix.com) for design inspiration
