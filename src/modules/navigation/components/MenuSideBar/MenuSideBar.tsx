import Link from "next/link";

type MenuItem = {
  label: string;
  icon: React.ReactNode;
  href: string;
  subItems?: MenuItem[];
  onClick?: () => void;
};

type MenuSideBarProps = {
  items: MenuItem[];
};

export const MenuSideBar = ({ items }: MenuSideBarProps) => {
  return (
    <aside className="group flex flex-col gap-4 fixed top-0 left-0 h-full w-20 hover:w-48 transition-all duration-300 bg-primary-foreground border-r border-border-strong p-4">
      {items.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          className="flex flex-row gap-4 items-center hover:bg-surface-hover rounded-md p-2 transition-all duration-300 last:mt-auto"
        >
          <span className="text-sm">{item.icon}</span>
          <span className="text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            {item.label}
          </span>
        </Link>
      ))}
    </aside>
  );
};
