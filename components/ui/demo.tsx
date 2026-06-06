// This is file of your component
// You can use any dependencies from npm; we import them automatically in package.json

import { cn } from "@/lib/utils";
import { useState } from "react";

export const Component = () => {
  const [count, setCount] = useState(0);

  return (
 <div className="min-h-screen w-full relative bg-white">
  {/* Soft Green Glow */}
  <div
    className="absolute inset-0 z-0"
    style={{
      backgroundImage: `
        radial-gradient(circle at center, #8FFFB0, transparent)
      `,
    }}
  />
     {/* Your Content/Components */}
</div>

  );
};

export default Component;
