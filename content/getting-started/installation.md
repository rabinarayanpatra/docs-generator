---
title: Installation
description: Step-by-step installation guide
order: 2
---

# Installation

Follow these steps to install and set up the documentation generator.

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js 18 or higher
- npm or yarn

## Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/docs-generator.git
cd docs-generator
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Start Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Verification

You should see the documentation homepage. Navigate to [Getting Started](/docs/getting-started) to verify everything is working.

## Troubleshooting

### Port Already in Use

If port 3000 is already in use, you can specify a different port:

```bash
PORT=3001 npm run dev
```

### Build Errors

Make sure you're using Node.js 18 or higher:

```bash
node --version
```

## Next Steps

Now that you have the generator installed, learn how to [write documentation](../guides/writing-docs).
