# justyn demo script

## before you record

1. open vscode in `c:\users\eldri\onedrive\desktop\solara`
2. keep this script open:
   - `backend/demo/justyn-demo-script-detailed.md`
3. pre-open these code tabs in vscode, in any order you like:
   - `ProjectController.java`
   - `HelpRequestController.java`
   - `NotificationController.java`
   - `ProjectService.java`
   - `HelpRequestService.java`
   - `NotificationService.java`
   - `Project.java`
   - `ProjectGuideResource.java`
   - `HelpRequest.java`
   - `Notification.java`
   - `NotificationPreference.java`
   - `ProjectRepository.java`
   - `DemoDataSeeder.java`
   - `SolaraRequestContextFilter.java`
4. pre-open these thunder client tabs before you record:
   - `core 1 - get projects`
   - `core 2 - get one project`
   - `core 3 - add guide resource`
   - `core 4 - pin guide resource`
   - `core 5 - create help request`
   - `core 6 - get notifications`
5. keep `backend/demo/justyn-demo.http` and `backend/demo/justyn-demo.sql` open only as backup files
6. keep these browser tabs open:
   - frontend workspace: `http://127.0.0.1:5173/projects/1`
   - h2 console: `http://127.0.0.1:8080/h2-console`
7. connect h2 before you record using:
   - jdbc url: `jdbc:h2:mem:solara`
   - user: `sa`
   - password: leave blank
8. make sure the backend is running on `http://127.0.0.1:8080`
9. if you already practiced and the state looks messy, restart the backend so h2 resets

## h2 login

- jdbc url: `jdbc:h2:mem:solara`
- user: `sa`
- password: leave blank

## thunder client setup

1. use thunder client only with the six tabs already open before recording
2. during the demo, do not create new requests and do not paste anything unless something breaks
3. your job in the demo is just:
   - click the next thunder client tab
   - pause for a second
   - click `Send`
4. keep `backend/demo/justyn-demo.http` as backup only if a tab gets closed by mistake

## recording script

### 1. opening

do this first

1. start recording with your camera on
2. in vscode, make sure the code editor is visible with your backend tabs already open

then say this

Hi, I'm Justyn Fernandez. This video covers the backend work I implemented for Solara Startup 1. My section includes project APIs, project-guide resource links, help requests, the notification inbox, notification preferences, and the project dashboard. The backend is built in Spring Boot and uses controllers, services, entities, JPA repositories, and an H2 relational database.

### 2. show the spring boot structure

do this first

1. if the explorer is already open, point at the `controller`, `service`, `entity`, and `repository` folders
2. if the explorer is not open, click the explorer icon once and point at those folders

then say this

This is the Spring Boot structure for my section of the backend. The controllers expose the API endpoints, the services hold the business rules, the entities map the database tables, and the repositories handle persistence through JPA.

### 3. show the controllers

do this first

1. click `ProjectController.java`
2. hover over the class comment
3. point at `@RestController`
4. point at `@RequestMapping("/api/projects")`
5. click `HelpRequestController.java`
6. hover over the class comment
7. click `NotificationController.java`
8. hover over the class comment

then say this

These are the main controllers for my contribution. `ProjectController` covers project listing, project detail, guide-resource linking, pinning, and the dashboard endpoint. `HelpRequestController` covers create, list, get, and update flows for support requests. `NotificationController` covers the inbox and notification preferences. The controllers stay thin and delegate the rules to the service layer.

### 4. show the service layer

do this first

1. click `ProjectService.java`
2. hover over the class comment
3. scroll to `addGuideResource`
4. point at `projectGuideResourceRepository.existsByProjectIdAndGuideId`
5. point at `notificationService.emitGuideSavedToProject`
6. scroll to `getProjectDashboard`
7. click `HelpRequestService.java`
8. hover over the class comment
9. point at `createHelpRequest`
10. point at `notificationService.emitHelpRequestCreated`
11. click `NotificationService.java`
12. hover over the class comment

then say this

This is where the main backend rules live. In `ProjectService`, I check permissions, block duplicate project-guide links, and build the dashboard response. In `HelpRequestService`, I validate the related user, project, and guide before saving. In `NotificationService`, I create inbox rows from real backend actions rather than local frontend state.

### 5. show the entities

do this first

1. click `Project.java`
2. hover over the class comment
3. point at the `@Table` indexes and unique slug constraint
4. point at the `@ElementCollection` tags section
5. click `ProjectGuideResource.java`
6. hover over the class comment
7. point at the unique constraint for `project_id` and `guide_id`
8. point at the `@ManyToOne` relationships
9. point at the `pinned` field
10. click `HelpRequest.java`
11. click `Notification.java`
12. click `NotificationPreference.java`
13. hover over the class comment

then say this

These entity classes map directly to the physical database tables. `Project` is the main workspace table. `ProjectGuideResource` is a separate join table between projects and guides. `HelpRequest` stores support requests, `Notification` stores inbox rows, and `NotificationPreference` stores one settings row per user. The unique constraint on project and guide is what blocks duplicate links.

### 6. show repositories, seed data, and request context

do this first

1. click `ProjectRepository.java`
2. hover over the class comment
3. point at `JpaRepository`
4. point at `JpaSpecificationExecutor`
5. click `DemoDataSeeder.java`
6. hover over the class comment
7. click `SolaraRequestContextFilter.java`
8. hover over the class comment

then say this

This is the repository layer, together with the seed data and request context setup. `ProjectRepository` uses `JpaRepository` for normal persistence and `JpaSpecificationExecutor` for the filtered project list. The seed data keeps the demo repeatable, and the `X-User-Id` filter lets me demonstrate current-user backend behaviour without relying on login.

