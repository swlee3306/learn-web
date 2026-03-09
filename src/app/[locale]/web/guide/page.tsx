import Link from 'next/link';
import {getLocale} from 'next-intl/server';

export default async function WebGuidePage() {
  const locale = await getLocale();

  return (
    <div className="grid">
      <section className="hero">
        <div className="kicker">WEB GUIDE</div>
        <h1 className="h1">웹 미션 가이드</h1>
        <p className="p" style={{maxWidth: 820}}>
          이 웹 프로그램은 “짧은 미션 → 바로 실행(Run) → 검사(자동 채점) → 통과하면 다음” 흐름으로 학습하게 설계됐어.
          막힐 때는 아래 체크리스트대로만 순서대로 확인하면 대부분 해결돼.
        </p>
        <div style={{marginTop: 12, display: 'flex', gap: 8, flexWrap: 'wrap'}}>
          <Link className="btn btnPrimary" href={`/${locale}/web`}>웹 미션 목록으로</Link>
          <Link className="btn" href={`/${locale}/web/lessons`}>기초 강좌(영상) 보기</Link>
        </div>
      </section>

      <section className="card">
        <h3 className="cardTitle" style={{fontSize: 18}}>기본 사용법</h3>
        <div className="cards" style={{marginTop: 12}}>
          <div className="smallCard">
            <div className="smallTitle">Run</div>
            <div className="smallText">지금 작성한 HTML/CSS/JS를 Preview(iframe)에 반영해.</div>
          </div>
          <div className="smallCard">
            <div className="smallTitle">Reset</div>
            <div className="smallText">현재 미션의 초기 코드(기본값)로 되돌려.</div>
          </div>
          <div className="smallCard">
            <div className="smallTitle">검사</div>
            <div className="smallText">자동 테스트를 실행해서 PASS/FAIL과 힌트를 보여줘. PASS가 모두 뜨면 미션 완료로 기록돼.</div>
          </div>
        </div>
      </section>

      <section className="card">
        <h3 className="cardTitle" style={{fontSize: 18}}>추천 풀이 루틴(이 순서대로)</h3>
        <ol style={{margin: '10px 0 0 18px', lineHeight: 1.8, color: 'var(--muted)'}}>
          <li><b>목표 읽기</b>: 화면에서 무엇이 바뀌어야 하는지(텍스트/색/리스트/버튼 상태)를 한 문장으로 요약</li>
          <li><b>요소 잡기</b>: 필요한 DOM을 <code>querySelector</code>로 가져오기</li>
          <li><b>이벤트 달기</b>: click / input / change / submit 중 무엇인지 결정해서 리스너 추가</li>
          <li><b>상태 만들기</b>: 숫자/문자/배열/boolean 상태 변수 선언</li>
          <li><b>render()</b>: 상태를 기반으로 DOM을 업데이트(텍스트/클래스/innerHTML)</li>
          <li><b>검사</b>: FAIL 뜨면 힌트에 나온 탭으로 이동해서 한 개씩 고치기</li>
        </ol>
      </section>

      <section className="card">
        <h3 className="cardTitle" style={{fontSize: 18}}>자주 나는 에러 Top 6</h3>
        <ul style={{margin: '10px 0 0 18px', lineHeight: 1.8, color: 'var(--muted)'}}>
          <li><b>Cannot read properties of null</b> → selector가 틀림( id/# , class/. , 오타 )</li>
          <li><b>버튼 눌러도 변화 없음</b> → 이벤트 리스너가 안 달렸거나 render() 호출이 빠짐</li>
          <li><b>테스트가 Timed out</b> → JS 에러로 sandbox가 멈췄을 가능성 (검사 결과 빨간 로그 확인)</li>
          <li><b>class가 안 붙음</b> → <code>classList.add</code>/<code>toggle</code>의 대상 요소가 맞는지 확인</li>
          <li><b>폼 제출하면 새로고침</b> → submit 핸들러에서 <code>e.preventDefault()</code> 필요</li>
          <li><b>fetch 실패</b> → CORS/네트워크/https 혼용. 먼저 로딩/에러 UI부터 구현해두면 디버깅이 쉬움</li>
        </ul>
      </section>

      <section className="card">
        <h3 className="cardTitle" style={{fontSize: 18}}>다음 개선 예정</h3>
        <div className="smallText" style={{marginTop: 10, color: 'var(--muted)'}}>
          미션별로 “진행 방향(어디를 고치면 되는지)” 설명을 더 두껍게 넣고, 관련 기초 강좌(영상) 링크를 미션 화면에서 바로 볼 수 있게 연결할게.
        </div>
      </section>
    </div>
  );
}
