# Development Workflow: Funnel Flow

## 1. Overview

This document outlines the development workflow, processes, and best practices for contributing to the Funnel Flow project. It covers environment setup, development processes, code standards, and deployment procedures.

---

## 2. Development Environment Setup

### 2.1 Prerequisites

#### Required Software
```bash
# Node.js (version 20 or higher)
node --version  # Should be >= 20.0.0
npm --version   # Should be >= 9.0.0

# Git for version control
git --version

# Optional: VS Code or preferred IDE
```

#### System Requirements
- **OS**: Windows 10+, macOS 10.15+, or Linux (Ubuntu 18.04+)
- **RAM**: Minimum 8GB, Recommended 16GB
- **Storage**: 5GB free space for dependencies and build files
- **Network**: Stable internet connection for AI service calls

### 2.2 Project Setup

#### Initial Setup
```bash
# 1. Clone the repository
git clone https://github.com/your-org/funnel-flow.git
cd funnel-flow

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Google AI API key

# 4. Verify setup
npm run typecheck
npm run lint
```

#### Environment Variables Configuration
```bash
# .env.local (never commit this file)
GOOGLE_API_KEY=your_google_ai_api_key_here

# Optional development variables
NODE_ENV=development
NEXT_TELEMETRY_DISABLED=1
```

### 2.3 Development Server Setup

#### Frontend Development Server
```bash
# Start Next.js development server with Turbopack
npm run dev

# Server will be available at:
# http://localhost:3000
```

#### AI Backend Development Server
```bash
# Start Genkit development server (in separate terminal)
npm run genkit:dev

# Genkit UI will be available at:
# http://localhost:4000

# For auto-reload during development:
npm run genkit:watch
```

#### Parallel Development Setup
```bash
# Use a process manager like concurrently (optional)
npm install -g concurrently

# Run both servers simultaneously
concurrently "npm run dev" "npm run genkit:watch"
```

---

## 3. Development Workflow

### 3.1 Git Workflow

#### Branch Strategy
```
main (production-ready code)
├── develop (integration branch)
├── feature/analysis-improvements
├── feature/ui-enhancements
├── bugfix/form-validation
└── hotfix/security-patch
```

#### Branch Naming Conventions
```bash
# Feature branches
feature/short-description
feature/add-persona-validation
feature/improve-error-handling

# Bug fixes
bugfix/issue-description
bugfix/fix-form-submission
bugfix/resolve-ai-timeout

# Hot fixes
hotfix/critical-issue
hotfix/security-vulnerability

# Chores/maintenance
chore/update-dependencies
chore/improve-documentation
```

#### Workflow Commands
```bash
# 1. Create and switch to new feature branch
git checkout -b feature/add-new-persona

# 2. Make changes and commit frequently
git add .
git commit -m "feat: add new persona option to dropdown"

# 3. Push branch and create pull request
git push origin feature/add-new-persona

# 4. After PR approval, merge and cleanup
git checkout main
git pull origin main
git branch -d feature/add-new-persona
```

### 3.2 Commit Message Standards

#### Conventional Commits Format
```
<type>(<scope>): <subject>

<body>

<footer>
```

#### Commit Types
```bash
feat:     # New feature
fix:      # Bug fix
docs:     # Documentation changes
style:    # Code style changes (formatting, etc.)
refactor: # Code refactoring
test:     # Adding or modifying tests
chore:    # Maintenance tasks
perf:     # Performance improvements
```

#### Examples
```bash
feat(analysis): add new persona validation logic
fix(ui): resolve form submission error handling
docs(readme): update development setup instructions
refactor(components): extract common button logic
test(flows): add unit tests for AI analysis flow
chore(deps): update dependencies to latest versions
```

### 3.3 Code Review Process

#### Pull Request Requirements
1. **Branch is up-to-date** with target branch
2. **All tests pass** (when implemented)
3. **Code builds successfully** without warnings
4. **Type checking passes** (`npm run typecheck`)
5. **Linting passes** (`npm run lint`)
6. **PR description** explains changes and rationale

#### Pull Request Template
```markdown
## Changes Made
Brief description of what was changed and why.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Manual testing completed
- [ ] All checks pass
- [ ] AI flows tested in Genkit UI

## Screenshots (if applicable)
Include before/after screenshots for UI changes.

## Additional Notes
Any additional context or considerations.
```

#### Review Checklist
- [ ] Code follows project style guidelines
- [ ] TypeScript types are properly defined
- [ ] Error handling is implemented
- [ ] Performance impact is considered
- [ ] Security best practices are followed
- [ ] Mobile responsiveness is maintained
- [ ] Accessibility requirements are met

---

## 4. Development Standards

### 4.1 Code Style Guidelines

