import { Meta, Story } from "@storybook/react";

import { Header } from "../Layout/Header";

export default {
  title: "components / Layout / Header",
  component: Header,
} as Meta;

export const Standard: Story = () => <Header />;
