from flask import Flask, render_template, send_from_directory, request, jsonify
# from scipy.spatial import distance_matrix
# import matplotlib.pyplot as plt
# from sklearn import manifold
# import numpy as np
# import pandas as pd
import sys, pca

app = Flask(__name__, static_folder='/static');

@app.route("/")
def index():
    return render_template("index.html")


@app.route('/<path:path>')
def send_js(path):
    return send_from_directory('static', path)


#calculate PCA
pca.action()

#start server
app.config["DEBUG"]=True
app.config["TEMPLATES_AUTO_RELOAD"]=True
app.run(debug=True, port=5000)
