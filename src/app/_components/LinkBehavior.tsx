import NextLink, { LinkProps } from "next/link";
import { forwardRef, Ref } from "react";
import { Link } from "@mui/material";

export const LinkBehaviour = forwardRef<typeof Link>(function LinkBehaviour(
  props: any,
  ref
) {
  return <NextLink ref={ref} {...props} />;
});
