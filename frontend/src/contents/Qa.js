import React from 'react'
import VerticalHeader from './VerticalHeader';
import HorizontalHeader from './HorizontalHeader';
import '../css/Qa.css';


const Qa = () => {
    return (
        <div>
            <VerticalHeader />
            <HorizontalHeader />

            <div id="qaBox">
                <img src="img/logo.png" />
                <h3>Sejong Coding Helper<br />문의 사항{"&"}피드백</h3>
                <div id="qaNoticeBox">

                    <div className='notice'>
                        안녕하세요. Sejong Coding Helper를 개발한 'Team EnTrue' 입니다.
                    </div>

                    <div className='notice'>
                        사이트를 이용하는 중 발생한 문제에 대한 문의나 피드백을 남겨주시면<br />최대한 빠르게 확인한 후 조치하도록 하겠습니다.
                    </div>

                    <div className='notice'>
                        또한, 아직 공부 중인 학생들이 제작한 사이트이기때문에 많은 개선 사항이 있을 것 같습니다.
                        사이트를 이용하시다가 느끼신 불편한 부분과 개선점에 대한 조언을 해주신다면 정말 감사하겠습니다.
                    </div>

                    <div className='notice'>
                        조교 계정으로 전환을 원하시는 분은 회원가입을 완료하신 후,<br/>아래 버튼을 통해 설문을 완료해주세요.
                    </div>

                    <div className='notice'>
                        긍정적으로 봐주시는 모든 세종대 학우들에게 감사합니다!<br/>세종대 학우들 모두 화이팅!😀😀😀😀
                    </div>

                    <a target='_blank' href="https://forms.gle/s19qJw3S19PjeBz69" >
                        문의 {"&"} 피드백하기
                    </a>

                    <a target='_blank' href="https://forms.gle/UYzZCyCeCf3SP3xo6" >
                        조교 계정으로 전환하기
                    </a>
                </div>
            </div>

            <div style={{width:'100%', height:'100px'}}>

            </div>

        </div>
    )
}

export default Qa
