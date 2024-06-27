export interface Ad {
    _id: string;
    title: string;
    description: string;
    date: Date;
    isApproved:boolean;
    contactInfo: {
        fullName: string;
        email: string;
    }[];
}
