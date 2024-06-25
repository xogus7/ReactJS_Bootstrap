**_프로젝트 진행 사항_**

- 필수 기능

1. 비디오 업로드
2. 비디오 플레이어
3. 비디오 편집

**_프로젝트 과정 중 에러사항_**

**새로 만든 브랜치로 이동(checkout)이 안됨**

- 에러명 : error: pathspec did not match any file(s) known to git
- 상황 : 지정된 깃허브에서 새로 브랜치를 생성했으나 checkout으로 브랜치 이동이 안됐다.
- 해결 방법 :

1. git remote update
2. git checkout project1/연매출3조/문서진

**git add . 파일 업로드 할 때 에러 발생**

- 에러명 : warning: in the working copy of '.gitignore', LF will be replaced by CRLF the next time Git touches it
  warning: in the working copy of 'package-lock.json', LF will be replaced by CRLF the next time Git touches it 등등등...
- 상황 : git add . 로 전체 파일을 업로드 하려고 했는데 위와 같은 에러가 전체 파일명으로 전부 발생, 운영 체제에 따라 파일의 줄 끝을 변경하는 방식이 달라 충돌이 일어나는 것 같다.
- 해결 방법 : git config --global core.autocrlf true (window 해결방법)
  git config --global core.autocrlf input (macOS 해결방법은 이거)
  근데 해외 깃에서는 안 좋은 방법이라는 것 같다?? 나중에 공부하기

- 해결 방법2? : I really disagree with allowing Git to change line endings automatically. If you must have a .gitattributes file, then please use _ text=auto eol=lf so every text file defaults to LF. This way, only Windows-specific files (like _.bat, _.cmd, _.ps1, sln, and \*.vcxproj and maybe a few others) need eol=crlf applied. 나중에 참고해보자

**버튼 색깔이 안 바뀌는 현상 발생**