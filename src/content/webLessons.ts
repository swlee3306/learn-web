export type WebLessonTopicId =
  | 'getting-started'
  | 'dom-events'
  | 'state-render'
  | 'arrays-loops'
  | 'forms-validation'
  | 'fetch-async'
  | 'storage'
  | 'timers';

export type WebLessonVideo = {
  titleKo: string;
  url: string;
  minutes?: number;
  channel?: string;
  // optional: what missions this helps with
  missions?: string[];
};

export type WebLessonTopic = {
  id: WebLessonTopicId;
  titleKo: string;
  summaryKo: string;
  videos: WebLessonVideo[];
};

// NOTE: 영상은 한국어 위주로 구성하고, 필요 시 검증된 영어 영상을 추가.
// 현재는 "틀"만 먼저 깔아두고, 영상 리스트는 큐레이션하며 채워넣는다.
export const WEB_LESSON_TOPICS: WebLessonTopic[] = [
  {
    id: 'getting-started',
    titleKo: '시작하기: HTML/CSS/JS 역할 + 개발 흐름',
    summaryKo: '이 사이트(코딩 놀이터)에서 Run/Reset/검사 흐름을 이해하고, HTML/CSS/JS가 각각 무슨 역할인지 잡는다.',
    videos: [
      {
        titleKo: '자바스크립트 2. 콘솔에 출력, script async 와 defer의 차이점 및 앞으로 자바스크립트 공부 방향 (입문편)',
        url: 'https://www.youtube.com/watch?v=tJieVCgGzhs',
        channel: '드림코딩'
      }
    ]
  },
  {
    id: 'dom-events',
    titleKo: 'DOM 선택 + 이벤트(addEventListener)',
    summaryKo: 'querySelector/getElementById, click/input/change 이벤트를 다룬다.',
    videos: [
      {
        titleKo: '실용 자바스크립트 5강 : 이벤트리스너쓰면 드러웠던 HTML이 말끔',
        url: 'https://www.youtube.com/watch?v=EMBWL336o20',
        channel: '코딩애플'
      },
      {
        titleKo: '웹페이지에 스크롤 애니메이션 쉽게 주는 법 (이벤트/스크롤 활용)',
        url: 'https://www.youtube.com/watch?v=e4Afka5IOZ8',
        channel: '코딩애플'
      }
    ]
  },
  {
    id: 'state-render',
    titleKo: '상태(state)와 렌더(render) 패턴',
    summaryKo: '변수(상태) 하나를 바꾸고 화면을 다시 그리는 루틴을 익힌다.',
    videos: [
      {
        titleKo: '바닐라 JS로만 카운터 앱 만들기. DOM을 이용한 렌더링 부분을 함수로 따로 구현',
        url: 'https://www.youtube.com/watch?v=bExPEXp0KSg',
        channel: '씽코딩',
        minutes: 18
      },
      {
        titleKo: '6강. 렌더링 진짜 쉽게 설명해줌',
        url: 'https://www.youtube.com/watch?v=2wPFdl3ZMSM',
        channel: '인브로즈',
        minutes: 6
      },
      {
        titleKo: '브라우저는 어떻게 화면을 렌더링할까?(프론트엔드 개발 지망생이라면 필수 시청!!)',
        url: 'https://www.youtube.com/watch?v=z1Jj7Xg-TkU',
        channel: '제주코딩베이스캠프',
        minutes: 9
      }
    ]
  },
  {
    id: 'arrays-loops',
    titleKo: '배열/루프 + map/filter/slice',
    summaryKo: '리스트를 만들고 필터링/정렬/페이징하는 기본 패턴을 익힌다.',
    videos: [
      {
        titleKo: '자바스크립트 9. 유용한 10가지 배열 함수들. Array APIs 총정리 (입문편)',
        url: 'https://www.youtube.com/watch?v=3CUjtKJ7PJg',
        channel: '드림코딩'
      },
      {
        titleKo: '자바스크립트 배열 개념과 APIs 총정리 (입문편)',
        url: 'https://www.youtube.com/watch?v=yOdAVDuHUKQ',
        channel: '드림코딩'
      }
    ]
  },
  {
    id: 'forms-validation',
    titleKo: '폼/검증(preventDefault, 조건문, 간단 regex)',
    summaryKo: 'submit 이벤트 흐름과 입력 검증 UI를 만든다.',
    videos: [
      {
        titleKo: '[데브렉] JavaScript 예전 강좌 - 폼 유효성검사',
        url: 'https://www.youtube.com/watch?v=741ThCy4zEA',
        channel: 'VisualAcademy',
        minutes: 13
      },
      {
        titleKo: 'JavaScript Basics for Beginners #22: The value property and preventDefault',
        url: 'https://www.youtube.com/watch?v=Bsq3gzypMDk',
        channel: '유노코딩',
        minutes: 12
      },
      {
        titleKo: "Regular Expressions, Don't Put It Off Anymore 🤩",
        url: 'https://www.youtube.com/watch?v=t3M6toIflyQ',
        channel: '드림코딩',
        minutes: 22
      }
    ]
  },
  {
    id: 'fetch-async',
    titleKo: 'fetch + async/await + 에러 처리',
    summaryKo: '네트워크 요청/로딩 상태/실패 처리를 구성한다.',
    videos: [
      {
        titleKo: '자바스크립트 13. 비동기의 꽃 JavaScript async 와 await 그리고 유용한 Promise APIs (입문편)',
        url: 'https://www.youtube.com/watch?v=aoQSOZfz3vQ',
        channel: '드림코딩'
      },
      {
        titleKo: '리액트 기초 배우기 #16: Async Await (fetch/비동기)',
        url: 'https://www.youtube.com/watch?v=ckJuFBRWGNY',
        channel: '노마드 코더 Nomad Coders'
      }
    ]
  },
  {
    id: 'storage',
    titleKo: 'localStorage로 저장/복원',
    summaryKo: '새로고침 이후에도 데이터가 남도록 만든다.',
    videos: [
      {
        titleKo: '초보자를 위한 바닐라 자바스크립트 #3-3 Saving the User Name part One (localStorage)',
        url: 'https://www.youtube.com/watch?v=lXxlGCRBOQU',
        channel: '노마드 코더 Nomad Coders'
      },
      {
        titleKo: '브라우저의 모든 저장공간 #1 localStorage & sessionStorage',
        url: 'https://www.youtube.com/watch?v=oAVdxCKM5JI',
        channel: '2분개발'
      }
    ]
  },
  {
    id: 'timers',
    titleKo: '타이머(setTimeout/setInterval) 패턴',
    summaryKo: '중복 시작 방지, clearInterval, countdown 등 타이머 상태를 안전하게 다룬다.',
    videos: [
      {
        titleKo: '자바스크립트로 반복 실행 타이머를 만들어 보자! setInterval & clearInterval',
        url: 'https://www.youtube.com/watch?v=BAn8y2GzQHA',
        channel: '유노코딩',
        minutes: 9
      },
      {
        titleKo: 'setTimeout()과 setInterval() | 달레의 웹 프로그래밍',
        url: 'https://www.youtube.com/watch?v=QIotZ0Gyw-E',
        channel: '달레의 코드',
        minutes: 10
      },
      {
        titleKo: 'Intermediate JavaScript Course #12 setTimeout / setInterval',
        url: 'https://www.youtube.com/watch?v=nwk_aNbFEEc',
        channel: '코딩앙마',
        minutes: 3
      }
    ]
  }
];
