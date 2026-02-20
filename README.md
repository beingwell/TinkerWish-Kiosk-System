# 🧚 TinkerWish Kiosk System
> **Electron 기반 현장 체험객 등록 및 영수증 자동 발행 키오스크**

현장 체험 이벤트 '팅커위시'에서 아이들의 정보를 등록하고, 즉석에서 체험 확인용 영수증을 출력하는 전용 키오스크 소프트웨어입니다.

## 🚀 주요 특징
- **전체 화면 모드**: 1920x1080 해상도 최적화 및 메뉴바 제거로 키오스크 환경 구현.
- **데이터 자동 저장**: 방문자 정보를 로컬 환경에 CSV 파일로 실시간 기록 (한글 깨짐 방지 BOM 적용).
- **영수증 자동 출력**: `print-silent` 기능을 통해 사용자 개입 없이 기본 프린터로 즉시 인쇄.
- **유효성 검사**: 정규표현식을 사용한 실시간 성함/전화번호 입력 필터링.

## 🛠 사용 기술
- **Runtime**: Electron.js, Node.js
- **Build Tool**: Electron-builder (Windows Portable 버전 지원)
- **Frontend**: Vanilla JS, HTML5, CSS3 (@media print 최적화)

## 📦 실행 및 빌드 방법
```bash
# 의존성 설치
npm install

# 앱 실행
npm start

# 포터블 실행 파일 생성 (.exe)
npm run dist
