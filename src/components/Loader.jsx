import styles from "./_Loader.module.scss";
import styled from "styled-components";

export const IndeterminateLinearLoader = styled.div`
margin: auto;
height: ${({ size }) => size || '4px'};
background-color: rgba(var(--theme-rgb), 0.2);
width: 100%;
overflow: hidden;
position: relative;
border-radius: 4px;
&:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(var(--theme-rgb), 1);
    animation: indeterminate 1.5s infinite;
    border-radius: 4px;
}


`;

export const IndeterminateCircularLoader = styled.div`
position: relative;
width: 100%;
height: auto;
overflow: hidden;
display: flex;
align-items: center;
justify-content: center;
margin: auto;
&:after {
    content: '';
    display: block;
    width: ${({ size }) => size || '48px'};
    height: ${({ size }) => size || '48px'};
    box-sizing: border-box;
    margin: 0;
    border: 2px solid var(--${({nature}) => nature ? nature : 'theme'});
    border-right-color: #eee;
    border-left-color: #eee;
    border-radius: 100%;
    animation: spinner .45s infinite linear;
    transform-origin: center;
}

`;

export const ProgressLinearLoader = styled.div`
    margin: auto;
    height: ${({ size }) => size || '4px'};
    background-color: rgba(var(--theme-rgb), 0.2);
    width: 100%;
    overflow: hidden;
    position: relative;
    border-radius: 4px;
    &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: ${({ value }) => value || '0'}%;
        height: 100%;
        background-color: rgba(var(--theme-rgb), 1);
        border-radius: 4px;
    }
`;

export const Spinner = styled.div`

  width: ${({ size }) => size || '48px'};
    height: ${({ size }) => size || '48px'};
  display: grid;
  border: 4.5px solid #0000;
  border-radius: 50%;
  border-color: #dbdcef #0000;
  animation: spinner-e04l1k 1s infinite linear;


&::before,&::after {
  content: "";
  grid-area: 1/1;
  margin: 2.2px;
  border: inherit;
  border-radius: 50%;
}

&::before {
  border-color: #474bff #0000;
  animation: inherit;
  animation-duration: 0.5s;
  animation-direction: reverse;
}

&::after {
  margin: 8.9px;
}

@keyframes spinner-e04l1k {
  100% {
    transform: rotate(1turn);
  }
}
`;
const Svg = styled.svg`
display: inline-flex;
vertical-align: bottom;
margin: auto;
`;
const Circle = styled.circle`
stroke: rgba(var(--theme-rgb), 0.25);
stroke-width: ${({ strokeWidth }) => strokeWidth || '4px'};
stroke-dasharray: 0;
fill: none;
`;
const Path = styled.path`
stroke-width: ${({ strokeWidth }) => `calc(${strokeWidth} + 1px)` || '5px'};
stroke: rgba(var(--theme-rgb), 1);
fill: none;
transition: stroke-dashoffset 1s cubic-bezier(0.43, 0.41, 0.22, 0.91);
transform-origin: center center;
transform: rotate(-90deg) scaleX(-1);
`;
const Text = styled.text`
fill: rgba(var(--theme-rgb), 1);
font-weight: bold;
`;

export function ProgressCircularLoader({ size, strokeWidth, value }) {
    const length = 282.78302001953125;
    return (
        <Svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" data-value={value}>
            <Circle r={45} cx={size} cy={size} strokeWidth={strokeWidth ?? "4px"} />
            {/* 282.78302001953125 is auto-calculated by path.getTotalLength() */}
            <Path d="M5,50a45,45 0 1,0 90,0a45,45 0 1,0 -90,0"
                strokeLinecap="round" strokeLinejoin="round"
                strokeDashoffset={Math.max(0, length * ((100 - value) / 100))}
                strokeDasharray={length} />
            {/* Value automatically updates based on data-value set above */}
            <Text x={size} y={size} textAnchor="middle" dominantBaseline="central" fontSize={20} >
                {value}%
            </Text>
        </Svg>

    )
}



export const PageFullLoader = styled.div`
    transform: rotateZ(45deg);
    perspective: 1000px;
    border-radius: 50%;
    width: ${({ size }) => size || '48px'};
    height: ${({ size }) => size || '48px'};
    color: #fff;

    &:before,
    &:after {
content: '';
display: block;
position: absolute;
top: 0;
left: 0;
width: inherit;
height: inherit;
border-radius: 50%;
transform: rotateX(70deg);
animation: 1s spin linear infinite;
    }
    &:after {
color: #FF3D00;
transform: rotateY(70deg);
animation-delay: .4s;
    }

@keyframes rotate {
    0% {
transform: translate(-50%, -50%) rotateZ(0deg);
    }
    100% {
transform: translate(-50%, -50%) rotateZ(360deg);
    }
}

@keyframes rotateCc {
    0% {
transform: translate(-50%, -50%) rotate(0deg);
    }
    100% {
transform: translate(-50%, -50%) rotate(-360deg);
    }
}

@keyframes spin {
    0%,
    100% {
box-shadow: .2em 0px 0 0px currentColor;
    }
    12% {
box-shadow: .2em .2em 0 0 currentColor;
    }
    25% {
box-shadow: 0 .2em 0 0px currentColor;
    }
    37% {
box-shadow: -.2em .2em 0 0 currentColor;
    }
    50% {
box-shadow: -.2em 0 0 0 currentColor;
    }
    62% {
box-shadow: -.2em -.2em 0 0 currentColor;
    }
    75% {
box-shadow: 0px -.2em 0 0 currentColor;
    }
    87% {
box-shadow: .2em -.2em 0 0 currentColor;
    }
}

`;

const LoaderWrapper = styled.div`
width:100%;
min-height:100vh;
height:100%;
display:flex;
justify-content:center;
align-items:center;
`;


export const PageLoader = () => (<LoaderWrapper><PageFullLoader size="64px" /></LoaderWrapper>)

export default function _Loader({ size }) {


    return (
        <div className={styles.loader}>
            <svg className={styles.circular} width={size} height={size} viewBox="25 25 50 50">
                <circle className={styles.path} cx={50} cy={50} r={20} fill="none" strokeWidth={2} strokeMiterlimit={10} />
            </svg>
        </div>

    )
}