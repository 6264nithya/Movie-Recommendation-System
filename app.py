from flask import Flask, render_template, request
import pandas as pd

app = Flask(__name__)

# Load dataset
file_path = "MovieGenre.csv"
try:
    df = pd.read_csv(file_path, encoding="utf-8")
except UnicodeDecodeError:
    df = pd.read_csv(file_path, encoding="ISO-8859-1")

def get_recommendations(genre, min_rating):
    filtered_movies = df.dropna(subset=['IMDB Score', 'Genre'])
    filtered_movies = filtered_movies[filtered_movies['IMDB Score'] >= float(min_rating)]
    filtered_movies = filtered_movies[filtered_movies['Genre'].str.contains(genre, case=False, na=False)]
    return filtered_movies[['Title', 'IMDB Score', 'Genre', 'Imdb Link', 'Poster']].head(10).to_dict(orient='records')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/predict')
def predict():
    genre = request.args.get('genre', '')
    min_rating = request.args.get('rating', 0)
    recommendations = get_recommendations(genre, min_rating)
    return render_template('predict.html', recommendations=recommendations)

if __name__ == '__main__':
    app.run(debug=True)
