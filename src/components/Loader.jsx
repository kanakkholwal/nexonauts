import styles from "./_Loader.module.scss";
import styled from "styled-components";



export const Loader = styled.div`

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
    border: 2px solid var(--theme);
    border-right-color: #eee;
    border-left-color: #eee;
    border-radius: 100%;
    animation: spinner .45s infinite linear;
    transform-origin: center;
  }
  
  @-webkit-keyframes spinner {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
  
    to {
      -webkit-transform: rotate(1turn);
      transform: rotate(1turn);
    }
  }
  
  @keyframes spinner {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
  
    to {
      -webkit-transform: rotate(1turn);
      transform: rotate(1turn);
    }
  }
`;
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