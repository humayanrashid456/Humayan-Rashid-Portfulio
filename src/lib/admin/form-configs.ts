import type { HomeSectionKey } from "@/lib/content/home";
import type { Collection } from "./collection-names";
import type { FieldDef, FormConfig } from "./fields";

const enabled: FieldDef = { type: "toggle", name: "enabled", label: "Show this section on the website" };
const eyebrow: FieldDef = { type: "text", name: "eyebrow", label: "Eyebrow", help: "The small label above the title." };
const title: FieldDef = { type: "text", name: "title", label: "Title" };
const listingHeading = (heading: string, what: string): FormConfig => ({
  title: heading,
  description: `The ${what} themselves are edited under their own menu item. The section hides itself when none are published.`,
  fields: [enabled, eyebrow, title, { type: "textarea", name: "subtitle", label: "Subtitle (optional)", rows: 2 }],
});

export const HOME_FORMS: Record<HomeSectionKey, FormConfig> = {
  hero: {
    title: "Hero",
    description: "The first screen visitors see.",
    fields: [
      enabled,
      { type: "text", name: "greeting", label: "Greeting", placeholder: "Hi, I'm" },
      { type: "text", name: "name", label: "Highlighted name" },
      {
        type: "textarea",
        name: "subheadline",
        label: "Sub-headline",
        rows: 3,
        help: "Wrap words in **double asterisks** to make them bold.",
      },
      { type: "list", name: "bullets", label: "Checklist", itemLabel: "Item" },
      { type: "text", name: "primaryCta", label: "Main button text", help: "Opens the booking form." },
      { type: "text", name: "secondaryCta", label: "Second button text", help: "Links to the portfolio page." },
      { type: "url", name: "introVideo", label: "Intro video (YouTube link)", help: "Leave empty to show just the image." },
      { type: "text", name: "videoCaption", label: "Caption under the video" },
      { type: "image", name: "bannerImage", label: "Video cover image", kind: "site" },
      {
        type: "repeater",
        name: "tabs",
        label: "Icons under the video",
        itemLabel: "Tab",
        max: 6,
        fields: [
          { type: "icon", name: "icon", label: "Icon" },
          { type: "text", name: "label", label: "Label" },
        ],
      },
      {
        type: "repeater",
        name: "trustItems",
        label: "Trust bar",
        itemLabel: "Item",
        max: 6,
        fields: [
          { type: "icon", name: "icon", label: "Icon" },
          { type: "text", name: "label", label: "Text" },
        ],
      },
      { type: "text", name: "tagline", label: "Tagline at the bottom" },
    ],
  },
  services: listingHeading("Services heading", "services"),
  about: {
    title: "About",
    fields: [
      enabled,
      eyebrow,
      title,
      { type: "textarea", name: "description", label: "Description", rows: 4 },
      { type: "list", name: "features", label: "Feature checklist", itemLabel: "Feature" },
      { type: "text", name: "ctaLabel", label: "Button text" },
      { type: "image", name: "image", label: "Image", kind: "site" },
      {
        type: "repeater",
        name: "stats",
        label: "Statistics",
        itemLabel: "Statistic",
        max: 4,
        fields: [
          { type: "icon", name: "icon", label: "Icon" },
          { type: "text", name: "value", label: "Value", placeholder: "900+" },
          { type: "text", name: "label", label: "Label" },
        ],
      },
      { type: "list", name: "marquee", label: "Scrolling ticker", itemLabel: "Item" },
    ],
  },
  portfolio: listingHeading("Portfolio heading", "projects"),
  process: {
    title: "Working process",
    fields: [
      enabled,
      eyebrow,
      title,
      { type: "image", name: "image", label: "Centre image", kind: "site" },
      {
        type: "repeater",
        name: "steps",
        label: "Steps",
        itemLabel: "Step",
        fixedLength: true,
        help: "The layout always shows exactly 4 steps.",
        fields: [
          { type: "icon", name: "icon", label: "Icon" },
          { type: "text", name: "title", label: "Title" },
          { type: "textarea", name: "description", label: "Description", rows: 2 },
        ],
      },
    ],
  },
  benefits: {
    title: "Benefits",
    fields: [
      enabled,
      eyebrow,
      title,
      { type: "text", name: "withLabel", label: "Left column heading", placeholder: "With HR" },
      { type: "text", name: "withoutLabel", label: "Right column heading", placeholder: "Without HR" },
      {
        type: "repeater",
        name: "rows",
        label: "Comparison rows",
        itemLabel: "Row",
        max: 6,
        fields: [
          { type: "icon", name: "icon", label: "Icon" },
          { type: "text", name: "withTitle", label: "With: title" },
          { type: "textarea", name: "withDescription", label: "With: description", rows: 2 },
          { type: "text", name: "withoutTitle", label: "Without: title" },
          { type: "textarea", name: "withoutDescription", label: "Without: description", rows: 2 },
        ],
      },
    ],
  },
  videos: listingHeading("Videos heading", "videos"),
  studyAbroad: {
    title: "Study abroad",
    fields: [
      enabled,
      eyebrow,
      { type: "text", name: "title", label: "Title (first part)" },
      { type: "text", name: "highlight", label: "Title (highlighted part)" },
      { type: "textarea", name: "description", label: "Description", rows: 3 },
      { type: "image", name: "image", label: "Photo", kind: "site" },
      { type: "text", name: "consultantName", label: "Name on the photo badge" },
      { type: "text", name: "consultantRole", label: "Role on the photo badge" },
      {
        type: "repeater",
        name: "countries",
        label: "Countries",
        itemLabel: "Country",
        max: 12,
        fields: [
          { type: "text", name: "name", label: "Name" },
          { type: "text", name: "code", label: "Flag code", help: "2 letters, e.g. us, gb, ca", placeholder: "us" },
        ],
      },
      {
        type: "repeater",
        name: "services",
        label: "Services strip",
        itemLabel: "Service",
        max: 6,
        fields: [
          { type: "icon", name: "icon", label: "Icon" },
          { type: "text", name: "title", label: "Title" },
          { type: "text", name: "description", label: "Short description" },
        ],
      },
      { type: "text", name: "primaryCta", label: "Main button text", help: "Links to the Study Abroad page." },
      { type: "text", name: "secondaryCta", label: "Second button text", help: "Links to the contact page." },
    ],
  },
  blog: listingHeading("Blog heading", "blog posts"),
  contact: {
    title: "Contact",
    description: "Phone, email, WhatsApp and address come from Site settings.",
    fields: [
      enabled,
      eyebrow,
      title,
      { type: "textarea", name: "description", label: "Description", rows: 2 },
      { type: "text", name: "ctaLabel", label: "Button text" },
      { type: "text", name: "hoursLabel", label: "Opening hours label", help: "Leave empty to hide it." },
    ],
  },
};

