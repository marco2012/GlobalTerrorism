import pandas as pd

def action():
    dataset="static/data/terrorism-small.csv"

    #att=["eventid","year","imonth","iday","extended","country","country_txt","region","region_txt","city","latitude","longitude","summary","success","suicide","attacktype1","attacktype1_txt","targtype1","targtype1_txt","target1","natlty1","natlty1_txt","nperps","weaptype1","weaptype1_txt","weapdetail","nkill","nwound"]
    data = pd.io.parsers.read_csv(dataset,
         delimiter=',',
         header=0,
        );

    #features = ["AGE", "LIMIT_BAL", "BILL_AMT1", "BILL_AMT2", "BILL_AMT3", "BILL_AMT4", "BILL_AMT5", "BILL_AMT6", "PAY_AMT1", "PAY_AMT2", "PAY_AMT3", "PAY_AMT4", "PAY_AMT5", "PAY_AMT6"]

    frequency_of=["success", "suicide", "attacktype1", "weaptype1_txt"]



    for elem in frequency_of:
        table=pd.crosstab(index=data[elem], columns=data["nkill"], normalize="index")
        # table.columns=["1", "0"]
        # #swap 2 and 1
        # table=table.rename(index=str, columns={"0": "2"})
        # table=table.rename(index=str, columns={"1": "0"})
        # table=table.rename(index=str, columns={"2": "1"})
        #table["total"]=table["0"]+table["1"]
        #table=table.transpose()
        table.to_csv("static/data/"+elem+"_frequency.csv")
    return 0;

if __name__ == "__main__":
    action()
