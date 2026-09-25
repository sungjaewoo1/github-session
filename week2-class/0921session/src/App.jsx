import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import Button from './components/button';

export default function App() {
  return (
    <main className="min-h-screen bg-slate-100 p-8">
	    <h1 className="text-3xl font-bold text-indigo-700">
        공통 버튼
      </h1>
      <Button text={"신청하기"} onClick={() => window.alert('신청 버튼을 눌렀습니다.')} />
      <Button text={"신청하기"} disabled />
    </main>
  );
}
