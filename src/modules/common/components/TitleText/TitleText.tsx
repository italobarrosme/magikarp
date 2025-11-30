type TitleTextProps = {
  children: React.ReactNode
}

export function TitleText({ children }: TitleTextProps) {
  return (
    <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
      {children}
    </h1>
  )
}
