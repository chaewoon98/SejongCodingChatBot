import traceback
from Preprocess import Preprocess
import openpyxl
import os
print(os.getcwd())

# 전처리 객체 생성
p = Preprocess(word2index_dic='chatbot_dict.bin',
               userdic='user_dic.tsv')

train_file = 'train_data_new.xlsx'

# 학습 엑셀 파일 불러오기
wb = openpyxl.load_workbook(train_file)
sheet = wb['Sheet1']

query = input()

# 의도 파악
from models.intent.IntentModel import IntentModel
intent = IntentModel(model_name='./models/intent/intent_model.h5', preprocess=p)
predict = intent.predict_class(query)

intent_name = intent.labels[predict]

# 개체명 인식
from models.ner.NerModel import NerModel
ner = NerModel(model_name='./models/ner/ner_model.h5', preprocess=p)
predicts = ner.predict(query)
ner_tags = ner.predict_tags(query)

# 답변 검색
from FindAnswer import FindAnswer

try:
    f = FindAnswer(sheet)
    answer_text = f.search(intent_name, ner_tags, predicts)
    answer = f.tag_to_word(predicts, answer_text)

    if answer is None:
        answer = "죄송해요, 무슨 말인지 모르겠어요."

except Exception as e:
    print("e = ", e)
    print(traceback.format_exc())
    answer = "죄송해요, 무슨 말인지 모르겠어요."

print("답변 : ", answer)

wb.close()  # 엑셀 닫기
