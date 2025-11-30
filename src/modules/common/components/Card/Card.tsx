type CardProps = {
  children: React.ReactNode
}

export function Card({ children }: CardProps) {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-md p-4 max-w-md max-h-md flex flex-col gap-4 hover:bg-gray-100 dark:hover:bg-zinc-800">
      {children}
    </div>
  )
}
