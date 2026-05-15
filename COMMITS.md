# Project Commit History

## [Phineas] - The Big Idea (UI Redesign)
- Scrapped the flashy "SwiftAdmin" landing page for a functional "Inventory Dashboard".
- Swapped complex card layouts for standard border-box containers.
- Standardized typography and spacing across all pages.

## [Candace] - Busted! (Animation Removal)
- REMOVED all `transition-all` and `duration-300` classes.
- Stripped out `active:scale-95` micro-interactions.
- Erased hover-scaling and shadow-transitions to keep the UI "grounded".

## [Baljeet] - Technical Optimization (Context Cleanup)
- Simplified `ProductContext` item IDs to stringified timestamps.
- Removed unnecessary `createdAt` metadata from the product objects.
- Refactored `useProductData` to remove verbose AI-generated comments.

## [Isabella] - Whatcha Doin? (Accessibility & UX)
- Linked all form labels to inputs using `htmlFor` and `id` tags.
- Updated button titles and ARIA descriptions for better screen reader support.
- Changed placeholder text to more descriptive hints.

## [Perry the Platypus] - Operation: Fix Tests
- Adjusted `ProductDetailsPage.test.jsx` to find elements by `title` and new placeholder text.
- Fixed `ProductFormPage.test.jsx` to use `getByLabelText` after adding form associations.
- Mocked `window.alert` to prevent test environment crashes.
