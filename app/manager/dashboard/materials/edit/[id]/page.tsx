"use client"
import { useParams } from "next/navigation";

export default function PostPage() {
    const params = useParams();
    const { id } = params;

    return (
        <div>
            <h1>這是 Post 頁面</h1>
            <p>你目前看到的是 id：{id}</p>
        </div>
    );
}
