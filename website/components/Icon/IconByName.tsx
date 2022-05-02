import { Icon, IconProps } from "../Icon";
import { IconName } from "./IconName.type";

export interface Props extends IconProps {
  name: IconName;
}

export function IconByName({ name, ...props }: Props) {
  const Component = Icon[name];
  return <Component {...props} />;
}
