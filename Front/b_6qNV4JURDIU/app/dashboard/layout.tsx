import Sidebar from '@/components/dashboard/Sidebar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="d-flex min-vh-100" style={{ background: 'var(--background)' }}>
      <Sidebar />
      <main className="flex-grow-1" style={{ marginLeft: '260px' }}>
        {children}
      </main>
    </div>
  )
}
