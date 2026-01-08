# dgz-ui

[![NPM Version](https://img.shields.io/npm/v/dgz-ui)](https://www.npmjs.com/package/dgz-ui)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Custom UI library built with React, Radix UI, Tailwind CSS v4, and TypeScript.

## Features

- 🚀 **Modern Stack**: Built with React 19, TypeScript, and Tailwind CSS 4.
- 🎨 **Beautifully Styled**: Includes a comprehensive set of UI components.
- ♿ **Accessible**: Built on top of Radix UI primitives for accessibility.
- 🛠️ **Customizable**: Easy to extend and customize.
- 📦 **Tree-shakeable**: Import only what you need.

## Installation

```bash
npm install dgz-ui
```

## Setup

To use the styles, import the CSS file in your root entry file (e.g., `main.tsx`, `App.tsx`, or `index.js`).

```tsx
import 'dgz-ui/dist/dgz-ui.css';
```

## Usage

Import components directly from the package:

```tsx
import { Button } from 'dgz-ui';

function App() {
  return (
    <Button variant="default" onClick={() => console.log('Clicked!')}>
      Click me
    </Button>
  );
}
```

You can also import specific components to optimize bundle size:

```tsx
import { Alert, AlertTitle, AlertDescription } from 'dgz-ui/alert';

<Alert>
  <AlertTitle>Heads up!</AlertTitle>
  <AlertDescription>
    This is a description inside an alert component.
  </AlertDescription>
</Alert>;
```

## Components

The library includes the following components:

- **Accordion**: Vertically stacked set of interactive headings.
- **Alert**: Displays a callout for user attention.
- **Alert Dialog**: A modal dialog that interrupts the user with important content.
- **Avatar**: An image element with a fallback for representing the user.
- **Badge**: Displays a status or a count.
- **Breadcrumb**: Displays the path to the current resource.
- **Button**: Displays a button or a component that looks like a button.
- **Calendar**: Date and time pickers.
- **Card**: Displays a card with header, content, and footer.
- **Collapsible**: An interactive component which expands/collapses a panel.
- **Dialog**: A window overlaid on either the primary window or another dialog window.
- **Dropdown Menu**: Displays a menu to the user — such as a set of actions or functions — triggered by a button.
- **Form**: Building blocks for forms, including Inputs, Checkboxes, Selects, Switches, Radio Groups, and Textareas.
- **Pagination**: Pagination controls.
- **Popover**: Displays rich content in a portal, triggered by a button.
- **Progress**: Displays an indicator showing the completion progress of a task.
- **Scroll Area**: Augments native scroll functionality for custom, cross-browser styling.
- **Separator**: Visually or semantically separates content.
- **Sheet**: Extends the Dialog component to display content that complements the main screen.
- **Skeleton**: Used to show a placeholder while content is loading.
- **Tabs**: A set of layered sections of content—known as tab panels—that are displayed one at a time.
- **Table**: A responsive table component.
- **Tooltip**: A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.

## Requirements

- React >= 19
- React DOM >= 19
- Tailwind CSS >= 4

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

[Alisher Khayrillaev](https://github.com/Alisher1119)
