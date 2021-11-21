#!/usr/bin/env python
# coding: utf-8

# In[1]:


import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from konlpy.tag import Komoran

# komoran 선언 및 사전추가
komoran = Komoran(userdic='./user_dic.txt')

text = input()

# In[3]:


# 문장 -> 단어(nouns)
from re import match

nouns = ""

for noun in komoran.nouns(text):
    if len(str(noun)) >= 2 and (match('[^방법]', noun)):
        nouns = nouns + ' ' + noun

nouns

# In[4]:


# data = pd.read_csv('C:/Users/user/Desktop/recommend_dataset.csv', low_memory=False)
data = pd.read_csv('./dataset2.csv', low_memory=False)
# data[['keywords']].head()
data[['타이틀(Title)']].head()
data[['설명(Description)']].head()

# In[5]:


# 사용자의 문장 데이터셋에 삽입
df = pd.DataFrame(data)

# Description과 Title이 공백이면 데이터프레임에서 제거
data = df[['설명(Description)', '타이틀(Title)']].dropna()
data

# In[6]:


# #사용자의 문장 데이터셋에 삽입
# df = pd.DataFrame(data)
# #df
# new_data = {
#    'ques_id': len(df) + 1,
#    'ques_content': text,
#     'language': 'NAN',
#     'category': 'NAN',
#     'sub_category': 'NAN',
#     'keys_origin': 'NAN',
#     'keywords': nouns,
#     'genres': 'NAN'
# }
# data = df.append(new_data, ignore_index = True)
# data

# 사용자의 문장 데이터셋에 삽입
## df = pd.DataFrame(data)
# df
# new_data = {
#    '의도(Intent)': 'NAN',
#    '개체명(NER)': 'NAN',
#     '언어(Language)': 'NAN',
#     '키워드(Keyword)': 'NAN',
#     '설명(Description)': nouns,
#     '타이틀(Title)': 'NAN',
#     '질문(Query)': 'NAN',
#     '답변(Answer)': 'NAN',
#     '답변이미지': 'NAN'
# }
# new_data = {
#    '의도(Intent)': 'NAN',
#    '개체명(NER)': 'NAN',
#     '언어(Language)': 'NAN',
#     '키워드(Keyword)': 'NAN',
#     '설명(Description)': nouns,
#     '타이틀(Title)': 'NAN',
#     '질문(Query)': 'NAN',
#     '답변(Answer)': 'NAN',
#     '답변이미지': 'NAN'
# }
new_data = {
    '설명(Description)': nouns,
    '타이틀(Title)': 'user question'
}
data = data.append(new_data, ignore_index=True)

# In[7]:


# #keywords에 대해 tf-idf 수행

# tfidf = TfidfVectorizer()
# tfidf_matrix = tfidf.fit_transform(data['keywords'])
# print(tfidf_matrix.shape)


# Decscription에 대해 tf-idf 수행

tfidf = TfidfVectorizer()
tfidf_matrix = tfidf.fit_transform(data['설명(Description)'].values.astype('U'))

# In[8]:


# #코사인 유사도 구하기
# cosine_sim = cosine_similarity(tfidf_matrix, tfidf_matrix)
# print(cosine_sim)

# indices = pd.Series(data.index, index=data['ques_content']).drop_duplicates()
# print(indices.head())

# idx = indices['if 문']
# print(idx)


# 코사인 유사도 구하기
cosine_sim = cosine_similarity(tfidf_matrix, tfidf_matrix)

indices = pd.Series(data.index, index=data['타이틀(Title)']).drop_duplicates()

idx = indices['user question']


# print(idx)


# In[9]:


# #사용자의 질문에 대해 코사인 유사도를 이용하여
# #가장 유사도가 비슷한 질문을 찾아내는 함수
# def get_recommendations(idx):
#     #선택한 질문의 인덱스 구하기
#     #idx = indices[question]

#     #모든 질문에 대해 해당 질문과의 유사도 구하기
#     sim_scores = list(enumerate(cosine_sim[idx]))

#     #유사도에 따라 질문들 정렬
#     sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)

#     #가장 유사한 5개 질문 받아오기
#     sim_scores = sim_scores[1:5]

#     #가장 유사한 5개의 질문의 인덱스 받아오기
#     ques_indices = [i[0] for i in sim_scores]

#     #가장 유사한 5개의 질문 리턴
#     return data['ques_content'].iloc[ques_indices]


# 사용자의 질문에 대해 코사인 유사도를 이용하여
# 가장 유사도가 비슷한 질문을 찾아내는 함수
def get_recommendations(idx):
    # 선택한 질문의 인덱스 구하기
    # idx = indices[question]

    # 모든 질문에 대해 해당 질문과의 유사도 구하기
    sim_scores = list(enumerate(cosine_sim[idx]))

    # 유사도에 따라 질문들 정렬
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)

    # 가장 유사한 5개 질문 받아오기
    sim_scores = sim_scores[1:5]

    # 가장 유사한 5개의 질문의 인덱스 받아오기
    ques_indices = [i[0] for i in sim_scores]

    result = []
    for i in ques_indices:
        result.append(data['타이틀(Title)'].iloc[i])

    # 가장 유사한 5개의 질문 리턴
    return result


# In[10]:


# '반복문 종료' 과 비슷한 질문들 찾기
# get_recommendations('반복문 종료')

print(get_recommendations(len(data) - 1))

# In[11]:


# #사용자 질문 데이터를 데이터셋에서 삭제 (마지막행 삭제)
# print(len(data))
# print(data.loc[len(data) - 1])
# data = data.drop(len(data) - 1)
# print(len(data))


# In[ ]:
