import { FC, ReactNode } from "react";

export const Render: FC<{ when: any; children: ReactNode }> = ({
  when,
  children,
}) => <>{when ? children : null}</>;
