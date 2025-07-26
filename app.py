from flask import Flask, render_template, request, redirect, url_for, flash, session, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'serelix-ai-secret-key-2024')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///serelix.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

# User Model
class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password_hash = db.Column(db.String(200), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    company = db.Column(db.String(100))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    is_admin = db.Column(db.Boolean, default=False)

# Client Model for CRM
class Client(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    company = db.Column(db.String(100))
    phone = db.Column(db.String(20))
    status = db.Column(db.String(20), default='lead')
    notes = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

# Routes
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        
        user = User.query.filter_by(email=email).first()
        
        if user and check_password_hash(user.password_hash, password):
            login_user(user)
            return redirect(url_for('dashboard'))
        else:
            flash('Invalid email or password')
    
    return render_template('login.html')

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        name = request.form['name']
        company = request.form.get('company', '')
        
        if User.query.filter_by(email=email).first():
            flash('Email already exists')
            return render_template('register.html')
        
        user = User(
            email=email,
            password_hash=generate_password_hash(password),
            name=name,
            company=company
        )
        
        db.session.add(user)
        db.session.commit()
        
        login_user(user)
        return redirect(url_for('dashboard'))
    
    return render_template('register.html')

@app.route('/dashboard')
@login_required
def dashboard():
    clients = Client.query.filter_by(user_id=current_user.id).all()
    total_clients = len(clients)
    leads = len([c for c in clients if c.status == 'lead'])
    active = len([c for c in clients if c.status == 'active'])
    
    return render_template('dashboard.html', 
                         clients=clients,
                         total_clients=total_clients,
                         leads=leads,
                         active=active)

@app.route('/clients')
@login_required
def clients():
    clients = Client.query.filter_by(user_id=current_user.id).all()
    return render_template('clients.html', clients=clients)

@app.route('/add_client', methods=['POST'])
@login_required
def add_client():
    data = request.get_json()
    
    client = Client(
        name=data['name'],
        email=data['email'],
        company=data.get('company', ''),
        phone=data.get('phone', ''),
        status=data.get('status', 'lead'),
        notes=data.get('notes', ''),
        user_id=current_user.id
    )
    
    db.session.add(client)
    db.session.commit()
    
    return jsonify({'success': True})

@app.route('/update_client/<int:client_id>', methods=['PUT'])
@login_required
def update_client(client_id):
    client = Client.query.get_or_404(client_id)
    if client.user_id != current_user.id:
        return jsonify({'error': 'Unauthorized'}), 403
    
    data = request.get_json()
    client.name = data.get('name', client.name)
    client.email = data.get('email', client.email)
    client.company = data.get('company', client.company)
    client.phone = data.get('phone', client.phone)
    client.status = data.get('status', client.status)
    client.notes = data.get('notes', client.notes)
    
    db.session.commit()
    return jsonify({'success': True})

@app.route('/delete_client/<int:client_id>', methods=['DELETE'])
@login_required
def delete_client(client_id):
    client = Client.query.get_or_404(client_id)
    if client.user_id != current_user.id:
        return jsonify({'error': 'Unauthorized'}), 403
    
    db.session.delete(client)
    db.session.commit()
    return jsonify({'success': True})

@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('index'))

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True, host='0.0.0.0', port=5000)