import Link from "next/link";

export default function TabSidebar({
  text,
  href,
  icon,
  active,
  isOpenSidebar,
  setActiveTab,
}: {
  text: string;
  href: string;
  icon: React.ReactNode;
  active: boolean;
  isOpenSidebar?: boolean;
  setActiveTab: (tab: string) => void;
}) {
  return (
    <Link href={href} onClick={() => setActiveTab(text)}>
      <li
        className={`flex items-center p-3 rounded-md cursor-pointer hover:bg-gray-700 transition-all duration-200 mt-2 ${
          active ? "bg-gray-800 font-bold" : ""
        } ${isOpenSidebar ? "gap-3" : "justify-center"}`}
      >
        <span className="-5 h-5">
          {icon}
        </span>
        {isOpenSidebar && <span className="truncate">{text}</span>}
      </li>
    </Link>
  );
}
