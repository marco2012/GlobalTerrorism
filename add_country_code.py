# Add in the DB a column with the country code of the corresponding row

import pandas as pd

attacks = pd.read_csv("static/data/terrorism.csv")
countries = pd.read_csv("static/data/country_codes.csv")

#read database columns i want, including eventid to match later and convert to array
attacks_array = attacks[['eventid', 'country_txt', 'nkill']].values
countries_array = countries[['Country_Name', 'Three_Letter_Country_Code']].values

d={}
for i in countries_array:
        country_name = i[0].split(',')[0]
        country_code = i[1]
        d[country_name] = country_code

for i, row in attacks.iterrows():
    if row.country_txt in d:
        attacks.at[i, 'country_code'] = d[row.country_txt]

attacks.to_csv("static/data/terrorism_country_code.csv", sep=',', header=True)
