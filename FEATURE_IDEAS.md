# CineScope Feature Ideas & Roadmap

## 🏠 Home Page Enhancements

### 1. Featured Hero (High Priority) ⭐
Large featured movie with backdrop image at the top of the page.
- Full-width backdrop image
- Movie title, synopsis preview
- "View Details" and "Add to Watchlist" buttons
- Gradient overlay for text readability

### 2. Multiple Movie Sections
Add variety with different categories:
- 🔥 **Trending This Week** (already done)
- 🎬 **Now Playing** - Movies currently in theaters
- 📅 **Coming Soon** - Upcoming releases
- ⭐ **Top Rated** - All-time favorites
- 🎭 **Popular** - Most popular right now

### 3. Horizontal Scroll Sections (Netflix-style)
- Horizontal scrolling movie rows
- Scroll snap for smooth UX
- Left/right navigation arrows
- Custom scrollbar styling

### 4. Genre Quick Filter
- Chips/pills at the top to filter by genre
- Active state styling
- Quick toggle between genres

### 5. Stats Bar
- Show watchlist count
- Total movies browsed
- Personalized stats

---

## 🎴 Movie Card Enhancements

### Currently Implemented ✅
- [x] Poster image with lazy loading
- [x] Movie title
- [x] Release year
- [x] Rating badge (top-right)
- [x] Watchlist indicator badge (top-left)
- [x] Genre tags (pills)
- [x] Hover scale effect

### To Implement 📋

#### 1. Hover Overlay with Actions (High Priority) ⭐
On hover, show an overlay with quick actions:
```
┌─────────────────────┐
│     [POSTER]        │
│                     │
│   ┌─────────────┐   │
│   │  + Watchlist│   │  ← Overlay on hover
│   │  ▶ Trailer  │   │
│   │  ℹ Details  │   │
│   └─────────────┘   │
└─────────────────────┘
```

#### 2. Quick Add to Watchlist Button
- Heart icon or "+" button
- Toggle on click (add/remove)
- Animation feedback (pulse/scale)
- Works without navigating to details

#### 3. Play Trailer Button
- Small play icon on hover
- Opens modal with YouTube embed
- Or navigates to details with trailer auto-playing

#### 4. Progress Indicator (Future)
- For "watched" movies
- Small progress bar if tracking watch progress

#### 5. "Coming Soon" Badge
- Special badge for unreleased movies
- Different styling (maybe countdown)

#### 6. Streaming Provider Icons (Future)
- Small icons showing where to watch
- Netflix, Prime, Disney+, etc.

---

## 🎬 Movie Details Page Enhancements

### Currently Implemented ✅
- [x] Backdrop image
- [x] Poster
- [x] Title and year
- [x] Rating
- [x] Synopsis
- [x] Tagline
- [x] Runtime (with pipe)
- [x] Add to Watchlist button
- [x] Back button

### To Implement 📋

#### 1. Similar Movies Section (use @defer)
- "You might also like"
- Horizontal scroll of similar movies
- Lazy loaded when scrolled into view

#### 2. Cast & Crew Carousel
- Actor photos in horizontal scroll
- Character names
- Click to see actor filmography

#### 3. Trailer Section
- Embedded YouTube player
- Multiple trailers if available

#### 4. Reviews Section
- User reviews from TMDB
- Lazy loaded with @defer

#### 5. Where to Watch
- Streaming providers
- Rent/buy options with prices

#### 6. More Movie Info
- Director, writers
- Budget & revenue
- Production companies
- Original language

---

## 🔍 Search Page Enhancements

### To Implement 📋
- [ ] Search filters (year, genre, rating)
- [ ] Sort options (relevance, rating, year)
- [ ] Search history
- [ ] Trending searches
- [ ] Voice search (future)

---

## 📋 Watchlist Page Enhancements

### To Implement 📋
- [ ] Sort by date added, rating, title
- [ ] Filter by genre
- [ ] "Watched" toggle
- [ ] Remove all / Clear watchlist
- [ ] Share watchlist (future)
- [ ] Export to CSV (future)

---

## 🎨 UI/UX Improvements

### Polish Items
- [ ] Skeleton loading screens
- [ ] Toast notifications ("Added to watchlist!")
- [ ] Page transitions/animations
- [ ] Error boundaries with nice UI
- [ ] Empty state illustrations
- [ ] 404 page design
- [ ] Dark/Light theme toggle

### Accessibility
- [ ] Keyboard navigation
- [ ] Focus indicators
- [ ] ARIA labels
- [ ] Screen reader support

---

## 🛠 Technical Improvements

### Performance
- [ ] Image preloading for featured content
- [ ] Virtual scrolling for large lists
- [ ] Service Worker / PWA support

### DevOps
- [ ] GitHub Actions CI pipeline
- [ ] Automated testing
- [ ] Lighthouse CI scores
- [ ] Error monitoring (Sentry)

---

## 📱 Future Features (Stretch Goals)

- [ ] TV Series support
- [ ] User authentication
- [ ] Personal ratings
- [ ] Watch history
- [ ] Custom lists
- [ ] Social features (share, follow)
- [ ] Notifications for new releases
- [ ] Mobile app (Capacitor/Ionic)

---

## Priority Order

### Phase 1: Polish MVP ✅
1. ~~Genre tags on cards~~ ✅
2. ~~Watchlist indicator~~ ✅
3. Movie card hover effects

### Phase 2: Enhanced Home
4. Featured hero section
5. Now Playing section
6. Upcoming section
7. Horizontal scroll layout

### Phase 3: Rich Details
8. Similar movies (@defer)
9. Cast carousel
10. Trailer embed

### Phase 4: Advanced Features
11. Toast notifications
12. Search filters
13. GitHub Actions CI

---

*Last updated: January 2026*
