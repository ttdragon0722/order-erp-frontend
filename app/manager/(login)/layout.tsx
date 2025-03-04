import "./style.css";

export const metadata = {
  title: "Dashboard Login",
  description: "後臺登入",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
