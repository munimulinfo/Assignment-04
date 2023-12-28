# Assignment -4

### Live Server Link: https://assignment-03-pink.vercel.app

### Document Link: https://docs.google.com/document/d/1tTjXhEcwn9q3ImzW2W8RWa2psm3k-bs_SX2MayU06dY/edit?usp=sharing

- At first clone my GitHub repo. then install all the packages.
- To install all the packages. go to the terminal and command

npm
npm i

- After Installing all the packages. run npm run start:dev to start the server.

npm
npm run start:dev

## 1. User Registration

- Create a Course Endpoint: _POST /api/auth/register_

## 2. User Login

- User Login Endpoint: _POST /api/auth/login_

## 3. Change Password

- Change Password Endpoint: _POST /api/auth/change-password_

## 4. Create a Course (Only Admin can do this)

- Create a Course Endpoint: _POST /api/courses_

## 5. Get Paginated and Filtered Courses.

- Get a Course Endpoint: _GET /api/courses_
- Query Parameters for API Requests Example: _GET ?page=2,?limit=10,title, price, startDate, endDate, language, durationInWeeks,?sortBy=startDate,?sortOrder=desc,?minPrice=20.00&maxPrice=50.00,?tags=Programming,?startDate=2023-01-01&endDate=2023-12-31,?language=English,?provider=Tech Academy,?durationInWeeks=8,?level=Intermediate_

## 6. Create a Category (Only Admin can do this)

- Create a Category: _POST /api/categories_

## 7. Get All Categories

- Get All Categories: _GET /api/categories_

## 8. Create a Review (Only the user can do this)

- Create a Review Endpoint: _POST /api/reviews_

## 9. Update a Course (Only Admin can do this)

- Update a Course (Partial Update with Dynamic Update) Endpoint: _PUT /api/courses/:courseId_

## 10. Get Course by ID with Reviews

- Get Course by ID with Reviews Endpoint: _GET /api/courses/:courseId/reviews_

## 11. Get the Best Course Based on Average Review (Rating)

- Get the Best Course Based on Average Review (Rating) Endpoint: _GET /api/course/best_
