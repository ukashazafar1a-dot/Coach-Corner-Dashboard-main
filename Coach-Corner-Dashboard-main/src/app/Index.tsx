"use client";
import LogoutPopup from "@/components/LogoutPopup";
import { Toaster } from "@/components/ui/sonner";
import { AppProvider } from "@/context/AppContext";
import { usePathname } from "next/navigation";
import NextTopLoader from "nextjs-toploader";

function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <AppProvider>
        <main className="App" data-path={pathname}>
          {children}
        </main>
        <NextTopLoader
          color="#fff"
          initialPosition={0.08}
          height={3}
          showSpinner={false}
          speed={200}
          showAtBottom={false}
        />
        <Toaster
          position="top-right"
          expand={false}
          visibleToasts={3}
          richColors={true}
          toastOptions={{
            className: "custom-toast",
          }}
        />
        <LogoutPopup />
    </AppProvider>
  );
}

export default Providers;
