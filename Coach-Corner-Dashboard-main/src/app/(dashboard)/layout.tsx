import App from "./app";
import 'react-quill/dist/quill.snow.css';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="dashboard--layout">
      <App>{children}</App>
    </div>
  );
}