const status: FieldDef = {
  type: "select",
  name: "status",
  label: "Status",
  options: [
    { value: "draft", label: "Draft (hidden)" },
    { value: "published", label: "Published" },
  ],
};
const slug: FieldDef = {
  type: "text",
  name: "slug",
  label: "URL slug",
  help: "The page address. Leave empty to build it from the title. Changing it later breaks old links.",
};
const order: FieldDef = { type: "number", name: "order", label: "Sort order", help: "Lower numbers appear first." };
const seo: FieldDef = {
  type: "group",
  name: "seo",
  label: "Search engines (optional)",
  fields: [
    { type: "text", name: "title", label: "SEO title", help: "Defaults to the title." },
    { type: "textarea", name: "description", label: "SEO description", rows: 2 },
  ],
};

export const CONTENT_FORMS: Record<Collection, FieldDef[]> = {
  services: [
    status,
    { type: "text", name: "title", label: "Title" },
    slug,
    { type: "textarea", name: "description", label: "Description", rows: 4 },
    { type: "icon", name: "iconName", label: "Icon" },
    { type: "list", name: "deliverables", label: "Deliverables", itemLabel: "Deliverable" },
    { type: "image", name: "image", label: "Card image", kind: "services", optional: true },
    order,
    seo,
  ],
  projects: [
    status,
    { type: "text", name: "title", label: "Title" },
    slug,
    { type: "textarea", name: "description", label: "Short description", rows: 3 },
    { type: "text", name: "category", label: "Category", help: "Used for the filter buttons, e.g. Web, Design." },
    { type: "list", name: "technologies", label: "Technologies", itemLabel: "Technology" },
    { type: "image", name: "coverImage", label: "Cover image", kind: "projects" },
    { type: "url", name: "liveUrl", label: "Live site URL" },
    { type: "url", name: "repoUrl", label: "Code repository URL" },
    { type: "markdown", name: "body", label: "Case study (Markdown)" },
    order,
    seo,
  ],
  blog: [
    status,
    { type: "text", name: "title", label: "Title" },
    slug,
    { type: "textarea", name: "excerpt", label: "Excerpt", rows: 3, help: "Shown on cards and in search results." },
    { type: "text", name: "category", label: "Category" },
    { type: "list", name: "tags", label: "Tags", itemLabel: "Tag" },
    { type: "image", name: "coverImage", label: "Cover image", kind: "blog" },
    { type: "markdown", name: "body", label: "Post body (Markdown)" },
    seo,
  ],
  videos: [
    status,
    { type: "text", name: "title", label: "Title" },
    slug,
    {
      type: "choice",
      name: "source",
      label: "Video source",
      options: [
        { value: "youtube", label: "YouTube link", description: "Plays from YouTube. Best for long videos." },
        { value: "upload", label: "Upload from computer", description: "Hosted on Cloudinary, plays on your site." },
      ],
    },
    {
      type: "url",
      name: "youtubeId",
      label: "YouTube link",
      help: "Paste the video URL (youtube.com/watch?v=…, youtu.be/…, Shorts) or its 11-character id.",
      placeholder: "https://www.youtube.com/watch?v=…",
      showIf: { field: "source", equals: "youtube" },
    },
    {
      type: "video",
      name: "videoFile",
      label: "Video file",
      kind: "videos",
      showIf: { field: "source", equals: "upload" },
    },
    {
      type: "select",
      name: "category",
      label: "Category",
      options: [
        { value: "tutorials", label: "Tutorials" },
        { value: "vlogs", label: "Vlogs" },
        { value: "reviews", label: "Reviews" },
      ],
    },
    { type: "textarea", name: "description", label: "Description", rows: 4 },
    { type: "text", name: "duration", label: "Duration", placeholder: "12:45", help: "Filled in automatically for uploaded videos when left empty." },
    { type: "text", name: "views", label: "Views label", placeholder: "12K" },
    { type: "image", name: "thumbnail", label: "Custom thumbnail", kind: "videos", optional: true, help: "Defaults to YouTube's thumbnail, or a frame picked from the uploaded video." },
    order,
  ],
};

