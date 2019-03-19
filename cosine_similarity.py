import pandas as pd
from scipy import spatial

DB_PATH = "static/data/terrorism-small.csv"

def action(v, n_elems=5): # v = [d.eventid, d.attacktype1, d.nperps, d.nkill, d.nwound]
    data = pd.read_csv(DB_PATH,
                       usecols=['eventid','attacktype1', 'nperps', 'nkill', 'nwound'])
    array = data.values

    #dictionary key = event_id; value = similitudine
    d = {}
    for i in array:
        s = 1 - spatial.distance.cosine(v, i[1:])
        d[ i[0] ] = s

    #sorted by descending value
    sorted_d = dict( sorted(d.items(), key=lambda x: x[1], reverse=True)[:n_elems] )
    keys = sorted_d.keys()
    values = sorted_d.values()

    data = pd.read_csv(DB_PATH)
    s = pd.DataFrame( data[data.eventid.isin(keys)] ) # n_elems eventi piu simili a quello dato (v)

    print(s)
    print(sorted_d)
    print(values)

    # s['spacial_distance'] = 0.0 ; #DA SISTEMARE

    s.to_csv("static/data/cosine_similarity_data.csv", sep=',', header=True)

    pass

# action([3, 1, 588, 316],5)
