import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from konlpy.tag import Komoran

print(pd.__version__)
print(Komoran.__name__)
print(cosine_similarity.__name__)
print(TfidfVectorizer.__name__)