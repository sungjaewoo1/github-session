import { useState } from "react";
import Input from "./components/Input.jsx";
import Button from "./components/Button.jsx";

export default function App() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  // Filled means a non-empty value; all preceding fields must be filled.
  const nameFilled = form.name.trim() !== "";
  const emailFilled = nameFilled && form.email.trim() !== "";
  const passwordFilled = emailFilled && form.password.trim() !== "";

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((prev) => ({ ...prev, [name]: value }));
    setMessage("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (form.password !== form.confirmPassword) {
      setMessage("비밀번호가 일치하지 않습니다.");
      return;
    }

    setMessage("회원가입 완료!!");
  }

  const isIncomplete = Object.values(form).some(
    (value) => value.trim() === ""
  );

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6 py-12">
      <section className="w-full max-w-[260px]">
        <h1 className="text-3xl font-bold text-slate-900">
          회원가입
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          아래 정보를 입력해 주세요.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 flex flex-col gap-5"
        >
          <Input
            id="name"
            label="이름"
            placeholder="이름을 입력해 주세요"
            value={form.name}
            onChange={handleChange}
          />

          <Input
            id="email"
            label="이메일"
            type="email"
            placeholder="example@email.com"
            disabled={!nameFilled}
            value={form.email}
            onChange={handleChange}
          />

          <Input
            id="password"
            label="비밀번호"
            type="password"
            placeholder="비밀번호를 입력해 주세요"
            disabled={!emailFilled}
            value={form.password}
            onChange={handleChange}
          />

          <Input
            id="confirmPassword"
            label="비밀번호 확인"
            type="password"
            placeholder="비밀번호를 다시 입력해 주세요"
            disabled={!passwordFilled}
            value={form.confirmPassword}
            onChange={handleChange}
          />

          <Button
            text="회원가입"
            type="submit"
            disabled={isIncomplete}
          />

          <p role="status" className="text-sm text-slate-600">
            {message}
          </p>
        </form>
      </section>
    </main>
  );
}