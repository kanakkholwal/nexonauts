import Image from "next/image";
import { useEffect } from "react";
import Animatable from "./_Animatable.module.scss";


export default function HeaderAnimatable() {


    useEffect(() => {

        // Logo Hover Animation
        function parallax(e) {
            document.querySelectorAll("." + Animatable.Float).forEach(function (moveThis) {
                var movingValue = parseInt(moveThis.getAttribute("data-rotation")),
                    x = -1 *(e.clientX * movingValue) / 250,
                    y = -1 * (e.clientY * movingValue) / 250;

                moveThis.style.transform = `translate(${x}px) translateY(${y}px)`;
            });
        }

        let HoverTargetArea = document.querySelector("header");
        HoverTargetArea.addEventListener("mousemove", parallax);

        HoverTargetArea.addEventListener("mouseleave", function () {
            document.querySelectorAll("." + Animatable.Float).forEach((defaultClass) => {
                defaultClass.removeAttribute("style");
            });
        });
    }, []);

    return (
        <>
            <Image src="/assets/images/metaverse-technology.webp" className={Animatable.Float} data-rotation="22" />

            <div className={Animatable.hero_figure}>
                <svg className={Animatable.placeholder} width={528} height={396} viewBox="0 0 528 396">
                    <rect width={528} height={396} style={{ fill: 'transparent' }} />
                </svg>
                {/* <div className={Animatable.hero_figure_box+" " +Animatable.hero_figure_box_01} data-rotation="45deg" />
                <div className={Animatable.hero_figure_box+" " +Animatable.hero_figure_box_02} data-rotation="-45deg" />
                <div className={Animatable.hero_figure_box+" " +Animatable.hero_figure_box_03} data-rotation="0deg" />
                <div className={Animatable.hero_figure_box+" " +Animatable.hero_figure_box_04} data-rotation="-135deg" /> */}
                <div className={Animatable.hero_figure_box + " " + Animatable.hero_figure_box_06} />
                <div className={Animatable.hero_figure_box + " " + Animatable.hero_figure_box_07} />
                <div className={Animatable.hero_figure_box + " " + Animatable.hero_figure_box_08} data-rotation="-22deg" />
                <div className={Animatable.hero_figure_box + " " + Animatable.hero_figure_box_09} data-rotation="-52deg" />
                <div className={Animatable.hero_figure_box + " " + Animatable.hero_figure_box_10} data-rotation="-50deg" />
            </div>
        </>);
}
