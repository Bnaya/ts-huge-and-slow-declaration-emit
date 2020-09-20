import { pipe } from "fp-ts/lib/function";
import * as Option from "fp-ts/Option";

export type InclusiveOr<A, B> = A | B | (A & B);

export type WithOrWithout<A, B> = A | (A & B);

export type Entity = { id: string };

export type EntityStats = {
  views: unknown;
  downloads: unknown;
  likes: unknown;
};

export enum RelatedCollectionsType {
  related = "related",
  collected = "collected",
}

export type Urls = {
  raw: string;
  full: string;
  regular: string;
  small: string;
  thumb: string;
};

export type Exif = {
  make: string | null;
  model: string | null;
  exposure_time: string | null;
  aperture: string | null;
  focal_length: string | null;
  iso: number | null;
};

export type EvaluationStatus =
  | "in_review"
  | "dmca_requested"
  | "dmca_pending_review"
  | "approved"
  | "dmca_approved";

export type Stats = Entity & {
  statistics: EntityStats;
};

export type OwnerOrAdminInfo = Entity & {
  evaluation_status: EvaluationStatus;
  topic_submissions: { [topicSlug: string]: unknown };
};

export type OwnerInfo = OwnerOrAdminInfo & {
  show_on_profile: boolean;
  user_tags: string[];
};

export type Location = {
  city: string | null;
  country: string | null;
  name: string | null;
  position: {
    latitude: number | null;
    longitude: number | null;
  };
};

export type BaseVeryBasic = Entity & {
  created_at: string;
  updated_at: string;
  urls: Urls;
};

export type BaseBasic = BaseVeryBasic & {
  promoted_at: string | null;
  links: {
    html: string;
    download: string;
  };
  width: number;
  height: number;
  description: string | null;
  alt_description: string | null;
  color: string | null;
  likes: number;
  liked_by_user: boolean;
  categories: {}[];
};

export type BaseFull = {
  exif: Exif;
  location: Location;
  related_collections: {
    type: RelatedCollectionsType.related | RelatedCollectionsType.collected;
    total: number;
  };
  meta: { index: boolean };
};

export type VeryBasic = BaseVeryBasic;

export type Basic = BaseBasic & {
  user: unknown;
  current_user_collections?: unknown[];
  sponsorship: unknown | null;
};

export type BasicWithTags = Basic & {
  tags: unknown[];
};

export type Full = BaseFull &
  BasicWithTags & {
    related_collections: {
      results: unknown[];
    };
  };

export type Union = InclusiveOr<
  | VeryBasic
  | BasicWithTags
  | WithOrWithout<Basic | Full, OwnerOrAdminInfo | OwnerInfo>,
  Stats
>;

// ❌ Generates a huge type
export const checkIsVeryBasic = <T extends Union>(
  entity: T
): entity is T & VeryBasic => "urls" in entity;

export declare const union: Union;

// ❌ Generates a huge type
export const veryBasicOption = pipe(
  Option.fromNullable(union),
  Option.filter(checkIsVeryBasic)
);

// ✅ This is functionally equivalent of the `Option.filter` example above, but
// unlike that example, this one generates a very simple type.
export const veryBasicOption2 = pipe(
  Option.fromNullable(union),
  Option.mapNullable((x) => (checkIsVeryBasic(x) ? x : null))
);
