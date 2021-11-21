from config.DatabaseConfig import *
from Database import Database
from Preprocess import Preprocess
from models.intent.IntentModel import IntentModel
from models.ner.NerModel import NerModel
from GiveAnswer import GiveAnswer

# 전처리 객체 생성
p = Preprocess(word2index_dic='../train_tools/dict/chatbot_dict.bin',
               userdic='../utils/user_dic.tsv')

# 질문/답변 학습 DB 연결 객체 생성
db = Database(
    host=DB_HOST, user=DB_USER, password=DB_PASSWORD, db_name=DB_NAME
)
db.connect()  # DB 연결

intent = IntentModel(model_name='../models/intent/intent_model.h5', preprocess=p)
ner = NerModel(model_name='../models/ner/ner_model.h5', preprocess=p)

question = GiveAnswer(db=db)

cnt = 0
while cnt < 5:
    print("cnt = ", cnt)
    question.give_answer(intent, ner)
    cnt += 1

db.close()  # DB 연결 끊음
