import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "apifreely — Free LLM API Directory",
    short_name: "apifreely",
    description: "A free & open directory of LLM APIs for developers.",
    start_url: "/",
    display: "standalone",
    background_color: "#FAFAF8",
    theme_color: "#FF5A00",
    icons: [{ src: "/icon", sizes: "32x32", type: "image/png" }],
  };
}
