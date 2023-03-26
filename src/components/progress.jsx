import { useNProgress } from '@tanem/react-nprogress';
import styled from 'styled-components';

const BarLine = styled.div`
width: 100%;
height:0.25rem;
background:#4689e8;
position:fixed;
top:0;
left:0;
pointer-events:none;
z-index:9999;
`;

const Bar = ({ animationDuration, progress }) => (
    <BarLine
        style={{
            marginLeft: `${(-1 + progress) * 100}%`,
            transition: `margin-left ${animationDuration}ms linear`,
        }}
    ></BarLine>
);
const Container = ({ animationDuration, children, isFinished }) => (
    <div style={{
        opacity: isFinished ? 0 : 1,
        transition: `opacity ${animationDuration}ms linear`,
    }}
    >
        {children}
    </div>
);


const Progress = ({ isAnimating }) => {

    const { animationDuration, isFinished, progress } = useNProgress({
        isAnimating,
    });

    return (
        <Container animationDuration={animationDuration} isFinished={isFinished}>
            <Bar animationDuration={animationDuration} progress={progress} />
        </Container>
    );
};

export default Progress;