export type ProblemCategory = {
  id: string;
  title: string;
  desc: string;
};

export type Problem = {
  id: string;
  categoryId: string;
  title: string;
  prompt: string;
  type: 'multiple_choice' | 'short_text';
  options?: string[];
  answer: string | string[];
  explanation: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  tags?: string[];
  minutes?: number;
};

export const problemCategories: ProblemCategory[] = [
  {
    "id": "html",
    "title": "HTML",
    "desc": "문서 구조/시맨틱/접근성 기초"
  },
  {
    "id": "css",
    "title": "CSS",
    "desc": "레이아웃/선택자/디자인 시스템 기초"
  },
  {
    "id": "js",
    "title": "JavaScript",
    "desc": "문법/비동기/DOM/이벤트"
  },
  {
    "id": "web",
    "title": "Web 기초",
    "desc": "HTTP/브라우저/보안/성능"
  },
  {
    "id": "git",
    "title": "Git",
    "desc": "버전관리/협업 플로우"
  },
  {
    "id": "career",
    "title": "진로/직무 감각",
    "desc": "직무별 업무/의사결정/실전 감각"
  },
  {
    "id": "system",
    "title": "시스템/운영",
    "desc": "리눅스/컨테이너/쿠버네티스 감각"
  }
] as ProblemCategory[];

