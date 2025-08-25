import { useRouter } from "next/router";
import { useState } from "react";
import AuthenLayout from "~/layouts/auth";
import { isValidEmail } from "~/utils";

export default function ForgetPasswordPage() {
    const router = useRouter();

    const [loading, setLoading] = useState(false);

    const [email, setEmail] = useState("");
    const emailInvalid = email.length > 0 && !isValidEmail(email);

    const [formError, setFormError] = useState<string | null>(null);

    const handleLogin = () => {
        console.log("login clicked")
        router.push('/auth/login');
    }

    const handleSubmit = () => {
        console.log("ForgetPassword submit")
        console.log("Thông tin Email:", {
            email,
        });

        setFormError(null);

        // Kiểm tra hợp lệ
        if (!isValidEmail(email)) {
            setFormError("Email không hợp lệ.");
            return;
        }

        setLoading(true);
        setFormError(null);

        // Giả lập gọi API
        setTimeout(() => {
            setLoading(false);
            alert("Email thành công!\n" + JSON.stringify({ email }, null, 2));
            router.push({
                pathname: '/auth/verify',
                query: { email: email }
            });
        }, 2000);
    }

    return (
        <AuthenLayout>
            <div className="w-2/5 max-w-md">
                <h2 className="font-bold text-3xl mb-2 text-left">Quên mật khẩu</h2>
                <div className="text-black-500 font-normal mb-8 text-left">Nhập email để đặt lại mật khẩu.</div>
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
                {formError && (
                    <div className="block text-red-500 text-base font-semibold mb-4 text-center">
                        {formError}
                    </div>
                )}
                <button
                    type="submit"
                    className={`w-full bg-[#4169E1] hover:bg-[#274c92] text-white font-semibold rounded-md px-4 py-2 transition text-[15px] flex items-center justify-center ${loading ? "opacity-70 cursor-not-allowed" : "cursor-pointer"}`}
                    disabled={loading}
                    onClick={handleSubmit}
                >
                    {loading ? "Vui lòng đợi..." : "Xác nhận email"}
                </button>
                <div className="text-[14px] mt-6 text-center text-gray-500">
                    Đã có tài khoản?{' '}
                    <a className="text-[#4169E1] font-semibold cursor-pointer"
                        onClick={handleLogin}>
                        Đăng nhập.
                    </a>
                </div>
            </div>
        </AuthenLayout>
    );
}
