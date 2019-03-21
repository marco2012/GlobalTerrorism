import pandas as pd
import numpy as np
import csv, sys, json

DB_PATH = "static/data/terrorism.csv"

def createMapData(year=0):

    '''
    SE NON VIENE SELEZIONATO L'ANNO:
    
    select year, country_txt, sum(nkill) 
    from terrorism
    group by country_txt

    SE VIENE SELEZIONATO L'ANNO:

    select year, country_txt, sum(nkill) 
    from terrorism
    group by year, country_txt
    '''

    data = pd.read_csv(DB_PATH)
    s = None
    select = ['year', 'country_txt', 'nkill']
    groupby = ['country_txt']
    groupby_with_year = ['country_txt', 'year']

    if year != 0:  # viene selezionato l'anno, sommo vittime per ognki naione in quell'anno 
        s = data[(data.year == year)][select].groupby(groupby_with_year)['nkill'].sum()
    else:  # non viene selezionato l'anno, sommo tutte le vittime per ogni nazione 
        s = data[select].groupby(groupby)['nkill'].sum()

    s.to_csv("static/data/terrorism_map.csv", sep=',', header=True)

    pass 


# createMapData()