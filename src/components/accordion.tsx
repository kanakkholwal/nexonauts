import {useState} from "react";
import Collapse from "./collapse";
import styled from "styled-components";
import {TbChevronUp} from "react-icons/tb";
const StyledAccordion = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    border-radius: 0.25rem;
`;
const StyledAccordionHeader = styled.div<{
    active: boolean
}>`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border-radius: 0.25rem;
    padding: 0.25rem 0.75rem;
    background-color: #f2f5f7;
    transition: transform 0.3s ease-in-out;
    border-bottom: none;
    cursor: pointer;
    &:hover {
        background-color: #e8ecef;
    }
    &>.iconArrow{
        transform: rotate(0);
        transition: transform 0.3s ease-in-out;
    }
    ${({active}) => active && `
        background-color: #e8ecef;
        border-bottom: 1px solid #dee2e6;
        &>.iconArrow{
            transform: rotate(180deg);
        }
    `}


`;


export default function Accordions({
    className,
    style,
    items,
    collapseConfig = {},
}:AccordionProps) {
    const [activeKey, setActiveKey] = useState<number | null>(0);
    

    return (
        <StyledAccordion className={className} style={style}>
            {items.map((item, index) => {
                const { header, content } = item;
                const isActive = activeKey === index;
                const handleToggle = () => {
                    setActiveKey(isActive ? null : index);
                };
                return (
                    <StyledAccordion key={index}>
                        <StyledAccordionHeader active={isActive} onClick={handleToggle}>
                            {header}
                            <TbChevronUp size={18} onClick={(e) =>{
                                e.preventDefault();
                                e.stopPropagation();
                               isActive ? setActiveKey(null) : setActiveKey(index);
                            }}
                            className="iconArrow"
                            />
                        </StyledAccordionHeader>
                        <Collapse visible={isActive} {...collapseConfig}>{content}</Collapse>
                    </StyledAccordion>
                );
            })}
        </StyledAccordion>
    );
}

type AccordionProps = {
    className?: string,
    style?: React.CSSProperties,
    collapseConfig?: {
        className?: string
        /**
         * Set horizontal collapsing to transition the width instead of height.
         */
        horizontal?: boolean
        /**
         * Callback fired when the component requests to be hidden.
         */
        onHide?: () => void
        /**
         * Callback fired when the component requests to be shown.
         */
        onShow?: () => void
    },
    items: {
        header: React.ReactNode,
        content: React.ReactNode,
    }[],
}