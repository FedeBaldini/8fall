import { Meta, Story } from "@storybook/react";

import { Logo } from "../Logo";

export default {
  title: "components / Logo",
  component: Logo,
} as Meta;

export const Standard: Story = () => (
  <div className="bg-black">
    <Logo />
  </div>
);
