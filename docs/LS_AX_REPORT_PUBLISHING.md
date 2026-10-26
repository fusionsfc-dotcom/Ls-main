# LS AX 병원 브리핑 게시 규약

## 글과 목록

- 상세 파일: `public/reports/daily/ls-ax-YYYY-MM-DD.html`
- 공개 URL: `/reports/daily/ls-ax-YYYY-MM-DD.html`
- HTML 안에 스타일·스크립트·보고서 본문을 포함한다. 외부 데이터 요청 없이 기본 열람·필터·차트가 작동해야 한다.
- `src/app/data/insightsData.ts` 첫 항목에 healthcare 도메인, `LS AX 병원 브리핑` 분류, 제목·날짜·요약·상세 URL을 등록한다. 기존 항목은 보존한다.
- 승인된 글의 URL만 `src/app/constants/publicSampleReportLinks.ts`에 추가한다. 다른 보고서의 접근 정책은 변경하지 않는다.
- `GuardedReportLink`는 공개 HTML 상세를 문서 탐색으로 연다. SPA 화면 안에 HTML 경로를 잘못 처리하지 않도록 한다.

## 중복과 개정

- 공개 식별자는 리포트 날짜와 공개 개정 번호다. `public/reports/daily/catalog.json`에 날짜·version·URL·SHA-256을 기록한다.
- 같은 날짜와 같은 본문 해시는 재게시하지 않는다. 같은 날짜에 내용이 다르면 새 글을 중복 생성하지 말고 정정 내용을 검토한 후 기존 URL의 version을 올린다.
- HTML 파일의 실제 UTF-8 바이트 SHA-256을 사용한다. 원본 수신 식별자·이메일 헤더·개인 계정은 공개 파일과 커밋에 포함하지 않는다.
- 외부 수신 식별자로도 중복 처리가 필요하면 비공개 처리 장부를 별도로 사용한다. 공개 해시는 그 장부를 대체하지 않는다.

## 게시 전 점검

1. 공식 자료·보도·학술 자료를 구분한다. 발표일·적용일·대상 집단을 확인하고, 미확정 제도를 확정 시행처럼 쓰지 않는다.
2. 의료·보험·법률의 구체적인 금액·횟수·급여 조건은 공식 근거와 대조한다. 확인 못한 세부 단정은 제거하거나 확인 필요로 한정한다.
3. 익명화 전 환자 자료·개인정보·내부 검토 문구·계정정보를 넣지 않는다. 원무과 등 실제 독자·담당 부서명은 유지한다.
4. 본문과 핵심 카드·차트·체크리스트·상세 분석의 수치와 표현을 함께 점검한다.
5. 빌드와 데스크톱·모바일 검증 후 게시한다. 목록 카드, 고유 상세 URL 직접 진입·새로고침, 출처 링크, 필터·차트·체크리스트를 확인한다.

## 안전한 배포와 보고

- 운영 Vercel 배포와 Git 기준이 일치하는지 먼저 확인한다. 일치하지 않으면 오래된 Git 기준을 production에 배포하지 않는다.
- 다른 작업이 운영 배포를 갱신했으면 기존 스냅샷을 승격하지 말고 최신 운영 기준 위에 해당 리포트 변경만 다시 적용·검증한다.
- 원격 커밋과 빌드 성공만으로 완료 처리하지 않는다. 운영 도메인의 목록과 상세 본문이 새 버전인지 확인한 뒤 제목과 공개 URL을 보고한다.
- 오류가 난 경우 파일·커밋·배포 상태를 먼저 조회한다. 동일 작업의 성공 여부가 불확실한 상태에서 다시 글을 생성하지 않는다.
- 롤백은 해당 리포트 변경만 되돌리는 방식으로 한다. 전체 운영 배포 롤백은 이후 다른 작업의 변경까지 되돌릴 수 있으므로 현재 상태를 확인한다.

## 클라우드 실행 조건

연결된 GitHub 도구로 HTML·카탈로그·목록·공개 URL 등록을 한 커밋에 반영할 수 있다. Vercel Git 연동과 운영 Git 기준이 동기화되어 있으면 PC 없이 빌드·발행할 수 있다. 운영본에만 있는 미커밋 소스가 남아 있으면 GitHub 변경만으로 안전한 자동 배포가 완성되지 않으며, 운영 기준 동기화가 선행돼야 한다. 이 문서는 예약이나 자격증명을 만들지 않는다.


## 연결된 GitHub 도구 실행 절차

대상 저장소는 `fusionsfc-dotcom/Ls-main`, 운영 브랜치는 `main`이다. 예약 실행 시간은 한국시간 월·수·금 오전 8시이며 예약 자체는 이 저장소에서 만들지 않는다.

### 매 회차 변경할 파일 — 한 커밋으로 처리