### 7. switch to h2 and show the tables

do this first

1. switch to your browser tab with h2
2. if you are not connected yet, enter:
   - jdbc url: `jdbc:h2:mem:solara`
   - user: `sa`
   - password: blank
3. click `Connect`
4. click inside the sql box
5. paste `SELECT * FROM PROJECTS;`
6. click `Run`
7. clear the sql box
8. paste `SELECT * FROM PROJECT_GUIDE_RESOURCES;`
9. click `Run`
10. clear the sql box
11. paste `SELECT * FROM HELP_REQUESTS;`
12. click `Run`
13. clear the sql box
14. paste `SELECT * FROM NOTIFICATIONS;`
15. click `Run`
16. clear the sql box
17. paste `SELECT * FROM NOTIFICATION_PREFERENCES;`
18. click `Run`

then say this

This is the H2 database connected to the Spring Boot application. The tables come from the entity classes, and the seed data means the demo starts from a consistent, populated state. The main tables for my section are `PROJECTS`, `PROJECT_GUIDE_RESOURCES`, `HELP_REQUESTS`, `NOTIFICATIONS`, and `NOTIFICATION_PREFERENCES`.

### 8. move into thunder client

do this first

1. switch back to vscode
2. click the thunder client icon
3. make sure the six already-open request tabs are visible
4. if you somehow lost a tab, use `backend/demo/justyn-demo.http` to reopen it before recording, not during recording

then say this

I'm moving into Thunder Client now to hit the backend directly. The main requests are already staged, so I can run them in order and focus on the request, response, and database effect.

### 9. get projects

do this first

1. click the already-open tab for `core 1 - get projects`
2. pause for a second so the saved request is visible
3. click `Send`

then say this

First, I call `GET /api/projects`. This returns seeded project data in the shared API response wrapper, including the data payload and pagination metadata.

### 10. get one project

do this first

1. click the already-open tab for `core 2 - get one project`
2. pause for a second so the saved request is visible
3. click `Send`

then say this

Next, I call `GET /api/projects/1`. This returns the full project detail response, including owner summaries, linked guide resources, and project-level counts for the workspace.

### 11. guide resource flow

do this first

1. click the already-open tab for `core 3 - add guide resource`
2. pause for a second so the request name and url are visible
3. click `Send`
4. click the already-open tab for `core 4 - pin guide resource`
5. pause for a second so the saved patch request is visible
6. click `Send`
7. switch to h2
8. rerun `SELECT * FROM PROJECT_GUIDE_RESOURCES;`

then say this

Now I'm showing the guide-resource flow. First I create the project-guide link, then I patch the pinned flag, and then I show the row updating in H2. This is a clear example of a relational write followed by an update on the same record.

### 12. create a help request

do this first

1. switch back to thunder client
2. click the already-open tab for `core 5 - create help request`
3. pause for a second so the saved post request is visible
4. click `Send`
5. switch to h2
6. rerun `SELECT * FROM HELP_REQUESTS;`

then say this

Next, I create a help request linked to the current user, the project, and the guide. This is the second main write flow in my section, and the new row is now visible in the `HELP_REQUESTS` table.

### 13. notifications

do this first

1. switch back to thunder client
2. click the already-open tab for `core 6 - get notifications`
3. pause for a second so the saved request is visible
4. click `Send`
5. switch to h2
6. rerun `SELECT * FROM NOTIFICATIONS;`

then say this

Now I'm fetching notifications. Because the earlier guide and help-request actions emit backend events, the inbox is filling from real application activity rather than mock frontend state.

### 14. optional backup only if you have time

do this first

1. skip this section unless you know you are under time
2. if you are under time, use the extra requests in `backend/demo/justyn-demo.http` for:
   - notification preferences
   - duplicate guide conflict
   - mark notification as read
   - project dashboard get request

then say this

If I have extra time, these are the backup requests I can show. For the main version of the demo, this is where I stop the Thunder Client section.

### 15. show the dashboard endpoint

do this first

1. skip thunder client here
2. go straight to the frontend workspace tab

then say this

Instead of spending more time in Thunder Client, I'm going to show the dashboard through the frontend, because it presents the same backend data in a clearer way.

### 16. show the frontend dashboard tab

do this first

1. switch to the browser tab at `http://127.0.0.1:5173/projects/1`
2. click `Dashboard`
3. pause so the data is visible

then say this

To show that the frontend is wired to the backend, I'm opening the project workspace dashboard tab. This data comes from the backend dashboard endpoint, not local mock state.

### 17. show the frontend updates tab

do this first

1. click `Updates`
2. pause so the notifications list is visible
3. if you want one last visible ui change, toggle one preference and click `Save preferences`

then say this

In the `Updates` tab, this section is connected to the backend notification inbox and notification-preference endpoints. I can see the notifications created by the earlier backend actions, and the saved preference toggles are backed by the database.

### 18. closing line

do this first

1. stay on the workspace page or switch back to vscode
2. stop moving the mouse

then say this

To conclude, my individual contribution is a Spring Boot backend for projects, project-guide resources, help requests, notifications, notification preferences, and a project dashboard. I showed the controller, service, entity, and repository structure, the H2 table model, seeded relational data, Thunder Client requests and responses, conflict handling, live database updates, and a frontend workspace connected to the endpoints I implemented.

## if you get stuck during thunder client

- every request should already be open before you start recording
- during the demo, the pattern is just: click tab, pause, click `Send`
- if you accidentally close a tab, reopen it from `backend/demo/justyn-demo.http`
- if a request fails because the data already exists, restart the backend and h2 will reset
