# Week 3 과제: TypeScript To-Do

수업에서 제공한 JavaScript To-Do 앱을 React + TypeScript로 옮겼습니다.

## 실행

```bash
npm install
npm run dev
```

## 검사

```bash
npx tsc -b
npm run lint
npm run build
```

검증 결과: `npm run build`의 TypeScript 검사 및 Vite 빌드 통과, `npm run lint` 통과.

## 타입 적용

- `src/types.ts`: 여러 파일에서 사용하는 `Todo`와 리터럴 유니온 `Filter`를 export합니다.
- `App.tsx`: 배열 상태는 `Todo[]`, 필터는 `Filter`, 선택 ID는 `number | null`입니다.
- 각 컴포넌트의 props는 `interface`로 정의하고 함수 props의 매개변수와 반환 타입을 명시했습니다.
- `TodoInput.tsx`: 입력 이벤트는 `ChangeEvent<HTMLInputElement>`입니다.
- `find()` 결과가 `undefined`인지 확인한 뒤 선택한 할 일을 표시합니다.
- `any`, `as`, non-null assertion을 사용하지 않았습니다.

## 제출 스크린샷

아래 두 화면을 직접 캡처해 `docs` 폴더에 저장한 뒤 이미지 링크를 추가하세요.

1. **빌드 통과 화면**: 터미널에서 `npm run build`가 성공한 화면.
2. **동작 화면**: 할 일을 2개 이상 추가하고 필터를 누른 뒤, 할 일 제목을 클릭해 “선택한 할 일”이 표시된 브라우저 화면.

## GitHub 제출

공개 저장소에 프로젝트 전체를 올립니다. `node_modules`와 `dist`는 `.gitignore`에서 제외합니다.
