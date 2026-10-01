import type { UploadKind } from "./upload-kinds";

/**
 * Declarative admin form fields. Plain data, so a Server Component page can hand a
 * config to the generic <SchemaForm>. Server-side validation lives in the Zod
 * schemas; these only describe how to edit the value.
 */
interface Base {
  name: string;
  label: string;
  help?: string;
  /** Show the field only while a sibling field has this value (e.g. source = "upload"). */
  showIf?: { field: string; equals: string };
}

export type FieldDef =
  | (Base & { type: "text" | "url" | "email"; placeholder?: string })
  | (Base & { type: "textarea"; rows?: number })
  | (Base & { type: "markdown" })
  | (Base & { type: "number" })
  | (Base & { type: "toggle" })
  | (Base & { type: "select"; options: { value: string; label: string }[] })
  | (Base & { type: "choice"; options: { value: string; label: string; description?: string }[] })
  | (Base & { type: "video"; kind: UploadKind })
  | (Base & { type: "icon" })
  | (Base & { type: "image"; kind: UploadKind; optional?: boolean })
  | (Base & { type: "list"; itemLabel?: string })
  | (Base & { type: "repeater"; itemLabel: string; fields: FieldDef[]; max?: number; fixedLength?: boolean })
  | (Base & { type: "group"; fields: FieldDef[] });

export interface FormConfig {
  title: string;
  description?: string;
  fields: FieldDef[];
}
