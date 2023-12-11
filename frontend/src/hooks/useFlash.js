import { useContext } from 'react';
import FlashContext from '../contexts/flash/FlashContext';

/* Hook allows components to use the FlashContext */
function useFlash() {
    return useContext(FlashContext);
}

export default useFlash;
