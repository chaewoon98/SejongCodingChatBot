# 개체명 인식 모듈

import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'
import tensorflow as tf
import numpy as np
from tensorflow.keras.models import Model, load_model
from tensorflow.keras import preprocessing

# 개체명 인식 모델 모듈
class NerModel:
    def __init__(self, model_name, preprocess):

        self.index_to_ner = {1: 'O', 2: 'B_LV1'}
        self.model = load_model(model_name)
        self.p = preprocess

    # 개체명 클래스 예측
    def predict(self, query):
        pos = self.p.pos(query)

        keywords = self.p.get_keywords(pos, without_tag=True)
        # 가져온 단어에 대해 인덱싱
        sequences = [self.p.get_wordidx_sequence(keywords)]

        max_len = 40
        padded_seqs = preprocessing.sequence.pad_sequences(sequences, padding="post", value=0, maxlen=max_len)

        predict = self.model.predict(np.array([padded_seqs[0]]))
        predict_class = tf.math.argmax(predict, axis=-1)    # argmax(): 가장 높은 값의 인덱스 반환

        tags = [self.index_to_ner[i] for i in predict_class.numpy()[0]]

        return list(zip(keywords, tags))

    def predict_tags(self, query):
        # 형태소 분석
        pos = self.p.pos(query)

        # 문장 내 키워드 추출(불용어 제거)
        keywords = self.p.get_keywords(pos, without_tag=True)
        sequences = [self.p.get_wordidx_sequence(keywords)]

        max_len = 40
        padded_seqs = preprocessing.sequence.pad_sequences(sequences, padding="post", value=0, maxlen=max_len)
        predict = self.model.predict(np.array([padded_seqs[0]]))
        predict_class = tf.math.argmax(predict, axis=-1)

        tags = []
        for tag_idx in predict_class.numpy()[0]:
            if tag_idx == 1: continue
            tags.append(self.index_to_ner[tag_idx])
            if len(tags) == 0:  # 태그 길이가 0이면 None 반환
                return None
            return tags
