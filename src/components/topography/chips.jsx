
import styled from "styled-components";
import {MdOutlineClear} from "react-icons/md";


const StyledWrapper = styled.div`
display: inline-flex;
align-items: center;
justify-content: center;
max-width: 100%;
border-radius: 1rem;
font-size: 0.8125rem;
white-space: nowrap;
outline: 0px;
text-decoration: none;
padding: 0px;
vertical-align: middle;
box-sizing: border-box;
background-color: transparent;
font-family: inherit;
font-weight: 500;
span{
    display: flex;
    align-items: center;
    justify-content: center;
    gap:0.25rem;
}
span.label{
    overflow: hidden;
    text-overflow: ellipsis;
    padding-left: 12px;
    padding-right: 12px;
    white-space: nowrap;
}
span.endIcon{
    cursor: pointer;
    margin: 0px 5px 0px -6px;
}
span.startIcon{
    cursor: pointer;
    margin: 0px 5px 0px -6px;
}

background:var(--badge-bg,rgba(var(--theme-rgb),0.1));
color:var(--badge-text,rgba(var(--theme-rgb),1));
border: 1px solid var(--badge-border,rgba(var(--theme-rgb),0.6));
text-align: center;

${props => props.variant ? `
    --badge-bg:rgba(var(--${props.variant}-rgb), .1);
    --badge-border:rgba(var(--${props.variant}-rgb), 0.6);
    --badge-text:rgba(var(--${props.variant}-rgb), 1);
  ` : ``}
${props => props.outlined ? `
    --badge-bg:rgba(var(--${props.nature}-rgb), .1);
    --badge-border:rgba(var(--${props.nature}-rgb), 0.1);
    --badge-text:rgba(var(--${props.nature}-rgb), 1);
` : ``}
`;



export default function Chips({
    label,
    avatar,
    startIcon,
    endIcon,
    variant,
    className,
    style,
    onClick,
    onEndIconClick,
    ...props
}) {
    return (
        <StyledWrapper variant={variant} className={className} style={style} onClick={onClick} {...props}>
            {startIcon ? <span className="startIcon" role="button">{startIcon}</span> : null}
            {avatar && avatar}
            <span className="label">{label}</span>
            {onEndIconClick ? endIcon ? <span className="endIcon" role="button" onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                onEndIconClick();
            }}>{endIcon}</span> : <span className="endIcon" role="button" onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                onEndIconClick();
            }}><MdOutlineClear /></span> : null}
        </StyledWrapper>
    )
}