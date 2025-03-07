import pandas as pd
import numpy as np
import ast  # For parsing JSON-like strings
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# Load the dataset
df = pd.read_csv("tmdb_5000_credits.csv")

# Ensure required columns exist
if "title" not in df.columns or "cast" not in df.columns:
    raise ValueError("Dataset does not contain 'title' or 'cast'. Check column names.")

# Function to extract top 3 actors from cast JSON
def extract_actors(cast_string):
    try:
        cast_list = ast.literal_eval(cast_string)  # Convert string to list of dicts
        return " ".join(actor['name'].replace(" ", "") for actor in cast_list[:3])  # Use first 3 actors
    except (ValueError, SyntaxError):
        return ""  # Return empty string if parsing fails

# Apply extraction to cast column
df["cast"] = df["cast"].apply(extract_actors)

# Combine movie title and cast into a single text feature
df["features"] = df["title"] + " " + df["cast"]

# Convert text data into a matrix of token counts
vectorizer = CountVectorizer(stop_words='english')
feature_matrix = vectorizer.fit_transform(df["features"])

# Compute cosine similarity matrix
cosine_sim = cosine_similarity(feature_matrix, feature_matrix)

# Create a Series to quickly look up movie indices
indices = pd.Series(df.index, index=df["title"]).drop_duplicates()

def get_movie_recommendations(movie_title, num_recommendations=5):
    if movie_title not in indices:
        return [f"'{movie_title}' not found in the dataset."]

    # Get movie index
    idx = indices[movie_title]

    # Get similarity scores
    sim_scores = list(enumerate(cosine_sim[idx]))

    # Sort by highest similarity scores (excluding itself)
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)[1:num_recommendations+1]

    # Get recommended movie titles
    movie_indices = [i[0] for i in sim_scores]
    recommended_movies = df["title"].iloc[movie_indices].tolist()

    return recommended_movies

# Example usage
if __name__ == "__main__":
    movie_name = input("Enter a movie title: ")
    recommendations = get_movie_recommendations(movie_name)
    print(f"Movies similar to '{movie_name}': {recommendations}")
