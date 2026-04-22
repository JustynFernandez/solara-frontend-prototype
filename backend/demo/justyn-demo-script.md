# justyn demo script

## live urls

- frontend: http://127.0.0.1:5173/projects/1
- backend health: http://127.0.0.1:8080/api/health
- h2 console: http://127.0.0.1:8080/h2-console

## h2 login

- jdbc url: `jdbc:h2:mem:solara`
- user: `sa`
- password: leave blank

## thunder client header

- `X-User-Id: user-demo-1`

## quick click order

1. open backend in vscode
2. show `controller`, `service`, `entity`, `repository`
3. open `ProjectController.java`
4. open `HelpRequestController.java`
5. open `NotificationController.java`
6. open `ProjectService.java`
7. open `NotificationService.java`
8. open `Project.java`
9. open `ProjectGuideResource.java`
10. open `HelpRequest.java`
11. open `Notification.java`
12. open `NotificationPreference.java`
13. switch to h2
14. run the SQL queries in the `.sql` file
15. switch to thunder client
16. run the requests in the `.http` file order
17. switch to the frontend on `/projects/1`
18. click `Dashboard`
19. click `Updates`
20. show the new notifications and saved preferences

## opening line

Hi, I'm Justyn Fernandez. This video covers the backend work I implemented for Solara Startup 1. My section includes project APIs, project-guide resource links, help requests, the notification inbox, notification preferences, and the project dashboard. The backend is built in Spring Boot and uses controllers, services, entities, JPA repositories, and an H2 relational database.

## code walkthrough

This is the Spring Boot structure for my section of the backend. The controllers expose the API endpoints, the services hold the business rules, the entities map the database tables, and the repositories handle persistence through JPA.

In the controller layer, the main endpoints are `ProjectController`, `HelpRequestController`, and `NotificationController`. `ProjectController` covers the project list, project detail, guide-resource linking, pinning, and the dashboard response. `HelpRequestController` covers create, list, get, and update flows for support requests. `NotificationController` covers inbox reads, read-state updates, and notification preferences.

In the service layer, the controllers stay thin and the rules live in code that is easier to test. This is where duplicate project-guide links are blocked, help requests validate related records before saving, and notifications are emitted from real backend actions.

In the entity layer, the classes map directly to the physical tables in H2. One design choice worth pointing out is `ProjectGuideResource`, which is a separate join table between projects and guides. That keeps the relationship normalized, visible in the database, and protected by a unique constraint.

## h2 section

This is the H2 database connected to the Spring Boot application. The tables come from the entity classes, and the seeded data means the demo starts from a consistent, populated state.

This is the `PROJECTS` table with seeded project rows.

This is `PROJECT_GUIDE_RESOURCES`, which stores the project-to-guide links.

This is the `HELP_REQUESTS` table.

This is the `NOTIFICATIONS` table.

This is `NOTIFICATION_PREFERENCES`, which stores one notification settings row per user.

## thunder client section

First, I call `GET /api/projects`. This returns seeded project data in the standard API response wrapper.

Next, I call `GET /api/projects/1`, which returns the full detail for one project.

Then I call `GET /api/notification-preferences`, which returns the current user's saved preference record.

Next, I update the notification preferences and then show the changed row in H2.

Then I link a guide resource to project 1. That creates a new row in `PROJECT_GUIDE_RESOURCES`.

I repeat the same request intentionally. This time it fails with a conflict because the backend blocks duplicate guide links for the same project.

Next, I update that same linked resource by changing the pinned flag.

Then I create a help request linked to the current user, the project, and the guide.

After that, I fetch notifications. The earlier actions generated backend notification rows, and they are visible through the API.

Finally, I update one notification to mark it as read.

## frontend section

To show that the frontend is wired to the backend, I open the project workspace for project 1.

In the `Dashboard` tab, the data comes from the backend dashboard endpoint rather than local mock state. It aggregates membership counts, linked resources, open help requests, owners, recent resources, and recent help requests into one response.

In the `Updates` tab, the UI is reading from the backend notification inbox and notification preference endpoints. I can see the notifications created by the earlier backend actions, and I can also update the read state and save preference changes.

## closing line

To conclude, my individual contribution is a Spring Boot backend for projects, project-guide resources, help requests, notifications, notification preferences, and a project dashboard. In this demo I showed the controller, service, entity, and repository structure, the H2 table model, seeded relational data, Thunder Client requests and responses, conflict handling, live database updates, and a frontend workspace connected to the endpoints I implemented.
