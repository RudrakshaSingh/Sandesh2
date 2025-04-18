import {configureStore} from '@reduxjs/toolkit'

import ContactAuth from './Slices/ContactAuth';
import UserAuth from './Slices/UserAuth';

const store  = configureStore({
    reducer : {
        userAuth : UserAuth,
        contactAuth : ContactAuth





    },
    devTools : true

});

export default store;
