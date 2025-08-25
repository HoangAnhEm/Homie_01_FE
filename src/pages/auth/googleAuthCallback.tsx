import React, { useEffect, useState } from 'react';
import AuthenLayout from '~/layouts/auth';
import dotsAnimationStyles from '../../styles/loadingDots.module.css';
import circleAnimationStyles from '../../styles/loadingCircle.module.css';
import { useRouter } from 'next/router';

function LoadingDotsAnimation() {
    return (
        <div className="flex gap-2 items-center">
            <span className={`${dotsAnimationStyles.dot} ${dotsAnimationStyles['animate-dot']}`}></span>
            <span className={`${dotsAnimationStyles.dot} ${dotsAnimationStyles['animate-dot']} ${dotsAnimationStyles['delay-1']}`}></span>
            <span className={`${dotsAnimationStyles.dot} ${dotsAnimationStyles['animate-dot']} ${dotsAnimationStyles['delay-2']}`}></span>
            <span className={`${dotsAnimationStyles.dot} ${dotsAnimationStyles['animate-dot']} ${dotsAnimationStyles['delay-3']}`}></span>
            <span className={`${dotsAnimationStyles.dot} ${dotsAnimationStyles['animate-dot']} ${dotsAnimationStyles['delay-4']}`}></span>
        </div>
    );
}

export default function GoogleAuthCallback() {
    const router = useRouter();
    const delaySeconds = 5;

    const [stage, setStage] = useState<'loading' | 'success' | 'fail'>('loading');
    const [secondsLeft, setSecondsLeft] = useState(delaySeconds);

    useEffect(() => {
        if (stage === 'success' || stage === 'fail') {
            setSecondsLeft(delaySeconds);
            const timer = setInterval(() => {
                setSecondsLeft(prev => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        if (stage === 'success') {
                            router.replace({
                                pathname: '/',
                            });
                        } else {
                            router.replace({
                                pathname: '/auth/login',
                            });
                        }
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [stage]);


    useEffect(() => {
        async function fetchAuthResult() {
            try {
                // Lấy token từ url
                const params = new URLSearchParams(window.location.search);
                const token = params.get('token') || null;

                // Giả lập gọi API delay 2 giây
                await new Promise((res) => setTimeout(res, 1000));

                // Giả lập kiểm tra token
                if (token === 'valid-token')
                    setStage('success');
                else
                    setStage('fail');
            } catch {
                setStage('fail');
            }
        }
        fetchAuthResult();
    }, []);

    return (
        <AuthenLayout>
            <div className="flex flex-col items-center">
                <h2 className="font-bold text-3xl mb-5 text-center">Tiếp tục với Google</h2>
                {stage === 'loading' && (
                    <div className="flex flex-col items-center justify-center mb-8 space-y-2 text-black font-normal">
                        <LoadingDotsAnimation />
                        <div className="mt-5">Đang xác thực tài khoản Google</div>
                    </div>
                )}

                {(stage === 'success' || stage === 'fail') && (
                    <>
                        <div className="flex justify-center mb-8 relative w-20 h-20">
                            <div className={circleAnimationStyles.loader}></div>
                            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-lg">
                                {secondsLeft}
                            </span>
                        </div>
                        {stage === 'success' && (
                            <div className="text-green-600 font-semibold mb-8">
                                Xác thực thành công! Đang chuyển hướng...
                            </div>
                        )}
                        {stage === 'fail' && (
                            <div className="text-red-600 font-semibold mb-8">
                                Xác thực thất bại! Đang chuyển hướng về đăng nhập...
                            </div>
                        )}
                    </>
                )}
            </div>
        </AuthenLayout>

    );
}
