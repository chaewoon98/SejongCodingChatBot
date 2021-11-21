#!/usr/bin/env python
# coding: utf-8
import os
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from re import match

class Recommendation:

    def preProcess(self):

        # loca = os.getcwd()
        loca = ""

        data = pd.read_csv(loca +'/recommend/dataset.csv', low_memory=False)

        # 데이터셋에 삽입
        df = pd.DataFrame(data)

        # Description과 Title이 공백이면 데이터프레임에서 제거
        data = df[['타이틀(Title)', '설명(Description)']].dropna()

        return data


    def insertUserData(self, data,komoran, user_question):

        nouns = ""
        for noun in komoran.nouns(user_question):
            if len(str(noun)) >= 2 and (match('[^방법]', noun)):
                nouns = nouns + ' ' + noun

                # 사용자의 문장 데이터셋에 삽입
        new_data = {
            '타이틀(Title)': 'user question',
            '설명(Description)': nouns
        }
        data = data.append(new_data, ignore_index=True)

        return data


    # 사용자의 질문에 대해 코사인 유사도를 이용하여
    # 가장 유사도가 비슷한 질문을 찾아내는 함수
    def get_recommendations(self, data, idx):
        # Decscription에 대해 tf-idf 수행

        tfidf = TfidfVectorizer()
        tfidf_matrix = tfidf.fit_transform(data['설명(Description)'].values.astype('U'))
        # print(tfidf_matrix.shape)

        # 코사인 유사도 구하기
        cosine_sim = cosine_similarity(tfidf_matrix, tfidf_matrix)
        # print(cosine_sim)

        indices = pd.Series(data.index, index=data['타이틀(Title)']).drop_duplicates()
        # print(indices.head())
        idx = indices['user question']

        # 모든 질문에 대해 해당 질문과의 유사도 구하기
        sim_scores = list(enumerate(cosine_sim[idx]))

        # 유사도에 따라 질문들 정렬
        sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)

        # 가장 유사한 5개 질문 받아오기
        sim_scores = sim_scores[1:5]

        # 가장 유사한 5개의 질문의 인덱스 받아오기
        ques_indices = []
        ques_indices = [i[0] for i in sim_scores]

        # 가장 유사한 5개의 질문 리턴
        #data['타이틀(Title)'].iloc[ques_indices]

        result = []

        for i in ques_indices:
            result.append(data['타이틀(Title)'][i])

        return result

# 결과 확인시 사용!
# print(get_recommendations(test_data, len(test_data) - 1))
