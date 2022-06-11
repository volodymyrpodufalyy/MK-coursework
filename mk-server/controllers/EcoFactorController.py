from flask import request, jsonify, abort
from app import app
from marshmallow import ValidationError
from models.EcoFactorModel import db, EcoFactor, ecofactor_schema, ecofactors_schema


@app.errorhandler(404)
def ecofactor_not_found(e):
    return '<h1>404 Not Found<h1>\n<p>Resource you requested does not exist.</p>', 404


@app.route('/ecofactor', methods=['POST'])
def add_product():
    try:
        new_product = ecofactor_schema.load(request.json)
        db.session.add(new_product)
    except ValidationError as err:
        abort(400, err)

    db.session.commit()

    return ecofactors_schema.jsonify(request.json)


@app.route('/ecofactors', methods=['GET'])
def get_products():
    all_products = EcoFactor.query.all()
    result = ecofactors_schema.dump(all_products)
    return jsonify(result)


@app.route('/ecofactor/<id>', methods=['GET'])
def get_product(id):
    product = EcoFactor.query.get(id)
    if product is None:
        abort(404)
    return ecofactor_schema.jsonify(product)


@app.route('/ecofactor/<id>', methods=['PUT'])
def update_product(id):
    product = EcoFactor.query.get(id)
    if product is None:
        abort(404)
    name = request.json['name']
    description = request.json['description']
    price = request.json['price']
    quantity = request.json['quantity']

    product.name = name
    product.description = description
    product.price = price
    product.quantity = quantity

    db.session.commit()

    return ecofactor_schema.jsonify(product)


@app.route('/ecofactor/<id>', methods=['DELETE'])
def delete_product(id):
    product = EcoFactor.query.get(id)
    if product is None:
        abort(404)
    db.session.delete(product)
    db.session.commit()

    return ecofactor_schema.jsonify(product)
