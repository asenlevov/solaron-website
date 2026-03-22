export default function PravnaInformatsiyaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 md:px-6 md:py-16 lg:py-20">
      {children}
    </div>
  );
}