#### TypeScript Standards
```typescript
// Use explicit return types for functions
function analyzeInput(input: string): Promise<AnalysisResult> {
  return processAnalysis(input);
}

// Use interfaces for object shapes
interface ComponentProps {
  title: string;
  isLoading: boolean;
  onSubmit: (data: FormData) => void;
}

// Use enums for constants
enum PersonaType {
  GENERAL = 'General Audience',
  SAAS = 'SaaS Founders',
  PARENTS = 'Busy Parents'
}

// Use proper error handling
try {
  const result = await riskyOperation();
  return result;
} catch (error) {
  console.error('Operation failed:', error);
  throw new Error('User-friendly error message');
}
```

#### React Component Standards
```tsx
// Use functional components with hooks
const FunnelAnalysisForm: React.FC<Props> = ({ 
  onSubmit, 
  isLoading 
}) => {
  // State hooks at the top
  const [inputValue, setInputValue] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Effect hooks after state
  useEffect(() => {
    // Side effects
  }, [dependencies]);
  
  // Event handlers
  const handleSubmit = useCallback((event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(inputValue);
  }, [inputValue, onSubmit]);
  
  // Early returns for conditional rendering
  if (isLoading) {
    return <LoadingSpinner />;
  }
  
  // Main render
  return (
    <form onSubmit={handleSubmit}>
      {/* JSX content */}
    </form>
  );
};
```

#### CSS/Tailwind Standards
```tsx
// Use consistent spacing classes
const buttonClasses = cn(
  // Base styles
  "px-4 py-2 rounded-lg font-medium",
  // State styles
  "hover:bg-opacity-90 disabled:opacity-50",
  // Responsive styles
  "md:px-6 md:py-3",
  // Conditional styles
  isLoading && "cursor-not-allowed",
  variant === "primary" && "bg-indigo-600 text-white"
);

// Use semantic color names
<div className="bg-background text-foreground border-border">
  <h1 className="text-primary">Title</h1>
  <p className="text-muted-foreground">Description</p>
</div>
```

### 4.2 File Organization Standards

#### Directory Structure
```
src/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # Generic UI components
│   └── funnel-flow/      # Feature-specific components
├── ai/                   # AI service layer
│   ├── flows/           # Genkit AI flows
│   ├── genkit.ts        # Genkit configuration
│   └── dev.ts           # Development entry point
├── lib/                 # Utility functions
│   └── utils.ts         # Common utilities
├── hooks/               # Custom React hooks
└── types/               # TypeScript type definitions
```

#### File Naming Conventions
```
PascalCase:     Components (Button.tsx, AnalysisForm.tsx)
camelCase:      Functions, variables, hooks (useAnalysis.ts)
kebab-case:     Files, folders (analysis-form.tsx)
UPPER_CASE:     Constants (API_ENDPOINTS.ts)
```

### 4.3 Import/Export Standards

#### Import Order
```typescript
// 1. Node modules
import React, { useState, useEffect } from 'react';
import { z } from 'zod';

// 2. Internal modules (absolute paths)
import { Button } from '@/components/ui/button';
import { analyzeMarketingOffer } from '@/ai/flows/analyze-marketing-offer';
import { cn } from '@/lib/utils';

// 3. Relative imports
import './component.css';
```

#### Export Standards
```typescript
// Prefer named exports
export const AnalysisForm = () => { /* ... */ };
export const useAnalysis = () => { /* ... */ };

// Use default exports for main component in file
const FunnelAnalysisForm = () => { /* ... */ };
export default FunnelAnalysisForm;

// Re-exports for clean APIs
export { AnalysisForm } from './AnalysisForm';
export { ResultsDisplay } from './ResultsDisplay';
export type { AnalysisProps } from './types';
```

---

## 5. AI Development Workflow

### 5.1 Genkit Flow Development

#### Flow Development Process
```bash
# 1. Start Genkit development server
npm run genkit:dev

# 2. Navigate to Genkit UI
open http://localhost:4000

# 3. Test flows interactively in the UI
# 4. View traces and debug issues
# 5. Iterate on prompts and schemas
```

#### Flow Testing Best Practices
```typescript
// Test with various input scenarios
const testCases = [
  {
    name: 'Valid URL input',
    input: {
      offerDetails: 'https://example.com/landing-page',
      inputType: 'link' as const,
      persona: 'SaaS Founders'
    }
  },
  {
    name: 'Text description input',
    input: {
      offerDetails: 'A productivity app for busy professionals',
      inputType: 'text' as const,
      persona: 'Busy Parents'
    }
  },
  {
    name: 'Edge case - minimal input',
    input: {
      offerDetails: 'Short desc',
      inputType: 'text' as const,
      persona: 'General Audience'
    }
  }
];

// Test each case in Genkit UI
testCases.forEach(testCase => {
  console.log(`Testing: ${testCase.name}`);
  // Run in Genkit UI and verify output
});
```

