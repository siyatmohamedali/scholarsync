// This will be the main dashboard page, for now it redirects to scholarship management.
import { redirect } from 'next/navigation';

export default function AdminPage() {
  redirect('/admin/scholarships');
}
