import styled from "styled-components";
import { useState, useEffect } from "react";

const useModal = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return { isOpen, toggle };
}