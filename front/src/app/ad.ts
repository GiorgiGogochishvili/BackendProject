export interface Ad {
    _id: string; 
    title: string;
    description: string;
    date: Date;
    contactInfo: {
        fullName: string;
        email: string;
    }[];
}