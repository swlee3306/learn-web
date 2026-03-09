import fs from 'node:fs';
import path from 'node:path';

const outPath = path.resolve('src/content/problems.ts');

const categories = [
  {id: 'html', title: 'HTML', desc: '문서 구조/시맨틱/접근성 기초'},
  {id: 'css', title: 'CSS', desc: '레이아웃/선택자/디자인 시스템 기초'},
  {id: 'js', title: 'JavaScript', desc: '문법/비동기/DOM/이벤트'},
  {id: 'web', title: 'Web 기초', desc: 'HTTP/브라우저/보안/성능'},
  {id: 'git', title: 'Git', desc: '버전관리/협업 플로우'},
  {id: 'career', title: '진로/직무 감각', desc: '직무별 업무/의사결정/실전 감각'},
  {id: 'system', title: '시스템/운영', desc: '리눅스/컨테이너/쿠버네티스 감각'}
];

/** @type {Array<any>} */
const problems = [];
let n = 1;
const pad = (x) => String(x).padStart(3, '0');

function add(p) {
  problems.push({
    id: `p${pad(n++)}`,
    minutes: 2,
    difficulty: 2,
    ...p
  });
}

// A small pool of question templates per category.
const pool = {
  html: [
    {title: '시맨틱 태그', q: '“페이지 하단의 저작권/연락처” 영역에 가장 어울리는 태그는?', opts: ['<footer>','<nav>','<main>','<aside>'], a: '0', exp: '하단 공통 정보는 footer가 시맨틱하다.'},
    {title: '접근성: 버튼', q: '아이콘만 있는 버튼에 가장 먼저 챙겨야 할 것은?', opts: ['aria-label(또는 숨김 텍스트)','border','margin','tabindex=-1'], a: '0', exp: '의미를 읽을 수 있어야 한다.'},
    {title: '폼: required', q: '필수 입력을 브라우저 수준에서 표시/검증하도록 돕는 속성은?', opts: ['required','readonly','checked','disabled'], a: '0', exp: 'required는 기본 검증을 제공한다.'}
  ],
  css: [
    {title: '레이아웃: 가운데 정렬', q: 'flex 컨테이너에서 수평/수직 가운데 정렬 조합은?', opts: ['justify-content:center + align-items:center','left:50%','margin:auto만','text-align:center만'], a: '0', exp: '주축/교차축 정렬 조합.'},
    {title: '선택자', q: '클래스 선택자 표기는?', opts: ['#btn','.btn','btn','@btn'], a: '1', exp: '클래스는 .'},
    {title: '포지셔닝', q: 'position: absolute의 기준이 되는 것은(일반적으로)?', opts: ['가장 가까운 position이 지정된 조상','항상 body','항상 viewport','항상 documentElement'], a: '0', exp: 'positioned ancestor 기준.'}
  ],
  js: [
    {title: '이벤트', q: '버튼 클릭 이벤트 핸들러 등록 API는?', opts: ['addEventListener','listen','onClick()','subscribeDOM'], a: '0', exp: '표준 DOM API.'},
    {title: '배열', q: '배열에서 조건을 만족하는 첫 요소를 반환하는 메서드는?', opts: ['find','filter','map','reduce'], a: '0', exp: 'find는 첫 요소.'},
    {title: '비동기', q: 'Promise가 완료되었을 때 값을 받기 위해 쓰는 키워드는?', opts: ['await','yield','defer','sync'], a: '0', exp: 'async 함수 내에서 await.'}
  ],
  web: [
    {title: 'HTTP', q: 'POST가 주로 의미하는 것은?', opts: ['리소스 생성/처리 요청','캐시 무효화','정적 파일만 요청','항상 멱등'], a: '0', exp: 'POST는 일반적으로 생성/처리.'},
    {title: '보안: 쿠키', q: '쿠키가 JS에서 접근되지 않도록 하는 속성은?', opts: ['HttpOnly','SameSite','Max-Age','Domain'], a: '0', exp: 'HttpOnly면 document.cookie 접근 불가.'},
    {title: 'CORS', q: '브라우저에서 다른 오리진으로 XHR/fetch를 제한하는 정책은?', opts: ['SOP(동일 출처 정책)','HSTS','DNSSEC','TLS'], a: '0', exp: '기본은 SOP, 완화가 CORS.'}
  ],
  git: [
    {title: '커밋', q: '변경을 “스냅샷”으로 기록하는 명령은?', opts: ['git commit','git push','git fetch','git clean'], a: '0', exp: 'commit은 로컬 기록.'},
    {title: '브랜치', q: '새 브랜치를 만들고 이동하는 명령(현대)은?', opts: ['git switch -c','git move','git go','git fork'], a: '0', exp: 'switch -c.'},
    {title: '리모트', q: '원격 변경을 가져오되 머지는 하지 않는 것은?', opts: ['git fetch','git pull','git push','git commit'], a: '0', exp: 'fetch는 가져오기만.'}
  ],
  career: [
    {title: '직무 선택', q: '“운영 안정성/관측/배포 자동화”에 가장 가까운 직무는?', opts: ['SRE/DevOps','디자이너','PM','영업'], a: '0', exp: '운영/신뢰성/자동화 중심.'},
    {title: '성장 방식', q: '초반에 가장 빠르게 실력을 올리는 방법에 가까운 것은?', opts: ['작은 기능을 끝까지(기획-구현-QA-배포) 반복','튜토리얼만 계속 보기','설정만 계속 바꾸기','뉴스만 읽기'], a: '0', exp: '완결 루프가 학습 효율이 높다.'},
    {title: '커뮤니케이션', q: '문제 상황 공유 시 가장 먼저 포함할 정보는?', opts: ['재현 방법/환경/에러 로그','감정','추측 결론만','관련 없는 링크'], a: '0', exp: '재현/환경/로그가 핵심.'}
  ],
  system: [
    {title: '리눅스', q: '현재 디렉토리 파일 목록을 보는 기본 명령은?', opts: ['ls','cd','pwd','cat'], a: '0', exp: 'ls는 list.'},
    {title: '네트워크', q: 'TCP에서 연결 설정에 사용되는 것은?', opts: ['3-way handshake','2-way handshake','UDP broadcast','ARP cache'], a: '0', exp: 'SYN/SYN-ACK/ACK.'},
    {title: '쿠버네티스', q: 'k8s에서 원하는 파드 개수를 유지하는 리소스는?', opts: ['Deployment','ConfigMap','Secret','Namespace'], a: '0', exp: 'Deployment가 ReplicaSet을 통해 유지.'}
  ]
};

