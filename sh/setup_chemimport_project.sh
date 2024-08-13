#!/bin/bash

# Function to log messages
log() {
    echo "[$(date +'%Y-%m-%d %H:%M:%S')] $1"
}

# Function to track progress
progress() {
    echo "--------------------"
    echo "Progress: $1"
    echo "--------------------"
}

# Start script
log "Starting ChemImport project setup"

# Create project directory
PROJECT_NAME="chemimport-website"
progress "Creating project directory"
mkdir $PROJECT_NAME
cd $PROJECT_NAME
log "Created and moved into $PROJECT_NAME directory"

# Initialize Next.js project
progress "Initializing Next.js project"
npx create-next-app@latest . --typescript --eslint --tailwind --src-dir --app --no-experimental-app <<EOF
y
EOF
log "Next.js project initialized"

# Install additional dependencies
progress "Installing additional dependencies"
npm install @vercel/analytics @vercel/og react-hook-form zod @hookform/resolvers
log "Additional dependencies installed"

# Create directory structure
progress "Creating directory structure"
mkdir -p src/app/{home,products,services,about,newsletter,contact}
mkdir -p src/app/api/{contact,newsletter}
mkdir -p src/components
mkdir -p src/lib
mkdir -p src/styles
mkdir -p public/images
log "Directory structure created"

# Create placeholder files
progress "Creating placeholder files"
touch src/app/layout.tsx
touch src/components/{Header,Footer,Layout}.tsx
touch src/app/{home,products,services,about,newsletter,contact}/page.tsx
touch src/app/api/contact/route.ts
touch src/app/api/newsletter/route.ts
log "Placeholder files created"

# Update package.json scripts
progress "Updating package.json scripts"
sed -i 's/"dev": "next dev"/"dev": "next dev -p 3000"/' package.json
log "package.json scripts updated"

# Create a basic README.md
progress "Creating README.md"
cat << EOF > README.md
# ChemImport Website

This is the official website for ChemImport, your trusted chemical importer.

## Getting Started

1. Clone this repository
2. Run \`npm install\` to install dependencies
3. Run \`npm run dev\` to start the development server
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

- \`src/app\`: Contains the main application pages and API routes
- \`src/components\`: Reusable React components
- \`src/lib\`: Utility functions and custom hooks
- \`src/styles\`: Global styles and Tailwind CSS configuration
- \`public\`: Static assets like images and fonts

## Technologies Used

- Next.js
- TypeScript
- Tailwind CSS
- React Hook Form
- Zod
- Vercel Analytics

EOF
log "README.md created"

# Final message
progress "Setup complete"
log "ChemImport project setup is complete. Navigate to the project directory and run 'npm run dev' to start the development server."

# End script
log "Script execution completed"