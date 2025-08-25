import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { VerifyCodeLength, VerifyTimeOut } from "~/constants/common";
import AuthenLayout from "~/layouts/auth";
import { isValidVerifyChar } from "~/utils";

export default function VerifyPage() {
    const router = useRouter();

    const { email } = router.query;
    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const [loadingResend, setLoadingResend] = useState(false);
    const [formError, setFormError] = useState<string | null>(null);

    const [code, setCode] = useState(Array(VerifyCodeLength).fill(""));
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const [timeLeft, setTimeLeft] = useState(VerifyTimeOut);

    // Đếm ngược thời gian hiệu lực của mã
    useEffect(() => {
        if (timeLeft <= 0) return;
        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);

    // Tự động chuyển focus sang ô tiếp theo nếu có ký tự
    const handleCodeChange = (value: string, idx: number) => {
        if (!isValidVerifyChar(value)) return;
        const newCode = [...code];
        newCode[idx] = value;
        setCode(newCode);

        if (value && idx < VerifyCodeLength - 1) {
            inputRefs.current[idx + 1]?.focus();
        }
    };

    // Xử lý phím Backspace để chuyển focus về ô trước đó
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, idx: number) => {
        if (e.key === "Backspace" && !code[idx] && idx > 0) {
            inputRefs.current[idx - 1]?.focus();
        }
    };

    // Xử lý dán mã từ clipboard
    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        const paste = e.clipboardData.getData("text").slice(0, VerifyCodeLength);
        if (!paste) return;
        const pasteArr = paste.split("");
        const newCode = [...code];
        for (let i = 0; i < VerifyCodeLength; i++) {
            newCode[i] = pasteArr[i] || "";
        }
        setCode(newCode);
        const lastIdx = pasteArr.length >= VerifyCodeLength ? VerifyCodeLength - 1 : pasteArr.length;
        inputRefs.current[lastIdx]?.focus();
        e.preventDefault();
    };

    const handleLogin = () => {
        console.log("login clicked")
        router.push('/auth/login');
    }

    const handleSubmit = () => {
        console.log("Verify submit")
        console.log("Thông tin Email:", {

        });

        setLoadingSubmit(true);

        // Giả lập gọi API
        setTimeout(() => {
            setLoadingSubmit(false);
            alert("Xác thực email thành công!\n" + JSON.stringify({}, null, 2));
            router.push({
                pathname: '/auth/resetPassword',
            });
        }, 2000);
    }

    const handleResend = () => {
        setLoadingResend(true);
        setFormError(null);

        // Giả lập gọi API gửi lại mã xác thực
        setTimeout(() => {
            setLoadingResend(false);
            setTimeLeft(30);
            setCode(Array(VerifyCodeLength).fill(""));
            inputRefs.current[0]?.focus();
            alert("Mã xác thực mới đã được gửi lại!");
        }, 1000);
    };

    return (
        <AuthenLayout>
            <div className="w-2/5 max-w-md">
                <h2 className="font-bold text-3xl mb-2 text-left">Xác nhận Email</h2>
                <div className="text-black-500 font-normal mb-6 text-left">
                    Xin vui lòng nhập mã xác thực đã được gửi về &nbsp;
                    <span className="font-semibold text-[#4169E1]">
                        {email ? email : "<email của bạn>"}
                    </span>
                    &nbsp;để xác nhận email này là của bạn
                </div>
                <div className="mb-4">
                    <label className="block text-black text-base font-semibold mb-1">Mã xác thực</label>
                    <div className="flex gap-2 mb-2 justify-center">
                        {code.map((c, idx) => (
                            <input
                                key={idx}
                                ref={el => { inputRefs.current[idx] = el; }}
                                maxLength={1}
                                value={c}
                                onChange={e => handleCodeChange(e.target.value, idx)}
                                onKeyDown={e => handleKeyDown(e, idx)}
                                onPaste={handlePaste}
                                className="w-12 h-12 border border-gray-300 rounded-lg text-center text-xl font-bold focus:border-blue-500 outline-none"
                            />
                        ))}
                    </div>
                    <div className="text-gray-400 text-xs">
                        Thời gian hiệu lực {timeLeft > 0 ? `${timeLeft}s` : <span className="text-red-500">Đã hết hạn</span>}
                    </div>
                </div>
                {formError && (
                    <div className="block text-red-500 text-base font-semibold mb-4 text-center">
                        {formError}
                    </div>
                )}
                <button
                    className={`w-full bg-[#4169E1] hover:bg-[#274c92] text-white font-semibold rounded-md px-4 py-2 transition text-[15px] mb-3
                                    ${(loadingSubmit || timeLeft <= 0) ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
                    onClick={handleSubmit}
                    disabled={loadingSubmit || timeLeft <= 0}
                >
                    {loadingSubmit ? "Đang xác thực..." : "Xác thực"}
                </button>
                <button
                    className={`w-full border border-gray-300 text-black font-semibold rounded-md px-4 py-2 transition text-[15px] mb-3 bg-white hover:bg-gray-50
                                    ${loadingResend ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
                    onClick={handleResend}
                    disabled={loadingResend}
                >
                    {loadingResend ? "Đang gửi mã..." : "Gửi lại mã xác thực"}
                </button>
                <div className="text-[14px] mt-4 text-center text-gray-500">
                    Đã có tài khoản?{' '}
                    <a
                        className="text-[#4169E1] font-semibold cursor-pointer"
                        onClick={handleLogin}
                    >
                        Đăng nhập.
                    </a>
                </div>
            </div>
        </AuthenLayout>
    );
}
