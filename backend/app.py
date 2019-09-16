from typing import Tuple

from flask import Flask, jsonify, request, Response
import mockdb.mockdb_interface as db
import json

app = Flask(__name__)


def create_response(
    data: dict = None, status: int = 200, message: str = ""
) -> Tuple[Response, int]:
    """Wraps response in a consistent format throughout the API.
    
    Format inspired by https://medium.com/@shazow/how-i-design-json-api-responses-71900f00f2db
    Modifications included:
    - make success a boolean since there's only 2 values
    - make message a single string since we will only use one message per response
    IMPORTANT: data must be a dictionary where:
    - the key is the name of the type of data
    - the value is the data itself

    :param data <str> optional data
    :param status <int> optional status code, defaults to 200
    :param message <str> optional message
    :returns tuple of Flask Response and int, which is what flask expects for a response
    """
    if type(data) is not dict and data is not None:
        raise TypeError("Data should be a dictionary 😞")

    response = {
        "code": status,
        "success": 200 <= status < 300,
        "message": message,
        "result": data,
    }
    return jsonify(response), status


"""
~~~~~~~~~~~~ API ~~~~~~~~~~~~
"""


@app.route("/")
def hello_world():
    return create_response({"content": "hello world!"})


@app.route("/mirror/<name>")
def mirror(name):
    data = {"name": name}
    return create_response(data)

@app.route("/shows/<id>", methods=['DELETE'])
def delete_show(id):
    if db.getById('contacts', int(id)) is None:
        return create_response(status=404, message="No contact with this id exists")
    db.deleteById('contacts', int(id))
    return create_response(message="Contact deleted")


# TODO: Implement the rest of the API here!
@app.route("/contacts/<id>", methods=['GET'])
def get_contacts_for_id(id):
    print("I am ashwin" + id)
    if db.getById('contacts', int(id)) is None:
        return create_response(status=404, message="No contact with this id exists")
    # Handle 404. Do db.getById first, check if it's null, if it is do a 404.
    return create_response({"contacts": db.getById('contacts', int(id))})

@app.route("/contacts", methods=['GET'])
def get_all_contacts():
    hobby = request.args.get('hobby')
    if hobby is None:
        return create_response({"contacts": db.get('contacts')}) 
    data = db.getByHobby('contacts', hobby) 
    if data is None:
        return create_response(status=404, message="No contact with this hobby exists")
    return create_response({"contacts": data})

@app.route("/contacts", methods=['POST'])
def add_contact():
    contact = json.loads(request.data)
    count = 0
    errorMessage = ""
    if "name" not in contact:
        count += 1
        errorMessage += "Name, "
    
    if "nickname" not in contact:
        count += 1
        errorMessage += " Nickname,"
    
    if "hobby" not in contact:
        count += 1
        errorMessage += " Hobby,"
    
    if count == 0:
        return create_response(status=201, data={"contacts": db.create('contacts', contact)})
    else:
        errorMessage = errorMessage[:-1]
    return create_response(status=422, message=count + " parameter(s) missing for contact creation. Please include the following missing parameters: " + errorMessage)

@app.route("/contacts/<id>", methods=['PUT'])
def update_name_hobby_contact(id):
    update = json.loads(request.data)
    if db.getById("contacts", int(id)) is None:
        return create_response(status=404, message="No contact with this id exists")

    count = 0
    if "name" not in update:
        count += 1
    
    if "hobby" not in update:
        count += 1
    
    if count <= 1:
        return create_response(status=201, data={"contacts": db.updateById("contacts", int(id), update)})
    return create_response({"contacts": db.getById('contacts', int(id))})
"""
~~~~~~~~~~~~ END API ~~~~~~~~~~~~
"""
if __name__ == "__main__":
    app.run(port=8080, debug=True)
