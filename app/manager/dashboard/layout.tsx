import { ToolbarProvider } from "./_context/ToolbarContext";
import "./style.css";
import Container from "./_components/container";
import QueryProvider from "@/context/QueryProvider";

export const metadata = {
  title: "Dashboard",
  description: "後台管理",
};

export default function RootLayout({
  children,
  toolbar
}: {
  children: React.ReactNode,
  toolbar: React.ReactNode
}) {

  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <div className="flex w-full h-screen relative">
            <ToolbarProvider>
              {toolbar}
              <Container>
                {children}
              </Container>
            </ToolbarProvider>
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}
