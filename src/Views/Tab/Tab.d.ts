interface TabItem {
    title: string;
    fold: boolean;
    icon: any;
    children: TabChild[];
}

interface TabChild {
    title: string;
    status: string;
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