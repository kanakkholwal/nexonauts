"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import toast from "react-hot-toast";

interface SyncBtnProps {
    syncProducts: () => Promise<any[]>; // TODO - Change to the correct return type
}
export default function SyncBtn({ syncProducts }: SyncBtnProps) {
    const [loading, setLoading] = useState(false);

    const handleSync = async () => {
        setLoading(true);
        toast.promise(syncProducts(), {
            loading: "Syncing...",
            success: "Synced with Gumroad",
            error: "Error syncing with Gumroad"
        }).finally(() => {
            setLoading(false);
        })
    };

    return (
        <Button
            variant="outline"
            size="sm"
            onClick={() => handleSync()}
            disabled={loading}
        >
            {loading ? "Syncing..." : "Sync with Gumroad"}
        </Button>
    );
}