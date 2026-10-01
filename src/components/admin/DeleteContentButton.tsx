"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Trash2 } from "lucide-react";
import { deleteContent } from "@/lib/actions/admin/content";
import type { Collection } from "@/lib/admin/collection-names";
import { dangerButton } from "./form/styles";

export default function DeleteContentButton({ collection, id, label }: { collection: Collection; id: string; label: string }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function onDelete() {
    if (!window.confirm(`Delete this ${label}? This can't be undone.`)) return;
    startTransition(async () => {
      const result = await deleteContent(collection, id);
      if (result.ok) router.replace(`/admin/content/${collection}`);
      else window.alert(result.error);
    });
  }

  return (
    <button type="button" onClick={onDelete} disabled={pending} className={`${dangerButton} sm:ml-auto`}>
      {pending ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
      Delete
    </button>
  );
}
