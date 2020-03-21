import pandas as pd

name = "APT.AX.csv"
dataset = pd.read_csv(name)
dataset['Diff'] = dataset['Close'] - dataset['Open']
dataset.to_csv('{}'.format(name.replace('.AX', '')))