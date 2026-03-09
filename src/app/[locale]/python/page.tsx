import {getLocale} from 'next-intl/server';

export default async function PythonTrackPage() {
  const locale = await getLocale();

  return (
    <div className="grid">
      <section className="hero">
        <div className="kicker">PYTHON STARTER</div>
        <h1 className="h1">Python 스타터 (로컬 설치/실습)</h1>
        <p className="p">
          브라우저에서 Python 실행은 v2에서 제공 예정. 지금은 “내 PC에 설치해서 진짜로 실행”을 먼저 해보자.
        </p>
      </section>

      <section className="card">
        <h2 className="cardTitle" style={{fontSize: 20}}>1) Python 설치</h2>
        <p className="cardDesc">Windows/Mac/Linux 모두 가능. 설치 후 터미널에서 <code>python --version</code>이 나오면 성공.</p>
        <ul style={{color: 'var(--muted)', lineHeight: 1.7}}>
          <li><b>Windows</b>: python.org에서 3.12+ 설치 ({'"'}Add Python to PATH{'"'} 체크)</li>
          <li><b>macOS</b>: Homebrew 추천: <code>brew install python</code></li>
          <li><b>Linux</b>: <code>sudo apt-get install -y python3 python3-venv</code></li>
        </ul>
      </section>

      <section className="card">
        <h2 className="cardTitle" style={{fontSize: 20}}>2) 프로젝트 폴더 만들기 + 가상환경</h2>
        <pre style={{whiteSpace: 'pre-wrap', color: 'var(--muted)'}}>
{`mkdir learn-python
cd learn-python
python -m venv .venv
# Windows: .venv\\Scripts\\activate
# macOS/Linux: source .venv/bin/activate
python --version
`}
        </pre>
      </section>

      <section className="card">
        <h2 className="cardTitle" style={{fontSize: 20}}>3) 첫 미션(로컬)</h2>
        <p className="cardDesc">아래 코드를 <code>main.py</code>로 저장하고 실행해봐.</p>
        <pre style={{whiteSpace: 'pre-wrap', color: 'var(--muted)'}}>
{`name = input("너의 닉네임은? ")
print(f"안녕, {name}! 오늘은 코딩 첫날이야.\n")

items = ["치킨", "피자", "라면", "샐러드"]
print("오늘의 랜덤 추천:")
import random
print(random.choice(items))
`}
        </pre>
        <pre style={{whiteSpace: 'pre-wrap', color: 'var(--muted)'}}>
{`python main.py
`}
        </pre>
        <p className="cardDesc">잘 되면 다음에 파일 읽기/쓰기, API 호출, 간단한 웹서버(FastAPI)로 이어갈 거야.</p>
      </section>

      <section className="card" style={{opacity: 0.9}}>
        <div className="kicker">LOCALE</div>
        <p className="cardDesc">현재 페이지는 {locale.toUpperCase()}로 렌더링 중. (컨텐츠는 추후 EN 버전도 확장)</p>
      </section>
    </div>
  );
}