export const problems: Problem[] = [
  {
    "id": "p001",
    "minutes": 2,
    "difficulty": 2,
    "categoryId": "html",
    "title": "[HTML] 시맨틱 태그",
    "prompt": "“페이지 하단의 저작권/연락처” 영역에 가장 어울리는 태그는?",
    "type": "multiple_choice",
    "options": [
      "<footer>",
      "<nav>",
      "<main>",
      "<aside>"
    ],
    "answer": "0",
    "explanation": "하단 공통 정보는 footer가 시맨틱하다.",
    "tags": [
      "html"
    ]
  },
  {
    "id": "p002",
    "minutes": 2,
    "difficulty": 2,
    "categoryId": "css",
    "title": "[CSS] 선택자",
    "prompt": "클래스 선택자 표기는?",
    "type": "multiple_choice",
    "options": [
      "#btn",
      ".btn",
      "btn",
      "@btn"
    ],
    "answer": "1",
    "explanation": "클래스는 .",
    "tags": [
      "css"
    ]
  },
  {
    "id": "p003",
    "minutes": 2,
    "difficulty": 2,
    "categoryId": "js",
    "title": "[JavaScript] 비동기",
    "prompt": "Promise가 완료되었을 때 값을 받기 위해 쓰는 키워드는?",
    "type": "multiple_choice",
    "options": [
      "await",
      "yield",
      "defer",
      "sync"
    ],
    "answer": "0",
    "explanation": "async 함수 내에서 await.",
    "tags": [
      "js"
    ]
  },
  {
    "id": "p004",
    "minutes": 2,
    "difficulty": 2,
    "categoryId": "web",
    "title": "[Web 기초] HTTP",
    "prompt": "POST가 주로 의미하는 것은?",
    "type": "multiple_choice",
    "options": [
      "리소스 생성/처리 요청",
      "캐시 무효화",
      "정적 파일만 요청",
      "항상 멱등"
    ],
    "answer": "0",
    "explanation": "POST는 일반적으로 생성/처리.",
    "tags": [
      "web"
    ]
  },
  {
    "id": "p005",
    "minutes": 2,
    "difficulty": 2,
    "categoryId": "git",
    "title": "[Git] 브랜치",
    "prompt": "새 브랜치를 만들고 이동하는 명령(현대)은?",
    "type": "multiple_choice",
    "options": [
      "git switch -c",
      "git move",
      "git go",
      "git fork"
    ],
    "answer": "0",
    "explanation": "switch -c.",
    "tags": [
      "git"
    ]
  },
  {
    "id": "p006",
    "minutes": 2,
    "difficulty": 2,
    "categoryId": "career",
    "title": "[진로/직무 감각] 커뮤니케이션",
    "prompt": "문제 상황 공유 시 가장 먼저 포함할 정보는?",
    "type": "multiple_choice",
    "options": [
      "재현 방법/환경/에러 로그",
      "감정",
      "추측 결론만",
      "관련 없는 링크"
    ],
    "answer": "0",
    "explanation": "재현/환경/로그가 핵심.",
    "tags": [
      "career"
    ]
  },
  {
    "id": "p007",
    "minutes": 2,
    "difficulty": 2,
    "categoryId": "system",
    "title": "[시스템/운영] 리눅스",
    "prompt": "현재 디렉토리 파일 목록을 보는 기본 명령은?",
    "type": "multiple_choice",
    "options": [
      "ls",
      "cd",
      "pwd",
      "cat"
    ],
    "answer": "0",
    "explanation": "ls는 list.",
    "tags": [
      "system"
    ]
  },
  {
    "id": "p008",
    "minutes": 2,
    "difficulty": 2,
    "categoryId": "html",
    "title": "[HTML] 접근성: 버튼",
    "prompt": "아이콘만 있는 버튼에 가장 먼저 챙겨야 할 것은?",
    "type": "multiple_choice",
    "options": [
      "aria-label(또는 숨김 텍스트)",
      "border",
      "margin",
      "tabindex=-1"
    ],
    "answer": "0",
    "explanation": "의미를 읽을 수 있어야 한다.",
    "tags": [
      "html"
    ]
  },
  {
    "id": "p009",
    "minutes": 2,
    "difficulty": 2,
    "categoryId": "css",
    "title": "[CSS] 포지셔닝",
    "prompt": "position: absolute의 기준이 되는 것은(일반적으로)?",
    "type": "multiple_choice",
    "options": [
      "가장 가까운 position이 지정된 조상",
      "항상 body",
      "항상 viewport",
      "항상 documentElement"
    ],
    "answer": "0",
    "explanation": "positioned ancestor 기준.",
    "tags": [
      "css"
    ]
  },
  {
    "id": "p010",
    "minutes": 2,
    "difficulty": 2,
    "categoryId": "js",
    "title": "[JavaScript] 이벤트",
    "prompt": "버튼 클릭 이벤트 핸들러 등록 API는?",
    "type": "multiple_choice",
    "options": [
      "addEventListener",
      "listen",
      "onClick()",
      "subscribeDOM"
    ],
    "answer": "0",
    "explanation": "표준 DOM API.",
    "tags": [
      "js"
    ]
  },
  {
    "id": "p011",
    "minutes": 2,
    "difficulty": 2,
    "categoryId": "web",
    "title": "[Web 기초] 보안: 쿠키",
    "prompt": "쿠키가 JS에서 접근되지 않도록 하는 속성은?",
    "type": "multiple_choice",
    "options": [
      "HttpOnly",
      "SameSite",
      "Max-Age",
      "Domain"
    ],
    "answer": "0",
    "explanation": "HttpOnly면 document.cookie 접근 불가.",
    "tags": [
      "web"
    ]
  },
  {
    "id": "p012",
    "minutes": 2,
    "difficulty": 2,
    "categoryId": "git",
    "title": "[Git] 리모트",
    "prompt": "원격 변경을 가져오되 머지는 하지 않는 것은?",
    "type": "multiple_choice",
    "options": [
      "git fetch",
      "git pull",
      "git push",
      "git commit"
    ],
    "answer": "0",
    "explanation": "fetch는 가져오기만.",
    "tags": [
      "git"
    ]
  },
  {
    "id": "p013",
    "minutes": 2,
    "difficulty": 2,
    "categoryId": "career",
    "title": "[진로/직무 감각] 직무 선택",
    "prompt": "“운영 안정성/관측/배포 자동화”에 가장 가까운 직무는?",
    "type": "multiple_choice",
    "options": [
      "SRE/DevOps",
      "디자이너",
      "PM",
      "영업"
    ],
    "answer": "0",
    "explanation": "운영/신뢰성/자동화 중심.",
    "tags": [
      "career"
    ]
  },
  {
    "id": "p014",
    "minutes": 2,
    "difficulty": 2,
    "categoryId": "system",
    "title": "[시스템/운영] 네트워크",
    "prompt": "TCP에서 연결 설정에 사용되는 것은?",
    "type": "multiple_choice",
    "options": [
      "3-way handshake",
      "2-way handshake",
      "UDP broadcast",
      "ARP cache"
    ],
    "answer": "0",
    "explanation": "SYN/SYN-ACK/ACK.",
    "tags": [
      "system"
    ]
  },
  {
    "id": "p015",
    "minutes": 2,
    "difficulty": 2,
    "categoryId": "html",
    "title": "[HTML] 폼: required",
    "prompt": "필수 입력을 브라우저 수준에서 표시/검증하도록 돕는 속성은?",
    "type": "multiple_choice",
    "options": [
      "required",
      "readonly",
      "checked",
      "disabled"
    ],
    "answer": "0",
    "explanation": "required는 기본 검증을 제공한다.",
    "tags": [
      "html"
    ]
  },
  {
    "id": "p016",
    "minutes": 2,
    "difficulty": 2,
    "categoryId": "css",
    "title": "[CSS] 레이아웃: 가운데 정렬",
    "prompt": "flex 컨테이너에서 수평/수직 가운데 정렬 조합은?",
    "type": "multiple_choice",
    "options": [
      "justify-content:center + align-items:center",
      "left:50%",
      "margin:auto만",
      "text-align:center만"
    ],
    "answer": "0",
    "explanation": "주축/교차축 정렬 조합.",
    "tags": [
      "css"
    ]
  },
  {
    "id": "p017",
    "minutes": 2,
    "difficulty": 2,
    "categoryId": "js",
    "title": "[JavaScript] 배열",
    "prompt": "배열에서 조건을 만족하는 첫 요소를 반환하는 메서드는?",
    "type": "multiple_choice",
    "options": [
      "find",
      "filter",
      "map",
      "reduce"
    ],
    "answer": "0",
    "explanation": "find는 첫 요소.",
    "tags": [
      "js"
    ]
  },
  {
    "id": "p018",
    "minutes": 2,
    "difficulty": 2,
    "categoryId": "web",
    "title": "[Web 기초] CORS",
    "prompt": "브라우저에서 다른 오리진으로 XHR/fetch를 제한하는 정책은?",
    "type": "multiple_choice",
    "options": [
      "SOP(동일 출처 정책)",
      "HSTS",
      "DNSSEC",
      "TLS"
    ],
    "answer": "0",
    "explanation": "기본은 SOP, 완화가 CORS.",
    "tags": [
      "web"
    ]
  },
  {
    "id": "p019",
    "minutes": 2,
    "difficulty": 2,
    "categoryId": "git",
    "title": "[Git] 커밋",
    "prompt": "변경을 “스냅샷”으로 기록하는 명령은?",
    "type": "multiple_choice",
    "options": [
      "git commit",
      "git push",
      "git fetch",
      "git clean"
    ],
    "answer": "0",
    "explanation": "commit은 로컬 기록.",
    "tags": [
      "git"
    ]
  },
  {
    "id": "p020",
    "minutes": 2,
    "difficulty": 2,
    "categoryId": "career",
    "title": "[진로/직무 감각] 성장 방식",
    "prompt": "초반에 가장 빠르게 실력을 올리는 방법에 가까운 것은?",
    "type": "multiple_choice",
    "options": [
      "작은 기능을 끝까지(기획-구현-QA-배포) 반복",
      "튜토리얼만 계속 보기",
      "설정만 계속 바꾸기",
      "뉴스만 읽기"
    ],
    "answer": "0",
    "explanation": "완결 루프가 학습 효율이 높다.",
    "tags": [
      "career"
    ]
  },
  {
    "id": "p021",
    "minutes": 2,
    "difficulty": 2,
    "categoryId": "system",
    "title": "[시스템/운영] 쿠버네티스",
    "prompt": "k8s에서 원하는 파드 개수를 유지하는 리소스는?",
    "type": "multiple_choice",
    "options": [
      "Deployment",
      "ConfigMap",
      "Secret",
      "Namespace"
    ],
    "answer": "0",
    "explanation": "Deployment가 ReplicaSet을 통해 유지.",
    "tags": [
      "system"
    ]
  },
  {
    "id": "p022",
    "minutes": 2,
    "difficulty": 2,
    "categoryId": "html",
    "title": "[HTML] 시맨틱 태그",
    "prompt": "“페이지 하단의 저작권/연락처” 영역에 가장 어울리는 태그는?",
    "type": "multiple_choice",
    "options": [
      "<footer>",
      "<nav>",
      "<main>",
      "<aside>"
    ],
    "answer": "0",
    "explanation": "하단 공통 정보는 footer가 시맨틱하다.",
    "tags": [
      "html"
    ]
  },
  {
    "id": "p023",
    "minutes": 2,
    "difficulty": 2,
    "categoryId": "css",
    "title": "[CSS] 선택자",
    "prompt": "클래스 선택자 표기는?",
    "type": "multiple_choice",
    "options": [
      "#btn",
      ".btn",
      "btn",
      "@btn"
    ],
    "answer": "1",
    "explanation": "클래스는 .",
    "tags": [
      "css"
    ]
  },
  {
    "id": "p024",
    "minutes": 2,
    "difficulty": 2,
    "categoryId": "js",
    "title": "[JavaScript] 비동기",
    "prompt": "Promise가 완료되었을 때 값을 받기 위해 쓰는 키워드는?",
    "type": "multiple_choice",
    "options": [
      "await",
      "yield",
      "defer",
      "sync"
    ],
    "answer": "0",
    "explanation": "async 함수 내에서 await.",
    "tags": [
      "js"
    ]
  },
  {
    "id": "p025",
    "minutes": 2,
    "difficulty": 2,
    "categoryId": "web",
    "title": "[Web 기초] HTTP",
    "prompt": "POST가 주로 의미하는 것은?",
    "type": "multiple_choice",
    "options": [
      "리소스 생성/처리 요청",
      "캐시 무효화",
      "정적 파일만 요청",
      "항상 멱등"
    ],
    "answer": "0",
    "explanation": "POST는 일반적으로 생성/처리.",
    "tags": [
      "web"
    ]
  },
  {
    "id": "p026",
    "minutes": 2,
    "difficulty": 2,
    "categoryId": "git",
    "title": "[Git] 브랜치",
    "prompt": "새 브랜치를 만들고 이동하는 명령(현대)은?",
    "type": "multiple_choice",
    "options": [
      "git switch -c",
      "git move",
      "git go",
      "git fork"
    ],
    "answer": "0",
    "explanation": "switch -c.",
    "tags": [
      "git"
    ]
  },
  {
    "id": "p027",
    "minutes": 2,
    "difficulty": 2,
    "categoryId": "career",
    "title": "[진로/직무 감각] 커뮤니케이션",
    "prompt": "문제 상황 공유 시 가장 먼저 포함할 정보는?",
    "type": "multiple_choice",
    "options": [
      "재현 방법/환경/에러 로그",
      "감정",
      "추측 결론만",
      "관련 없는 링크"
    ],
    "answer": "0",
    "explanation": "재현/환경/로그가 핵심.",
    "tags": [
      "career"
    ]
  },
  {
    "id": "p028",
    "minutes": 2,
    "difficulty": 2,
    "categoryId": "system",
    "title": "[시스템/운영] 리눅스",
    "prompt": "현재 디렉토리 파일 목록을 보는 기본 명령은?",
    "type": "multiple_choice",
    "options": [
      "ls",
      "cd",
      "pwd",
      "cat"
    ],
    "answer": "0",
    "explanation": "ls는 list.",
    "tags": [
      "system"
    ]
  },
  {
    "id": "p029",
    "minutes": 2,
    "difficulty": 2,
    "categoryId": "html",
    "title": "[HTML] 접근성: 버튼",
    "prompt": "아이콘만 있는 버튼에 가장 먼저 챙겨야 할 것은?",
    "type": "multiple_choice",
    "options": [
      "aria-label(또는 숨김 텍스트)",
      "border",
      "margin",
      "tabindex=-1"
    ],
    "answer": "0",
    "explanation": "의미를 읽을 수 있어야 한다.",
    "tags": [
      "html"
    ]
  },
  {
    "id": "p030",
    "minutes": 2,
    "difficulty": 2,
    "categoryId": "css",
    "title": "[CSS] 포지셔닝",
    "prompt": "position: absolute의 기준이 되는 것은(일반적으로)?",
    "type": "multiple_choice",
    "options": [
      "가장 가까운 position이 지정된 조상",
      "항상 body",
      "항상 viewport",
      "항상 documentElement"
    ],
    "answer": "0",
    "explanation": "positioned ancestor 기준.",
    "tags": [
      "css"
    ]
  },
  {
    "id": "p031",
    "minutes": 2,
    "difficulty": 2,
    "categoryId": "js",
    "title": "[JavaScript] 이벤트",
    "prompt": "버튼 클릭 이벤트 핸들러 등록 API는?",
    "type": "multiple_choice",
    "options": [
      "addEventListener",
      "listen",
      "onClick()",
      "subscribeDOM"
    ],
    "answer": "0",
    "explanation": "표준 DOM API.",
    "tags": [
      "js"
    ]
  },
  {
    "id": "p032",
    "minutes": 2,
    "difficulty": 2,
    "categoryId": "web",
    "title": "[Web 기초] 보안: 쿠키",
    "prompt": "쿠키가 JS에서 접근되지 않도록 하는 속성은?",
    "type": "multiple_choice",
    "options": [
      "HttpOnly",
      "SameSite",
      "Max-Age",
      "Domain"
    ],
    "answer": "0",
    "explanation": "HttpOnly면 document.cookie 접근 불가.",
    "tags": [
      "web"
    ]
  },
  {
    "id": "p033",
    "minutes": 2,
    "difficulty": 2,
    "categoryId": "git",
    "title": "[Git] 리모트",
    "prompt": "원격 변경을 가져오되 머지는 하지 않는 것은?",
    "type": "multiple_choice",
    "options": [
      "git fetch",
      "git pull",
      "git push",
      "git commit"
    ],
    "answer": "0",
    "explanation": "fetch는 가져오기만.",
    "tags": [
      "git"
    ]
  },
  {
    "id": "p034",
    "minutes": 2,
    "difficulty": 2,
    "categoryId": "career",
    "title": "[진로/직무 감각] 직무 선택",
    "prompt": "“운영 안정성/관측/배포 자동화”에 가장 가까운 직무는?",
    "type": "multiple_choice",
    "options": [
      "SRE/DevOps",
      "디자이너",
      "PM",
      "영업"
    ],
    "answer": "0",
    "explanation": "운영/신뢰성/자동화 중심.",
    "tags": [
      "career"
    ]
  },
  {
    "id": "p035",
    "minutes": 2,
    "difficulty": 2,
    "categoryId": "system",
    "title": "[시스템/운영] 네트워크",
    "prompt": "TCP에서 연결 설정에 사용되는 것은?",
    "type": "multiple_choice",
    "options": [
      "3-way handshake",
      "2-way handshake",
      "UDP broadcast",
      "ARP cache"
    ],
    "answer": "0",
    "explanation": "SYN/SYN-ACK/ACK.",
    "tags": [
      "system"
    ]
  },
  {
    "id": "p036",
    "minutes": 2,
    "difficulty": 2,
    "categoryId": "html",
    "title": "[HTML] 폼: required",
    "prompt": "필수 입력을 브라우저 수준에서 표시/검증하도록 돕는 속성은?",
    "type": "multiple_choice",
    "options": [
      "required",
      "readonly",
      "checked",
      "disabled"
    ],
    "answer": "0",
    "explanation": "required는 기본 검증을 제공한다.",
    "tags": [
      "html"
    ]
  },
  {
    "id": "p037",
    "minutes": 2,
    "difficulty": 2,
    "categoryId": "css",
    "title": "[CSS] 레이아웃: 가운데 정렬",
    "prompt": "flex 컨테이너에서 수평/수직 가운데 정렬 조합은?",
    "type": "multiple_choice",
    "options": [
      "justify-content:center + align-items:center",
      "left:50%",
      "margin:auto만",
      "text-align:center만"
    ],
    "answer": "0",
    "explanation": "주축/교차축 정렬 조합.",
    "tags": [
      "css"
    ]
  },
  {
    "id": "p038",
    "minutes": 2,
    "difficulty": 2,
    "categoryId": "js",
    "title": "[JavaScript] 배열",
    "prompt": "배열에서 조건을 만족하는 첫 요소를 반환하는 메서드는?",
    "type": "multiple_choice",
    "options": [
      "find",
      "filter",
      "map",
      "reduce"
    ],
    "answer": "0",
    "explanation": "find는 첫 요소.",
    "tags": [
      "js"
    ]
  },
  {
    "id": "p039",
    "minutes": 2,
    "difficulty": 2,
    "categoryId": "web",
    "title": "[Web 기초] CORS",
    "prompt": "브라우저에서 다른 오리진으로 XHR/fetch를 제한하는 정책은?",
    "type": "multiple_choice",
    "options": [
      "SOP(동일 출처 정책)",
      "HSTS",
      "DNSSEC",
      "TLS"
    ],
    "answer": "0",
    "explanation": "기본은 SOP, 완화가 CORS.",
    "tags": [
      "web"
    ]
  },
  {
    "id": "p040",
    "minutes": 2,
    "difficulty": 2,
    "categoryId": "git",
    "title": "[Git] 커밋",
    "prompt": "변경을 “스냅샷”으로 기록하는 명령은?",
    "type": "multiple_choice",
    "options": [
      "git commit",
      "git push",
      "git fetch",
      "git clean"
    ],
    "answer": "0",
    "explanation": "commit은 로컬 기록.",
    "tags": [
      "git"
    ]
  },
  {
    "id": "p041",
    "minutes": 2,
    "difficulty": 2,
    "categoryId": "career",
    "title": "[진로/직무 감각] 성장 방식",
    "prompt": "초반에 가장 빠르게 실력을 올리는 방법에 가까운 것은?",
    "type": "multiple_choice",
    "options": [
      "작은 기능을 끝까지(기획-구현-QA-배포) 반복",
      "튜토리얼만 계속 보기",
      "설정만 계속 바꾸기",
      "뉴스만 읽기"
    ],
    "answer": "0",
    "explanation": "완결 루프가 학습 효율이 높다.",
    "tags": [
      "career"
    ]
  },
  {
    "id": "p042",
    "minutes": 2,
    "difficulty": 2,
    "categoryId": "system",
    "title": "[시스템/운영] 쿠버네티스",
    "prompt": "k8s에서 원하는 파드 개수를 유지하는 리소스는?",
    "type": "multiple_choice",
    "options": [
      "Deployment",
      "ConfigMap",
      "Secret",
      "Namespace"
    ],
    "answer": "0",
    "explanation": "Deployment가 ReplicaSet을 통해 유지.",
    "tags": [
      "system"
    ]
  },
  {
    "id": "p043",
    "minutes": 2,
    "difficulty": 2,
    "categoryId": "html",
    "title": "[HTML] 시맨틱 태그",
    "prompt": "“페이지 하단의 저작권/연락처” 영역에 가장 어울리는 태그는?",
    "type": "multiple_choice",
    "options": [
      "<footer>",
      "<nav>",
      "<main>",
      "<aside>"
    ],
    "answer": "0",
    "explanation": "하단 공통 정보는 footer가 시맨틱하다.",
    "tags": [
      "html"
    ]
  },
  {
    "id": "p044",
    "minutes": 2,
    "difficulty": 2,
    "categoryId": "css",
    "title": "[CSS] 선택자",
    "prompt": "클래스 선택자 표기는?",
    "type": "multiple_choice",
    "options": [
      "#btn",
      ".btn",
      "btn",
      "@btn"
    ],
    "answer": "1",
    "explanation": "클래스는 .",
    "tags": [
      "css"
    ]
  },
  {
    "id": "p045",
    "minutes": 2,
    "difficulty": 2,
    "categoryId": "js",
    "title": "[JavaScript] 비동기",
    "prompt": "Promise가 완료되었을 때 값을 받기 위해 쓰는 키워드는?",
    "type": "multiple_choice",
    "options": [
      "await",
      "yield",
      "defer",
      "sync"
    ],
    "answer": "0",
    "explanation": "async 함수 내에서 await.",
    "tags": [
      "js"
    ]
  },
  {
    "id": "p046",
    "minutes": 2,
    "difficulty": 2,
    "categoryId": "web",
    "title": "[Web 기초] HTTP",
    "prompt": "POST가 주로 의미하는 것은?",
    "type": "multiple_choice",
    "options": [
      "리소스 생성/처리 요청",
      "캐시 무효화",
      "정적 파일만 요청",
      "항상 멱등"
    ],
    "answer": "0",
    "explanation": "POST는 일반적으로 생성/처리.",
    "tags": [
      "web"
    ]
  },
  {
    "id": "p047",
    "minutes": 2,
    "difficulty": 2,
    "categoryId": "git",
    "title": "[Git] 브랜치",
    "prompt": "새 브랜치를 만들고 이동하는 명령(현대)은?",
    "type": "multiple_choice",
    "options": [
      "git switch -c",
      "git move",
      "git go",
      "git fork"
    ],
    "answer": "0",
    "explanation": "switch -c.",
    "tags": [
      "git"
    ]
  },
  {
    "id": "p048",
    "minutes": 2,
    "difficulty": 2,
    "categoryId": "career",
    "title": "[진로/직무 감각] 커뮤니케이션",
    "prompt": "문제 상황 공유 시 가장 먼저 포함할 정보는?",
    "type": "multiple_choice",
    "options": [
      "재현 방법/환경/에러 로그",
      "감정",
      "추측 결론만",
      "관련 없는 링크"
    ],
    "answer": "0",
    "explanation": "재현/환경/로그가 핵심.",
    "tags": [
      "career"
    ]
  },
  {
    "id": "p049",
    "minutes": 2,
    "difficulty": 2,
    "categoryId": "system",
    "title": "[시스템/운영] 리눅스",
    "prompt": "현재 디렉토리 파일 목록을 보는 기본 명령은?",
    "type": "multiple_choice",
    "options": [
      "ls",
      "cd",
      "pwd",
      "cat"
    ],
    "answer": "0",
    "explanation": "ls는 list.",
    "tags": [
      "system"
    ]
  },
  {
    "id": "p050",
    "minutes": 2,
    "difficulty": 2,
    "categoryId": "html",
    "title": "[HTML] 접근성: 버튼",
    "prompt": "아이콘만 있는 버튼에 가장 먼저 챙겨야 할 것은?",
    "type": "multiple_choice",
    "options": [
      "aria-label(또는 숨김 텍스트)",
      "border",
      "margin",
      "tabindex=-1"
    ],
    "answer": "0",
    "explanation": "의미를 읽을 수 있어야 한다.",
    "tags": [
      "html"
    ]
  },
  {
    "id": "p051",
    "minutes": 2,
    "difficulty": 2,
    "categoryId": "css",
    "title": "[CSS] 포지셔닝",
    "prompt": "position: absolute의 기준이 되는 것은(일반적으로)?",
    "type": "multiple_choice",
    "options": [
      "가장 가까운 position이 지정된 조상",
      "항상 body",
      "항상 viewport",
      "항상 documentElement"
    ],
    "answer": "0",
    "explanation": "positioned ancestor 기준.",
    "tags": [
      "css"
    ]
  },
  {
    "id": "p052",
    "minutes": 2,
    "difficulty": 2,
    "categoryId": "js",
    "title": "[JavaScript] 이벤트",
    "prompt": "버튼 클릭 이벤트 핸들러 등록 API는?",
    "type": "multiple_choice",
    "options": [
      "addEventListener",
      "listen",
      "onClick()",
      "subscribeDOM"
    ],
    "answer": "0",
    "explanation": "표준 DOM API.",
    "tags": [
      "js"
    ]
  },
  {
    "id": "p053",
    "minutes": 2,
    "difficulty": 2,
    "categoryId": "web",
    "title": "[Web 기초] 보안: 쿠키",
    "prompt": "쿠키가 JS에서 접근되지 않도록 하는 속성은?",
    "type": "multiple_choice",
    "options": [
      "HttpOnly",
      "SameSite",
      "Max-Age",
      "Domain"
    ],
    "answer": "0",
    "explanation": "HttpOnly면 document.cookie 접근 불가.",
    "tags": [
      "web"
    ]
  },
  {
    "id": "p054",
    "minutes": 2,
    "difficulty": 2,
    "categoryId": "git",
    "title": "[Git] 리모트",
    "prompt": "원격 변경을 가져오되 머지는 하지 않는 것은?",
    "type": "multiple_choice",
    "options": [
      "git fetch",
      "git pull",
      "git push",
      "git commit"
    ],
    "answer": "0",
    "explanation": "fetch는 가져오기만.",
    "tags": [
      "git"
    ]
  },
  {
    "id": "p055",
    "minutes": 2,
    "difficulty": 2,
    "categoryId": "career",
    "title": "[진로/직무 감각] 직무 선택",
    "prompt": "“운영 안정성/관측/배포 자동화”에 가장 가까운 직무는?",
    "type": "multiple_choice",
    "options": [
      "SRE/DevOps",
      "디자이너",
      "PM",
      "영업"
    ],
    "answer": "0",
    "explanation": "운영/신뢰성/자동화 중심.",
    "tags": [
      "career"
    ]
  },
  {
    "id": "p056",
    "minutes": 2,
    "difficulty": 2,
    "categoryId": "system",
    "title": "[시스템/운영] 네트워크",
    "prompt": "TCP에서 연결 설정에 사용되는 것은?",
    "type": "multiple_choice",
    "options": [
      "3-way handshake",
      "2-way handshake",
      "UDP broadcast",
      "ARP cache"
    ],
    "answer": "0",
    "explanation": "SYN/SYN-ACK/ACK.",
    "tags": [
      "system"
    ]
  },
  {
    "id": "p057",
    "minutes": 2,
    "difficulty": 2,
    "categoryId": "html",
    "title": "[HTML] 폼: required",
    "prompt": "필수 입력을 브라우저 수준에서 표시/검증하도록 돕는 속성은?",
    "type": "multiple_choice",
    "options": [
      "required",
      "readonly",
      "checked",
      "disabled"
    ],
    "answer": "0",
    "explanation": "required는 기본 검증을 제공한다.",
    "tags": [
      "html"
    ]
  },
  {
    "id": "p058",
    "minutes": 2,
    "difficulty": 2,
    "categoryId": "css",
    "title": "[CSS] 레이아웃: 가운데 정렬",
    "prompt": "flex 컨테이너에서 수평/수직 가운데 정렬 조합은?",
    "type": "multiple_choice",
    "options": [
      "justify-content:center + align-items:center",
      "left:50%",
      "margin:auto만",
      "text-align:center만"
    ],
    "answer": "0",
    "explanation": "주축/교차축 정렬 조합.",
    "tags": [
      "css"
    ]
  },
  {
    "id": "p059",
    "minutes": 2,
    "difficulty": 2,
    "categoryId": "js",
    "title": "[JavaScript] 배열",
    "prompt": "배열에서 조건을 만족하는 첫 요소를 반환하는 메서드는?",
    "type": "multiple_choice",
    "options": [
      "find",
      "filter",
      "map",
      "reduce"
    ],
    "answer": "0",
    "explanation": "find는 첫 요소.",
    "tags": [
      "js"
    ]
  },
  {
    "id": "p060",
    "minutes": 2,
    "difficulty": 2,
    "categoryId": "web",
    "title": "[Web 기초] CORS",
    "prompt": "브라우저에서 다른 오리진으로 XHR/fetch를 제한하는 정책은?",
    "type": "multiple_choice",
    "options": [
      "SOP(동일 출처 정책)",
      "HSTS",
      "DNSSEC",
      "TLS"
    ],
    "answer": "0",
    "explanation": "기본은 SOP, 완화가 CORS.",
    "tags": [
      "web"
    ]
  },
  {
    "id": "p061",
    "minutes": 2,
    "difficulty": 2,
    "categoryId": "git",
    "title": "[Git] 커밋",
    "prompt": "변경을 “스냅샷”으로 기록하는 명령은?",
    "type": "multiple_choice",
    "options": [
      "git commit",
      "git push",
      "git fetch",
      "git clean"
    ],
    "answer": "0",
    "explanation": "commit은 로컬 기록.",
    "tags": [
      "git"
    ]
  },
  {
    "id": "p062",
    "minutes": 2,
    "difficulty": 2,
    "categoryId": "career",
    "title": "[진로/직무 감각] 성장 방식",
    "prompt": "초반에 가장 빠르게 실력을 올리는 방법에 가까운 것은?",
    "type": "multiple_choice",
    "options": [
      "작은 기능을 끝까지(기획-구현-QA-배포) 반복",
      "튜토리얼만 계속 보기",
      "설정만 계속 바꾸기",
      "뉴스만 읽기"
    ],
    "answer": "0",
    "explanation": "완결 루프가 학습 효율이 높다.",
    "tags": [
      "career"
    ]
  },
  {
    "id": "p063",
    "minutes": 2,
    "difficulty": 2,
    "categoryId": "system",
    "title": "[시스템/운영] 쿠버네티스",
    "prompt": "k8s에서 원하는 파드 개수를 유지하는 리소스는?",
    "type": "multiple_choice",
    "options": [
      "Deployment",
      "ConfigMap",
      "Secret",
      "Namespace"
    ],
    "answer": "0",
    "explanation": "Deployment가 ReplicaSet을 통해 유지.",
    "tags": [
      "system"
    ]
  },
  {
    "id": "p064",
    "minutes": 2,
    "difficulty": 2,
    "categoryId": "html",
    "title": "[HTML] 시맨틱 태그",
    "prompt": "“페이지 하단의 저작권/연락처” 영역에 가장 어울리는 태그는?",
    "type": "multiple_choice",
    "options": [
      "<footer>",
      "<nav>",
      "<main>",
      "<aside>"
    ],
    "answer": "0",
    "explanation": "하단 공통 정보는 footer가 시맨틱하다.",
    "tags": [
      "html"
    ]
  },
  {
    "id": "p065",
    "minutes": 2,
    "difficulty": 2,
    "categoryId": "css",
    "title": "[CSS] 선택자",
    "prompt": "클래스 선택자 표기는?",
    "type": "multiple_choice",
    "options": [
      "#btn",
      ".btn",
      "btn",
      "@btn"
    ],
    "answer": "1",
    "explanation": "클래스는 .",
    "tags": [
      "css"
    ]
  },
  {
    "id": "p066",
    "minutes": 2,
    "difficulty": 2,
    "categoryId": "js",
    "title": "[JavaScript] 비동기",
    "prompt": "Promise가 완료되었을 때 값을 받기 위해 쓰는 키워드는?",
    "type": "multiple_choice",
    "options": [
      "await",
      "yield",
      "defer",
      "sync"
    ],
    "answer": "0",
    "explanation": "async 함수 내에서 await.",
    "tags": [
      "js"
    ]
  },
  {
    "id": "p067",
    "minutes": 2,
    "difficulty": 2,
    "categoryId": "web",
    "title": "[Web 기초] HTTP",
    "prompt": "POST가 주로 의미하는 것은?",
    "type": "multiple_choice",
    "options": [
      "리소스 생성/처리 요청",
      "캐시 무효화",
      "정적 파일만 요청",
      "항상 멱등"
    ],
    "answer": "0",
    "explanation": "POST는 일반적으로 생성/처리.",
    "tags": [
      "web"
    ]
  },
  {
    "id": "p068",
    "minutes": 2,
    "difficulty": 2,
    "categoryId": "git",
    "title": "[Git] 브랜치",
    "prompt": "새 브랜치를 만들고 이동하는 명령(현대)은?",
    "type": "multiple_choice",
    "options": [
      "git switch -c",
      "git move",
      "git go",
      "git fork"
    ],
    "answer": "0",
    "explanation": "switch -c.",
    "tags": [
      "git"
    ]
  },
  {
    "id": "p069",
    "minutes": 2,
    "difficulty": 2,
    "categoryId": "career",
    "title": "[진로/직무 감각] 커뮤니케이션",
    "prompt": "문제 상황 공유 시 가장 먼저 포함할 정보는?",
    "type": "multiple_choice",
    "options": [
      "재현 방법/환경/에러 로그",
      "감정",
      "추측 결론만",
      "관련 없는 링크"
    ],
    "answer": "0",
    "explanation": "재현/환경/로그가 핵심.",
    "tags": [
      "career"
    ]
  },
  {
    "id": "p070",
    "minutes": 2,
    "difficulty": 2,
    "categoryId": "system",
    "title": "[시스템/운영] 리눅스",
    "prompt": "현재 디렉토리 파일 목록을 보는 기본 명령은?",
    "type": "multiple_choice",
    "options": [
      "ls",
      "cd",
      "pwd",
      "cat"
    ],
    "answer": "0",
    "explanation": "ls는 list.",
    "tags": [
      "system"
    ]
  },
  {
    "id": "p071",
    "minutes": 2,
    "difficulty": 2,
    "categoryId": "html",
    "title": "[HTML] 접근성: 버튼",
    "prompt": "아이콘만 있는 버튼에 가장 먼저 챙겨야 할 것은?",
    "type": "multiple_choice",
    "options": [
      "aria-label(또는 숨김 텍스트)",
      "border",
      "margin",
      "tabindex=-1"
    ],
    "answer": "0",
    "explanation": "의미를 읽을 수 있어야 한다.",
    "tags": [
      "html"
    ]
  },
  {
    "id": "p072",
    "minutes": 2,
    "difficulty": 2,
    "categoryId": "css",
    "title": "[CSS] 포지셔닝",
    "prompt": "position: absolute의 기준이 되는 것은(일반적으로)?",
    "type": "multiple_choice",
    "options": [
      "가장 가까운 position이 지정된 조상",
      "항상 body",
      "항상 viewport",
      "항상 documentElement"
    ],
    "answer": "0",
    "explanation": "positioned ancestor 기준.",
    "tags": [
      "css"
    ]
  },
  {
    "id": "p073",
    "minutes": 2,
    "difficulty": 2,
    "categoryId": "js",
    "title": "[JavaScript] 이벤트",
    "prompt": "버튼 클릭 이벤트 핸들러 등록 API는?",
    "type": "multiple_choice",
    "options": [
      "addEventListener",
      "listen",
      "onClick()",
      "subscribeDOM"
    ],
    "answer": "0",
    "explanation": "표준 DOM API.",
    "tags": [
      "js"
    ]
  },
  {
    "id": "p074",
    "minutes": 2,
    "difficulty": 2,
    "categoryId": "web",
    "title": "[Web 기초] 보안: 쿠키",
    "prompt": "쿠키가 JS에서 접근되지 않도록 하는 속성은?",
    "type": "multiple_choice",
    "options": [
      "HttpOnly",
      "SameSite",
      "Max-Age",
      "Domain"
    ],
    "answer": "0",
    "explanation": "HttpOnly면 document.cookie 접근 불가.",
    "tags": [
      "web"
    ]
  },
  {
    "id": "p075",
    "minutes": 2,
    "difficulty": 2,
    "categoryId": "git",
    "title": "[Git] 리모트",
    "prompt": "원격 변경을 가져오되 머지는 하지 않는 것은?",
    "type": "multiple_choice",
    "options": [
      "git fetch",
      "git pull",
      "git push",
      "git commit"
    ],
    "answer": "0",
    "explanation": "fetch는 가져오기만.",
    "tags": [
      "git"
    ]
  },
  {
    "id": "p076",
    "minutes": 2,
    "difficulty": 2,
    "categoryId": "career",
    "title": "[진로/직무 감각] 직무 선택",
    "prompt": "“운영 안정성/관측/배포 자동화”에 가장 가까운 직무는?",
    "type": "multiple_choice",
    "options": [
      "SRE/DevOps",
      "디자이너",
      "PM",
      "영업"
    ],
    "answer": "0",
    "explanation": "운영/신뢰성/자동화 중심.",
    "tags": [
      "career"
    ]
  },
  {
    "id": "p077",
    "minutes": 2,
    "difficulty": 2,
    "categoryId": "system",
    "title": "[시스템/운영] 네트워크",
    "prompt": "TCP에서 연결 설정에 사용되는 것은?",
    "type": "multiple_choice",
    "options": [
      "3-way handshake",
      "2-way handshake",
      "UDP broadcast",
      "ARP cache"
    ],
    "answer": "0",
    "explanation": "SYN/SYN-ACK/ACK.",
    "tags": [
      "system"
    ]
  },
  {
    "id": "p078",
    "minutes": 2,
    "difficulty": 2,
    "categoryId": "html",
    "title": "[HTML] 폼: required",
    "prompt": "필수 입력을 브라우저 수준에서 표시/검증하도록 돕는 속성은?",
    "type": "multiple_choice",
    "options": [
      "required",
      "readonly",
      "checked",
      "disabled"
    ],
    "answer": "0",
    "explanation": "required는 기본 검증을 제공한다.",
    "tags": [
      "html"
    ]
  },
  {
    "id": "p079",
    "minutes": 2,
    "difficulty": 2,
    "categoryId": "css",
    "title": "[CSS] 레이아웃: 가운데 정렬",
    "prompt": "flex 컨테이너에서 수평/수직 가운데 정렬 조합은?",
    "type": "multiple_choice",
    "options": [
      "justify-content:center + align-items:center",
      "left:50%",
      "margin:auto만",
      "text-align:center만"
    ],
    "answer": "0",
    "explanation": "주축/교차축 정렬 조합.",
    "tags": [
      "css"
    ]
  },
  {
    "id": "p080",
    "minutes": 2,
    "difficulty": 2,
    "categoryId": "js",
    "title": "[JavaScript] 배열",
    "prompt": "배열에서 조건을 만족하는 첫 요소를 반환하는 메서드는?",
    "type": "multiple_choice",
    "options": [
      "find",
      "filter",
      "map",
      "reduce"
    ],
    "answer": "0",
    "explanation": "find는 첫 요소.",
    "tags": [
      "js"
    ]
  },
  {
    "id": "p081",
    "minutes": 2,
    "difficulty": 2,
    "categoryId": "web",
    "title": "[Web 기초] CORS",
    "prompt": "브라우저에서 다른 오리진으로 XHR/fetch를 제한하는 정책은?",
    "type": "multiple_choice",
    "options": [
      "SOP(동일 출처 정책)",
      "HSTS",
      "DNSSEC",
      "TLS"
    ],
    "answer": "0",
    "explanation": "기본은 SOP, 완화가 CORS.",
    "tags": [
      "web"
    ]
  },
  {
    "id": "p082",
    "minutes": 2,
    "difficulty": 2,
    "categoryId": "git",
    "title": "[Git] 커밋",
    "prompt": "변경을 “스냅샷”으로 기록하는 명령은?",
    "type": "multiple_choice",
    "options": [
      "git commit",
      "git push",
      "git fetch",
      "git clean"
    ],
    "answer": "0",
    "explanation": "commit은 로컬 기록.",
    "tags": [
      "git"
    ]
  },
  {
    "id": "p083",
    "minutes": 2,
    "difficulty": 2,
    "categoryId": "career",
    "title": "[진로/직무 감각] 성장 방식",
    "prompt": "초반에 가장 빠르게 실력을 올리는 방법에 가까운 것은?",
    "type": "multiple_choice",
    "options": [
      "작은 기능을 끝까지(기획-구현-QA-배포) 반복",
      "튜토리얼만 계속 보기",
      "설정만 계속 바꾸기",
      "뉴스만 읽기"
    ],
    "answer": "0",
    "explanation": "완결 루프가 학습 효율이 높다.",
    "tags": [
      "career"
    ]
  },
  {
    "id": "p084",
    "minutes": 2,
    "difficulty": 2,
    "categoryId": "system",
    "title": "[시스템/운영] 쿠버네티스",
    "prompt": "k8s에서 원하는 파드 개수를 유지하는 리소스는?",
    "type": "multiple_choice",
    "options": [
      "Deployment",
      "ConfigMap",
      "Secret",
      "Namespace"
    ],
    "answer": "0",
    "explanation": "Deployment가 ReplicaSet을 통해 유지.",
    "tags": [
      "system"
    ]
  },
  {
    "id": "p085",
    "minutes": 2,
    "difficulty": 2,
    "categoryId": "html",
    "title": "[HTML] 시맨틱 태그",
    "prompt": "“페이지 하단의 저작권/연락처” 영역에 가장 어울리는 태그는?",
    "type": "multiple_choice",
    "options": [
      "<footer>",
      "<nav>",
      "<main>",
      "<aside>"
    ],
    "answer": "0",
    "explanation": "하단 공통 정보는 footer가 시맨틱하다.",
    "tags": [
      "html"
    ]
  },
  {
    "id": "p086",
    "minutes": 2,
    "difficulty": 2,
    "categoryId": "css",
    "title": "[CSS] 선택자",
    "prompt": "클래스 선택자 표기는?",
    "type": "multiple_choice",
    "options": [
      "#btn",
      ".btn",
      "btn",
      "@btn"
    ],
    "answer": "1",
    "explanation": "클래스는 .",
    "tags": [
      "css"
    ]
  },
  {
    "id": "p087",
    "minutes": 2,
    "difficulty": 2,
    "categoryId": "js",
    "title": "[JavaScript] 비동기",
    "prompt": "Promise가 완료되었을 때 값을 받기 위해 쓰는 키워드는?",
    "type": "multiple_choice",
    "options": [
      "await",
      "yield",
      "defer",
      "sync"
    ],
    "answer": "0",
    "explanation": "async 함수 내에서 await.",
    "tags": [
      "js"
    ]
  },
  {
    "id": "p088",
    "minutes": 2,
    "difficulty": 2,
    "categoryId": "web",
    "title": "[Web 기초] HTTP",
    "prompt": "POST가 주로 의미하는 것은?",
    "type": "multiple_choice",
    "options": [
      "리소스 생성/처리 요청",
      "캐시 무효화",
      "정적 파일만 요청",
      "항상 멱등"
    ],
    "answer": "0",
    "explanation": "POST는 일반적으로 생성/처리.",
    "tags": [
      "web"
    ]
  },
  {
    "id": "p089",
    "minutes": 2,
    "difficulty": 2,
    "categoryId": "git",
    "title": "[Git] 브랜치",
    "prompt": "새 브랜치를 만들고 이동하는 명령(현대)은?",
    "type": "multiple_choice",
    "options": [
      "git switch -c",
      "git move",
      "git go",
      "git fork"
    ],
    "answer": "0",
    "explanation": "switch -c.",
    "tags": [
      "git"
    ]
  },
  {
    "id": "p090",
    "minutes": 2,
    "difficulty": 2,
    "categoryId": "career",
    "title": "[진로/직무 감각] 커뮤니케이션",
    "prompt": "문제 상황 공유 시 가장 먼저 포함할 정보는?",
    "type": "multiple_choice",
    "options": [
      "재현 방법/환경/에러 로그",
      "감정",
      "추측 결론만",
      "관련 없는 링크"
    ],
    "answer": "0",
    "explanation": "재현/환경/로그가 핵심.",
    "tags": [
      "career"
    ]
  },
  {
    "id": "p091",
    "minutes": 2,
    "difficulty": 2,
    "categoryId": "system",
    "title": "[시스템/운영] 리눅스",
    "prompt": "현재 디렉토리 파일 목록을 보는 기본 명령은?",
    "type": "multiple_choice",
    "options": [
      "ls",
      "cd",
      "pwd",
      "cat"
    ],
    "answer": "0",
    "explanation": "ls는 list.",
    "tags": [
      "system"
    ]
  },
  {
    "id": "p092",
    "minutes": 2,
    "difficulty": 2,
    "categoryId": "html",
    "title": "[HTML] 접근성: 버튼",
    "prompt": "아이콘만 있는 버튼에 가장 먼저 챙겨야 할 것은?",
    "type": "multiple_choice",
    "options": [
      "aria-label(또는 숨김 텍스트)",
      "border",
      "margin",
      "tabindex=-1"
    ],
    "answer": "0",
    "explanation": "의미를 읽을 수 있어야 한다.",
    "tags": [
      "html"
    ]
  },
  {
    "id": "p093",
    "minutes": 2,
    "difficulty": 2,
    "categoryId": "css",
    "title": "[CSS] 포지셔닝",
    "prompt": "position: absolute의 기준이 되는 것은(일반적으로)?",
    "type": "multiple_choice",
    "options": [
      "가장 가까운 position이 지정된 조상",
      "항상 body",
      "항상 viewport",
      "항상 documentElement"
    ],
    "answer": "0",
    "explanation": "positioned ancestor 기준.",
    "tags": [
      "css"
    ]
  },
  {
    "id": "p094",
    "minutes": 2,
    "difficulty": 2,
    "categoryId": "js",
    "title": "[JavaScript] 이벤트",
    "prompt": "버튼 클릭 이벤트 핸들러 등록 API는?",
    "type": "multiple_choice",
    "options": [
      "addEventListener",
      "listen",
      "onClick()",
      "subscribeDOM"
    ],
    "answer": "0",
    "explanation": "표준 DOM API.",
    "tags": [
      "js"
    ]
  },
  {
    "id": "p095",
    "minutes": 2,
    "difficulty": 2,
    "categoryId": "web",
    "title": "[Web 기초] 보안: 쿠키",
    "prompt": "쿠키가 JS에서 접근되지 않도록 하는 속성은?",
    "type": "multiple_choice",
    "options": [
      "HttpOnly",
      "SameSite",
      "Max-Age",
      "Domain"
    ],
    "answer": "0",
    "explanation": "HttpOnly면 document.cookie 접근 불가.",
    "tags": [
      "web"
    ]
  },
  {
    "id": "p096",
    "minutes": 2,
    "difficulty": 2,
    "categoryId": "git",
    "title": "[Git] 리모트",
    "prompt": "원격 변경을 가져오되 머지는 하지 않는 것은?",
    "type": "multiple_choice",
    "options": [
      "git fetch",
      "git pull",
      "git push",
      "git commit"
    ],
    "answer": "0",
    "explanation": "fetch는 가져오기만.",
    "tags": [
      "git"
    ]
  },
  {
    "id": "p097",
    "minutes": 2,
    "difficulty": 2,
    "categoryId": "career",
    "title": "[진로/직무 감각] 직무 선택",
    "prompt": "“운영 안정성/관측/배포 자동화”에 가장 가까운 직무는?",
    "type": "multiple_choice",
    "options": [
      "SRE/DevOps",
      "디자이너",
      "PM",
      "영업"
    ],
    "answer": "0",
    "explanation": "운영/신뢰성/자동화 중심.",
    "tags": [
      "career"
    ]
  },
  {
    "id": "p098",
    "minutes": 2,
    "difficulty": 2,
    "categoryId": "system",
    "title": "[시스템/운영] 네트워크",
    "prompt": "TCP에서 연결 설정에 사용되는 것은?",
    "type": "multiple_choice",
    "options": [
      "3-way handshake",
      "2-way handshake",
      "UDP broadcast",
      "ARP cache"
    ],
    "answer": "0",
    "explanation": "SYN/SYN-ACK/ACK.",
    "tags": [
      "system"
    ]
  },
  {
    "id": "p099",
    "minutes": 2,
    "difficulty": 2,
    "categoryId": "html",
    "title": "[HTML] 폼: required",
    "prompt": "필수 입력을 브라우저 수준에서 표시/검증하도록 돕는 속성은?",
    "type": "multiple_choice",
    "options": [
      "required",
      "readonly",
      "checked",
      "disabled"
    ],
    "answer": "0",
    "explanation": "required는 기본 검증을 제공한다.",
    "tags": [
      "html"
    ]
  },
  {
    "id": "p100",
    "minutes": 2,
    "difficulty": 2,
    "categoryId": "css",
    "title": "[CSS] 레이아웃: 가운데 정렬",
    "prompt": "flex 컨테이너에서 수평/수직 가운데 정렬 조합은?",
    "type": "multiple_choice",
    "options": [
      "justify-content:center + align-items:center",
      "left:50%",
      "margin:auto만",
      "text-align:center만"
    ],
    "answer": "0",
    "explanation": "주축/교차축 정렬 조합.",
    "tags": [
      "css"
    ]
  }
] as Problem[];

export const problemsById: Record<string, Problem> = Object.fromEntries(problems.map(p => [p.id, p]));
