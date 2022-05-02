import { useMemo } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import classNames from "classnames";

interface Props {
  exact?: boolean;
  href: string;
  text: string;
}

export function MenuItem({ exact, href, text }: Props) {
  const { pathname } = useRouter();
  const isActive = useMemo(() => {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  }, [href, exact, pathname]);

  const classList = useMemo(
    () =>
      classNames(
        [
          "inline-flex",
          "text-title",
          "flex-col",
          "items-center",
          "justify-between",
          "text-white",
          "text-center",
          "hover:opacity-100",
          "hover:no-underline",
        ],
        {
          "text-sky-600 active": isActive,
        }
      ),
    [isActive]
  );

  return (
    <Link href={href} passHref>
      <a className={classList}>
        <span className="text-md">{text}</span>
      </a>
    </Link>
  );
}
