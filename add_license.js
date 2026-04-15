const fs = require('fs');
const path = require('path');

const HEADER = `// SPDX-License-Identifier: GPL-3.0-or-later
// Copyright (C) 2026 Siyovush Hamidov and The Hadaf Contributors\n\n`;

function shouldExclude(filePath) {
  return (
    filePath.includes('node_modules') ||
    filePath.includes('.next') ||
    filePath.endsWith('.d.ts') || // Exclude .d.ts files like next-env.d.ts
    filePath.endsWith('next.config.ts') ||
    filePath.endsWith('tailwind.config.ts')
  );
}

function processDirectory(directory) {
  const files = fs.readdirSync(directory);
  for (const file of files) {
    const fullPath = path.join(directory, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (!fullPath.includes('node_modules') && !fullPath.includes('.next')) {
        processDirectory(fullPath);
      }
    } else {
      if ((fullPath.endsWith('.ts') || fullPath.endsWith('.tsx')) && !shouldExclude(fullPath)) {
        let content = fs.readFileSync(fullPath, 'utf8');
        // Prevent double injection
        if (!content.includes('SPDX-License-Identifier')) {
          // If the file starts with "use client" or "use server", the header must go after it? 
          // Usually Next.js directives 'use client' must be the very first line of code (before imports).
          // But actually, comments before 'use client' usually work fine in Next.js bundler.
          // Still, to be perfectly safe, let's inject after 'use client' if it's there.
          if (content.startsWith("'use client'") || content.startsWith("\"use client\"")) {
             const lines = content.split('\n');
             const firstLine = lines.shift();
             content = `${firstLine}\n\n${HEADER}` + lines.join('\n');
          } else {
             content = HEADER + content;
          }
          fs.writeFileSync(fullPath, content, 'utf8');
          console.log(`Injected: ${fullPath}`);
        }
      }
    }
  }
}

processDirectory('.');
console.log('Done mapping.');
