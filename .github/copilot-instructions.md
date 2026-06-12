# GitHub Copilot Instructions

## Instruction Source

Primary repository skill:
```text
.github/skills/react-frontend-developer/skill.md
```

If the skill file is unavailable or inaccessible:
- notify the user
- continue using the rules defined in this file
- do not invent missing repository conventions

---

# Operational Priority Order

When instructions conflict, follow this order:

1. Correctness and application stability
2. Existing repository conventions and architecture
3. Strong TypeScript typing and maintainability
4. Readability and simplicity
5. Reusability and scalability
6. Performance optimization
7. Additional abstractions or enhancements

If ambiguity remains after applying priorities:
- ask clarifying questions before implementation

---

# Core Technology Stack

This repository uses:

- React
- TypeScript
- Vite
- React Router
- React Bootstrap
- Axios
- CSS Modules
- Vitest
- React Testing Library

Package manager:
```bash
npm
```

---

# TypeScript Rules

## Compiler Expectations

Prefer:
```json
{
  "strict": true
}
```

## Typing Rules

Required:
- strongly type props
- strongly type API responses
- strongly type exported functions
- strongly type reusable utilities

Allowed:
- `any` only when unavoidable
- document why `any` is required with a short comment

Use:
- interfaces for extendable object contracts
- types for unions and utility compositions

---

# Component Rules

## Component Design

Prefer:
- functional components
- PascalCase component names
- small reusable components
- colocated CSS Modules

Preferred structure:
```text
components/
  UserCard/
    UserCard.tsx
    UserCard.module.css
```

## Component Size Guidance

If a component exceeds:
- ~250 lines
- multiple unrelated responsibilities
- deeply nested rendering logic

Then:
- propose splitting into smaller components

Do not split components unnecessarily.

---

# Styling Rules

## Styling Priority

Use:
1. React Bootstrap components and utilities
2. CSS Modules for component-specific customization
3. Global styles only for application-wide themes or resets

Avoid:
- inline styles unless dynamic styling requires them
- large monolithic CSS files

## CSS Module Naming

Use:
```text
ComponentName.module.css
```

---

# Responsive Design Rules

Applications should:
- support desktop-first workflows
- remain usable on smaller screens
- avoid broken mobile layouts

Use:
- Bootstrap responsive utilities
- flexible layouts
- responsive containers/grids

Do not:
- hardcode fixed-width layouts without justification

---

# Accessibility Rules

Required:
- semantic HTML
- accessible form labels
- keyboard-accessible interactions

Use aria attributes only when semantic HTML is insufficient.

Avoid:
- clickable div-only controls
- missing labels
- inaccessible custom UI patterns

---

# Project Structure Rules

For new features or modules, prefer:

```text
src/
├── api/
├── assets/
├── components/
├── hooks/
├── layouts/
├── pages/
├── routes/
├── services/
├── styles/
├── types/
├── utils/
```

Do not reorganize existing architecture unless:
- the change affects more than 5 related files
- the user explicitly requests restructuring
- duplication or maintainability problems justify refactoring

For large restructuring:
- explain the reasoning
- ask for confirmation before implementation

---

# State Management Rules

## Preferred State Order

1. Local component state
2. Lifted shared state
3. Context API
4. Advanced global state only when justified

## Context API Threshold

Use Context API only if:
- state is shared across 3 or more component branches
OR
- props are passed through more than 2 intermediate levels

Avoid introducing Redux or other global state libraries unless:
- multiple distant features require synchronized state
- application complexity clearly justifies it

---

# Hook Rules

Use custom hooks only when:
- logic is reused across multiple components
OR
- side-effect management becomes repetitive

## useEffect Rules

Use `useEffect` only for:
- async requests
- subscriptions
- timers
- DOM/event side effects

Avoid using `useEffect` for:
- derived state
- simple calculations
- values computable during render

Keep effect bodies minimal.

---

# API and Async Rules

## API Architecture

Use:
- centralized Axios instance
- service-layer architecture
- typed request/response handling

Preferred structure:
```text
services/
  userService.ts
```

Avoid:
- direct API calls scattered throughout components
- duplicated API logic

## Authentication Handling

If authentication exists:
- centralize token handling in Axios configuration
- use interceptors when appropriate
- isolate authentication logic from UI components

## Retry Rules

Retry only:
- idempotent requests
- transient network failures

Maximum retries:
```text
2
```

Use exponential backoff for retries.

---

# Loading and Error Rules

All async UI flows should include:
- loading state
- error state
- user-friendly messaging

Avoid:
- silent failures
- blank loading screens
- uncaught async errors

---

# Routing Rules

Use:
- React Router
- centralized route definitions when practical
- layout routes when beneficial

Avoid:
- deeply nested routing abstractions
- unnecessary route complexity

---

# Form Rules

## Preferred Form Strategy

1. Controlled React forms for simple forms
2. React Hook Form for larger or more complex forms

Use the simplest reasonable solution first.

---

# Testing Rules

Generate tests for:
- new reusable components
- business logic
- utility functions
- API service layers

Testing may be skipped only when:
- changes are purely cosmetic
- styles only changed
- no behavior changed

Use:
- Vitest
- React Testing Library

Avoid testing implementation details unnecessarily.

---

# Refactor Rules

## Minor Refactors

Allowed automatically if:
- changes affect 3 or fewer related files
- architecture remains unchanged
- readability or maintainability improves

## Major Refactors

A refactor is considered major if it:
- modifies more than 3 files
- changes folder structure
- changes architectural patterns
- changes build/configuration behavior

For major refactors:
1. explain the reasoning
2. explain tradeoffs
3. ask for confirmation before implementation

Do not implement large architectural rewrites automatically.

---

# Repository Convention Rules

Existing repository conventions override generic best practices.

If repository conventions conflict with recommended improvements:
- explain both approaches
- explain tradeoffs
- ask which direction should be followed

Do not arbitrarily replace established patterns.

---

# Performance Rules

Optimize for:
1. correctness
2. maintainability
3. readability

Only introduce performance optimizations when:
- measurable rendering problems exist
- unnecessary rerenders are identified
- large datasets justify optimization

Avoid premature optimization.

---

# Documentation Rules

Prefer:
- self-documenting code
- concise explanations
- meaningful naming

Add comments only when:
- logic is non-obvious
- business rules are complex
- architectural decisions require context

Avoid commenting obvious code.

---

# Copilot Behavioral Rules

Before implementing large changes:
- ask clarifying questions
- confirm assumptions
- explain risks and tradeoffs

Do not:
- rewrite unrelated files
- modify files outside feature scope
- introduce unrelated dependencies
- replace repository conventions without approval

If a request appears ambiguous:
- ask for clarification before implementation

---

# Educational Guidance Rules

Primary persona:
- production-grade frontend engineer with mentoring behavior

Generated code should:
- remain production-ready
- use understandable patterns
- include concise explanations for important architectural decisions

Prefer:
- idiomatic React patterns
- maintainable implementations
- gradual complexity progression

Avoid:
- unnecessary enterprise abstractions
- advanced patterns without justification

---

# Final Quality Expectations

Generated code should be:

- production-ready
- readable
- maintainable
- responsive
- accessible
- strongly typed
- aligned with repository conventions
- understandable by intermediate React developers