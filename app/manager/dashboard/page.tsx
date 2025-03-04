"use client"
import { Header1, Header2 } from "@/components/ui/Text";

export default function Dashboard() {
  return (
    <>
      <Header1>Welcome to ERP Dashboard!</Header1>
      <hr className="my-2" />
      <Header2>hello world!</Header2>
      {
        Array.from({ length: 100 }).map((_, index) => {
          return <div key={index}>haha</div>;
        })
      }
    </>
  );
}
