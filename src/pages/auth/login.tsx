import { useRouter } from "next/router";
import { useState } from "react";
import AuthenLayout from "~/layouts/auth";
import { isValidEmail } from "~/utils";

export default function LoginPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const emailInvalid = email.length > 0 && !isValidEmail(email);

  const [formError, setFormError] = useState<string | null>(null);

  const handleSSOLogin = () => {
    console.log("login clicked")
    router.push('/auth/googleAuthCallback');
  }

  const handleForgetPassword = () => {
    console.log("forgetpassword clicked")
    router.push('/auth/forgetPassword');
  }

  const handleSignup = () => {
    console.log("signUp clicked")
    router.push('/auth/signUp');
  }

  const handleSubmit = () => {
    console.log("Login submit")
    console.log("Thông tin đăng nhập:", {
      email,
      password,
    });

    setFormError(null);

    // Kiểm tra hợp lệ
    if (!email || !password) {
      setFormError("Vui lòng điền đầy đủ thông tin.");
      return;
    }
    if (!isValidEmail(email)) {
      setFormError("Email không hợp lệ.");
      return;
    }

    setLoading(true);
    setFormError(null);

    // Giả lập gọi API
    setTimeout(() => {
      setLoading(false);
      alert("Đăng nhập thành công!\n" + JSON.stringify({ email, password }, null, 2));
      router.push('/workspace/WorkspacesPage');
    }, 2000);
  }

  return (
    <AuthenLayout>
      <div className="w-2/5 max-w-md">
        <h2 className="font-bold text-3xl mb-2 text-left">Đăng nhập</h2>
        <div className="text-black-500 font-normal mb-8 text-left">Chào mừng.</div>
        <button
          className="flex items-center border border-gray-300 rounded-lg shadow-sm shadow-gray-300 px-4 py-2 mb-5 w-full justify-center hover:bg-gray-50 transition cursor-pointer"
          onClick={handleSSOLogin}
        >
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="google" className="w-5 h-5 mr-2" />
          <span className="text-sm font-medium text-black">Đăng nhập với Google</span>
        </button>
        <div className="flex items-center my-3">
          <span className="flex-1 h-px bg-gray-300"></span>
          <span className="mx-4 font-bold text-gray-400 text-xs">Hoặc</span>
          <span className="flex-1 h-px bg-gray-300"></span>
        </div>
        <div className="mb-6">
          <label className="block text-black text-base font-semibold mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className={`w-full border ${emailInvalid ? "border-red-500" : "border-gray-300"} rounded-lg px-3 py-2 bg-transparent text-base outline-none transition
                  ${emailInvalid
                ? "focus:border-red-500 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.3)]"
                : "focus:border-blue-500 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.3)]"
              }
                `}
            placeholder="mail@abc.com"
          />
          {emailInvalid && (
            <div className="block text-red-500 text-base font-semibold mt-1">Email không hợp lệ.</div>
          )}
        </div>
        <div className="mb-6 relative">
          <label className="block text-black text-base font-semibold mb-1">Mật khẩu</label>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-transparent text-base outline-none transition focus:border-blue-500 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.3)] pr-10"
            placeholder="mật khẩu"
          />
          <button
            type="button"
            tabIndex={-1}
            className="absolute right-3 top-12 transform -translate-y-1/2 text-gray-400 hover:text-blue-500 cursor-pointer"
            onClick={() => setShowPassword((v) => !v)}
          >
            {showPassword ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.956 9.956 0 012.293-3.95M6.873 6.873A9.956 9.956 0 0112 5c4.477 0 8.268 2.943 9.542 7a9.956 9.956 0 01-4.293 5.95M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3l18 18" />
              </svg>
            )}
          </button>
        </div>
        {formError && (
          <div className="block text-red-500 text-base font-semibold mb-4 text-center">
            {formError}
          </div>
        )}
        <div className="flex justify-end">
          <div className="text-[14px] mb-4 text-gray-500">
            Quên mật khẩu?{' '}
            <a className="text-[#4169E1] font-semibold cursor-pointer"
              onClick={handleForgetPassword}>
              Đặt lại mật khẩu.
            </a>
          </div>
        </div>
        <button
          type="submit"
          className={`w-full bg-[#4169E1] hover:bg-[#274c92] text-white font-semibold rounded-md px-4 py-2 transition text-[15px] flex items-center justify-center ${loading ? "opacity-70 cursor-not-allowed" : "cursor-pointer"}`}
          disabled={loading}
          onClick={handleSubmit}
        >
          {loading ? "Vui lòng đợi..." : "Đăng nhập"}
        </button>
        <div className="text-[14px] mt-6 text-center text-gray-500">
          Chưa có tài khoản?{' '}
          <a className="text-[#4169E1] font-semibold cursor-pointer"
            onClick={handleSignup}>
            Đăng ký.
          </a>
        </div>
      </div>
    </AuthenLayout>
  );
}
