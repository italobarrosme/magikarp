type SubTextProps = {
  children: React.ReactNode
}

export const SubText = ({ children }: SubTextProps) => {
  return <p className="text-xs text-zinc-500 dark:text-zinc-400">{children}</p>
}
