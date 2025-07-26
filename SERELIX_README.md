# Serelix AI - AI Consultancy Website

A fully functional website for Serelix AI consultancy with Flask backend, secure authentication, and CRM dashboard.

## Color Scheme

### Primary Colors
- **Deep Blue**: `#1E40AF` - Main brand color
- **Vibrant Purple**: `#7C3AED` - Secondary brand color  
- **Bright Cyan**: `#06B6D4` - Accent color

### Secondary Colors
- **Indigo**: `#4F46E5` - Interactive elements
- **Teal**: `#0D9488` - Success states
- **Violet**: `#8B5CF6` - Highlights

### Neutral Colors
- **Gray Scale**: `#F9FAFB` to `#111827` - Text and backgrounds

### Status Colors
- **Success Green**: `#10B981`
- **Warning Yellow**: `#F59E0B` 
- **Error Red**: `#EF4444`
- **Info Blue**: `#3B82F6`

## Features

### Frontend
- ✅ Modern responsive design with animations
- ✅ Interactive homepage with hero section
- ✅ Service showcase with hover effects
- ✅ Contact form with validation
- ✅ Mobile-friendly navigation
- ✅ Smooth scrolling and parallax effects

### Authentication
- ✅ Secure user registration and login
- ✅ Password hashing with bcrypt
- ✅ Session management with Flask-Login
- ✅ Form validation and error handling

### CRM Dashboard
- ✅ Client management system
- ✅ Add, edit, delete clients
- ✅ Client status tracking (Lead, Prospect, Active, Inactive)
- ✅ Search and filter functionality
- ✅ Dashboard analytics and metrics
- ✅ Responsive design for all devices

### Backend Security
- ✅ SQL injection protection with SQLAlchemy
- ✅ CSRF protection
- ✅ Secure password storage
- ✅ Session security
- ✅ Input validation and sanitization

## Installation & Setup

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd serelix-ai-website
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env and add your secret key
   ```

5. **Initialize database**
   ```bash
   python app.py
   # Database will be created automatically on first run
   ```

6. **Run the application**
   ```bash
   python app.py
   ```

Visit `http://localhost:5000` to view the website.

### Replit Deployment

1. **Create new Replit project**
   - Upload all project files to Replit
   - Ensure the main file is named `app.py`

2. **Install dependencies**
   ```bash
   pip install flask flask-sqlalchemy flask-login werkzeug bcrypt python-dotenv
   ```

3. **Set environment variables**
   - Go to Secrets tab in Replit
   - Add `SECRET_KEY` with a random string value

4. **Run the application**
   ```bash
   python app.py
   ```

## File Structure

```
serelix-ai-website/
├── app.py                 # Main Flask application
├── requirements.txt       # Python dependencies
├── .env.example          # Environment variables template
├── templates/            # HTML templates
│   ├── base.html        # Base template
│   ├── index.html       # Homepage
│   ├── login.html       # Login page
│   ├── register.html    # Registration page
│   ├── dashboard.html   # Dashboard overview
│   └── clients.html     # Client management
├── static/              # Static assets
│   ├── css/
│   │   └── style.css    # Main stylesheet
│   ├── js/
│   │   └── main.js      # JavaScript interactions
│   └── images/          # Image assets
└── serelix.db           # SQLite database (created automatically)
```

## API Routes

### Authentication
- `GET/POST /login` - User login
- `GET/POST /register` - User registration  
- `GET /logout` - User logout

### Dashboard
- `GET /dashboard` - Dashboard overview
- `GET /clients` - Client management page

### Client Management API
- `POST /add_client` - Add new client
- `PUT /update_client/<id>` - Update client
- `DELETE /delete_client/<id>` - Delete client

## Database Models

### User Model
- `id` - Primary key
- `email` - Unique email address
- `password_hash` - Hashed password
- `name` - Full name
- `company` - Company name (optional)
- `created_at` - Registration timestamp
- `is_admin` - Admin flag

### Client Model
- `id` - Primary key
- `name` - Client name
- `email` - Client email
- `company` - Client company (optional)
- `phone` - Phone number (optional)
- `status` - Client status (lead/prospect/active/inactive)
- `notes` - Additional notes
- `created_at` - Creation timestamp
- `user_id` - Foreign key to User

## Security Features

1. **Password Security**
   - Bcrypt hashing with salt
   - Minimum 8 character requirement
   - Password strength validation

2. **Session Security**
   - Secure session cookies
   - Session expiration
   - CSRF protection

3. **Input Validation**
   - Form validation on frontend and backend
   - SQL injection protection via SQLAlchemy
   - XSS prevention through template escaping

4. **Database Security**
   - Parameterized queries
   - User isolation (users can only access their own data)
   - Foreign key constraints

## Customization

### Colors
All colors are defined as CSS custom properties in `style.css`. Update the `:root` section to change the color scheme.

### Content
- Edit HTML templates in the `templates/` directory
- Update company information in `base.html`
- Modify service descriptions in `index.html`

### Styling
- Main styles are in `static/css/style.css`
- Component-specific styles are organized by section
- Responsive breakpoints are defined for mobile devices

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Performance

- Optimized CSS with minimal external dependencies
- Compressed images and assets
- Efficient database queries
- Client-side form validation
- Lazy loading for animations

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support or questions, contact: hello@serelix.ai