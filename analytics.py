import pandas as pd
import numpy as np
import csv, sys, json

DB_PATH = "static/data/terrorism.csv"

def createBarchartData(year=0, country=[]):
    '''
    select year, imonth, weaptype1, weapdetail, country_txt, sum(nkill) 
    from terrorism
    where year = 2011
    group by year, imonth, weaptype1, country_txt
    '''
    
    data = pd.read_csv(DB_PATH)
    s = None
    select = ['year', 'imonth', 'weaptype1', 'weapdetail', 'country_txt', 'nkill']
    groupby = ['year', 'imonth', 'weaptype1']
    groupby_with_country = ['year', 'imonth', 'weaptype1', 'country_txt']

    # filtro i dati
    if year != 0 and country:  # sono stati selezionati sia anno che nazione
        s = data[(data.year == year) & (data.country_txt.isin(country))][select].groupby(groupby_with_country)['nkill'].sum()
    elif year != 0:  # solo anno selezionato
        s = data[data.year == year][select].groupby(
            groupby)['nkill'].sum()
    elif country:  # solo nazione selezionata
        s = data[data.country_txt.isin(country)][select].groupby(
            groupby_with_country)['nkill'].sum()
    else:  # niente selezione, uso tutto il db (default)
        s = data[select].groupby(groupby)['nkill'].sum()

    s.to_csv("static/data/barchart_data.csv", sep=',', header=True)

    pass 


# createBarchartData(2011, ['United States', 'Italy'])
# createBarchartData()
