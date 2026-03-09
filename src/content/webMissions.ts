import type {WebLessonTopicId} from './webLessons';

export type MissionId =
  | 'mission-1'
  | 'mission-2'
  | 'mission-3'
  | 'mission-4'
  | 'mission-5'
  | 'mission-6'
  | 'mission-7'
  | 'mission-8'
  | 'mission-9'
  | 'mission-10'
  | 'mission-11'
  | 'mission-12'
  | 'mission-13'
  | 'mission-14'
  | 'mission-15'
  | 'mission-16'
  | 'mission-17'
  | 'mission-18'
  | 'mission-19'
  | 'mission-20'
  | 'mission-21'
  | 'mission-22'
  | 'mission-23'
  | 'mission-24'
  | 'mission-25'
  | 'mission-26'
  | 'mission-27'
  | 'mission-28'
  | 'mission-29'
  | 'mission-30'
  | 'mission-31'
  | 'mission-32'
  | 'mission-33'
  | 'mission-34'
  | 'mission-35'
  | 'mission-36'
  | 'mission-37'
  | 'mission-38'
  | 'mission-39'
  | 'mission-40'
  | 'mission-41'
  | 'mission-42'
  | 'mission-43'
  | 'mission-44'
  | 'mission-45'
  | 'mission-46'
  | 'mission-47'
  | 'mission-48'
  | 'mission-49'
  | 'mission-50'
  | 'mission-51'
  | 'mission-52'
  | 'mission-53'
  | 'mission-54'
  | 'mission-55'
  | 'mission-56'
  | 'mission-57'
  | 'mission-58'
  | 'mission-59'
  | 'mission-60'
  | 'mission-61'
  | 'mission-62'
  | 'mission-63'
  | 'mission-64'
  | 'mission-65'
  | 'mission-66'
  | 'mission-67'
  | 'mission-68'
  | 'mission-69'
  | 'mission-70'
  | 'mission-71'
  | 'mission-72'
  | 'mission-73'
  | 'mission-74'
  | 'mission-75'
  | 'mission-76'
  | 'mission-77'
  | 'mission-78'
  | 'mission-79'
  | 'mission-80'
  | 'mission-81'
  | 'mission-82'
  | 'mission-83'
  | 'mission-84'
  | 'mission-85'
  | 'mission-86'
  | 'mission-87'
  | 'mission-88'
  | 'mission-89'
  | 'mission-90'
  | 'mission-91'
  | 'mission-92'
  | 'mission-93'
  | 'mission-94'
  | 'mission-95'
  | 'mission-96'
  | 'mission-97'
  | 'mission-98'
  | 'mission-99'
  | 'mission-100'
  | 'mission-101'
  | 'mission-102'
  | 'mission-103'
  | 'mission-104'
  | 'mission-105'
  | 'mission-106'
  | 'mission-107'
  | 'mission-108'
  | 'mission-109'
  | 'mission-110'
  | 'mission-111'
  | 'mission-112'
  | 'mission-113'
  | 'mission-114'
  | 'mission-115'
  | 'mission-116'
  | 'mission-117'
  | 'mission-118'
  | 'mission-119'
  | 'mission-120'
  | 'mission-121'
  | 'mission-122'
  | 'mission-123'
  | 'mission-124'
  | 'mission-125';

export type MissionStage = 'S0' | 'S1' | 'S2' | 'S3';

export type Mission = {
  id: MissionId;
  track: 'web';
  level: 'beginner';
  stage: MissionStage;
  minutes: number;
  title: {ko: string; en: string};
  pitch: {ko: string; en: string};
  outcomes: {ko: string[]; en: string[]};
  checklist: {ko: string[]; en: string[]};
  /** Detailed how-to for each checklist item (same order). */
  checklistGuide?: {ko: string[]; en: string[]};

  /**
   * Exact mapping between missions and lesson topics.
   * Fill this for every mission before publishing.
   */
  lessonTopicIds: WebLessonTopicId[];

  next?: MissionId;
};

