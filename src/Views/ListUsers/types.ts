export interface TCreateUserC {
    data: string
}

export interface TListUsersC {
    data: TDataListUsersC; 
    handlePageChange: (page: number) => void
    handleDeleteUser: (id: string) => void
    deleteUser: (id: string) => Promise<void>
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}

export interface TDataListUsersC {
    users:            TUsers[];
    currentPage:      number;
    totalPages:       number;
    titleMap:         TTitleMap;
    showModal:        boolean;
    userIdToDelete:   string;
}

export interface TUsers {
    id:        string;
    title:     Title;
    firstName: string;
    lastName:  string;
    picture:   string;
}

type Title = 'mr' |
'ms' |
'mrs' |
'miss' |
'dr' 

export interface TTitleMap {
    mr: string;
    ms: string;
    mrs: string;
    miss: string;
    dr: string;
}

export interface TDataReturn {
    data: TUsers[];
    total: number;
    page: number;
    limit: number;
}