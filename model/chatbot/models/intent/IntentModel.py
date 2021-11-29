# 의도 분류 모델을 통해 입력되는 텍스트의 의도 예측

import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'
import tensorflow as tf
from tensorflow.keras.models import Model, load_model
from tensorflow.keras import preprocessing

# 의도 분류 모델 모듈
class IntentModel:
    def __init__(self, model_name, preprocess):
        # 의도 클래스별 레이블
        self.labels = {0: "인사", 1: "정의", 2: "오류메시지", 3: "기타"}
        self.model = load_model(model_name)
        self.p = preprocess

    # 의도 클래스 예측
    def predict_intent_class(self, query):
        # 형태소 분석
        pos = self.p.pos(query)

        # 문장 내 키워드 추출(불용어 제거)
        keywords = self.p.get_keywords(pos, without_tag=True)
        sequences = [self.p.get_wordidx_sequence(keywords)]

        from config.GlobalParams import MAX_SEQ_LEN

        padded_seqs = preprocessing.sequence.pad_sequences(sequences, maxlen=MAX_SEQ_LEN, padding='post')

        predict = self.model.predict(padded_seqs)
        predict_class = tf.math.argmax(predict, axis=1)
        return predict_class.numpy()[0]