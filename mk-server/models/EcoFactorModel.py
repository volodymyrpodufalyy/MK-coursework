from marshmallow import validate, fields, post_load
from flask_marshmallow import Marshmallow
from flask_sqlalchemy import SQLAlchemy

# Init db
db = SQLAlchemy()

# Init ma
ma = Marshmallow()


# Product Model
class EcoFactor(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True)
    value = db.Column(db.String(100))
    time = db.Column(db.DateTime)

    def __init__(self, name, value, time):
        self.name = name
        self.value = value
        self.time = time


# ecofactor Schema
class EcoFactorSchema(ma.Schema):
    id = fields.Int(validate=validate.Range(min=1, max=999))
    name = fields.Str(validate=validate.Length(min=1, max=15))
    value = fields.Str(validate=validate.Length(min=1, max=15))

    @post_load
    def make_technique(self, data, **kwargs):
        return EcoFactor(**data)


ecofactor_schema = EcoFactorSchema()
ecofactors_schema = EcoFactorSchema(many=True)
