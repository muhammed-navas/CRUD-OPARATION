from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from app.config import Config

db = SQLAlchemy()
migrate = Migrate()
cors = CORS()

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)  
    
    db.init_app(app)
    migrate.init_app(app, db)
    cors.init_app(app)
    
    from app.routes.todos import todos_bp
    app.register_blueprint(todos_bp, url_prefix='/api')
    
# This file is required to make the app directory a package.```    
    return app