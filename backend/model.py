from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler


import pandas as pd
import seaborn as sns
import numpy as np
import matplotlib.pyplot as plt

df = pd.read_csv('StressLevelDataset.csv',dtype=int)

df = df[['academic_performance','study_load','stress_level',
         # 'anxiety_level', 
         # 'depression',
         'teacher_student_relationship','future_career_concerns','headache','sleep_quality','breathing_problem']]

outliers = []
def detect_outliers_iqr(data):
    data = sorted(data)
    q1 = np.percentile(data, 25)
    q3 = np.percentile(data, 75)
    # print(q1, q3)
    IQR = q3-q1
    lwr_bound = q1-(1.5*IQR)
    upr_bound = q3+(1.5*IQR)
    # print(lwr_bound, upr_bound)
    for i in data: 
        if (i<lwr_bound or i>upr_bound):
            outliers.append(i)
    return outliers# Driver code
sample_outliers = detect_outliers_iqr(list(df['study_load']))

df['study_load'].replace({0:df['study_load'].mean(),5:df['study_load'].mean()},inplace=True)

x = df.drop(['stress_level'],axis=1)
x = pd.get_dummies(x)
y = df['stress_level']

scaler = StandardScaler()
x_scaled = scaler.fit_transform(x)

x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.3, random_state=33)

logmodel = LogisticRegression(max_iter=2000)

logmodel.fit(x_train, y_train)

def predict(data):
    return logmodel.predict(data)