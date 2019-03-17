import pandas as pd
import numpy as np
import csv, sys, json

DB_PATH = "static/data/terrorism.csv"

def createBarchartData(year=0):
    '''
    select year, imonth, weaptype1, count(nkill) from terrorism
    where year = 2017
    group by year, imonth, weaptype1
    order by year desc
    '''
    data = pd.read_csv(DB_PATH)
    s = None
    if year == 0:  # filtro per anno
        s = data[['year', 'imonth', 'weaptype1', 'nkill']].groupby(
            ['year', 'imonth', 'weaptype1'])['nkill'].sum().to_frame().sort_values('weaptype1')
    else:
        s = data[data.year == year][['year', 'imonth', 'weaptype1', 'nkill']].groupby(
            ['year', 'imonth', 'weaptype1'])['nkill'].sum().to_frame().sort_values('weaptype1')

    s.to_csv("static/data/barchart_data.csv", sep=',', header=True)

    pass 


# def csv2json():
#   csv_filename = 'static/data/barchart_data.csv'
#   fieldnames = ["year", "imonth", "weaptype1", "nkill"]
#   f = open(csv_filename, 'r')
#   csv_reader = csv.DictReader(f, fieldnames)
#   json_filename = "barchart_data.json"
#   print ("Saving JSON to file: ", json_filename)
#   jsonf = open(json_filename, 'w')
#   data = json.dumps([r for r in csv_reader])
#   jsonf.write(data)
#   f.close()
#   jsonf.close()

# createBarchartData(2017)
