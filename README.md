# St4rXGL - 엔트리 3D 확장 프로그램

WebGL과 Three.js를 활용한 엔트리 3D 확장 프로그램입니다. 3D 작품을 쉽게 만들고 외부 JavaScript 파일을 통해 기능을 확장할 수 있습니다.

## 🚀 주요 기능

- **3D 객체 생성**: 정육면체, 구, 원기둥 등 다양한 3D 도형 생성
- **재질 설정**: 색상, 투명도, 금속성, 거칠기 설정
- **조명 시스템**: 환경광, 방향광, 점광 등 다양한 조명 지원
- **애니메이션**: 객체 회전, 이동, 크기 변화 등 다양한 애니메이션
- **외부 스크립트**: 사용자 정의 JavaScript 파일 로드 및 실행
- **인터랙티브**: 마우스 상호작용, 객체 선택, 실시간 조작

## 📁 프로젝트 구조

St4rXGL/
├── src/ # 소스 코드
├── assets/ # 리소스 파일
├── external-scripts/ # 외부 스크립트
├── examples/ # 사용 예제
├── dist/ # 빌드 결과물
└── docs/ # 문서

text

## 🛠️ 설치 방법

1. 프로젝트 클론

```bash
git clone [repository-url]
cd St4rXGL
의존성 설치

bash
npm install
빌드

bash
npm run build
엔트리에 확장 프로그램 추가

dist/st4rxgl-extension.js 파일을 엔트리 확장 프로그램으로 등록

🎮 사용 방법
기본 사용법
엔트리에서 St4rXGL 확장 프로그램 추가

"3D 애니메이션 시작" 블록으로 3D 환경 초기화

다양한 생성 블록으로 3D 객체 추가

변환 블록으로 객체 위치, 회전, 크기 조정

외부 스크립트 사용
javascript
// external-scripts/my-script.js
if (typeof St4rXGL !== 'undefined') {
    // 사용자 정의 3D 객체 생성
    const myObject = St4rXGL.objectManager.createBox(2, 2, 2, 0xFF0000);
    St4rXGL.objectManager.setPosition(myObject, 0, 3, 0);
}
📚 블록 설명
기본 도형
정육면체 생성: 너비, 높이, 깊이, 색상을 지정하여 정육면체 생성

구 생성: 반지름, 색상을 지정하여 구 생성

원기둥 생성: 상하단 반지름, 높이, 색상을 지정하여 원기둥 생성

변환
위치 설정: 객체의 X, Y, Z 좌표 설정

회전 설정: 객체의 X, Y, Z 축 회전 각도 설정 (도 단위)

크기 설정: 객체의 X, Y, Z 축 크기 설정

재질
색상 설정: 객체의 색상 변경

투명도 설정: 객체의 투명도 설정 (0-1)

금속성 설정: 객체의 금속성 설정 (0-1)

🌟 예제
기본 장면 생성
javascript
// 정육면체 생성
const boxId = St4rXGL.objectManager.createBox(1, 1, 1, 0xFF6B6B);
St4rXGL.objectManager.setPosition(boxId, -2, 1, 0);

// 구 생성
const sphereId = St4rXGL.objectManager.createSphere(1, 0x4ECDC4);
St4rXGL.objectManager.setPosition(sphereId, 0, 1, 0);

// 원기둥 생성
const cylinderId = St4rXGL.objectManager.createCylinder(1, 1, 2, 0x45B7D1);
St4rXGL.objectManager.setPosition(cylinderId, 2, 1, 0);
🔧 개발 가이드
새로운 블록 추가하기
src/blocks/ 디렉토리에 새로운 블록 파일 생성

블록 정의 작성

src/main.js에서 블록 import 및 등록

외부 스크립트 작성하기
external-scripts/ 디렉토리에 스크립트 파일 생성

St4rXGL API 사용하여 기능 구현

엔트리에서 "외부 스크립트 로드" 블록으로 실행

📄 라이선스
MIT License

🤝 기여하기
버그 리포트, 기능 제안, Pull Request를 환영합니다!

📞 지원
이슈가 발생하거나 질문이 있으면 GitHub Issues에 등록해주세요.
```
