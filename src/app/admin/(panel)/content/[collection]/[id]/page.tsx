import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ExternalLink } from "lucide-react";
import AdminSkeleton from "@/components/admin/AdminSkeleton";
import DeleteContentButton from "@/components/admin/DeleteContentButton";
import PageHeader from "@/components/admin/PageHeader";
import SchemaForm from "@/components/admin/form/SchemaForm";
import { secondaryButton } from "@/components/admin/form/styles";
import { saveContent } from "@/lib/actions/admin/content";
import { COLLECTIONS, isCollection } from "@/lib/admin/collection-names";
import { CONTENT_FORMS } from "@/lib/admin/form-configs";
import { getContentFormValue } from "@/lib/admin/queries";

export const metadata: Metadata = { title: "Edit content" };

type Params = PageProps<"/admin/content/[collection]/[id]">["params"];

async function ContentEditor({ params }: { params: Params }) {
  const { collection, id } = await params;
  if (!isCollection(collection)) notFound();
  const value = await getContentFormValue(collection, id);
  if (!value) notFound();

  const meta = COLLECTIONS[collection];
  const isNew = id === "new";

  return (
    <>
      <PageHeader
        title={isNew ? `New ${meta.singular.toLowerCase()}` : String(value.title) || meta.singular}
        backHref={`/admin/content/${collection}`}
        actions={
          !isNew &&
          value.status === "published" && (
            <a href={`${meta.publicPath}/${value.slug}`} target="_blank" rel="noreferrer" className={secondaryButton}>
              <ExternalLink size={16} /> View on site
            </a>
          )
        }
      />
      <SchemaForm
        // Remount after create → edit so the form starts from the saved state.
        key={id}
        fields={CONTENT_FORMS[collection]}
        initialValue={value}
        onSave={saveContent.bind(null, collection, isNew ? null : id)}
        submitLabel={isNew ? `Create ${meta.singular.toLowerCase()}` : "Save changes"}
        redirectTo={isNew ? `/admin/content/${collection}/:id` : undefined}
        extraActions={!isNew && <DeleteContentButton collection={collection} id={id} label={meta.singular.toLowerCase()} />}
      />
    </>
  );
}

export default function ContentEditPage({ params }: PageProps<"/admin/content/[collection]/[id]">) {
  return (
    <Suspense fallback={<AdminSkeleton rows={6} />}>
      <ContentEditor params={params} />
    </Suspense>
  );
}
