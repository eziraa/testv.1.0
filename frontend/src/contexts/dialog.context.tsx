interface DialogContextType {
    openDialog: (id: string) => void;
    closeDialog: (id: string) => void;
    openedDialogs: string[];
}

import { createContext, useContext, useState } from 'react';

const DialogContext = createContext<DialogContextType | undefined>(undefined);
const DialogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [openedDialogs, setOpenedDialogs] = useState<string[]>([]);

    const openDialog = (id: string) => {
        setOpenedDialogs((prev) => [...prev, id]);
    };

    const closeDialog = (id: string) => {
        setOpenedDialogs((prev) => prev.filter((dialogId) => dialogId !== id));
    };

    return (
        <DialogContext.Provider value={{ openDialog, closeDialog, openedDialogs }}>
            {children}
        </DialogContext.Provider>
    );
}
export const useDialog = () => {
    const context = useContext(DialogContext);
    if (!context) {
        throw new Error('useDialog must be used within a DialogProvider');
    }
    return context;
}
export { DialogProvider };