// Fill to 100 by round-robin.
const order = ['html','css','js','web','git','career','system'];
while (problems.length < 100) {
  for (const cid of order) {
    if (problems.length >= 100) break;
    const t = pool[cid][problems.length % pool[cid].length];
    add({
      categoryId: cid,
      title: `[${categories.find(c=>c.id===cid).title}] ${t.title}`,
      prompt: t.q,
      type: 'multiple_choice',
      options: t.opts,
      answer: t.a,
      explanation: t.exp,
      tags: [cid]
    });
  }
}

const ts = `export type ProblemCategory = {\n  id: string;\n  title: string;\n  desc: string;\n};\n\nexport type Problem = {\n  id: string;\n  categoryId: string;\n  title: string;\n  prompt: string;\n  type: 'multiple_choice' | 'short_text';\n  options?: string[];\n  answer: string | string[];\n  explanation: string;\n  difficulty: 1 | 2 | 3 | 4 | 5;\n  tags?: string[];\n  minutes?: number;\n};\n\nexport const problemCategories: ProblemCategory[] = ${JSON.stringify(categories, null, 2)} as any;\n\nexport const problems: Problem[] = ${JSON.stringify(problems, null, 2)} as any;\n\nexport const problemsById: Record<string, Problem> = Object.fromEntries(problems.map(p => [p.id, p]));\n`;

fs.mkdirSync(path.dirname(outPath), {recursive: true});
fs.writeFileSync(outPath, ts, 'utf8');
console.log(`Wrote ${problems.length} problems -> ${outPath}`);
