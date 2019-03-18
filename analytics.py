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
            ['year', 'imonth', 'weaptype1'])['nkill'].sum().to_frame().sort_values('imonth')
    else:
        s = data[data.year == year][['year', 'imonth', 'weaptype1', 'nkill']].groupby(
            ['year', 'imonth', 'weaptype1'])['nkill'].sum().to_frame().sort_values('imonth')

    s.to_csv("static/data/barchart_data.csv", sep=',', header=True)

    pass 

