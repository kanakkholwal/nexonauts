import { useEffect } from 'react';
import Scrollbar from "smooth-scrollbar";

const overscrollOptions = {
    enable: true,
    effect: 'bounce',
    damping: 0.2,
    maxOverscroll: 150,
    glowColor: 'hsl(var(--primary))',
};
const options = {
    damping: 0.1,
    renderByPixels: true,
    thumbMinSize: 20,
    continuousScrolling: true,
    plugins: {
        // overscroll: { ...overscrollOptions },
    },
}
export const useSmoothScroll = () => {
    useEffect(() => {
        // Scrollbar.use(OverscrollPlugin);
        Scrollbar.init(document.body, options);
        return () => {
            if (Scrollbar) Scrollbar.destroy(document.body)
        }
    }, [])
    // return null;
}