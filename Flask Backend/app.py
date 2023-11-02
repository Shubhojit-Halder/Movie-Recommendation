from flask import Flask
import pickle
import pandas as pd
from markupsafe import escape

movies_dict=pickle.load(open('movies_dict.pkl','rb'))
similarity=pickle.load(open('similarity.pkl','rb'))
movies=pd.DataFrame(movies_dict);
# print(movies['title'].values);

app=Flask(__name__)
def recommend(movie):
    movie_index=movies[movies['title']==movie].index[0]
    distances=similarity[movie_index]
    movies_list=sorted(list(enumerate(distances)),reverse=True,key=lambda x:x[1])[1:6]
    recommended_movies=[]

    for i in movies_list:
        recommended_movies.append(movies.iloc[i[0]].title)
    return recommended_movies

@app.route("/")
def Home():
    return movies_dict['title']; 

 
@app.route('/<movie>')
def movie_recommendation(movie):
    return recommend(movie)

if __name__=="__main__":
    app.run(debug=True)