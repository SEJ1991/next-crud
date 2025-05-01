# 🔥 Nextjs 도메인 구조 CRUD 레퍼런스 프로젝트 🔥

**비즈니스 도메인별로 분리를 하여 비동기 CRUD 요청, 응답 처리과정을 보여주는 레퍼런스 프로젝트입니다.**
**SSR(Server Side Rendering), SSG(Static Site Generation), ISR(Incremental Static Regeneration) 등 Next.js의 다양한 렌더링 전략을 실제 페이지에 적용하여 각 방식의 장단점과 활용 예시도 함께 제공합니다.**
‼️ `DummyJSON`를 사용하는 관계로 PATCH, DELETE, POST 메소드는 작동되는 흉내만 낼뿐 결과물에 대해선 변동 사항이 없습니다.<br/>
⚠️ _(예: 상품 삭제를 해도 요청과 응답만 보여주고 실제로 해당 게시물은 삭제가 되지 않음)_

#### 🔗 <a href='https://next-crud-mu-steel.vercel.app' target='_blank'>https://next-crud-mu-steel.vercel.app</a>

<br/>

## ✅ 주요 기능

- 전체 상품 목록 조회 (GET)
- 카테고리별 상품 목록 조회 (GET)
- 상품 상세 조회 (GET)
- 상품 생성 (POST)
- 상품 수정 (PATCH)
- 상품 삭제 (DELETE)
- 전체 영화 조회 (GET)
- 상태별 영화 목록 조회 (GET)
- 도메인 기반 구조 예시 제공
- 서버 상태 관리(TanStack Query)
- 폼 상태 관리(React Hook Form)

<br/>

## 🏗️ 구조

<pre>
next-crud/  
├── src/                     
│   ├── app/                 # 페이지 라우팅                 
│   ├── domains/                 
│   │   └── [:domain]/       # 도메인 
│   │       ├── components/  # 컴포넌트
│   │       ├── containers/  # 비즈니스 로직 컨테이너
│   │       ├── services/    # API 요청 로직
│   │       ├── utils/       # 도메일 유틸함수
│   │       ├── constants.ts # 도메인 상수
│   │       ├── index.ts     # 도메인 엔트리 포인트
│   │       └── types.ts     # 타입
│   ├── shared/             
│   │   ├── axios/           # axios 인스턴스
│   │   ├── components/      # 공용 컴포넌트
│   │   ├── containers/      # 공용 비즈니스 로직 컨테이너
│   │   ├── hooks/           # 공용 커스텀 훅
│   │   ├── utils/           # 공용 유틸함수
│   │   ├── index.ts         # 공용 엔트리 포인트
│   │   └── types.ts         # 공용 타입
├── ...
└── README.md                # 프로젝트 설명 파일
</pre>

<br/>

## 📚 주요 라이브러리

![Next.js](https://img.shields.io/badge/Next.js-15.3.0-black?logo=next.js&logoColor=white&style=for-the-badge)
![React](https://img.shields.io/badge/React-v19-61DAFB?style=flat&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5%2B-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3%2B-38B2AC?logo=tailwindcss)
![TanStack Query](https://img.shields.io/badge/TanStack%20Query-v5-FF4154?logo=reactquery)
![React Hook Form](https://img.shields.io/badge/React--Hook--Form-v7-EC5990?style=flat&logo=react)
![Sonner](https://img.shields.io/badge/Sonner-v2-333333?style=flat)
![Axios](https://img.shields.io/badge/Axios-v1-5A29E4?style=flat)
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-12.7.3-0055FF?logo=framer&logoColor=white&style=for-the-badge)
![React Dropzone](https://img.shields.io/badge/React%20Dropzone-14.3.8-3C9CD5?style=for-the-badge)
![Swiper](https://img.shields.io/badge/Swiper-11.2.6-6332F6?logo=swiper&logoColor=white&style=for-the-badge)

## 📚 API/DATA

![DummyJSON](https://img.shields.io/badge/DummyJSON-API-F48C06)
![TMDB](https://img.shields.io/badge/TMDB-API-01B4E4?logo=themoviedatabase)
