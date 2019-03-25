#https://towardsdatascience.com/pca-using-python-scikit-learn-e653f8989e60

import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA

DB_PATH = "static/data/terrorism.csv"

def action(year=0, nation=[], weaptype=[]):

    df = pd.read_csv(DB_PATH)
    data = df

    # filtro i dati
    if year != 0:
        data = df[(df.year == year)]

    if nation:
         data = df[df.country_txt.isin(nation)]

    if weaptype:
        data = df[df.weaptype1_txt.isin(weaptype)]

    features = ["year", "nperps", "nkill", "nwound", "eventid", "extended"]
    columns_to_take = ['region', 'nkill', 'success',
                                          'attacktype1_txt', 'country_txt', 'city', "summary"]

    # Separating out the features
    x = data.loc[:, features].values

    # Standardizing the features
    x = StandardScaler(with_mean=True, with_std=True).fit_transform(x)

    pca = PCA(n_components=2)
    principalComponents = pca.fit_transform(x)
    principalDf = pd.DataFrame(
        data=principalComponents, columns=['x', 'y'])
    finalDf = pd.concat([principalDf, df[columns_to_take]], axis=1)
    
    finalDf.to_csv("static/data/pca.csv", sep=',', index=False)
    
    return 0


action(2011, ["Italy"])
