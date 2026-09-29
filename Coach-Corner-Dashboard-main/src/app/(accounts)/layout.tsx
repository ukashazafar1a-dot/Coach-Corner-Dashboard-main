export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="accounts-wrapper h-screen overflow-hidden overflow-y-auto px-3 pt-10 pb-16 flex items-start justify-center">
      {children}
    </section>
  );
}