1. `public/reports/daily/ls-ax-YYYY-MM-DD.html`: 본문·CSS·JS를 포함하는 독립 HTML. 이번 호를 구조 참고용으로 읽되 날짜·수치·출처·이슈·체크리스트를 새 자료에 맞게 작성한다. 기존 본문을 새 날짜만 바꿔 재사용하지 않는다.
2. `public/reports/daily/catalog.json`: `{date, version, title, path, sha256}` 항목 추가 또는 승인된 정정 버전 갱신. 기존 항목 보존.
3. `src/app/data/insightsData.ts`: `insightsData` 배열 선두에 `domain: 'healthcare'`, `category: 'LS AX 병원 브리핑'`, 제목·날짜·요약·`readTime`·`highlights`·`isFeatured`·동일 상세 `link`를 추가한다. TypeScript 문자열의 따옴표·줄바꿈을 올바르게 이스케이프한다.
4. `src/app/constants/publicSampleReportLinks.ts`: 새 상세 경로만 배열에 추가한다. 다른 글의 접근 정책을 바꾸지 않는다.

`GuardedReportLink.tsx`의 공개 HTML 문서 탐색 처리는 이미 반영됐으므로 회차마다 수정할 필요가 없다. Supabase 쓰기나 새로운 자격증명은 필요하지 않다.

### 읽기 → 검증 브랜치 → 원자적 main 갱신

1. GitHub `fetch`로 `.../repos/fusionsfc-dotcom/Ls-main/branches/main`을 조회하고 head SHA와 tree SHA를 기록한다. 위 네 파일과 이전 호 HTML을 `fetch_file`로 읽는다.
2. 새 자료가 없거나 내부 시안·휴지통 자료이거나 동일 날짜/해시가 이미 존재하면 새 글을 만들지 않는다. 개인정보와 의료·보험·법률 근거를 먼저 점검한다. 공개가 불가한 자료는 이유를 보고한다.
3. `create_tree`에 현재 main의 tree SHA와 네 파일의 UTF-8 content를 전달한다. 바이너리 자산이 필요할 때만 `create_blob`의 base64를 사용하고 tree에는 반환 SHA를 넣는다.
4. `create_commit`으로 parent를 읽어 둔 main SHA로 지정한다. `create_branch`로 `publish/ls-ax-YYYY-MM-DD-vN` 검증 브랜치를 생성한다. 기존 브랜치가 있으면 현재 커밋을 읽고 중복 실행인지 판별한다.
5. GitHub commit status/checks에서 Vercel 빌드 완료를 확인한다. 해당 preview에서 목록·상세·모바일·출처·기능을 확인한다. 실패하면 main은 갱신하지 않는다.
6. main을 다시 읽고 이전 SHA와 같을 때만 `update_ref`로 `branch_name: main`, `expected_sha: 이전 SHA`, `sha: 검증 커밋`, `force: false`를 사용한다. 다른 변경이 들어왔으면 새 main을 기준으로 네 파일을 다시 병합·검증한다. 강제 푸시하지 않는다.
7. 기존 Vercel Git 연동이 main 커밋을 production으로 빌드한다. GitHub 상태의 성공만으로 게시 완료라고 하지 말고 `https://www.lsconsulting.co.kr/insights`의 새 카드와 상세 URL의 날짜·제목·본문을 확인한다. 공개 catalog의 해시가 생성 HTML과 같은지도 확인한다.
8. 성공 후 제목과 공개 URL을 사용자에게 보고한다. 실패 시 커밋 SHA·상태·실패 단계를 보고하고 재실행 전에 이미 반영됐는지 확인한다.

### PC 의존성과 기존 작업 보호

GitHub connector의 파일 읽기/쓰기와 Vercel의 Git 빌드는 클라우드에서 실행된다. 텍스트와 해시를 처리할 실행 환경 및 공개 페이지 확인 도구가 예약 실행에 제공되면 Mac이 꺼져 있어도 가능하다. Mac 브라우저의 UI 검증 자체는 PC 오프라인일 때 사용할 수 없으므로 클라우드 실행기의 브라우저/HTTP 검증을 사용해야 한다. 해당 도구가 제공되지 않으면 검증 누락을 성공으로 처리하지 않는다.

기존 로컬 체크아웃에는 2026-10-26 리포트 관련 5개 파일을 승인받아 반영했지만, 미커밋 변경을 보존하기 위해 자동으로 reset/pull 하지 않는다. 다른 작업자가 로컬 CLI로 재배포할 때는 최신 main의 게시 변경을 먼저 병합해야 한다. 오래된 로컬 사본을 배포하면 최신 리포트가 빠질 수 있다. main과 운영의 상태 확인을 배포 전 공통 규칙으로 유지한다.

### 동기화 출처

2026-10-26 동기화는 복구 운영 배포 `dpl_GWnH1LBmUbHuV8qjnp37BeGnrBNX`의 소스 315개를 SHA-1으로 대조한 스냅샷을 기준으로 한다. 그 배포는 직전 운영본 `dpl_4tZQLjXrapS5j6v4ukWvr2jUiWDp`의 홈페이지 변경과 리포트 커밋 `d09328f2b874a042c35692cf754f4c47391f5a6d`를 보존했다. 환경 파일·로컬 output·내부 문서·추가 미공개 초안은 동기화 대상에 넣지 않았다.
