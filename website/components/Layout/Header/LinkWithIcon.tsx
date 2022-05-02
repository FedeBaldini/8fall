import Link from "next/link";
import classNames from "classnames";

import { WithOptionalClassName } from "../../../utils/types";

import { IconName, IconByName } from "../../Icon";

interface Props {
  icon: IconName;
  href: string;
  text?: string;
}

export function LinkWithIcon({
  icon,
  href,
  text,
  className,
}: Props & WithOptionalClassName) {
  const isExternal = href.startsWith("http");
  const target = isExternal ? "_blank" : "_self";

  return (
    <Link href={href} passHref>
      <a
        className={classNames(
          "group inline-flex items-center text-white hover:text-sky-600",
          className
        )}
        target={target}
      >
        <IconByName name={icon} className="w-4 sm:mr-1" />
        {text && (
          <span className="hidden md:block group-hover:underline">{text}</span>
        )}
      </a>
    </Link>
  );
}
