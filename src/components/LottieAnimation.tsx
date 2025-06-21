import { useRef, useEffect } from "react";
import Lottie from "lottie-react";
import { useTranslation } from "react-i18next";

interface LottieAnimationProps {
  animationPath: string | object;
  className?: string;
  loop?: boolean;
  autoplay?: boolean;
}

const LottieAnimation = ({
  animationPath,
  className = "",
  loop = true,
  autoplay = true,
}: LottieAnimationProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { i18n } = useTranslation();
  const isRTL = i18n.dir() === "rtl";

  useEffect(() => {
    const svgElement = containerRef.current?.querySelector("svg");
    if (svgElement) {
      svgElement.style.transform = isRTL ? "scaleX(-1)" : "scaleX(1)";
    }
  }, [isRTL]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ direction: isRTL ? "rtl" : "ltr" }}
    >
      <Lottie
        animationData={animationPath}
        loop={loop}
        autoplay={autoplay}
        style={{ width: "100%", height: "100%" }}
        rendererSettings={{
          preserveAspectRatio: "xMidYMid slice",
        }}
      />
    </div>
  );
};

export default LottieAnimation;
