import traceback

from utils.FindAnswer import FindAnswer

class GiveAnswer:
    def __init__(self, db):
        self.db = db

    def give_answer(self, msg, intent, ner, language):
        f = FindAnswer(self.db)

        # msg와 일치하는 title 값 있는지 확인
        answer_text = f.search_title(msg, language)

        # 비어있지 않으면
        if answer_text is not None:
            answer = answer_text

        else:
            # 의도 파악
            predict = intent.predict_intent_class(msg)

            intent_name = intent.labels[predict]

            # 개체명 인식
            predicts = ner.predict(msg)
            ner_tags = ner.predict_tags(msg)

            # 답변 검색
            try:
                answer_text = f.search(intent_name, ner_tags, predicts, language)

                if not answer_text:
                    answer = "질문을 잘 이해하지 못 했어요. 더 구체적으로 질문해보세요.\n" \
                             "키워드나 명사 위주로 질문하면 정확한 답변을 받을 수 있어요."
                else:
                    answer = f.tag_to_word(predicts, answer_text)

            except Exception as e:
                print("e = ", e)
                print(traceback.format_exc())
                answer = "안녕하세요. 질문이 있으신가요?"

        print("답변 : ", answer)
        return answer
