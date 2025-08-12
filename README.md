# ToDo Frontend

A modern and responsive React + Bootstrap 5 frontend for your ToDo app.

---
## Documentation

- **Live Project**: [https://prioritypoint.netlify.app](https://prioritypoint.netlify.app)

### **Base URL**
- Development: `http://localhost:5173`
- Production: `https://your-backend-domain.com`

## Features

- User registration and login
- Create, edit, delete, and mark tasks as complete/incomplete
- Filter tasks by status and priority
- Sort tasks by due date, priority, or creation date
- Animated UI feedback (optional: party-js confetti)
- JWT token authentication with backend
- Clean Bootstrap 5 components and layout

---
## Repository

**Frontend Repository**: https://github.com/ThePremkumar/todo-frontend.git  
**Backend Repository**: https://github.com/ThePremkumar/todo-backend.git

*Note: Frontend and backend are maintained in separate repositories for independent deployment to different hosting providers.*

---
## Prerequisites

- [Node.js](https://nodejs.org/) (v16 or newer recommended)
- The backend API (see below) running locally (default: `http://localhost:7001`)

---

## Getting Started

1. **Clone the repo and switch into the frontend folder:**
    ```sh
    git clone https://github.com/ThePremkumar/todo-frontend.git
    ```

2. **Install dependencies:**
    ```sh
    npm install
    ```

3. **Start the development server:**
    ```sh
    npm run dev
    ```
   By default, your app will be visible at [http://localhost:5173](http://localhost:5173).

4. **Configure API endpoints (if needed):**
   - This frontend expects the backend API at: `http://localhost:7001`
   - If you deploy elsewhere, update the API URLs in `src/contexts/AuthContext.jsx` and `src/contexts/TaskContext.jsx` accordingly.

---

## Available Scripts

- `npm run dev` — start development server
- `npm run build` — bundle for production
- `npm run preview` — locally preview your production build

---

## Folder Structure

```
frontend/
├── src/
│   ├── components/
│   ├── contexts/
│   ├── App.jsx
│   └── main.jsx
├── index.html
└── ...
```

---

## Environment

- By default, **no `.env` file is needed for the frontend** unless you want to use Vite's environment variables for advanced API endpoint configuration. You can set `VITE_API_URL` and reference that in your code.

---

## Tech Stack

- [React](https://reactjs.org/)
- [Bootstrap 5](https://getbootstrap.com/)
- [Vite](https://vitejs.dev/)
- [party-js](https://party.js.org/) (optional for effects)
- [lucide-react](https://lucide.dev/) (icon library)

---

## Usage Flow

1. **Register** a new user or **log in** with your credentials.
2. **Create new tasks** with title, description, due date, priority.
3. **Edit, delete, or mark tasks as completed.**
4. **Filter or search** your tasks as you work.

---

## Connecting to the Backend

- This frontend expects the backend to provide:
    - JWT-based authentication (`/api/auth/register`, `/api/auth/login`)
    - Task CRUD endpoints at `/api/tasks`
- After login/register, the frontend stores the JWT token in localStorage and includes it in requests.

---

## Examples

### **How does the frontend connect to the backend?**

**Example fetch call:**
```js
await fetch('http://localhost:7001/api/tasks', {
  headers: { 'x-auth-token': localStorage.getItem('token') }
});
```

### **Sample task object structure:**
```js
{
  id: "1",
  title: "Complete project documentation",
  description: "Write comprehensive README and API docs",
  priority: "high",
  completed: false,
  dueDate: "2025-08-15T10:00:00Z",
  createdAt: "2025-08-12T08:30:00Z"
}
```

---

## API Endpoints Expected

The frontend expects these backend endpoints:

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/verify` - Verify JWT token

### Tasks
- `GET /api/tasks` - Get all user tasks
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update existing task
- `DELETE /api/tasks/:id` - Delete task

---

## Development

### Adding new components:
1. Create component file in `src/components/`
2. Use Bootstrap classes for styling
3. Import and use in `App.jsx`

### State management:
- Authentication state managed via `AuthContext`
- Task state managed via `TaskContext`
- Local component state for UI interactions

---

## Deployment

1. **Build for production:**
   ```sh
   npm run build
   ```

2. **Deploy the `dist/` folder** to your hosting service of choice:
   - Netlify
   - Vercel
   - GitHub Pages
   - Traditional web hosting

3. **Update API URLs** in production:
   - Set `VITE_API_URL` environment variable
   - Or update hardcoded URLs in context files

---

## Troubleshooting

**Cannot connect to backend:**
- Ensure backend is running on `http://localhost:7001`
- Check CORS settings on backend
- Verify API endpoint paths match

**Authentication issues:**
- Clear localStorage: `localStorage.clear()`
- Check JWT token format and expiration
- Verify backend authentication middleware

**Build fails:**
- Clear node_modules: `rm -rf node_modules && npm install`
- Check for syntax errors
- Ensure all dependencies are installed

---

## Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit pull request

---

## License

This project is licensed under the MIT License.

---

## Support

For questions or issues:
- Open an issue on GitHub
- Check existing documentation
- Contact the development team

---

**Happy coding! 🚀**