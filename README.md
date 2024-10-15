# My Blog

이 프로젝트는 **주식회사리뷰노트** 과제로 개발된 블로그입니다. 아래 기술 스택을 활용하여 회원 관리, 블로그 글 작성, 수정, 삭제 기능을 포함하고 있으며, 관리자 권한 관리 기능도 제공합니다.

## 🛠️ 기술 스택
- **프론트엔드**: Next.js (v13.x)
- **스타일링**: TailwindCSS (v3.x)
- **백엔드**: Prisma (ORM), Supabase (PostgreSQL)
- **배포**: Vercel
  

## 🚀 화면 설명 및 주요 기능

### 1. **메인페이지**
<img width="1343" alt="image" src="https://github.com/user-attachments/assets/3671ed3a-6c84-4db2-8aa7-70c4547d91cd">

- 비로그인 시에는 Login/SignUp 버튼이 노출되고, 로그인 후에는 위 이미지와 같이 프로필 사진과 이름/Logout 버튼이 노출됩니다.
- 가장 최신글 10개 목록을 볼 수 있으며, 각 글의 일부 미리보기와 제목을 확인할 수 있습니다.
- 해당 글을 클릭하면 상세글 페이지로 넘어갑니다.


### 2. **회원가입 및 로그인**

<img width="1314" alt="image" src="https://github.com/user-attachments/assets/27547aa7-35a2-44a3-aed7-f5ca06073174">
<img width="1299" alt="image" src="https://github.com/user-attachments/assets/a5d2fa7c-b508-4511-b4cf-1b915291c161">

- JWT 토큰을 이용한 인증을 사용하며, 로그인 정보는 localStorage에 저장됩니다.
- 회원가입 시 프로필 사진을 등록할 수 있습니다. 이미지 등록 안할 시 기본 이미지가 첨부됩니다.


### 3. **글 목록 보기**
<img width="1342" alt="image" src="https://github.com/user-attachments/assets/15f8efa2-a9d6-4a16-bf19-a71daa97dd60">

- 비로그인 사용자를 포함한 모든 사용자는 작성된 모든 글을 목록을 볼 수 있으며, 글 제목을 누르면 글 상세 페이지로 넘어갑니다.


### 4. **글 작성**
<img width="1343" alt="image" src="https://github.com/user-attachments/assets/72258174-c5fd-4f64-ae7f-57f2e676adc0">

- 로그인한 사용자는 새 블로그 글을 작성할 수 있으며, 글 작성 시 제목, 내용 등의 입력을 요구합니다.
  

### 5. **글 상세 보기 / 글 수정 및 삭제**
<img width="1294" alt="image" src="https://github.com/user-attachments/assets/4ae540c3-a5f9-4e7c-a58b-1462c0d21742">

- 사용자는 목록에서 글을 클릭해 해당 글의 전체 내용을 열람할 수 있습니다.
- 작성자만 자신의 글을 수정하거나 삭제할 수 있도록 권한을 제한했습니다. 수정/삭제 버튼은 작성자에게만 표시됩니다.


### 6. **관리자 기능**
- 관리자 계정은 모든 사용자의 글을 수정하거나 삭제할 수 있는 권한이 부여됩니다.
  

## 💾 설치 및 실행 방법

### 1. 프로젝트 클론
```bash
git clone https://github.com/choisj123/My-Blog.git
cd My-Blog
```
### 2. 패키지 설치
```bash
npm install
```
### 3. 환경 변수 설정
- .env.local 파일을 생성하고, 다음과 같은 환경 변수를 추가하세요:
```bash
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```
### 4. 로컬 서버 실행
```bash
npm run dev
```
- 로컬 서버가 http://localhost:3000에서 실행됩니다.

