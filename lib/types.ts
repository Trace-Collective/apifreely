export type Category = "free-tier" | "trial" | "promo";
export type Status = "alive" | "expired" | "unknown";

export type Provider = {
  id: string;
  name: string;
  tagline: string;
  category: Category;
  status: Status;
  signupUrl: string;
  freeDetails: string;
  rateLimit: string;
  openaiCompatible: boolean;
  baseUrl: string;
  models: string[];
  apiKeyEnv: string;
  rateShort: string;
  highlights: string[];
  source: { type: "official" | "community"; url: string };
  added: string;
  expires: string | null;
};

export type AgentFormat = "json" | "env" | "ui" | "yaml";

export type Agent = {
  id: string;
  name: string;
  blurb: string;
  format: AgentFormat;
};

export type Snippet = {
  label: string;
  language: string;
  code: string;
};
