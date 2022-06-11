from flask import Flask, request, jsonify
from models.EcoFactorModel import db, ma, EcoFactor, ecofactor_schema, ecofactors_schema
# from controllers import EcoFactorController

# Init app
app = Flask(__name__)

# Init ma
ma.init_app(app)

# Database config
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:13247sqlre4lly@localhost/ecofactors'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = 'false'

# Init db
db.init_app(app)




