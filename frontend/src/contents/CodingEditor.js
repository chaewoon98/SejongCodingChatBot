import React, { useRef, useState, useEffect } from 'react';
import VerticalHeader from './VerticalHeader';
import HorizontalHeader from './HorizontalHeader';
import Editor from '@monaco-editor/react';
import '../css/CodingEditor.css';
import axios from 'axios';
import CodeCompilerModal from './modal/CodeCompilerModal';
import { connect } from 'react-redux';
import { changeLoadingState } from '../redux/view/viewActions';
import { changeType, onLoginSuccess } from '../redux/login/loginActions';
import { root2 } from './Root2';
import {
  API_BASE_URL,
  API_COMPILER_URL,
  C_COMPILER_BASE_CODE,
  P_COMPILER_BASE_CODE,
} from './utils/Constant';

const CodingEditor = ({ changeLoadingState, onLoginSuccess, changeType, }) => {
  const editorRef = useRef(null);
  const [codeInput, setCodeInput] = useState('');
  const [codeOutput, setCodeOutput] = useState('');
  const [codeLang, setCodeLang] = useState('c');
  const [baseCode, setBaseCode] = useState(C_COMPILER_BASE_CODE);

  const [taQaModalOn, setTaQaModalOn] = useState(false);
  const [title,setTitle] = useState('TA조교한테\n질문하기');

  useEffect(() => {

    // 동기로 리프래쉬토큰 검증.
    const auth = async () => {
      const result = await root2(onLoginSuccess, changeType, changeLoadingState);

      if (result === 'success') {
        changeLoadingState(false);
        getIsTa();
      }
    };

    auth();

  }, []);

  const getIsTa = () => {
    axios
      .post(
        API_BASE_URL + '/user/assistant',
        {},
        {
          headers: {
            'Content-type': 'application/json',
            Accept: 'application/json',
          },
          withCredentials: true,
        },
      )
      .then((res) => {

        if(res.data.isAssistant === '1'){
          setTitle('학생에게\n코드 보내기')
        }
      })
      .catch((res) => {
      });
  };

  function showValue() {
    //alert(editorRef.current.getValue());
    const code = editorRef.current.getValue();
    setCodeOutput(''); // 결과창 초기화.
    changeLoadingState(true);
    axios
      .post(
        API_COMPILER_URL + '/compiler/' + codeLang,
        { code: code, input: codeInput },
        {
          headers: {
            'Content-type': 'application/json',
            Accept: 'application/json',
          },
          withCredentials: true,
        },
      )
      .then((res) => {
        console.log(res.data);
        setCodeOutput(res.data);
        changeLoadingState(false);
      })
      .catch((res) => {
        changeLoadingState(false);
        console.log(res);
        alert('일시적 오류가 발생했습니다. 다시 시도해주세요.');
      });
  }

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  return (
    <div id="editorContainer">
      <VerticalHeader />
      <HorizontalHeader />
      <>{taQaModalOn ? <CodeCompilerModal setModalOn={setTaQaModalOn} code={editorRef.current.getValue()}
        input={codeInput} output={codeOutput} /> : ''}</>
      <div id="editorBox">
        <div id="codingTopNav">
          <h1>코딩하기</h1>

          <div id="compilerBntGroup">
            <p className="complierLangRadioBntP">C</p>
            <input
              className="complierLangRadioBnt"
              type="radio"
              value="c"
              checked={codeLang === 'c'}
              onChange={(e) => {
                setCodeLang(e.target.value);
                setBaseCode(C_COMPILER_BASE_CODE);
              }}
            ></input>
            <div style={{ width: '20px' }}></div>
            <p className="complierLangRadioBntP">P</p>
            <input
              className="complierLangRadioBnt"
              type="radio"
              value="python"
              checked={codeLang === 'python'}
              onChange={(e) => {
                setCodeLang(e.target.value);
                setBaseCode(P_COMPILER_BASE_CODE);
              }}
            />

            <button
              onClick={() => {
                showValue();
              }}
            >
              실 행
            </button>
          </div>
        </div>

        <div id="codingInnerBox">
          <Editor
            className="codingEditor"
            theme="vs-dark"
            language={codeLang}
            onMount={handleEditorDidMount}
            value={baseCode}

          />
        </div>
      </div>
      <div id="outputBox">
        <h1>입력값 설정</h1>

        <textarea
          id="inputLine"
          onChange={(e) => {
            setCodeInput(e.target.value);
          }}
        ></textarea>
        <div id="outputBoxNav">
          <h1>결 과</h1>
          <div>
            {/* <button style={{ marginRight: "15px" }}>챗봇에게<br />질문 보내기</button> */}
            <button style={{whiteSpace:'pre'}} onClick={() => { setTaQaModalOn(true) }}>{title}</button>
          </div>
        </div>
        <textarea id="outputLine" value={codeOutput} readOnly></textarea>
      </div>
    </div>
  );
};

const mapStateToProps = ({ }) => {

  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeType: (type) => dispatch(changeType(type)),
    changeLoadingState: (props) => dispatch(changeLoadingState(props)),
    onLoginSuccess: (props) => dispatch(onLoginSuccess(props)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CodingEditor);
