import os

import pandas as pd
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, inspect

from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

#################################################
# Database Setup
#################################################

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db/time.sqlite"
db = SQLAlchemy(app)

class ForMap(db.Model):
    __tablename__ = 'forMapOne'
    name = db.Column('name', db.String(300), primary_key=True)
    city = db.Column('City', db.String(300))
    state = db.Column('State',db.String(300))
    image = db.Column('image',db.String(300))
    lat = db.Column('Lat',db.Float)
    lng = db.Column('Lng',db.Float)

    # def __repr__(self):
    #     return '<User %r>' % self.username
@app.route("/relationships")
def index1():
    return render_template("relationships.html")

@app.route("/map")
def map():
    return render_template("map.html")


@app.route("/")
def index():
    # console.log("homepage")
    """Return the homepage."""
    return render_template("indexPro3.html")

@app.route("/metadata/<sample>")
def sample_metadata(sample):
    # Create a dictionary entry for each row of metadata information
    df= pd.read_csv('./project3/meta2.csv', encoding='utf-8')
    d= df[df['decade']==sample]
    sample_metadata = {

        "fact1": d["fact1"].values.tolist(),
        "fact2": d["fact2"].values.tolist(),
        "fact3": d["fact3"].values.tolist(),
        "fact4": d["fact4"].values.tolist(),
        "fact5": d["fact5"].values.tolist(),
        "fact6": d["fact6"].values.tolist(),
        "fact7": d["fact7"].values.tolist(),
        "fact8": d["fact8"].values.tolist()
        
    }
    print(sample_metadata)
    return jsonify(sample_metadata)
 

@app.route("/<sample>")
def cover_people(sample):
    print(os.getcwd())
    df= pd.read_csv('./project3/decade_47yrs.csv', encoding='utf-8')
    if (sample=='overall'):
        d=df['name'].value_counts().to_frame(name="count") 
    else:
        d=df[df['decade']==sample]['name'].value_counts().to_frame(name="count") 
    d['name']=d.index
    d = d.reset_index(drop=True)

    # Format the data for Plotly
    data = {
        "name" : d["name"].values.tolist(),
        "count": d["count"].values.tolist()
    }
    return jsonify(data)


@app.route("/mapOne")
def mapOne():
    """Return the data for a row."""

    sel = [
        ForMap.name,
        ForMap.city,
        ForMap.state,
        ForMap.image,
        ForMap.lat,
        ForMap.lng,
    ]

    results = db.session.query(*sel).all()
        # match = re.sub(r'\([^)]*\)', '',results[n]["image"])
   

    # Create a dictionary entry for each row of metadata information
    mapData = []
    
    # print(results)
    for result in results:
        datum = {}
        datum["name"] = result[0]
        datum["location"] = "{}, {}".format(result[1], result[2])

        datum["image"] = result[3]
        datum["coordinates"] = [result[4], result[5]] # "{}, {}".format(result[4], result[5])
        mapData.append(datum)


    print(mapData)
    return jsonify(mapData)



if __name__ == '__main__':
    app.run(debug=True)
