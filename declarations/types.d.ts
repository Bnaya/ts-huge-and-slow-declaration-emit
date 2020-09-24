import * as Option from "fp-ts/Option";
declare type ForExtendHelper<T> = T;
export declare type InclusiveOr<A, B> = A | B | (A & B);
export declare type WithOrWithout<A, B> = A | (A & B);
export declare type Entity = {
    id: string;
};
export declare type EntityStats = {
    views: unknown;
    downloads: unknown;
    likes: unknown;
};
export declare enum RelatedCollectionsType {
    related = "related",
    collected = "collected"
}
export declare type Urls = {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
};
export declare type Exif = {
    make: string | null;
    model: string | null;
    exposure_time: string | null;
    aperture: string | null;
    focal_length: string | null;
    iso: number | null;
};
export declare type EvaluationStatus = "in_review" | "dmca_requested" | "dmca_pending_review" | "approved" | "dmca_approved";
export declare type Stats = Entity & {
    statistics: EntityStats;
};
export interface OwnerOrAdminInfo extends ForExtendHelper<Entity & {
    evaluation_status: EvaluationStatus;
    topic_submissions: {
        [topicSlug: string]: unknown;
    };
}> {
}
export interface OwnerInfo extends ForExtendHelper<OwnerOrAdminInfo & {
    show_on_profile: boolean;
    user_tags: string[];
}> {
}
export declare type Location = {
    city: string | null;
    country: string | null;
    name: string | null;
    position: {
        latitude: number | null;
        longitude: number | null;
    };
};
export interface BaseVeryBasic extends ForExtendHelper<Entity & {
    created_at: string;
    updated_at: string;
    urls: Urls;
}> {
}
export interface BaseBasic extends ForExtendHelper<BaseVeryBasic & {
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
}> {
}
export interface BaseFull extends ForExtendHelper<{
    exif: Exif;
    location: Location;
    related_collections: {
        type: RelatedCollectionsType.related | RelatedCollectionsType.collected;
        total: number;
    };
    meta: {
        index: boolean;
    };
}> {
}
export interface VeryBasic extends ForExtendHelper<BaseVeryBasic> {
}
export interface Basic extends ForExtendHelper<BaseBasic & {
    user: unknown;
    current_user_collections?: unknown[];
    sponsorship: unknown | null;
}> {
}
export interface BasicWithTags extends ForExtendHelper<Basic & {
    tags: unknown[];
}> {
}
export interface Full extends ForExtendHelper<BaseFull & BasicWithTags & {
    related_collections: {
        results: unknown[];
    };
}> {
}
export declare type Union = InclusiveOr<VeryBasic | BasicWithTags | WithOrWithout<Basic | Full, OwnerOrAdminInfo | OwnerInfo>, Stats>;
export declare const checkIsVeryBasic: <T extends InclusiveOr<VeryBasic | Basic | BasicWithTags | Full | (Basic & OwnerOrAdminInfo) | (Basic & OwnerInfo) | (Full & OwnerOrAdminInfo) | (Full & OwnerInfo), Stats>>(entity: T) => entity is T & VeryBasic;
export declare const union: Union;
export declare const veryBasicOption: Option.Option<VeryBasic | (VeryBasic & Entity & {
    statistics: EntityStats;
}) | (Basic & VeryBasic) | (BasicWithTags & VeryBasic) | (Full & VeryBasic) | (Basic & OwnerOrAdminInfo & VeryBasic) | (Basic & OwnerInfo & VeryBasic) | (Full & OwnerOrAdminInfo & VeryBasic) | (Full & OwnerInfo & VeryBasic) | (Entity & {
    statistics: EntityStats;
} & VeryBasic) | (Basic & Entity & {
    statistics: EntityStats;
} & VeryBasic) | (BasicWithTags & Entity & {
    statistics: EntityStats;
} & VeryBasic) | (Full & Entity & {
    statistics: EntityStats;
} & VeryBasic) | (Basic & OwnerOrAdminInfo & Entity & {
    statistics: EntityStats;
} & VeryBasic) | (Basic & OwnerInfo & Entity & {
    statistics: EntityStats;
} & VeryBasic) | (Full & OwnerOrAdminInfo & Entity & {
    statistics: EntityStats;
} & VeryBasic) | (Full & OwnerInfo & Entity & {
    statistics: EntityStats;
} & VeryBasic)>;
export declare const veryBasicOption2: Option.Option<VeryBasic>;
export {};
