interface TabChild {
    id: number;
    title: string;
    status: string;
}

interface TabItem {
    title: string;
    fold: boolean;
    icon: any;
    children: TabChild[];
}

interface PSC {
    "In Progress": string;
    "Pending": string;
    "Checking": string;
}

interface PBC {
    Super: PBCC;
    Develop: PBCC;
    HR: PBCC
}

interface PBCC {
    bg: string;
    text: string;
}