#### Prompt Engineering Guidelines
```typescript
// Use clear, structured prompts
const prompt = `You are an expert marketing funnel conversion analyst.

CONTEXT:
- User input: "{{{offerDetails}}}" (Type: {{{inputType}}})
- Target persona: "{{{persona}}}"

TASK:
1. Analyze 2-3 key funnel areas (e.g., Headline Clarity, CTA Strength)
2. Score each area from 1-10
3. Identify specific leaks/weaknesses
4. Provide two distinct A/B test suggestions per area

OUTPUT FORMAT:
Return structured JSON matching the specified schema.

QUALITY REQUIREMENTS:
- Specific, actionable feedback
- Persona-appropriate language
- Clear A/B test distinctions`;
```

### 5.2 Schema Evolution

#### Schema Versioning Strategy
```typescript
// Version schemas for backward compatibility
const AnalysisSchemaV1 = z.object({
  analysis: z.array(AnalysisItemSchema),
  sampleCopy: SampleCopySchema
});

const AnalysisSchemaV2 = z.object({
  ...AnalysisSchemaV1.shape,
  confidence: z.number().min(0).max(1),
  version: z.literal('2.0')
});

// Handle schema migrations
const migrateAnalysisResult = (data: any): AnalysisSchemaV2 => {
  if (data.version === '2.0') {
    return AnalysisSchemaV2.parse(data);
  }
  
  // Migrate from V1 to V2
  return AnalysisSchemaV2.parse({
    ...data,
    confidence: 0.8, // Default confidence
    version: '2.0'
  });
};
```

---

## 6. Testing Workflow

### 6.1 Manual Testing Checklist

#### Functional Testing
```markdown
### Form Submission Testing
- [ ] URL input validation works
- [ ] Text input validation works
- [ ] Persona selection functions
- [ ] Form submission triggers analysis
- [ ] Loading state displays correctly
- [ ] Results display properly
- [ ] Error handling works

### AI Integration Testing
- [ ] Analysis completes successfully
- [ ] Results format matches schema
- [ ] Multiple personas work correctly
- [ ] Edge cases handled gracefully
- [ ] Error scenarios display user-friendly messages

### UI/UX Testing
- [ ] Mobile responsiveness works
- [ ] Dark theme displays correctly
- [ ] Animations function smoothly
- [ ] Copy-to-clipboard works
- [ ] Accessibility features work
- [ ] Performance is acceptable
```

#### Browser Testing Matrix
```yaml
Desktop Browsers:
  - Chrome (latest 2 versions)
  - Firefox (latest 2 versions)
  - Safari (latest 2 versions)
  - Edge (latest 2 versions)

Mobile Browsers:
  - Chrome Mobile (Android)
  - Safari Mobile (iOS)
  - Samsung Internet

Screen Sizes:
  - Mobile: 375px - 767px
  - Tablet: 768px - 1023px
  - Desktop: 1024px+
```

### 6.2 Performance Testing

#### Performance Checklist
```bash
# 1. Build and test performance
npm run build
npm run start

# 2. Use browser dev tools to check:
# - Core Web Vitals
# - Network waterfall
# - JavaScript bundle size
# - Image optimization

# 3. Test AI service performance:
# - Response times < 30 seconds
# - Error rates < 2%
# - Concurrent request handling
```

#### Performance Monitoring
```typescript
// Monitor key metrics during development
const performanceObserver = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    if (entry.name === 'ai-analysis') {
      console.log(`AI Analysis took: ${entry.duration}ms`);
    }
  }
});

performanceObserver.observe({ entryTypes: ['measure'] });

// Measure AI operations
const measureAIPerformance = async () => {
  performance.mark('ai-start');
  await analyzeMarketingOffer(input);
  performance.mark('ai-end');
  performance.measure('ai-analysis', 'ai-start', 'ai-end');
};
```

---

## 7. Deployment Workflow

### 7.1 Pre-Deployment Checklist

#### Code Quality Verification
```bash
# 1. Type checking
npm run typecheck

# 2. Linting
npm run lint

# 3. Build verification
npm run build

# 4. Manual testing checklist completion
# 5. Performance testing passed
# 6. Security review completed
```

#### Environment Preparation
```bash
# 1. Verify environment variables
echo $GOOGLE_API_KEY  # Should be set

# 2. Check production configuration
cat apphosting.yaml   # Verify settings

# 3. Test build locally
npm run build
npm run start
```

### 7.2 Deployment Process

#### Google App Hosting Deployment
```bash
# 1. Ensure you're on the correct branch
git checkout main
git pull origin main

# 2. Deploy to staging (if available)
gcloud app deploy --no-promote

# 3. Test staging deployment
# 4. Promote to production
gcloud app deploy --promote

# 5. Verify production deployment
curl -I https://your-app-url.com
```

