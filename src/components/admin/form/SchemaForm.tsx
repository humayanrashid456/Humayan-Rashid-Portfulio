"use client";

import { useEffect, useRef, useState, useTransition, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { ArrowDown, ArrowUp, Check, Loader2, Plus, X } from "lucide-react";
import Icon from "@/components/ui/Icon";
import type { FieldDef } from "@/lib/admin/fields";
import { ICON_NAMES } from "@/lib/content/icons";
import type { ImageInput } from "@/lib/validation/common";
import type { VideoFileInput } from "@/lib/validation/content";
import type { SaveResult } from "@/lib/validation/content";
import ImageField from "./ImageField";
import VideoField from "./VideoField";
import { getAt, pathKey, setAt, type Path } from "./path";
import { errorClass, helpClass, inputClass, labelClass, primaryButton, secondaryButton } from "./styles";

type Value = Record<string, unknown>;

interface SchemaFormProps {
  fields: FieldDef[];
  initialValue: Value;
  onSave: (value: Value) => Promise<SaveResult>;
  submitLabel?: string;
  /** After a successful create, go to this URL (":id" is replaced by the new id). */
  redirectTo?: string;
  extraActions?: ReactNode;
}

/** An empty value for a new repeater item. */
function emptyFor(field: FieldDef): unknown {
  switch (field.type) {
    case "toggle":
      return true;
    case "number":
      return 0;
    case "icon":
      return ICON_NAMES[0];
    case "select":
    case "choice":
      return field.options[0]?.value ?? "";
    case "image":
    case "video":
      return null;
    case "list":
    case "repeater":
      return [];
    case "group":
      return Object.fromEntries(field.fields.map((f) => [f.name, emptyFor(f)]));
    default:
      return "";
  }
}

export default function SchemaForm({ fields, initialValue, onSave, submitLabel = "Save changes", redirectTo, extraActions }: SchemaFormProps) {
  const router = useRouter();
  const [value, setValue] = useState<Value>(initialValue);
  const [saved, setSaved] = useState(() => JSON.stringify(initialValue));
  const [issues, setIssues] = useState<Record<string, string>>({});
  const [message, setMessage] = useState<{ kind: "ok" | "error"; text: string } | null>(null);
  const [pending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);
  const dirty = JSON.stringify(value) !== saved;

  // Warn before leaving with unsaved edits.
  useEffect(() => {
    if (!dirty) return;
    const warn = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  // Ctrl/Cmd + S saves.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
        e.preventDefault();
        formRef.current?.requestSubmit();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const update = (path: Path, next: unknown) => setValue((v) => setAt(v, path, next));

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    startTransition(async () => {
      const result = await onSave(value);
      if (result.ok) {
        setIssues({});
        setSaved(JSON.stringify(value));
        setMessage({ kind: "ok", text: "Saved. The website is updated." });
        if (redirectTo && result.id) router.replace(redirectTo.replace(":id", result.id));
      } else {
        setIssues(result.issues ?? {});
        setMessage({ kind: "error", text: result.error });
      }
    });
  }

  return (
    <form ref={formRef} onSubmit={submit} className="space-y-6" noValidate>
      <FieldList fields={fields} value={value} path={[]} issues={issues} update={update} />

      <div className="sticky bottom-0 -mx-4 sm:-mx-6 px-4 sm:px-6 py-3 bg-[#061910]/95 backdrop-blur border-t border-white/10 flex flex-wrap items-center gap-3">
        <button type="submit" disabled={pending} className={primaryButton}>
          {pending ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} />}
          {pending ? "Saving…" : submitLabel}
        </button>
        {dirty && !pending && (
          <button type="button" className={secondaryButton} onClick={() => setValue(JSON.parse(saved))}>
            Discard changes
          </button>
        )}
        {extraActions}
        <span
          role="status"
          className={`text-sm ${message?.kind === "error" ? "text-red-400" : message ? "text-[#cbf341]" : "text-zinc-300"}`}
        >
          {message?.text ?? (dirty ? "Unsaved changes" : "")}
        </span>
      </div>
    </form>
  );
}

interface FieldProps {
  value: unknown;
  path: Path;
  issues: Record<string, string>;
  update: (path: Path, next: unknown) => void;
}

function FieldList({ fields, ...props }: FieldProps & { fields: FieldDef[] }) {
  return (
    <div className="space-y-5">
      {fields
        .filter((field) => !field.showIf || getAt(props.value, [field.showIf.field]) === field.showIf.equals)
        .map((field) => (
        <Field key={field.name} field={field} {...props} value={getAt(props.value, [field.name])} path={[...props.path, field.name]} />
      ))}
    </div>
  );
}

function Field({ field, value, path, issues, update }: FieldProps & { field: FieldDef }) {
  const id = `f-${pathKey(path)}`;
  const error = issues[pathKey(path)];
  const set = (next: unknown) => update(path, next);
  // Link the control to its help text and error so screen readers announce them.
  const describedBy = [field.help && `${id}-help`, error && `${id}-error`].filter(Boolean).join(" ") || undefined;
  const a11y = { "aria-invalid": error ? true : undefined, "aria-describedby": describedBy };

  const control = (() => {
    switch (field.type) {
      case "text":
      case "url":
      case "email":
        return (
          <input
            id={id}
            type={field.type === "text" ? "text" : field.type}
            value={String(value ?? "")}
            placeholder={field.placeholder}
            onChange={(e) => set(e.target.value)}
            className={inputClass}
            {...a11y}
          />
        );
      case "textarea":
        return (
          <textarea id={id} rows={field.rows ?? 3} value={String(value ?? "")} onChange={(e) => set(e.target.value)} className={inputClass} {...a11y} />
        );
      case "markdown":
        return (
          <textarea
            id={id}
            rows={18}
            value={String(value ?? "")}
            onChange={(e) => set(e.target.value)}
            className={`${inputClass} font-mono text-[13px] leading-relaxed`}
            {...a11y}
            placeholder={"## Heading\n\nParagraph text, **bold**, [links](https://…), lists:\n\n- one\n- two"}
          />
        );
      case "number":
        return (
          <input
            id={id}
            type="number"
            value={value === undefined || value === null ? "" : Number(value)}
            onChange={(e) => set(e.target.value === "" ? 0 : Number(e.target.value))}
            className={`${inputClass} max-w-40`}
            {...a11y}
          />
        );
      case "toggle":
        return (
          <label htmlFor={id} className="inline-flex items-center gap-3 cursor-pointer select-none">
            <input id={id} type="checkbox" role="switch" checked={Boolean(value)} onChange={(e) => set(e.target.checked)} className="peer sr-only" {...a11y} />
            {/* Off: zinc-600 track with a zinc-400 edge (≥3:1); on: lime. Focus ring shows for keyboard users. */}
            <span className="w-10 h-6 rounded-full bg-zinc-700 ring-1 ring-zinc-400 peer-checked:bg-[#cbf341] peer-checked:ring-[#cbf341] peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#cbf341] relative transition-colors after:absolute after:top-1 after:left-1 after:w-4 after:h-4 after:rounded-full after:bg-zinc-100 peer-checked:after:bg-[#061910] after:transition-transform peer-checked:after:translate-x-4" />
            <span className="text-sm text-zinc-100">{field.label}</span>
          </label>
        );
      case "select":
        return (
          <select id={id} value={String(value ?? "")} onChange={(e) => set(e.target.value)} className={`${inputClass} max-w-xs`} {...a11y}>
            {field.options.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        );
      case "icon":
        return (
          <div className="flex items-center gap-2">
            <span className="w-9 h-9 rounded-lg border border-[#cbf341]/30 flex items-center justify-center text-[#cbf341] shrink-0">
              <Icon name={String(value)} size={16} />
            </span>
            <select id={id} value={String(value ?? "")} onChange={(e) => set(e.target.value)} className={`${inputClass} max-w-xs`} {...a11y}>
              {ICON_NAMES.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>
        );
      case "choice":
        return (
          <div role="radiogroup" aria-labelledby={`${id}-label`} aria-describedby={describedBy} className="grid sm:grid-cols-2 gap-2 max-w-xl">
            {field.options.map((o) => {
              const checked = value === o.value;
              return (
                <label
                  key={o.value}
                  className={`flex items-start gap-3 rounded-xl border p-3 cursor-pointer transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-[#cbf341] ${
                    checked ? "border-[#cbf341] bg-[#cbf341]/10" : "border-zinc-500 hover:border-zinc-300"
                  }`}
                >
                  <input
                    type="radio"
                    name={id}
                    value={o.value}
                    checked={checked}
                    onChange={() => set(o.value)}
                    className="mt-0.5 accent-[#cbf341]"
                  />
                  <span>
                    <span className="block text-sm font-semibold text-zinc-50">{o.label}</span>
                    {o.description && <span className="block text-xs text-zinc-300 mt-0.5">{o.description}</span>}
                  </span>
                </label>
              );
            })}
          </div>
        );
      case "video":
        return <VideoField id={id} value={value as VideoFileInput | null} onChange={set} kind={field.kind} describedBy={describedBy} />;
      case "image":
        return <ImageField value={value as ImageInput | null} onChange={set} kind={field.kind} optional={field.optional} />;
      case "list":
        return <ListField value={(value as string[]) ?? []} onChange={set} itemLabel={field.itemLabel ?? "Item"} idPrefix={id} issues={issues} path={path} />;
      case "repeater":
        return <RepeaterField field={field} value={(value as Value[]) ?? []} path={path} issues={issues} update={update} />;
      case "group":
        return (
          <div className="rounded-xl border border-white/15 p-4 sm:p-5">
            <FieldList fields={field.fields} value={value} path={path} issues={issues} update={update} />
          </div>
        );
    }
  })();

  const isGroup = field.type === "group" || field.type === "repeater" || field.type === "choice";
  return (
    <div>
      {field.type !== "toggle" &&
        (isGroup ? (
          <h3 id={`${id}-label`} className="text-sm font-bold text-white mb-2">
            {field.label}
          </h3>
        ) : (
          <label htmlFor={id} className={labelClass}>
            {field.label}
          </label>
        ))}
      {control}
      {field.help && (
        <p id={`${id}-help`} className={helpClass}>
          {field.help}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} role="alert" className={errorClass}>
          {error}
        </p>
      )}
    </div>
  );
}

function ListField({
  value,
  onChange,
  itemLabel,
  idPrefix,
  issues,
  path,
}: {
  value: string[];
  onChange: (v: string[]) => void;
  itemLabel: string;
  idPrefix: string;
  issues: Record<string, string>;
  path: Path;
}) {
  return (
    <div className="space-y-2">
      {value.map((item, i) => (
        <div key={i}>
          <div className="flex gap-2">
            <input
              id={i === 0 ? idPrefix : undefined}
              aria-label={`${itemLabel} ${i + 1}`}
              aria-invalid={issues[pathKey([...path, i])] ? true : undefined}
              value={item}
              onChange={(e) => onChange(value.map((v, j) => (j === i ? e.target.value : v)))}
              className={inputClass}
            />
            <MoveButtons index={i} length={value.length} onMove={(from, to) => onChange(move(value, from, to))} />
            <button type="button" aria-label={`Remove ${itemLabel} ${i + 1}`} onClick={() => onChange(value.filter((_, j) => j !== i))} className="px-2 text-zinc-300 hover:text-red-300">
              <X size={16} />
            </button>
          </div>
          {issues[pathKey([...path, i])] && <p className={errorClass}>{issues[pathKey([...path, i])]}</p>}
        </div>
      ))}
      <button type="button" onClick={() => onChange([...value, ""])} className={`${secondaryButton} !py-1.5 !text-xs`}>
        <Plus size={14} /> Add {itemLabel.toLowerCase()}
      </button>
    </div>
  );
}

function RepeaterField({
  field,
  value,
  path,
  issues,
  update,
}: {
  field: Extract<FieldDef, { type: "repeater" }>;
  value: Value[];
  path: Path;
  issues: Record<string, string>;
  update: (path: Path, next: unknown) => void;
}) {
  const canAdd = !field.fixedLength && (field.max === undefined || value.length < field.max);
  return (
    <div className="space-y-3">
      {value.map((item, i) => (
        <div key={i} className="rounded-xl border border-white/15 bg-white/[0.03] p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#cbf341]">
              {field.itemLabel} {i + 1}
            </span>
            <div className="flex items-center gap-1">
              <MoveButtons index={i} length={value.length} onMove={(from, to) => update(path, move(value, from, to))} />
              {!field.fixedLength && (
                <button
                  type="button"
                  aria-label={`Remove ${field.itemLabel} ${i + 1}`}
                  onClick={() => update(path, value.filter((_, j) => j !== i))}
                  className="px-2 text-zinc-300 hover:text-red-300"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>
          <FieldList fields={field.fields} value={item} path={[...path, i]} issues={issues} update={update} />
        </div>
      ))}
      {canAdd && (
        <button
          type="button"
          onClick={() => update(path, [...value, Object.fromEntries(field.fields.map((f) => [f.name, emptyFor(f)]))])}
          className={`${secondaryButton} !py-1.5 !text-xs`}
        >
          <Plus size={14} /> Add {field.itemLabel.toLowerCase()}
        </button>
      )}
    </div>
  );
}

function MoveButtons({ index, length, onMove }: { index: number; length: number; onMove: (from: number, to: number) => void }) {
  return (
    <>
      <button type="button" aria-label="Move up" disabled={index === 0} onClick={() => onMove(index, index - 1)} className="px-1.5 text-zinc-300 hover:text-white disabled:opacity-40">
        <ArrowUp size={14} />
      </button>
      <button type="button" aria-label="Move down" disabled={index === length - 1} onClick={() => onMove(index, index + 1)} className="px-1.5 text-zinc-300 hover:text-white disabled:opacity-40">
        <ArrowDown size={14} />
      </button>
    </>
  );
}

function move<T>(list: T[], from: number, to: number): T[] {
  const copy = [...list];
  const [item] = copy.splice(from, 1);
  copy.splice(to, 0, item);
  return copy;
}
