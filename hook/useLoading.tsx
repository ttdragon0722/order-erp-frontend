import { useState } from 'react';

type Status = 'loading' | 'success' | 'error';

const useStatus = () => {
    const [status, changeStatus] = useState<Status>('loading'); // 預設狀態為 loading

    const setStatus = {
        success: () => changeStatus('success'),
        loading: () => changeStatus('loading'),
        error: () => changeStatus('error'),

    }
    
    return { status, setStatus };
}

export default useStatus;
