# GitHub backend contribution audit

## repo and branch

- organization: `BrunelCS`
- repository: `cs2701-2025-26-group-b8-startup-1`
- default branch: `main`
- backend branch found: `origin/Justyn-2370161-Connect`

## confirmed backend commit

- commit: `0a822972a407575667995701fed673b5d90e4131`
- author: `Justyn Fernandez <2370161@brunel.ac.uk>`
- author date: `2026-03-12 03:14:42 +0000`
- subject: `Add Spring Boot backend for projects and help requests`

## what that GitHub commit added

- a Spring Boot backend under `back-end/`
- controllers for health, projects, and help requests
- services for projects, help requests, permissions, and request context
- entities and JPA repositories for projects, memberships, guide resources, users, guides, and help requests
- H2 configuration and demo seed data
- integration tests for project and help-request flows

## merge status

- the backend work is not present on `origin/main`
- no pull request was found for the backend branch at the time of inspection
- if someone only reviewed `main`, they would not have seen the backend contribution

## relevant branch context

- remote branches present during inspection:
  - `origin/main`
  - `origin/Justyn-2370161-Connect`
  - `origin/Ashhad-2348636-Home-Page`
  - `origin/Dev_Manoj`

## difference between GitHub and the local backend copy

- the local `backend/` directory is a later, more complete version of the Spring Boot backend
- the local copy includes notification entities, notification preferences, notification endpoints, dashboard aggregation, extra integration coverage, and demo assets that were not part of the March 12 GitHub commit

## local verification completed on 2026-03-31

- `backend ./mvnw test` passed: `16` tests
- live UI check on the local app succeeded:
  - project workspace loaded
  - dashboard loaded without frontend errors
  - help request submission through the UI succeeded
  - unread notification count increased in the updates tab
- patched backend verification on port `8091` succeeded:
  - `openHelpRequestCount` moved from `0` to `1` after a new help request
  - dashboard `updatedAt` advanced to the new help-request timestamp

## evidence you can cite in the evaluation section

- the backend contribution exists in GitHub history and is attributable to a specific branch and commit
- the work was not merged into the team `main` branch and no PR was visible during inspection
- the local working version extends that original backend contribution beyond what is recorded in the BrunelCS repo

Use the points above as factual evidence. Any judgement about professionalism or teamwork should still reflect what actually happened in your group, not just the commit log.