export const WEB_MISSIONS: Mission[] = [
  {
    id: 'mission-1',
    track: 'web',
    level: 'beginner',
    minutes: 12,
    stage: 'S0',
    title: {
      ko: '미션 1 — 내 이름 네온사인 만들기',
      en: 'Mission 1 — Neon name sign'
    },
    pitch: {
      ko: 'CSS로 “와… 내가 만든 게 예쁘다”를 5분 안에 느끼게 하는 미션.',
      en: 'A fast win: make something that looks cool in minutes.'
    },
    outcomes: {
      ko: ['HTML/CSS/JS 역할 분리 감 잡기', '버튼 클릭 이벤트 처리', 'CSS text-shadow로 네온 효과 만들기'],
      en: ['Understand HTML/CSS/JS roles', 'Handle click events', 'Create a neon glow with text-shadow']
    },
    checklist: {
      ko: ['네온 텍스트를 본인 닉네임으로 변경', 'colors 배열에 색 2개 추가', '버튼 텍스트를 영어로 변경'],
      en: ['Change text to your nickname', 'Add 2 colors', 'Change button label to English']
    },
    checklistGuide: {
      ko: [
        "HTML 탭에서 <div class=\"neon\">DUSAN</div> 부분의 DUSAN을 네 닉네임으로 바꿔.\n예) <div class=\"neon\" id=\"sign\">FLANT</div>\n바꾼 다음 ‘실행’ 누르면 화면 글자가 바뀐다.",
        "JS 탭에서 colors 배열 끝에 색상 문자열을 2개 더 추가해.\n예) const colors = [\"#00e5ff\", \"#ff2ad4\", \"#7CFF6B\", \"#FFD43B\", \"#ff6b6b\", \"#a78bfa\"];\n팁: #RRGGBB 형태의 16진수 색상 코드를 쓴다.",
        "HTML 탭에서 버튼 텍스트를 바꿔.\n<button id=\"btn\">색 바꾸기</button> → <button id=\"btn\">Change color</button>\n(버튼 id=\"btn\"은 JS가 찾는 이름이라 지우면 안 돼.)"
      ],
      en: [
        "In the HTML tab, replace the text inside <div class=\"neon\">...</div>.\nThen click Run to see it update.",
        "In the JS tab, add two more colors to the colors array. Use hex like #RRGGBB.",
        "In the HTML tab, change the button label text. Keep id=\"btn\" so JS can find it."
      ]
    },
    lessonTopicIds: ['getting-started', 'dom-events'],
    next: 'mission-2'
  },
  {
    id: 'mission-2',
    track: 'web',
    level: 'beginner',
    minutes: 15,
    stage: 'S2',
    title: {ko: '미션 2 — 타이핑 속도 미니게임', en: 'Mission 2 — Typing speed mini game'},
    pitch: {ko: '타이머/상태(state) 개념을 게임으로 배우기.', en: 'Learn timers and state by building a game.'},
    outcomes: {
      ko: ['setInterval / clearInterval', 'DOM 업데이트', '입력값 검증'],
      en: ['setInterval / clearInterval', 'Update the DOM', 'Validate input']
    },
    checklist: {
      ko: ['60초 모드 추가', '최고 기록(로컬스토리지) 저장', '정답일 때 애니메이션'],
      en: ['Add 60s mode', 'Store best score in localStorage', 'Add a success animation']
    },
    lessonTopicIds: ['timers', 'state-render', 'storage', 'dom-events'],
    next: 'mission-3'
  },
  {
    id: 'mission-3',
    track: 'web',
    level: 'beginner',
    minutes: 18,
    stage: 'S1',
    title: {ko: '미션 3 — 랜덤 점심 추천기', en: 'Mission 3 — Random lunch picker'},
    pitch: {ko: '배열/함수/조건문을 “실사용” 예제로 체감.', en: 'Feel arrays/functions/conditions through a real use-case.'},
    outcomes: {ko: ['배열 다루기', '랜덤', '함수로 코드 정리'], en: ['Work with arrays', 'Randomness', 'Refactor into functions']},
    checklist: {
      ko: ['싫어하는 메뉴 제외 기능', '주간 히스토리', 'UI 카드형으로 정리'],
      en: ['Exclude disliked menus', 'Weekly history', 'Make it look like cards']
    },
    lessonTopicIds: ['arrays-loops', 'state-render', 'dom-events'],
    next: 'mission-4'
  },
  {
    id: 'mission-4',
    track: 'web',
    level: 'beginner',
    minutes: 20,
    stage: 'S1',
    title: {ko: '미션 4 — 미니 퀴즈(점수/콤보)', en: 'Mission 4 — Mini quiz (score/combo)'},
    pitch: {ko: '상태/분기/리스트 렌더링을 한 번에.', en: 'State + branching + list rendering in one go.'},
    outcomes: {
      ko: ['문제 리스트 렌더링', '점수 계산', 'UI 상태(정답/오답)'],
      en: ['Render a list of questions', 'Calculate score', 'UI states (correct/wrong)']
    },
    checklist: {ko: ['문제 5개 추가', '콤보 보너스', '결과 공유 텍스트'], en: ['Add 5 questions', 'Combo bonus', 'Shareable summary text']},
    lessonTopicIds: ['state-render', 'arrays-loops', 'dom-events'],
    next: 'mission-5'
  },
  {
    id: 'mission-5',
    track: 'web',
    level: 'beginner',
    minutes: 22,
    stage: 'S1',
    title: {ko: '미션 5 — 간단 TODO + 필터', en: 'Mission 5 — TODO + filters'},
    pitch: {
      ko: '현업에서 제일 흔한 UI 패턴(추가/삭제/필터)을 한 번에 경험.',
      en: 'A real-world UI pattern: add/remove/filter.'
    },
    outcomes: {
      ko: ['배열 상태 업데이트', '컴포넌트적 사고(기능 분리)', '필터링'],
      en: ['Update array state', 'Decompose features', 'Filtering']
    },
    checklist: {ko: ['완료/미완료 필터', '로컬 저장', '키보드 단축키'], en: ['Done/todo filter', 'Local persistence', 'Keyboard shortcuts']},
    lessonTopicIds: ['state-render', 'arrays-loops', 'storage', 'dom-events'],
    next: 'mission-6'
  },

  {
    id: 'mission-6',
    track: 'web',
    level: 'beginner',
    minutes: 10,
    stage: 'S0',
    title: {ko: '미션 6 — 버튼 클릭 = 텍스트 바꾸기', en: 'Mission 6 — Click → change text'},
    pitch: {ko: 'querySelector/addEventListener로 “클릭하면 화면이 바뀐다”를 확실히 잡는 미션.', en: 'Your first solid DOM click interaction.'},
    outcomes: {ko: ['DOM 요소 선택', 'click 이벤트', 'textContent 업데이트'], en: ['Select DOM elements', 'Click events', 'Update textContent']},
    checklist: {ko: ['버튼 클릭 시 문구 변경', '두 가지 문구를 번갈아 토글', '초기 문구를 원하는 문장으로 변경'], en: ['Change text on click', 'Toggle two messages', 'Customize initial text']},
    lessonTopicIds: ['dom-events'],
    next: 'mission-7'
  },
  {
    id: 'mission-7',
    track: 'web',
    level: 'beginner',
    minutes: 12,
    stage: 'S0',
    title: {ko: '미션 7 — 카운터 +1 만들기', en: 'Mission 7 — Build a +1 counter'},
    pitch: {ko: '숫자 상태를 읽고/바꾸고/화면에 다시 그리는 루틴을 익힌다.', en: 'Learn number state + re-render loop.'},
    outcomes: {ko: ['parseInt/Number', '상태 변수', 'DOM 업데이트'], en: ['parseInt/Number', 'State variable', 'DOM updates']},
    checklist: {ko: ['+1 버튼 구현', '마이너스(-1) 버튼 추가', '0 아래로 안 내려가게 하기'], en: ['Implement +1', 'Add -1', 'Clamp at 0']},
    lessonTopicIds: ['state-render', 'dom-events'],
    next: 'mission-8'
  },
  {
    id: 'mission-8',
    track: 'web',
    level: 'beginner',
    minutes: 12,
    stage: 'S0',
    title: {ko: '미션 8 — 0으로 리셋 버튼 추가', en: 'Mission 8 — Add a reset button'},
    pitch: {ko: '중복 코드를 함수로 뽑아내는 감각을 만든다.', en: 'Reduce duplication by extracting functions.'},
    outcomes: {ko: ['함수로 render 분리', '초기화(reset)', '재사용'], en: ['Extract render()', 'Reset state', 'Reuse']},
    checklist: {ko: ['Reset 버튼 구현', 'render() 함수로 화면 업데이트 통일', '키보드 R로 리셋'], en: ['Reset button', 'Use render()', 'Press R to reset']},
    lessonTopicIds: ['state-render', 'dom-events'],
    next: 'mission-9'
  },
  {
    id: 'mission-9',
    track: 'web',
    level: 'beginner',
    minutes: 15,
    stage: 'S0',
    title: {ko: '미션 9 — 조건문(10이면 축하 메시지)', en: 'Mission 9 — If count==10 show congrats'},
    pitch: {ko: 'if 하나로 UI가 “상태에 따라” 달라지는 걸 체감한다.', en: 'Feel conditional UI with a single if.'},
    outcomes: {ko: ['if 조건문', 'classList로 표시/숨김', '조건 기반 UI'], en: ['if statements', 'classList show/hide', 'Conditional UI']},
    checklist: {ko: ['10이 되면 축하 메시지 표시', '9 이하로 내려가면 다시 숨김', '축하 메시지 스타일 꾸미기'], en: ['Show at 10', 'Hide below 10', 'Style the message']},
    lessonTopicIds: ['state-render', 'dom-events'],
    next: 'mission-10'
  },
  {
    id: 'mission-10',
    track: 'web',
    level: 'beginner',
    minutes: 15,
    stage: 'S1',
    title: {ko: '미션 10 — 랜덤 “오늘의 노래” 뽑기', en: 'Mission 10 — Random song picker'},
    pitch: {ko: '배열 + 랜덤을 조합해서 “추천기” 한 방에 만든다.', en: 'Combine arrays + randomness to build a recommender.'},
    outcomes: {ko: ['배열', 'Math.random/Math.floor', '랜덤 선택'], en: ['Arrays', 'Math.random/Math.floor', 'Random pick']},
    checklist: {ko: ['곡 리스트 배열 만들기', '버튼 누르면 랜덤 1곡 출력', '같은 곡 연속 방지(옵션)'], en: ['Build song list', 'Pick random on click', 'Avoid repeats (opt)']},
    lessonTopicIds: ['arrays-loops', 'dom-events'],
    next: 'mission-11'
  },
  {
    id: 'mission-11',
    track: 'web',
    level: 'beginner',
    minutes: 15,
    stage: 'S1',
    title: {ko: '미션 11 — 입력창 받아서 인사하기', en: 'Mission 11 — Greet from input'},
    pitch: {ko: 'input value를 읽고 form submit을 처리한다.', en: 'Handle input + form submit.'},
    outcomes: {ko: ['input.value', 'form submit', 'preventDefault'], en: ['input.value', 'Form submit', 'preventDefault']},
    checklist: {ko: ['이름을 입력하면 인사 문장 출력', '빈 값이면 에러 문구', 'Enter로도 동작'], en: ['Greet by name', 'Empty validation', 'Works on Enter']},
    lessonTopicIds: ['forms-validation', 'dom-events'],
    next: 'mission-12'
  },
  {
    id: 'mission-12',
    track: 'web',
    level: 'beginner',
    minutes: 15,
    stage: 'S1',
    title: {ko: '미션 12 — 체크박스 3개로 “준비완료” 판정', en: 'Mission 12 — 3 checkboxes readiness'},
    pitch: {ko: '여러 입력 상태를 AND로 묶어 조건 판정.', en: 'Combine multiple inputs with AND logic.'},
    outcomes: {ko: ['checked', 'AND 조건', 'change 이벤트'], en: ['checked', 'AND logic', 'change events']},
    checklist: {ko: ['3개 모두 체크되면 준비 완료', '하나라도 해제되면 미완료', '완료 시 버튼 활성화'], en: ['Ready when all checked', 'Not ready if any unchecked', 'Enable button when ready']},
    lessonTopicIds: ['forms-validation', 'state-render', 'dom-events'],
    next: 'mission-13'
  },
  {
    id: 'mission-13',
    track: 'web',
    level: 'beginner',
    minutes: 12,
    stage: 'S0',
    title: {ko: '미션 13 — 루피 버튼(토글)', en: 'Mission 13 — Luffy toggle'},
    pitch: {ko: 'boolean 상태 하나로 토글을 만든다.', en: 'Build a toggle from a boolean state.'},
    outcomes: {ko: ['boolean', 'toggle', 'UI 상태'], en: ['boolean', 'toggle', 'UI state']},
    checklist: {ko: ['버튼 클릭 시 ON/OFF 토글', '문구/이모지 같이 변경', '초기값 설정'], en: ['Toggle on click', 'Change label/emoji', 'Set initial state']},
    lessonTopicIds: ['state-render', 'dom-events'],
    next: 'mission-14'
  },
  {
    id: 'mission-14',
    track: 'web',
    level: 'beginner',
    minutes: 15,
    stage: 'S0',
    title: {ko: '미션 14 — 병원 호출벨(3번 누르면 호출됨)', en: 'Mission 14 — Call bell after 3 presses'},
    pitch: {ko: '누적 횟수(state)에 따라 분기되는 UI를 만든다.', en: 'Branch UI by accumulated state.'},
    outcomes: {ko: ['state', '조건 분기', '메시지 업데이트'], en: ['state', 'branching', 'message updates']},
    checklist: {ko: ['3번 누르면 “호출됨” 표시', '리셋 버튼 추가', '진동/소리(옵션)'], en: ['Show called at 3', 'Add reset', 'Vibrate/sound (opt)']},
    lessonTopicIds: ['state-render', 'dom-events'],
    next: 'mission-15'
  },
  {
    id: 'mission-15',
    track: 'web',
    level: 'beginner',
    minutes: 15,
    stage: 'S1',
    title: {ko: '미션 15 — 타이머 흉내(3..2..1)', en: 'Mission 15 — Countdown timer'},
    pitch: {ko: 'setTimeout으로 순차 UI 업데이트를 만든다.', en: 'Use setTimeout for sequential UI updates.'},
    outcomes: {ko: ['setTimeout', '순차 업데이트', 'UI 상태 머신 맛보기'], en: ['setTimeout', 'Sequential updates', 'Mini state machine']},
    checklist: {ko: ['Start 누르면 3→2→1', '끝나면 GO! 출력', '중복 시작 방지'], en: ['3→2→1', 'Show GO!', 'Prevent double start']},
    lessonTopicIds: ['timers', 'state-render', 'dom-events']
  }  ,
  {
    id: 'mission-16',
    track: 'web',
    level: 'beginner',
    minutes: 14,
    stage: 'S0',
    title: {ko: '미션 16 — classList로 강조 토글', en: 'Mission 16'} ,
    pitch: {ko: '버튼 클릭으로 클래스(on/off)를 토글해서 스타일을 바꿔본다.', en: 'Mission 16'} ,
    outcomes: {ko: ["classList.add/remove/toggle","click 이벤트","상태를 DOM에 반영"], en: []},
    checklist: {ko: ["버튼 클릭 시 카드가 강조(on) 상태로 토글","ON일 때 버튼 문구 변경","초기 상태는 OFF"], en: []},
    lessonTopicIds: ['dom-events', 'state-render'],
    next: 'mission-17'
  }  ,
  {
    id: 'mission-17',
    track: 'web',
    level: 'beginner',
    minutes: 16,
    stage: 'S1',
    title: {ko: '미션 17 — 리스트 아이템 클릭(이벤트 위임)', en: 'Mission 17'} ,
    pitch: {ko: '여러 항목을 한 번에 처리하는 이벤트 위임을 배운다.', en: 'Mission 17'} ,
    outcomes: {ko: ["event.target","이벤트 위임","dataset 사용"], en: []},
    checklist: {ko: ["리스트에서 항목 클릭 시 선택 표시","선택된 항목 텍스트를 상단에 표시","다른 항목 클릭 시 선택이 이동"], en: []},
    lessonTopicIds: ['dom-events', 'state-render', 'arrays-loops'],
    next: 'mission-18'
  }  ,
  {
    id: 'mission-18',
    track: 'web',
    level: 'beginner',
    minutes: 18,
    stage: 'S1',
    title: {ko: '미션 18 — 테마 토글 + localStorage 저장', en: 'Mission 18'} ,
    pitch: {ko: '토글 상태를 저장해서 새로고침해도 유지되게 만든다.', en: 'Mission 18'} ,
    outcomes: {ko: ["localStorage.getItem/setItem","초기화 로직","classList로 테마 적용"], en: []},
    checklist: {ko: ["테마 버튼으로 dark/light 토글","선택한 테마를 localStorage에 저장","새로고침 후에도 유지"], en: []},
    lessonTopicIds: ['dom-events', 'state-render', 'storage'],
    next: 'mission-19'
  }  ,
  {
    id: 'mission-19',
    track: 'web',
    level: 'beginner',
    minutes: 20,
    stage: 'S1',
    title: {ko: '미션 19 — 입력 검증(이메일) + 에러 표시', en: 'Mission 19'} ,
    pitch: {ko: '정규식/조건문으로 입력을 검증하고 UI로 피드백한다.', en: 'Mission 19'} ,
    outcomes: {ko: ["input 이벤트","조건문","간단한 정규식"], en: []},
    checklist: {ko: ["이메일 형식이면 OK 표시","형식이 아니면 에러 메시지 표시","빈 값이면 에러 숨김"], en: []},
    lessonTopicIds: ['forms-validation', 'dom-events', 'state-render'],
    next: 'mission-20'
  }  ,
  {
    id: 'mission-20',
    track: 'web',
    level: 'beginner',
    minutes: 18,
    stage: 'S1',
    title: {ko: '미션 20 — 탭 UI 만들기', en: 'Mission 20'} ,
    pitch: {ko: '버튼으로 섹션을 전환하는 탭 UI를 만든다.', en: 'Mission 20'} ,
    outcomes: {ko: ["data-*","classList로 show/hide","선택 상태 관리"], en: []},
    checklist: {ko: ["탭 버튼 2개로 패널 전환","활성 탭에 on 클래스","초기 탭은 첫 번째"], en: []},
    lessonTopicIds: ['dom-events', 'state-render'],
    next: 'mission-21'
  }  ,
  {
    id: 'mission-21',
    track: 'web',
    level: 'beginner',
    minutes: 22,
    stage: 'S1',
    title: {ko: '미션 21 — 스톱워치(시작/정지)', en: 'Mission 21'} ,
    pitch: {ko: 'setInterval로 시간을 올리고 시작/정지를 구현한다.', en: 'Mission 21'} ,
    outcomes: {ko: ["setInterval/clearInterval","상태 변수","버튼 상태"], en: []},
    checklist: {ko: ["Start 클릭 시 1초마다 증가","Stop 클릭 시 멈춤","Reset으로 0"], en: []},
    lessonTopicIds: ['timers', 'dom-events', 'state-render'],
    next: 'mission-22'
  }  ,
  {
    id: 'mission-22',
    track: 'web',
    level: 'beginner',
    minutes: 18,
    stage: 'S1',
    title: {ko: '미션 22 — 검색어로 리스트 필터', en: 'Mission 22'} ,
    pitch: {ko: 'input 값으로 리스트를 필터링해서 보여준다.', en: 'Mission 22'} ,
    outcomes: {ko: ["toLowerCase/includes","리스트 렌더","input 이벤트"], en: []},
    checklist: {ko: ["검색어 입력 시 포함 항목만 표시","빈 값이면 전체 표시","대소문자 무시"], en: []},
    lessonTopicIds: ['arrays-loops', 'dom-events', 'state-render'],
    next: 'mission-23'
  }  ,
  {
    id: 'mission-23',
    track: 'web',
    level: 'beginner',
    minutes: 16,
    stage: 'S1',
    title: {ko: '미션 23 — 모달 열기/닫기', en: 'Mission 23'} ,
    pitch: {ko: '오버레이(모달)를 열고 닫는 기본 패턴을 만든다.', en: 'Mission 23'} ,
    outcomes: {ko: ["classList로 표시/숨김","키보드 Escape","이벤트 처리"], en: []},
    checklist: {ko: ["Open 클릭 시 모달 표시","Close/배경 클릭 시 닫힘","Escape로 닫힘"], en: []},
    lessonTopicIds: ['dom-events', 'state-render'],
    next: 'mission-24'
  }  ,
  {
    id: 'mission-24',
    track: 'web',
    level: 'beginner',
    minutes: 18,
    stage: 'S1',
    title: {ko: '미션 24 — 키보드 단축키(Enter로 추가)', en: 'Mission 24'} ,
    pitch: {ko: 'keypress가 아니라 keydown과 Enter 키를 처리한다.', en: 'Mission 24'} ,
    outcomes: {ko: ["keydown 이벤트","Enter 처리","배열 + 렌더"], en: []},
    checklist: {ko: ["Enter로 항목 추가","빈 값이면 추가 안 함","추가 후 input 비움"], en: []},
    lessonTopicIds: ['dom-events', 'state-render', 'arrays-loops'],
    next: 'mission-25'
  }  ,
  {
    id: 'mission-25',
    track: 'web',
    level: 'beginner',
    minutes: 24,
    stage: 'S2',
    title: {ko: '미션 25 — JSON 저장/불러오기(Export/Import)', en: 'Mission 25'} ,
    pitch: {ko: '데이터를 JSON으로 내보내고 다시 불러오는 흐름을 만든다.', en: 'Mission 25'} ,
    outcomes: {ko: ["JSON.stringify/parse","textarea","에러 처리"], en: []},
    checklist: {ko: ["Export로 현재 items를 JSON으로 출력","Import로 JSON을 읽어 items 갱신","잘못된 JSON이면 에러 표시"], en: []},
    lessonTopicIds: ['dom-events', 'state-render', 'arrays-loops']
  }  ,
  {
    id: 'mission-26',
    track: 'web',
    level: 'beginner',
    minutes: 16,
    stage: 'S1',
    title: {ko: '미션 26 — 버튼 3개로 탭 전환(Show/Hide)', en: 'Mission 26'} ,
    pitch: {ko: '세 버튼으로 섹션을 바꿔보며 classList/show-hide 패턴을 고정한다.', en: 'Mission 26'} ,
    outcomes: {ko: ["classList","data-*","간단한 탭 UI"], en: []},
    checklist: {ko: ["탭 버튼 클릭 시 패널 전환","활성 탭에 on 클래스","초기 탭은 첫 번째"], en: []},
    lessonTopicIds: ['dom-events', 'state-render'],
    next: 'mission-27'
  }  ,
  {
    id: 'mission-27',
    track: 'web',
    level: 'beginner',
    minutes: 14,
    stage: 'S1',
    title: {ko: '미션 27 — 체크박스 모두 체크되면 버튼 활성화', en: 'Mission 27'} ,
    pitch: {ko: '여러 입력 상태를 AND로 묶어 UI를 제어한다.', en: 'Mission 27'} ,
    outcomes: {ko: ["checked","change 이벤트","버튼 disabled"], en: []},
    checklist: {ko: ["3개 모두 체크되면 버튼 enabled","하나라도 해제되면 disabled","상태 문구 업데이트"], en: []},
    lessonTopicIds: ['forms-validation', 'dom-events', 'state-render'],
    next: 'mission-28'
  }  ,
  {
    id: 'mission-28',
    track: 'web',
    level: 'beginner',
    minutes: 18,
    stage: 'S1',
    title: {ko: '미션 28 — 입력창 필터로 리스트 검색', en: 'Mission 28'} ,
    pitch: {ko: 'input 이벤트로 리스트를 필터링한다.', en: 'Mission 28'} ,
    outcomes: {ko: ["input 이벤트","includes","리스트 렌더"], en: []},
    checklist: {ko: ["검색어 입력 시 포함 항목만 표시","빈 값이면 전체 표시","대소문자 무시"], en: []},
    lessonTopicIds: ['arrays-loops', 'dom-events', 'state-render'],
    next: 'mission-29'
  }  ,
  {
    id: 'mission-29',
    track: 'web',
    level: 'beginner',
    minutes: 18,
    stage: 'S1',
    title: {ko: '미션 29 — Enter로 항목 추가(키보드)', en: 'Mission 29'} ,
    pitch: {ko: 'keydown + Enter 처리로 입력 UX를 만든다.', en: 'Mission 29'} ,
    outcomes: {ko: ["keydown","Enter 처리","배열 상태"], en: []},
    checklist: {ko: ["Enter로 리스트에 추가","빈 값이면 추가 안 함","추가 후 input 비움"], en: []},
    lessonTopicIds: ['dom-events', 'state-render', 'arrays-loops'],
    next: 'mission-30'
  }  ,
  {
    id: 'mission-30',
    track: 'web',
    level: 'beginner',
    minutes: 20,
    stage: 'S1',
    title: {ko: '미션 30 — 모달 열기/닫기(배경/ESC)', en: 'Mission 30'} ,
    pitch: {ko: '오버레이 UI 기본 패턴을 만든다.', en: 'Mission 30'} ,
    outcomes: {ko: ["classList","ESC 키","이벤트 전파"], en: []},
    checklist: {ko: ["Open 클릭 시 모달 표시","배경 클릭/Close 클릭 시 닫힘","ESC로 닫힘"], en: []},
    lessonTopicIds: ['dom-events', 'state-render'],
    next: 'mission-31'
  }  ,
  {
    id: 'mission-31',
    track: 'web',
    level: 'beginner',
    minutes: 14,
    stage: 'S1',
    title: {ko: '미션 31 — 랜덤 배경색 뽑기(배열)', en: 'Mission 31'} ,
    pitch: {ko: '배열 + 랜덤으로 UI를 바꿔본다.', en: 'Mission 31'} ,
    outcomes: {ko: ["배열","Math.random","style 변경"], en: []},
    checklist: {ko: ["버튼 클릭 시 배경색 변경","같은 색 연속 방지(옵션)","현재 색 텍스트 표시"], en: []},
    lessonTopicIds: ['arrays-loops', 'dom-events'],
    next: 'mission-32'
  }  ,
  {
    id: 'mission-32',
    track: 'web',
    level: 'beginner',
    minutes: 20,
    stage: 'S1',
    title: {ko: '미션 32 — 5초 카운트다운 후 GO', en: 'Mission 32'} ,
    pitch: {ko: 'setInterval / clearInterval로 타이머 상태를 만든다.', en: 'Mission 32'} ,
    outcomes: {ko: ["setInterval","clearInterval","상태 업데이트"], en: []},
    checklist: {ko: ["Start 누르면 5→0 카운트다운","끝나면 GO 표시","중복 시작 방지"], en: []},
    lessonTopicIds: ['timers', 'dom-events', 'state-render'],
    next: 'mission-33'
  }  ,
  {
    id: 'mission-33',
    track: 'web',
    level: 'beginner',
    minutes: 18,
    stage: 'S1',
    title: {ko: '미션 33 — 별점 선택(라디오 UI)', en: 'Mission 33'} ,
    pitch: {ko: '여러 버튼 중 하나를 선택하는 UI를 만든다.', en: 'Mission 33'} ,
    outcomes: {ko: ["이벤트 위임","dataset","선택 상태"], en: []},
    checklist: {ko: ["별 1~5 중 클릭한 값 표시","선택된 별을 강조","다시 클릭하면 값이 바뀜"], en: []},
    lessonTopicIds: ['dom-events', 'state-render'],
    next: 'mission-34'
  }  ,
  {
    id: 'mission-34',
    track: 'web',
    level: 'beginner',
    minutes: 16,
    stage: 'S1',
    title: {ko: '미션 34 — 로컬스토리지에 텍스트 저장/복원', en: 'Mission 34'} ,
    pitch: {ko: '저장/복원으로 ‘새로고침해도 유지’ 경험을 만든다.', en: 'Mission 34'} ,
    outcomes: {ko: ["localStorage","초기 로드","input 이벤트"], en: []},
    checklist: {ko: ["입력하면 localStorage에 저장","새로고침 시 복원","Clear 버튼으로 삭제"], en: []},
    lessonTopicIds: ['storage', 'dom-events', 'state-render'],
    next: 'mission-35'
  }  ,
  {
    id: 'mission-35',
    track: 'web',
    level: 'beginner',
    minutes: 22,
    stage: 'S1',
    title: {ko: '미션 35 — 간단 계산기(+, -, ×, ÷)', en: 'Mission 35'} ,
    pitch: {ko: '입력 2개와 연산 버튼 4개로 계산 결과를 만든다.', en: 'Mission 35'} ,
    outcomes: {ko: ["Number 변환","이벤트 핸들러","조건 처리"], en: []},
    checklist: {ko: ["사칙연산 버튼 동작","NaN 처리(빈값/문자)","결과를 화면에 표시"], en: []},
    lessonTopicIds: ['forms-validation', 'dom-events', 'state-render'],
  }  ,
  {
    id: 'mission-36',
    track: 'web',
    level: 'beginner',
    minutes: 16,
    stage: 'S1',
    title: {ko: '미션 36 — 드롭다운(select)으로 색 테마 바꾸기', en: 'Mission 36'} ,
    pitch: {ko: 'select change 이벤트로 테마를 바꿔본다.', en: 'Mission 36'} ,
    outcomes: {ko: ["change 이벤트","select.value","classList"], en: []},
    checklist: {ko: ["테마 선택 시 body 클래스 변경","선택값을 화면에 표시","기본값은 dark"], en: []},
    lessonTopicIds: ['dom-events', 'state-render'],
    next: 'mission-37'
  }  ,
  {
    id: 'mission-37',
    track: 'web',
    level: 'beginner',
    minutes: 20,
    stage: 'S1',
    title: {ko: '미션 37 — 더보기 버튼으로 리스트 3개씩 추가 로드', en: 'Mission 37'} ,
    pitch: {ko: 'slice로 pagination 느낌을 만든다.', en: 'Mission 37'} ,
    outcomes: {ko: ["배열","slice","버튼 상태"], en: []},
    checklist: {ko: ["More 클릭 시 3개씩 추가","끝까지 가면 버튼 disabled","현재 개수 표시"], en: []},
    lessonTopicIds: ['arrays-loops', 'dom-events', 'state-render'],
    next: 'mission-38'
  }  ,
  {
    id: 'mission-38',
    track: 'web',
    level: 'beginner',
    minutes: 14,
    stage: 'S0',
    title: {ko: '미션 38 — 토글 스위치 만들기(ON/OFF)', en: 'Mission 38'} ,
    pitch: {ko: 'boolean 상태 하나로 UI를 토글한다.', en: 'Mission 38'} ,
    outcomes: {ko: ["boolean","classList.toggle","상태 표시"], en: []},
    checklist: {ko: ["클릭 시 ON/OFF 토글","상태 문구 변경","스위치 스타일 변경"], en: []},
    lessonTopicIds: ['dom-events', 'state-render'],
    next: 'mission-39'
  }  ,
  {
    id: 'mission-39',
    track: 'web',
    level: 'beginner',
    minutes: 18,
    stage: 'S1',
    title: {ko: '미션 39 — 숫자 입력 검증(1~10) + 에러 표시', en: 'Mission 39'} ,
    pitch: {ko: '조건문으로 입력을 검증하고 메시지를 보여준다.', en: 'Mission 39'} ,
    outcomes: {ko: ["Number()","조건문","에러 UI"], en: []},
    checklist: {ko: ["1~10이면 OK","범위 밖이면 에러","빈 값이면 안내"], en: []},
    lessonTopicIds: ['forms-validation', 'dom-events', 'state-render'],
    next: 'mission-40'
  }  ,
  {
    id: 'mission-40',
    track: 'web',
    level: 'beginner',
    minutes: 20,
    stage: 'S1',
    title: {ko: '미션 40 — 간단한 정렬 버튼(오름/내림)', en: 'Mission 40'} ,
    pitch: {ko: 'sort로 정렬을 바꾼다.', en: 'Mission 40'} ,
    outcomes: {ko: ["Array.sort","렌더","상태 유지"], en: []},
    checklist: {ko: ["오름차순 정렬","내림차순 정렬","현재 정렬 표시"], en: []},
    lessonTopicIds: ['arrays-loops', 'dom-events', 'state-render'],
    next: 'mission-41'
  }  ,
  {
    id: 'mission-41',
    track: 'web',
    level: 'beginner',
    minutes: 24,
    stage: 'S2',
    title: {ko: '미션 41 — fetch로 랜덤 명언 가져오기(실패 처리)', en: 'Mission 41'} ,
    pitch: {ko: 'fetch/async 흐름과 에러 처리를 익힌다.', en: 'Mission 41'} ,
    outcomes: {ko: ["fetch","async/await","에러 처리"], en: []},
    checklist: {ko: ["버튼 클릭 시 로딩 표시","성공 시 문구 표시","실패 시 에러 표시"], en: []},
    lessonTopicIds: ['fetch-async', 'dom-events', 'state-render'],
    next: 'mission-42'
  }  ,
  {
    id: 'mission-42',
    track: 'web',
    level: 'beginner',
    minutes: 16,
    stage: 'S1',
    title: {ko: '미션 42 — 로딩 스피너 표시/숨김', en: 'Mission 42'} ,
    pitch: {ko: '비동기 작업 중 상태 표시를 만든다.', en: 'Mission 42'} ,
    outcomes: {ko: ["classList","상태","setTimeout"], en: []},
    checklist: {ko: ["Start 누르면 spinner 표시","2초 후 숨김","중복 시작 방지"], en: []},
    lessonTopicIds: ['timers', 'dom-events', 'state-render'],
    next: 'mission-43'
  }  ,
  {
    id: 'mission-43',
    track: 'web',
    level: 'beginner',
    minutes: 18,
    stage: 'S1',
    title: {ko: '미션 43 — 복사 버튼(클립보드) + 성공 메시지', en: 'Mission 43'} ,
    pitch: {ko: 'clipboard API를 경험한다.', en: 'Mission 43'} ,
    outcomes: {ko: ["navigator.clipboard","async","UX 메시지"], en: []},
    checklist: {ko: ["Copy 클릭 시 복사 시도","성공 메시지 표시","실패 메시지 표시"], en: []},
    lessonTopicIds: ['dom-events', 'state-render'],
    next: 'mission-44'
  }  ,
  {
    id: 'mission-44',
    track: 'web',
    level: 'beginner',
    minutes: 16,
    stage: 'S1',
    title: {ko: '미션 44 — 간단한 마우스 좌표 트래커', en: 'Mission 44'} ,
    pitch: {ko: 'mousemove 이벤트를 써본다.', en: 'Mission 44'} ,
    outcomes: {ko: ["mousemove","event.clientX/Y","렌더"], en: []},
    checklist: {ko: ["마우스 움직이면 좌표 표시","좌표 박스 스타일","초기 문구 표시"], en: []},
    lessonTopicIds: ['dom-events', 'state-render'],
    next: 'mission-45'
  }  ,
  {
    id: 'mission-45',
    track: 'web',
    level: 'beginner',
    minutes: 24,
    stage: 'S2',
    title: {ko: '미션 45 — 미니 폼 검증(이름/이메일) + submit 막기', en: 'Mission 45'} ,
    pitch: {ko: 'submit 이벤트와 preventDefault를 익힌다.', en: 'Mission 45'} ,
    outcomes: {ko: ["form submit","preventDefault","검증"], en: []},
    checklist: {ko: ["이름/이메일 유효하면 OK","유효하지 않으면 에러","submit 시 새로고침 방지"], en: []},
    lessonTopicIds: ['forms-validation', 'dom-events', 'state-render'],
  }  ,
  {
    id: 'mission-46',
    track: 'web',
    level: 'beginner',
    minutes: 16,
    stage: 'S1',
    title: {ko: '미션 46 — 라디오 버튼으로 배송 옵션 선택하기', en: 'Mission 46'} ,
    pitch: {ko: 'change 이벤트로 선택 상태를 읽어 UI에 반영한다.', en: 'Mission 46'} ,
    outcomes: {ko: ["radio","change 이벤트","querySelector"], en: []},
    checklist: {ko: ["옵션 선택 시 가격 표시","기본값 preset","선택값 텍스트 출력"], en: []},
    lessonTopicIds: ['forms-validation', 'dom-events', 'state-render'],
    next: 'mission-47'
  }  ,
  {
    id: 'mission-47',
    track: 'web',
    level: 'beginner',
    minutes: 14,
    stage: 'S1',
    title: {ko: '미션 47 — 체크박스 동의(terms) 없으면 버튼 비활성화', en: 'Mission 47'} ,
    pitch: {ko: 'checked 상태로 CTA를 제어한다.', en: 'Mission 47'} ,
    outcomes: {ko: ["checkbox","disabled","상태 렌더"], en: []},
    checklist: {ko: ["체크하면 버튼 활성","해제하면 비활성","상태 문구 표시"], en: []},
    lessonTopicIds: ['forms-validation', 'dom-events', 'state-render'],
    next: 'mission-48'
  }  ,
  {
    id: 'mission-48',
    track: 'web',
    level: 'beginner',
    minutes: 16,
    stage: 'S1',
    title: {ko: '미션 48 — textarea 글자 수 카운터(최대 100)', en: 'Mission 48'} ,
    pitch: {ko: 'input 이벤트로 length를 추적한다.', en: 'Mission 48'} ,
    outcomes: {ko: ["textarea","input 이벤트","length"], en: []},
    checklist: {ko: ["현재 글자 수 표시","100 초과 시 경고 스타일","남은 글자 표시"], en: []},
    lessonTopicIds: ['dom-events', 'state-render'],
    next: 'mission-49'
  }  ,
  {
    id: 'mission-49',
    track: 'web',
    level: 'beginner',
    minutes: 20,
    stage: 'S1',
    title: {ko: '미션 49 — 간단한 탭 UI(2개) 만들기', en: 'Mission 49'} ,
    pitch: {ko: '버튼으로 active 상태를 바꿔 패널을 전환한다.', en: 'Mission 49'} ,
    outcomes: {ko: ["dataset","classList","조건 렌더"], en: []},
    checklist: {ko: ["Tab 클릭 시 패널 변경","active 스타일","초기 탭 설정"], en: []},
    lessonTopicIds: ['dom-events', 'state-render'],
    next: 'mission-50'
  }  ,
  {
    id: 'mission-50',
    track: 'web',
    level: 'beginner',
    minutes: 22,
    stage: 'S1',
    title: {ko: '미션 50 — 타이머(초) 시작/정지', en: 'Mission 50'} ,
    pitch: {ko: 'setInterval을 안전하게 다루는 법을 익힌다.', en: 'Mission 50'} ,
    outcomes: {ko: ["setInterval","clearInterval","상태"], en: []},
    checklist: {ko: ["Start 누르면 1초마다 증가","Stop 누르면 멈춤","중복 interval 방지"], en: []},
    lessonTopicIds: ['timers', 'dom-events', 'state-render'],
    next: 'mission-51'
  }  ,
  {
    id: 'mission-51',
    track: 'web',
    level: 'beginner',
    minutes: 20,
    stage: 'S1',
    title: {ko: '미션 51 — localStorage로 닉네임 저장/불러오기', en: 'Mission 51'} ,
    pitch: {ko: '로컬 저장으로 새로고침 후에도 상태를 유지한다.', en: 'Mission 51'} ,
    outcomes: {ko: ["localStorage","JSON","초기 로드"], en: []},
    checklist: {ko: ["Save 클릭 시 저장","Load 시 반영","저장 여부 메시지"], en: []},
    lessonTopicIds: ['storage', 'dom-events', 'state-render'],
    next: 'mission-52'
  }  ,
  {
    id: 'mission-52',
    track: 'web',
    level: 'beginner',
    minutes: 16,
    stage: 'S1',
    title: {ko: '미션 52 — 키보드 단축키(Enter)로 전송', en: 'Mission 52'} ,
    pitch: {ko: 'keydown 이벤트에서 key를 판별한다.', en: 'Mission 52'} ,
    outcomes: {ko: ["keydown","event.key","리스트 추가"], en: []},
    checklist: {ko: ["Enter 누르면 항목 추가","빈 값은 무시","입력창 비우기"], en: []},
    lessonTopicIds: ['dom-events', 'state-render', 'arrays-loops'],
    next: 'mission-53'
  }  ,
  {
    id: 'mission-53',
    track: 'web',
    level: 'beginner',
    minutes: 24,
    stage: 'S2',
    title: {ko: '미션 53 — 이미지 미리보기(file input)', en: 'Mission 53'} ,
    pitch: {ko: 'FileReader로 선택한 파일을 미리 본다.', en: 'Mission 53'} ,
    outcomes: {ko: ["input type=file","FileReader","data URL"], en: []},
    checklist: {ko: ["파일 선택 시 img에 표시","파일 없으면 안내","이미지 스타일"], en: []},
    lessonTopicIds: ['dom-events', 'state-render'],
    next: 'mission-54'
  }  ,
  {
    id: 'mission-54',
    track: 'web',
    level: 'beginner',
    minutes: 26,
    stage: 'S2',
    title: {ko: '미션 54 — 간단한 드래그 앤 드롭 정렬(2개 박스)', en: 'Mission 54'} ,
    pitch: {ko: 'dragstart/drop 이벤트로 위치를 바꾼다.', en: 'Mission 54'} ,
    outcomes: {ko: ["dragstart","dragover","drop"], en: []},
    checklist: {ko: ["A/B 박스 드래그로 순서 교체","dragover preventDefault","상태 텍스트 표시"], en: []},
    lessonTopicIds: ['dom-events', 'state-render'],
    next: 'mission-55'
  }  ,
  {
    id: 'mission-55',
    track: 'web',
    level: 'beginner',
    minutes: 18,
    stage: 'S1',
    title: {ko: '미션 55 — 간단한 검색 필터(리스트)', en: 'Mission 55'} ,
    pitch: {ko: '입력값으로 리스트를 필터링한다.', en: 'Mission 55'} ,
    outcomes: {ko: ["filter","toLowerCase","렌더"], en: []},
    checklist: {ko: ["입력 시 실시간 필터","매치 없으면 안내","대소문자 무시"], en: []},
    lessonTopicIds: ['arrays-loops', 'dom-events', 'state-render'],
  }  ,
  {
    id: 'mission-56',
    track: 'web',
    level: 'beginner',
    minutes: 16,
    stage: 'S1',
    title: {ko: '미션 56 — 카드 뒤집기(클릭 토글)', en: 'Mission 56'} ,
    pitch: {ko: 'classList.toggle로 앞/뒤를 전환한다.', en: 'Mission 56'} ,
    outcomes: {ko: ["classList.toggle","상태","CSS transform"], en: []},
    checklist: {ko: ["카드 클릭 시 뒤집기","앞/뒤 텍스트","부드러운 애니메이션"], en: []},
    lessonTopicIds: ['dom-events', 'state-render'],
    next: 'mission-57'
  }  ,
  {
    id: 'mission-57',
    track: 'web',
    level: 'beginner',
    minutes: 22,
    stage: 'S1',
    title: {ko: '미션 57 — 아코디언(FAQ) 열고 닫기', en: 'Mission 57'} ,
    pitch: {ko: '하나만 열리도록 상태를 관리한다.', en: 'Mission 57'} ,
    outcomes: {ko: ["이벤트 위임","dataset","조건 렌더"], en: []},
    checklist: {ko: ["질문 클릭 시 답변 토글","다른 항목 클릭 시 이전 닫기","초기 모두 닫힘"], en: []},
    lessonTopicIds: ['dom-events', 'state-render'],
    next: 'mission-58'
  }  ,
  {
    id: 'mission-58',
    track: 'web',
    level: 'beginner',
    minutes: 16,
    stage: 'S1',
    title: {ko: '미션 58 — 진행률 바(버튼으로 +10%)', en: 'Mission 58'} ,
    pitch: {ko: '숫자 상태를 width 스타일로 연결한다.', en: 'Mission 58'} ,
    outcomes: {ko: ["style.width","Math.min","렌더"], en: []},
    checklist: {ko: ["클릭 시 10% 증가","최대 100% 제한","퍼센트 텍스트 표시"], en: []},
    lessonTopicIds: ['dom-events', 'state-render'],
    next: 'mission-59'
  }  ,
  {
    id: 'mission-59',
    track: 'web',
    level: 'beginner',
    minutes: 14,
    stage: 'S0',
    title: {ko: '미션 59 — 랜덤 배경색 생성 버튼', en: 'Mission 59'} ,
    pitch: {ko: 'Math.random으로 색을 만들고 스타일에 적용한다.', en: 'Mission 59'} ,
    outcomes: {ko: ["Math.random","toString(16)","style"], en: []},
    checklist: {ko: ["버튼 클릭 시 배경색 변경","hex 코드 표시","텍스트 대비 유지"], en: []},
    lessonTopicIds: ['dom-events', 'state-render'],
    next: 'mission-60'
  }  ,
  {
    id: 'mission-60',
    track: 'web',
    level: 'beginner',
    minutes: 18,
    stage: 'S1',
    title: {ko: '미션 60 — 숫자 스텝퍼(+/-) 만들기', en: 'Mission 60'} ,
    pitch: {ko: '버튼으로 값을 증가/감소시키고 최소/최대를 제한한다.', en: 'Mission 60'} ,
    outcomes: {ko: ["상태","Math.min/max","렌더"], en: []},
    checklist: {ko: ["+ 클릭 시 +1","- 클릭 시 -1","0~10 제한"], en: []},
    lessonTopicIds: ['dom-events', 'state-render'],
    next: 'mission-61'
  }  ,
  {
    id: 'mission-61',
    track: 'web',
    level: 'beginner',
    minutes: 22,
    stage: 'S1',
    title: {ko: '미션 61 — 배열 셔플 버튼(Fisher–Yates)', en: 'Mission 61'} ,
    pitch: {ko: '셔플 알고리즘으로 순서를 랜덤하게 바꾼다.', en: 'Mission 61'} ,
    outcomes: {ko: ["배열","루프","swap"], en: []},
    checklist: {ko: ["Shuffle 클릭 시 순서 변경","원본 배열 복사","렌더 업데이트"], en: []},
    lessonTopicIds: ['arrays-loops', 'dom-events', 'state-render'],
    next: 'mission-62'
  }  ,
  {
    id: 'mission-62',
    track: 'web',
    level: 'beginner',
    minutes: 26,
    stage: 'S2',
    title: {ko: '미션 62 — 모달 열기/닫기(ESC/오버레이)', en: 'Mission 62'} ,
    pitch: {ko: '키보드 이벤트와 오버레이 클릭을 처리한다.', en: 'Mission 62'} ,
    outcomes: {ko: ["keydown","Escape","이벤트"], en: []},
    checklist: {ko: ["Open 클릭 시 모달 표시","오버레이 클릭/ESC로 닫기","닫히면 원래 상태"], en: []},
    lessonTopicIds: ['dom-events', 'state-render'],
    next: 'mission-63'
  }  ,
  {
    id: 'mission-63',
    track: 'web',
    level: 'beginner',
    minutes: 20,
    stage: 'S1',
    title: {ko: '미션 63 — 평점 별점(1~5) 선택 UI', en: 'Mission 63'} ,
    pitch: {ko: 'data-value로 선택 값을 다룬다.', en: 'Mission 63'} ,
    outcomes: {ko: ["dataset","classList","상태"], en: []},
    checklist: {ko: ["별 클릭 시 값 저장","선택된 별 하이라이트","현재 점수 표시"], en: []},
    lessonTopicIds: ['dom-events', 'state-render'],
    next: 'mission-64'
  }  ,
  {
    id: 'mission-64',
    track: 'web',
    level: 'beginner',
    minutes: 22,
    stage: 'S1',
    title: {ko: '미션 64 — 간단한 페이지네이션(Prev/Next)', en: 'Mission 64'} ,
    pitch: {ko: '인덱스를 이동시키며 항목을 보여준다.', en: 'Mission 64'} ,
    outcomes: {ko: ["인덱스","disabled","렌더"], en: []},
    checklist: {ko: ["Prev/Next로 이동","끝에서 버튼 비활성","현재 페이지 표시"], en: []},
    lessonTopicIds: ['arrays-loops', 'dom-events', 'state-render'],
    next: 'mission-65'
  }  ,
  {
    id: 'mission-65',
    track: 'web',
    level: 'beginner',
    minutes: 18,
    stage: 'S1',
    title: {ko: '미션 65 — 간단한 정규식 이메일 검증', en: 'Mission 65'} ,
    pitch: {ko: 'regex로 이메일 패턴을 검사한다.', en: 'Mission 65'} ,
    outcomes: {ko: ["RegExp","test()","상태 표시"], en: []},
    checklist: {ko: ["입력 시 즉시 검증","유효하면 ok 스타일","유효하지 않으면 err 스타일"], en: []},
    lessonTopicIds: ['forms-validation', 'dom-events', 'state-render'],
  }  ,
  {
    id: 'mission-66',
    track: 'web',
    level: 'beginner',
    minutes: 20,
    stage: 'S1',
    title: {ko: '미션 66 — Dark mode 토글(저장 포함)', en: 'Mission 66'} ,
    pitch: {ko: '토글 상태를 localStorage에 저장해 유지한다.', en: 'Mission 66'} ,
    outcomes: {ko: ["classList","localStorage","렌더"], en: []},
    checklist: {ko: ["버튼으로 dark 클래스 토글","상태 저장/로드","현재 모드 표시"], en: []},
    lessonTopicIds: ['storage', 'dom-events', 'state-render'],
    next: 'mission-67'
  }  ,
  {
    id: 'mission-67',
    track: 'web',
    level: 'beginner',
    minutes: 24,
    stage: 'S2',
    title: {ko: '미션 67 — 숫자 맞추기(랜덤 1~20)', en: 'Mission 67'} ,
    pitch: {ko: '랜덤 값과 입력을 비교해 힌트를 준다.', en: 'Mission 67'} ,
    outcomes: {ko: ["Math.random","Number()","조건문"], en: []},
    checklist: {ko: ["Guess 버튼으로 비교","UP/DOWN 힌트","정답이면 축하 메시지"], en: []},
    lessonTopicIds: ['dom-events', 'state-render'],
    next: 'mission-68'
  }  ,
  {
    id: 'mission-68',
    track: 'web',
    level: 'beginner',
    minutes: 22,
    stage: 'S1',
    title: {ko: '미션 68 — 리스트에서 항목 삭제(× 버튼)', en: 'Mission 68'} ,
    pitch: {ko: '배열 상태에서 특정 항목을 제거한다.', en: 'Mission 68'} ,
    outcomes: {ko: ["filter","dataset","이벤트 위임"], en: []},
    checklist: {ko: ["× 클릭 시 해당 항목 삭제","삭제 후 렌더","빈 리스트 처리"], en: []},
    lessonTopicIds: ['arrays-loops', 'dom-events', 'state-render'],
    next: 'mission-69'
  }  ,
  {
    id: 'mission-69',
    track: 'web',
    level: 'beginner',
    minutes: 14,
    stage: 'S0',
    title: {ko: '미션 69 — 간단한 슬라이더(range) 값 표시', en: 'Mission 69'} ,
    pitch: {ko: 'input range의 값을 읽어 UI에 표시한다.', en: 'Mission 69'} ,
    outcomes: {ko: ["range","input 이벤트","value"], en: []},
    checklist: {ko: ["슬라이더 움직이면 숫자 표시","초기값 표시","0~100 범위"], en: []},
    lessonTopicIds: ['dom-events', 'state-render'],
    next: 'mission-70'
  }  ,
  {
    id: 'mission-70',
    track: 'web',
    level: 'beginner',
    minutes: 26,
    stage: 'S2',
    title: {ko: '미션 70 — fetch로 사용자 목록 가져오기(JSONPlaceholder)', en: 'Mission 70'} ,
    pitch: {ko: 'fetch로 JSON 배열을 받아 리스트로 렌더한다.', en: 'Mission 70'} ,
    outcomes: {ko: ["fetch","async/await","map"], en: []},
    checklist: {ko: ["Load 클릭 시 로딩 표시","성공 시 이름 리스트","실패 시 에러"], en: []},
    lessonTopicIds: ['fetch-async', 'arrays-loops', 'dom-events', 'state-render'],
    next: 'mission-71'
  }  ,
  {
    id: 'mission-71',
    track: 'web',
    level: 'beginner',
    minutes: 24,
    stage: 'S2',
    title: {ko: '미션 71 — 스크롤 진행률(상단 progress bar)', en: 'Mission 71'} ,
    pitch: {ko: 'scroll 이벤트에서 진행률을 계산한다.', en: 'Mission 71'} ,
    outcomes: {ko: ["scroll","documentElement","계산"], en: []},
    checklist: {ko: ["스크롤에 따라 바 width 변경","0~100% 계산","리사이즈에도 동작"], en: []},
    lessonTopicIds: ['dom-events', 'state-render'],
    next: 'mission-72'
  }  ,
  {
    id: 'mission-72',
    track: 'web',
    level: 'beginner',
    minutes: 24,
    stage: 'S2',
    title: {ko: '미션 72 — 투두 완료 체크(완료/미완료 표시)', en: 'Mission 72'} ,
    pitch: {ko: '객체 배열의 done 상태를 토글한다.', en: 'Mission 72'} ,
    outcomes: {ko: ["map","toggle","이벤트 위임"], en: []},
    checklist: {ko: ["체크하면 취소선","상태 토글","완료 개수 표시"], en: []},
    lessonTopicIds: ['arrays-loops', 'dom-events', 'state-render'],
    next: 'mission-73'
  }  ,
  {
    id: 'mission-73',
    track: 'web',
    level: 'beginner',
    minutes: 22,
    stage: 'S1',
    title: {ko: '미션 73 — 드롭다운으로 정렬 기준 선택', en: 'Mission 73'} ,
    pitch: {ko: 'select 값에 따라 sort 기준을 바꾼다.', en: 'Mission 73'} ,
    outcomes: {ko: ["select","sort","렌더"], en: []},
    checklist: {ko: ["이름/나이 정렬","오름차순","선택값 표시"], en: []},
    lessonTopicIds: ['arrays-loops', 'dom-events', 'state-render'],
    next: 'mission-74'
  }  ,
  {
    id: 'mission-74',
    track: 'web',
    level: 'beginner',
    minutes: 26,
    stage: 'S2',
    title: {ko: '미션 74 — 간단한 debounce(검색 입력)', en: 'Mission 74'} ,
    pitch: {ko: '타이핑이 멈춘 뒤에만 렌더한다.', en: 'Mission 74'} ,
    outcomes: {ko: ["setTimeout","clearTimeout","debounce"], en: []},
    checklist: {ko: ["입력 후 300ms 뒤에 반영","연속 입력 시 이전 타이머 취소","현재 쿼리 표시"], en: []},
    lessonTopicIds: ['timers', 'dom-events', 'state-render'],
    next: 'mission-75'
  }  ,
  {
    id: 'mission-75',
    track: 'web',
    level: 'beginner',
    minutes: 22,
    stage: 'S1',
    title: {ko: '미션 75 — 간단한 Toast 알림(자동 닫힘)', en: 'Mission 75'} ,
    pitch: {ko: '일시적으로 메시지를 보여주는 UI를 만든다.', en: 'Mission 75'} ,
    outcomes: {ko: ["setTimeout","classList","UX"], en: []},
    checklist: {ko: ["Show 클릭 시 토스트 표시","1.5초 후 자동 숨김","연속 클릭 시 타이머 리셋"], en: []},
    lessonTopicIds: ['timers', 'dom-events', 'state-render'],
  }  ,
  {
    id: 'mission-76',
    track: 'web',
    level: 'beginner',
    minutes: 22,
    stage: 'S1',
    title: {ko: '미션 76 — 카운트다운 타이머(10→0)', en: 'Mission 76'} ,
    pitch: {ko: 'setInterval로 카운트다운을 만들고 종료를 처리한다.', en: 'Mission 76'} ,
    outcomes: {ko: ["setInterval","clearInterval","상태"], en: []},
    checklist: {ko: ["Start 누르면 10부터 감소","0이면 멈춤","중복 시작 방지"], en: []},
    lessonTopicIds: ['timers', 'dom-events', 'state-render'],
    next: 'mission-77'
  }  ,
  {
    id: 'mission-77',
    track: 'web',
    level: 'beginner',
    minutes: 16,
    stage: 'S1',
    title: {ko: '미션 77 — 숫자 합계 계산기(입력 2개)', en: 'Mission 77'} ,
    pitch: {ko: '입력값을 숫자로 변환해 합계를 표시한다.', en: 'Mission 77'} ,
    outcomes: {ko: ["Number()","input 이벤트","렌더"], en: []},
    checklist: {ko: ["a/b 입력 시 합계 표시","빈 값은 0 취급","NaN 방지"], en: []},
    lessonTopicIds: ['forms-validation', 'dom-events', 'state-render'],
    next: 'mission-78'
  }  ,
  {
    id: 'mission-78',
    track: 'web',
    level: 'beginner',
    minutes: 18,
    stage: 'S1',
    title: {ko: '미션 78 — 간단한 폼 reset 버튼 구현', en: 'Mission 78'} ,
    pitch: {ko: '초기값으로 되돌리고 UI를 리셋한다.', en: 'Mission 78'} ,
    outcomes: {ko: ["reset","상태","렌더"], en: []},
    checklist: {ko: ["Reset 클릭 시 입력 초기화","메시지 초기화","기본값 유지"], en: []},
    lessonTopicIds: ['forms-validation', 'dom-events', 'state-render'],
    next: 'mission-79'
  }  ,
  {
    id: 'mission-79',
    track: 'web',
    level: 'beginner',
    minutes: 18,
    stage: 'S1',
    title: {ko: '미션 79 — 클릭 카운터(더블클릭은 +2)', en: 'Mission 79'} ,
    pitch: {ko: 'click과 dblclick 이벤트 차이를 경험한다.', en: 'Mission 79'} ,
    outcomes: {ko: ["click","dblclick","상태"], en: []},
    checklist: {ko: ["클릭하면 +1","더블클릭하면 +2","화면 업데이트"], en: []},
    lessonTopicIds: ['dom-events', 'state-render'],
    next: 'mission-80'
  }  ,
  {
    id: 'mission-80',
    track: 'web',
    level: 'beginner',
    minutes: 22,
    stage: 'S1',
    title: {ko: '미션 80 — 간단한 이미지 갤러리(썸네일 클릭)', en: 'Mission 80'} ,
    pitch: {ko: '썸네일 클릭으로 메인 이미지를 바꾼다.', en: 'Mission 80'} ,
    outcomes: {ko: ["이벤트 위임","dataset","렌더"], en: []},
    checklist: {ko: ["썸네일 클릭 시 메인 변경","선택 표시","초기 선택"], en: []},
    lessonTopicIds: ['dom-events', 'state-render'],
    next: 'mission-81'
  }  ,
  {
    id: 'mission-81',
    track: 'web',
    level: 'beginner',
    minutes: 22,
    stage: 'S1',
    title: {ko: '미션 81 — 간단한 카드 필터(카테고리 버튼)', en: 'Mission 81'} ,
    pitch: {ko: '버튼으로 category 필터링을 한다.', en: 'Mission 81'} ,
    outcomes: {ko: ["filter","dataset","렌더"], en: []},
    checklist: {ko: ["All/A/B 필터","활성 버튼 표시","카운트 표시"], en: []},
    lessonTopicIds: ['arrays-loops', 'dom-events', 'state-render'],
    next: 'mission-82'
  }  ,
  {
    id: 'mission-82',
    track: 'web',
    level: 'beginner',
    minutes: 26,
    stage: 'S2',
    title: {ko: '미션 82 — 키보드로 상하 이동(하이라이트)', en: 'Mission 82'} ,
    pitch: {ko: 'keydown으로 선택 인덱스를 이동시킨다.', en: 'Mission 82'} ,
    outcomes: {ko: ["keydown","ArrowUp/Down","인덱스"], en: []},
    checklist: {ko: ["ArrowDown/Up로 선택 이동","경계 처리","선택 표시"], en: []},
    lessonTopicIds: ['dom-events', 'state-render'],
    next: 'mission-83'
  }  ,
  {
    id: 'mission-83',
    track: 'web',
    level: 'beginner',
    minutes: 18,
    stage: 'S1',
    title: {ko: '미션 83 — 간단한 이벤트 버블링 실험(로그)', en: 'Mission 83'} ,
    pitch: {ko: '버블링을 보고 stopPropagation을 체감한다.', en: 'Mission 83'} ,
    outcomes: {ko: ["event bubbling","stopPropagation","로그"], en: []},
    checklist: {ko: ["box 클릭 로그","button 클릭 로그","stopPropagation 옵션"], en: []},
    lessonTopicIds: ['dom-events'],
    next: 'mission-84'
  }  ,
  {
    id: 'mission-84',
    track: 'web',
    level: 'beginner',
    minutes: 26,
    stage: 'S2',
    title: {ko: '미션 84 — fetch로 포스트 1개 보기(로딩/에러)', en: 'Mission 84'} ,
    pitch: {ko: 'id 입력을 받아 fetch로 상세를 가져온다.', en: 'Mission 84'} ,
    outcomes: {ko: ["fetch","async","상태 처리"], en: []},
    checklist: {ko: ["Load 클릭 시 로딩","성공 시 title/body 표시","실패 시 에러"], en: []},
    lessonTopicIds: ['fetch-async', 'forms-validation', 'dom-events', 'state-render'],
    next: 'mission-85'
  }  ,
  {
    id: 'mission-85',
    track: 'web',
    level: 'beginner',
    minutes: 18,
    stage: 'S1',
    title: {ko: '미션 85 — 간단한 별칭 맵(Map)으로 값 찾기', en: 'Mission 85'} ,
    pitch: {ko: 'Map을 사용해 키-값 조회를 연습한다.', en: 'Mission 85'} ,
    outcomes: {ko: ["Map","get()","input"], en: []},
    checklist: {ko: ["키 입력하면 값 표시","없는 키면 안내","대소문자 무시"], en: []},
    lessonTopicIds: ['arrays-loops', 'dom-events', 'state-render'],
  }  ,
  {
    id: 'mission-86',
    track: 'web',
    level: 'beginner',
    minutes: 24,
    stage: 'S2',
    title: {ko: '미션 86 — 숫자 배열 통계(최소/최대/평균)', en: 'Mission 86'} ,
    pitch: {ko: 'split/map으로 입력을 배열로 만들고 통계를 계산한다.', en: 'Mission 86'} ,
    outcomes: {ko: ["split","map(Number)","Math.min/max"], en: []},
    checklist: {ko: ["쉼표 입력을 숫자 배열로 변환","min/max/avg 표시","빈 값/NaN 처리"], en: []},
    lessonTopicIds: ['arrays-loops', 'forms-validation', 'dom-events', 'state-render'],
    next: 'mission-87'
  }  ,
  {
    id: 'mission-87',
    track: 'web',
    level: 'beginner',
    minutes: 20,
    stage: 'S1',
    title: {ko: '미션 87 — 간단한 별도 상태(선택/비선택) 리스트', en: 'Mission 87'} ,
    pitch: {ko: '선택된 id를 상태로 관리한다.', en: 'Mission 87'} ,
    outcomes: {ko: ["상태","dataset","classList"], en: []},
    checklist: {ko: ["아이템 클릭 시 선택","다시 클릭 시 해제","선택값 표시"], en: []},
    lessonTopicIds: ['dom-events', 'state-render'],
    next: 'mission-88'
  }  ,
  {
    id: 'mission-88',
    track: 'web',
    level: 'beginner',
    minutes: 26,
    stage: 'S2',
    title: {ko: '미션 88 — 입력값을 태그로 추가/삭제', en: 'Mission 88'} ,
    pitch: {ko: '배열로 태그를 관리하고 중복을 막는다.', en: 'Mission 88'} ,
    outcomes: {ko: ["배열","includes","render"], en: []},
    checklist: {ko: ["Add로 태그 추가","중복은 무시","태그 클릭 시 삭제"], en: []},
    lessonTopicIds: ['arrays-loops', 'forms-validation', 'dom-events', 'state-render'],
    next: 'mission-89'
  }  ,
  {
    id: 'mission-89',
    track: 'web',
    level: 'beginner',
    minutes: 16,
    stage: 'S1',
    title: {ko: '미션 89 — 간단한 툴팁(hover) 표시', en: 'Mission 89'} ,
    pitch: {ko: 'mouseenter/leave로 툴팁을 제어한다.', en: 'Mission 89'} ,
    outcomes: {ko: ["mouseenter","mouseleave","classList"], en: []},
    checklist: {ko: ["hover 시 tooltip 표시","leave 시 숨김","접근성 aria"], en: []},
    lessonTopicIds: ['dom-events', 'state-render'],
    next: 'mission-90'
  }  ,
  {
    id: 'mission-90',
    track: 'web',
    level: 'beginner',
    minutes: 24,
    stage: 'S2',
    title: {ko: '미션 90 — 간단한 클라이언트 라우팅 흉내(해시)', en: 'Mission 90'} ,
    pitch: {ko: 'location.hash로 화면을 전환한다.', en: 'Mission 90'} ,
    outcomes: {ko: ["location.hash","hashchange","렌더"], en: []},
    checklist: {ko: ["링크 클릭 시 해시 변경","hashchange에서 렌더","현재 페이지 표시"], en: []},
    lessonTopicIds: ['dom-events', 'state-render'],
    next: 'mission-91'
  }  ,
  {
    id: 'mission-91',
    track: 'web',
    level: 'beginner',
    minutes: 14,
    stage: 'S0',
    title: {ko: '미션 91 — 간단한 색상 피커(input color) 적용', en: 'Mission 91'} ,
    pitch: {ko: 'color input 값으로 스타일을 바꾼다.', en: 'Mission 91'} ,
    outcomes: {ko: ["input type=color","style","input 이벤트"], en: []},
    checklist: {ko: ["색 변경 시 박스 색 변경","현재 hex 표시","초기값 표시"], en: []},
    lessonTopicIds: ['dom-events', 'state-render'],
    next: 'mission-92'
  }  ,
  {
    id: 'mission-92',
    track: 'web',
    level: 'beginner',
    minutes: 22,
    stage: 'S1',
    title: {ko: '미션 92 — 간단한 클립보드 붙여넣기(paste) 감지', en: 'Mission 92'} ,
    pitch: {ko: 'paste 이벤트에서 clipboardData를 읽는다.', en: 'Mission 92'} ,
    outcomes: {ko: ["paste 이벤트","clipboardData","보안/제약"], en: []},
    checklist: {ko: ["붙여넣기 시 텍스트 표시","빈 값 처리","상태 메시지"], en: []},
    lessonTopicIds: ['dom-events', 'state-render'],
    next: 'mission-93'
  }  ,
  {
    id: 'mission-93',
    track: 'web',
    level: 'beginner',
    minutes: 20,
    stage: 'S1',
    title: {ko: '미션 93 — 간단한 숫자 포맷(천 단위 콤마)', en: 'Mission 93'} ,
    pitch: {ko: '정규식 또는 Intl로 표시용 포맷을 만든다.', en: 'Mission 93'} ,
    outcomes: {ko: ["Intl.NumberFormat","문자열","렌더"], en: []},
    checklist: {ko: ["입력하면 포맷 출력","NaN 처리","초기 상태 표시"], en: []},
    lessonTopicIds: ['forms-validation', 'dom-events', 'state-render'],
    next: 'mission-94'
  }  ,
  {
    id: 'mission-94',
    track: 'web',
    level: 'beginner',
    minutes: 26,
    stage: 'S2',
    title: {ko: '미션 94 — 간단한 키워드 하이라이트(검색)', en: 'Mission 94'} ,
    pitch: {ko: '검색어를 포함한 부분을 mark로 감싼다.', en: 'Mission 94'} ,
    outcomes: {ko: ["문자열","replace","RegExp escape"], en: []},
    checklist: {ko: ["검색어 입력 시 하이라이트","대소문자 무시","빈 검색어면 원문"], en: []},
    lessonTopicIds: ['dom-events', 'state-render'],
    next: 'mission-95'
  }  ,
  {
    id: 'mission-95',
    track: 'web',
    level: 'beginner',
    minutes: 22,
    stage: 'S2',
    title: {ko: '미션 95 — 간단한 폼 제출 후 리스트에 추가', en: 'Mission 95'} ,
    pitch: {ko: 'submit + preventDefault로 입력을 리스트에 추가한다.', en: 'Mission 95'} ,
    outcomes: {ko: ["form submit","preventDefault","배열"], en: []},
    checklist: {ko: ["submit 시 새로고침 방지","trim 후 리스트 추가","빈 값은 무시"], en: []},
    lessonTopicIds: ['forms-validation', 'arrays-loops', 'dom-events', 'state-render'],
  }  ,
  {
    id: 'mission-96',
    track: 'web',
    level: 'beginner',
    minutes: 22,
    stage: 'S1',
    title: {ko: '미션 96 — 랜덤 비밀번호 생성기', en: 'Mission 96'} ,
    pitch: {ko: '랜덤으로 문자열을 생성하고 화면에 보여준다.', en: 'Mission 96'} ,
    outcomes: {ko: ["Math.random","문자열","배열"], en: []},
    checklist: {ko: ["Generate 클릭 시 12자 비밀번호 생성","대문자/소문자/숫자 포함","복사 버튼(선택)"], en: []},
    lessonTopicIds: ['arrays-loops', 'dom-events', 'state-render'],
    next: 'mission-97'
  }  ,
  {
    id: 'mission-97',
    track: 'web',
    level: 'beginner',
    minutes: 18,
    stage: 'S1',
    title: {ko: '미션 97 — 간단한 환율 계산기(고정 환율)', en: 'Mission 97'} ,
    pitch: {ko: '입력값에 환율을 곱해서 변환한다.', en: 'Mission 97'} ,
    outcomes: {ko: ["Number()","toFixed","input"], en: []},
    checklist: {ko: ["KRW 입력 시 USD 출력","빈 값 처리","소수점 2자리"], en: []},
    lessonTopicIds: ['dom-events', 'state-render'],
    next: 'mission-98'
  }  ,
  {
    id: 'mission-98',
    track: 'web',
    level: 'beginner',
    minutes: 24,
    stage: 'S2',
    title: {ko: '미션 98 — 간단한 팔로우 버튼(optimistic UI)', en: 'Mission 98'} ,
    pitch: {ko: '상태를 즉시 바꾸고 500ms 후 “서버 응답”을 처리한다.', en: 'Mission 98'} ,
    outcomes: {ko: ["상태","setTimeout","disabled"], en: []},
    checklist: {ko: ["클릭 즉시 Follow/Following 토글","로딩 중 disabled","완료 메시지"], en: []},
    lessonTopicIds: ['timers', 'dom-events', 'state-render'],
    next: 'mission-99'
  }  ,
  {
    id: 'mission-99',
    track: 'web',
    level: 'beginner',
    minutes: 22,
    stage: 'S1',
    title: {ko: '미션 99 — 간단한 수식 계산기(+ - * /)', en: 'Mission 99'} ,
    pitch: {ko: '연산자를 선택해서 계산한다.', en: 'Mission 99'} ,
    outcomes: {ko: ["select","switch","Number"], en: []},
    checklist: {ko: ["a/b 입력 + op 선택","Calc 클릭 시 결과 표시","0으로 나누기 처리"], en: []},
    lessonTopicIds: ['forms-validation', 'dom-events', 'state-render'],
    next: 'mission-100'
  }  ,
  {
    id: 'mission-100',
    track: 'web',
    level: 'beginner',
    minutes: 26,
    stage: 'S2',
    title: {ko: '미션 100 — 간단한 데이터 정렬/필터 조합', en: 'Mission 100'} ,
    pitch: {ko: '필터 후 정렬 흐름을 만들고 렌더한다.', en: 'Mission 100'} ,
    outcomes: {ko: ["filter","sort","상태"], en: []},
    checklist: {ko: ["검색어로 필터","가격 오름차순 정렬","결과 카운트"], en: []},
    lessonTopicIds: ['arrays-loops', 'dom-events', 'state-render'],
    next: 'mission-101'
  }  ,
  {
    id: 'mission-101',
    track: 'web',
    level: 'beginner',
    minutes: 24,
    stage: 'S2',
    title: {ko: '미션 101 — 간단한 드롭다운 메뉴 열고 닫기', en: 'Mission 101'} ,
    pitch: {ko: '버튼 클릭/바깥 클릭으로 메뉴를 제어한다.', en: 'Mission 101'} ,
    outcomes: {ko: ["classList","이벤트","outside click"], en: []},
    checklist: {ko: ["버튼 클릭으로 열기/닫기","바깥 클릭으로 닫기","현재 선택 표시"], en: []},
    lessonTopicIds: ['dom-events', 'state-render'],
    next: 'mission-102'
  }  ,
  {
    id: 'mission-102',
    track: 'web',
    level: 'beginner',
    minutes: 26,
    stage: 'S2',
    title: {ko: '미션 102 — 간단한 CSV 테이블 렌더', en: 'Mission 102'} ,
    pitch: {ko: 'CSV 문자열을 파싱해 테이블로 보여준다.', en: 'Mission 102'} ,
    outcomes: {ko: ["split","map","DOM"], en: []},
    checklist: {ko: ["Parse 클릭 시 테이블 생성","헤더/바디 분리","빈 줄 무시"], en: []},
    lessonTopicIds: ['arrays-loops', 'dom-events', 'state-render'],
    next: 'mission-103'
  }  ,
  {
    id: 'mission-103',
    track: 'web',
    level: 'beginner',
    minutes: 22,
    stage: 'S1',
    title: {ko: '미션 103 — 간단한 복권 번호 생성기(1~45 중 6개)', en: 'Mission 103'} ,
    pitch: {ko: '중복 없이 랜덤 숫자를 뽑아 정렬한다.', en: 'Mission 103'} ,
    outcomes: {ko: ["Set","Math.random","sort"], en: []},
    checklist: {ko: ["Generate 클릭 시 6개 생성","중복 없음","오름차순 정렬"], en: []},
    lessonTopicIds: ['arrays-loops', 'dom-events', 'state-render'],
    next: 'mission-104'
  }  ,
  {
    id: 'mission-104',
    track: 'web',
    level: 'beginner',
    minutes: 28,
    stage: 'S2',
    title: {ko: '미션 104 — 간단한 fetch 재시도(최대 3번)', en: 'Mission 104'} ,
    pitch: {ko: '실패 시 재시도하는 흐름을 만든다.', en: 'Mission 104'} ,
    outcomes: {ko: ["async/await","try/catch","루프"], en: []},
    checklist: {ko: ["Load 클릭 시 시도 횟수 표시","성공하면 OK","3번 실패하면 Error"], en: []},
    lessonTopicIds: ['fetch-async', 'dom-events', 'state-render'],
    next: 'mission-105'
  }  ,
  {
    id: 'mission-105',
    track: 'web',
    level: 'beginner',
    minutes: 28,
    stage: 'S2',
    title: {ko: '미션 105 — 간단한 메모 앱(추가 + localStorage 저장)', en: 'Mission 105'} ,
    pitch: {ko: '배열을 저장/로드하며 리스트를 유지한다.', en: 'Mission 105'} ,
    outcomes: {ko: ["localStorage","JSON","배열"], en: []},
    checklist: {ko: ["Add로 메모 추가","새로고침 후 유지","삭제 버튼(선택)"], en: []},
    lessonTopicIds: ['storage', 'arrays-loops', 'dom-events', 'state-render'],
  }  ,
  {
    id: 'mission-106',
    track: 'web',
    level: 'beginner',
    minutes: 22,
    stage: 'S1',
    title: {ko: '미션 106 — 간단한 BMI 계산기', en: 'Mission 106'} ,
    pitch: {ko: '키/몸무게 입력으로 BMI를 계산하고 구간을 표시한다.', en: 'Mission 106'} ,
    outcomes: {ko: ["Number()","toFixed","조건문"], en: []},
    checklist: {ko: ["Calc 클릭 시 BMI 계산","정상/과체중 등 텍스트 표시","NaN 처리"], en: []},
    lessonTopicIds: ['forms-validation', 'dom-events', 'state-render'],
    next: 'mission-107'
  }  ,
  {
    id: 'mission-107',
    track: 'web',
    level: 'beginner',
    minutes: 24,
    stage: 'S2',
    title: {ko: '미션 107 — 단어 빈도 세기', en: 'Mission 107'} ,
    pitch: {ko: '문장을 단어로 나눠 빈도를 계산한다.', en: 'Mission 107'} ,
    outcomes: {ko: ["split","객체/Map","정렬"], en: []},
    checklist: {ko: ["Count 클릭 시 빈도 출력","대소문자 무시","빈 단어 무시"], en: []},
    lessonTopicIds: ['arrays-loops', 'dom-events', 'state-render'],
    next: 'mission-108'
  }  ,
  {
    id: 'mission-108',
    track: 'web',
    level: 'beginner',
    minutes: 28,
    stage: 'S2',
    title: {ko: '미션 108 — 간단한 슬라이드 쇼(Prev/Next + 자동)', en: 'Mission 108'} ,
    pitch: {ko: '인덱스를 돌리고 interval을 관리한다.', en: 'Mission 108'} ,
    outcomes: {ko: ["setInterval","clearInterval","인덱스"], en: []},
    checklist: {ko: ["Prev/Next로 이동","Auto 토글","끝에서 순환"], en: []},
    lessonTopicIds: ['timers', 'dom-events', 'state-render'],
    next: 'mission-109'
  }  ,
  {
    id: 'mission-109',
    track: 'web',
    level: 'beginner',
    minutes: 26,
    stage: 'S2',
    title: {ko: '미션 109 — 간단한 Markdown 미리보기(#, **만)', en: 'Mission 109'} ,
    pitch: {ko: '치환으로 아주 단순한 마크다운 렌더를 만든다.', en: 'Mission 109'} ,
    outcomes: {ko: ["문자열","replace","innerHTML"], en: []},
    checklist: {ko: ["# 헤더 변환","**bold** 변환","줄바꿈 처리"], en: []},
    lessonTopicIds: ['dom-events', 'state-render'],
    next: 'mission-110'
  }  ,
  {
    id: 'mission-110',
    track: 'web',
    level: 'beginner',
    minutes: 28,
    stage: 'S2',
    title: {ko: '미션 110 — 간단한 숫자 정렬 게임(작은→큰)', en: 'Mission 110'} ,
    pitch: {ko: '배열을 섞고 클릭 순서를 체크한다.', en: 'Mission 110'} ,
    outcomes: {ko: ["셔플","상태","검증"], en: []},
    checklist: {ko: ["1~5 버튼을 섞어 표시","1부터 순서대로 클릭해야 OK","실패 시 리셋"], en: []},
    lessonTopicIds: ['arrays-loops', 'dom-events', 'state-render'],
    next: 'mission-111'
  }  ,
  {
    id: 'mission-111',
    track: 'web',
    level: 'beginner',
    minutes: 18,
    stage: 'S1',
    title: {ko: '미션 111 — 간단한 오프라인/온라인 감지', en: 'Mission 111'} ,
    pitch: {ko: 'online/offline 이벤트로 상태를 표시한다.', en: 'Mission 111'} ,
    outcomes: {ko: ["navigator.onLine","events","렌더"], en: []},
    checklist: {ko: ["초기 상태 표시","online/offline 변화 반영","스타일 변경"], en: []},
    lessonTopicIds: ['dom-events', 'state-render'],
    next: 'mission-112'
  }  ,
  {
    id: 'mission-112',
    track: 'web',
    level: 'beginner',
    minutes: 30,
    stage: 'S2',
    title: {ko: '미션 112 — 간단한 스톱워치(랩 3개까지)', en: 'Mission 112'} ,
    pitch: {ko: '시간을 측정하고 lap 리스트를 만든다.', en: 'Mission 112'} ,
    outcomes: {ko: ["setInterval","Date.now","배열"], en: []},
    checklist: {ko: ["Start/Stop","Lap 저장(최대 3)","Reset"], en: []},
    lessonTopicIds: ['timers', 'arrays-loops', 'dom-events', 'state-render'],
    next: 'mission-113'
  }  ,
  {
    id: 'mission-113',
    track: 'web',
    level: 'beginner',
    minutes: 26,
    stage: 'S2',
    title: {ko: '미션 113 — 간단한 canvas 점 찍기', en: 'Mission 113'} ,
    pitch: {ko: 'canvas 2D context로 클릭 위치에 점을 찍는다.', en: 'Mission 113'} ,
    outcomes: {ko: ["canvas","addEventListener","좌표"], en: []},
    checklist: {ko: ["캔버스 클릭 시 점 그리기","좌표 계산","초기화 버튼"], en: []},
    lessonTopicIds: ['dom-events', 'state-render'],
    next: 'mission-114'
  }  ,
  {
    id: 'mission-114',
    track: 'web',
    level: 'beginner',
    minutes: 28,
    stage: 'S2',
    title: {ko: '미션 114 — 간단한 북마크 저장(제목+URL)', en: 'Mission 114'} ,
    pitch: {ko: '폼으로 추가하고 localStorage에 저장한다.', en: 'Mission 114'} ,
    outcomes: {ko: ["localStorage","JSON","배열"], en: []},
    checklist: {ko: ["Add로 북마크 추가","리스트 렌더","새로고침 후 유지"], en: []},
    lessonTopicIds: ['storage', 'arrays-loops', 'forms-validation', 'dom-events', 'state-render'],
    next: 'mission-115'
  }  ,
  {
    id: 'mission-115',
    track: 'web',
    level: 'beginner',
    minutes: 28,
    stage: 'S2',
    title: {ko: '미션 115 — 간단한 퀴즈(다음 버튼)', en: 'Mission 115'} ,
    pitch: {ko: '문제 인덱스를 이동시키며 점수를 계산한다.', en: 'Mission 115'} ,
    outcomes: {ko: ["상태","인덱스","렌더"], en: []},
    checklist: {ko: ["선택 후 Next","마지막에 점수 표시","다시 시작"], en: []},
    lessonTopicIds: ['arrays-loops', 'dom-events', 'state-render'],
  }  ,
  {
    id: 'mission-116',
    track: 'web',
    level: 'beginner',
    minutes: 30,
    stage: 'S2',
    title: {ko: '미션 116 — 간단한 포모도로 타이머(25/5)', en: 'Mission 116'} ,
    pitch: {ko: '타이머 상태(work/break)를 전환한다.', en: 'Mission 116'} ,
    outcomes: {ko: ["setInterval","상태","렌더"], en: []},
    checklist: {ko: ["Start/Stop","25분 후 break 전환","Reset"], en: []},
    lessonTopicIds: ['timers', 'dom-events', 'state-render'],
    next: 'mission-117'
  }  ,
  {
    id: 'mission-117',
    track: 'web',
    level: 'beginner',
    minutes: 18,
    stage: 'S1',
    title: {ko: '미션 117 — 간단한 아날로그 시계(텍스트로)', en: 'Mission 117'} ,
    pitch: {ko: 'Date로 현재 시간을 읽어 표시한다.', en: 'Mission 117'} ,
    outcomes: {ko: ["Date","setInterval","padStart"], en: []},
    checklist: {ko: ["현재 HH:MM:SS 표시","1초마다 업데이트","초기 렌더"], en: []},
    lessonTopicIds: ['timers', 'state-render'],
    next: 'mission-118'
  }  ,
  {
    id: 'mission-118',
    track: 'web',
    level: 'beginner',
    minutes: 18,
    stage: 'S1',
    title: {ko: '미션 118 — 간단한 URL 파라미터 읽기', en: 'Mission 118'} ,
    pitch: {ko: 'URLSearchParams로 쿼리를 읽어 UI에 표시한다.', en: 'Mission 118'} ,
    outcomes: {ko: ["URLSearchParams","location.search","렌더"], en: []},
    checklist: {ko: ["name 파라미터 표시","없으면 -","decode 처리"], en: []},
    lessonTopicIds: ['state-render'],
    next: 'mission-119'
  }  ,
  {
    id: 'mission-119',
    track: 'web',
    level: 'beginner',
    minutes: 26,
    stage: 'S2',
    title: {ko: '미션 119 — 간단한 숫자 범위 슬라이더 2개(최소/최대)', en: 'Mission 119'} ,
    pitch: {ko: '두 range input의 관계(min<=max)를 유지한다.', en: 'Mission 119'} ,
    outcomes: {ko: ["range","Math.min/max","상태"], en: []},
    checklist: {ko: ["min/max 표시","min이 max 넘으면 보정","실시간 업데이트"], en: []},
    lessonTopicIds: ['forms-validation', 'dom-events', 'state-render'],
    next: 'mission-120'
  }  ,
  {
    id: 'mission-120',
    track: 'web',
    level: 'beginner',
    minutes: 30,
    stage: 'S2',
    title: {ko: '미션 120 — 간단한 정렬 가능한 테이블(클릭 헤더)', en: 'Mission 120'} ,
    pitch: {ko: '헤더 클릭으로 정렬 키를 바꾼다.', en: 'Mission 120'} ,
    outcomes: {ko: ["sort","상태","DOM 렌더"], en: []},
    checklist: {ko: ["name/score 정렬","오름차순","현재 정렬 표시"], en: []},
    lessonTopicIds: ['arrays-loops', 'dom-events', 'state-render'],
    next: 'mission-121'
  }  ,
  {
    id: 'mission-121',
    track: 'web',
    level: 'beginner',
    minutes: 26,
    stage: 'S2',
    title: {ko: '미션 121 — 간단한 색상 대비(텍스트 색 자동)', en: 'Mission 121'} ,
    pitch: {ko: '배경색에 따라 텍스트 색을 흰/검으로 바꾼다.', en: 'Mission 121'} ,
    outcomes: {ko: ["색상 파싱","명도","조건문"], en: []},
    checklist: {ko: ["랜덤 배경색","명도 기준 텍스트색 변경","hex 표시"], en: []},
    lessonTopicIds: ['dom-events', 'state-render'],
    next: 'mission-122'
  }  ,
  {
    id: 'mission-122',
    track: 'web',
    level: 'beginner',
    minutes: 30,
    stage: 'S2',
    title: {ko: '미션 122 — 간단한 debounce + fetch (검색)', en: 'Mission 122'} ,
    pitch: {ko: '입력 멈춘 뒤에만 네트워크 요청을 보낸다.', en: 'Mission 122'} ,
    outcomes: {ko: ["debounce","fetch","상태"], en: []},
    checklist: {ko: ["300ms debounce","로딩 표시","결과 표시(제목)"], en: []},
    lessonTopicIds: ['fetch-async', 'timers', 'dom-events', 'state-render'],
    next: 'mission-123'
  }  ,
  {
    id: 'mission-123',
    track: 'web',
    level: 'beginner',
    minutes: 24,
    stage: 'S2',
    title: {ko: '미션 123 — 간단한 Undo(최근 1회)', en: 'Mission 123'} ,
    pitch: {ko: '이전 상태를 저장해 되돌린다.', en: 'Mission 123'} ,
    outcomes: {ko: ["state","스택","렌더"], en: []},
    checklist: {ko: ["+1 버튼","Undo 버튼으로 되돌리기","Undo 불가 시 disabled"], en: []},
    lessonTopicIds: ['dom-events', 'state-render'],
    next: 'mission-124'
  }  ,
  {
    id: 'mission-124',
    track: 'web',
    level: 'beginner',
    minutes: 22,
    stage: 'S1',
    title: {ko: '미션 124 — 간단한 키 입력 기록기(최근 10개)', en: 'Mission 124'} ,
    pitch: {ko: 'keydown 이벤트로 최근 입력 키를 리스트로 관리한다.', en: 'Mission 124'} ,
    outcomes: {ko: ["keydown","배열","slice"], en: []},
    checklist: {ko: ["키 누르면 기록 추가","최근 10개만 유지","렌더"], en: []},
    lessonTopicIds: ['arrays-loops', 'dom-events', 'state-render'],
    next: 'mission-125'
  }  ,
  {
    id: 'mission-125',
    track: 'web',
    level: 'beginner',
    minutes: 24,
    stage: 'S2',
    title: {ko: '미션 125 — 간단한 단계 진행(stepper) UI', en: 'Mission 125'} ,
    pitch: {ko: '현재 단계 인덱스를 관리하고 UI를 갱신한다.', en: 'Mission 125'} ,
    outcomes: {ko: ["인덱스","disabled","렌더"], en: []},
    checklist: {ko: ["Next/Prev로 단계 이동","경계에서 disabled","현재 단계 표시"], en: []},
    lessonTopicIds: ['dom-events', 'state-render'],
  }
];

export function getWebMission(id: string) {
  return WEB_MISSIONS.find(m => m.id === id);
}