#### Post-Deployment Verification
```bash
# 1. Smoke test critical paths
# 2. Monitor error rates
# 3. Check performance metrics
# 4. Verify AI service connectivity
# 5. Test from different geographic locations
```

### 7.3 Rollback Procedures

#### Emergency Rollback
```bash
# 1. Identify last known good version
gcloud app versions list

# 2. Route traffic to previous version
gcloud app services set-traffic default --splits=[GOOD_VERSION]=1

# 3. Investigate and fix issue
# 4. Deploy fix when ready
# 5. Route traffic back to latest version
```

---

## 8. Troubleshooting Guide

### 8.1 Common Development Issues

#### Environment Setup Issues
```bash
# Node version mismatch
nvm use 20
nvm alias default 20

# Dependency conflicts
rm -rf node_modules package-lock.json
npm install

# Environment variables not loading
# Check .env.local exists and has correct format
# Verify no extra spaces or quotes
```

#### AI Service Issues
```bash
# Genkit server won't start
# Check Google AI API key is valid
# Verify network connectivity
# Check for port conflicts

# AI requests timing out
# Verify API quota limits
# Check request format matches schema
# Monitor Genkit UI for traces
```

#### Build Issues
```bash
# TypeScript errors
npm run typecheck

# Missing dependencies
npm install

# Next.js build failures
# Check for syntax errors
# Verify all imports are correct
# Clear .next directory and rebuild
```

### 8.2 Performance Debugging

#### Slow Performance Investigation
```bash
# 1. Use Next.js built-in analyzer
npm install @next/bundle-analyzer
# Add to next.config.ts and rebuild

# 2. Check Core Web Vitals
# Use Chrome DevTools Lighthouse

# 3. Profile React components
# Use React Developer Tools Profiler

# 4. Monitor AI service response times
# Check Genkit traces in development UI
```

### 8.3 Production Issues

#### Monitoring and Alerting
```bash
# Check application logs
gcloud app logs tail -s default

# Monitor error rates
# Check Google Cloud Console metrics

# Performance monitoring
# Use Real User Monitoring (RUM) tools

# AI service health
# Monitor Google AI API usage and quotas
```

---

## 9. Code Review Guidelines

### 9.1 Review Criteria

#### Functionality Review
- [ ] Code accomplishes stated requirements
- [ ] Edge cases are handled appropriately
- [ ] Error scenarios are managed gracefully
- [ ] Performance impact is acceptable

#### Code Quality Review
- [ ] Code is readable and well-documented
- [ ] TypeScript types are appropriate and complete
- [ ] No unused imports or variables
- [ ] Consistent with project coding standards

#### Security Review
- [ ] Input validation is implemented
- [ ] No sensitive data is exposed
- [ ] API keys are properly managed
- [ ] XSS and injection attacks are prevented

#### UI/UX Review
- [ ] Mobile responsiveness is maintained
- [ ] Accessibility requirements are met
- [ ] Visual design matches specifications
- [ ] User experience is intuitive

### 9.2 Review Process

#### Reviewer Responsibilities
1. **Understand the context** - Read PR description and linked issues
2. **Test the changes** - Pull branch and test functionality
3. **Review code thoroughly** - Check logic, style, and standards
4. **Provide constructive feedback** - Specific, actionable comments
5. **Approve or request changes** - Clear decision with rationale

#### Author Responsibilities
1. **Provide clear PR description** - Explain what and why
2. **Respond to feedback promptly** - Address comments constructively
3. **Test changes thoroughly** - Ensure functionality works as expected
4. **Keep PRs focused** - One feature/fix per PR when possible

---

## 10. Maintenance Procedures

### 10.1 Regular Maintenance Tasks

#### Weekly Tasks
- [ ] Update dependencies (`npm audit` and `npm update`)
- [ ] Review and merge approved PRs
- [ ] Check performance metrics and error rates
- [ ] Review AI service usage and costs

#### Monthly Tasks
- [ ] Security audit (`npm audit --audit-level=high`)
- [ ] Performance benchmark comparison
- [ ] Review and update documentation
- [ ] Clean up old branches and PRs

#### Quarterly Tasks
- [ ] Major dependency updates
- [ ] Security penetration testing
- [ ] Performance optimization review
- [ ] Disaster recovery testing

### 10.2 Documentation Maintenance

#### Keep Updated
- [ ] README with current setup instructions
- [ ] API documentation for flows
- [ ] Deployment procedures
- [ ] Troubleshooting guides
- [ ] Architecture diagrams

---

*This development workflow serves as the authoritative guide for all development activities on Funnel Flow. All team members should follow these procedures to ensure consistent, high-quality development practices.* 