export const metadata = {
  title: "Sanity Studio | justack.ai",
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
      }}
    >
      {children}
    </div>
  );
}
