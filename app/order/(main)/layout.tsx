import "./style.css";

export const metadata = {
    title: "點餐系統",
    description: "點餐系統",
    icons: {
        icon: '/favicon.ico',
    },
};

export default function RootLayout({
    children, modal
}: {
    children: React.ReactNode,
    modal: React.ReactNode
}) {

    return (
        <html lang="en">
            <body>
                {children}
                {modal}
            </body>
        </html >
    );
}
