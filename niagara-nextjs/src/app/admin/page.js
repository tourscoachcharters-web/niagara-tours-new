import AdminClient from "./AdminClient";

export const metadata = {
  title: "Admin Dashboard | Niagara Travels",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminPage() {
  return <AdminClient />;
}