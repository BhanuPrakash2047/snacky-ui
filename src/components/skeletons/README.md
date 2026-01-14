# Skeleton Loading Components

A professional skeleton loading system for Snacky UI that provides smooth loading experiences across all pages.

## Overview

Skeleton components are placeholder UI elements that appear while content is loading. They match the layout and structure of the actual content, creating a seamless user experience without jarring empty spaces or spinners.

## Features

✨ **Professional Design**
- Clean, modern appearance matching your app's design system
- Shimmer animation effect for visual feedback
- Fully responsive across all screen sizes

⚡ **Performance Optimized**
- Lightweight components with minimal overhead
- CSS-based animations for smooth 60fps performance
- No external dependencies beyond existing project setup

🎨 **Consistent Styling**
- Matches Tailwind CSS utility classes
- Uses your existing color palette (orange/emerald gradients)
- Integrates seamlessly with Header and Footer components

## Components

### Base Component
- **SkeletonLoader** - Reusable skeleton element with customizable dimensions

### Page Skeletons
- **HomePageSkeleton** - Hero section, featured products, benefits
- **ProductsPageSkeleton** - Filter sidebar, product grid, pagination
- **ProductDetailPageSkeleton** - Product images, details, reviews, related items
- **CartPageSkeleton** - Cart items, order summary, coupon section
- **CheckoutPageSkeleton** - Progress steps, address forms, payment, order summary
- **OrderHistoryPageSkeleton** - Order list, filters, search, pagination
- **OrderTrackingPageSkeleton** - Order info, tracking timeline, map, items
- **OrderDetailPageSkeleton** - Order status, items, addresses, sidebar actions
- **UserProfilePageSkeleton** - Profile info, security, preferences, danger zone
- **NotificationsPageSkeleton** - Notification list, filters, tabs, pagination

## Usage

### Import
```jsx
import { HomePageSkeleton, CartPageSkeleton } from '@/components/skeletons';
```

### In Components with Loading State
```jsx
import { HomePageSkeleton } from '@/components/skeletons';

const HomePage = () => {
  const { items: products, loading } = useSelector(state => state.products);

  if (loading) {
    return <HomePageSkeleton />;
  }

  return (
    // Your actual page content
  );
};
```

### Custom Usage
```jsx
import { SkeletonLoader } from '@/components/skeletons';

// Customizable dimensions and styling
<SkeletonLoader 
  width="300px" 
  height="40px" 
  borderRadius="0.5rem"
  className="my-custom-class"
/>
```

## SkeletonLoader Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | string | `''` | Additional CSS classes |
| `width` | string | `'100%'` | Element width |
| `height` | string | `'20px'` | Element height |
| `borderRadius` | string | `'0.375rem'` | Border radius value |

## Design Principles

### Layout Matching
Each skeleton is designed to match the actual page layout exactly, ensuring no layout shift when content loads.

### Animation
The shimmer effect runs continuously at 1.5 seconds per cycle, providing subtle visual feedback without being distracting.

### Accessibility
- Skeletons are purely visual and semantic
- Use `aria-busy="true"` on containers for screen reader compatibility
- Remove skeletons when content is ready

## Best Practices

1. **Use Full Skeletons During Initial Load**
   - Show complete page skeleton during data fetch
   - Replace entire skeleton once data loads

2. **Avoid Partial Skeletons in Lists**
   - Load complete items at once
   - Prevents jarring updates

3. **Match Actual Content Heights**
   - Skeletons should have the same height as real content
   - Prevents layout shift (CLS)

4. **Add Loading Indicators for Long Operations**
   - Combine with toast notifications for better UX
   - Show estimated time if available

## Customization

### Modify Animation Speed
Edit `SkeletonLoader.jsx`:
```jsx
animation: 'shimmer 1.5s infinite', // Change 1.5s to desired duration
```

### Adjust Colors
Update gradient colors in the shimmer style:
```jsx
backgroundImage: 'linear-gradient(90deg, #YOUR_COLOR 25%, #OTHER_COLOR 50%, #YOUR_COLOR 75%)',
```

### Responsive Variations
All skeletons use Tailwind's responsive classes (`sm:`, `lg:`, etc.) to adapt layouts.

## File Structure

```
src/components/skeletons/
├── index.js
├── SkeletonLoader.jsx
├── HomePageSkeleton.jsx
├── ProductsPageSkeleton.jsx
├── ProductDetailPageSkeleton.jsx
├── CartPageSkeleton.jsx
├── CheckoutPageSkeleton.jsx
├── OrderHistoryPageSkeleton.jsx
├── OrderTrackingPageSkeleton.jsx
├── OrderDetailPageSkeleton.jsx
├── UserProfilePageSkeleton.jsx
└── NotificationsPageSkeleton.jsx
```

## Performance Notes

- Each skeleton component is ~5-10KB minified
- CSS animations run at 60fps
- No JavaScript animation overhead
- Inline styles are more performant than separate CSS files for animations

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome Mobile)

## Future Enhancements

- [ ] Add skeleton variants (dark mode, high contrast)
- [ ] Create storybook stories for each skeleton
- [ ] Add TypeScript support
- [ ] Create configurable skeleton builder utility
- [ ] Add skeleton for advanced features (carousels, maps)

## License

Same as parent project
