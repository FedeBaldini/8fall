import { Meta, Story } from "@storybook/react";

import { Button } from "../Button";

export default {
  title: "components / Button",
  component: Button,
} as Meta;

export const Standard: Story = () => (
  <Button onClick={() => console.log("Clicked")}>Click</Button>
);

export const Secondary: Story = () => (
  <Button onClick={() => console.log("Clicked")} style="secondary">
    Click
  </Button>
);

export const Transparent: Story = () => (
  <Button onClick={() => console.log("Clicked")} transparent>
    Click
  </Button>
);
