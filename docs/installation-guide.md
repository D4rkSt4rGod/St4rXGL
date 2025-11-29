# St4rXGL 설치 가이드

## 시스템 요구사항

- **엔트리 오프라인 에디터** 2.0 이상
- **웹브라우저**: Chrome 60+, Firefox 55+, Safari 12+, Edge 79+
- **그래픽 카드**: WebGL 1.0 지원 (대부분의 최신 그래픽 카드)
- **메모리**: 4GB RAM 이상 권장
- **인터넷 연결**: Three.js 라이브러리 로드를 위해 필요

## 설치 방법

### 방법 1: 직접 빌드하여 설치 (권장)

1. **프로젝트 다운로드**

   ```bash
   git clone https://github.com/your-username/St4rXGL.git
   cd St4rXGL
   ```

2. **의존성 설치**

   ```bash
   npm install
   프로젝트 빌드
   ```

3. **프로젝트 빌드**

   ```bash
   npm run build
   엔트리에 확장 프로그램 추가
   ```

4. **엔트리에 확장 프로그램 추가**
   엔트리 오프라인 에디터 실행

좌측 메뉴에서 '확장도구' 클릭

'확장도구 만들기' 버튼 클릭

'파일에서 불러오기' 선택

dist/st4rxgl-extension.js 파일 선택

확장 프로그램이 성공적으로 추가되었는지 확인

# 방법 2: 미리 빌드된 파일 사용

1. **릴리스 페이지에서 다운로드**

   GitHub 릴리스 페이지에서 st4rxgl-extension.js 파일 다운로드

   위의 방법 1의 4번 단계부터 동일하게 진행

# 방법 3: 개발 모드에서 사용

    ``bash
    # 개발 모드로 빌드 (파일 감시 모드)
    npm run dev

    # dist/st4rxgl-extension.js 파일을 엔트리에 추가
    ```

# 초기 설정

## Three.js 자동 로드

**St4rXGL**은 자동으로 **Three.js** 라이브러리를 로드합니다. 수동 설정이 필요하지 않습니다.

## 기본 환경 설정

엔트리에서 다음 블록들을 사용하여 기본 환경 설정:

    "3D 애니메이션 시작" 블록

    "배경색 설정: #87CEEB" 블록

# 테스트 방법

## 기본 기능 테스트

### 1.기본 장면 생성 테스트

엔트리에서 다음 블록들을 순서대로 배치:

    ```text
    // 1. 3D 환경 초기화
    "3D 애니메이션 시작"

    // 2. 기본 객체 생성
    "정육면체 생성 너비: 2 높이: 2 깊이: 2 색상: #FF6B6B"
    "구 생성 반지름: 1.5 색상: #4ECDC4"
    "원기둥 생성 상단반지름: 1 하단반지름: 1 높이: 3 색상: #45B7D1"
    ```

### 객체 변환 테스트

    ```text
    // 생성된 객체 ID를 사용하여 위치 설정
    "객체 ID: [생성된ID] X: 0 Y: 3 Z: 0"
    "객체 ID: [생성된ID] X 각도: 45 Y 각도: 0 Z 각도: 0"
    ```

# 외부 스크립트 테스트

### 1. 기본 프리셋 로드 테스트

    ```text
    "외부 스크립트 로드: 기본 3D 씬"
    ```

# 문제 해결

## 일반적인 문제 및 해결 방법

### 문제 1: 확장 프로그램이 로드되지 않음

### 증상:

    확장 프로그램 목록에 St4rXGL이 보이지 않음

    블록이 나타나지 않음

### 해결 방법:

    1. 브라우저 개발자 도구(F12) 열기

    2. Console 탭에서 오류 메시지 확인

    3. 파일 경로가 올바른지 확인

    4. 파일 크기가 너무 크지 않은지 확인 (엔트리 제한: 5MB)

### 문제 2: 3D 객체가 보이지 않음

### 증상:

    "3D 애니메이션 시작" 블록 실행 후 아무것도 보이지 않음

### 해결 방법:

1. **Three.js**가 정상적으로 로드되었는지 확인

   ```javascript
   // 브라우저 콘솔에서 확인
   console.log("THREE:", window.THREE);
   ```

2. 카메라 위치 확인

   ```javascript
   "카메라 위치 X: 5 Y: 5 Z: 10";
   ```

3. 조명 설정 확인

   ```javascript
   "환경광 추가 색상: #FFFFFF 강도: 0.6";
   ```

### 문제 3: 성능 문제

### 증상:

    프레임률이 낮음

    객체 움직임이 끊김

### 해결 방법:

    1. 동시에 표시되는 객체 수 줄이기 (100개 이하 권장)

    2. 복잡한 geometry 대신 간단한 geometry 사용

    3. 불필요한 애니메이션 제거

    4. 그림자 사용 줄이기

### 문제 4: WebGL 오류

### 증상:

    "WebGL not supported" 오류 발생

    검은 화면만 표시

### 해결 방법:

    1. 브라우저 WebGL 지원 확인: https://get.webgl.org/

    2. 그래픽 드라이버 업데이트

    3. 하드웨어 가속 활성화

    4. 대체 브라우저 사용 시도

# 디버깅 도구

### 콘솔 명령어

    ```javascript
    // St4rXGL 상태 확인
    console.log('St4rXGL:', window.St4rXGL);

    // Three.js 상태 확인
    console.log('THREE:', window.THREE);

    // 생성된 객체 확인
    if (window.St4rXGL && window.St4rXGL.core) {
    console.log('객체 수:', window.St4rXGL.core.objects.size);
    console.log('씬 정보:', window.St4rXGL.core.scene);
    }

    // 렌더러 정보 확인
    if (window.St4rXGL && window.St4rXGL.core && window.St4rXGL.core.renderer) {
    console.log('렌더러:', window.St4rXGL.core.renderer);
    }

