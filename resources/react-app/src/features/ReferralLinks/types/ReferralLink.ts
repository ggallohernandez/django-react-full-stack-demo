export type AddReferralLinkParams = {
    title: string;
}

export type EditReferralLinkParams = {
    id: number;
    title: string;
}

export type DeleteReferralLinkParams = {
    id: number;
}

export type GetReferralLinkParams = {
    id: number;
}

export type GetReferralLinkByTitleParams = {
    title: string;
}

export type IncrementReferralLinkClicksParams = {
    id: number;
    title: string;
}

export type ReferralLink = {
    id: number;
    title: string;
    clicks: number;
    link: string;
}

export type ReferralLinkList = {
    count: number;
    next: number|null;
    previous: number|null;
    results: ReferralLink[];
};