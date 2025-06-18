# VitalCORE Project Structure

This document outlines the organization and structure of the VitalCORE project files.

## Directory Structure

```
vitalcore/
├── index.html                   # Main HTML file (entry point)
├── README.md                    # Project documentation
├── .gitignore                   # Git ignore file
├── package.json                 # Node.js dependencies (if needed)
│
├── src/                         # Source files
│   ├── css/                     # Stylesheets
│   │   └── styles.css           # Main stylesheet
│   ├── js/                      # JavaScript files
│   │   └── script.js            # Main JavaScript file
│   └── assets/                  # Static assets
│       ├── images/              # Image files
│       └── icons/               # Icon files
│
├── docs/                        # Documentation
│   ├── project-structure.md     # This file
│   ├── deployment.md            # Deployment instructions
│   └── development.md           # Development guidelines
│
└── memory-bank/                 # Project context and documentation
    ├── projectbrief.md          # Project overview and objectives
    ├── productContext.md        # Product vision and user needs
    ├── systemPatterns.md        # Architecture and design patterns
    ├── techContext.md           # Technology stack and constraints
    ├── activeContext.md         # Current work focus and decisions
    └── progress.md              # Development progress tracking
```

## File Organization Principles

### 1. Separation of Concerns
- **HTML**: Structure and content (`index.html`)
- **CSS**: Styling and presentation (`src/css/`)
- **JavaScript**: Behavior and interactivity (`src/js/`)
- **Assets**: Static resources (`src/assets/`)

### 2. Logical Grouping
- **Source Code**: All development files in `src/` directory
- **Documentation**: Project docs in `docs/` directory
- **Memory Bank**: Project context in `memory-bank/` directory

### 3. Scalability
- Modular structure allows for easy expansion
- Clear separation enables team collaboration
- Consistent naming conventions

## File Naming Conventions

### CSS Files
- Use kebab-case: `styles.css`, `components.css`
- Descriptive names: `dashboard.css`, `navigation.css`

### JavaScript Files
- Use kebab-case: `script.js`, `dashboard.js`
- Descriptive names: `telemetry.js`, `analytics.js`

### Image Files
- Use kebab-case: `hero-background.jpg`, `logo-icon.svg`
- Include dimensions when relevant: `banner-1920x1080.jpg`

### Documentation Files
- Use kebab-case: `project-structure.md`, `api-reference.md`
- Clear, descriptive names

## Development Workflow

### 1. Local Development
```bash
# Serve files locally
python -m http.server 8000
# or
npx serve .
```

### 2. File Modifications
- Edit HTML in root directory
- Edit CSS in `src/css/`
- Edit JavaScript in `src/js/`
- Add assets to `src/assets/`

### 3. Documentation Updates
- Update relevant docs in `docs/`
- Update memory bank files as needed

## Best Practices

### 1. Code Organization
- Keep related functionality together
- Use consistent indentation and formatting
- Comment complex logic

### 2. Asset Management
- Optimize images for web
- Use appropriate file formats
- Implement lazy loading for large assets

### 3. Performance
- Minify CSS and JavaScript for production
- Optimize images and assets
- Use CDN for external libraries

### 4. Maintainability
- Use semantic HTML
- Follow CSS naming conventions (BEM methodology)
- Write self-documenting JavaScript

## Future Enhancements

### Potential Structure Additions
```
src/
├── components/              # Reusable UI components
├── utils/                   # Utility functions
├── config/                  # Configuration files
└── tests/                   # Test files

build/                       # Build output (production)
dist/                        # Distribution files
```

### Build Process
- Consider adding build tools (Webpack, Vite, etc.)
- Implement CSS preprocessing (Sass, Less)
- Add JavaScript bundling and minification

## Deployment Structure

### Production Ready
```
dist/
├── index.html
├── css/
│   └── styles.min.css
├── js/
│   └── script.min.js
└── assets/
    ├── images/
    └── icons/
```

This structure ensures maintainability, scalability, and follows modern web development best practices.
