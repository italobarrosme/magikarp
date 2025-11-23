import { Metadata } from "next";
import { ReactNode } from "react";
import { HomeIcon } from "@/modules/common/components/Icons";
import { MenuSideBar } from "@/modules/navigation/components/MenuSideBar";
import {
  CampaignsIcon,
  ReportsIcon,
  SettingsIcon,
} from "@/modules/common/components";
import { UserInfo } from "@/modules/authentication/components/UserInfo";

type Props = {
  children?: ReactNode;
};

export const metadata: Metadata = {
  title: "Nezuko 3",
  description: "Nezuko 3",
  manifest: "/manifest.json",
  icons: {
    apple: "/apple-icon.png",
  },
};

export default async function RootLayout({ children }: Props) {
  return (
    <section className="w-full h-full flex flex-col gap-4">
      <div className="flex flex-row gap-4 w-full justify-end">
        <UserInfo />
      </div>
      {children}
      <MenuSideBar
        items={[
          {
            label: "Dashboard",
            icon: <HomeIcon />,
            href: "/",
          },
          {
            label: "Campanhas",
            icon: <CampaignsIcon />,
            href: "/campaigns",
          },
          {
            label: "Relatórios",
            icon: <ReportsIcon />,
            href: "/reports",
          },
          {
            label: "Configurações",
            icon: <SettingsIcon />,
            href: "/settings",
          },
        ]}
      />
    </section>
  );
}
