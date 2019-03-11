#https://towardsdatascience.com/pca-using-python-scikit-learn-e653f8989e60

import pandas as pd
from matplotlib import pyplot as plt
from sklearn import manifold
from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA
import numpy as np
from scipy.spatial import distance_matrix

DB_PATH = "../static/data/terrorism-small.csv"

def action(year=0, nation=[]):

    # load dataset into Pandas DataFrame
    df = pd.read_csv(DB_PATH)
    data = None

    # filtro i dati
    if year != 0 and nation:  # sono stati selezionati sia anno che nazione
        # https://cmdlinetips.com/2018/02/how-to-subset-pandas-dataframe-based-on-values-of-a-column/
        data = df[(df.iyear == year) & (df.country_txt.isin(nation))]
    elif year != 0:  # solo anno selezionato
        data = df[(df.iyear == year)]
    elif nation:  # solo nazione selezionata
        data = df[df.country_txt.isin(nation)]
    else:  # niente selezione, uso tutto il db (default)
        data = df

    features = ["iyear", "nperps", "nkill", "nwound"]
    # Separating out the features
    x = data.loc[:, features].values
    # Separating out the target
    y = data.loc[ :, ['region'] ].values
    # Standardizing the features
    x = StandardScaler().fit_transform(x)

    pca = PCA(n_components=2)
    principalComponents = pca.fit_transform(x)
    principalDf = pd.DataFrame(
        data=principalComponents, columns=['x', 'y'])
    finalDf = pd.concat([principalDf, df[['region']]], axis=1)
    finalDf.to_csv("../static/data/pca.csv", sep=',', index=False)
    
    return 0;

if __name__ == "__main__":
    action()
