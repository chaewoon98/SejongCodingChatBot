class FindAnswer:

    keyword = list()
    extra_keyword = list()
    totalKeyword = list()
    answerRow = list()

    keyword_exist = False

    def __init__(self, sheet):
        # self.db = db
        self.sheet = sheet

    def findCell(self, intent, ner, keyword_list):
        exist_keyword_list = list()
        row = list()

        # 초기화
        self.keyword_exist = False
        self.answerRow.clear()  # answerRow 비우기

        # 의도명만 있는 경우
        if ner is None:
            for r in self.sheet.rows:

                if intent in r[0].value:

                    exist_keyword_list.clear()

                    for i in range(len(keyword_list)):

                        if keyword_list[i] in r[3].value:

                            if not exist_keyword_list:
                                exist_keyword_list.insert(i, 1)
                            else:
                                exist_keyword_list[i] = 1

                    if exist_keyword_list.count(1) == len(keyword_list):
                        self.keyword_exist = True
                        row.append(r)

            for r in row:
                self.answerRow.append(r[7].value)

        # 의도명, 개체명 모두 있는 경우
        else:
            for r in self.sheet.rows:

                if (r[0].value is not None) and (r[1].value is not None):

                    if (intent in r[0].value) and (ner[0] in r[1].value):

                        exist_keyword_list.clear()  # 초기화

                        for i in range(len(keyword_list)):

                            if keyword_list[i] in r[3].value:

                                if len(exist_keyword_list) <= i:
                                    exist_keyword_list.insert(i, 1)
                                else:
                                    exist_keyword_list[i] = 1

                        if exist_keyword_list.count(1) == len(keyword_list):
                            self.keyword_exist = True
                            row.append(r)

            for r in row:
                self.answerRow.append(r[7].value)

    # 검색 쿼리 생성
    def make_query(self, intent_name, ner_tags, predicts):

        # 의도명만 있는 경우
        if intent_name is not None and ner_tags is None:
            for i in range(len(predicts)):
                self.extra_keyword.append(predicts[i][0])

            self.findCell(intent_name, None, self.extra_keyword)

            if len(self.answerRow) < 1:

                self.keyword.append("again")
                self.findCell(intent_name, None, self.keyword)

        # 의도명, 개체명 둘 다 있는 경우
        elif intent_name is not None and ner_tags is not None:

            if predicts is not None:
                for i in range(len(predicts)):

                    if predicts[i][1] == 'B_LV1':
                        self.keyword.append(predicts[i][0])
                    else:
                        self.extra_keyword.append(predicts[i][0])   # 나중에 다시 사용하기 위해 extra_keyword에 넣기

            # B_LV1으로 인식한 것만 찾기
            self.findCell(intent_name, ner_tags, self.keyword)

    # 답변 검색
    def search(self, intent_name, ner_tags, predicts):

        # 의도명과 개체명으로 답변 검색
        self.make_query(intent_name, ner_tags, predicts)

        if (len(self.answerRow) > 1) and (ner_tags is not None):

            self.totalKeyword = self.keyword + self.extra_keyword

            self.findCell(intent_name, ner_tags, self.totalKeyword)

        if (self.keyword_exist is False) and (ner_tags is not None):
            self.findCell(intent_name, ner_tags, self.keyword)

        if self.answerRow is not None:
            answer = self.answerRow[0]
        return answer

    def tag_to_word(self, ner_predicts, answer):
        for word, tag in ner_predicts:

            if tag == 'B_LV1':
                answer = answer.replace(tag, word)

        answer = answer.replace('{', '')
        answer = answer.replace('}', '')
        return answer