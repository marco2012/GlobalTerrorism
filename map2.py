import pandas as pd
import csv, sys, json

DB_PATH = "static/data/terrorism.csv"
COUNTRIES_CODES = "static/data/countries_codes.csv"

def createMapData(year=0, weaptype=[]):

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

    if year!=0 and weaptype:
         s = data[(data.year == year) & (data.weaptype1_txt.isin(weaptype))][select].groupby(groupby)['nkill'].sum()
    elif year != 0:  # viene selezionato l'anno, sommo vittime per ognki nazione in quell'anno
        s = data[(data.year == year)][select].groupby(groupby)['nkill'].sum()
    elif weaptype:
         s = data[(data.weaptype1_txt.isin(weaptype))][select].groupby(groupby)['nkill'].sum()
    else:  # non viene selezionato l'anno, sommo tutte le vittime per ogni nazione 
        s = data[select].groupby(groupby)['nkill'].sum()
    
    # add country codes
    counties_dictionary = createCountriesDict()
    
    s = pd.DataFrame(s)
    for i, row in s.iterrows():
        if row.name in counties_dictionary:
            s.at[i, 'country_code'] = counties_dictionary[row.name]

    s.to_csv("static/data/terrorism_map.csv", sep=',', header=True)

    pass 


def createCountriesDict():
    countries = pd.read_csv(COUNTRIES_CODES)
    countries_array = countries[['code', 'country_name']].values
    counties_dictionary = {}
    for i in countries_array:
            country_name = i[0]
            country_code = i[1]
            counties_dictionary[country_code] = country_name
    return counties_dictionary


# createMapData(2011)
