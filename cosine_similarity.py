# this function calculates cosine similarity between chosen attack and all other attacks in the database to determine the top 5 most similar attacks to che chosen one

import pandas as pd
from scipy import spatial

DB_PATH = "static/data/terrorism.csv"

def action(v, year=0, n_elems=5, take_only_similar_attacks=True):
    # v = [d.eventid, d.attacktype1, d.nperps, d.nkill, d.nwound]

    #read database
    data = pd.read_csv(DB_PATH)

    #take chosen attack
    chosen_attack = data[(data.eventid == v[0])]

    #take chosen attack type
    chosen_attack_type = int(chosen_attack.attacktype1.values[0])

    #remove chosen attack otherwise similarity would be 1
    data = data[(data.eventid != v[0])]

    if year != 0:  # filtro per anno se viene passato
        data = data[(data.year == year)]

    if take_only_similar_attacks:  # take only data with the same attack type
        data = data[(data.attacktype1 == chosen_attack_type)]

    #read database columns i want, including eventid to match later and convert to array
    array = data[['eventid', 'attacktype1',
                  'nperps', 'nkill', 'nwound']].values
    d = {}  # dictionary key = event_id; value = cosine_similarity
    for i in array:
        cosine_similarity = 1 - spatial.distance.cosine(v[1:], i[1:])
        eventid = i[0]
        d[eventid] = cosine_similarity

    #dictionary sorted by descending value, only the first n_elems are taken
    sorted_dict = dict(
        sorted(d.items(), key=lambda x: x[1], reverse=True)[:n_elems])
    keys = sorted_dict.keys()

    # n_elems eventi piu simili a quello dato (v)
    s = pd.DataFrame(data[data.eventid.isin(keys)])

    # add spacial distance column for each row of s
    for i, row in s.iterrows():
        s.at[i, 'spacial_distance'] = sorted_dict[row.eventid]

    #sort columns by cosine_similarity
    s = s.sort_values(by=['spacial_distance'], ascending=False)

    #write to csv
    s.to_csv("static/data/cosine_similarity_data.csv", sep=',', header=True)

    pass

# if __name__ == "__main__":
#     action([200109110004, 4, 5, 1384, 8190])
