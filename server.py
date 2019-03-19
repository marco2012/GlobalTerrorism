from flask import Flask, render_template, send_from_directory, request, jsonify
# from scipy.spatial import distance_matrix
# import matplotlib.pyplot as plt
# from sklearn import manifold
# import numpy as np
# import pandas as pd
import sys, json, pca, analytics

app = Flask(__name__, static_folder='/static')

@app.route("/")
def index():
    return render_template("index.html")


@app.route('/<path:path>')
def send_js(path):
    return send_from_directory('static', path)


@app.route("/analytic")
def try1():
    var = request.args.to_dict()["computeBarchart"].split(';')
    print("mao1 {}".format(var))
    year = int(var[0])
    country = json.loads(var[1])
    print("mao2 {}{}".format(year,country))
    analytics.createBarchartData(year=year, country=country)
    return jsonify(True)

@app.route("/pca")
def try2():
    var = request.args.to_dict()["computePCA"].strip()
    year = int(var)
    pca.action(year=year)
    return jsonify(True)


#calculate PCA
pca.action(year=0)

#calculate barchart
analytics.createBarchartData(year=2011) #CAMBIARE ANNO A 0

#start server
app.config["DEBUG"]=True
app.config["TEMPLATES_AUTO_RELOAD"]=True
app.run(debug=True, port=5000)