### 성능 모니터링

    ```javascript
    // 프레임률 확인
    let frameCount = 0;
    let lastTime = performance.now();

    function updateFPS() {
        frameCount++;
        const currentTime = performance.now();
        if (currentTime - lastTime >= 1000) {
            console.log('FPS:', frameCount);
            frameCount = 0;
            lastTime = currentTime;
        }
        requestAnimationFrame(updateFPS);
    }
    updateFPS();
    ```

# 최적화 팁

## 메모리 관리

### 1. 불필요한 객체 제거

    사용이 끝난 객체는 제거

    (현재 버전에서는 수동 제거 기능 제공되지 않음)

### 2. 텍스처 관리

    동일한 텍스처 재사용

    불필요한 고해상도 텍스처 피하기

## 성능 최적화

### 1. Geometry 복잡도 조절

    ```javascript
    // 단순한 geometry 사용
    "구 생성 반지름: 1 세그먼트: 16 색상: #FF0000" // 권장
    "구 생성 반지름: 1 세그먼트: 64 색상: #FF0000" // 고해상도 (성능 저하)
    ```

### 2. 애니메이션 최적화

    ```javascript
    // 효율적인 애니메이션
    "객체 ID: 1 X 각도: 0 Y 각도: 2 Z 각도: 0" // 권장
    ```

# 지원 및 도움말

## 도움 받는 방법

### 1. GitHub Issues

    버그 리포트

    기능 요청

    기술적 문의

### 2. 이메일 지원

    개별 기술 지원

    상업적 문의

### 3. 커뮤니티

    엔트리 공식 포럼

    St4rXGL 사용자 그룹

# 문제 리포트 시 포함할 정보

### 1. 시스템 정보

    운영체제 및 버전

    브라우저 및 버전

    엔트리 버전

### 2. 재현 방법

    문제 발생 단계

    사용한 블록 조합

    예상 vs 실제 결과

### 3. 에러 메시지

    콘솔 에러 메시지

    스크린샷 또는 동영상

# 다음 단계

설치가 완료되면 다음 가이드를 참고하세요:

    사용자 가이드 - 기본 사용법 학습

    API 레퍼런스 - 고급 기능 탐색

    예제 프로젝트 - 실제 사용 사례 확인

**버전 정보**: St4rXGL v1.0.0
**최종 업데이트**: 2025년 11월
**문의**: d4rkst4rgod@gmail.com
