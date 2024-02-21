import Lottie from "lottie-react";
import loadingAnimation from "../../public/images/loading_animation/loading_animation.json";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Processing: NextPage = () => {

    const router = useRouter();

    useEffect(() => {
        const redirectTimeout = setTimeout(() => {
            router.push({
                pathname: "/success"
            })
        }, 5000);

        return () => clearTimeout(redirectTimeout);
    }, [router]);

    return (
        <main className="processing-section main">
            <div className="wrapper">
                <div className="animation-container">
                    <Lottie animationData={loadingAnimation} loop={true} />
                </div>
                <div className="desc">
                    <h1>Processing payment...</h1>
                </div>
            </div>
        </main>
    )
}

export default Processing;