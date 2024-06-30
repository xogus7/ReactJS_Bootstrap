**프로젝트 제출 방법**

1. 브랜치 네이밍 규칙에 따라 새로운 브랜치를 생성합니다.

- 브랜치 이름 형식은 project1/팀명/이름입니다.
- eg.g project1/team1/오스틴

2. 하위에 프로젝트 파일을 생성하고 진행합니다.
3. 완료한 파일을 commit, push합니다.
4. 해당 브랜치에서 Pull Request를 생성합니다.
5. PR제목은 프로젝트1*Video Editor*팀명\_이름으로 통일해주세요.

- eg.g project1/Videoo Editor/team1/오스틴

6. label을 적극적으로 활용해주세요.



## 1. 서 론 (Introduction)
### 1. 개 요 (Overview of rest of SRS)
이 프로젝트는 ReactJS와 Bootstrap을 활용하여 웹 브라우저상에서 비디오 편집 기능을 구현하는데 목적이 있다. 필수로 들어가야할 기능은 아래와 같다.

- 비디오 업로드
- 비디오 플레이어
- 비디오 편집

해당 기능 외 추가 기능을 넣어도 되며, 최대한 **ReactJS와 Bootstrap**을 활용할 수 있도록 한다.

### 2. 범 위 (Scope of product)
본 프로젝트의 개발 범위는 다음과 같습니다.

- React.JS와 React-Bootstrap을 활용하여 비디오 에디터를 개발한다.
- 개발한 에디터를 배포한다.

### 3. 참고 자료 (References)
1. video library : https://ffmpegwasm.netlify.app/docs/getting-started/usage
2. gif convert : https://github.com/Tonel/video-editor-wasm-react
3. video trimming : https://github.com/ifeoma-imoh/Video-Trimming-App-Using-ffmpeg.wasm
4. range slider : https://dev.to/sandra_lewis/building-a-multi-range-slider-in-react-from-scratch-4dl1

## 2. 상세 요구사항 (Specific Requirements)
### 1. 외적 인터페이스 요구사항 (External Interface Requirements)
**[ 초기 화면 ]**

| 구분 | 내용 |
| --- | --- |
|요구사항 ID|EIR-001|
|요구사항명|초기 화면|
|개요 (목적, 내용) | 초기 화면은 비디오 업로드가 가능한 Input과 버튼을 구현하며 비디오 에디터임을 알 수 있는 텍스트를 포함한다.|
|입력|	
|출력|

**[ 편집 화면 ]**

| 구분 | 내용 |
| --- | --- |
|요구사항 ID|EIR-002|
|요구사항명|편집 화면|
|개요 (목적, 내용)| 1. 편집 화면은 비디오 편집이 가능한 기능을 제공하며, 비디오 플레이어가 있어 편집 결과를 실시간으로 확인할 수 있어야 한다. <br>2. 비디오 재 업로드 기능을 제공하여, 다른 비디오를 업로드 할 수 있어야 한다. <br>3. 편집 후 결과를 다운로드 받을 수 있게 버튼을 제공하며, 처리 중 모달을 통해 처리중임을 알려야 한다. <br>4. 처리 후 토스트 메시지를 출력하여 처리여부를 확인할 수 있게 한다. |
|입력|
|출력|

### 2. 기능적 요구사항 (Functional Requirements)

**[ 비디오 업로드 ]**
|구분|내용|
| --- | --- |
| 요구사항 ID | FUN-001 |
| 요구사항명 | 비디오 업로드 | 
| 개요 (목적, 내용) | 1. 사용자 컴퓨터의 로컬 파일을 업로드하여 정보를 불러온다. <br>2. 업로드한 파일을 다른 파일로 대체한다. |
| 입력 | File |
| 출력 | URL |

**[ 비디오 플레이어 ]**
| 구분 | 내용 |
| --- | --- |
| 요구사항 ID | FUN-002 |
| 요구사항명 | 비디오 플레이어 |
| 개요 (목적, 내용) | 업로드한 비디오를 재생, 중지 할 수 있어야 하며 비디오를 처음부터 끝까지 재생이 되어야 한다. |
| 입력 | URL |
| 출력 | Viedo Player |

**[ 비디오 편집 ]**
| 구분 | 내용 |
| --- | --- |
| 요구사항 ID | FUN-003 |
| 요구사항명 | 비디오 편집 | 
| 개요 (목적, 내용) | 비디오 편집 기능을 제공한다. <br>예) 타임라인 조절로 자르는 기능이나 다른 영상을 추가하는 기능 |
| 입력 | File |
| 출력 | URL |

**[ 비디오 다운로드 ]**
| 구분 | 내용 |
| --- | --- |
| 요구사항 ID | FUN-004 |
| 요구사항명 | 비디오 다운로드 |
| 개요 (목적, 내용) | 편집한 비디오를 다운로드 받을 수 있게 한다. |
| 입력 |
| 출력 | video |

### 3. 시스템 구성 요구사항 (Equipment Composition Requirements)

**[ Deploy ]**
| 구분 | 내용 |
| --- | --- |
| 요구사항 ID | ECR-001 |
| 요구사항명 | Deploy |
| 개요 (목적, 내용) | 비디오 플레이어의 배포는 Vercel을 활용하며, 도메인은 자유로 한다. |
| 입력 |
| 출력 |

**[ Library ]**
|구분|내용|
| --- | --- |
| 요구사항 ID | ECR-002 |
| 요구사항명 | Library |
| 개요 (목적, 내용) | 사용하는 라이브러리는 React.JS와 React-Bootstrap을 사용하며 추가로 AntDesign과 MUi를 써도 상관 없다. |
| 입력 |
| 출력 |

**[ Video Library ]**
| 구분 | 내용 |
| --- | --- |
| 요구사항 ID | ECR-003 |
| 요구사항명 | Video Library |
| 개요 (목적, 내용)	비디오 라이브러리는 자유이나, 기본으로 ffmpeg와 video-react를 활용한다. |
| 입력 |
| 출력 |