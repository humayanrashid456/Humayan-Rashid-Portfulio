import type { LucideProps } from "lucide-react";
import Icon from "./Icon";

/** Icon for `Service.iconName`; same registry as every other CMS icon. */
export default function ServiceIcon(props: LucideProps & { name: string }) {
  return <Icon {...props} />;
}
