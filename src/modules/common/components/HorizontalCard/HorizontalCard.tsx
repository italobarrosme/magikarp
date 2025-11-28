type HorizontalCardProps = {
  children: React.ReactNode
}

export function HorizontalCard({ children }: HorizontalCardProps) {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-md p-4 transition-colors duration-300 max-w-md max-h-sm flex flex-row gap-4 hover:bg-gray-100 dark:hover:bg-zinc-800">
      {children}
    </div>
  )
}
