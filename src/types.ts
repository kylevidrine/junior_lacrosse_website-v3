
export interface Album {
  id: number;
  title: string;
  year: number;
  coverArt: string;
  tracks: string[];
}

// Fix: Update Event interface to match the data from events.json.
// This resolves errors in Events.tsx by replacing `date` with `startDate` and adding an optional `endDate`.
export interface Event {
  id: number;
  startDate: string;
  endDate?: string;
  venue: string;
  city?: string;
}

export interface Photo {
  id: number;
  src: string;
  alt: string;
}

export interface Video {
    id: number;
    src: string;
    title: string;
}
// Fix: Manually define types for Vite's environment variables to resolve issues
// where `vite/client` types cannot be found automatically. This fixes errors
// related to `import.meta.env` in files like Contact.tsx.
declare global {
  interface ImportMetaEnv {
    readonly VITE_WEBHOOK_URL: string;
    readonly VITE_AIRTABLE_ACCESS_TOKEN: string;
    readonly VITE_AIRTABLE_BASE_ID: string;
    readonly VITE_AIRTABLE_TABLE_ID: string;
    readonly VITE_AIRTABLE_MUSIC_TABLE_ID: string;
    readonly VITE_AIRTABLE_VENUE_TABLE_ID: string;
    readonly VITE_AIRTABLE_ARTIST_TABLE_ID: string;
    readonly VITE_AIRTABLE_CONTROL_TABLE_ID: string;
    readonly VITE_AIRTABLE_MASTER_VIDEO_LIST_TABLE_ID: string;
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}
