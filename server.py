from flask import Flask, render_template, send_from_directory, request, jsonify
import sys, json, pca, analytics, cosine_similarity

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
    year = int(var[0])
    country = json.loads(var[1])
    analytics.createBarchartData(year=year, country=country)
    return jsonify(True)


@app.route("/cosine_similarity")
def try2():
    var = request.args.to_dict()["compute_cosine_similarity"].split(';')
    year = int(var[0])
    array = json.loads(var[1])
    cosine_similarity.action(v=array, n_elems=6)
    return jsonify(True)


@app.route("/pca")
def try3():
    var = request.args.to_dict()["computePCA"].strip()
    year = int(var)
    pca.action(year=year)
    return jsonify(True)


#calculate PCA
pca.action(year=2017)

#calculate barchart
analytics.createBarchartData(year=2011) #CAMBIARE ANNO A 0

#start server
app.config["DEBUG"]=True
app.config["TEMPLATES_AUTO_RELOAD"]=True
app.run(debug=True, port=5000)
