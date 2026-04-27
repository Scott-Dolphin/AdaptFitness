# AdaptFitness Test Plan

## 1. Overview
This document outlines the testing strategy for the AdaptFitness application — a full-stack fitness tracking web app built with React, TypeScript, and Supabase. The goal of this test plan is to ensure all core features work correctly, reliably, and consistently across builds.

## 2. Testing Objectives
- Verify all user facing features render and behave correctly
- Catch regressions early through automated testing in CI/CD
- Ensure authentication flows work as expected
- Validate calculations produce correct outputs (calorie calculator)

## 3. Testing Methodologies

### 3.1 Unit Testing
Tool: Vitest + React Testing Library  
Why: Unit tests isolate components and verify they render correctly and respond to user input as expected.  
Applied to: All components (LandingPage, LoginPage, SignupPage, Dashboard, NutritionLog, FitnessLog, CalorieCalculator)

### 3.2 Component Integration Testing
Tool:Vitest + React Testing Library  
Why: Some components depend on context providers (AuthContext) and routing. Integration tests verify these work correctly together, not just in isolation.  
Applied to: Auth flows (login/signup), protected route behavior, context-dependent components

### 3.3 Automated CI Testing
Tool: GitHub Actions  
Why: Running tests automatically on every pull request ensures no broken code merges to main. This removes human error from the process and gives the team immediate feedback.  
Applied to: All test files run on every PR via the quality-checks job in our CI/CD pipeline

### 3.4 Black box Testing
Tool: Web browser + OWASP top 10:2025
Why: Ensure the end user's experience is not broken, unpleasant, or easily exploitable
Applied to: Anything a user can see, click, or type in

## 4. Out of Scope
- End-to-end browser testing 
- Load/performance testing
- Mobile device testing

## 5. Test Environment
| Item | Details |
|------|---------|
| Framework | React 19 + React Router 7 |
| Language | TypeScript |
| Test Runner | Vitest 4.0 |
| DOM Environment | Happy-DOM |
| Testing Library | React Testing Library 16 |
| CI Platform | GitHub Actions (ubuntu-latest) |
| Node Version | 24 |

## 6. Test Execution
Tests are executed in two ways:

- Locally: `npm run test:ci` from the `frontend/` directory
- Automatically: On every push and pull request via GitHub Actions CI pipeline

## 7. Test Coverage Goals
| Feature | Target Coverage |
|---------|-----------------|
| Authentication (Login/Signup) | 100% |
| Landing Page | 100% |
| Dashboard | Core rendering |
| Calorie Calculator | Input validation + calculation logic |
| Nutrition Log | Add/delete/display entries |
| Fitness Log | Add/delete/display entries |

## 8. Timeline & Resources
| Phase | Description | Target |
|-------|-------------|--------|
| Phase 1 | Auth + Landing page tests | Sprint 2 Week 1 |
| Phase 2 | Core feature tests (Dashboard, Calculator, Logs) | Sprint 2 Week 2 |
| Phase 3 | CI integration + test results tracking | Sprint 2 Week 3 


## 9. Bug Tracking
Bugs discovered during testing are tracked as GitHub Issues with the bug label. Each issue includes:

- Which test or build found it
- Steps to reproduce
- Expected vs actual behavior
- Build/commit it was found in
- Build/commit it was fixed in
