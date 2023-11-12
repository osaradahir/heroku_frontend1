from flask import Flask
from flask import render_template

app = Flask(__name__)

@app.route("/")
def index():
    message = "Hello, World"
    return render_template('index.html', message=message)

@app.route("/buscar")
def buscar():
    return render_template('buscar.html')

@app.route("/prueba")
def prueba():
    return render_template('prueba.html')

@app.route("/ver")
def ver():
    return render_template('ver.html')

@app.route("/insertar")
def insertar():
    return render_template('insertar.html')

@app.route("/actualizar")
def actualizar():
    return render_template('actualizar.html')

@app.route("/borrar")
def borrar():
    return render_template('borrar.html')
