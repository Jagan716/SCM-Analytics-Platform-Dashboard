import "./globals.css";

export const metadata = {
  title: "SCM Analytics Platform",
  description:
    "Supply chain control tower: inventory, procurement, supplier OTIF, logistics and demand-supply planning in one place.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col bg-cream text-steel-dark antialiased">{children}</body>
    </html>
  );
}
