"use client";

import { useRef } from "react";

import { useFormStore } from "./store";

function StoreInitializer() {
    const initialized = useRef(false);
    if (!initialized.current) {
        useFormStore.setState({
            tool: {
                name: "",
                description: "",
                coverImage: "",
                categories: [],
                tags: [],
                link: "",
                slug: "",
                status: "draft",
                verified: false,
                pricing_type: "other",
            }
        });
        initialized.current = true;
    }
    return null;
}

export default StoreInitializer;