export const SETTINGS_FORM: FieldDef[] = [
  {
    type: "group",
    name: "brand",
    label: "Brand",
    fields: [
      { type: "text", name: "name", label: "Site name", help: "Used in page titles." },
      { type: "text", name: "logoTitle", label: "Logo title" },
      { type: "text", name: "logoSubtitle", label: "Logo subtitle" },
    ],
  },
  {
    type: "group",
    name: "contact",
    label: "Contact details",
    fields: [
      { type: "email", name: "email", label: "Email" },
      { type: "text", name: "phone", label: "Phone" },
      { type: "text", name: "whatsapp", label: "WhatsApp number", help: "Defaults to the phone number." },
      { type: "text", name: "address", label: "Address" },
      { type: "text", name: "timezone", label: "Time zone" },
    ],
  },
  {
    type: "group",
    name: "social",
    label: "Social links",
    fields: [
      { type: "url", name: "linkedin", label: "LinkedIn" },
      { type: "url", name: "x", label: "X (Twitter)" },
      { type: "url", name: "instagram", label: "Instagram" },
      { type: "url", name: "pinterest", label: "Pinterest" },
      { type: "url", name: "tiktok", label: "TikTok" },
      { type: "url", name: "youtube", label: "YouTube channel" },
      { type: "url", name: "github", label: "GitHub" },
    ],
  },
  {
    type: "group",
    name: "footer",
    label: "Footer",
    fields: [{ type: "text", name: "copyrightText", label: "Copyright text", help: "Leave empty for the automatic © year line." }],
  },
  {
    type: "group",
    name: "seo",
    label: "Search engines & sharing",
    fields: [
      { type: "text", name: "title", label: "Default page title" },
      { type: "textarea", name: "description", label: "Default description", rows: 3 },
      { type: "image", name: "ogImage", label: "Social sharing image", kind: "og", optional: true, help: "1200×630 works best." },
    ],
  },
];
